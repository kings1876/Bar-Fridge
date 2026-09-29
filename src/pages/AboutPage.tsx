import React from 'react';
import { useShop } from '../context/ShopContext';
import { TrustpilotBanner } from '../components/TrustpilotBanner';
import { 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Snowflake
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  const milestones = [
    {
      year: '17 May 2018',
      title: 'Founded in Australia',
      description: 'Launched by refrigeration engineers frustrated by cheap imported fridges that continuously sweated and burnt out in Aussie summer alfresco areas.'
    },
    {
      year: '2020',
      title: 'Sydney & Melbourne Logistics Hubs',
      description: 'Established dedicated heavy-appliance distribution hubs with hydraulic tailgate freight partners to guarantee zero transit damage.'
    },
    {
      year: '2022',
      title: 'Brisbane & Perth Expansion',
      description: 'Opened Queensland and Western Australia stock depots to meet soaring demand for 43°C Class-T tropical rated coolers.'
    },
    {
      year: '2024',
      title: 'Pioneered 10% Crypto Discount',
      description: 'Eliminated credit card processing interchange fees by enabling seamless Bitcoin, USDT, and Ethereum payments, passing the full 10% savings to customers.'
    },
    {
      year: '2026',
      title: '2,148+ Verified Trustpilot Reviews',
      description: 'Ranked Australia’s most trusted commercial bar fridge and alfresco cooling specialist with a stellar 4.9/5 star average.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Brand Hero */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-300 text-sky-800 text-xs font-bold shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>Proudly Australian Owned & Operated Since 17 May 2018</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Engineered For The Harsh Australian Climate
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          At Bar Fridges For Sale Australia, we specialize exclusively in high-performance commercial beverage chillers, outdoor alfresco coolers, and heavy-duty bar freezers designed to survive 40°C+ heatwaves.
        </p>
      </section>

      {/* Trustpilot Banner */}
      <section>
        <TrustpilotBanner />
      </section>

      {/* Story & What Makes Us Different */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Our Engineering Philosophy</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Standard Fridges Fail Under Australian Patios
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In Australia, outdoor entertainment is a way of life. From Christmas barbecues in Western Sydney to humid February afternoons in Brisbane, ambient temperatures regularly cross 40°C. Standard domestic fridges are designed for 25°C air-conditioned kitchens; when placed outdoors, their compressors overwork, ice forms on evaporators, and glass doors drip condensation onto expensive timber decking.
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            As an authorized commercial stockist, our units feature three non-negotiable upgrades:
          </p>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl shrink-0 mt-0.5 border border-sky-100">
                <Snowflake className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-900 text-xs block font-bold">True Tropical Class T (43°C Ambient Tested)</strong>
                <span className="text-slate-500 text-xs">High-velocity fans and industrial Embraco compressors keep beer down to -2°C even during severe heatwaves.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5 border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-900 text-xs block font-bold">Electrically Heated Anti-Sweat Glass</strong>
                <span className="text-slate-500 text-xs">Conductive heated glass filaments prevent condensation droplets in 90%+ coastal humidity.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-xl shrink-0 mt-0.5 border border-amber-100">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-900 text-xs block font-bold">304 Marine Grade Stainless Steel</strong>
                <span className="text-slate-500 text-xs">Impervious to rust, chlorine from pools, and coastal salty breezes.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-xl relative bg-slate-100">
            <img
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
              alt="Bar fridge warehouse and engineering testing in Australia"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 text-xs shadow-md">
                <span className="text-sky-700 font-bold uppercase block text-[10px]">Nationwide Warehouse Network</span>
                <span className="text-slate-900 font-extrabold">Sydney • Melbourne • Brisbane • Perth</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Milestones Timeline */}
      <section className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Our Journey</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Company Milestones</h2>
          <p className="text-xs text-slate-500">From a local engineering initiative to Australia’s most trusted commercial cooler specialist.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3.5">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-sky-300 transition-colors shadow-2xs"
            >
              <div className="px-4 py-2 bg-sky-50 text-sky-800 border border-sky-200 font-mono font-bold text-xs rounded-xl shrink-0 text-center sm:text-left">
                {m.year}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Stockist & Warranty Assurance */}
      <section className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest font-bold text-sky-400">Direct From The Stockist</span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Official Warranty & Authorized Service
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every bar fridge and commercial freezer is backed by a 2–3 Year Australian In-Home/On-Site Warranty. We maintain contracted refrigeration mechanics in all states, ensuring prompt repair or replacement should you ever need it.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-transform hover:scale-105"
          >
            Explore The Range
          </button>
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs rounded-2xl transition-colors"
          >
            Speak With an Engineer
          </button>
        </div>
      </section>
    </div>
  );
};
