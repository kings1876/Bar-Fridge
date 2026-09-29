import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { BLOG_POSTS } from '../data/blogPosts';
import { NavLink } from '../components/NavLink';
import {
  Calendar, 
  Clock, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Check, 
  Search
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const {
    currentPage,
    selectedBlogPost,
    addToast
  } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // If in 'blog-post' view and selectedBlogPost exists, display single post view
  if (currentPage === 'blog-post' && selectedBlogPost) {
    const post = selectedBlogPost;
    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2);

    const handleCopyArticleLink = () => {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      addToast({
        type: 'success',
        title: 'Link Copied',
        message: 'Article link copied to clipboard.'
      });
      setTimeout(() => setCopiedLink(false), 3000);
    };

    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
        {/* Back Button */}
        <NavLink
          page="blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 hover:text-sky-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bar Fridge Articles</span>
        </NavLink>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="px-3.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded-full font-bold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.date}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-b border-slate-200 pb-4 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {post.author.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{post.author}</span>
                <span className="text-[11px] text-slate-500">Author & Cooling Specialist</span>
              </div>
            </div>

            <button
              onClick={handleCopyArticleLink}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl text-slate-700 transition-colors shadow-2xs font-semibold"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] border border-slate-200 shadow-md bg-slate-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body Content */}
        <div className="space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl text-slate-700 font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Call to action card */}
        <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <span className="text-xs uppercase tracking-widest font-bold text-sky-400">Upgrade Your Setup</span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to Find the Perfect Bar Fridge for Your Space?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enjoy 100% Free Nationwide Freight across Australia, plus an extra 10% instant discount when you pay with Bitcoin, USDT, or Ethereum.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <NavLink
              page="shop"
              className="px-7 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform hover:scale-105"
            >
              Browse Bar Fridges & Freezers
            </NavLink>
          </div>
        </div>

        {/* Related Posts */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Recommended Reading</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <NavLink
                key={rel.id}
                page="blog-post"
                options={{ blogId: rel.id }}
                className="group bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-4 transition-all space-y-3 shadow-sm hover:shadow-md"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                  <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="text-xs text-sky-700 font-bold uppercase tracking-wider">{rel.category}</div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2">
                  {rel.title}
                </h4>
              </NavLink>
            ))}
          </div>
        </div>
      </article>
    );
  }

  // Blog Directory View
  const categories = ['all', 'Buying Guides', 'Technical & Engineering', 'Comparisons', 'Promotions & Crypto', 'Maintenance & Energy'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory !== 'all' && post.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchTag = post.tags.some(t => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Blog Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Industry Knowledge & Advice</span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight">
          The Bar Fridge & Cooling Blog
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Expert Australian refrigeration guides, alfresco installation tips, energy-saving advice, and crypto purchasing breakdowns written by certified cooling technicians.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto pt-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, 43°C ratings, energy tips..."
              className="w-full bg-white border border-slate-300 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 shadow-2xs"
            />
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
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
            {cat === 'all' ? 'All Articles' : cat}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <NavLink
            key={post.id}
            page="blog-post"
            options={{ blogId: post.id }}
            className="group block bg-white border border-slate-200 hover:border-sky-400 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:shadow-sky-500/10"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur border border-slate-200 text-sky-800 text-[10px] font-bold uppercase px-3 py-1 rounded-lg shadow-2xs">
                {post.category}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700 group-hover:text-sky-800">
                <span>Read Full Guide</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
