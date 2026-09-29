import React from 'react';
import { useShop } from '../context/ShopContext';
import { NavLink } from '../components/NavLink';
import {
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  FileText
} from 'lucide-react';

interface PoliciesPageProps {
  initialTab?: 'shipping' | 'refund' | 'privacy' | 'terms';
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ initialTab = 'shipping' }) => {
  const { currentPage } = useShop();

  const activePolicy = (['shipping', 'refund', 'privacy', 'terms'].includes(currentPage))
    ? currentPage as 'shipping' | 'refund' | 'privacy' | 'terms'
    : initialTab;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Policy Navigation Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-slate-200 pb-6">
        <NavLink
          page="shipping"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePolicy === 'shipping'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Shipping & Freight Policy</span>
        </NavLink>

        <NavLink
          page="refund"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePolicy === 'refund'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refund & 30-Day Returns</span>
        </NavLink>

        <NavLink
          page="privacy"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePolicy === 'privacy'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & GDPR / APP</span>
        </NavLink>

        <NavLink
          page="terms"
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activePolicy === 'terms'
              ? 'bg-sky-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Terms of Service</span>
        </NavLink>
      </div>

      {/* Shipping Policy View */}
      {activePolicy === 'shipping' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold text-sky-700 tracking-wider">Australian Delivery Guidelines</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Nationwide Shipping & Freight Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Last revised: January 2026</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. 100% Free Nationwide Freight on All Major Fridges & Freezers</h3>
            <p>
              We provide Free Standard Tailgate Freight across all major commercial bar fridges, alfresco beverage coolers, and bar freezers to every Australian capital city (Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart, Darwin, Canberra) and regional distribution centers.
            </p>
            <p>
              For small accessories or replacement shelving orders under the standard threshold, a flat $15 flat shipping fee applies.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Tailgate Courier Deliveries</h3>
            <p>
              Commercial bar fridges and freezers are heavy items ranging from 35kg to 110kg. All deliveries are executed by specialized heavy-freight couriers (including Northline, TNT, and Direct Freight Express) equipped with hydraulic tailgate lifters. The driver will safely lower the packaged unit to ground level at your driveway or curbside.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Dispatch & Transit Timelines</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Sydney, Melbourne & Brisbane Metro:</strong> 2 to 3 business days.</li>
              <li><strong>Adelaide, Perth & Hobart Metro:</strong> 3 to 5 business days.</li>
              <li><strong>Regional NSW, VIC, QLD, WA, SA:</strong> 4 to 7 business days.</li>
              <li><strong>Northern Territory & Remote Outlying:</strong> 5 to 9 business days.</li>
            </ul>

            <h3 className="text-base font-bold text-slate-900">4. Comprehensive Transit Insurance</h3>
            <p>
              Every single shipment dispatched by Bar Fridges For Sale Australia includes full transit insurance at no extra cost. In the rare event of in-transit cosmetic or mechanical freight damage, we provide an immediate no-cost replacement.
            </p>
          </div>
        </div>
      )}

      {/* Refund Policy View */}
      {activePolicy === 'refund' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold text-emerald-700 tracking-wider">Customer Satisfaction Guarantee</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Refund & 30-Day Return Policy
            </h1>
            <p className="text-xs text-slate-400 mt-1">Australian Consumer Law (ACL) Compliant</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. 30-Day Change of Mind Period</h3>
            <p>
              If your new bar fridge or freezer does not fit your cabinetry or you wish to exchange it for another size, you may return the unit within 30 days of receipt in its original packaging and undamaged condition.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. 2 Year Australian Manufacturer Warranty</h3>
            <p>
              All units are protected by a 2 Year Parts & Labour Warranty. Should any component or compressor experience defect, our mobile technician network will service or replace the unit promptly.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. How to Initiate a Return</h3>
            <p>
              Simply email our support desk at <span className="text-sky-700 font-bold">support@barfridgesforsale.com.au</span> with your Order Number and photos of the unit in original packaging. We will coordinate a courier collection from your premises.
            </p>
          </div>
        </div>
      )}

      {/* Privacy Policy View */}
      {activePolicy === 'privacy' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold text-sky-700 tracking-wider">Data Protection</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Privacy Policy & GDPR / APPs Compliance
            </h1>
          </div>

          <div className="space-y-4">
            <p>
              Bar Fridges For Sale Australia complies strictly with the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth) and international GDPR guidelines.
            </p>
            <h3 className="text-base font-bold text-slate-900">Information We Collect</h3>
            <p>
              We collect customer name, email address, phone number, and physical shipping address solely for dispatching heavy freight couriers, sending SMS tracking updates, and warranty registration.
            </p>
            <h3 className="text-base font-bold text-slate-900">No Selling of Data</h3>
            <p>
              We never sell, rent, or trade your personal data to marketing third parties. Cryptocurrency order records are stored with high-grade encryption and processed on decentralized networks without storing private banking details.
            </p>
          </div>
        </div>
      )}

      {/* Terms of Service View */}
      {activePolicy === 'terms' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs uppercase font-bold text-amber-700 tracking-wider">Legal Framework</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Terms of Service & Commercial Conditions
            </h1>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Currency & Pricing</h3>
            <p>
              All prices displayed across the site are in Australian Dollars (AUD) as designated. For cryptocurrency payments (BTC, USDT, ETH, SOL), a 10% direct discount is automatically computed upon order form submission.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Installation & Ventilation Clearances</h3>
            <p>
              Front-venting bar fridges may be fitted flush beneath standard benchtops. Rear-venting models require minimum 50mm rear and 20mm top/side clearances as indicated in product manuals to uphold warranty validity.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Governing Law</h3>
            <p>
              These conditions are governed by and construed in accordance with the laws of Australia and the states in which distribution centers operate.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
