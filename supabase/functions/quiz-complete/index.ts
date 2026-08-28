import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsPreflight, jsonResponse } from '../_shared/cors.ts'
import {
  normalizeEmail,
  parseBirthDate,
  parseBirthPlace,
  parseBirthTime,
  parseFullName,
} from '../_shared/quiz-fields.ts'

type QuizCompleteBody = {
  email?: unknown
  answers?: unknown
  utm_source?: unknown
  utm_medium?: unknown
  utm_campaign?: unknown
}

function asText(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed || null
}

function siteUrlFrom(req: Request): string {
  const env = Deno.env.get('SITE_URL')?.replace(/\/$/, '')
  if (env) return env
  const origin = req.headers.get('origin')?.replace(/\/$/, '')
  if (origin) return origin
  return 'http://localhost:5173'
}

Deno.serve(async (req) => {
  const preflight = corsPreflight(req)
  if (preflight) return preflight

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  try {
    const body = (await req.json()) as QuizCompleteBody
    const email = normalizeEmail(body.email)
    const answers =
      body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
        ? (body.answers as Record<string, unknown>)
        : null

    if (!email) return jsonResponse({ error: 'invalid_email' }, 400)
    if (!answers) return jsonResponse({ error: 'invalid_answers' }, 400)

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? ''

    if (!supabaseUrl || !serviceKey) {
      console.error('[quiz-complete] missing service credentials')
      return jsonResponse({ error: 'server_misconfigured' }, 500)
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const fullName = parseFullName(answers)
    const birthDate = parseBirthDate(answers.birthdate)
    const birthTime = parseBirthTime(answers['birth-time-known'], answers['birth-time'])
    const birthPlace = parseBirthPlace(answers)
    const now = new Date().toISOString()
    const utm = {
      utm_source: asText(body.utm_source),
      utm_medium: asText(body.utm_medium),
      utm_campaign: asText(body.utm_campaign),
    }

    let userId: string | null = null
    const { data: existingId, error: lookupErr } = await admin.rpc('auth_user_id_by_email', {
      p_email: email,
    })
    if (lookupErr) {
      console.error('[quiz-complete] auth lookup failed:', lookupErr.message)
      return jsonResponse({ error: 'auth_lookup_failed' }, 500)
    }
    userId = (existingId as string | null) ?? null

    if (!userId) {
      const { data: created, error: createErr } = await admin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          source: 'quiz',
          full_name: fullName,
        },
      })

      if (created?.user?.id) {
        userId = created.user.id
      } else if (createErr) {
        const { data: retryId } = await admin.rpc('auth_user_id_by_email', { p_email: email })
        userId = (retryId as string | null) ?? null
        if (!userId) {
          console.error('[quiz-complete] createUser failed:', createErr.message)
          return jsonResponse({ error: 'auth_create_failed' }, 500)
        }
      }
    }

    if (!userId) return jsonResponse({ error: 'auth_create_failed' }, 500)

    const profileFields = {
      auth_user_id: userId,
      email,
      full_name: fullName,
      birth_date: birthDate,
      birth_time: birthTime,
      birth_place: birthPlace,
      quiz_answers: answers,
      quiz_completed_at: now,
      source: 'quiz',
      ...utm,
    }

    const { data: byAuth, error: byAuthErr } = await admin
      .from('soul_profiles')
      .select('id, quiz_started_at')
      .eq('auth_user_id', userId)
      .maybeSingle()

    if (byAuthErr) {
      console.error('[quiz-complete] profile lookup failed:', byAuthErr.message)
      return jsonResponse({ error: 'db_error' }, 500)
    }

    let profileId = byAuth?.id as string | undefined

    if (profileId) {
      const { error: updateErr } = await admin
        .from('soul_profiles')
        .update({
          ...profileFields,
          quiz_started_at: byAuth?.quiz_started_at ?? now,
        })
        .eq('id', profileId)

      if (updateErr) {
        console.error('[quiz-complete] profile update failed:', updateErr.message)
        return jsonResponse({ error: 'db_error' }, 500)
      }
    } else {
      const { data: inserted, error: insertErr } = await admin
        .from('soul_profiles')
        .upsert(
          {
            ...profileFields,
            quiz_started_at: now,
          },
          { onConflict: 'email' },
        )
        .select('id')
        .single()

      if (insertErr || !inserted?.id) {
        console.error('[quiz-complete] profile upsert failed:', insertErr?.message)
        return jsonResponse({ error: 'db_error' }, 500)
      }
      profileId = inserted.id as string
    }

    if (anonKey) {
      const anon = createClient(supabaseUrl, anonKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      })
      const { error: otpErr } = await anon.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrlFrom(req)}/login/callback`,
          shouldCreateUser: false,
        },
      })
      if (otpErr) console.warn('[quiz-complete] magic link send failed:', otpErr.message)
    }

    return jsonResponse({
      profile_id: profileId,
      auth_user_id: userId,
    })
  } catch (err) {
    console.error('[quiz-complete] unexpected error:', err)
    return jsonResponse({ error: 'internal_error' }, 500)
  }
})
