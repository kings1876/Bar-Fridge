import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white border border-slate-200 rounded-2xl p-4 shadow-xl flex items-start gap-3 text-xs text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
          {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h5 className="font-bold text-slate-900 text-xs">{toast.title}</h5>
            <p className="text-slate-600 text-[11px] mt-0.5 leading-snug">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
