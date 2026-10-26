import React, { useEffect, useState } from 'react';
import { REPLY, SITE } from '../../shared/reply.config.js';
import { findMethod, money, waPaymentConfirmationLink, whatsappEnabled } from '../../shared/order.js';
import { WalletQr } from '../components/WalletQr';

const accent = REPLY.brand.primary;

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  useEffect(() => {
    document.title = `${title} — ${SITE.name}`;
    const m = document.createElement('meta');
    m.name = 'robots'; m.content = 'noindex, nofollow';
    document.head.appendChild(m);
    return () => { m.remove(); };
  }, [title]);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header style={{ background: REPLY.brand.headerDark }} className="px-4 py-4">
        <a href="/" className="mx-auto block max-w-xl text-lg font-black text-white">{SITE.name}</a>
      </header>
      <main className="mx-auto max-w-xl px-4 py-8">{children}</main>
    </div>
  );
};

const CopyField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* ignore */ }
  };
  return (
    <button type="button" onClick={copy} className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-slate-400">
      <span className="min-w-0">
        <span className="block text-[11px] font-bold uppercase text-slate-500">{label}</span>
        <span className="block break-all font-mono text-sm font-semibold">{value}</span>
      </span>
      <span className="shrink-0 text-xs font-bold" style={{ color: copied ? '#059669' : accent }}>{copied ? 'Copied ✓' : 'Copy'}</span>
    </button>
  );
};

const orderId = () => new URLSearchParams(window.location.search).get('id') || '';

export const PaymentDetailsPage: React.FC = () => {
  const id = orderId();
  const [state, setState] = useState<'loading' | 'missing' | 'ok'>('loading');
  const [d, setD] = useState<any>(null);
  useEffect(() => {
    fetch(`/api/order/payment-details?id=${encodeURIComponent(id)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => { setD(j); setState('ok'); })
      .catch(() => setState('missing'));
  }, [id]);

  return (
    <Frame title="Payment details">
      {state === 'loading' && <p className="text-slate-500">Loading…</p>}
      {state === 'missing' && (
        <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
          We couldn't find payment details for this order yet. If you haven't received our payment-details email, please contact {SITE.email}.
        </p>
      )}
      {state === 'ok' && d && (
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Order {d.orderNumber}</p>
            <h1 className="text-3xl font-black">{money(d.amountDue)}</h1>
            <p className="text-sm text-slate-600">{findMethod(d.paymentMethod).label}</p>
          </div>
          <p className="text-sm text-slate-700">Hi {d.customerName}, tap any field below to copy it.</p>
          <div className="space-y-2">
            {d.fields.map((f: any, i: number) => (
              <React.Fragment key={i}>
                <CopyField label={f.label} value={f.value} />
                {/wallet/i.test(f.label) && (
                  <div className="flex flex-col items-center gap-1 py-2">
                    <WalletQr value={f.value} />
                    <span className="text-xs text-slate-500">Scan with your wallet app to fill in the address</span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">{d.terms.map((t: string) => <li key={t}>{t}</li>)}</ul>
          <a href={`/order/confirm-payment?id=${encodeURIComponent(d.orderNumber)}`} className="block rounded-xl py-3 text-center font-bold text-white" style={{ background: accent }}>
            I've paid — upload my screenshot
          </a>
        </div>
      )}
    </Frame>
  );
};

const MAX_BYTES = 3 * 1024 * 1024;
const OK_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

export const ConfirmPaymentPage: React.FC = () => {
  const id = orderId();
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (!OK_TYPES.includes(file.type)) return setErr('Please choose a JPG, PNG, WebP or HEIC image.');
    if (file.size > MAX_BYTES) return setErr('That image is over 3MB. Please choose a smaller screenshot.');
    setBusy(true); setErr('');
    const fileData: string = await new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result).split(',')[1] || '');
      r.onerror = reject;
      r.readAsDataURL(file);
    });
    try {
      const res = await fetch('/api/order/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, note, fileType: file.type, fileData })
      });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      setErr(`Upload failed. Please email the screenshot to ${SITE.email} quoting ${id}.`);
    }
    setBusy(false);
  };

  return (
    <Frame title="Confirm payment">
      {done ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm">
          <h1 className="text-lg font-black text-emerald-800">Thank you — we've got it.</h1>
          <p className="mt-1">We'll confirm your payment for order <b>{id}</b> shortly and arrange dispatch.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Order {id}</p>
            <h1 className="text-2xl font-black">Upload your payment screenshot</h1>
          </div>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/heic" onChange={(e) => setFile(e.target.files?.[0] || null)} className="block w-full rounded-xl border border-slate-300 bg-white p-3 text-sm" />
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional note (e.g. transaction ID)" className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm" />
          {err && <p className="text-sm text-rose-600">{err}</p>}
          <button disabled={!file || busy} className="w-full rounded-xl py-3 font-bold text-white disabled:opacity-50" style={{ background: accent }}>{busy ? 'Uploading…' : 'Send screenshot'}</button>
          {whatsappEnabled() && (
            <a href={waPaymentConfirmationLink(id)} target="_blank" rel="noreferrer" className="block text-center text-sm font-semibold text-emerald-700">Or tell us on WhatsApp</a>
          )}
        </form>
      )}
    </Frame>
  );
};
