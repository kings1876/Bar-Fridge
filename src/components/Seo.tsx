import { useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { seoForPath } from '../seo/seo';

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Keeps <title>, description, canonical, Open Graph and JSON-LD in sync with the current URL. */
export const Seo: React.FC = () => {
  const { currentPage, selectedProduct, selectedBlogPost, selectedCategory, selectedSubcategory } = useShop();

  useEffect(() => {
    const m = seoForPath(window.location.pathname, window.location.search);
    document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('name', 'robots', m.robots);
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:type', m.ogType);
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

    document.head.querySelectorAll('script[data-seo]').forEach((n) => n.remove());
    m.jsonLd.forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.setAttribute('data-seo', '1');
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [currentPage, selectedProduct, selectedBlogPost, selectedCategory, selectedSubcategory]);

  return null;
};
