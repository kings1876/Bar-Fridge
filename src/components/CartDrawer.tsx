import React from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Bitcoin
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    formatPrice,
    setIsOrderModalOpen,
    navigateTo
  } = useShop();

  if (!isCartDrawerOpen) return null;

  const cryptoSavings = (cartSubtotal * 0.1);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={() => setIsCartDrawerOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 text-slate-800 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Your Beverage Cart</h2>
              <span className="text-xs bg-sky-100 text-sky-800 font-bold px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Alert Banner */}
          <div className="bg-sky-50 border-b border-sky-100 p-3 text-xs text-sky-900 flex items-center gap-2">
            <Truck className="w-4 h-4 text-sky-600 shrink-0" />
            <span><strong>Free Shipping Promo Active:</strong> Tailgate delivery included across Australia!</span>
          </div>

          {/* Crypto Savings Teaser */}
          {cart.length > 0 && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 text-xs text-amber-900 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-bold">
                <Bitcoin className="w-3.5 h-3.5 text-amber-600" />
                <span>Crypto Discount Available:</span>
              </span>
              <span className="font-black text-amber-800">Save {formatPrice(cryptoSavings)} (10%)</span>
            </div>
          )}

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Explore our commercial bar fridges, 304 stainless outdoor alfresco coolers, and deep freezers for sale.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigateTo('shop');
                  }}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  Browse Bar Fridges
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex gap-3 items-center group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {item.product.capacityLitres}L • {item.product.ambientRating.split(' ')[0]}
                    </div>
                    <div className="text-xs font-black text-sky-700 mt-1">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-slate-100 text-slate-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-slate-100 text-slate-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="text-slate-900 font-bold">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Nationwide Freight:</span>
                  <span className="text-emerald-700 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-amber-800 font-bold">
                  <span>With 10% Crypto Checkout:</span>
                  <span>{formatPrice(cartSubtotal - cryptoSavings)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  setIsOrderModalOpen(true);
                }}
                className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-extrabold rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 text-sm transition-all"
              >
                <span>Proceed to Order Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <button
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
