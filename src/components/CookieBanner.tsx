import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('bffs_cookie_consent');
      if (!consent) {
        setAccepted(false);
      }
    } catch {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('bffs_cookie_consent', 'true');
    } catch {}
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <aside aria-label="Cookie consent banner" className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-xl text-xs text-slate-700 space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-900">Australian Privacy & Cookie Notice</div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            We use essential cookies to maintain your shopping cart, calculate 10% crypto payment discounts, and enhance site speed.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={handleAccept}
          className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg text-xs transition-colors shadow-sm"
        >
          Accept & Continue
        </button>
      </div>
    </aside>
  );
};
