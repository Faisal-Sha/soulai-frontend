import { Resend } from 'npm:resend@3.2.0'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') || '')

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  fromName = 'SoulPlus AI',
) {
  const fromEmail = Deno.env.get('RESEND_FROM_EMAIL') || 'onboarding@resend.dev'
  const { data, error } = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [to],
    subject,
    html: `
      <div style="font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        ${html}
        <hr style="border:0;border-top:1px solid #eee;margin:30px 0;" />
        <p style="font-size:12px;color:#888;">
          This email was sent because of a purchase on
          <a href="https://www.soulplus-ai.com" style="color:#5D4BE0;">SoulPlus AI</a>.
          Questions? Reply to this email.
        </p>
      </div>
    `,
  })
  if (error) {
    console.error(`[Email] Error sending to ${to}:`, error)
    throw new Error(typeof error.message === 'string' ? error.message : 'resend_failed')
  }
  console.log(`[Email] Sent to ${to}: ${data?.id}`)
  return data
}

export function trialEndingEmailHtml(opts: {
  name: string
  chargeDate: string
  manageUrl: string
  title: string
}) {
  const safeName = opts.name.replace(/[<>]/g, '')
  return `
    <div style="padding:8px 4px;line-height:1.6;">
      <h2 style="color:#1a1a1a;margin:0 0 16px;">${opts.title}</h2>
      <p>Hi ${safeName},</p>
      <p>
        Your 7-day trial ends on <strong>${opts.chargeDate}</strong>.
        After that I start <strong>$6.99/month</strong>, unless you cancel.
      </p>
      <p>One tap in your profile. No surprises.</p>
      <p style="margin:28px 0;">
        <a href="${opts.manageUrl}"
           style="background:#5D4BE0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
          Manage plan
        </a>
      </p>
    </div>
  `
}

export function cancellationEmailHtml(opts: {
  name: string
  accessUntil: string
  manageUrl: string
}) {
  const safeName = opts.name.replace(/[<>]/g, '')
  return `
    <div style="padding:8px 4px;line-height:1.6;">
      <h2 style="color:#1a1a1a;margin:0 0 16px;">Your plan is cancelled</h2>
      <p>Hi ${safeName},</p>
      <p>Your Soul+AI plan is cancelled. You keep everything until <strong>${opts.accessUntil}</strong>.</p>
      <p>You will not be charged $6.99 unless you keep the plan before then.</p>
      <p style="margin:28px 0;">
        <a href="${opts.manageUrl}"
           style="background:#5D4BE0;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
          Manage plan
        </a>
      </p>
    </div>
  `
}
