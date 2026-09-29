import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FAQS_DATA } from '../data/faqs';
import { 
  ChevronDown, 
  Search
} from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { navigateTo } = useShop();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(FAQS_DATA[0].id);

  const categories = ['all', 'Ordering & Payment', 'Shipping & Delivery', 'Product & Technical', 'Warranty & Returns'];

  const filteredFaqs = FAQS_DATA.filter((faq) => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchQ = faq.question.toLowerCase().includes(q);
      const matchA = faq.answer.toLowerCase().includes(q);
      if (!matchQ && !matchA) return false;
    }
    return true;
  });

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Knowledge Base</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Find answers regarding our 10% Crypto payment discount, free nationwide tailgate freight across Australia, tropical 43°C ratings, and warranty coverage.
        </p>

        {/* Search */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. crypto, heated glass, shipping)..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 shadow-2xs"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All Questions' : cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
            >
              <button
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-sky-600 shrink-0"></div>
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-sky-700 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-white">Still Have Questions About Sizing or Delivery?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Our Sydney cooling support specialists are on standby to answer your questions or provide a tailored quote.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Contact Customer Support
          </button>
        </div>
      </div>
    </div>
  );
};
