import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Truck
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Sizing & Model Recommendation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email || !formState.message) {
      addToast({
        type: 'warning',
        title: 'Missing Details',
        message: 'Please fill out your name, email and message.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'contact',
          name: formState.fullName,
          email: formState.email,
          phone: formState.phone,
          inquiryType: formState.inquiryType,
          message: formState.message,
          website: honeypot
        })
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || result.ok !== true) throw new Error('submit failed');
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Message Sent!',
        message: 'Thanks — we have your message and will reply by email.'
      });
    } catch {
      addToast({
        type: 'warning',
        title: 'Message not sent',
        message: 'Sorry, something went wrong. Please try again or email info@barfridgesforsale.com.au.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Get In Touch</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Contact Our Australian Technical Team
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Need advice on cabinetry ventilation clearances, 43°C tropical performance, or trade order discounts? Our refrigeration specialists are ready to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Contact Info & Warehousing */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 pb-3 border-b border-slate-100">
              Direct Contact Channels
            </h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-sky-50 border border-sky-200 rounded-2xl text-sky-700 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 text-sm block font-bold">support@barfridgesforsale.com.au</strong>
                  <span className="text-slate-500">Technical sizing and order status inquiries</span>
                  <div className="text-[11px] text-sky-800 font-bold mt-0.5">Guaranteed 2-hour response during business hours</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 text-sm block font-bold">Nationwide Distribution Warehouses</strong>
                  <span className="text-slate-500">Direct courier dispatches from:</span>
                  <ul className="text-slate-700 mt-1 space-y-0.5 text-[11px] font-medium">
                    <li>• Sydney Logistics Center: Eastern Creek, NSW</li>
                    <li>• Melbourne Logistics Depot: Altona, VIC</li>
                    <li>• Brisbane Distribution Hub: Hemmant, QLD</li>
                    <li>• Perth Depot: Welshpool, WA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-xs text-amber-900 bg-amber-50 border border-amber-300 p-3.5 rounded-2xl font-bold">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>100% Free Tailgate Freight on all fridges & freezers across Australia.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Thank You, {formState.fullName}!</h3>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-md mx-auto">
                  Your message regarding <span className="text-sky-700 font-bold">{formState.inquiryType}</span> has been received. Our team will email you shortly at <span className="text-slate-900 font-bold">{formState.email}</span>.
                </p>
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({
                    fullName: '',
                    email: '',
                    phone: '',
                    inquiryType: 'Sizing & Model Recommendation',
                    message: ''
                  });
                }}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors border border-slate-200"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Send Us a Direct Message</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fill out the form below and we will respond promptly.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Jason Miller"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="jason@example.com.au"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Phone Number</label>
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="0400 000 000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Inquiry Type *</label>
                  <select
                    value={formState.inquiryType}
                    onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm font-medium"
                  >
                    <option value="Sizing & Model Recommendation">Sizing & Model Recommendation</option>
                    <option value="Outdoor Alfresco 43C Specs">Outdoor Alfresco 43°C Specs</option>
                    <option value="Crypto 10% Discount Inquiry">Crypto 10% Discount Inquiry</option>
                    <option value="Delivery ETA & Tailgate Tracking">Delivery ETA & Tailgate Tracking</option>
                    <option value="Trade & Commercial Bulk Order">Trade & Commercial Bulk Order</option>
                    <option value="Warranty & Technician Support">Warranty & Technician Support</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 mb-1 font-semibold">Your Message / Dimensions *</label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Include your benchtop dimensions, outdoor location, or questions..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-sky-600 via-sky-700 to-blue-800 hover:from-sky-500 hover:to-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-sky-600/20 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Support</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-4 max-w-4xl mx-auto mt-10" aria-labelledby="contact-how-heading">
        <h2 id="contact-how-heading" className="text-2xl font-extrabold text-slate-900 tracking-tight">
          How Ordering and Enquiries Work
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Use the form for sizing advice, trade enquiries, delivery questions or warranty help. Include your benchtop dimensions or outdoor
          location where relevant, and your order reference if you already have one.
        </p>
        <h3 className="text-base font-bold text-slate-900">Placing an order</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Add your bar fridges to the cart and complete the order form with your delivery details. We confirm your order by email and,
          once we have reviewed it, email you the payment details for your chosen method. Pay the exact amount shown, upload a screenshot
          of your payment using the confirmation link, and we dispatch within 24 hours of confirmed payment.
        </p>
        <h3 className="text-base font-bold text-slate-900">What to include in your message</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          For sizing help, tell us the width, depth and height of the space and whether the fridge will sit under a bench, in a cabinet or
          freestanding. For outdoor use, tell us whether the area is covered. For trade enquiries, tell us roughly how many units you need
          and the model or size you are considering, and we will point you to the right range.
        </p>
        <h3 className="text-base font-bold text-slate-900">Warranty and returns</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Every bar fridge and freezer carries the warranty listed on its product page. If you need to make a warranty claim or return a
          unit, email us with your order reference and the model name, and include photos if the unit arrived damaged or has a fault.
        </p>
        <h3 className="text-base font-bold text-slate-900">Before you contact us</h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          Many questions are answered in our FAQ, shipping and returns pages, and our buying guides cover sizing, ventilation and
          climate ratings. If you still need help, send us a message and we will reply by email.
        </p>
      </section>

    </div>
  );
};
