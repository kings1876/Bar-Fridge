/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Seo } from './components/Seo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Staged } from './components/Staged';
import { CookieBanner } from './components/CookieBanner';
import { ToastContainer } from './components/ToastContainer';

// Pages are split per route so a visitor only downloads the page they open.
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then((m) => ({ default: m.BlogPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then((m) => ({ default: m.FAQPage })));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage').then((m) => ({ default: m.PoliciesPage })));
// Overlays are only needed after interaction: load them once the browser is idle (or when first opened).
const CartDrawer = lazy(() => import('./components/CartDrawer').then((m) => ({ default: m.CartDrawer })));
const OrderCheckoutModal = lazy(() => import('./components/OrderCheckoutModal').then((m) => ({ default: m.OrderCheckoutModal })));
const LiveChatWidget = lazy(() => import('./components/LiveChatWidget').then((m) => ({ default: m.LiveChatWidget })));

function useIdle(): boolean {
  const [idle, setIdle] = React.useState(false);
  React.useEffect(() => {
    const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setIdle(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return idle;
}
// Admin and order-confirmation pages are rarely used: load them on demand to keep the public bundle small.
const AdminApp = lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp })));
const PaymentDetailsPage = lazy(() => import('./pages/OrderPublic').then((m) => ({ default: m.PaymentDetailsPage })));
const ConfirmPaymentPage = lazy(() => import('./pages/OrderPublic').then((m) => ({ default: m.ConfirmPaymentPage })));

const AppContent: React.FC = () => {
  const { currentPage, isCartDrawerOpen, isOrderModalOpen } = useShop();
  const idle = useIdle();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'blog':
      case 'blog-post':
        return <BlogPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'shipping':
      case 'refund':
      case 'privacy':
      case 'terms':
        return <PoliciesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-sky-500 selection:text-white font-sans">
      <Seo />
      <Navbar />
      {/* The footer shares the page's loading boundary so it appears together with the page content
          instead of sitting under a placeholder and jumping down (a layout shift) when the page loads. */}
      <Suspense fallback={<div className="flex-1 min-h-screen" />}>
        <main className="flex-1">{renderCurrentPage()}</main>
        <Staged stage={1} minHeight={720}>
          <Footer />
        </Staged>
      </Suspense>

      {/* Global Overlays & Utilities */}
      <Suspense fallback={null}>
        {(idle || isCartDrawerOpen) && <CartDrawer />}
        {(idle || isOrderModalOpen) && <OrderCheckoutModal />}
        {idle && <LiveChatWidget />}
      </Suspense>
      <CookieBanner />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/admin' || path.startsWith('/admin/')) return <Suspense fallback={null}><AdminApp /></Suspense>;
  if (path === '/order/payment-details') return <Suspense fallback={null}><PaymentDetailsPage /></Suspense>;
  if (path === '/order/confirm-payment') return <Suspense fallback={null}><ConfirmPaymentPage /></Suspense>;
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
