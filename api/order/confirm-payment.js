import { REPLY } from '../../shared/reply.config.js';
import { isValidOrderNumber } from '../../shared/order.js';
import { json, str } from '../_lib/http.js';
import { getOrder, markPaymentConfirmed } from '../_lib/store.js';
import { sendMail } from '../_lib/mailer.js';
import { paymentScreenshotEmail } from '../_lib/emails.js';

const TYPES = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic' };
const MAX_BYTES = 3 * 1024 * 1024; // base64 inflates ~33%; Vercel's request body cap is ~4.5MB

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method-not-allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const id = str(b.id, 30);
  if (!isValidOrderNumber(id)) return json(res, 400, { ok: false, error: 'invalid-id' });
  const ext = TYPES[b.fileType];
  if (!ext || typeof b.fileData !== 'string') return json(res, 400, { ok: false, error: 'invalid-file' });
  const buf = Buffer.from(b.fileData, 'base64');
  if (!buf.length || buf.length > MAX_BYTES) return json(res, 400, { ok: false, error: 'file-too-large' });

  const order = await getOrder(id).catch(() => null);
  if (!order) return json(res, 404, { ok: false, error: 'not-found' });

  const mail = paymentScreenshotEmail(order, str(b.note, 500));
  const sent = await sendMail({
    to: process.env.ORDER_EMAIL || REPLY.destinations.order,
    replyTo: order.customerEmail,
    attachments: [{ filename: `${id}-payment.${ext}`, content: buf, contentType: b.fileType }],
    ...mail
  });
  await markPaymentConfirmed(id).catch(() => {});
  return json(res, 200, { ok: true, emailed: sent.sent });
}
