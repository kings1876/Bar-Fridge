import { REPLY, SITE } from './reply.config.js';

const ORDER_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`);
export const isValidOrderNumber = (s) => ORDER_RE.test(String(s || ''));

// Unambiguous alphabet (no 0/O/1/I/L). Minted client-side so the same ref appears everywhere.
export function makeOrderNumber(prefix = REPLY.orderPrefix) {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(2))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (const b of bytes) r += alphabet[b % alphabet.length];
  return `${prefix}-${t}${r}`;
}

export function money(amount) {
  const { code, locale } = REPLY.currency;
  try {
    return new Intl.NumberFormat(locale || 'en-US', { style: 'currency', currency: code, minimumFractionDigits: 2 }).format(Number(amount) || 0);
  } catch {
    return `${REPLY.currency.symbol}${(Number(amount) || 0).toFixed(2)}`;
  }
}

export const findMethod = (id) => REPLY.paymentMethods.find((m) => m.id === id) || REPLY.paymentMethods[0];
export const paymentTermsLines = () => REPLY.terms.slice();

/** Payment details that need no hand-typing: the saved wallet for a crypto method (empty for bank methods, which you send per order). */
export function defaultPaymentFields(method, orderNumber) {
  if (!method || !method.wallet) return [];
  return [
    { label: 'Wallet address', value: method.wallet },
    ...(method.network ? [{ label: 'Network', value: method.network }] : []),
    { label: 'Reference', value: orderNumber }
  ];
}

const KNOWN_LABELS = [
  'account name', 'account number', 'sort code', 'bank name', 'branch code', 'bsb',
  'routing number', 'beneficiary name', 'beneficiary', 'swift code', 'swift',
  'bic code', 'bic', 'iban', 'wallet address', 'wallet', 'network', 'memo',
  'destination tag', 'tag', 'paypal email', 'paypal.me', 'paypal', 'payment link', 'reference'
].sort((a, b) => b.length - a.length);

const LABEL_PATTERN = new RegExp(
  `^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`,
  'i'
);

const titleCase = (s) => s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

// 1) "Label: value"  2) known label word with no colon  3) bare line -> "Detail N"
export function parsePaymentDetail(text) {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && colonIdx < line.length - 1 && !/^https?:\/\//i.test(line)) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() };
    }
    const match = line.match(LABEL_PATTERN);
    if (match) return { label: titleCase(match[1]), value: match[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

// WhatsApp (gated on REPLY.channels.whatsapp)
const toWaNumber = (p) => String(p || '').replace(/\D/g, '');
export const whatsappEnabled = () => Boolean(toWaNumber(REPLY.channels.whatsapp));
export const WA_HEADER = `*${SITE.name}*`;
const customerText = (body) => [`Hi ${SITE.name},`, '', ...[].concat(body)].join('\n');
const adminText = (body) => [WA_HEADER, '', ...[].concat(body)].join('\n');

export function waLink(body) {
  return `https://wa.me/${toWaNumber(REPLY.channels.whatsapp)}?text=${encodeURIComponent(customerText(body))}`;
}
export function waLinkTo(phone, body) {
  return `https://wa.me/${toWaNumber(phone)}?text=${encodeURIComponent(adminText(body))}`;
}
export function waMessageText(body) { return adminText(body); }

export function waOrderLink(order) {
  const lines = [
    `New order request ${order.orderNumber}`,
    ...order.items.map((i) => `• ${i.quantity} × ${i.name}`),
    `Total due: ${money(order.amountDue)}`,
    `Payment: ${findMethod(order.paymentMethod).label}`,
    `Name: ${order.customerName}`,
    `Phone: ${order.customerPhone}`,
    `Email: ${order.customerEmail}`
  ];
  return waLink(lines);
}

export function waPaymentDetailsBody(order, fields, link) {
  return [
    `Payment details for order ${order.orderNumber}`,
    `Amount due: ${money(order.amountDue)}`,
    '',
    ...fields.map((f) => `${f.label}: ${f.value}`),
    '',
    ...paymentTermsLines(),
    '',
    `Copy fields easily: ${link}`
  ];
}

export function waPaymentConfirmationLink(ref) {
  return waLink(`I've completed payment for order ${ref}.`);
}
