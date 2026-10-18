import React from 'react';
import { CATEGORIES } from '../data/categories';

const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Modified clicks open normally; otherwise navigate in-app via the router's popstate handler.
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const GUIDES: { label: string; path: string }[] = [
  { label: 'Bar fridge buying guide', path: '/top-bar-fridges-for-sale-australia-guide' },
  { label: 'Bar fridge dimensions guide', path: '/bar-fridge-dimensions-guide' },
  { label: 'Outdoor kitchen fridge guide', path: '/outdoor-kitchen-fridge-guide' },
  { label: 'Glass door fridge guide', path: '/glass-door-fridge-guide' },
  { label: 'Beer fridge guide', path: '/beer-fridge-guide' }
];

/** Buying overview shown under the full product list (no category selected). */
export const ShopOverview: React.FC = () => (
  <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5" aria-labelledby="shop-overview-heading">
    <h2 id="shop-overview-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
      Choosing a Bar Fridge in Australia
    </h2>
    <div className="space-y-3 max-w-3xl text-slate-600 text-sm sm:text-base leading-relaxed">
      <p>
        Our range covers single door bar fridges for home bars and offices, double and triple door commercial bar fridges for venues,
        alfresco and outdoor bar fridges built for Australian summers, wine and dual zone beverage fridges, and bar freezers. Every
        product page lists the capacity, dimensions, sound rating, energy rating and warranty, so you can compare models side by side.
      </p>
      <p>
        Start with where the fridge will live. Indoors you have the most choice, including under bench models that vent from the front.
        For a covered patio or an outdoor kitchen, choose a model listed for alfresco or outdoor installation with a tropical rating,
        and keep it out of direct rain and sun. Then decide between a glass door that shows off the drinks and a solid door with a
        cleaner look.
      </p>
      <p>
        Next, check the size. Measure the width, depth and height of the space, allow the ventilation clearance the manufacturer lists,
        and compare the litre capacity and the number of cans each model holds. Shipping on our bar fridges and freezers is free across
        Australia, and paying with Bitcoin, USDT or Ethereum takes 10% off your order.
      </p>
    </div>
    <div className="max-w-3xl space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed">
      <p>
        Every bar fridge and freezer carries the warranty listed on its product page, and our shipping and returns pages explain delivery
        and returns in full. If you cannot find the size or style you need, contact us with the space you have in mind and we will help
        you find the right model.
      </p>
      <p>
        If you are not sure where to start, our buying guides explain the choices in plain language: how climate ratings work, why front
        venting matters for built in fridges, how glass door fridges handle condensation, and how to read the dimensions on a product page
        so the fridge fits the first time.
      </p>
    </div>
    <div className="max-w-3xl space-y-2">
      <h3 className="text-lg font-bold text-slate-900">Browse by category</h3>
      <div className="space-y-2 text-slate-600 text-sm leading-relaxed">
        {CATEGORIES.map((c) => (
          <p key={c.id}>
            <a href={`/category/${c.id}`} onClick={(e) => go(e, `/category/${c.id}`)} className="font-bold text-sky-700 hover:text-sky-800">
              {c.name}
            </a>
            : {c.description}
          </p>
        ))}
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-2 border-t border-slate-100">
      {GUIDES.map((g) => (
        <a key={g.path} href={g.path} onClick={(e) => go(e, g.path)} className="font-bold text-sky-700 hover:text-sky-800">
          {g.label} →
        </a>
      ))}
    </div>
  </section>
);
