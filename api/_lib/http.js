import { timingSafeEqual } from 'node:crypto';

export const json = (res, status, body) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json(body);
};

// Returns true when the request was rejected (response already sent).
export function rejectUnlessAdmin(req, res) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) {
    json(res, 503, { ok: false, error: 'admin-not-configured' });
    return true;
  }
  const given = String(req.headers['x-admin-passcode'] || '');
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    json(res, 401, { ok: false, error: 'unauthorized' });
    return true;
  }
  return false;
}

export const str = (v, max = 2000) => String(v ?? '').trim().slice(0, max);
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || ''));
