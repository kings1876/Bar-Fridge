import { json } from '../_lib/http.js';
import { getOrder } from '../_lib/store.js';
import { isValidOrderNumber, paymentTermsLines } from '../../shared/order.js';

// Public: the order number acts as the access token (same data the customer's email already contains).
export default async function handler(req, res) {
  const id = String(req.query.id || '');
  if (!isValidOrderNumber(id)) return json(res, 400, { ok: false, error: 'invalid-id' });
  const order = await getOrder(id).catch(() => null);
  if (!order || !order.paymentDetails) return json(res, 404, { ok: false, error: 'not-found' });
  return json(res, 200, {
    ok: true,
    orderNumber: order.orderNumber,
    customerName: order.customerName,
    amountDue: order.amountDue,
    paymentMethod: order.paymentMethod,
    status: order.status,
    fields: order.paymentDetails.fields,
    terms: paymentTermsLines()
  });
}
