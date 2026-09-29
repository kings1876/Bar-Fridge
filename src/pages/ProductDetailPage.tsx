import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { REVIEWS_DATA } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  Bitcoin, 
  Snowflake, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronRight
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProduct, 
    navigateTo, 
    addToCart, 
    formatPrice, 
    openOrderModalWithProduct 
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const product = selectedProduct || PRODUCTS[0];
  const images = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  const cryptoPrice = product.price * 0.9;
  const cryptoSavings = product.price * 0.1;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const productReviews = REVIEWS_DATA.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <button onClick={() => navigateTo('home')} className="hover:text-slate-900">Home</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button onClick={() => navigateTo('shop')} className="hover:text-slate-900">Shop</button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <button 
          onClick={() => navigateTo('shop', { categoryId: product.category })} 
          className="hover:text-slate-900 truncate max-w-[150px]"
        >
          {product.categoryName}
        </button>
        <ChevronRight className="w-3 h-3 text-slate-400" />
        <span className="text-sky-700 font-bold truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={images[activeImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-xl shadow-md">
                {product.badge}
              </div>
            )}
            {product.tropicalRated && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur border border-sky-300 text-sky-800 text-xs font-bold px-3 py-1 rounded-xl flex items-center gap-1.5 shadow-md">
                <Snowflake className="w-3.5 h-3.5 text-sky-600" />
                <span>Tropical 43°C Rated</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx ? 'border-sky-600 scale-105 shadow-sm' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantees Box */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 grid grid-cols-2 gap-4 text-xs shadow-sm">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-sky-50 text-sky-600 rounded-xl shrink-0 mt-0.5 border border-sky-100">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">Free Tailgate Freight</strong>
                <span className="text-slate-500">Nationwide courier delivery across Australia.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl shrink-0 mt-0.5 border border-emerald-100">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <strong className="text-slate-900 block font-bold">2–3 Year Warranty</strong>
                <span className="text-slate-500">Authorized Australian technician support.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Buy Box */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-700 font-bold uppercase tracking-wider mb-2">
              <span>{product.categoryName}</span>
              <span>•</span>
              <span>{product.subcategory}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-3 mt-3 text-xs">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900 text-sm">{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount} customer reviews)</span>
              <span className="text-slate-300">|</span>
              <span className="text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock & Ready for Dispatch</span>
              </span>
            </div>
          </div>

          {/* Pricing & Crypto Rebate Banner */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-3.5 shadow-sm">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-950">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                Free Nationwide Delivery
              </span>
            </div>

            {/* Crypto 10% Discount Callout */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-xs">
                <Bitcoin className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-amber-900 block">Crypto Order Form Price:</span>
                  <span className="text-slate-600 text-[11px]">Pay with BTC, USDT, ETH or SOL & save 10%</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-black text-amber-800">{formatPrice(cryptoPrice)}</span>
                <span className="text-[10px] text-amber-700 block font-bold">Save {formatPrice(cryptoSavings)}</span>
              </div>
            </div>
          </div>

          {/* Quick Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {product.description}
          </p>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Capacity</div>
              <div className="text-slate-900 font-black text-sm mt-0.5">{product.capacityLitres}L</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Sound Rating</div>
              <div className="text-slate-900 font-black text-sm mt-0.5">{product.noiseLevelDb}dB</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Temp Range</div>
              <div className="text-sky-700 font-bold text-xs mt-0.5 truncate">{product.temperatureRange.split('(')[0]}</div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200">
              <div className="text-slate-500 text-[10px] font-medium">Climate Rating</div>
              <div className="text-emerald-700 font-bold text-xs mt-0.5 truncate">
                {product.tropicalRated ? '43°C Class-T' : 'Standard'}
              </div>
            </div>
          </div>

          {/* Purchase Action Box */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 hover:bg-slate-100 text-slate-800 font-bold text-sm"
                >
                  -
                </button>
                <span className="px-4 text-sm font-black text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 hover:bg-slate-100 text-slate-800 font-bold text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl border border-slate-300 transition-colors flex items-center justify-center gap-2 text-sm shadow-2xs"
              >
                <ShoppingBag className="w-4 h-4 text-sky-600" />
                <span>Add to Cart ({quantity})</span>
              </button>
            </div>

            {/* Direct Order Form Button (Crypto 10% Off) */}
            <button
              onClick={() => openOrderModalWithProduct?.(product)}
              className="w-full py-4 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 hover:from-sky-500 hover:to-blue-700 text-white font-black rounded-xl shadow-xl shadow-sky-600/20 flex items-center justify-center gap-2 text-sm transition-all hover:scale-[1.01]"
            >
              <Bitcoin className="w-4 h-4 text-white" />
              <span>Instant Order Form (10% Crypto Discount)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Features Checklist */}
          <div className="pt-4 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Key Engineering Features</h4>
            <div className="space-y-2">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Technical Specifications Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Full Technical Specifications</h3>
            <p className="text-xs text-slate-500">Dimensions and electrical schematics for builders, cabinetry makers, and architects.</p>
          </div>
          <span className="text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-mono font-bold">
            {product.dimensions.width}W × {product.dimensions.depth}D × {product.dimensions.height}H (mm)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key} className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500 font-medium">{key}:</span>
              <span className="text-slate-900 font-semibold text-right max-w-[60%]">{value}</span>
            </div>
          ))}
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Finish & Construction:</span>
            <span className="text-slate-900 font-semibold text-right max-w-[60%]">{product.finish}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-slate-100">
            <span className="text-slate-500 font-medium">Noise Level Rating:</span>
            <span className="text-slate-900 font-semibold text-right">{product.noiseLevelDb} Decibels (Whisper Quiet)</span>
          </div>
        </div>
      </div>

      {/* Verified Reviews for this product */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">Customer Reviews & Ratings</h3>
            <p className="text-xs text-slate-500">Trustpilot verified purchases for {product.name}</p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>4.9 / 5.0 Average</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productReviews.map((rev) => (
            <div key={rev.id} className="bg-white border border-slate-200 rounded-3xl p-5 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-slate-400">{rev.date}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{rev.title}</h4>
              <p className="text-xs text-slate-600 italic leading-relaxed">"{rev.comment}"</p>
              <div className="text-[11px] text-slate-500 font-semibold">
                {rev.author} — {rev.city}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6 border-t border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Similar Coolers in {product.categoryName}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
