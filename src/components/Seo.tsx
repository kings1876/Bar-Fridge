import { useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import type { SeoMeta } from '../seo/seo';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

function apply(m: SeoMeta) {
  document.title = m.title;
  setMeta('name', 'description', m.description);
  setMeta('name', 'robots', m.robots);
  setMeta('property', 'og:title', m.title);
  setMeta('property', 'og:description', m.description);
  setMeta('property', 'og:type', m.ogType);
  setMeta('property', 'og:locale', 'en_AU');
  setMeta('property', 'og:url', m.canonical);
  setMeta('property', 'og:image', m.image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', m.title);
  setMeta('name', 'twitter:description', m.description);
  setMeta('name', 'twitter:image', m.image);

  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = m.canonical;

  // hreflang: indexable pages are their own en-AU / x-default version (single market)
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((n) => n.remove());
  if (m.robots.startsWith('index')) {
    ['en-AU', 'x-default'].forEach((lang) => {
      const alt = document.createElement('link');
      alt.rel = 'alternate';
      alt.hreflang = lang;
      alt.href = m.canonical;
      document.head.appendChild(alt);
    });
  }

  document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove());
  m.jsonLd.forEach((obj) => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-seo', '1');
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

/** Keeps <title>, description, canonical, Open Graph and JSON-LD in sync with the current URL. */
export const Seo: React.FC = () => {
  const { currentPage, selectedProductSlug, selectedBlogSlug, selectedCategory, selectedSubcategory } = useShop();

  const first = useRef(true);

  useEffect(() => {
    // First load: the prerendered HTML already carries the right head for this URL, so don't
    // download the SEO module just to rewrite identical tags. Only update on navigation, or when
    // the URL isn't the page's canonical one (e.g. a legacy /shop?category= link).
    if (first.current) {
      first.current = false;
      const canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href;
      if (canon && new URL(canon).pathname === window.location.pathname && !window.location.search) return;
    }
    let cancelled = false;
    // The SEO module (titles, schema, guide text) is large and not needed for first paint:
    // the prerendered HTML already carries the right head, so load it on demand.
    import('../seo/seo').then(({ seoForPath }) => {
      if (cancelled) return;
      apply(seoForPath(window.location.pathname, window.location.search));
    });
    return () => {
      cancelled = true;
    };
  }, [currentPage, selectedProductSlug, selectedBlogSlug, selectedCategory, selectedSubcategory]);

  return null;
};
