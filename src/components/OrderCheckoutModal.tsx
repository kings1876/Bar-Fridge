import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { REPLY, SITE } from '../../shared/reply.config.js';
import { WalletQr, CopyAddress } from './WalletQr';
import { findMethod, makeOrderNumber, waOrderLink, whatsappEnabled } from '../../shared/order.js';
import {
  X,
  Bitcoin,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Send,
  Sparkles,
  MessageCircle
} from 'lucide-react';

export const OrderCheckoutModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    cart,
    cartSubtotal,
    clearCart,
    formatPrice,
    addToast
  } = useShop();

  const [methodId, setMethodId] = useState<string>(REPLY.paymentMethods[0].id);
  const [promoCode, setPromoCode] = useState('');
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  // The cart is cleared once the order is placed, so the amount to pay is remembered for the confirmation screen.
  const [paidTotal, setPaidTotal] = useState(0);
  const [orderId, setOrderId] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
    country: 'Australia',
    deliveryInstructions: '',
    website: '' // honeypot — real users never see or fill this
  });

  if (!isOrderModalOpen) return null;

  const method = findMethod(methodId);
  const discountPercent = method.discountPct;
  const cryptoDiscountAmount = (cartSubtotal * discountPercent) / 100;
  const totalAfterDiscount = Math.max(0, cartSubtotal - cryptoDiscountAmount - extraDiscount);
  const whatsappOn = whatsappEnabled();

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AUSSIE10' || promoCode.trim().toUpperCase() === 'SAVE15') {
      setExtraDiscount(25);
      addToast({
        type: 'success',
        title: 'Discount Code Applied',
        message: 'Additional $25 checkout bonus applied!'
      });
    } else {
      addToast({
        type: 'info',
        title: 'Promotion Notice',
        message: 'The 10% Crypto Discount is already active for maximum savings.'
      });
    }
  };

  const requiredFilled = () =>
    formData.fullName && formData.email && formData.phone && formData.streetAddress && formData.suburb && formData.postcode;

  const buildPayload = (ref: string, channel: 'email' | 'whatsapp') => ({
    formName: 'order',
    channel,
    orderNumber: ref,
    customerName: formData.fullName,
    customerEmail: formData.email,
    customerPhone: formData.phone,
    address: `${formData.streetAddress}, ${formData.suburb} ${formData.state} ${formData.postcode}, ${formData.country}`,
    notes: formData.deliveryInstructions,
    paymentMethod: methodId,
    amountDue: Math.round(totalAfterDiscount * 100) / 100,
    items: cart.map((i) => ({ name: i.product.name, quantity: i.quantity, lineTotal: i.product.price * i.quantity })),
    website: formData.website
  });

  const postOrder = async (payload: ReturnType<typeof buildPayload>) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) return false;
    try { return (await res.json()).ok === true; } catch { return false; }
  };

  const submit = async (channel: 'email' | 'whatsapp') => {
    if (!requiredFilled()) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please complete all required delivery address fields.'
      });
      return;
    }
    setSubmitError('');
    const ref = makeOrderNumber();
    const payload = buildPayload(ref, channel);

    // window.open must run synchronously in the click handler or pop-up blockers stop it.
    if (channel === 'whatsapp') {
      window.open(
        waOrderLink({ ...payload, items: payload.items }),
        '_blank',
        'noopener'
      );
    }

    setIsSubmitting(true);
    let ok = false;
    try { ok = await postOrder(payload); } catch { ok = false; }
    setIsSubmitting(false);

    if (!ok) {
      setSubmitError(
        `We couldn't submit your order just now. Please try again, or email ${SITE.email} with your order details.`
      );
      return;
    }
    setOrderId(ref);
    setPaidTotal(totalAfterDiscount);
    setOrderComplete(true);
    clearCart();
    addToast({
      type: 'success',
      title: 'Order Received',
      message: (method as { wallet?: string }).wallet ? `Order #${ref} received. Your payment address and QR code are on screen and in your email.` : `Order #${ref} received. Watch your email for payment details.`
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    submit('email');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Bitcoin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Direct Order Form</h3>
              <p className="text-xs text-amber-300 font-medium">Automatic 10% Discount for Crypto Payments</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOrderModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderComplete ? (
          /* Order Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">Order Received & Reserved</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Thank You, {formData.fullName}!</h2>
              <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
                Your order reference is <span className="font-mono font-bold text-sky-700">{orderId}</span>. A confirmation has been emailed to <span className="text-slate-900 font-semibold">{formData.email}</span>.
              </p>
            </div>

            {/* What happens next — payment details are sent by us after order review */}
            <div className="max-w-xl mx-auto bg-sky-50 border border-sky-200 rounded-2xl p-6 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-sky-200 pb-3">
                <span className="text-xs font-bold uppercase text-sky-900">Total due ({method.label})</span>
                <span className="text-lg font-mono font-black text-slate-900">{formatPrice(paidTotal)}</span>
              </div>
              {(method as { wallet?: string }).wallet ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-700">
                    <strong className="text-slate-900">Pay now:</strong> send the equivalent of <strong className="text-slate-900">{formatPrice(paidTotal)}</strong> in {method.label} to the address below, using the network shown. These details are also in your confirmation email.
                  </p>
                  <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                    <WalletQr value={(method as { wallet: string }).wallet} />
                    <div className="w-full space-y-2">
                      <CopyAddress label="Wallet address" value={(method as { wallet: string }).wallet} />
                      <div className="rounded-xl border border-slate-200 bg-white p-3 text-left text-xs">
                        <span className="font-bold uppercase text-[11px] text-slate-500">Network</span>
                        <div className="mt-0.5 font-semibold text-slate-900">{(method as { network?: string }).network ?? method.label}</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-white p-3 text-left text-xs">
                        <span className="font-bold uppercase text-[11px] text-slate-500">Reference</span>
                        <div className="mt-0.5 font-mono font-semibold text-slate-900">{orderId}</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-700">Cryptocurrency payments cannot be reversed, so check the address and network carefully. After you pay, <a className="font-bold text-sky-700 underline" href={`/order/confirm-payment?id=${encodeURIComponent(orderId)}`}>upload a screenshot of your payment</a> so we can confirm it quickly.</p>
                </div>
              ) : (
              <div className="text-xs text-slate-700 space-y-1.5">
                <p>• <strong className="text-slate-900">Watch your email</strong> — we will send your payment details to <strong className="text-slate-900">{formData.email}</strong> shortly.</p>
                <p>• Please don't send any payment until you've received those details from us.</p>
              </div>
              )}
              <p className="text-xs text-slate-700 pt-1 border-t border-sky-200">• Delivery destination: <strong className="text-slate-900">{formData.streetAddress}, {formData.suburb}, {formData.state} {formData.postcode}</strong></p>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  setIsOrderModalOpen(false);
                  setOrderComplete(false);
                }}
                className="px-7 py-3 bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 font-bold text-white rounded-xl shadow-md transition-all"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form View */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-800">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              className="hidden"
            />
            {/* Left Column: Delivery & Customer Info */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2 mb-3">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>Australian Delivery Address & Contact</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Michael Campbell"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Contact Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="michael@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Mobile Phone (for Courier ETA SMS) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0412 345 678"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-medium mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      placeholder="148 Pitt Street"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-medium mb-1">Suburb / City *</label>
                    <input
                      type="text"
                      required
                      value={formData.suburb}
                      onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
                      placeholder="Sydney"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                      >
                        <option value="NSW">NSW</option>
                        <option value="VIC">VIC</option>
                        <option value="QLD">QLD</option>
                        <option value="WA">WA</option>
                        <option value="SA">SA</option>
                        <option value="TAS">TAS</option>
                        <option value="ACT">ACT</option>
                        <option value="NT">NT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-medium mb-1">Postcode *</label>
                      <input
                        type="text"
                        required
                        value={formData.postcode}
                        onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                        placeholder="2000"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-medium mb-1">Delivery Notes (e.g. Under patio, side gate code, lift access)</label>
                    <textarea
                      rows={2}
                      value={formData.deliveryInstructions}
                      onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                      placeholder="Please place under covered alfresco area..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Bitcoin className="w-4 h-4 text-amber-600" />
                    <span>Select Payment Method</span>
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{discountPercent > 0 ? `${discountPercent}% Off Included` : 'Pay with crypto to save 10%'}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {REPLY.paymentMethods.map((m: { id: string; label: string; short?: string; sub?: string }) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethodId(m.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        methodId === m.id
                          ? 'border-amber-400 bg-amber-50 text-amber-950 font-black shadow-sm ring-2 ring-amber-400/20'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{m.short ?? m.label.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-500">{m.sub ?? (m.label.includes('(') ? m.label.slice(m.label.indexOf('(')) : '')}</div>
                    </button>
                  ))}
                </div>

                <p className="mt-3 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-xl p-3">
                  <strong className="text-slate-900">How payment works:</strong> for cryptocurrency, the wallet address, network and a QR code appear on screen as soon as you place your order, and we email them to you too. For bank transfer, PayID and Osko we email you the payment details after we review your order, so please wait for them before you pay.
                </p>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-900 text-sm pb-3 border-b border-slate-200 mb-3 flex items-center justify-between">
                  <span>Order Summary</span>
                  <span className="text-xs text-slate-500 font-medium">{cart.length} item(s)</span>
                </h4>

                {/* Items List */}
                <div className="max-h-56 overflow-y-auto space-y-3 pr-1 text-xs">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-3">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-900 font-bold truncate">{item.product.name}</div>
                        <div className="text-slate-500 text-[11px]">Qty: {item.quantity} × {formatPrice(item.product.price)}</div>
                      </div>
                      <div className="font-bold text-slate-950 text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Form */}
                <div className="mt-4 pt-3 border-t border-slate-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Discount Code"
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 uppercase focus:outline-none focus:border-sky-500 flex-1 font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs rounded-xl transition-colors font-bold"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Calculations */}
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Products Subtotal:</span>
                    <span className="text-slate-900 font-semibold">{formatPrice(cartSubtotal)}</span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>Nationwide Freight:</span>
                      <span className="text-[10px] text-emerald-700 font-bold">(Promotion)</span>
                    </span>
                    <span className="text-emerald-700 font-bold">FREE</span>
                  </div>

                  {discountPercent > 0 && (
                  <div className="flex justify-between text-amber-800 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Crypto Payment Discount (-{discountPercent}%):</span>
                    </span>
                    <span>-{formatPrice(cryptoDiscountAmount)}</span>
                  </div>
                  )}

                  {extraDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Promo Bonus:</span>
                      <span>-{formatPrice(extraDiscount)}</span>
                    </div>
                  )}

                  <div className="pt-2.5 border-t border-slate-200 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-slate-900">Total AUD Payable:</span>
                    <div className="text-right">
                      <span className="text-2xl font-black text-sky-700">{formatPrice(totalAfterDiscount)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full py-3.5 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 hover:from-sky-500 hover:to-blue-700 disabled:opacity-50 text-white font-black text-sm rounded-xl shadow-lg shadow-sky-600/20 flex items-center justify-center gap-2 transition-all"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting your order...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{discountPercent > 0 ? `Place Order & Lock ${discountPercent}% Discount` : 'Place Order'}</span>
                    </>
                  )}
                </button>

                {whatsappOn && (
                  <button
                    type="button"
                    disabled={isSubmitting || cart.length === 0}
                    onClick={() => submit('whatsapp')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-black text-sm rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </button>
                )}

                {submitError && (
                  <p role="alert" className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-2.5">{submitError}</p>
                )}

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>2-Year Replacement Warranty • Free Nationwide Freight</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
