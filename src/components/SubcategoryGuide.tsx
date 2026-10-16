import React from 'react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { SUBCATEGORY_GUIDES, subStats } from '../data/subcategoryContent';

const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Modified clicks open normally; otherwise navigate in-app via the router's popstate handler.
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

/** Buyer's guide shown under the product list on a subcategory page (crawlable text content). */
export const SubcategoryGuide: React.FC<{ categoryId: string; subcategory: string }> = ({ categoryId, subcategory }) => {
  const guide = SUBCATEGORY_GUIDES[subcategory];
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!guide || !cat) return null;

  const items = PRODUCTS.filter((p) => p.category === categoryId && p.subcategory === subcategory);
  const stats = subStats(items, guide.showRatings !== false);

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-5" aria-labelledby="subcategory-guide-heading">
      <h2 id="subcategory-guide-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {guide.heading}
      </h2>
      {stats && <p className="text-sm font-semibold text-sky-800">{stats}</p>}
      <div className="space-y-3 max-w-3xl">
        {guide.intro.map((t, i) => (
          <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t}
          </p>
        ))}
      </div>
      <div className="max-w-3xl space-y-2">
        <h3 className="text-lg font-bold text-slate-900">What to look for</h3>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-600 text-sm leading-relaxed">
          {guide.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-2 border-t border-slate-100">
        {guide.links.map((l) => (
          <a key={l.path} href={l.path} onClick={(e) => go(e, l.path)} className="font-bold text-sky-700 hover:text-sky-800">
            {l.label} →
          </a>
        ))}
        <a href={`/category/${categoryId}`} onClick={(e) => go(e, `/category/${categoryId}`)} className="text-slate-600 hover:text-sky-700">
          All {cat.name}
        </a>
      </div>
    </section>
  );
};
