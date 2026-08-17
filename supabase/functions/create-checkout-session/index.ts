import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@14.21.0";

const STRIPE_TIMEOUT_MS = 15_000;

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    httpClient: Stripe.createFetchHttpClient(),
    timeout: STRIPE_TIMEOUT_MS,
    maxNetworkRetries: 1,
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/** Single-plan offer: $0.99 intro + 7-day trial, then $6.99/month (issue #31) */
const INTRO_PLAN_SKU = "full_access_7day";

const LEGACY_PLAN_ALIASES: Record<string, string> = {
    trial_1week:    INTRO_PLAN_SKU,
    plan_4week:     INTRO_PLAN_SKU,
    premium_12week: INTRO_PLAN_SKU,
    discovery:      INTRO_PLAN_SKU,
    growth:         INTRO_PLAN_SKU,
    premium:        INTRO_PLAN_SKU,
};

// Legacy recurring-only plans — kept for any in-flight sessions; new purchases use INTRO_PLAN_SKU
const LEGACY_SUBSCRIPTION_PLANS: Record<string, { amount: number; name: string; interval: "week" | "month"; interval_count: number }> = {
    "trial_1week":    { amount: 999,  name: "1-Week Trial",    interval: "week",  interval_count: 1 },
    "plan_4week":     { amount: 2999, name: "4-Week Plan",     interval: "week",  interval_count: 4 },
    "premium_12week": { amount: 9900, name: "12-Week Premium", interval: "week",  interval_count: 12 },
    "discovery":      { amount: 999,  name: "1-Week Trial",    interval: "week",  interval_count: 1 },
    "growth":         { amount: 2999, name: "4-Week Plan",     interval: "week",  interval_count: 4 },
    "premium":        { amount: 9900, name: "12-Week Premium", interval: "week",  interval_count: 12 },
};

function resolvePlanId(planId: string): string {
    return LEGACY_PLAN_ALIASES[planId] ?? planId;
}

// Balance recharge is a one-time payment — handled separately
const RECHARGE_MODE = "recharge";

function jsonResponse(body: unknown, status = 200) {
    return new Response(JSON.stringify(body), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status,
    });
}

function requireEnv(name: string): string | null {
    const value = Deno.env.get(name)?.trim();
    return value || null;
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const startedAt = Date.now();

    try {
        console.log("--- create-checkout-session: Request Received ---");

        const stripeKey = requireEnv("STRIPE_SECRET_KEY");
        if (!stripeKey) {
            console.error("[create-checkout-session] STRIPE_SECRET_KEY is not set");
            return jsonResponse({ error: "Payment service is not configured (missing STRIPE_SECRET_KEY)" }, 503);
        }

        const supabaseUrl = requireEnv("SUPABASE_URL");
        const supabaseAnonKey = requireEnv("SUPABASE_ANON_KEY") || "";
        const supabaseServiceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY") || supabaseAnonKey;
        if (!supabaseUrl) {
            console.error("[create-checkout-session] SUPABASE_URL is not set");
            return jsonResponse({ error: "Database service is not configured" }, 503);
        }

        const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

        // ── Parse body ────────────────────────────────────────────────────────
        const body = await req.json().catch(() => ({}));
        const {
            planId: rawPlanId,
            amount,
            mode = "subscription",
            language = "en",
            leadId = null,   // quiz funnel lead ID — optional
            siteUrl: bodySiteUrl = null, // client-provided origin (used as fallback)
        } = body;

        const planId = rawPlanId ? resolvePlanId(rawPlanId) : rawPlanId;

        // ── Resolve user (logged-in OR guest) ─────────────────────────────────
        const authHeader = req.headers.get("Authorization") || req.headers.get("authorization") || "";
        const token = authHeader.replace(/^Bearer /i, "").trim();
        const supabaseAnonKeyValue = Deno.env.get("SUPABASE_ANON_KEY") || "";

        let userId: string | null = null;
        let userEmail: string | null = null;

        if (token && token !== supabaseAnonKeyValue) {
            const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
            const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
            if (!userError && user) {
                userId = user.id;
                userEmail = user.email ?? null;
                console.log(`[Auth] Logged-in user: ${userEmail} (${userId})`);
            } else {
                console.warn(`[Auth] Token present but invalid: ${userError?.message}`);
            }
        } else {
            console.log("[Auth] No user token — guest checkout flow");
        }

        // Guest quiz checkout: resolve the account created by quiz-lead via leadId
        // so Stripe gets client_reference_id and the webhook can attach the subscription
        // + trigger the PDF email reliably (even if checkout email differs slightly).
        if (!userId && leadId) {
            const { data: lead } = await supabaseAdmin
                .from("quiz_leads")
                .select("user_id, email")
                .eq("id", leadId)
                .maybeSingle();

            if (lead?.user_id) {
                userId = lead.user_id;
                userEmail = lead.email ?? userEmail;
                console.log(`[Auth] Guest resolved via leadId=${leadId} → user ${userId}`);
            } else if (lead?.email) {
                userEmail = lead.email;
                const { data: profile } = await supabaseAdmin
                    .from("profiles")
                    .select("id")
                    .eq("email", lead.email)
                    .maybeSingle();
                if (profile?.id) {
                    userId = profile.id;
                    await supabaseAdmin.from("quiz_leads").update({ user_id: userId }).eq("id", leadId);
                    console.log(`[Auth] Guest resolved via lead email → user ${userId}`);
                }
            }
        }

        // ── Validate plan ─────────────────────────────────────────────────────
        if (mode === "subscription" && !planId) {
            return jsonResponse({ error: "planId is required for subscription" }, 400);
        }

        if (mode === "payment" && (!amount || amount < 500)) {
            return jsonResponse({ error: "Minimum recharge amount is $5.00" }, 400);
        }

        const isIntroPlan = mode === "subscription" && planId === INTRO_PLAN_SKU;
        const legacyPlan = mode === "subscription" && !isIntroPlan
            ? LEGACY_SUBSCRIPTION_PLANS[planId]
            : null;

        if (mode === "subscription" && !isIntroPlan && !legacyPlan) {
            return jsonResponse({ error: `Unknown planId: ${planId}` }, 400);
        }

        console.log(`[create-checkout-session] planId=${planId} mode=${mode} guest=${!userId} leadId=${leadId ?? "none"}`);

        // ── Stripe customer lookup / creation ─────────────────────────────────
        let customerId: string | null = null;

        if (userId) {
            const { data: sub } = await supabaseAdmin
                .from("subscriptions")
                .select("stripe_customer_id")
                .eq("user_id", userId)
                .maybeSingle();

            customerId = sub?.stripe_customer_id ?? null;

            if (customerId) {
                try {
                    const existing = await stripe.customers.retrieve(customerId);
                    if (existing.deleted) customerId = null;
                } catch {
                    customerId = null;
                }
            }

            if (!customerId) {
                const customer = await stripe.customers.create({
                    email: userEmail ?? undefined,
                    metadata: { supabase_user_id: userId },
                });
                customerId = customer.id;
                console.log(`[Stripe] Created customer for user: ${customerId}`);
            } else {
                console.log(`[Stripe] Reusing customer: ${customerId}`);
            }
        }

        // ── Origin for redirect URLs ──────────────────────────────────────────
        const siteUrl = Deno.env.get("SITE_URL") || bodySiteUrl || "https://soulplus-ai.com";
        console.log(`[create-checkout-session] SITE_URL=${siteUrl}`);

        const successUrl = `${siteUrl}/processing?session_id={CHECKOUT_SESSION_ID}`;

        // ── Build Stripe session config ───────────────────────────────────────
        const sessionConfig: Stripe.Checkout.SessionCreateParams = {
            mode: mode === "subscription" ? "subscription" : "payment",
            success_url: successUrl,
            cancel_url:  `${siteUrl}/rates`,
            metadata: {
                plan_type:  planId ?? RECHARGE_MODE,
                lead_id:    leadId ?? "",
                language,
            },
        };

        if (customerId) {
            sessionConfig.customer = customerId;
        } else if (userEmail) {
            // Prefill checkout email for guests (no Stripe customer yet)
            sessionConfig.customer_email = userEmail;
        }
        // Always pass client_reference_id when we know the user — critical for PDF email after pay
        if (userId) {
            sessionConfig.client_reference_id = userId;
        }

        if (mode === "subscription" && isIntroPlan) {
            // Show only name + price due today on hosted Checkout.
            // Trial/renewal terms are already on the paywall — Stripe's subscription
            // line would otherwise repeat "7-Day Full Access" + "X / month after 7 days free".
            // The $6.99/mo subscription (7-day trial) is created in stripe-webhook after payment.
            sessionConfig.mode = "payment";
            sessionConfig.line_items = [
                {
                    price_data: {
                        currency: "usd",
                        product_data: { name: "Introductory access fee" },
                        unit_amount: 99,
                    },
                    quantity: 1,
                },
            ];
            sessionConfig.payment_intent_data = {
                setup_future_usage: "off_session",
            };
            // Guests need a Customer so the webhook can attach the card + start the subscription
            if (!customerId) {
                sessionConfig.customer_creation = "always";
            }
        } else if (mode === "subscription" && legacyPlan) {
            sessionConfig.line_items = [{
                price_data: {
                    currency: "usd",
                    product_data: { name: legacyPlan.name },
                    unit_amount: legacyPlan.amount,
                    recurring: { interval: legacyPlan.interval, interval_count: legacyPlan.interval_count },
                },
                quantity: 1,
            }];
            sessionConfig.payment_method_collection = "always";
        } else {
            sessionConfig.line_items = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: language === "ru" ? "Пополнение баланса" : "Balance Refill",
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }];
            sessionConfig.success_url = `${siteUrl}/calculator?recharge=success`;
            sessionConfig.cancel_url  = `${siteUrl}/calculator`;
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);
        console.log(`[Stripe] Session created: ${session.id} (${Date.now() - startedAt}ms)`);

        return jsonResponse({ url: session.url });

    } catch (error: any) {
        const elapsed = Date.now() - startedAt;
        const message = error?.message || "checkout_failed";
        const isTimeout = /timeout|timed out|abort/i.test(message);
        console.error(`[create-checkout-session] Error after ${elapsed}ms:`, message);
        return jsonResponse({
            error: isTimeout
                ? "Payment provider timed out. Please try again."
                : message,
        }, isTimeout ? 504 : 400);
    }
});
