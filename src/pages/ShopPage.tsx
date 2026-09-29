import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  Filter, 
  Search, 
  X, 
  RotateCcw, 
  Snowflake, 
  SlidersHorizontal, 
  Bitcoin
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    badgeFilter,
    setBadgeFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    formatPrice
  } = useShop();

  const [onlyTropical, setOnlyTropical] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active Category details
  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory);

  // Filtering products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory !== 'all' && product.subcategory !== selectedSubcategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesSub = product.subcategory.toLowerCase().includes(query);
        const matchesKw = product.seoKeywords.some(kw => kw.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesSub && !matchesKw) {
          return false;
        }
      }
      // Badge filter
      if (badgeFilter !== 'all' && product.badge !== badgeFilter) {
        return false;
      }
      // Price range
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      // Tropical only
      if (onlyTropical && !product.tropicalRated) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default order
    });
  }, [selectedCategory, selectedSubcategory, searchQuery, badgeFilter, priceRange, onlyTropical, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setSearchQuery('');
    setBadgeFilter('all');
    setPriceRange([0, 2000]);
    setOnlyTropical(false);
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'all' || selectedSubcategory !== 'all' || searchQuery || badgeFilter !== 'all' || onlyTropical || priceRange[1] < 2000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Shop Header Banner */}
      <div className="bg-gradient-to-r from-sky-50 via-white to-sky-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 uppercase tracking-widest">
              <span>Category → Subcategory → Product Hierarchy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              {activeCategoryObj ? activeCategoryObj.name : 'All Bar Fridges & Freezers For Sale'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
              {activeCategoryObj 
                ? activeCategoryObj.description 
                : 'Browse our full catalog of Australian commercial beverage chillers, outdoor alfresco fridges, and heavy-duty bar freezers with 100% Free Nationwide Freight.'}
            </p>
          </div>

          <div className="bg-amber-50/80 border border-amber-300 p-4 rounded-2xl shrink-0 text-left md:text-right space-y-1 shadow-2xs">
            <div className="text-xs text-amber-900 font-bold flex items-center md:justify-end gap-1">
              <Bitcoin className="w-4 h-4 text-amber-600" />
              <span>10% Crypto Discount</span>
            </div>
            <div className="text-[11px] text-slate-600 font-medium">
              Direct checkout with BTC, USDT, ETH, SOL
            </div>
          </div>
        </div>

        {/* Subcategories Horizontal Filter Bar (When Category is selected) */}
        {activeCategoryObj && (
          <div className="mt-6 pt-5 border-t border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-2.5">
              Filter by Subcategory:
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubcategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedSubcategory === 'all'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                All Subcategories ({activeCategoryObj.name})
              </button>
              {activeCategoryObj.subcategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubcategory(sub)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSubcategory === sub
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: Sidebar Filters & Product Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-xs font-bold text-slate-900">
            Showing {filteredProducts.length} Product(s)
          </span>
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 text-white text-xs font-bold rounded-xl shadow-sm"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Desktop Sidebar Filters */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Filter className="w-4 h-4 text-sky-600" />
                <span>Shop Filters</span>
              </h3>
              {isFiltered && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-rose-600 font-semibold hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              )}
            </div>

            {/* Search within shop */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Search Catalog</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. 304, glass, chest, alfresco..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Categories</label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSubcategory('all');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                    selectedCategory === 'all'
                      ? 'bg-sky-50 text-sky-800 border border-sky-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[11px] text-slate-400">12</span>
                </button>

                {CATEGORIES.map((cat) => {
                  const count = PRODUCTS.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedSubcategory('all');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl font-semibold transition-colors flex items-center justify-between ${
                        selectedCategory === cat.id
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate mr-2">{cat.name}</span>
                      <span className="text-[11px] text-slate-400 shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tropical Rated Toggle */}
            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyTropical}
                  onChange={(e) => setOnlyTropical(e.target.checked)}
                  className="rounded bg-slate-100 border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4"
                />
                <div className="text-xs text-slate-700">
                  <span className="font-bold block flex items-center gap-1">
                    <Snowflake className="w-3.5 h-3.5 text-sky-600" />
                    <span>Tropical 43°C Rated Only</span>
                  </span>
                  <span className="text-[10px] text-slate-500">Class T outdoor tested</span>
                </div>
              </label>
            </div>

            {/* Badge Filters */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">Product Badge</label>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {['all', 'Popular', 'Best Value', 'Premium', 'Sale', 'New'].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setBadgeFilter(badge)}
                    className={`px-3 py-1 rounded-lg transition-colors font-semibold ${
                      badgeFilter === badge
                        ? 'bg-sky-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {badge === 'all' ? 'All' : badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider">Max Price</span>
                <span className="font-bold text-sky-700">{formatPrice(priceRange[1])}</span>
              </div>
              <input
                type="range"
                min={300}
                max={2000}
                step={50}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                <span>$300 USD</span>
                <span>$2,000 USD</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Control Bar: Sort and Results Count */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="text-xs text-slate-600 font-medium">
              Showing <strong className="text-slate-900 font-bold">{filteredProducts.length}</strong> bar fridges & freezers
              {selectedCategory !== 'all' && (
                <span className="text-sky-700 font-bold"> in {activeCategoryObj?.name}</span>
              )}
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
              <span className="text-slate-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 text-slate-900 focus:outline-none focus:border-sky-500 text-xs font-semibold"
              >
                <option value="featured">Featured Aussie Coolers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">No fridges or freezers match your criteria</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Try adjusting your price range, clearing search terms, or resetting filters to see our full inventory.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
