// Build-time only (bundled by scripts/prerender.mjs): renders the real page components to static HTML
// so crawlers that don't run JavaScript get exactly the content visitors see. Never imported by the app.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ShopProvider } from '../context/ShopContext';
import { HomePage } from '../pages/HomePage';
import { ShopPage } from '../pages/ShopPage';
import { BlogPage } from '../pages/BlogPage';
import { AboutPage } from '../pages/AboutPage';
import { ContactPage } from '../pages/ContactPage';
import { FAQPage } from '../pages/FAQPage';
import { PoliciesPage } from '../pages/PoliciesPage';

const PAGES: Record<string, React.FC> = {
  '/': HomePage,
  '/shop': ShopPage,
  '/blog': BlogPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/faq': FAQPage,
  '/shipping': PoliciesPage,
  '/refund': PoliciesPage,
  '/privacy': PoliciesPage,
  '/terms': PoliciesPage
};

export const SSR_ROUTES = Object.keys(PAGES);

export function renderStatic(pathname: string): string | null {
  const Page = PAGES[pathname];
  if (!Page) return null;
  // ShopProvider reads window.location for its initial page; the prerender sets a minimal window shim first.
  return renderToStaticMarkup(
    <ShopProvider>
      <Page />
    </ShopProvider>
  );
}
