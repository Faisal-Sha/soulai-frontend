import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@14.21.0";
import { createAdminClient, createUserClient } from "../_shared/supabase-client.ts";
import { sendEmail } from "../_shared/email.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    const json = (data: unknown, status = 200) =>
        new Response(JSON.stringify(data), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status,
        });

    try {
        // ── Auth: Get admin from token ────────────────────────────────────────
        const supabaseUserClient = createUserClient(req);
        const { data: { user: adminUser }, error: authError } = await supabaseUserClient.auth.getUser();
        
        if (authError || !adminUser) {
            return json({ error: "Unauthorized" }, 401);
        }

        const supabaseAdmin = createAdminClient();

        // ── Verify Admin Role ────────────────────────────────────────────────
        const { data: adminRecord, error: adminError } = await supabaseAdmin
            .from("admins")
            .select("is_active")
            .eq("user_id", adminUser.id)
            .maybeSingle();

        if (adminError || !adminRecord || !adminRecord.is_active) {
            console.error(`[admin-cancel-subscription] Admin check failed for ${adminUser.id}`);
            return json({ error: "Forbidden: Admin access required" }, 403);
        }

        // ── Parse body ────────────────────────────────────────────────────────
        const body = await req.json().catch(() => ({}));
        const { userId } = body;

        if (!userId) {
            return json({ error: "userId is required" }, 400);
        }

        // ── Fetch target user's subscription ──────────────────────────────────
        const { data: sub, error: subError } = await supabaseAdmin
            .from("subscriptions")
            .select("stripe_subscription_id, status, cancel_at_period_end")
            .eq("user_id", userId)
            .maybeSingle();

        if (subError || !sub) {
            return json({ error: "No subscription found for this user" }, 404);
        }

        // Allow cancel during trial so admin can stop the upcoming $6.99 charge
        const cancelableStatuses = new Set(["active", "trialing"]);
        if (!cancelableStatuses.has(sub.status)) {
            return json({ error: "Subscription is not active or in trial" }, 400);
        }

        if (sub.cancel_at_period_end) {
            return json({ error: "Subscription is already scheduled for cancellation" }, 400);
        }

        if (!sub.stripe_subscription_id) {
            return json({ error: "No Stripe subscription linked" }, 400);
        }

        // ── Cancel at period end via Stripe ───────────────────────────────────
        const updated = await stripe.subscriptions.update(sub.stripe_subscription_id, {
            cancel_at_period_end: true,
        });

        const cancelAt = updated.cancel_at
            ? new Date(updated.cancel_at * 1000).toISOString()
            : new Date(updated.current_period_end * 1000).toISOString();

        // ── Sync to DB ────────────────────────────────────────────────────────
        const { error: updateError } = await supabaseAdmin
            .from("subscriptions")
            .update({
                cancel_at_period_end: true,
                cancel_at: cancelAt,
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);

        if (updateError) {
            console.error("[admin-cancel-subscription] DB update error:", updateError.message);
        }

        console.log(`[admin-cancel-subscription] Admin ${adminUser.id} canceled sub for user ${userId}. Access until: ${cancelAt}`);

        // ── Send cancellation notification email to the user ──────────────────
        try {
            const { data: profile } = await supabaseAdmin
                .from("profiles")
                .select("email, full_name")
                .eq("id", userId)
                .maybeSingle();

            const userEmail = profile?.email;
            const userName = profile?.full_name || "there";
            const accessUntil = new Date(cancelAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric",
            });
            const siteUrl = Deno.env.get("SITE_URL") || "https://soulplus-ai.com";

            if (userEmail) {
                await sendEmail(
                    userEmail,
                    "Your Soul+AI subscription has been cancelled",
                    `<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #333; padding: 24px;">
                        <h2 style="color: #333;">Subscription Cancelled</h2>
                        <p>Hi ${userName},</p>
                        <p>Your Soul+AI subscription has been cancelled by our team.</p>
                        <p style="background: #f9f9f9; border-left: 4px solid #5D4BE0; padding: 12px 16px; border-radius: 4px;">
                            <strong>Your access continues until: ${accessUntil}</strong><br/>
                            You can still use all features until that date.
                        </p>
                        <p>If you believe this was done in error or have any questions, please reply to this email and we'll sort it out right away.</p>
                        <p style="margin: 24px 0;">
                            <a href="${siteUrl}/rates"
                               style="background: #5D4BE0; color: white; padding: 12px 24px; border-radius: 8px;
                                      text-decoration: none; font-weight: 600; display: inline-block;">
                                Resubscribe
                            </a>
                        </p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 24px 0;" />
                        <p style="font-size: 12px; color: #bbb;">Soul+AI · <a href="${siteUrl}" style="color: #5D4BE0;">soulplus-ai.com</a></p>
                    </div>`,
                    "Soul+AI"
                );
                console.log(`[admin-cancel-subscription] Cancellation email sent to: ${userEmail}`);
            }
        } catch (emailErr: any) {
            // Non-fatal — cancellation already succeeded
            console.error(`[admin-cancel-subscription] Failed to send cancellation email: ${emailErr.message}`);
        }

        return json({ success: true, cancel_at: cancelAt });

    } catch (err: any) {
        console.error("[admin-cancel-subscription] Error:", err.message);
        return json({ error: err.message }, 500);
    }
});
