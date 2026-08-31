import { jsonResponse } from '../_shared/cors.ts'
import { corsPreflight } from '../_shared/cors.ts'

/**
 * Accounts are created after Stripe payment (stripe-webhook), not here.
 * Kept deployed so old clients get a clear error instead of a silent user.
 */
Deno.serve(async (req) => {
  const preflight = corsPreflight(req)
  if (preflight) return preflight
  return jsonResponse({ error: 'account_created_after_payment' }, 410)
})
