import React from 'react';
import { parseInline, parseRich } from '../seo/richtext';

const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  // Let modified clicks open normally; otherwise navigate in-app via the router's popstate handler.
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const Inline: React.FC<{ text: string }> = ({ text }) => (
  <>
    {parseInline(text).map((p, i) =>
      p.href ? (
        <a key={i} href={p.href} onClick={(e) => go(e, p.href!)} className="font-semibold text-sky-700 hover:text-sky-800 underline underline-offset-2">
          {p.text}
        </a>
      ) : (
        <React.Fragment key={i}>{p.text}</React.Fragment>
      )
    )}
  </>
);

/** Renders blog content strings (paragraphs, ## / ### headings, - lists, [links](/path), ![alt](/image) lines). */
export const RichText: React.FC<{ lines: string[] }> = ({ lines }) => (
  <>
    {parseRich(lines).map((b, i) => {
      if (b.type === 'img')
        return (
          <figure key={i} className="max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white aspect-[4/3] overflow-hidden">
            <img src={b.src} alt={b.alt} width={800} height={600} loading="lazy" decoding="async" className="w-full h-full object-contain p-4" />
          </figure>
        );
      if (b.type === 'note')
        return (
          <aside key={i} className="rounded-2xl border-l-4 border-sky-500 bg-sky-50 px-4 py-3 sm:px-5 sm:py-4 text-slate-800">
            <p className="leading-relaxed">
              <Inline text={b.text} />
            </p>
          </aside>
        );
      if (b.type === 'table')
        return (
          <div key={i} className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {b.head.map((h, j) => (
                    <th key={j} scope="col" className="px-3 py-2.5 font-bold">
                      <Inline text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, j) => (
                  <tr key={j} className="border-t border-slate-100">
                    {r.map((c, k) =>
                      k === 0 ? (
                        <th key={k} scope="row" className="px-3 py-2.5 font-semibold text-slate-900">
                          <Inline text={c} />
                        </th>
                      ) : (
                        <td key={k} className="px-3 py-2.5 text-slate-600">
                          <Inline text={c} />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      if (b.type === 'h2')
        return (
          <h2 key={i} className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight pt-2">
            <Inline text={b.text} />
          </h2>
        );
      if (b.type === 'h3')
        return (
          <h3 key={i} className="text-lg font-bold text-slate-900">
            <Inline text={b.text} />
          </h3>
        );
      if (b.type === 'ul')
        return (
          <ul key={i} className="list-disc pl-5 space-y-1.5">
            {b.items.map((it, j) => (
              <li key={j}>
                <Inline text={it} />
              </li>
            ))}
          </ul>
        );
      return (
        <p key={i} className="leading-relaxed">
          <Inline text={b.text} />
        </p>
      );
    })}
  </>
);
