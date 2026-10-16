import { json, rejectUnlessAdmin } from '../_lib/http.js';
import { listOrders, getOrder, deleteOrder, isStoreConfigured } from '../_lib/store.js';

// GET /api/admin/orders            -> list
// GET /api/admin/orders?id=REF     -> one order
// DELETE /api/admin/orders?id=REF  -> delete one ; DELETE ?all=1 -> delete all
export default async function handler(req, res) {
  if (rejectUnlessAdmin(req, res)) return;
  const id = String(req.query.id || '');
  const configured = isStoreConfigured();

  if (req.method === 'GET') {
    if (id) {
      const order = await getOrder(id);
      return order ? json(res, 200, { ok: true, order }) : json(res, 404, { ok: false, error: 'not-found' });
    }
    return json(res, 200, { ok: true, configured, orders: await listOrders() });
  }

  if (req.method === 'DELETE') {
    if (req.query.all === '1') {
      for (const o of await listOrders()) await deleteOrder(o.orderNumber);
      return json(res, 200, { ok: true });
    }
    if (!id) return json(res, 400, { ok: false, error: 'missing-id' });
    await deleteOrder(id);
    return json(res, 200, { ok: true });
  }

  return json(res, 405, { ok: false, error: 'method-not-allowed' });
}
