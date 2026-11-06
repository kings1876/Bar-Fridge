import React, { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Send, CheckCircle2 } from 'lucide-react';
import { BlogPost } from '../types';

/**
 * Lead capture at the end of every blog post: the products the article mentions (ready to order or add to cart)
 * and a free quote / sizing advice form that posts to the same /api/contact endpoint as the contact page.
 */
export const BlogConversion: React.FC<{ post: BlogPost }> = ({ post }) => {
  const slugs = Array.from(post.content.join('\n').matchAll(/\]\(\/([a-z0-9-]+)\)/g)).map((m) => m[1]);
  const mentioned = Array.from(new Set(slugs))
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 3);

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'contact',
          name: form.name,
          email: form.email,
          phone: form.phone,
          inquiryType: 'Free quote (from blog: ' + post.slug + ')',
          message: form.message,
          website: honeypot
        })
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok || result.ok !== true) throw new Error('submit failed');
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const field =
    'w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-sky-500 text-sm';

  return (
    <section className="space-y-8" aria-label="Order or get a free quote">
      {mentioned.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Order the models from this guide</h2>
          <p className="text-sm text-slate-600">
            Free shipping across Australia, a 2 years parts and labour warranty and 10% off when you pay with crypto.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mentioned.map((p) => (
              <ProductCard key={p.id} product={p} headingLevel={3} />
            ))}
          </div>
        </div>
      )}

      <div className="bg-sky-50 border border-sky-200 rounded-3xl p-6 sm:p-8">
        {state === 'sent' ? (
          <div className="text-center space-y-2 py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-xl font-extrabold text-slate-900">Thanks, we have your request</h2>
            <p className="text-sm text-slate-600">We will reply by email with your free quote and model recommendation.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Get a free quote</h2>
              <p className="text-sm text-slate-600 mt-1">
                Tell us the space, the budget and what you will keep in it. We will recommend the right model and send a quote, free shipping included.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 mb-1 font-semibold" htmlFor={'bq-name-' + post.slug}>Your name *</label>
                <input id={'bq-name-' + post.slug} required type="text" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-slate-700 mb-1 font-semibold" htmlFor={'bq-email-' + post.slug}>Email *</label>
                <input id={'bq-email-' + post.slug} required type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 mb-1 font-semibold" htmlFor={'bq-phone-' + post.slug}>Phone (optional)</label>
                <input id={'bq-phone-' + post.slug} type="tel" className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-slate-700 mb-1 font-semibold" htmlFor={'bq-msg-' + post.slug}>What do you need? *</label>
                <textarea
                  id={'bq-msg-' + post.slug}
                  required
                  rows={4}
                  className={field}
                  placeholder="Space width, depth and height, indoor or outdoor, budget, how many cans or bottles..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
            </div>
            {state === 'error' && (
              <p className="text-xs font-semibold text-rose-700" role="alert">
                Sorry, that did not send. Please try again, or use the contact page.
              </p>
            )}
            <button
              type="submit"
              disabled={state === 'sending'}
              className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-blue-800 hover:from-sky-500 hover:to-blue-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{state === 'sending' ? 'Sending...' : 'Send my free quote request'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
