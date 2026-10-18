import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  PhoneCall, 
  Truck, 
  Bitcoin,
  ShieldCheck,
  Flame,
  ChevronDown
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { NavLink } from './NavLink';

const CATEGORY_SHORT_NAMES: Record<string, string> = {
  'single-door': 'Single Door',
  'double-triple-door': 'Double & Triple Door',
  'alfresco-outdoor': 'Alfresco & Outdoor',
  'wine-dual-zone': 'Wine & Dual Zone',
  'bar-freezers': 'Freezers'
};

export const Navbar: React.FC = () => {
  const { 
    currentPage, 
    navigateTo, 
    cartCount, 
    setIsCartDrawerOpen,
    searchQuery,
    setSearchQuery,
    selectedCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileExpandedCategory, setMobileExpandedCategory] = useState<string | null>(null);
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs min-w-0 max-w-full">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-medium text-slate-200 min-w-0 max-w-full">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400 shrink-0" aria-hidden="true" />
              <span className="sm:whitespace-nowrap">Bar Fridges for Sale (FRIDGI)</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="whitespace-nowrap">ABN 50 024 804 820</span>
              <a
                href="https://abr.business.gov.au/ABN/View?abn=50024804820"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Verify ABN 50 024 804 820 on the Australian Business Register (opens in a new tab)"
                className="font-bold text-rose-400 underline underline-offset-2 hover:text-rose-300 whitespace-nowrap"
              >
                Verify on ABR
              </a>
            </span>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5 text-sky-300 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Stockist Direct • Warehouses in SYD, MEL, BNE, PER</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 min-[360px]:gap-4">
          {/* Logo */}
          <NavLink
            page="home"
            className="flex items-center gap-2 min-[360px]:gap-3 text-left group focus:outline-none shrink-0"
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
              <div className="font-extrabold text-base min-[360px]:text-lg leading-tight sm:text-2xl sm:leading-normal tracking-tight text-slate-950 flex flex-col sm:flex-row sm:items-center sm:gap-1.5 whitespace-nowrap">
                <span>BAR FRIDGES</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-700">FOR SALE</span>
              </div>
              <div className="text-[10px] sm:text-xs text-sky-700 font-semibold tracking-wider uppercase hidden 2xl:block">
                Outdoor Alfresco & Commercial Coolers Australia
              </div>
            </div>
          </NavLink>

          {/* Desktop Navigation - Product categories with subcategory dropdowns */}
          <nav className="hidden xl:flex items-center gap-0.5 font-medium text-sm" aria-label="Product categories">
            {CATEGORIES.map((cat) => {
              const isActive = currentPage === 'shop' && selectedCategory === cat.id;
              const isOpen = hoveredCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className="relative"
                  onMouseEnter={() => setHoveredCategory(cat.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <NavLink
                    page="shop"
                    options={{ categoryId: cat.id }}
                    onBeforeNavigate={() => setHoveredCategory(null)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? 'text-sky-700 bg-sky-50 font-semibold'
                        : 'text-slate-700 hover:text-sky-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{CATEGORY_SHORT_NAMES[cat.id] ?? cat.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </NavLink>

                  {isOpen && (
                    <div className="absolute top-full left-0 min-w-[16rem] bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50">
                      <NavLink
                        page="shop"
                        options={{ categoryId: cat.id }}
                        onBeforeNavigate={() => setHoveredCategory(null)}
                        className="block px-3 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-colors"
                      >
                        All {cat.name} →
                      </NavLink>
                      <div className="mt-1 space-y-0.5">
                        {cat.subcategories.map((sub) => (
                          <NavLink
                            key={sub}
                            page="shop"
                            options={{ categoryId: cat.id, subcategory: sub }}
                            onBeforeNavigate={() => setHoveredCategory(null)}
                            className="block px-3 py-2 text-xs rounded-lg text-slate-700 hover:text-sky-700 hover:bg-sky-50 transition-colors"
                          >
                            {sub}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 min-[360px]:gap-3">
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
            <div className="hidden 2xl:flex items-center gap-1.5 bg-amber-50 border border-amber-300 text-amber-800 text-xs px-3 py-1.5 rounded-xl font-semibold">
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
              className="xl:hidden p-2 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
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
            {CATEGORIES.map((cat) => {
              const isOpen = mobileExpandedCategory === cat.id;
              return (
                <div key={cat.id} className="rounded-xl">
                  <div className="flex items-center">
                    <NavLink
                      page="shop"
                      options={{ categoryId: cat.id }}
                      onBeforeNavigate={() => setMobileMenuOpen(false)}
                      className={`flex-1 text-left px-3.5 py-2.5 rounded-xl ${
                        currentPage === 'shop' && selectedCategory === cat.id ? 'text-sky-700 bg-sky-50 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {cat.name}
                    </NavLink>
                    <button
                      onClick={() => setMobileExpandedCategory(isOpen ? null : cat.id)}
                      aria-label={`Toggle ${cat.name} subcategories`}
                      aria-expanded={isOpen}
                      className="p-3 text-slate-500"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                  {isOpen && (
                    <div className="pl-5 pb-2 space-y-0.5">
                      {cat.subcategories.map((sub) => (
                        <NavLink
                          key={sub}
                          page="shop"
                          options={{ categoryId: cat.id, subcategory: sub }}
                          onBeforeNavigate={() => setMobileMenuOpen(false)}
                          className="block px-3 py-2 text-sm text-slate-600 rounded-lg hover:bg-sky-50 hover:text-sky-700"
                        >
                          {sub}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
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
