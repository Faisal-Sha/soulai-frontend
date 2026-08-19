// Supabase Edge Function: quiz-lead
// Receives email + answers + UTM, upserts quiz_leads, creates auth account,
// and fires reading generation — all independent of Stripe.
// Account is created without email_confirm so Supabase sends its own
// confirmation email → user clicks → /set-password → sets password → logged in.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface QuizLeadRequest {
  email: string
  answers: Record<string, unknown>
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body: QuizLeadRequest = await req.json()
    const { email, answers, utm_source, utm_medium, utm_campaign } = body

    // 1. Validate email
    if (!email || !EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'invalid_email' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const serviceKey  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const siteUrl     = Deno.env.get('SITE_URL') || 'https://soulplus-ai.com'

    const supabase = createClient(supabaseUrl, serviceKey)

    // ── 2. Upsert quiz_leads ──────────────────────────────────────────────────
    const { data: leadData, error: dbError } = await supabase
      .from('quiz_leads')
      .upsert(
        {
          email,
          answers,
          completed_at: new Date().toISOString(),
          utm_source,
          utm_medium,
          utm_campaign,
        },
        { onConflict: 'email' },
      )
      .select('id')
      .single()

    if (dbError) {
      console.error('[quiz-lead] DB error:', dbError)
      return new Response(JSON.stringify({ error: 'db_error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const leadId: string = leadData.id

    // ── 3. Auto account creation ──────────────────────────────────────────────
    // Extract name and DOB from quiz answers for the profile
    // Quiz DateInput stores day/month/year as STRINGS (e.g. "09","14","1996")
    const quizName = (answers.name as string) || null
    const birthdate = answers.birthdate as {
      day?: string | number
      month?: string | number
      year?: string | number
    } | null
    let dob: string | null = null
    if (birthdate?.day != null && birthdate?.month != null && birthdate?.year != null) {
      const day = String(birthdate.day).trim()
      const month = String(birthdate.month).trim()
      const year = String(birthdate.year).trim()
      if (day && month && year && /^\d+$/.test(day) && /^\d+$/.test(month) && /^\d{4}$/.test(year)) {
        dob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      }
    }
    console.log(`[quiz-lead] birthdate raw=`, birthdate, `→ dob=${dob}`)

    let userId: string | null = null
    let isNewUser = false

    // Check if auth user already exists for this email
    const { data: { users: existingUsers } } = await supabase.auth.admin.listUsers({ perPage: 1000 })
    const existingAuthUser = existingUsers?.find((u: any) => u.email === email)

    if (existingAuthUser) {
      // User already exists — just make sure profile is up to date
      userId = existingAuthUser.id
      isNewUser = false
      console.log(`[quiz-lead] Existing user found: ${userId}`)

      // Update profile with latest quiz data (name + dob) if missing
      const updatePayload: Record<string, unknown> = {}
      if (quizName) updatePayload.full_name = quizName
      if (dob)      updatePayload.dob = dob
      if (Object.keys(updatePayload).length > 0) {
        await supabase.from('profiles').update(updatePayload).eq('id', userId)
      }
    } else {
      // Create new auth user — email_confirm: true so they can log in after setting password
      isNewUser = true
      console.log(`[quiz-lead] Creating new user for: ${email}`)

      // email_confirm is NOT set (defaults to false) — Supabase will send its
      // built-in confirmation email automatically. The redirect URL in that email
      // is set in: Dashboard → Authentication → Email Templates → Confirm signup
      // → redirect to: {SITE_URL}/set-password
      // User clicks → /set-password → sets password → logged in.
      const { data: newUser, error: createErr } = await supabase.auth.admin.createUser({
        email,
        user_metadata: {
          source: 'quiz_lead',
          full_name: quizName || null,
        },
      })

      if (createErr || !newUser?.user) {
        console.error(`[quiz-lead] Failed to create user: ${createErr?.message}`)
        // Non-fatal — still return lead_id so quiz flow continues
        return new Response(JSON.stringify({ lead_id: leadId }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      userId = newUser.user.id

      // Small pause to let the DB trigger create the profiles row
      await new Promise(r => setTimeout(r, 400))

      // Populate profile with name + dob
      const profilePayload: Record<string, unknown> = { email }
      if (quizName) profilePayload.full_name = quizName
      if (dob)      profilePayload.dob = dob
      await supabase.from('profiles').update(profilePayload).eq('id', userId)

      // ── Send confirmation email via generateLink ──────────────────────────
      // admin.createUser does NOT auto-send any email — we must trigger it.
      // We use type: 'signup' so Supabase sends its standard confirmation email
      // with a link that verifies the email AND redirects to /set-password.
      // This link is valid for the OTP expiry set in Dashboard → Auth → Email
      // (set it to 86400 = 24 hours so it doesn't expire before user pays).
      try {
        const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
          type: 'signup',
          email,
          options: { redirectTo: `${siteUrl}/set-password` },
        })

        if (linkErr) {
          console.error(`[quiz-lead] generateLink error: ${linkErr.message}`)
        } else {
          const confirmLink = linkData?.properties?.action_link
          console.log(`[quiz-lead] Confirmation link generated, sending email to: ${email}`)

          const resendKey = Deno.env.get('RESEND_API_KEY') ?? ''
          const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'noreply@soulplus-ai.com'
          const displayName = quizName || 'Explorer'

          if (resendKey && confirmLink) {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: `Soul+AI <${fromEmail}>`,
                to: [email],
                subject: 'Confirm your email — your Soul+AI reading is being prepared',
                html: `
                  <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; color: #333; padding: 24px;">
                    <h2 style="color: #5D4BE0; margin-bottom: 8px;">Welcome to Soul+AI, ${displayName}!</h2>
                    <p style="line-height: 1.6; color: #555;">
                      Your personal Destiny Matrix reading is being generated right now.
                    </p>
                    <p style="line-height: 1.6; color: #555;">
                      Click the button below to confirm your email and set your password.
                      You'll need it to access your reading after you subscribe.
                    </p>
                    <p style="margin: 32px 0;">
                      <a href="${confirmLink}"
                         style="background: #5D4BE0; color: white; padding: 14px 32px; border-radius: 8px;
                                text-decoration: none; font-weight: 600; display: inline-block; font-size: 15px;">
                        Confirm Email &amp; Set Password
                      </a>
                    </p>
                    <p style="font-size: 13px; color: #999; line-height: 1.5;">
                      This link expires in 24 hours. If you didn't sign up for Soul+AI, you can safely ignore this email.
                    </p>
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 28px 0;" />
                    <p style="font-size: 12px; color: #bbb;">
                      Soul+AI · <a href="https://www.soulplus-ai.com" style="color: #5D4BE0; text-decoration: none;">soulplus-ai.com</a>
                    </p>
                  </div>
                `,
              }),
            })
            console.log(`[quiz-lead] Confirmation email sent to: ${email}`)
          }
        }
      } catch (emailErr: any) {
        // Non-fatal — account is created, reading will still generate
        console.error(`[quiz-lead] Failed to send confirmation email: ${emailErr.message}`)
      }
    }

    // Link quiz_lead to the user
    await supabase.from('quiz_leads').update({ user_id: userId }).eq('id', leadId)

    // ── 4. Reading generation (non-blocking) ─────────────────────────────────
    // Reading starts immediately — completely independent of Stripe checkout.
    // plan_type is always 'standard' — one reading for all users.
    if (userId) {
      try {
        const generateUrl = `${supabaseUrl}/functions/v1/generate-reading`
        fetch(generateUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serviceKey}`,
          },
          body: JSON.stringify({
            userId,
            leadId,
            planType: 'standard',
          }),
        }).catch((err: any) => {
          console.warn(`[quiz-lead] generate-reading fire-and-forget error: ${err.message}`)
        })
        console.log(`[quiz-lead] Reading generation triggered for user: ${userId}`)
      } catch (genErr: any) {
        // Non-fatal — reading can be triggered again from ProcessingPage
        console.error(`[quiz-lead] Failed to trigger reading generation: ${genErr.message}`)
      }
    }

    // ── 6. Customer.io identify + event (non-blocking) ────────────────────────
    try {
      const cioApiKey = Deno.env.get('CUSTOMERIO_API_KEY') ?? ''
      const cioSiteId = Deno.env.get('CUSTOMERIO_SITE_ID') ?? ''

      if (cioApiKey && cioSiteId) {
        const authHeader = `Basic ${btoa(`${cioSiteId}:${cioApiKey}`)}`

        await fetch(`https://track.customer.io/api/v1/customers/${encodeURIComponent(email)}`, {
          method: 'PUT',
          headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, quiz_completed: true, ...answers, utm_source, utm_medium, utm_campaign }),
        })

        await fetch(
          `https://track.customer.io/api/v1/customers/${encodeURIComponent(email)}/events`,
          {
            method: 'POST',
            headers: { Authorization: authHeader, 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'quiz_completed' }),
          },
        )
      }
    } catch (cioErr: any) {
      console.error('[quiz-lead] Customer.io error (non-blocking):', cioErr)
    }

    return new Response(JSON.stringify({ lead_id: leadId }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('[quiz-lead] Unexpected error:', err)
    return new Response(JSON.stringify({ error: 'internal_error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
