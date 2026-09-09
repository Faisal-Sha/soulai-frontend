import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'
import {
  AGENT_CREDIT_PACK_CENTS,
  AGENT_CREDIT_PACK_CREDITS,
  AGENT_CREDIT_PACK_LABEL,
  AGENT_CREDITS_KIND,
  creditWalletFromPaymentIntent,
} from '../_shared/agent-credits.ts'

/**
 * Charge saved card $7 for 10 agent message credits (PaymentIntent, no Checkout).
 * Does NOT touch create-checkout-session / quiz intro flow.
 */

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  httpClient: Stripe.createFetchHttpClient(),
})

Deno.serve(async (req) => {
  const preflight = corsPreflight(req)
  if (preflight) return preflight

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  if (!supabaseUrl || !serviceKey || !anonKey) {
    return jsonResponse({ error: 'server_misconfigured' }, 500)
  }

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')?.trim()
  if (!stripeKey) {
    return jsonResponse({ error: 'Payment is not configured' }, 503)
  }

  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return jsonResponse({ error: 'Unauthorized' }, 401)

  const userClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const {
    data: { user },
    error: authError,
  } = await userClient.auth.getUser()
  if (authError || !user) return jsonResponse({ error: 'Unauthorized' }, 401)

  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })

  const { data: profile, error: profileErr } = await admin
    .from('soul_profiles')
    .select('id, email, full_name')
    .eq('auth_user_id', user.id)
    .maybeSingle()

  if (profileErr || !profile?.id) {
    return jsonResponse({ error: 'No profile found' }, 404)
  }

  const { data: sub } = await admin
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('owner_profile_id', profile.id)
    .maybeSingle()

  const customerId = (sub?.stripe_customer_id || '').trim()
  if (!customerId) {
    return jsonResponse(
      {
        error: 'no_payment_method',
        message: 'No Stripe customer on file. Complete plan checkout first, then top up.',
      },
      400,
    )
  }

  try {
    const customer = await stripe.customers.retrieve(customerId)
    if (customer.deleted) {
      return jsonResponse({ error: 'no_payment_method', message: 'Card on file is missing.' }, 400)
    }

    let paymentMethodId: string | null = null
    const defaultPm = customer.invoice_settings?.default_payment_method
    if (typeof defaultPm === 'string') paymentMethodId = defaultPm
    else if (defaultPm && typeof defaultPm === 'object' && 'id' in defaultPm) {
      paymentMethodId = (defaultPm as { id: string }).id
    }

    if (!paymentMethodId) {
      const listed = await stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
        limit: 1,
      })
      paymentMethodId = listed.data[0]?.id ?? null
    }

    if (!paymentMethodId) {
      return jsonResponse(
        {
          error: 'no_payment_method',
          message: 'No card on file. Add a card from your plan, then try again.',
        },
        400,
      )
    }

    const pi = await stripe.paymentIntents.create({
      amount: AGENT_CREDIT_PACK_CENTS,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      off_session: true,
      description: AGENT_CREDIT_PACK_LABEL,
      metadata: {
        kind: AGENT_CREDITS_KIND,
        auth_user_id: user.id,
        soul_profile_id: profile.id,
        credits: String(AGENT_CREDIT_PACK_CREDITS),
        amount_cents: String(AGENT_CREDIT_PACK_CENTS),
      },
    })

    if (pi.status === 'succeeded') {
      const result = await creditWalletFromPaymentIntent(admin, {
        authUserId: user.id,
        paymentIntentId: pi.id,
        credits: AGENT_CREDIT_PACK_CREDITS,
        amountCents: AGENT_CREDIT_PACK_CENTS,
      })

      const wallet = (result.wallet || {}) as {
        free_remaining?: number
        free_granted?: number
        credit_balance?: number
      }

      return jsonResponse({
        success: true,
        payment_intent_id: pi.id,
        already: result.already,
        credits_added: result.already ? 0 : AGENT_CREDIT_PACK_CREDITS,
        free_remaining: Number(wallet.free_remaining ?? 0),
        free_granted: Number(wallet.free_granted ?? 5),
        credit_balance: Number(wallet.credit_balance ?? 0),
      })
    }

    if (pi.status === 'requires_action' || pi.status === 'requires_confirmation') {
      return jsonResponse(
        {
          error: 'requires_action',
          message: 'Card needs extra verification. Use a card that supports off-session charges.',
          payment_intent_id: pi.id,
          status: pi.status,
        },
        402,
      )
    }

    return jsonResponse(
      {
        error: 'payment_failed',
        message: `Payment status: ${pi.status}`,
        payment_intent_id: pi.id,
        status: pi.status,
      },
      402,
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'charge_failed'
    console.error('[charge-agent-credits]', message)
    const declined = /card|declined|insufficient|authentication/i.test(message)
    return jsonResponse(
      {
        error: declined ? 'card_declined' : 'charge_failed',
        message,
      },
      declined ? 402 : 400,
    )
  }
})
