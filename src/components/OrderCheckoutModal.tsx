import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Bitcoin, 
  Check, 
  Copy, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Send, 
  Sparkles
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

  const [selectedCrypto, setSelectedCrypto] = useState<'USDT' | 'BTC' | 'ETH' | 'SOL'>('USDT');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [extraDiscount, setExtraDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

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
    txHash: ''
  });

  if (!isOrderModalOpen) return null;

  // 10% Crypto discount calculation
  const cryptoDiscountPercent = 10;
  const cryptoDiscountAmount = (cartSubtotal * cryptoDiscountPercent) / 100;
  const totalAfterDiscount = Math.max(0, cartSubtotal - cryptoDiscountAmount - extraDiscount);

  // Mock exchange rates for estimation
  const cryptoRates: Record<string, { rate: number; address: string; network: string }> = {
    USDT: { rate: 1, address: 'TQ7aX9vZ3M4rKp8yLmNw2j5Bq9fRtE21pQ', network: 'TRC20 (Tron) or ERC20' },
    BTC: { rate: 68500, address: 'bc1q8w7d5v9x4m3k2l1z0a9s8d7f6g5h4j3k2l1', network: 'Bitcoin Native' },
    ETH: { rate: 3500, address: '0x8B7c90F623d9B7D311F5a30B2c8428F9732b1E83', network: 'Ethereum Mainnet' },
    SOL: { rate: 160, address: 'Fr9KQzK4pXnF81v3mZb6w7yC2tR1xP5kH9qN0sE8aB4', network: 'Solana Network' }
  };

  const currentCrypto = cryptoRates[selectedCrypto];
  const cryptoAmount = selectedCrypto === 'USDT' 
    ? totalAfterDiscount.toFixed(2) 
    : (totalAfterDiscount / currentCrypto.rate).toFixed(6);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(currentCrypto.address);
    setCopiedAddress(true);
    addToast({
      type: 'success',
      title: 'Address Copied',
      message: `${selectedCrypto} merchant wallet address copied to clipboard.`
    });
    setTimeout(() => setCopiedAddress(false), 3000);
  };

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

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.streetAddress || !formData.suburb || !formData.postcode) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please complete all required delivery address fields.'
      });
      return;
    }

    setIsSubmitting(true);
    const newOrderId = 'BFFS-' + Math.floor(100000 + Math.random() * 900000);

    try {
      await new Promise(res => setTimeout(res, 1100));
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
      addToast({
        type: 'success',
        title: 'Order Form Submitted!',
        message: `Order #${newOrderId} received. Check your email for confirmation.`
      });
    } catch {
      setOrderId(newOrderId);
      setOrderComplete(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
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
              <h3 className="font-bold text-lg text-white">Direct Order & Crypto Checkout Form</h3>
              <p className="text-xs text-amber-300 font-medium">Automatic 10% Discount Applied for Crypto Payments</p>
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
                Your order reference is <span className="font-mono font-bold text-sky-700">{orderId}</span>. A full itemized confirmation invoice has been sent to <span className="text-slate-900 font-semibold">{formData.email}</span>.
              </p>
            </div>

            {/* Payment Transfer Instructions Box */}
            <div className="max-w-xl mx-auto bg-amber-50/60 border border-amber-300 rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                <span className="text-xs font-bold uppercase text-amber-900">Total Due via {selectedCrypto}</span>
                <span className="text-lg font-mono font-black text-slate-900">{cryptoAmount} {selectedCrypto}</span>
              </div>

              <div>
                <label className="text-xs text-slate-700 font-medium block mb-1">
                  Send to Official Merchant Deposit Address ({currentCrypto.network}):
                </label>
                <div className="flex items-center gap-2 bg-white border border-amber-300 rounded-xl p-2.5 font-mono text-xs text-amber-950">
                  <span className="truncate">{currentCrypto.address}</span>
                  <button 
                    onClick={handleCopyAddress}
                    className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-950 shrink-0"
                    title="Copy Address"
                  >
                    {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-700 space-y-1">
                <p>• Once transaction is transmitted, dispatch occurs within 24h via Northline / Direct Freight.</p>
                <p>• Delivery destination: <strong className="text-slate-900">{formData.streetAddress}, {formData.suburb}, {formData.state} {formData.postcode}</strong></p>
                <p>• Tailgate courier tracking will be SMS text messaged to <strong className="text-slate-900">{formData.phone}</strong>.</p>
              </div>
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

              {/* Crypto Payment Method Selection */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Bitcoin className="w-4 h-4 text-amber-600" />
                    <span>Select Payment Cryptocurrency</span>
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">10% Off Included</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {(['USDT', 'BTC', 'ETH', 'SOL'] as const).map((crypto) => (
                    <button
                      key={crypto}
                      type="button"
                      onClick={() => setSelectedCrypto(crypto)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedCrypto === crypto
                          ? 'border-amber-400 bg-amber-50 text-amber-950 font-black shadow-sm ring-2 ring-amber-400/20'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs sm:text-sm font-bold">{crypto}</div>
                      <div className="text-[10px] text-slate-500">{cryptoRates[crypto].network.split(' ')[0]}</div>
                    </button>
                  ))}
                </div>

                {/* Wallet Preview Box */}
                <div className="mt-3 bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Official Merchant Deposit Address ({currentCrypto.network}):</span>
                    <button
                      type="button"
                      onClick={handleCopyAddress}
                      className="text-sky-700 hover:text-sky-800 flex items-center gap-1 font-bold"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-xs text-slate-900 break-all bg-white p-2.5 rounded-xl border border-slate-200 font-semibold">
                    {currentCrypto.address}
                  </div>
                </div>

                <div className="mt-3">
                  <label className="block text-slate-700 text-xs font-medium mb-1">
                    Transaction ID / TX Hash (Optional if sending right now, or provide via email):
                  </label>
                  <input
                    type="text"
                    value={formData.txHash}
                    onChange={(e) => setFormData({ ...formData, txHash: e.target.value })}
                    placeholder="e.g. 0x48f92b... or submit now and transfer after invoice"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-xs font-mono"
                  />
                </div>
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

                  <div className="flex justify-between text-amber-800 font-bold">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Crypto Payment Discount (-10%):</span>
                    </span>
                    <span>-{formatPrice(cryptoDiscountAmount)}</span>
                  </div>

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
                      <div className="text-xs text-amber-800 font-mono font-bold">
                        ≈ {cryptoAmount} {selectedCrypto}
                      </div>
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
                      <span>Generating Order Invoice...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Order & Lock 10% Discount</span>
                    </>
                  )}
                </button>

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
