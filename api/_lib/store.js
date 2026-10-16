import { Redis } from '@upstash/redis';
import { REPLY } from '../../shared/reply.config.js';

// Accepts whichever env var pair Vercel's Storage tab assigned.
const CANDIDATES = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN']
];

let cached;
export function getRedis() {
  if (cached !== undefined) return cached;
  for (const [u, t] of CANDIDATES) {
    if (process.env[u] && process.env[t]) {
      cached = new Redis({ url: process.env[u], token: process.env[t] });
      return cached;
    }
  }
  cached = null;
  return null;
}
export const isStoreConfigured = () => getRedis() !== null;

const P = REPLY.orderPrefix.toLowerCase();
const ORDERS = `${P}:orders`;
const ENQUIRIES = `${P}:enquiries`;

const parse = (v) => (typeof v === 'string' ? JSON.parse(v) : v);
const byNewest = (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

async function put(key, id, obj) {
  const r = getRedis();
  if (!r) return false;
  await r.hset(key, { [id]: JSON.stringify(obj) });
  return true;
}
async function list(key) {
  const r = getRedis();
  if (!r) return [];
  const all = await r.hgetall(key);
  return all ? Object.values(all).map(parse).sort(byNewest) : [];
}
async function get(key, id) {
  const r = getRedis();
  if (!r) return null;
  const raw = await r.hget(key, id);
  return raw ? parse(raw) : null;
}
async function del(key, id) {
  const r = getRedis();
  if (r) await r.hdel(key, id);
}

export const saveOrder = (o) => put(ORDERS, o.orderNumber, o);
export const listOrders = () => list(ORDERS);
export const getOrder = (id) => get(ORDERS, id);
export const deleteOrder = (id) => del(ORDERS, id);

export async function markOrderSent(id, paymentDetails) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-sent';
  if (paymentDetails) o.paymentDetails = paymentDetails;
  await saveOrder(o);
}
export async function markPaymentConfirmed(id) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-confirmed';
  await saveOrder(o);
}

export const saveEnquiry = (e) => put(ENQUIRIES, e.id, e);
export const listEnquiries = () => list(ENQUIRIES);
export const getEnquiry = (id) => get(ENQUIRIES, id);
export const deleteEnquiry = (id) => del(ENQUIRIES, id);
export async function markEnquiryReplied(id) {
  const e = await getEnquiry(id);
  if (!e) return;
  e.status = 'replied';
  await saveEnquiry(e);
}

export function makeEnquiryId() {
  return ('ENQ-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)).toUpperCase();
}
