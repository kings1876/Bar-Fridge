import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Product, CartItem, PageView } from '../types';
import { CATEGORIES } from '../data/categories';
import { slugify } from '../seo/slug';
// Only tiny id->slug maps live in the app shell; the full catalogue and article text load with the pages that use them.
import { PRODUCT_SLUG_BY_ID, BLOG_SLUG_BY_ID, PRODUCT_SLUGS, BLOG_SLUGS } from '../data/slugIndex';

export interface NavOptions {
  productId?: string;
  blogId?: string;
  categoryId?: string;
  subcategory?: string;
}

interface ParsedLocation {
  page: PageView;
  productSlug: string | null;
  blogSlug: string | null;
  category?: string;
  subcategory?: string;
}

const resolveProductSlug = (idOrSlug?: string) =>
  idOrSlug ? PRODUCT_SLUG_BY_ID[idOrSlug] ?? (PRODUCT_SLUGS.has(idOrSlug) ? idOrSlug : undefined) : undefined;
const resolveBlogSlug = (idOrSlug?: string) =>
  idOrSlug ? BLOG_SLUG_BY_ID[idOrSlug] ?? (BLOG_SLUGS.has(idOrSlug) ? idOrSlug : undefined) : undefined;

function buildPath(
  page: PageView,
  options?: { categoryId?: string; subcategory?: string; productSlug?: string; blogSlug?: string }
): string {
  switch (page) {
    case 'home':
      return '/';
    case 'shop': {
      // Clean, keyword-bearing category URLs: /category/{id}[/{subcategory-slug}]
      if (options?.categoryId && options.categoryId !== 'all') {
        const sub = options.subcategory && options.subcategory !== 'all' ? `/${slugify(options.subcategory)}` : '';
        return `/category/${options.categoryId}${sub}`;
      }
      return '/shop';
    }
    case 'product-detail':
      return options?.productSlug ? `/${options.productSlug}` : '/shop';
    case 'blog':
      return '/blog';
    case 'blog-post':
      return options?.blogSlug ? `/${options.blogSlug}` : '/blog';
    default:
      return `/${page}`;
  }
}

function parseLocation(pathname: string, search: string): ParsedLocation {
  const params = new URLSearchParams(search);
  const [first, second, third] = pathname.split('/').filter(Boolean);

  switch (first) {
    case undefined:
      return { page: 'home', productSlug: null, blogSlug: null };
    case 'shop':
      return {
        page: 'shop',
        productSlug: null,
        blogSlug: null,
        category: params.get('category') || 'all',
        subcategory: params.get('subcategory') || 'all'
      };
    case 'category': {
      const cat = CATEGORIES.find((c) => c.id === second);
      if (!cat) return { page: 'shop', productSlug: null, blogSlug: null, category: 'all', subcategory: 'all' };
      const sub = third ? cat.subcategories.find((x) => slugify(x) === third) : undefined;
      return { page: 'shop', productSlug: null, blogSlug: null, category: cat.id, subcategory: sub ?? 'all' };
    }
    case 'product': {
      const productSlug = second && PRODUCT_SLUGS.has(second) ? second : null;
      return { page: productSlug ? 'product-detail' : 'shop', productSlug, blogSlug: null };
    }
    case 'blog': {
      if (!second) return { page: 'blog', productSlug: null, blogSlug: null };
      const blogSlug = BLOG_SLUGS.has(second) ? second : null;
      return { page: blogSlug ? 'blog-post' : 'blog', productSlug: null, blogSlug };
    }
    case 'about':
    case 'contact':
    case 'faq':
    case 'shipping':
    case 'refund':
    case 'privacy':
    case 'terms':
      return { page: first as PageView, productSlug: null, blogSlug: null };
    default: {
      // Post-name permalinks: /{slug} resolves to a product or a blog post.
      if (PRODUCT_SLUGS.has(first)) return { page: 'product-detail', productSlug: first, blogSlug: null };
      if (BLOG_SLUGS.has(first)) return { page: 'blog-post', productSlug: null, blogSlug: first };
      return { page: 'home', productSlug: null, blogSlug: null };
    }
  }
}

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface ShopContextType {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  navigateTo: (page: PageView, options?: NavOptions) => void;
  getPath: (page: PageView, options?: NavOptions) => string;
  selectedProductSlug: string | null;
  setSelectedProductSlug: (slug: string | null) => void;
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  
  // Filtering & Search
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  badgeFilter: string;
  setBadgeFilter: (badge: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Crypto Order Form
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  openOrderModalWithProduct?: (product: Product) => void;
  cryptoDiscountPercent: number; // 10%
  selectedCrypto: 'USDT' | 'BTC' | 'ETH';
  setSelectedCrypto: (crypto: 'USDT' | 'BTC' | 'ETH') => void;

  // Currency & Formatting
  currency: string;
  formatPrice: (amount: number) => string;

  // Toast
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialRef = useRef<ParsedLocation | null>(null);
  if (!initialRef.current) {
    initialRef.current = parseLocation(window.location.pathname, window.location.search);
  }
  const initial = initialRef.current;

  const [currentPage, setCurrentPage] = useState<PageView>(initial.page);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(initial.productSlug);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(initial.blogSlug);

  // Shop Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(initial.category ?? 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initial.subcategory ?? 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Cart State with localStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bar_fridges_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState<'USDT' | 'BTC' | 'ETH'>('USDT');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const cryptoDiscountPercent = 10;
  const currency = 'AUD';

  useEffect(() => {
    try {
      localStorage.setItem('bar_fridges_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [cart]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getPath = (page: PageView, options?: NavOptions): string => {
    return buildPath(page, {
      categoryId: options?.categoryId,
      subcategory: options?.subcategory,
      productSlug: resolveProductSlug(options?.productId),
      blogSlug: resolveBlogSlug(options?.blogId)
    });
  };

  const navigateTo = (
    page: PageView,
    options?: NavOptions
  ) => {
    const productSlug = resolveProductSlug(options?.productId);
    const blogSlug = resolveBlogSlug(options?.blogId);
    if (productSlug) setSelectedProductSlug(productSlug);
    if (blogSlug) setSelectedBlogSlug(blogSlug);
    if (options?.categoryId) {
      setSelectedCategory(options.categoryId);
      setSelectedSubcategory(options.subcategory || 'all');
    }
    setCurrentPage(page);

    const path = buildPath(page, {
      categoryId: options?.categoryId,
      subcategory: options?.subcategory,
      productSlug,
      blogSlug
    });
    if (window.location.pathname + window.location.search !== path) {
      window.history.pushState({}, '', path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Old /product/{slug} and /blog/{slug} links still resolve; rewrite them to /{slug}.
  useEffect(() => {
    const slug = initial.productSlug ?? initial.blogSlug;
    if (slug && window.location.pathname !== `/${slug}`) {
      window.history.replaceState({}, '', `/${slug}`);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation(window.location.pathname, window.location.search);
      setCurrentPage(parsed.page);
      setSelectedProductSlug(parsed.productSlug);
      setSelectedBlogSlug(parsed.blogSlug);
      if (parsed.category !== undefined) setSelectedCategory(parsed.category);
      if (parsed.subcategory !== undefined) setSelectedSubcategory(parsed.subcategory);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} (${quantity}) added to order.`
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Removed from Cart',
      message: 'Item was removed from your cart.'
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openOrderModalWithProduct = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (!existing) {
      setCart([{ product, quantity: 1 }]);
    }
    setIsOrderModalOpen(true);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        getPath,
        selectedProductSlug,
        setSelectedProductSlug,
        selectedBlogSlug,
        setSelectedBlogSlug,
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
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        openOrderModalWithProduct,
        cryptoDiscountPercent,
        selectedCrypto,
        setSelectedCrypto,
        currency,
        formatPrice,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
