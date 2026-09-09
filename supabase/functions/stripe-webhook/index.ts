import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'
import {
  asText,
  provisionPaidAccount,
  sendMagicLink,
  upsertSubscription,
} from '../_shared/provision-account.ts'
import { sendEmail, trialEndingEmailHtml } from '../_shared/email.ts'
import {
  clearCancelParams,
  customerIdOf,
  invoiceSubscriptionId,
  isoFromUnix,
  isScheduledCancel,
  snapshotFromStripe,
  willCollectAfterTrial,
} from '../_shared/stripe-sub.ts'
import {
  AGENT_CREDIT_PACK_CREDITS,
  AGENT_CREDITS_KIND,
  creditWalletFromPaymentIntent,
} from '../_shared/agent-credits.ts'

/** V2 Stripe webhook. V1 lives under src/legacy and is not called from here. */

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  httpClient: Stripe.createFetchHttpClient(),
})

const INTRO_PLAN_SKU = 'full_access_7day'
const MONTHLY_PRODUCT_SKU = 'full_access_7day_monthly'

async function getOrCreateMonthlyProduct(): Promise<string> {
  const listed = await stripe.products.list({ limit: 100, active: true })
  const existing = listed.data.find((p) => p.metadata?.sku === MONTHLY_PRODUCT_SKU)
  if (existing) return existing.id

  const created = await stripe.products.create({
    name: 'Full Access Monthly',
    metadata: { sku: MONTHLY_PRODUCT_SKU, plan_type: INTRO_PLAN_SKU },
  })
  return created.id
}

async function findSubForCheckout(customerId: string, sessionId: string) {
  const existing = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 20 })
  return existing.data.find((s) => s.metadata?.checkout_session_id === sessionId) ?? null
}

async function createIntroSubscriptionFromPayment(
  session: Stripe.Checkout.Session,
  customerId: string,
  planType: string,
  intentId: string | null,
): Promise<Stripe.Subscription> {
  const already = await findSubForCheckout(customerId, session.id)
  if (already) {
    console.log(`[stripe-webhook] reusing Stripe sub ${already.id} for session ${session.id}`)
    return already
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id
  if (!paymentIntentId) {
    throw new Error('Intro checkout missing payment_intent')
  }

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId)
  const paymentMethodId =
    typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method?.id
  if (!paymentMethodId) {
    throw new Error('Intro checkout missing payment_method')
  }

  try {
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId })
  } catch (err) {
    const message = err instanceof Error ? err.message : ''
    if (!/already been attached|resource_already_exists/i.test(message)) throw err
  }

  await stripe.customers.update(customerId, {
    invoice_settings: { default_payment_method: paymentMethodId },
  })

  const productId = await getOrCreateMonthlyProduct()

  let created: Stripe.Subscription
  try {
    created = await stripe.subscriptions.create({
      customer: customerId,
      default_payment_method: paymentMethodId,
      collection_method: 'charge_automatically',
      off_session: true,
      trial_period_days: 7,
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      trial_settings: {
        end_behavior: { missing_payment_method: 'create_invoice' },
      },
      items: [{
        price_data: {
          currency: 'usd',
          product: productId,
          unit_amount: 699,
          recurring: { interval: 'month' },
        },
      }],
      metadata: {
        plan_type: planType,
        intent_id: intentId ?? '',
        checkout_session_id: session.id,
      },
    })
  } catch (err) {
    const raced = await findSubForCheckout(customerId, session.id)
    if (raced) return ensureWillCollect(raced)
    throw err
  }

  return ensureWillCollect(created)
}

/** Never leave a new trial with cancel_at set — that is how V1 skipped the $6.99 invoice. */
async function ensureWillCollect(sub: Stripe.Subscription): Promise<Stripe.Subscription> {
  let live = sub
  if (live.cancel_at || live.cancel_at_period_end) {
    console.warn(`[stripe-webhook] clearing scheduled cancel on new sub ${live.id}`)
    live = await stripe.subscriptions.update(live.id, clearCancelParams(live))
  }
  if (live.status !== 'trialing' && live.status !== 'active') {
    throw new Error(`Intro sub ${live.id} unexpected status ${live.status}`)
  }
  if (live.status === 'trialing' && !willCollectAfterTrial(live)) {
    throw new Error(`Intro sub ${live.id} would not charge after trial`)
  }
  console.log(
    `[stripe-webhook] monthly sub ${live.id} status=${live.status} trial_end=${isoFromUnix(live.trial_end)} will_charge=${willCollectAfterTrial(live) || live.status === 'active'}`,
  )
  return live
}

function invoiceAlreadyCollected(invoice: Stripe.Invoice | string | null | undefined): boolean {
  if (!invoice || typeof invoice === 'string') return false
  const paidCents = invoice.amount_paid ?? 0
  return Boolean(invoice.paid && paidCents > 0)
}

function trialReminderCopy(trialEnd: number | null): { title: string; subject: string } {
  if (!trialEnd) {
    return {
      title: 'Your trial ends soon',
      subject: 'Your Soul+AI trial ends soon',
    }
  }
  const daysLeft = Math.ceil((trialEnd * 1000 - Date.now()) / (24 * 60 * 60 * 1000))
  if (daysLeft <= 0) {
    return { title: 'Your trial ends today', subject: 'Your Soul+AI trial ends today' }
  }
  if (daysLeft === 1) {
    return { title: 'Your trial ends tomorrow', subject: 'Your Soul+AI trial ends tomorrow' }
  }
  return {
    title: `Your trial ends in ${daysLeft} days`,
    subject: `Your Soul+AI trial ends in ${daysLeft} days`,
  }
}

/**
 * Stripe can fire trial_will_end after the trial already converted and payment
 * was taken (trial_end=now, portal plan change, fewer than 3 days left).
 * Only remind when the live sub is still trialing and nothing has been charged.
 */
async function shouldSendTrialReminder(
  subscriptionId: string,
): Promise<{ send: boolean; live?: Stripe.Subscription; reason?: string }> {
  const live = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['latest_invoice'],
  })

  if (live.status !== 'trialing') {
    return { send: false, live, reason: `status=${live.status}` }
  }
  if (isScheduledCancel(live)) {
    return { send: false, live, reason: 'scheduled cancel' }
  }
  if (live.trial_end && live.trial_end * 1000 <= Date.now()) {
    return { send: false, live, reason: 'trial already ended' }
  }
  if (invoiceAlreadyCollected(live.latest_invoice as Stripe.Invoice | string | null)) {
    const invoice = live.latest_invoice as Stripe.Invoice
    return { send: false, live, reason: `invoice ${invoice.id} already paid` }
  }

  return { send: true, live }
}

type AdminClient = ReturnType<typeof createClient>

async function resolveOwner(
  admin: AdminClient,
  customerId: string,
): Promise<{
  ownerProfileId: string
  planType: string
  storedSubId?: string
  storedStatus: string
} | null> {
  const { data: existing } = await admin
    .from('subscriptions')
    .select('owner_profile_id, plan_type, stripe_subscription_id, status')
    .eq('stripe_customer_id', customerId)
    .maybeSingle()

  let ownerProfileId = existing?.owner_profile_id as string | undefined
  let planType = existing?.plan_type || INTRO_PLAN_SKU
  let storedSubId = existing?.stripe_subscription_id as string | undefined
  let storedStatus = (existing?.status as string | undefined)?.toLowerCase() ?? ''

  if (!ownerProfileId) {
    const customer = await stripe.customers.retrieve(customerId)
    const fromMeta =
      !customer.deleted ? (customer as Stripe.Customer).metadata?.soul_profile_id : null
    if (fromMeta) ownerProfileId = fromMeta
  }
  if (!ownerProfileId) return null

  if (!existing) {
    const { data: byOwner } = await admin
      .from('subscriptions')
      .select('plan_type, stripe_subscription_id, status')
      .eq('owner_profile_id', ownerProfileId)
      .maybeSingle()
    if (byOwner) {
      planType = byOwner.plan_type || planType
      storedSubId = byOwner.stripe_subscription_id as string | undefined
      storedStatus = (byOwner.status as string | undefined)?.toLowerCase() ?? ''
    }
  }

  return { ownerProfileId, planType, storedSubId, storedStatus }
}

/** Always retrieve the live Stripe subscription, then copy its fields into our row. */
async function syncLiveSubscription(
  admin: AdminClient,
  subscriptionId: string,
  opts: { deleted?: boolean } = {},
) {
  const live = await stripe.subscriptions.retrieve(subscriptionId)
  const owner = await resolveOwner(admin, customerIdOf(live))
  if (!owner) {
    console.warn(`[stripe-webhook] skip sync ${live.id} — no V2 profile`)
    return null
  }

  const livePaid = new Set(['active', 'trialing', 'past_due'])
  if (
    !opts.deleted &&
    owner.storedSubId &&
    owner.storedSubId !== live.id &&
    livePaid.has(owner.storedStatus)
  ) {
    console.log(
      `[stripe-webhook] skip ${live.id} — profile already on live sub ${owner.storedSubId}`,
    )
    return live
  }

  await upsertSubscription(
    admin,
    snapshotFromStripe(
      owner.ownerProfileId,
      live,
      owner.planType,
      opts.deleted ? 'canceled' : undefined,
    ),
  )
  console.log(
    `[stripe-webhook] synced ${live.id} status=${opts.deleted ? 'canceled' : live.status}`,
  )
  return live
}

function subscriptionIdFromEvent(event: Stripe.Event): string | null {
  if (event.type.startsWith('customer.subscription.')) {
    return (event.data.object as Stripe.Subscription).id ?? null
  }
  if (event.type.startsWith('invoice.')) {
    return invoiceSubscriptionId(event.data.object as Stripe.Invoice)
  }
  return null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200 })
  }

  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('Missing signature', { status: 400 })

  const body = await req.text()
  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') || '',
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid signature'
    console.error('[stripe-webhook] signature:', message)
    return new Response(`Webhook Error: ${message}`, { status: 400 })
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  if (!supabaseUrl || !serviceKey) {
    return new Response('server_misconfigured', { status: 500 })
  }

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { error: eventErr } = await admin.from('stripe_events').insert({
    id: event.id,
    type: event.type,
  })
  if (eventErr) {
    if (eventErr.code === '23505') {
      return new Response(JSON.stringify({ received: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    console.error('[stripe-webhook] event insert:', eventErr.message)
    return new Response('event_store_failed', { status: 500 })
  }

  console.log(`[stripe-webhook] ${event.type} ${event.id}`)

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        if (pi.metadata?.kind !== AGENT_CREDITS_KIND) {
          // Ignore PaymentIntents from quiz Checkout / other flows.
          console.log(`[stripe-webhook] skip PI ${pi.id} — not agent_credits`)
          break
        }

        const authUserId = asText(pi.metadata?.auth_user_id)
        if (!authUserId) {
          throw new Error(`agent_credits PI ${pi.id} missing auth_user_id metadata`)
        }

        const credits = Number(pi.metadata?.credits || AGENT_CREDIT_PACK_CREDITS)
        const result = await creditWalletFromPaymentIntent(admin, {
          authUserId,
          paymentIntentId: pi.id,
          credits: Number.isFinite(credits) && credits > 0 ? credits : AGENT_CREDIT_PACK_CREDITS,
          amountCents: pi.amount_received || pi.amount,
        })
        console.log(
          `[stripe-webhook] agent_credits PI=${pi.id} credited=${result.credited} already=${result.already}`,
        )
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        // Never let agent credit payments fall into quiz provisioning.
        if (session.metadata?.kind === AGENT_CREDITS_KIND) {
          console.log(`[stripe-webhook] skip checkout ${session.id} — agent_credits (use PaymentIntent path)`)
          break
        }
        const planType = session.metadata?.plan_type || INTRO_PLAN_SKU
        const intentId = asText(session.metadata?.intent_id)

        // V1 checkouts on this same Stripe account have no intent_id.
        // Ack them so we don't 500 — only V2 paywall sessions get an account + magic link.
        if (!intentId) {
          console.log(`[stripe-webhook] skip ${session.id} — no intent_id (V1 checkout)`)
          break
        }

        const isIntro = planType === INTRO_PLAN_SKU && session.mode === 'payment'

        let customerId =
          typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null

        if (!customerId && session.payment_intent) {
          const piId =
            typeof session.payment_intent === 'string'
              ? session.payment_intent
              : session.payment_intent.id
          const pi = await stripe.paymentIntents.retrieve(piId)
          customerId = typeof pi.customer === 'string' ? pi.customer : pi.customer?.id ?? null
        }

        if (!customerId) throw new Error('checkout missing Stripe customer')

        let stripeSub: Stripe.Subscription | null = null
        if (isIntro) {
          stripeSub = await createIntroSubscriptionFromPayment(
            session,
            customerId,
            planType,
            intentId,
          )
        } else if (typeof session.subscription === 'string') {
          stripeSub = await stripe.subscriptions.retrieve(session.subscription)
        }

        // V1 charged $0.99 then often never created a monthly sub — access without a bill.
        if (isIntro && !stripeSub) {
          throw new Error(`intro checkout ${session.id} has no monthly subscription`)
        }

        const { data: intent, error: intentErr } = await admin
          .from('quiz_intents')
          .select('id, email, quiz_answers, utm_source, utm_medium, utm_campaign, consumed_at')
          .eq('id', intentId)
          .maybeSingle()

        if (intentErr || !intent) throw intentErr ?? new Error('quiz intent not found')

        const alreadyConsumed = Boolean(intent.consumed_at)
        const answers =
          intent.quiz_answers && typeof intent.quiz_answers === 'object'
            ? (intent.quiz_answers as Record<string, unknown>)
            : {}

        const { userId, profileId } = await provisionPaidAccount(admin, {
          email: intent.email,
          answers,
          utm: {
            utm_source: intent.utm_source,
            utm_medium: intent.utm_medium,
            utm_campaign: intent.utm_campaign,
          },
        })

        if (stripeSub) {
          const liveSub = await stripe.subscriptions.retrieve(stripeSub.id)
          await upsertSubscription(
            admin,
            snapshotFromStripe(profileId, liveSub, planType),
          )
        }

        try {
          await stripe.customers.update(customerId, {
            metadata: {
              supabase_user_id: userId,
              soul_profile_id: profileId,
            },
          })
        } catch {
          /* non-fatal */
        }

        if (!alreadyConsumed) {
          const siteUrl = (Deno.env.get('SITE_URL') || 'http://localhost:8080').replace(/\/$/, '')
          await sendMagicLink(intent.email, `${siteUrl}/login/callback`)
          await admin
            .from('quiz_intents')
            .update({ consumed_at: new Date().toISOString() })
            .eq('id', intent.id)
        }

        console.log(`[stripe-webhook] provisioned profile=${profileId} user=${userId}`)
        break
      }

      case 'customer.subscription.trial_will_end': {
        const eventSub = event.data.object as Stripe.Subscription
        await syncLiveSubscription(admin, eventSub.id)
        const check = await shouldSendTrialReminder(eventSub.id)
        if (!check.send || !check.live) {
          console.log(`[stripe-webhook] skip trial email — ${check.reason ?? 'unknown'} ${eventSub.id}`)
          break
        }

        const live = check.live
        const customerId = customerIdOf(live)
        const owner = await resolveOwner(admin, customerId)
        if (!owner) {
          console.warn(`[stripe-webhook] trial_will_end: skip, no V2 profile for ${customerId}`)
          break
        }

        const { data: profile } = await admin
          .from('soul_profiles')
          .select('email, full_name')
          .eq('id', owner.ownerProfileId)
          .maybeSingle()

        let to = typeof profile?.email === 'string' ? profile.email : null
        if (!to) {
          const customer = await stripe.customers.retrieve(customerId)
          to = !customer.deleted ? (customer as Stripe.Customer).email ?? null : null
        }
        if (!to) throw new Error('trial_will_end missing email')

        const endUnix = live.trial_end ?? live.current_period_end
        const copy = trialReminderCopy(endUnix)
        const chargeDate = endUnix
          ? new Date(endUnix * 1000).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'the end of your trial'

        const siteUrl = (Deno.env.get('SITE_URL') || 'http://localhost:8080').replace(/\/$/, '')
        const name =
          (typeof profile?.full_name === 'string' && profile.full_name.trim()) ||
          to.split('@')[0] ||
          'there'

        await sendEmail(
          to,
          copy.subject,
          trialEndingEmailHtml({
            name,
            title: copy.title,
            chargeDate,
            manageUrl: `${siteUrl}/account/plan`,
          }),
        )
        break
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed':
      case 'invoice.created':
      case 'invoice.finalized':
      case 'invoice.paid':
      case 'invoice.payment_failed':
      case 'invoice.payment_action_required': {
        const subId = subscriptionIdFromEvent(event)
        if (!subId) {
          console.log(`[stripe-webhook] ${event.type} has no subscription id`)
          break
        }
        await syncLiveSubscription(admin, subId, {
          deleted: event.type === 'customer.subscription.deleted',
        })
        break
      }

      default:
        break
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(`[stripe-webhook] handler failed: ${message}`)
    await admin.from('stripe_events').delete().eq('id', event.id)
    return new Response(message, { status: 500 })
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
})
