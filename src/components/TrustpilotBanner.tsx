import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { REVIEWS_STATS } from '../data/reviews';

export const TrustpilotBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  return (
    <div className={`bg-gradient-to-r from-emerald-50/80 via-white to-sky-50/80 border border-emerald-200 rounded-3xl ${compact ? 'p-3' : 'p-6 sm:p-8'} shadow-sm`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Rating summary */}
        <div className="flex items-center gap-4">
          {/* Trustpilot Green Stars Logo Box */}
          <div className="bg-[#00b67a] text-white font-extrabold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-700/20">
            <Star className="w-5 h-5 fill-white" />
            <span className="text-sm font-bold tracking-tight">Trustpilot</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl text-slate-900">4.9 / 5.0</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-sm">
                    <Star className="w-3 h-3 fill-white text-white" />
                  </div>
                ))}
              </div>
            </div>
            <div className="text-xs text-slate-600 mt-0.5">
              Based on <strong className="font-bold text-emerald-800">{REVIEWS_STATS.totalCount.toLocaleString()}+ verified</strong> customer reviews across Australia
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>98% Positive Experience</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>Zero Transit Damage Guarantee</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Verified Aussie Buyers</span>
          </div>
        </div>
      </div>
    </div>
  );
};
