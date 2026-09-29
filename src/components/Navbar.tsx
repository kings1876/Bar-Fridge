import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Truck, 
  Bitcoin,
  Flame,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    cartCount, 
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [expandedNavCategory, setExpandedNavCategory] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setShowSearchInput(false);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm text-slate-800">
      {/* Top Announcement Bar (Deep Oceanic Navy) */}
      <div className="bg-slate-950 text-xs py-2 px-4 text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-sky-200">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-3.5 h-3.5 text-sky-400" />
              <span>Free Nationwide Delivery on All Fridges in Australia</span>
            </span>
            <span className="hidden md:inline-block text-slate-600">•</span>
            <span className="hidden md:flex items-center gap-1 text-amber-400 font-semibold">
              <Bitcoin className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant 10% Off Crypto Checkout</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>2–3 Yr Aussie Warranty</span>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-sky-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Stockist Direct • Warehouses in SYD, MEL, BNE, PER</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 flex items-center justify-center p-2 shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="4" y1="10" x2="20" y2="10" />
                <line x1="15" y1="6" x2="17" y2="6" />
                <line x1="15" y1="14" x2="17" y2="14" />
                <path d="M12 18v-4M10 16h4" stroke="#7DD3FC" strokeWidth="2.5" />
              </svg>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 border-2 border-white"></div>
            </div>
            <div>
              <div className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-950 flex items-center gap-1.5">
                <span>BAR FRIDGES</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">FOR SALE</span>
              </div>
              <div className="text-[10px] sm:text-xs text-sky-700 font-semibold tracking-wider uppercase">
                Outdoor Alfresco & Commercial Coolers Australia
              </div>
            </div>
          </button>

          {/* Desktop Navigation - Order: Shop, Blog, About, Contact, FAQ */}
          <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
            {/* Shop with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => {
                setShopDropdownOpen(false);
                setExpandedNavCategory(null);
              }}
            >
              <button
                onClick={() => navigateTo('shop')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors ${
                  currentPage === 'shop' || currentPage === 'product-detail'
                    ? 'text-sky-700 bg-sky-50 font-semibold'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
                }`}
              >
                <span>Shop</span>
                <ChevronDown className="w-4 h-4 opacity-70" />
              </button>

              {shopDropdownOpen && (
                <div className="absolute top-full left-0 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1.5 mb-1 border-b border-slate-100">
                    Product Categories
                  </div>
                  {CATEGORIES.map((cat) => {
                    const isExpanded = expandedNavCategory === cat.id;
                    return (
                      <div key={cat.id}>
                        <div className="w-full flex items-center rounded-xl hover:bg-sky-50/80 transition-colors group">
                          <button
                            onClick={() => {
                              navigateTo('shop', { categoryId: cat.id });
                              setShopDropdownOpen(false);
                              setExpandedNavCategory(null);
                            }}
                            className="flex-1 text-left px-3 py-2 text-xs"
                          >
                            <div className="font-semibold group-hover:text-sky-700 text-slate-900">{cat.name}</div>
                          </button>
                          <button
                            onClick={() => setExpandedNavCategory(isExpanded ? null : cat.id)}
                            aria-label={`Toggle ${cat.name} subcategories`}
                            className="p-2 mr-1 text-slate-400 group-hover:text-sky-600"
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="pl-3 pb-1.5 space-y-0.5">
                            {cat.subcategories.map((sub) => (
                              <button
                                key={sub}
                                onClick={() => {
                                  navigateTo('shop', { categoryId: cat.id, subcategory: sub });
                                  setShopDropdownOpen(false);
                                  setExpandedNavCategory(null);
                                }}
                                className="w-full text-left px-3 py-1.5 text-[11px] rounded-lg text-slate-600 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        navigateTo('shop');
                        setShopDropdownOpen(false);
                      }}
                      className="w-full py-2 text-center text-xs font-bold text-sky-700 bg-sky-50 rounded-xl hover:bg-sky-100 transition-colors"
                    >
                      Browse All 12+ Fridges & Freezers →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('blog')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'blog' || currentPage === 'blog-post'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => navigateTo('about')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'about'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
              }`}
            >
              About
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'contact'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => navigateTo('faq')}
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                currentPage === 'faq'
                  ? 'text-sky-700 bg-sky-50 font-semibold'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
              }`}
            >
              FAQ
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Search Input / Button */}
            <div className="relative">
              {showSearchInput ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search bar fridges, freezers..."
                    autoFocus
                    className="w-48 sm:w-64 bg-slate-100 border border-sky-400 rounded-xl pl-3 pr-8 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowSearchInput(false)}
                    className="absolute right-2 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 transition-colors"
                  aria-label="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Crypto 10% Discount Badge Button */}
            <div className="hidden xl:flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-800 text-xs px-3 py-1.5 rounded-xl font-semibold">
              <Bitcoin className="w-3.5 h-3.5 text-amber-600" />
              <span>10% Crypto Off</span>
            </div>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all shadow-md group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-sky-300 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-sky-500 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search fridges, alfresco, freezers..."
              className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:border-sky-500"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          </form>

          <div className="grid grid-cols-1 gap-1 text-base font-medium">
            <button
              onClick={() => {
                navigateTo('shop');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between ${
                currentPage === 'shop' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
              }`}
            >
              <span>Shop All Bar Fridges & Freezers</span>
              <span className="text-xs text-sky-600 font-semibold">12 Products</span>
            </button>

            <button
              onClick={() => {
                navigateTo('blog');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl ${
                currentPage === 'blog' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
              }`}
            >
              Blog & Buying Guides
            </button>

            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl ${
                currentPage === 'about' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
              }`}
            >
              About Our Brand (Est. 2018)
            </button>

            <button
              onClick={() => {
                navigateTo('contact');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl ${
                currentPage === 'contact' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
              }`}
            >
              Contact Us & Order Inquiries
            </button>

            <button
              onClick={() => {
                navigateTo('faq');
                setMobileMenuOpen(false);
              }}
              className={`text-left px-3.5 py-2.5 rounded-xl ${
                currentPage === 'faq' ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
              }`}
            >
              FAQ & Technical Support
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span>Free Delivery Across Australia</span>
            <span className="text-amber-600 font-bold">10% Crypto Discount</span>
          </div>
        </div>
      )}
    </header>
  );
};
