import { json, rejectUnlessAdmin, str } from '../_lib/http.js';
import { getEnquiry, markEnquiryReplied } from '../_lib/store.js';
import { sendMail } from '../_lib/mailer.js';
import { enquiryReplyEmail } from '../_lib/emails.js';

export default async function handler(req, res) {
  if (rejectUnlessAdmin(req, res)) return;
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method-not-allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const enquiry = await getEnquiry(str(b.id, 40));
  const reply = str(b.reply, 6000);
  if (!enquiry) return json(res, 404, { ok: false, error: 'not-found' });
  if (!reply) return json(res, 400, { ok: false, error: 'empty-reply' });

  const sent = await sendMail({ to: enquiry.email, ...enquiryReplyEmail(enquiry, reply) });
  if (sent.sent) await markEnquiryReplied(enquiry.id);
  return json(res, 200, { ok: sent.sent, emailed: sent.sent, reason: sent.reason });
}
