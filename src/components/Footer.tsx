import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Phone, 
  Mail, 
  MapPin, 
  Bitcoin, 
  Award,
  CheckCircle2
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Footer: React.FC = () => {
  const { navigateTo, setSelectedCategory } = useShop();

  const seoSearchKeywords = [
    'bar fridges for sale',
    'bar fridge sales',
    'bar freezer for sale',
    'bar fridge buy',
    'beverage fridge for sale',
    'drinks fridge for sale',
    'bar fridge prices',
    'bar fridges for sale near me',
    'bar refrigerator price',
    'buy bar fridge',
    'freezers for sale',
    'hisense bar fridge',
    'freezers in sale',
    'chest freezer for sale',
    'electrolux fridges',
    'buy chest freezer'
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-sky-950/80 border border-sky-800/80 rounded-xl text-sky-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Free Nationwide Freight</h4>
              <p className="text-xs text-slate-400 mt-1">Free tailgate courier shipping on all fridges & freezers across Australia.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-amber-950/80 border border-amber-800/80 rounded-xl text-amber-400 shrink-0">
              <Bitcoin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">10% Crypto Discount</h4>
              <p className="text-xs text-slate-400 mt-1">Instant 10% deduction when paying with Bitcoin, USDT, Ethereum or Solana.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">2–3 Year Aussie Warranty</h4>
              <p className="text-xs text-slate-400 mt-1">Commercial warranty coverage with technician support in all states.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 bg-cyan-950/80 border border-cyan-800/80 rounded-xl text-cyan-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-sm">Tropical 43°C Rated</h4>
              <p className="text-xs text-slate-400 mt-1">Engineered to keep drinks sub-zero through the hottest Aussie summer days.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center p-2 text-white shadow-md">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="4" y1="10" x2="20" y2="10" />
                  <path d="M12 18v-4M10 16h4" stroke="#7DD3FC" strokeWidth="2.5" />
                </svg>
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight">BAR FRIDGES <span className="text-sky-400">FOR SALE</span></span>
                <span className="block text-xs text-slate-400">Australia's Beverage & Alfresco Specialist</span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-slate-400">
              Founded on 17 May 2018 in Australia, Bar Fridges For Sale is an authorized commercial stockist providing heavy-duty alfresco outdoor fridges, back-bar display chillers, wine cooling centers, and deep chest freezers engineered for extreme ambient temperatures.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Distribution Centers: Sydney, Melbourne, Brisbane, Perth (Australia)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@barfridgesforsale.com.au</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>1300 CHILL AUS (1300 244 552) • Mon–Sat 8am–7pm AEST</span>
              </div>
            </div>

            {/* Crypto Badges */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Accepted Currencies & Payments</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-amber-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> Bitcoin (BTC)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-sky-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span> Ethereum (ETH)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-emerald-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span> USDT (TRC20/ERC20)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-medium text-purple-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span> Solana (SOL)
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-xs text-slate-400">
                  USD Pricing
                </span>
              </div>
            </div>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      navigateTo('shop', { categoryId: cat.id });
                    }}
                    className="hover:text-sky-400 transition-colors text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    navigateTo('shop');
                  }}
                  className="text-sky-400 font-semibold hover:underline"
                >
                  View All Products (12) →
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-sky-400">Shop Catalog</button>
              </li>
              <li>
                <button onClick={() => navigateTo('blog')} className="hover:text-sky-400">Blog & Buying Guides</button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-sky-400">About Us & Brand Story</button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-sky-400">Contact Us & Orders</button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-sky-400">Frequently Asked Questions</button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-sky-400">Shipping Policy (Free Delivery)</button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund')} className="hover:text-sky-400">Refunds & 30-Day Returns</button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Customer Policies</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('shipping')} className="hover:text-sky-400">Australia Freight Rates</button>
              </li>
              <li>
                <button onClick={() => navigateTo('refund')} className="hover:text-sky-400">Warranty Registration</button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-sky-400">Privacy Policy (GDPR/APP)</button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-sky-400">Terms of Service</button>
              </li>
              <li className="pt-2 text-slate-400">
                <span className="block text-[11px] text-slate-500">Australian Business Number</span>
                <span className="font-mono text-slate-300">ABN: 48 619 448 301</span>
              </li>
              <li className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorized Commercial Stockist</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Keyword Cloud for search engine ranking */}
        <div className="mt-12 pt-8 border-t border-slate-900">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Popular Australian Search Searches & Commercial Keywords
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-slate-400">
            {seoSearchKeywords.map((kw, i) => (
              <span key={i} className="inline-flex items-center">
                <button
                  onClick={() => {
                    navigateTo('shop');
                  }}
                  className="hover:text-sky-400 hover:underline capitalize"
                >
                  {kw}
                </button>
                {i < seoSearchKeywords.length - 1 && <span className="ml-3 text-slate-700">•</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2018–2026 Bar Fridges For Sale Australia. All rights reserved. Prices displayed in USD. All trademarks and brand names are property of their respective owners.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white">Privacy</button>
            <span>•</span>
            <button onClick={() => navigateTo('terms')} className="hover:text-white">Terms</button>
            <span>•</span>
            <button onClick={() => navigateTo('shipping')} className="hover:text-white">Shipping</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
