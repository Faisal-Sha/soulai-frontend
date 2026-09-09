/** Shared constants + idempotent wallet credit for agent $7 pack. */

export const AGENT_CREDITS_KIND = 'agent_credits'
export const AGENT_CREDIT_PACK_CENTS = 700
export const AGENT_CREDIT_PACK_CREDITS = 10
export const AGENT_CREDIT_PACK_LABEL = '10 AI agent messages'

// deno-lint-ignore no-explicit-any
type AdminClient = any

export async function alreadyCreditedPaymentIntent(
  admin: AdminClient,
  paymentIntentId: string,
): Promise<boolean> {
  const { data, error } = await admin.rpc('agent_credits_already_applied', {
    p_payment_intent_id: paymentIntentId,
  })
  if (error) {
    console.warn('[agent-credits] idempotency lookup:', error.message)
    return false
  }
  return Boolean(data)
}

export async function creditWalletFromPaymentIntent(
  admin: AdminClient,
  opts: {
    authUserId: string
    paymentIntentId: string
    credits?: number
    amountCents?: number
  },
): Promise<{ credited: boolean; already: boolean; wallet: unknown }> {
  const credits = opts.credits ?? AGENT_CREDIT_PACK_CREDITS

  if (await alreadyCreditedPaymentIntent(admin, opts.paymentIntentId)) {
    const { data } = await admin.rpc('agent_wallet_get', { p_user_id: opts.authUserId })
    return { credited: false, already: true, wallet: Array.isArray(data) ? data[0] : data }
  }

  const { data, error } = await admin.rpc('agent_wallet_topup', {
    p_user_id: opts.authUserId,
    p_credits: credits,
    p_reason: 'topup',
    p_meta: {
      source: 'stripe',
      kind: AGENT_CREDITS_KIND,
      stripe_payment_intent_id: opts.paymentIntentId,
      amount_cents: opts.amountCents ?? AGENT_CREDIT_PACK_CENTS,
      credits,
    },
  })

  if (error) throw new Error(error.message)

  return {
    credited: true,
    already: false,
    wallet: Array.isArray(data) ? data[0] : data,
  }
}
