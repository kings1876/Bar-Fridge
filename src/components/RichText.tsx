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

/** Renders blog content strings (paragraphs, ## / ### headings, - lists, [links](/path)). */
export const RichText: React.FC<{ lines: string[] }> = ({ lines }) => (
  <>
    {parseRich(lines).map((b, i) => {
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
