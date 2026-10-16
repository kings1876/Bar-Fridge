import nodemailer from 'nodemailer';

let transporter;
function getTransport() {
  if (transporter !== undefined) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    transporter = null;
    return null;
  }
  const port = Number(SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  return transporter;
}

// Never throws. Returns { sent:false, reason } when unconfigured or on failure.
export async function sendMail({ to, subject, html, text, replyTo, attachments }) {
  const t = getTransport();
  if (!t) return { sent: false, reason: 'not-configured' };
  try {
    await t.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      replyTo,
      attachments
    });
    return { sent: true };
  } catch (err) {
    console.error('sendMail failed:', err && err.message);
    return { sent: false, reason: 'send-failed' };
  }
}
