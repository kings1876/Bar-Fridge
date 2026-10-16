import React from 'react';
import { useShop } from '../context/ShopContext';
import { NavLink } from './NavLink';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { CATEGORY_GUIDES } from '../data/categoryContent';

/** Buyer's guide shown under the product grid on a category page (crawlable text content). */
export const CategoryGuide: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const { formatPrice } = useShop();
  const guide = CATEGORY_GUIDES[categoryId];
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  if (!guide || !cat) return null;

  // Ice boxes live in this category for navigation but aren't bar fridges: keep them out of the count and from-price.
  const inCat = PRODUCTS.filter((p) => p.category === categoryId && p.subcategory !== 'Ice Boxes & Coolers');
  const from = inCat.length ? Math.min(...inCat.map((p) => p.price)) : 0;

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8" aria-labelledby="category-guide-heading">
      <div className="space-y-3 max-w-3xl">
        <h2 id="category-guide-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {guide.heading}
        </h2>
        {guide.intro.map((t, i) => (
          <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t}
          </p>
        ))}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Browse {inCat.length} {cat.name.toLowerCase()} from {formatPrice(from)}, shipped free across Australia.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
        {guide.sections.map((s) => (
          <div key={s.h} className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">{s.h}</h3>
            {s.p.map((t, i) => (
              <p key={i} className="text-slate-600 text-sm leading-relaxed">
                {t}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-4 max-w-3xl">
        <h3 className="text-xl font-extrabold text-slate-900">Frequently asked questions</h3>
        <dl className="space-y-4">
          {guide.faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-bold text-slate-900 text-sm sm:text-base">{f.q}</dt>
              <dd className="text-slate-600 text-sm leading-relaxed mt-1">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm pt-2 border-t border-slate-100">
        <NavLink page="blog-post" options={{ blogId: guide.blog.slug }} className="font-bold text-sky-700 hover:text-sky-800">
          {guide.blog.label} →
        </NavLink>
        {guide.related.map((id) => {
          const c = CATEGORIES.find((x) => x.id === id);
          return c ? (
            <NavLink key={id} page="shop" options={{ categoryId: id }} className="text-slate-600 hover:text-sky-700">
              {c.name}
            </NavLink>
          ) : null;
        })}
      </div>
    </section>
  );
};
