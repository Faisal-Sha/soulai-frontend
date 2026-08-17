/**
 * Upsell B — shared handlers (check eligibility, mark offered, charge $9.99).
 * Invoked via edge function `upsell-b` or legacy `upsell-check` / `upsell-compatibility`.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@14.21.0";

export const upsellCorsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
        "authorization, x-client-info, apikey, content-type",
};

const PAYWALL_PLANS = new Set([
    "full_access_7day",
    "trial_1week", "plan_4week", "premium_12week",
    "discovery", "growth", "premium",
]);

const ADDON_AMOUNT = 999;
const ADDON_NAME = "Compatibility Deep-Dive";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    httpClient: Stripe.createFetchHttpClient(),
});

function json(data: unknown, status = 200) {
    return new Response(JSON.stringify(data), {
        headers: { ...upsellCorsHeaders, "Content-Type": "application/json" },
        status,
    });
}

function adminClient() {
    return createClient(
        Deno.env.get("SUPABASE_URL") || "",
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
    );
}

function buildSubscriptionPurchase(
    sessionId: string,
    stripeSession: Stripe.Checkout.Session,
) {
    const paid =
        stripeSession.payment_status === "paid" ||
        stripeSession.status === "complete";
    if (!paid || (stripeSession.mode !== "subscription" && stripeSession.mode !== "payment")) return undefined;

    const planType = stripeSession.metadata?.plan_type ?? "";
    if (!PAYWALL_PLANS.has(planType)) return undefined;

    return {
        session_id: sessionId,
        plan_type: planType,
        amount: stripeSession.amount_total != null
            ? stripeSession.amount_total / 100
            : undefined,
        currency: stripeSession.currency ?? "usd",
    };
}

function checkoutEmail(session: Stripe.Checkout.Session): string | null {
    return (
        session.customer_details?.email ||
        session.customer_email ||
        (session.customer && typeof session.customer !== "string"
            ? (session.customer as Stripe.Customer).email
            : null)
    );
}

export async function handleMarkOffered(userId: string) {
    const supabase = adminClient();
    const { error } = await supabase
        .from("profiles")
        .update({ upsell_b_offered: true } as Record<string, unknown>)
        .eq("id", userId);

    if (error) {
        console.error(`[upsell-b] markOffered: ${error.message}`);
        return json({ success: false, error: error.message }, 500);
    }
    return json({ success: true });
}

export async function handleCheck(sessionId: string) {
    const supabase = adminClient();

    let stripeSession: Stripe.Checkout.Session;
    try {
        stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer"],
        });
    } catch {
        return json({ eligible: false, reason: "invalid_session_id" });
    }

    const customerEmail = checkoutEmail(stripeSession);
    if (!customerEmail) {
        return json({ eligible: false, reason: "no_email" });
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("id, upsell_b_offered")
        .eq("email", customerEmail)
        .maybeSingle();

    let userId = profile?.id;

    if (!userId) {
        const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 });
        const authUser = users.find(
            (u) => u.email?.toLowerCase() === customerEmail.toLowerCase(),
        );
        if (authUser) {
            userId = authUser.id;
            await supabase.from("profiles").insert({
                id: userId,
                email: customerEmail,
            });
        }
    }

    const subscriptionPurchase = buildSubscriptionPurchase(sessionId, stripeSession);

    if (!userId) {
        return json({
            eligible: false,
            reason: "user_not_ready",
            retry: true,
            subscription_purchase: subscriptionPurchase,
        });
    }

    const { data: profileRow } = await supabase
        .from("profiles")
        .select("id, upsell_b_offered")
        .eq("id", userId)
        .maybeSingle();

    if (profileRow?.upsell_b_offered) {
        return json({
            eligible: false,
            reason: "already_offered",
            userId,
            email: customerEmail,
            subscription_purchase: subscriptionPurchase,
        });
    }

    const { data: purchase } = await supabase
        .from("upsell_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("addon", "compatibility_deep_dive")
        .maybeSingle();

    if (purchase) {
        return json({
            eligible: false,
            reason: "already_purchased",
            userId,
            email: customerEmail,
            subscription_purchase: subscriptionPurchase,
        });
    }

    const { data: sub } = await supabase
        .from("subscriptions")
        .select("plan_type")
        .eq("user_id", userId)
        .maybeSingle();

    if (!sub) {
        return json({
            eligible: false,
            reason: "subscription_not_ready",
            retry: true,
            subscription_purchase: subscriptionPurchase,
        });
    }

    const planType = sub.plan_type ?? "";
    if (planType === "full_access_7day") {
        return json({
            eligible: false,
            reason: "no_upsell",
            userId,
            email: customerEmail,
            planType,
            subscription_purchase: subscriptionPurchase,
        });
    }
    if (planType === "premium_12week" || planType === "premium") {
        return json({
            eligible: false,
            reason: "premium_plan",
            userId,
            email: customerEmail,
            planType,
            subscription_purchase: subscriptionPurchase,
        });
    }

    return json({
        eligible: true,
        userId,
        email: customerEmail,
        planType,
        subscription_purchase: subscriptionPurchase,
    });
}

const PREMIUM_PLANS = new Set(["premium", "premium_12week"]);

async function executeDeepDivePurchase(
    userId: string,
    options: { sessionId?: string; requireNotOffered?: boolean } = {},
) {
    const supabase = adminClient();

    const { data: existingPurchase } = await supabase
        .from("upsell_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("addon", "compatibility_deep_dive")
        .maybeSingle();

    if (existingPurchase) {
        return json({ error: "You have already purchased this add-on." }, 409);
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, upsell_b_offered")
        .eq("id", userId)
        .maybeSingle();

    if (!profile?.id) {
        return json({ error: "User not found." }, 404);
    }

    if (options.requireNotOffered && (profile as { upsell_b_offered?: boolean }).upsell_b_offered) {
        return json({ error: "This offer has already been used." }, 409);
    }

    const { data: sub } = await supabase
        .from("subscriptions")
        .select("stripe_customer_id, plan_type")
        .eq("user_id", userId)
        .maybeSingle();

    if (!sub?.stripe_customer_id) {
        return json({ error: "No subscription found. Please subscribe first." }, 404);
    }

    if (sub.plan_type && PREMIUM_PLANS.has(sub.plan_type)) {
        return json({ error: "Deep-Dive is already included in your plan." }, 403);
    }

    const customer = await stripe.customers.retrieve(sub.stripe_customer_id, {
        expand: ["invoice_settings.default_payment_method"],
    });

    if (customer.deleted) {
        return json({ error: "Stripe customer not found." }, 404);
    }

    let paymentMethodId: string | null =
        (customer.invoice_settings?.default_payment_method as { id?: string } | null)?.id ?? null;

    if (!paymentMethodId) {
        const methods = await stripe.paymentMethods.list({
            customer: sub.stripe_customer_id,
            type: "card",
            limit: 1,
        });
        paymentMethodId = methods.data[0]?.id ?? null;
    }

    if (!paymentMethodId) {
        return json({ error: "No payment method on file. Please contact support." }, 400);
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: ADDON_AMOUNT,
        currency: "usd",
        customer: sub.stripe_customer_id,
        payment_method: paymentMethodId,
        off_session: true,
        confirm: true,
        description: ADDON_NAME,
        metadata: {
            user_id: userId,
            addon: "compatibility_deep_dive",
            amount: "9.99",
            source: options.sessionId ? "upsell_checkout" : "compatibility_page",
            ...(options.sessionId ? { session_id: options.sessionId } : {}),
        },
    });

    if (paymentIntent.status !== "succeeded") {
        return json({
            error: `Payment did not succeed (status: ${paymentIntent.status}).`,
        }, 402);
    }

    const { error: insertErr } = await supabase.from("upsell_purchases").insert({
        user_id: userId,
        addon: "compatibility_deep_dive",
        amount: 9.99,
        currency: "usd",
        stripe_payment_intent_id: paymentIntent.id,
        stripe_customer_id: sub.stripe_customer_id,
        status: "succeeded",
    });

    if (insertErr) {
        console.error(`[upsell-b] purchase insert: ${insertErr.message}`);
    }

    await supabase
        .from("profiles")
        .update({ upsell_b_offered: true } as Record<string, unknown>)
        .eq("id", userId);

    return json({
        success: true,
        paymentIntentId: paymentIntent.id,
        addon: "compatibility_deep_dive",
        amount: 9.99,
    });
}

/** Logged-in purchase from Compatibility page (skipped post-checkout upsell). */
export async function handlePurchaseStandalone(req: Request) {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const token = (req.headers.get("Authorization") || "")
        .replace(/^Bearer /i, "")
        .trim();

    if (!token || token === supabaseAnon) {
        return json({ error: "Please sign in to purchase." }, 401);
    }

    const client = createClient(supabaseUrl, supabaseAnon);
    const { data: { user }, error: authErr } = await client.auth.getUser(token);

    if (authErr || !user) {
        return json({ error: "Unauthorized" }, 401);
    }

    console.log(`[upsell-b] Standalone purchase for user ${user.id}`);
    return await executeDeepDivePurchase(user.id, { requireNotOffered: false });
}

export async function handleCharge(
    sessionId: string,
    bodyUserId: string,
    req: Request,
) {
    const supabase = adminClient();
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseAnon = Deno.env.get("SUPABASE_ANON_KEY") || "";

    const token = (req.headers.get("Authorization") || "")
        .replace(/^Bearer /i, "")
        .trim();

    if (token && token !== supabaseAnon) {
        const client = createClient(supabaseUrl, supabaseAnon);
        const { data: { user } } = await client.auth.getUser(token);
        if (user && user.id !== bodyUserId) {
            return json({ error: "Session user does not match checkout user." }, 403);
        }
    }

    let stripeSession: Stripe.Checkout.Session;
    try {
        stripeSession = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["customer"],
        });
    } catch {
        return json({ error: "Invalid checkout session." }, 400);
    }

    const paid =
        stripeSession.payment_status === "paid" ||
        stripeSession.status === "complete";
    if (!paid || (stripeSession.mode !== "subscription" && stripeSession.mode !== "payment")) {
        return json({ error: "Subscription checkout is not complete." }, 400);
    }

    const email = checkoutEmail(stripeSession);
    if (!email) return json({ error: "No email on checkout session." }, 400);

    const { data: profile } = await supabase
        .from("profiles")
        .select("id, email, upsell_b_offered")
        .eq("id", bodyUserId)
        .maybeSingle();

    if (!profile?.id) return json({ error: "User not found." }, 404);

    const norm = (e: string) => e.trim().toLowerCase();
    if (!profile.email || norm(profile.email) !== norm(email)) {
        return json({ error: "Checkout session does not match this user." }, 403);
    }

    const userId = profile.id;
    return await executeDeepDivePurchase(userId, {
        sessionId,
        requireNotOffered: true,
    });
}

/** Route by `action` or legacy defaults for split function names. */
export async function handleUpsellRequest(
    req: Request,
    legacy?: "check" | "charge",
) {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: upsellCorsHeaders });
    }

    try {
        const body = await req.json().catch(() => ({}));
        const action = body.action ?? legacy ?? "check";

        if (action === "markOffered" && body.userId) {
            return await handleMarkOffered(body.userId);
        }

        if (action === "charge") {
            if (!body.sessionId || !body.userId) {
                return json({ error: "sessionId and userId are required." }, 400);
            }
            return await handleCharge(body.sessionId, body.userId, req);
        }

        if (action === "purchaseStandalone") {
            return await handlePurchaseStandalone(req);
        }

        // check (default)
        if (body.markOffered && body.userId) {
            return await handleMarkOffered(body.userId);
        }

        if (!body.sessionId) {
            return json({ eligible: false, reason: "no_session_id" });
        }

        return await handleCheck(body.sessionId);
    } catch (err: { message?: string; type?: string }) {
        console.error("[upsell-b]", err.message);
        if (err.type === "StripeCardError") {
            return json({ error: `Card declined: ${err.message}` }, 402);
        }
        return json({ eligible: false, reason: "error", error: err.message }, 500);
    }
}
