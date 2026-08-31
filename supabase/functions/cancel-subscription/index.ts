import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@14.21.0'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'
import { sendEmail, cancellationEmailHtml } from '../_shared/email.ts'

/** V2 cancel / keep-plan. JWT required. Stripe is source of truth; webhook will re-sync. */

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  httpClient: Stripe.createFetchHttpClient(),
})

const CANCELABLE = new Set(['active', 'trialing'])

Deno.serve(async (req) => {
  const preflight = corsPreflight(req)
  if (preflight) return preflight

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  if (!supabaseUrl || !serviceKey || !anonKey) {
    return jsonResponse({ error: 'server_misconfigured' }, 500)
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

  let action = 'cancel'
  try {
    const body = await req.json().catch(() => ({}))
    if (body && typeof body === 'object' && (body as { action?: string }).action === 'resume') {
      action = 'resume'
    }
  } catch {
    /* empty body = cancel */
  }

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

  const { data: sub, error: subErr } = await admin
    .from('subscriptions')
    .select('stripe_subscription_id, status, cancel_at_period_end, current_period_end, expires_at')
    .eq('owner_profile_id', profile.id)
    .maybeSingle()

  if (subErr || !sub?.stripe_subscription_id) {
    return jsonResponse({ error: 'No subscription found' }, 404)
  }

  try {
    const live = await stripe.subscriptions.retrieve(sub.stripe_subscription_id)

    if (action === 'resume') {
      if (live.status === 'canceled' || live.status === 'unpaid' || live.status === 'incomplete_expired') {
        return jsonResponse({ error: 'Subscription already ended. Start a new plan to continue.' }, 400)
      }
      if (!live.cancel_at_period_end) {
        return jsonResponse({ success: true, already: true, cancel_at: null })
      }

      const updated = await stripe.subscriptions.update(live.id, {
        cancel_at_period_end: false,
      })

      await admin.from('subscriptions').update({
        status: updated.status,
        cancel_at_period_end: false,
        cancel_at: null,
        expires_at: isoFromUnix(updated.current_period_end),
        current_period_end: isoFromUnix(updated.current_period_end),
      }).eq('owner_profile_id', profile.id)

      return jsonResponse({ success: true, cancel_at: null })
    }

    if (!CANCELABLE.has(live.status)) {
      return jsonResponse({ error: 'Subscription is not active or in trial' }, 400)
    }

    const cancelAtUnix = live.cancel_at ?? live.trial_end ?? live.current_period_end
    const cancelAt = isoFromUnix(cancelAtUnix)

    if (live.cancel_at_period_end) {
      await admin.from('subscriptions').update({
        cancel_at_period_end: true,
        cancel_at: cancelAt,
      }).eq('owner_profile_id', profile.id)
      return jsonResponse({ success: true, already: true, cancel_at: cancelAt })
    }

    const updated = await stripe.subscriptions.update(live.id, {
      cancel_at_period_end: true,
    })

    const accessUntil = isoFromUnix(
      updated.cancel_at ?? updated.trial_end ?? updated.current_period_end,
    )

    await admin.from('subscriptions').update({
      status: updated.status,
      cancel_at_period_end: true,
      cancel_at: accessUntil,
      expires_at: isoFromUnix(updated.current_period_end),
      current_period_end: isoFromUnix(updated.current_period_end),
    }).eq('owner_profile_id', profile.id)

    const to = (typeof profile.email === 'string' && profile.email) || user.email
    if (to) {
      try {
        const siteUrl = (Deno.env.get('SITE_URL') || 'http://localhost:8080').replace(/\/$/, '')
        const accessLabel = accessUntil
          ? new Date(accessUntil).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
          : 'the end of this period'
        const name =
          (typeof profile.full_name === 'string' && profile.full_name.trim()) ||
          to.split('@')[0] ||
          'there'
        await sendEmail(
          to,
          'Your Soul+AI plan is cancelled',
          cancellationEmailHtml({
            name,
            accessUntil: accessLabel,
            manageUrl: `${siteUrl}/account/plan`,
          }),
        )
      } catch (emailErr) {
        const message = emailErr instanceof Error ? emailErr.message : String(emailErr)
        console.error('[cancel-subscription] email failed:', message)
      }
    }

    return jsonResponse({ success: true, cancel_at: accessUntil })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[cancel-subscription]', message)
    return jsonResponse({ error: message }, 500)
  }
})

function isoFromUnix(seconds: number | null | undefined): string | null {
  if (!seconds) return null
  return new Date(seconds * 1000).toISOString()
}
