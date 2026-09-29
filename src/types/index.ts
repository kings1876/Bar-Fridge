export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: 'single-door' | 'double-triple-door' | 'alfresco-outdoor' | 'wine-dual-zone' | 'bar-freezers';
  categoryName: string;
  subcategory: string;
  badge?: 'Popular' | 'Best Value' | 'Premium' | 'Sale' | 'New';
  rating: number;
  reviewsCount: number;
  capacityLitres: number;
  temperatureRange: string;
  dimensions: {
    width: number; // mm
    depth: number; // mm
    height: number; // mm
  };
  tropicalRated: boolean; // 38C - 43C ambient tested
  ambientRating: string;
  noiseLevelDb: number;
  energyStars: number;
  finish: string;
  inStock: boolean;
  image: string;
  galleryImages: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  seoKeywords: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  productName: string;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface FAQItem {
  id: string;
  category: 'Ordering & Payment' | 'Shipping & Delivery' | 'Product & Technical' | 'Warranty & Returns';
  question: string;
  answer: string;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'blog'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'faq'
  | 'shipping'
  | 'refund'
  | 'privacy'
  | 'terms';
