import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'
import { asText, siteUrlFrom } from '../_shared/provision-account.ts'
import { normalizeEmail } from '../_shared/quiz-fields.ts'

const STRIPE_TIMEOUT_MS = 15_000
const INTRO_PLAN_SKU = 'full_access_7day'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  httpClient: Stripe.createFetchHttpClient(),
  timeout: STRIPE_TIMEOUT_MS,
  maxNetworkRetries: 1,
})

type CheckoutBody = {
  planId?: unknown
  email?: unknown
  answers?: unknown
  utm_source?: unknown
  utm_medium?: unknown
  utm_campaign?: unknown
  siteUrl?: unknown
}

Deno.serve(async (req) => {
  const preflight = corsPreflight(req)
  if (preflight) return preflight

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  const startedAt = Date.now()

  try {
    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
    if (!stripeKey) {
      return jsonResponse({ error: 'Payment is not configured' }, 503)
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    if (!supabaseUrl || !serviceKey) {
      return jsonResponse({ error: 'server_misconfigured' }, 500)
    }

    const body = (await req.json().catch(() => ({}))) as CheckoutBody
    const email = normalizeEmail(body.email)
    const answers =
      body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
        ? (body.answers as Record<string, unknown>)
        : null
    const planId = asText(body.planId) || INTRO_PLAN_SKU

    if (!email) return jsonResponse({ error: 'invalid_email' }, 400)
    if (!answers) return jsonResponse({ error: 'invalid_answers' }, 400)
    if (planId !== INTRO_PLAN_SKU) {
      return jsonResponse({ error: `Unknown planId: ${planId}` }, 400)
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const { data: intent, error: intentErr } = await admin
      .from('quiz_intents')
      .insert({
        email,
        quiz_answers: answers,
        utm_source: asText(body.utm_source),
        utm_medium: asText(body.utm_medium),
        utm_campaign: asText(body.utm_campaign),
      })
      .select('id')
      .single()

    if (intentErr || !intent?.id) {
      console.error('[create-checkout-session] intent insert failed:', intentErr?.message)
      return jsonResponse({ error: 'could_not_start_checkout' }, 500)
    }

    const siteUrl = siteUrlFrom(req)
    const clientOrigin = asText(body.siteUrl)?.replace(/\/$/, '')
    const origin = clientOrigin || Deno.env.get('SITE_URL')?.replace(/\/$/, '') || siteUrl

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: email,
      customer_creation: 'always',
      success_url: `${origin}/paid?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/quiz/paywall`,
      metadata: {
        plan_type: planId,
        intent_id: intent.id,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: 'Introductory access fee' },
            unit_amount: 99,
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        setup_future_usage: 'off_session',
      },
    })

    await admin
      .from('quiz_intents')
      .update({ stripe_checkout_session_id: session.id })
      .eq('id', intent.id)

    console.log(`[create-checkout-session] ${session.id} intent=${intent.id} (${Date.now() - startedAt}ms)`)
    return jsonResponse({ url: session.url, intent_id: intent.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'checkout_failed'
    const isTimeout = /timeout|timed out|abort/i.test(message)
    console.error('[create-checkout-session]', message)
    return jsonResponse(
      {
        error: isTimeout ? 'Payment provider timed out. Please try again.' : message,
      },
      isTimeout ? 504 : 400,
    )
  }
})
