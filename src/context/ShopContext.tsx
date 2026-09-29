import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { Product, CartItem, PageView, BlogPost } from '../types';
import { PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';

interface ParsedLocation {
  page: PageView;
  product: Product | null;
  blogPost: BlogPost | null;
  category?: string;
  subcategory?: string;
}

function buildPath(
  page: PageView,
  options?: { categoryId?: string; subcategory?: string; productSlug?: string; blogSlug?: string }
): string {
  switch (page) {
    case 'home':
      return '/';
    case 'shop': {
      const params = new URLSearchParams();
      if (options?.categoryId && options.categoryId !== 'all') params.set('category', options.categoryId);
      if (options?.subcategory && options.subcategory !== 'all') params.set('subcategory', options.subcategory);
      const qs = params.toString();
      return qs ? `/shop?${qs}` : '/shop';
    }
    case 'product-detail':
      return options?.productSlug ? `/product/${options.productSlug}` : '/shop';
    case 'blog':
      return '/blog';
    case 'blog-post':
      return options?.blogSlug ? `/blog/${options.blogSlug}` : '/blog';
    default:
      return `/${page}`;
  }
}

function parseLocation(pathname: string, search: string): ParsedLocation {
  const params = new URLSearchParams(search);
  const [first, second] = pathname.split('/').filter(Boolean);

  switch (first) {
    case undefined:
      return { page: 'home', product: null, blogPost: null };
    case 'shop':
      return {
        page: 'shop',
        product: null,
        blogPost: null,
        category: params.get('category') || 'all',
        subcategory: params.get('subcategory') || 'all'
      };
    case 'product': {
      const product = second ? PRODUCTS.find((p) => p.slug === second) || null : null;
      return { page: product ? 'product-detail' : 'shop', product, blogPost: null };
    }
    case 'blog': {
      if (!second) return { page: 'blog', product: null, blogPost: null };
      const blogPost = BLOG_POSTS.find((b) => b.slug === second) || null;
      return { page: blogPost ? 'blog-post' : 'blog', product: null, blogPost };
    }
    case 'about':
    case 'contact':
    case 'faq':
    case 'shipping':
    case 'refund':
    case 'privacy':
    case 'terms':
      return { page: first as PageView, product: null, blogPost: null };
    default:
      return { page: 'home', product: null, blogPost: null };
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
  navigateTo: (page: PageView, options?: { productId?: string; blogId?: string; categoryId?: string; subcategory?: string }) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBlogPost: BlogPost | null;
  setSelectedBlogPost: (post: BlogPost | null) => void;
  
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
  selectedCrypto: 'USDT' | 'BTC' | 'ETH' | 'SOL';
  setSelectedCrypto: (crypto: 'USDT' | 'BTC' | 'ETH' | 'SOL') => void;

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(initial.product);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(initial.blogPost);

  // Shop Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(initial.category ?? 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initial.subcategory ?? 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [badgeFilter, setBadgeFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 4000]);
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
  const [selectedCrypto, setSelectedCrypto] = useState<'USDT' | 'BTC' | 'ETH' | 'SOL'>('USDT');
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

  const navigateTo = (
    page: PageView,
    options?: { productId?: string; blogId?: string; categoryId?: string; subcategory?: string }
  ) => {
    let product: Product | undefined;
    let blogPost: BlogPost | undefined;

    if (options?.productId) {
      product = PRODUCTS.find((p) => p.id === options.productId || p.slug === options.productId);
      if (product) setSelectedProduct(product);
    }
    if (options?.blogId) {
      blogPost = BLOG_POSTS.find((b) => b.id === options.blogId || b.slug === options.blogId);
      if (blogPost) setSelectedBlogPost(blogPost);
    }
    if (options?.categoryId) {
      setSelectedCategory(options.categoryId);
      setSelectedSubcategory(options.subcategory || 'all');
    }
    setCurrentPage(page);

    const path = buildPath(page, {
      categoryId: options?.categoryId,
      subcategory: options?.subcategory,
      productSlug: product?.slug,
      blogSlug: blogPost?.slug
    });
    if (window.location.pathname + window.location.search !== path) {
      window.history.pushState({}, '', path);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation(window.location.pathname, window.location.search);
      setCurrentPage(parsed.page);
      setSelectedProduct(parsed.product);
      setSelectedBlogPost(parsed.blogPost);
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
        selectedProduct,
        setSelectedProduct,
        selectedBlogPost,
        setSelectedBlogPost,
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
