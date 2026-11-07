// Google Analytics 4, loaded only when VITE_GA_MEASUREMENT_ID is set at build time AND the visitor accepted the cookie notice.
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// The prerender step bundles this file without Vite's env object, so read it defensively.
// Measurement ID for the "Bar Fridges For Sale" GA4 property (public, it appears in page source); VITE_GA_MEASUREMENT_ID overrides it.
const ID = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env?.VITE_GA_MEASUREMENT_ID) || 'G-FXEQYZ4HZQ';
let started = false;

const pageView = () => {
  window.gtag?.('event', 'page_view', {
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title
  });
};

export const startAnalytics = () => {
  if (started || !ID || typeof window === 'undefined') return;
  started = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', ID, { send_page_view: false, anonymize_ip: true });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ID);
  document.head.appendChild(s);
  pageView();
  // The site navigates with history.pushState and a popstate event; send a page view after each route change.
  const push = history.pushState.bind(history);
  history.pushState = (...args: Parameters<History['pushState']>) => {
    push(...args);
    setTimeout(pageView, 50);
  };
  window.addEventListener('popstate', () => setTimeout(pageView, 50));
};

/** Track a lead or order event (quote form sent, order placed). No-op until analytics has started. */
export const trackEvent = (name: string, params?: Record<string, unknown>) => {
  window.gtag?.('event', name, params || {});
};
