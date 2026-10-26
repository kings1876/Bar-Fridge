// Light-theme email shell: white body, dark brand header band, brand colour as accent only.
import { REPLY, SITE } from '../../shared/reply.config.js';
import { money, findMethod, paymentTermsLines, defaultPaymentFields } from '../../shared/order.js';

export const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const { primary, headerDark } = REPLY.brand;

const shell = (title, inner) => `<!doctype html><html><body style="margin:0;padding:0;background:#f3f4f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:24px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;color:#111827;">
<tr><td style="background:${headerDark};padding:20px 28px;">
<div style="color:#ffffff;font-size:18px;font-weight:700;letter-spacing:.3px;">${esc(SITE.name)}</div>
<div style="color:${primary};font-size:12px;margin-top:4px;text-transform:uppercase;letter-spacing:1px;">${esc(title)}</div>
</td></tr>
<tr><td style="padding:28px;font-size:14px;line-height:1.6;color:#111827;">${inner}</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">
${esc(SITE.name)} &middot; <a href="${SITE.origin}" style="color:${primary};text-decoration:none;">${esc(SITE.domain)}</a> &middot; ${esc(SITE.email)}
</td></tr></table></td></tr></table></body></html>`;

const field = (label, value) =>
  `<tr><td style="padding:6px 0;color:#6b7280;width:38%;vertical-align:top;">${esc(label)}</td><td style="padding:6px 0;font-weight:600;color:#111827;">${esc(value)}</td></tr>`;
const table = (rows) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">${rows}</table>`;
const callout = (html) => `<div style="margin:18px 0;padding:14px 16px;background:#f9fafb;border-left:4px solid ${primary};border-radius:6px;color:#111827;">${html}</div>`;
const button = (href, label) =>
  `<p style="margin:22px 0;"><a href="${href}" style="display:inline-block;background:${primary};color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:8px;">${esc(label)}</a></p>`;
const divider = '<hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">';

const itemsTable = (items) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:8px 0;">${items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">${esc(i.quantity)} &times; ${esc(i.name)}</td><td align="right" style="padding:8px 0;border-bottom:1px solid #f3f4f6;font-weight:600;">${esc(money(i.lineTotal))}</td></tr>`
    )
    .join('')}</table>`;

const termsHtml = () =>
  `<ul style="margin:8px 0 0 18px;padding:0;color:#374151;">${paymentTermsLines().map((l) => `<li style="margin:4px 0;">${esc(l)}</li>`).join('')}</ul>`;

const customerBlock = (o) =>
  table(
    field('Name', o.customerName) +
      field('Email', o.customerEmail) +
      field('Phone', o.customerPhone) +
      field('Delivery address', o.address || '—') +
      field('Payment method', findMethod(o.paymentMethod).label) +
      (o.notes ? field('Notes', o.notes) : '')
  );

export function orderNotificationEmail(o) {
  return {
    subject: `New order ${o.orderNumber} — ${money(o.amountDue)} (${o.channel})`,
    html: shell(
      'New order received',
      `<p style="margin:0 0 12px;">A new order has been placed via <strong>${esc(o.channel)}</strong>.</p>
${table(field('Order ref', o.orderNumber) + field('Amount due', money(o.amountDue)))}
${divider}${itemsTable(o.items)}${divider}${customerBlock(o)}
${button(`${SITE.origin}/admin/orders/${encodeURIComponent(o.orderNumber)}`, 'Reply in Dashboard →')}`
    )
  };
}

export function orderConfirmationEmail(o) {
  const payFields = defaultPaymentFields(findMethod(o.paymentMethod), o.orderNumber);
  const payLink = `${SITE.origin}/order/payment-details?id=${encodeURIComponent(o.orderNumber)}`;
  const next = payFields.length
    ? `${callout('<strong>Pay now:</strong> send the equivalent of the total due in ' + esc(findMethod(o.paymentMethod).label) + ' to the address below, on the network shown, and quote your reference. Cryptocurrency payments cannot be reversed, so check the address and network carefully.')}
${table(payFields.map((f) => field(f.label, f.value)).join(''))}
${button(payLink, 'Open payment page (QR code, tap to copy) →')}
${termsHtml()}`
    : callout('<strong>What happens next:</strong> watch your inbox for a follow-up email from us with your payment details.');
  return {
    subject: `We received your order ${o.orderNumber}`,
    html: shell(
      'Order received',
      `<p style="margin:0 0 12px;">Hi ${esc(o.customerName)},</p>
<p style="margin:0 0 12px;">Thank you for your order. Your reference is <strong>${esc(o.orderNumber)}</strong>.</p>
${next}
${itemsTable(o.items)}
${table(field('Total due', money(o.amountDue)) + field('Payment method', findMethod(o.paymentMethod).label) + field('Delivery address', o.address || '—'))}
<p style="margin:18px 0 0;color:#6b7280;">Questions? Just reply to this email.</p>`
    )
  };
}

export function enquiryNotificationEmail(e) {
  const meta = Object.entries(e.meta || {}).map(([k, v]) => field(k, v)).join('');
  return {
    subject: `New ${e.type} enquiry from ${e.name}`,
    html: shell(
      `New ${e.type} enquiry`,
      `${table(field('Name', e.name) + field('Email', e.email) + (e.phone ? field('Phone', e.phone) : '') + meta)}
${callout(esc(e.message).replace(/\n/g, '<br>'))}
${button(`${SITE.origin}/admin/enquiries/${encodeURIComponent(e.id)}`, 'Reply in Dashboard →')}`
    )
  };
}

export function paymentDetailsEmail(o, fields, link, confirmLink) {
  return {
    subject: `Payment details for order ${o.orderNumber}`,
    html: shell(
      'Payment details',
      `<p style="margin:0 0 12px;">Hi ${esc(o.customerName)},</p>
<p style="margin:0 0 12px;">Here are the payment details for order <strong>${esc(o.orderNumber)}</strong>.</p>
${table(field('Amount due', money(o.amountDue)) + field('Method', findMethod(o.paymentMethod).label))}
${divider}${table(fields.map((f) => field(f.label, f.value)).join(''))}
${button(link, 'Open payment details (tap to copy) →')}
<p style="margin:0;"><strong>Before you pay</strong></p>${termsHtml()}
${divider}<p style="margin:0 0 6px;">Once you have paid, confirm it here:</p>
<p style="margin:0;"><a href="${confirmLink}" style="color:${primary};font-weight:700;">Upload your payment screenshot</a></p>`
    )
  };
}

export function enquiryReplyEmail(e, reply) {
  return {
    subject: `Re: your enquiry to ${SITE.name}`,
    html: shell(
      'Reply to your enquiry',
      `<p style="margin:0 0 12px;">Hi ${esc(e.name)},</p>
<div style="margin:0 0 16px;">${esc(reply).replace(/\n/g, '<br>')}</div>
${divider}<p style="margin:0 0 6px;color:#6b7280;">Your original message:</p>
<div style="color:#6b7280;">${esc(e.message).replace(/\n/g, '<br>')}</div>`
    )
  };
}

export function paymentScreenshotEmail(o, note) {
  return {
    subject: `Payment screenshot received — ${o.orderNumber}`,
    html: shell(
      'Customer confirmed payment',
      `${table(field('Order ref', o.orderNumber) + field('Customer', o.customerName) + field('Amount due', money(o.amountDue)) + (note ? field('Note', note) : ''))}
<p style="margin:12px 0 0;">The screenshot is attached.</p>
${button(`${SITE.origin}/admin/orders/${encodeURIComponent(o.orderNumber)}`, 'Open order →')}`
    )
  };
}
