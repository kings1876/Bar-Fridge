import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { REPLY, SITE } from '../../shared/reply.config.js';
import {
  findMethod,
  money,
  parsePaymentDetail,
  paymentTermsLines,
  waLinkTo,
  waMessageText,
  waPaymentDetailsBody,
  whatsappEnabled
} from '../../shared/order.js';

const KEY = 'bffs-admin-passcode';
const accent = REPLY.brand.primary;

type Order = {
  orderNumber: string; customerName: string; customerEmail: string; customerPhone: string; address?: string;
  items: { name: string; quantity: number; lineTotal: number }[]; amountDue: number; paymentMethod: string;
  notes?: string; status: 'pending' | 'payment-sent' | 'payment-confirmed'; channel: 'whatsapp' | 'email'; createdAt: string;
  paymentDetails?: { fields: { label: string; value: string }[]; sentAt: string };
};
type Enquiry = {
  id: string; type: 'contact' | 'wholesale'; name: string; email: string; phone?: string; message: string;
  meta?: Record<string, string>; status: 'new' | 'replied'; createdAt: string;
};

const storage = {
  get: () => { try { return localStorage.getItem(KEY) || ''; } catch { return ''; } },
  set: (v: string) => { try { v ? localStorage.setItem(KEY, v) : localStorage.removeItem(KEY); } catch { /* private mode */ } }
};

async function api(path: string, pass: string, init: RequestInit = {}) {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', 'X-Admin-Passcode': pass, ...(init.headers || {}) }
  });
  let data: any = {};
  try { data = await res.json(); } catch { /* non-json */ }
  return { status: res.status, ok: res.ok && data.ok !== false, data };
}

const fmt = (iso: string) => new Date(iso).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' });
const card = 'rounded-2xl border border-slate-800 bg-slate-900/70 p-5';
const btn = 'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition-colors disabled:opacity-50';
const input = 'w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const map: Record<string, string> = {
    pending: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    'payment-sent': 'bg-sky-500/15 text-sky-300 border-sky-500/40',
    'payment-confirmed': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
    new: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    replied: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
  };
  const label: Record<string, string> = { pending: 'Pending', 'payment-sent': 'Payment sent', 'payment-confirmed': 'Payment confirmed', new: 'New', replied: 'Replied' };
  return <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${map[status] || ''}`}>{label[status] || status}</span>;
};

const Gate: React.FC<{ children: (pass: string, signOut: () => void) => React.ReactNode }> = ({ children }) => {
  const [pass, setPass] = useState(storage.get());
  const [draft, setDraft] = useState('');
  const [state, setState] = useState<'checking' | 'locked' | 'ok' | 'unconfigured'>(pass ? 'checking' : 'locked');
  const [error, setError] = useState('');

  const verify = useCallback(async (p: string) => {
    setState('checking');
    const r = await api('/api/admin/orders', p);
    if (r.status === 503) return setState('unconfigured');
    if (r.status === 200 && r.data.ok === true) { storage.set(p); setPass(p); return setState('ok'); }
    storage.set(''); setPass(''); setError(p ? 'Incorrect passcode.' : ''); setState('locked');
  }, []);

  useEffect(() => { if (pass) verify(pass); /* eslint-disable-next-line */ }, []);

  if (state === 'ok') return <>{children(pass, () => { storage.set(''); setPass(''); setState('locked'); })}</>;
  if (state === 'checking') return <div className="p-10 text-center text-slate-400">Checking…</div>;
  if (state === 'unconfigured') {
    return (
      <div className="mx-auto max-w-md p-8">
        <div className={card}>
          <h1 className="text-lg font-black text-white">Admin not configured</h1>
          <p className="mt-2 text-sm text-slate-400">Set the <code className="text-slate-200">ADMIN_PASSCODE</code> environment variable in Vercel, then redeploy.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-sm p-8">
      <form onSubmit={(e) => { e.preventDefault(); verify(draft); }} className={card}>
        <h1 className="text-lg font-black text-white">{SITE.name} — Admin</h1>
        <p className="mt-1 text-xs text-slate-400">Enter the admin passcode.</p>
        <input type="password" autoFocus value={draft} onChange={(e) => setDraft(e.target.value)} className={`${input} mt-4`} placeholder="Passcode" />
        {error && <p className="mt-2 text-xs text-rose-400">{error}</p>}
        <button className={`${btn} mt-4 w-full text-white`} style={{ background: accent }}>Unlock</button>
      </form>
    </div>
  );
};

const Shell: React.FC<{ signOut: () => void; children: React.ReactNode }> = ({ signOut, children }) => (
  <div className="min-h-screen bg-slate-950 text-slate-100">
    <header className="border-b border-slate-800 bg-slate-900/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-4 px-4 py-3 text-sm">
        <a href="/admin" className="font-black text-white">{SITE.name}</a>
        <nav className="flex gap-4 font-semibold text-slate-300">
          <a href="/admin" className="hover:text-white">Dashboard</a>
          <a href="/admin/orders" className="hover:text-white">Orders</a>
          <a href="/admin/enquiries" className="hover:text-white">Enquiries</a>
        </nav>
        <button onClick={signOut} className="ml-auto text-xs text-slate-400 hover:text-white">Sign out</button>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
  </div>
);

function useFetch<T>(path: string, pass: string, key: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    const r = await api(path, pass);
    setData(r.ok ? (r.data[key] ?? r.data) : null);
    setLoading(false);
    return r;
  }, [path, pass, key]);
  useEffect(() => { reload(); }, [reload]);
  return { data, loading, reload, setData };
}

const NotConfiguredNote: React.FC = () => (
  <div className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-200">
    Storage is not connected yet — orders/enquiries are still emailed, but won't appear here until an Upstash Redis database is connected in Vercel.
  </div>
);

const Hub: React.FC<{ pass: string }> = ({ pass }) => {
  const o = useFetch<{ orders: Order[]; configured: boolean }>('/api/admin/orders', pass, '');
  const e = useFetch<{ enquiries: Enquiry[] }>('/api/admin/enquiries', pass, '');
  const orders = o.data?.orders || [];
  const enquiries = e.data?.enquiries || [];
  return (
    <div className="space-y-6">
      {o.data && !o.data.configured && <NotConfiguredNote />}
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="/admin/orders" className={`${card} block hover:border-slate-600`}>
          <div className="text-xs font-bold uppercase text-slate-400">Orders</div>
          <div className="mt-1 text-3xl font-black">{orders.length}</div>
          <div className="text-xs text-amber-300">{orders.filter((x) => x.status === 'pending').length} pending</div>
        </a>
        <a href="/admin/enquiries" className={`${card} block hover:border-slate-600`}>
          <div className="text-xs font-bold uppercase text-slate-400">Enquiries</div>
          <div className="mt-1 text-3xl font-black">{enquiries.length}</div>
          <div className="text-xs text-amber-300">{enquiries.filter((x) => x.status === 'new').length} new</div>
        </a>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={card}>
          <h2 className="mb-3 text-sm font-black">Recent orders</h2>
          {orders.slice(0, 5).map((x) => (
            <a key={x.orderNumber} href={`/admin/orders/${x.orderNumber}`} className="flex items-center justify-between gap-2 border-t border-slate-800 py-2 text-sm first:border-0">
              <span><b>{x.orderNumber}</b> <span className="text-slate-400">{x.customerName}</span></span>
              <StatusBadge status={x.status} />
            </a>
          ))}
          {!orders.length && <p className="text-xs text-slate-500">No orders yet.</p>}
        </div>
        <div className={card}>
          <h2 className="mb-3 text-sm font-black">Recent enquiries</h2>
          {enquiries.slice(0, 5).map((x) => (
            <a key={x.id} href={`/admin/enquiries/${x.id}`} className="flex items-center justify-between gap-2 border-t border-slate-800 py-2 text-sm first:border-0">
              <span><b>{x.name}</b> <span className="text-slate-400">{x.type}</span></span>
              <StatusBadge status={x.status} />
            </a>
          ))}
          {!enquiries.length && <p className="text-xs text-slate-500">No enquiries yet.</p>}
        </div>
      </div>
    </div>
  );
};

const OrdersList: React.FC<{ pass: string }> = ({ pass }) => {
  const { data, loading, reload } = useFetch<{ orders: Order[]; configured: boolean }>('/api/admin/orders', pass, '');
  const del = async (id: string) => { if (confirm(`Delete order ${id}?`)) { await api(`/api/admin/orders?id=${encodeURIComponent(id)}`, pass, { method: 'DELETE' }); reload(); } };
  const delAll = async () => { if (confirm('Delete ALL orders?')) { await api('/api/admin/orders?all=1', pass, { method: 'DELETE' }); reload(); } };
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-black">Orders</h1>
        {!!data?.orders.length && <button onClick={delAll} className="text-xs text-rose-400 hover:underline">Delete all</button>}
      </div>
      {data && !data.configured && <NotConfiguredNote />}
      {loading && <p className="text-slate-400">Loading…</p>}
      <div className="space-y-2">
        {data?.orders.map((o) => (
          <div key={o.orderNumber} className={`${card} flex flex-wrap items-center gap-3 !p-4`}>
            <a href={`/admin/orders/${o.orderNumber}`} className="min-w-0 flex-1">
              <div className="font-bold">{o.orderNumber} <span className="text-xs font-normal text-slate-500">· {o.channel === 'whatsapp' ? 'WhatsApp' : 'Email'}</span></div>
              <div className="truncate text-xs text-slate-400">{o.customerName} · {money(o.amountDue)} · {fmt(o.createdAt)}</div>
            </a>
            <StatusBadge status={o.status} />
            <button onClick={() => del(o.orderNumber)} className="text-xs text-rose-400 hover:underline">Delete</button>
          </div>
        ))}
        {data && !data.orders.length && <p className="text-sm text-slate-500">No orders yet.</p>}
      </div>
    </div>
  );
};

const OrderDetail: React.FC<{ pass: string; id: string }> = ({ pass, id }) => {
  const { data: order, loading } = useFetch<Order>(`/api/admin/orders?id=${encodeURIComponent(id)}`, pass, 'order');
  if (loading) return <p className="text-slate-400">Loading…</p>;
  if (!order) return <p className="text-slate-400">Order not found.</p>;
  return (
    <div className="space-y-4">
      <a href="/admin/orders" className="text-xs text-slate-400 hover:text-white">← All orders</a>
      <div className="flex flex-wrap items-center gap-3"><h1 className="text-xl font-black">{order.orderNumber}</h1><StatusBadge status={order.status} /></div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className={card}>
          <h2 className="mb-2 text-sm font-black">Customer</h2>
          <p className="text-sm">{order.customerName}</p>
          <p className="text-sm text-slate-400"><a className="hover:underline" href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a></p>
          <p className="text-sm text-slate-400">{order.customerPhone}</p>
          <p className="mt-2 text-sm text-slate-300">{order.address}</p>
          {order.notes && <p className="mt-2 text-xs text-slate-400">Notes: {order.notes}</p>}
        </div>
        <div className={card}>
          <h2 className="mb-2 text-sm font-black">Payment</h2>
          <p className="text-2xl font-black">{money(order.amountDue)}</p>
          <p className="text-sm text-slate-400">{findMethod(order.paymentMethod).label}</p>
          <p className="text-xs text-slate-500">Via {order.channel === 'whatsapp' ? 'WhatsApp' : 'email'} · {fmt(order.createdAt)}</p>
          {order.status === 'payment-confirmed' && <p className="mt-2 text-xs text-emerald-300">Customer uploaded a payment screenshot (check the shop inbox).</p>}
        </div>
      </div>
      <div className={card}>
        <h2 className="mb-2 text-sm font-black">Items</h2>
        {order.items.map((i, n) => (
          <div key={n} className="flex justify-between border-t border-slate-800 py-2 text-sm first:border-0"><span>{i.quantity} × {i.name}</span><span>{money(i.lineTotal)}</span></div>
        ))}
      </div>
      <a href={`/admin/send-payment-email?id=${order.orderNumber}`} className={`${btn} text-white`} style={{ background: accent }}>
        {order.status === 'pending' ? 'Send payment details' : 'Resend payment details'}
      </a>
    </div>
  );
};

const SendPayment: React.FC<{ pass: string }> = ({ pass }) => {
  const id = new URLSearchParams(window.location.search).get('id') || '';
  const { data: order, loading } = useFetch<Order>(`/api/admin/orders?id=${encodeURIComponent(id)}`, pass, 'order');
  const [detail, setDetail] = useState('');
  const [amount, setAmount] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ emailed: boolean; link: string; fields: { label: string; value: string }[]; reason?: string } | null>(null);
  const [err, setErr] = useState('');
  useEffect(() => { if (order) setAmount(String(order.amountDue)); }, [order]);
  // Pre-fill the saved wallet for this payment method (if one is configured); the admin reviews it before sending.
  useEffect(() => {
    if (!order) return;
    const m = REPLY.paymentMethods.find((x: { id: string }) => x.id === order.paymentMethod) as { wallet?: string; network?: string; kind?: string } | undefined;
    if (m?.kind === 'bank') setDetail((d) => d || 'Reference: ' + id);
    if (m?.wallet) setDetail((d) => d || ['Wallet address: ' + m.wallet, m.network ? 'Network: ' + m.network : '', 'Reference: ' + id].filter(Boolean).join(String.fromCharCode(10)));
  }, [order, id]);
  const fields = useMemo(() => parsePaymentDetail(detail), [detail]);

  if (loading) return <p className="text-slate-400">Loading…</p>;
  if (!order) return <p className="text-slate-400">Order not found.</p>;

  const send = async () => {
    setBusy(true); setErr('');
    const r = await api('/api/admin/send-payment-email', pass, { method: 'POST', body: JSON.stringify({ orderNumber: id, detail, amountDue: Number(amount) }) });
    setBusy(false);
    if (!r.ok) return setErr(r.data.error || 'Failed to send');
    setResult(r.data);
  };

  const shown = result ? result.fields : fields;
  const link = result?.link || `${SITE.origin}/order/payment-details?id=${id}`;
  const waBody = waPaymentDetailsBody({ ...order, amountDue: Number(amount) || order.amountDue }, shown, link);

  return (
    <div className="space-y-4">
      <a href={`/admin/orders/${id}`} className="text-xs text-slate-400 hover:text-white">← Back to order</a>
      <h1 className="text-xl font-black">Send payment details — {id}</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${card} space-y-3`}>
          <div className="text-sm text-slate-400">To: {order.customerName} &lt;{order.customerEmail}&gt; · {findMethod(order.paymentMethod).label}</div>
          <label className="block text-xs font-bold text-slate-400">Amount due ({REPLY.currency.code})
            <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" className={`${input} mt-1`} />
          </label>
          <label className="block text-xs font-bold text-slate-400">Payment details (paste — one per line, "Label: value")
            <textarea rows={8} value={detail} onChange={(e) => setDetail(e.target.value)} className={`${input} mt-1 font-mono`} placeholder={'Wallet address: 0x…\nNetwork: Ethereum\nReference: ' + id} />
          </label>
          {err && <p className="text-xs text-rose-400">{err}</p>}
          <button onClick={send} disabled={busy || !fields.length} className={`${btn} text-white`} style={{ background: accent }}>{busy ? 'Sending…' : 'Send email to customer'}</button>
          {result && (
            <p className={`text-xs ${result.emailed ? 'text-emerald-300' : 'text-amber-300'}`}>
              {result.emailed ? 'Email sent.' : `Saved, but the email was not sent (${result.reason || 'SMTP not configured'}). Use the link / WhatsApp below.`}
            </p>
          )}
        </div>
        <div className={`${card} space-y-3`}>
          <h2 className="text-sm font-black">Preview — what the customer sees</h2>
          <p className="text-2xl font-black">{money(Number(amount) || 0)}</p>
          {shown.map((f, i) => (
            <div key={i} className="rounded-xl border border-slate-700 bg-slate-950 p-3"><div className="text-[11px] uppercase text-slate-500">{f.label}</div><div className="break-all font-mono text-sm">{f.value}</div></div>
          ))}
          {!shown.length && <p className="text-xs text-slate-500">Paste details to preview.</p>}
          <ul className="list-disc pl-5 text-xs text-slate-400">{paymentTermsLines().map((l) => <li key={l}>{l}</li>)}</ul>
          <p className="break-all text-xs text-slate-500">Customer page: {link}</p>
          {whatsappEnabled() && (
            <div className="border-t border-slate-800 pt-3">
              <a href={waLinkTo(order.customerPhone, waBody)} target="_blank" rel="noreferrer" className={`${btn} bg-emerald-600 text-white`}>Open WhatsApp reply</a>
              <button onClick={() => navigator.clipboard.writeText(waMessageText(waBody))} className="ml-2 text-xs text-slate-400 hover:text-white">Copy message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EnquiriesList: React.FC<{ pass: string }> = ({ pass }) => {
  const { data, loading, reload } = useFetch<{ enquiries: Enquiry[]; configured: boolean }>('/api/admin/enquiries', pass, '');
  const [filter, setFilter] = useState<'all' | 'contact' | 'wholesale' | 'new' | 'replied'>('all');
  const rows = (data?.enquiries || []).filter((e) => filter === 'all' || e.type === filter || e.status === filter);
  const del = async (id: string) => { if (confirm('Delete this enquiry?')) { await api(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, pass, { method: 'DELETE' }); reload(); } };
  return (
    <div>
      <h1 className="mb-3 text-xl font-black">Enquiries</h1>
      {data && !data.configured && <NotConfiguredNote />}
      <div className="mb-4 flex flex-wrap gap-2">
        {(['all', 'contact', 'wholesale', 'new', 'replied'] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`rounded-full border px-3 py-1 text-xs font-bold ${filter === f ? 'text-white' : 'border-slate-700 text-slate-400'}`} style={filter === f ? { background: accent, borderColor: accent } : undefined}>{f}</button>
        ))}
      </div>
      {loading && <p className="text-slate-400">Loading…</p>}
      <div className="space-y-2">
        {rows.map((e) => (
          <div key={e.id} className={`${card} flex flex-wrap items-center gap-3 !p-4`}>
            <a href={`/admin/enquiries/${e.id}`} className="min-w-0 flex-1">
              <div className="font-bold">{e.name} <span className="text-xs font-normal text-slate-500">· {e.type}</span></div>
              <div className="truncate text-xs text-slate-400">{e.message} · {fmt(e.createdAt)}</div>
            </a>
            <StatusBadge status={e.status} />
            <button onClick={() => del(e.id)} className="text-xs text-rose-400 hover:underline">Delete</button>
          </div>
        ))}
        {data && !rows.length && <p className="text-sm text-slate-500">Nothing here.</p>}
      </div>
    </div>
  );
};

const EnquiryDetail: React.FC<{ pass: string; id: string }> = ({ pass, id }) => {
  const { data: e, loading } = useFetch<Enquiry>(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, pass, 'enquiry');
  if (loading) return <p className="text-slate-400">Loading…</p>;
  if (!e) return <p className="text-slate-400">Enquiry not found.</p>;
  return (
    <div className="space-y-4">
      <a href="/admin/enquiries" className="text-xs text-slate-400 hover:text-white">← All enquiries</a>
      <div className="flex items-center gap-3"><h1 className="text-xl font-black">{e.name}</h1><StatusBadge status={e.status} /></div>
      <div className={card}>
        <p className="text-sm text-slate-300"><a className="hover:underline" href={`mailto:${e.email}`}>{e.email}</a>{e.phone ? ` · ${e.phone}` : ''}</p>
        {Object.entries(e.meta || {}).map(([k, v]) => <p key={k} className="text-xs text-slate-400">{k}: {v}</p>)}
        <p className="mt-3 whitespace-pre-wrap text-sm">{e.message}</p>
        <p className="mt-3 text-xs text-slate-500">{fmt(e.createdAt)}</p>
      </div>
      <a href={`/admin/reply-enquiry?id=${e.id}`} className={`${btn} text-white`} style={{ background: accent }}>Reply</a>
    </div>
  );
};

const ReplyEnquiry: React.FC<{ pass: string }> = ({ pass }) => {
  const id = new URLSearchParams(window.location.search).get('id') || '';
  const { data: e, loading } = useFetch<Enquiry>(`/api/admin/enquiries?id=${encodeURIComponent(id)}`, pass, 'enquiry');
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  if (loading) return <p className="text-slate-400">Loading…</p>;
  if (!e) return <p className="text-slate-400">Enquiry not found.</p>;
  const send = async () => {
    setBusy(true); setMsg('');
    const r = await api('/api/admin/reply-enquiry', pass, { method: 'POST', body: JSON.stringify({ id, reply }) });
    setBusy(false);
    setMsg(r.ok ? 'Reply sent.' : `Not sent (${r.data.reason || r.data.error || 'error'}). Check SMTP settings.`);
  };
  return (
    <div className="space-y-4">
      <a href={`/admin/enquiries/${id}`} className="text-xs text-slate-400 hover:text-white">← Back</a>
      <h1 className="text-xl font-black">Reply to {e.name}</h1>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className={`${card} space-y-3`}>
          <p className="text-xs text-slate-400">To: {e.email}</p>
          <textarea rows={10} value={reply} onChange={(ev) => setReply(ev.target.value)} className={input} placeholder="Write your reply…" />
          <button onClick={send} disabled={busy || !reply.trim()} className={`${btn} text-white`} style={{ background: accent }}>{busy ? 'Sending…' : 'Send reply'}</button>
          {msg && <p className="text-xs text-slate-300">{msg}</p>}
        </div>
        <div className={card}>
          <h2 className="mb-2 text-sm font-black">Preview</h2>
          <p className="whitespace-pre-wrap text-sm">Hi {e.name},{'\n\n'}{reply || '…'}</p>
          <p className="mt-4 border-t border-slate-800 pt-3 text-xs text-slate-500">Original: {e.message}</p>
        </div>
      </div>
    </div>
  );
};

export const AdminApp: React.FC = () => {
  useEffect(() => {
    document.title = `Admin — ${SITE.name}`;
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, []);

  const path = window.location.pathname.replace(/\/+$/, '');
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
    <Gate>
      {(pass, signOut) => {
        let page: React.ReactNode;
        let m: RegExpMatchArray | null;
        if (path === '/admin') page = <Hub pass={pass} />;
        else if (path === '/admin/orders') page = <OrdersList pass={pass} />;
        else if ((m = path.match(/^\/admin\/orders\/([^/]+)$/))) page = <OrderDetail pass={pass} id={decodeURIComponent(m[1])} />;
        else if (path === '/admin/enquiries') page = <EnquiriesList pass={pass} />;
        else if ((m = path.match(/^\/admin\/enquiries\/([^/]+)$/))) page = <EnquiryDetail pass={pass} id={decodeURIComponent(m[1])} />;
        else if (path === '/admin/send-payment-email') page = <SendPayment pass={pass} />;
        else if (path === '/admin/reply-enquiry') page = <ReplyEnquiry pass={pass} />;
        else page = <Hub pass={pass} />;
        return <Shell signOut={signOut}>{page}</Shell>;
      }}
    </Gate>
    </div>
  );
};
