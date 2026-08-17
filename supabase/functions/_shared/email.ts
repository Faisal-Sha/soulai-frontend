import { Resend } from "npm:resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") || "");

export const sendEmail = async (
    to: string,
    subject: string,
    html: string,
    fromName: string = "SoulPlus AI",
    attachments: any[] = []
) => {
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL") || "onboarding@resend.dev";
    try {
        const payload: any = {
            from: `${fromName} <${fromEmail}>`,
            to: [to],
            subject,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
                    ${html}
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #888;">
                        This email was sent to you because of a purchase on <a href="https://www.soulplus-ai.com" style="color: #667eea;">SoulPlus AI</a>.
                        If you have any questions, simply reply to this email.
                    </p>
                    <p style="font-size: 10px; color: #aaa;">Ref: ${new Date().toISOString()}</p>
                </div>
            `,
        };

        if (attachments && attachments.length > 0) {
            payload.attachments = attachments;
        }

        const { data, error } = await resend.emails.send(payload);
        if (error) {
            console.error(`[Email] Error sending to ${to}:`, error);
            return { error };
        } else {
            console.log(`[Email] Sent to ${to}: ${data?.id}`);
            return { data };
        }
    } catch (err) {
        console.error(`[Email] Failed for ${to}:`, err.message);
        return { error: err };
    }
};
