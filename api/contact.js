import { REPLY } from '../shared/reply.config.js';
import { isValidOrderNumber } from '../shared/order.js';
import { json, str, isEmail } from './_lib/http.js';
import { saveOrder, saveEnquiry, makeEnquiryId } from './_lib/store.js';
import { sendMail } from './_lib/mailer.js';
import { orderNotificationEmail, orderConfirmationEmail, enquiryNotificationEmail } from './_lib/emails.js';

const dest = (kind) =>
  process.env[`${kind.toUpperCase()}_EMAIL`] || REPLY.destinations[kind] || REPLY.destinations.contact;

export default async function handler(req, res) {
  if (req.method !== 'POST') return json(res, 405, { ok: false, error: 'method-not-allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: bots fill this hidden field. Pretend success.
  if (b.website) return json(res, 200, { ok: true });

  const formName = str(b.formName, 20);

  if (formName === 'order') {
    const name = str(b.customerName, 120);
    const email = str(b.customerEmail, 200);
    const phone = str(b.customerPhone, 40);
    const address = str(b.address, 400);
    const orderNumber = str(b.orderNumber, 30);
    const method = REPLY.paymentMethods.find((m) => m.id === b.paymentMethod);
    const items = Array.isArray(b.items) ? b.items.slice(0, 50) : [];
    const amountDue = Number(b.amountDue);

    if (!name || !isEmail(email) || !phone || !address || !isValidOrderNumber(orderNumber) || !method || !items.length || !(amountDue >= 0)) {
      return json(res, 400, { ok: false, error: 'invalid-order' });
    }
    const cleanItems = items.map((i) => ({
      name: str(i.name, 200),
      quantity: Math.min(Math.max(parseInt(i.quantity, 10) || 1, 1), 99),
      lineTotal: Math.max(Number(i.lineTotal) || 0, 0)
    }));

    const order = {
      orderNumber,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address,
      items: cleanItems,
      amountDue: Math.round(amountDue * 100) / 100,
      paymentMethod: method.id,
      notes: str(b.notes, 600),
      status: 'pending',
      channel: b.channel === 'whatsapp' ? 'whatsapp' : 'email',
      createdAt: new Date().toISOString()
    };

    const stored = await saveOrder(order).catch(() => false);
    const shop = orderNotificationEmail(order);
    const cust = orderConfirmationEmail(order);
    const [a, c] = await Promise.all([
      sendMail({ to: dest('order'), replyTo: order.customerEmail, ...shop }),
      // Confirmation to the customer fires on every channel (WhatsApp or email), unconditionally.
      sendMail({ to: order.customerEmail, replyTo: dest('order'), ...cust })
    ]);

    if (!stored && !a.sent && !c.sent) {
      return json(res, 503, { ok: false, error: 'not-configured' });
    }
    return json(res, 200, { ok: true, orderNumber, stored: Boolean(stored), emailed: c.sent });
  }

  if (formName === 'contact' || formName === 'wholesale') {
    const name = str(b.name, 120);
    const email = str(b.email, 200);
    const message = str(b.message, 4000);
    if (!name || !isEmail(email) || !message) return json(res, 400, { ok: false, error: 'invalid-enquiry' });

    const meta = {};
    if (b.inquiryType) meta['Enquiry type'] = str(b.inquiryType, 120);
    const enquiry = {
      id: makeEnquiryId(),
      type: formName,
      name,
      email,
      phone: str(b.phone, 40) || undefined,
      message,
      meta,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    const stored = await saveEnquiry(enquiry).catch(() => false);
    const mail = enquiryNotificationEmail(enquiry);
    const sent = await sendMail({ to: dest(formName), replyTo: email, ...mail });
    if (!stored && !sent.sent) return json(res, 503, { ok: false, error: 'not-configured' });
    return json(res, 200, { ok: true, id: enquiry.id });
  }

  return json(res, 400, { ok: false, error: 'unknown-form' });
}
