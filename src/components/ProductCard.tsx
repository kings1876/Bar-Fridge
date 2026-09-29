import React from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { 
  Star, 
  Snowflake, 
  ShoppingBag, 
  ArrowRight, 
  Bitcoin
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, formatPrice, openOrderModalWithProduct } = useShop();

  const badgeColor = {
    'Popular': 'bg-amber-100 text-amber-900 border-amber-300',
    'Best Value': 'bg-emerald-100 text-emerald-900 border-emerald-300',
    'Premium': 'bg-purple-100 text-purple-900 border-purple-300',
    'Sale': 'bg-rose-100 text-rose-900 border-rose-300',
    'New': 'bg-sky-100 text-sky-900 border-sky-300'
  }[product.badge || 'Popular'];

  const cryptoPrice = product.price * 0.9; // 10% discount

  return (
    <div className="group bg-white border border-slate-200/90 hover:border-sky-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between">
      {/* Top Image & Badge Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category & Badge Row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.badge && (
            <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border shadow-sm backdrop-blur-md ${badgeColor}`}>
              {product.badge}
            </span>
          )}
          {product.tropicalRated && (
            <span className="text-[10px] font-bold bg-white/95 text-sky-700 border border-sky-200 px-2.5 py-1 rounded-lg shadow-sm backdrop-blur-sm flex items-center gap-1">
              <Snowflake className="w-3.5 h-3.5 text-sky-600" />
              <span>Tropical 43°C</span>
            </span>
          )}
        </div>

        {/* Overlay hover action */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => navigateTo('product-detail', { productId: product.id })}
            className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Full Specs & Dimensions
          </button>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-sky-700 font-bold uppercase tracking-wider text-[11px] truncate max-w-[60%]">
              {product.subcategory}
            </span>
            <div className="flex items-center gap-1 text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{product.rating}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => navigateTo('product-detail', { productId: product.id })}
            className="font-bold text-base text-slate-900 hover:text-sky-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-2.5 text-[11px] text-slate-600">
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
              {product.capacityLitres}L Capacity
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium">
              {product.noiseLevelDb}dB Quiet
            </span>
            <span className="bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80 font-medium truncate max-w-[130px]">
              {product.dimensions.width}×{product.dimensions.height}mm
            </span>
          </div>
        </div>

        {/* Pricing & Crypto Discount Tag */}
        <div className="pt-3.5 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-slate-950">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-amber-700 flex items-center gap-1 mt-0.5 font-bold">
                <Bitcoin className="w-3.5 h-3.5 text-amber-600" />
                <span>Crypto Price: {formatPrice(cryptoPrice)} (10% off)</span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider block bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Free Freight
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5 block">
                In Stock
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => addToCart(product, 1)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-sky-600" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={() => openOrderModalWithProduct?.(product)}
              className="py-2.5 px-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs font-extrabold rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-1 hover:scale-[1.02]"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
