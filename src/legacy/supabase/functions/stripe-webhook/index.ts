// stripe-webhook — handles Stripe events.
// Account creation and reading generation are handled by quiz-lead (independent of Stripe).
// This webhook is responsible for:
//   1. Saving / updating subscription records
//   2. Triggering PDF report email delivery (via generate-pdf) after payment
//   3. Sending a subscription-confirmation email
//   4. Notifying the owner of new sales
//   5. Handling balance recharges (one-time payments)

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import Stripe from "npm:stripe@^14.21.0";
import { sendEmail } from "../_shared/email.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    httpClient: Stripe.createFetchHttpClient(),
});

const ownerEmail = Deno.env.get("OWNER_EMAIL") || "mlit.mentor@gmail.com";
const INTRO_PLAN_SKU = "full_access_7day";
const MONTHLY_PRODUCT_SKU = "full_access_7day_monthly";

/** Reuse a single Stripe Product for the $6.99/mo renewal (created after intro Checkout). */
async function getOrCreateMonthlyProduct(): Promise<string> {
    const listed = await stripe.products.list({ limit: 100, active: true });
    const existing = listed.data.find((p) => p.metadata?.sku === MONTHLY_PRODUCT_SKU);
    if (existing) return existing.id;

    const created = await stripe.products.create({
        name: "Full Access Monthly",
        metadata: { sku: MONTHLY_PRODUCT_SKU, plan_type: INTRO_PLAN_SKU },
    });
    return created.id;
}

/**
 * After the $0.99 intro Checkout (payment mode), start the $6.99/mo subscription
 * with a 7-day trial using the card saved on the PaymentIntent.
 */
async function createIntroSubscriptionFromPayment(
    session: Stripe.Checkout.Session,
    customerId: string,
    planType: string,
    leadId: string | null,
): Promise<Stripe.Subscription> {
    // Idempotent on Stripe webhook retries
    const existing = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 20 });
    const already = existing.data.find((s) => s.metadata?.checkout_session_id === session.id);
    if (already) {
        console.log(`[Checkout.Completed] Intro subscription already exists for session ${session.id}: ${already.id}`);
        return already;
    }

    const paymentIntentId = typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;
    if (!paymentIntentId) {
        throw new Error("Intro checkout missing payment_intent — cannot start subscription");
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    const paymentMethodId = typeof pi.payment_method === "string"
        ? pi.payment_method
        : pi.payment_method?.id;
    if (!paymentMethodId) {
        throw new Error("Intro checkout missing payment_method — cannot start subscription");
    }

    try {
        await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });
    } catch (err: any) {
        // Already attached to this customer is fine
        if (!/already been attached|resource_already_exists/i.test(err?.message || "")) {
            throw err;
        }
    }

    await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: paymentMethodId },
    });

    const productId = await getOrCreateMonthlyProduct();

    return await stripe.subscriptions.create({
        customer: customerId,
        default_payment_method: paymentMethodId,
        trial_period_days: 7,
        items: [{
            price_data: {
                currency: "usd",
                product: productId,
                unit_amount: 699,
                recurring: { interval: "month" },
            },
        }],
        metadata: {
            plan_type: planType,
            lead_id: leadId ?? "",
            checkout_session_id: session.id,
        },
    });
}

// ── Helper: resolve userId after checkout ────────────────────────────────────
// Account is already created by quiz-lead; prefer explicit IDs over email match.
async function resolveUserId(
    supabase: ReturnType<typeof createClient>,
    customerEmail: string | null,
    clientReferenceId: string | null,
    leadId: string | null,
): Promise<string | null> {
    // Logged-in checkout (or guest checkout that resolved the quiz user) passes this
    if (clientReferenceId) return clientReferenceId;

    // Quiz funnel: lead_id is stored on the Checkout Session metadata
    if (leadId) {
        const { data: lead } = await supabase
            .from("quiz_leads")
            .select("user_id, email")
            .eq("id", leadId)
            .maybeSingle();

        if (lead?.user_id) {
            console.log(`[resolveUserId] Resolved via lead_id=${leadId} → ${lead.user_id}`);
            return lead.user_id;
        }

        // Lead exists but user_id not linked yet — try lead email
        const leadEmail = lead?.email || customerEmail;
        if (leadEmail) {
            const { data: profileByLead } = await supabase
                .from("profiles")
                .select("id")
                .eq("email", leadEmail)
                .maybeSingle();
            if (profileByLead?.id) {
                console.log(`[resolveUserId] Resolved via lead email → ${profileByLead.id}`);
                // Backfill quiz_leads.user_id for future lookups
                await supabase.from("quiz_leads").update({ user_id: profileByLead.id }).eq("id", leadId);
                return profileByLead.id;
            }
        }
    }

    if (!customerEmail) return null;

    // Look up by email in profiles
    const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", customerEmail)
        .maybeSingle();

    if (profile?.id) return profile.id;

    // Fallback: auth.users (handles edge case where profile row is delayed)
    try {
        const { data: { users } } = await supabase.auth.admin.listUsers({ perPage: 1000 });
        const match = users?.find((u: any) => u.email === customerEmail);
        return match?.id ?? null;
    } catch (err: any) {
        console.warn(`[resolveUserId] listUsers fallback failed: ${err.message}`);
        return null;
    }
}

/** Trigger generate-pdf so the PDF attachment email is sent after payment. */
async function triggerPdfDeliveryEmail(
    supabaseUrl: string,
    supabaseServiceKey: string,
    userId: string,
    readingId: string,
    forceResend = false,
): Promise<void> {
    const res = await fetch(`${supabaseUrl}/functions/v1/generate-pdf`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${supabaseServiceKey}`,
        },
        body: JSON.stringify({ userId, readingId, forceResend }),
    });
    const text = await res.text().catch(() => "");
    console.log(`[Checkout.Completed] generate-pdf response: ${res.status} ${text.slice(0, 200)}`);
    if (!res.ok) {
        throw new Error(`generate-pdf failed: ${res.status} ${text.slice(0, 200)}`);
    }
}

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
    }

    const signature = req.headers.get("stripe-signature");
    if (!signature) {
        return new Response("Missing signature", { status: 400 });
    }

    const body = await req.text();
    let event: Stripe.Event;

    try {
        event = await stripe.webhooks.constructEventAsync(
            body,
            signature,
            Deno.env.get("STRIPE_WEBHOOK_SECRET") || "",
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const supabaseUrl        = Deno.env.get("SUPABASE_URL") || Deno.env.get("VITE_SUPABASE_URL") || "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || Deno.env.get("SERVICE_ROLE_KEY") || "";
    const siteUrl            = Deno.env.get("SITE_URL") || "https://soulplus-ai.com";
    const supabase           = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`[Webhook] Event: ${event.type} (${event.id})`);

    try {
        switch (event.type) {

            // ── Subscription checkout completed ───────────────────────────────
            case "checkout.session.completed": {
                const session      = event.data.object as Stripe.Checkout.Session;
                const customerId   = session.customer as string;
                const subscriptionId = session.subscription as string | null;
                const planType     = session.metadata?.plan_type || "unknown";
                const emailLang    = (session.metadata?.language === "ru" ? "ru" : "en") as "en" | "ru";
                const leadId       = (session.metadata?.lead_id || "").trim() || null;

                // Resolve email
                let customerEmail: string | null =
                    session.customer_details?.email || session.customer_email || null;
                if (!customerEmail && customerId) {
                    try {
                        const customer = await stripe.customers.retrieve(customerId);
                        if (!customer.deleted) customerEmail = (customer as Stripe.Customer).email ?? null;
                    } catch { /* ignore */ }
                }

                // Resolve user — account already exists (created by quiz-lead)
                const userId = await resolveUserId(
                    supabase,
                    customerEmail,
                    session.client_reference_id || null,
                    leadId,
                );

                if (!userId) {
                    // Edge case: user completed checkout without going through the quiz
                    // (e.g. direct /rates page purchase). Log and continue — subscription
                    // will be linked when the user eventually signs up.
                    console.warn(`[Checkout.Completed] Could not resolve userId for email: ${customerEmail}, lead_id: ${leadId}. Subscription will be linked later.`);
                }

                // Link Stripe customer → Supabase user in Stripe metadata (idempotent)
                if (userId && customerId) {
                    try {
                        await stripe.customers.update(customerId, {
                            metadata: { supabase_user_id: userId },
                        });
                    } catch { /* non-fatal */ }
                }

                const isIntroPlanCheckout = planType === INTRO_PLAN_SKU;
                let resolvedSubscriptionId = subscriptionId;
                let resolvedCustomerId = customerId;

                // Intro plan uses payment-mode Checkout (name + $0.99 only). Create the
                // $6.99/mo trial subscription here so hosted Checkout doesn't show trial terms.
                if (isIntroPlanCheckout && session.mode === "payment") {
                    if (!resolvedCustomerId && session.payment_intent) {
                        try {
                            const piId = typeof session.payment_intent === "string"
                                ? session.payment_intent
                                : session.payment_intent.id;
                            const pi = await stripe.paymentIntents.retrieve(piId);
                            resolvedCustomerId = (typeof pi.customer === "string" ? pi.customer : pi.customer?.id) || "";
                        } catch { /* ignore */ }
                    }
                    if (!resolvedCustomerId) {
                        throw new Error("Intro checkout missing Stripe customer — cannot start subscription");
                    }
                    try {
                        const created = await createIntroSubscriptionFromPayment(
                            session,
                            resolvedCustomerId,
                            planType,
                            leadId,
                        );
                        resolvedSubscriptionId = created.id;
                        console.log(`[Checkout.Completed] Intro subscription created: ${resolvedSubscriptionId}`);
                    } catch (subCreateErr: any) {
                        console.error(`[Checkout.Completed] Failed to create intro subscription: ${subCreateErr.message}`);
                        throw subCreateErr;
                    }
                }

                // ── Save subscription ─────────────────────────────────────────
                if (userId && resolvedSubscriptionId && (session.mode === "subscription" || isIntroPlanCheckout)) {
                    // Snapshot prior sub so we know if this is a new buy / rebuy
                    // (existing users who already got a PDF email must get it again).
                    const { data: prevSub } = await supabase
                        .from("subscriptions")
                        .select("status, cancel_at_period_end, stripe_subscription_id")
                        .eq("user_id", userId)
                        .maybeSingle();

                    const PAID_STATUSES = new Set(["active", "trialing", "past_due"]);
                    const wasPaidAndKeeping =
                        !!prevSub &&
                        PAID_STATUSES.has(prevSub.status ?? "") &&
                        prevSub.cancel_at_period_end !== true &&
                        prevSub.stripe_subscription_id === resolvedSubscriptionId;
                    // New purchase, reactivation after cancel, or first paid plan for existing user
                    const shouldSendPdfEmail = !wasPaidAndKeeping;

                    const subscription = await stripe.subscriptions.retrieve(resolvedSubscriptionId);
                    const expiresAt    = new Date(subscription.current_period_end * 1000).toISOString();

                    const { error: subErr } = await supabase
                        .from("subscriptions")
                        .upsert({
                            user_id:                userId,
                            stripe_customer_id:     resolvedCustomerId || customerId,
                            stripe_subscription_id: resolvedSubscriptionId,
                            status:                 subscription.status ?? "active",
                            plan_type:              planType,
                            expires_at:             expiresAt,
                            current_period_start:   new Date(subscription.current_period_start * 1000).toISOString(),
                            current_period_end:     expiresAt,
                            cancel_at_period_end:   false,   // clear any previous cancellation
                            cancel_at:              null,    // clear any previous cancellation date
                            updated_at:             new Date().toISOString(),
                        }, { onConflict: "user_id" });

                    if (subErr) {
                        console.error(`[Checkout.Completed] Subscription upsert error: ${subErr.message}`);
                        throw subErr;
                    }
                    console.log(`[Checkout.Completed] Subscription saved — user: ${userId}, plan: ${planType}, expires: ${expiresAt}, sendPdf: ${shouldSendPdfEmail}`);

                    // ── Trigger PDF delivery email now that user has subscribed ──
                    // Existing users / rebuyers often already have pdf_email_sent=true from a
                    // prior cycle — still send on a new purchase (same right as new users).
                    try {
                        let existingReading: { id: string; pdf_url: string | null; pdf_email_sent: boolean | null } | null = null;

                        const { data: byUser } = await supabase
                            .from("readings")
                            .select("id, pdf_url, pdf_email_sent")
                            .eq("user_id", userId)
                            .order("created_at", { ascending: false })
                            .limit(1)
                            .maybeSingle();
                        existingReading = byUser;

                        // Fallback: reading linked to quiz lead but not yet to this user_id
                        if (!existingReading?.id && leadId) {
                            const { data: byLead } = await supabase
                                .from("readings")
                                .select("id, pdf_url, pdf_email_sent, user_id")
                                .eq("lead_id", leadId)
                                .order("created_at", { ascending: false })
                                .limit(1)
                                .maybeSingle();
                            if (byLead?.id) {
                                existingReading = byLead;
                                if (byLead.user_id !== userId) {
                                    await supabase
                                        .from("readings")
                                        .update({ user_id: userId, updated_at: new Date().toISOString() })
                                        .eq("id", byLead.id);
                                }
                            }
                        }

                        if (!existingReading?.id) {
                            console.log(`[Checkout.Completed] No reading yet for user: ${userId} — email will send when generate-pdf runs after reading is ready.`);
                        } else if (!shouldSendPdfEmail && existingReading.pdf_email_sent) {
                            // Stripe webhook retry for the same active subscription — avoid duplicate email
                            console.log(`[Checkout.Completed] PDF email already sent for this active sub — user: ${userId}`);
                        } else {
                            const forceResend = !!existingReading.pdf_email_sent;
                            if (forceResend) {
                                await supabase
                                    .from("readings")
                                    .update({ pdf_email_sent: false, updated_at: new Date().toISOString() })
                                    .eq("id", existingReading.id);
                                console.log(`[Checkout.Completed] Reset pdf_email_sent for returning buyer: ${userId}`);
                            }

                            console.log(`[Checkout.Completed] Triggering PDF email for subscriber: ${userId}, reading: ${existingReading.id}, pdfReady: ${!!existingReading.pdf_url}, forceResend: ${forceResend}`);

                            const pdfPromise = triggerPdfDeliveryEmail(
                                supabaseUrl,
                                supabaseServiceKey,
                                userId,
                                existingReading.id,
                                forceResend,
                            ).catch((err: any) => {
                                console.warn(`[Checkout.Completed] PDF email trigger failed: ${err.message}`);
                            });

                            const edgeRuntime = (globalThis as any).EdgeRuntime;
                            if (edgeRuntime?.waitUntil) {
                                edgeRuntime.waitUntil(pdfPromise);
                            }
                            await pdfPromise;
                        }
                    } catch (readingErr: any) {
                        console.warn(`[Checkout.Completed] Could not check reading status: ${readingErr.message}`);
                    }
                }

                // ── Send subscription-confirmation email ──────────────────────
                if (customerEmail) {
                    try {
                        const PLAN_NAMES: Record<string, string> = {
                            full_access_7day: "7-Day Full Access",
                            trial_1week:    "1-Week Trial",
                            plan_4week:     "4-Week Plan",
                            premium_12week: "12-Week Premium",
                            discovery:      "1-Week Trial",
                            growth:         "4-Week Plan",
                            premium:        "12-Week Premium",
                            "99.9":         "12-Week Premium",
                        };
                        const planName  = PLAN_NAMES[planType] || "Soul+AI Plan";
                        const isTopTier = ["premium_12week", "premium", "99.9"].includes(planType);
                        const userName  = session.customer_details?.name || (emailLang === "ru" ? "Исследователь" : "Explorer");

                        const mariaSection = isTopTier
                            ? emailLang === "ru"
                                ? `<div style="background:#FFF9F2;border:1px solid #FFEDD5;padding:20px;border-radius:12px;margin:25px 0;">
                                     <h3 style="color:#9A3412;margin-top:0;">🎁 Премиум бонус: 1:1 с Марией Лит</h3>
                                     <p style="color:#9A3412;">Как участнику премиум-плана, вам доступна личная сессия. Забронируйте её здесь:</p>
                                     <a href="https://calendly.com/marialit" style="background:#9A3412;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Записаться на сессию</a>
                                   </div>`
                                : `<div style="background:#FFF9F2;border:1px solid #FFEDD5;padding:20px;border-radius:12px;margin:25px 0;">
                                     <h3 style="color:#9A3412;margin-top:0;">🎁 Premium Bonus: 1:1 with Maria Lit</h3>
                                     <p style="color:#9A3412;">As a Premium member, you have a private session waiting. Book it here:</p>
                                     <a href="https://calendly.com/marialit" style="background:#9A3412;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:600;display:inline-block;">Book My Session</a>
                                   </div>`
                            : "";

                        const subject = emailLang === "ru"
                            ? `Ваша подписка Soul+AI активирована — план "${planName}"`
                            : `Your Soul+AI subscription is active — "${planName}" plan`;

                        const html = emailLang === "ru"
                            ? `<div style="font-family:sans-serif;padding:20px;line-height:1.6;color:#333;">
                                 <h2>Здравствуйте, ${userName}!</h2>
                                 <p>Ваша подписка на план <strong>"${planName}"</strong> успешно активирована.</p>
                                 <p>Ваше персональное чтение уже готовится. Как только оно будет готово, мы отправим его вам на почту вместе с PDF-отчётом.</p>
                                 <p style="margin:24px 0;">
                                   <a href="${siteUrl}/reading" style="background:#5D4BE0;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Перейти к чтению</a>
                                 </p>
                                 ${mariaSection}
                               </div>`
                            : `<div style="font-family:sans-serif;padding:20px;line-height:1.6;color:#333;">
                                 <h2>Welcome, ${userName}!</h2>
                                 <p>Your <strong>"${planName}"</strong> subscription is now active.</p>
                                 <p>Your personal reading is already being prepared. Once it's ready, we'll email it to you along with your PDF report.</p>
                                 <p style="margin:24px 0;">
                                   <a href="${siteUrl}/reading" style="background:#5D4BE0;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">Go to My Reading</a>
                                 </p>
                                 ${mariaSection}
                               </div>`;

                        await sendEmail(customerEmail, subject, html, "SoulPlus AI");
                        console.log(`[Checkout.Completed] Confirmation email sent to: ${customerEmail}`);
                    } catch (emailErr: any) {
                        console.error(`[Checkout.Completed] Confirmation email failed: ${emailErr.message}`);
                    }
                }

                // ── Notify owner ──────────────────────────────────────────────
                await sendEmail(
                    ownerEmail,
                    `SoulPlus AI: New Sale — ${planType}`,
                    `<div style="font-family:sans-serif;padding:20px;">
                       <h3>New Sale</h3>
                       <p><strong>Customer:</strong> ${customerEmail || "Unknown"}</p>
                       <p><strong>Plan:</strong> ${planType}</p>
                       <p><strong>User ID:</strong> ${userId || "unresolved"}</p>
                     </div>`,
                    "SoulPlus AI Sales",
                );

                // ── One-time payment: balance recharge ────────────────────────
                // Intro plan also uses payment mode (for a clean Checkout UI) — do not treat as recharge.
                if (userId && session.mode === "payment" && !isIntroPlanCheckout) {
                    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;
                    console.log(`[Checkout.Completed] Balance recharge for user: ${userId}, amount: $${amountPaid}`);

                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("balance")
                        .eq("id", userId)
                        .single();

                    const newBalance = (profile?.balance || 0) + amountPaid;

                    const { error: balErr } = await supabase
                        .from("profiles")
                        .update({ balance: newBalance, updated_at: new Date().toISOString() })
                        .eq("id", userId);

                    if (balErr) {
                        console.error(`[Checkout.Completed] Balance update error: ${balErr.message}`);
                        throw balErr;
                    }
                    console.log(`[Checkout.Completed] Balance updated for user: ${userId}, new balance: ${newBalance}`);
                }

                console.log(`[Checkout.Completed] Done — user: ${userId}, plan: ${planType}, mode: ${session.mode}`);
                break;
            }

            // ── Invoice paid (subscription renewal) ───────────────────────────
            case "invoice.created":
            case "invoice.paid":
            case "invoice.payment_succeeded": {
                const invoice      = event.data.object as Stripe.Invoice;
                const customerId   = invoice.customer as string;
                const subscriptionId = invoice.subscription as string;

                console.log(`[Invoice.${event.type}] Customer: ${customerId}, Sub: ${subscriptionId}`);

                let userId: string | null = null;

                const { data: subData } = await supabase
                    .from("subscriptions")
                    .select("user_id")
                    .eq("stripe_customer_id", customerId)
                    .maybeSingle();

                userId = subData?.user_id || null;

                if (!userId) {
                    const customer = await stripe.customers.retrieve(customerId);
                    if (!customer.deleted) {
                        userId = (customer as Stripe.Customer).metadata?.supabase_user_id ?? null;
                    }
                }

                if (userId && (event.type === "invoice.payment_succeeded" || event.type === "invoice.paid")) {
                    const { error } = await supabase
                        .from("subscriptions")
                        .upsert({
                            user_id:                userId,
                            stripe_customer_id:     customerId,
                            stripe_subscription_id: subscriptionId,
                            status:                 "active",
                            updated_at:             new Date().toISOString(),
                        }, { onConflict: "user_id" });

                    if (error) console.error(`[Invoice.Paid] Save error: ${error.message}`);
                    else console.log(`[Invoice.Paid] Subscription renewed for user: ${userId}`);
                } else if (!userId) {
                    console.warn(`[Invoice] Could not find user for customer: ${customerId}`);
                }
                break;
            }

            // ── Subscription updated ──────────────────────────────────────────
            case "customer.subscription.created":
            case "customer.subscription.updated": {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId   = subscription.customer as string;

                console.log(`[Subscription.Update] ${event.type}, Customer: ${customerId}`);

                const customer = await stripe.customers.retrieve(customerId);
                const userId   = !customer.deleted
                    ? (customer as Stripe.Customer).metadata?.supabase_user_id ?? null
                    : null;

                if (userId) {
                    const cancelAt = subscription.cancel_at
                        ? new Date(subscription.cancel_at * 1000).toISOString()
                        : null;

                    const { error } = await supabase
                        .from("subscriptions")
                        .upsert({
                            user_id:                userId,
                            stripe_customer_id:     customerId,
                            stripe_subscription_id: subscription.id,
                            status:                 subscription.status,
                            expires_at:             new Date(subscription.current_period_end * 1000).toISOString(),
                            current_period_start:   new Date(subscription.current_period_start * 1000).toISOString(),
                            current_period_end:     new Date(subscription.current_period_end * 1000).toISOString(),
                            cancel_at_period_end:   subscription.cancel_at_period_end ?? false,
                            cancel_at:              cancelAt,
                            updated_at:             new Date().toISOString(),
                        }, { onConflict: "user_id" });

                    if (error) console.error(`[Subscription.Update] Error: ${error.message}`);
                    else console.log(`[Subscription.Update] Updated for user: ${userId}`);
                }
                break;
            }

            // ── Subscription cancelled ────────────────────────────────────────
            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[Subscription.Deleted] Sub ID: ${subscription.id}`);

                const { error } = await supabase
                    .from("subscriptions")
                    .update({
                        status:                 "canceled",
                        plan_type:              "free",
                        cancel_at_period_end:   false,
                        cancel_at:              null,
                        stripe_subscription_id: null,
                        updated_at:             new Date().toISOString(),
                    })
                    .eq("stripe_subscription_id", subscription.id);

                if (error) console.error(`[Subscription.Deleted] Error: ${error.message}`);
                else console.log(`[Subscription.Deleted] Subscription ended, user downgraded to free`);
                break;
            }

            default:
                console.log(`[Webhook] Unhandled event type: ${event.type}`);
        }
    } catch (err: any) {
        console.error(`[Webhook] Processing error: ${err.message}`);
        return new Response(`Error: ${err.message}`, { status: 500 });
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });
});
