import { SITE } from '../../shared/reply.config.js';
import { parsePaymentDetail, isValidOrderNumber } from '../../shared/order.js';
import { json, rejectUnlessAdmin, str } from '../_lib/http.js';
import { getOrder, saveOrder, markOrderSent } from '../_lib/store.js';
import { sendMail } from '../_lib/mailer.js';
import { paymentDetailsEmail } from '../_lib/emails.js';

export default async function handler(req, res) {
  if (rejectUnlessAdmin(req, res)) return;
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method-not-allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const id = str(b.orderNumber, 30);
  if (!isValidOrderNumber(id)) return json(res, 400, { ok: false, error: 'invalid-id' });

  const order = await getOrder(id);
  if (!order) return json(res, 404, { ok: false, error: 'not-found' });

  const fields = parsePaymentDetail(str(b.detail, 3000));
  if (!fields.length) return json(res, 400, { ok: false, error: 'empty-detail' });

  // Operator may correct the amount (the cart total is client-supplied, so it is reviewed here).
  const amount = Number(b.amountDue);
  if (Number.isFinite(amount) && amount >= 0) {
    order.amountDue = Math.round(amount * 100) / 100;
    await saveOrder(order);
  }

  const link = `${SITE.origin}/order/payment-details?id=${encodeURIComponent(id)}`;
  const confirmLink = `${SITE.origin}/order/confirm-payment?id=${encodeURIComponent(id)}`;
  // Persist first so the customer's link works even if the email fails.
  await markOrderSent(id, { methodId: order.paymentMethod, fields, sentAt: new Date().toISOString() });

  const mail = paymentDetailsEmail(order, fields, link, confirmLink);
  const sent = await sendMail({ to: order.customerEmail, ...mail });
  return json(res, 200, { ok: true, emailed: sent.sent, reason: sent.reason, link, fields });
}
