import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  parseBirthDate,
  parseBirthPlace,
  parseBirthTime,
  parseFullName,
} from './quiz-fields.ts'

export function asText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed || null
}

export function siteUrlFrom(req: Request): string {
  const env = Deno.env.get('SITE_URL')?.replace(/\/$/, '')
  if (env) return env
  const origin = req.headers.get('origin')?.replace(/\/$/, '')
  if (origin) return origin
  return 'http://localhost:8080'
}

function isUniqueViolation(err: { code?: string; message?: string } | null) {
  return err?.code === '23505' || /duplicate key/i.test(err?.message ?? '')
}

export async function sendMagicLink(email: string, redirectTo: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  if (!supabaseUrl || !anonKey) {
    throw new Error('magic link skipped — missing anon credentials')
  }
  const anon = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error } = await anon.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: false,
    },
  })
  if (error) throw new Error(`magic link send failed: ${error.message}`)
}

async function upsertProfile(
  admin: SupabaseClient,
  userId: string,
  fields: Record<string, unknown>,
  startedAtFallback: string,
) {
  const { data: byAuth, error: byAuthErr } = await admin
    .from('soul_profiles')
    .select('id, quiz_started_at')
    .eq('auth_user_id', userId)
    .maybeSingle()

  if (byAuthErr) throw byAuthErr

  if (byAuth?.id) {
    const payload = {
      ...fields,
      quiz_started_at: byAuth.quiz_started_at ?? startedAtFallback,
    }
    const { error } = await admin.from('soul_profiles').update(payload).eq('id', byAuth.id)
    if (error && isUniqueViolation(error)) {
      const withoutEmail = { ...payload }
      delete withoutEmail.email
      const { error: retryErr } = await admin
        .from('soul_profiles')
        .update(withoutEmail)
        .eq('id', byAuth.id)
      if (retryErr) throw retryErr
    } else if (error) {
      throw error
    }
    return byAuth.id as string
  }

  const { data: inserted, error: insertErr } = await admin
    .from('soul_profiles')
    .upsert(
      { ...fields, quiz_started_at: startedAtFallback },
      { onConflict: 'email' },
    )
    .select('id')
    .single()

  if (insertErr || !inserted?.id) throw insertErr ?? new Error('profile upsert failed')

  await admin
    .from('soul_profiles')
    .update({ auth_user_id: userId })
    .eq('id', inserted.id)

  return inserted.id as string
}

export type ProvisionInput = {
  email: string
  answers: Record<string, unknown>
  utm: {
    utm_source: string | null
    utm_medium: string | null
    utm_campaign: string | null
  }
}

export async function provisionPaidAccount(
  admin: SupabaseClient,
  input: ProvisionInput,
): Promise<{ userId: string; profileId: string }> {
  const fullName = parseFullName(input.answers)
  const now = new Date().toISOString()

  const { data: existingId, error: lookupErr } = await admin.rpc('auth_user_id_by_email', {
    p_email: input.email,
  })
  if (lookupErr) throw lookupErr

  let userId = (existingId as string | null) ?? null

  if (!userId) {
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: input.email,
      email_confirm: true,
      user_metadata: {
        source: 'quiz',
        full_name: fullName,
      },
    })

    if (created?.user?.id) {
      userId = created.user.id
    } else if (createErr) {
      const { data: retryId } = await admin.rpc('auth_user_id_by_email', { p_email: input.email })
      userId = (retryId as string | null) ?? null
      if (!userId) throw createErr
    }
  }

  if (!userId) throw new Error('auth_create_failed')

  const profileFields = {
    auth_user_id: userId,
    email: input.email,
    full_name: fullName,
    birth_date: parseBirthDate(input.answers.birthdate),
    birth_time: parseBirthTime(input.answers['birth-time-known'], input.answers['birth-time']),
    birth_place: parseBirthPlace(input.answers),
    quiz_answers: input.answers,
    quiz_completed_at: now,
    source: 'quiz',
    ...input.utm,
  }

  const profileId = await upsertProfile(admin, userId, profileFields, now)
  return { userId, profileId }
}

export type SubscriptionSnapshot = {
  ownerProfileId: string
  status: string
  planType: string
  stripeCustomerId: string | null
  stripeSubscriptionId: string | null
  periodStart: string | null
  periodEnd: string | null
  cancelAtPeriodEnd?: boolean
  cancelAt?: string | null
}

export async function upsertSubscription(admin: SupabaseClient, snap: SubscriptionSnapshot) {
  const { error } = await admin.from('subscriptions').upsert(
    {
      owner_profile_id: snap.ownerProfileId,
      status: snap.status,
      plan_type: snap.planType,
      stripe_customer_id: snap.stripeCustomerId,
      stripe_subscription_id: snap.stripeSubscriptionId,
      expires_at: snap.periodEnd,
      current_period_start: snap.periodStart,
      current_period_end: snap.periodEnd,
      cancel_at_period_end: snap.cancelAtPeriodEnd ?? false,
      cancel_at: snap.cancelAt ?? null,
    },
    { onConflict: 'owner_profile_id' },
  )
  if (error) throw error
}
