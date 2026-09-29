/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
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
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
