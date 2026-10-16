import { json, rejectUnlessAdmin } from '../_lib/http.js';
import { listEnquiries, getEnquiry, deleteEnquiry, isStoreConfigured } from '../_lib/store.js';

export default async function handler(req, res) {
  if (rejectUnlessAdmin(req, res)) return;
  const id = String(req.query.id || '');
  const configured = isStoreConfigured();

  if (req.method === 'GET') {
    if (id) {
      const enquiry = await getEnquiry(id);
      return enquiry ? json(res, 200, { ok: true, enquiry }) : json(res, 404, { ok: false, error: 'not-found' });
    }
    return json(res, 200, { ok: true, configured, enquiries: await listEnquiries() });
  }

  if (req.method === 'DELETE') {
    if (req.query.all === '1') {
      for (const e of await listEnquiries()) await deleteEnquiry(e.id);
      return json(res, 200, { ok: true });
    }
    if (!id) return json(res, 400, { ok: false, error: 'missing-id' });
    await deleteEnquiry(id);
    return json(res, 200, { ok: true });
  }

  return json(res, 405, { ok: false, error: 'method-not-allowed' });
}
