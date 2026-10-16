/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { lazy, Suspense } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Seo } from './components/Seo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CookieBanner } from './components/CookieBanner';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PoliciesPage } from './pages/PoliciesPage';
// Admin and order-confirmation pages are rarely used: load them on demand to keep the public bundle small.
const AdminApp = lazy(() => import('./admin/AdminApp').then((m) => ({ default: m.AdminApp })));
const PaymentDetailsPage = lazy(() => import('./pages/OrderPublic').then((m) => ({ default: m.PaymentDetailsPage })));
const ConfirmPaymentPage = lazy(() => import('./pages/OrderPublic').then((m) => ({ default: m.ConfirmPaymentPage })));

const AppContent: React.FC = () => {
  const { currentPage } = useShop();

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
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />

      {/* Global Overlays & Utilities */}
      <CartDrawer />
      <OrderCheckoutModal />
      <LiveChatWidget />
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
