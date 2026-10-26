import React, { useMemo, useState } from 'react';
import qrcode from 'qrcode-generator';

/** QR code for a wallet address (plain address text, which every wallet app can scan). Rendered locally, nothing is sent anywhere. */
export const WalletQr: React.FC<{ value: string; size?: number; label?: string }> = ({ value, size = 176, label = 'QR code for the wallet address' }) => {
  const svg = useMemo(() => {
    const qr = qrcode(0, 'M');
    qr.addData(value);
    qr.make();
    return qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
  }, [value]);
  return (
    <div
      role="img"
      aria-label={label}
      className="bg-white p-2 rounded-xl border border-slate-200 inline-block [&>svg]:block [&>svg]:w-full [&>svg]:h-auto"
      style={{ width: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

/** Address line with a copy button. */
export const CopyAddress: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked: the address is still selectable */ }
  };
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 text-left">
      <div className="text-[11px] font-bold uppercase text-slate-500">{label}</div>
      <div className="mt-1 flex items-start justify-between gap-3">
        <span className="min-w-0 break-all font-mono text-sm font-semibold text-slate-900 select-all">{value}</span>
        <button type="button" onClick={copy} className="shrink-0 rounded-lg bg-sky-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-800">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
    </div>
  );
};
