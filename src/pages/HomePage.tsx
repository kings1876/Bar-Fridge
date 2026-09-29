import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';
import { REVIEWS_DATA } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { TrustpilotBanner } from '../components/TrustpilotBanner';
import { 
  Truck, 
  Bitcoin, 
  ShieldCheck, 
  Snowflake, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Sparkles,
  Zap,
  Layers,
  ThermometerSnowflake,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';

interface HeroSlide {
  id: number;
  bgImage: string;
  theme: string;
  subtitle: string;
  tag: string;
  productName: string;
  productPrice: string;
  productId: string;
  productImage: string;
  capacity: string;
  stat1: { label: string; value: string };
  stat2: { label: string; value: string };
  stat3: { label: string; value: string };
}

const PEXELS_HERO_IMAGE = '/images/pexels-dogukan-melik-sevindik-1121476372-27798034.jpg';
const PEXELS_HERO_FALLBACK = 'https://images.pexels.com/photos/27798034/pexels-photo-27798034.jpeg?auto=compress&cs=tinysrgb&w=1920';

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    bgImage: PEXELS_HERO_IMAGE,
    theme: 'Tropical Retro & Alfresco Living',
    subtitle: 'High-efficiency retro styling built for Australian entertainment spaces',
    tag: 'Tropical Ambient Tested & Insulated',
    productName: 'PolarChill Retro 140L Mint Beverage Cooler',
    productPrice: '$649 USD',
    productId: 'polarchill-138l-glass',
    productImage: PEXELS_HERO_IMAGE,
    capacity: '140 Litres • 135 Cans',
    stat1: { label: 'Style & Finish', value: 'Mint Gloss' },
    stat2: { label: 'Insulation', value: 'High Density' },
    stat3: { label: 'Crypto Rebate', value: '-10% Instantly' }
  },
  {
    id: 2,
    bgImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=80',
    theme: 'Commercial Hospitality & Bars',
    subtitle: 'Double heated low-E glass display back-bar coolers for pubs & clubs',
    tag: 'Anti-Sweat Heated Low-E Glass',
    productName: 'ArcticVault 210L Double Sliding Door',
    productPrice: '$949 USD',
    productId: 'arc-vault-210l-sliding',
    productImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
    capacity: '210 Litres • 220 Cans',
    stat1: { label: 'Door System', value: 'Double Sliding' },
    stat2: { label: 'Internal Temp', value: '-2°C to 10°C' },
    stat3: { label: 'Sound Output', value: '42dB Quiet' }
  },
  {
    id: 3,
    bgImage: 'https://images.unsplash.com/photo-1572025442646-866d16c84a54?auto=format&fit=crop&w=2000&q=80',
    theme: 'Man Caves & Entertainment Lounges',
    subtitle: 'Underbench whisper-quiet beverage center with LED illumination',
    tag: 'Whisper-Quiet Embraco Inverter',
    productName: 'PolarChill Pro 138L Single Glass Door',
    productPrice: '$489 USD',
    productId: 'polarchill-138l-glass',
    productImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80',
    capacity: '138 Litres • 142 Cans',
    stat1: { label: 'Noise Level', value: '38dB Silent' },
    stat2: { label: 'Lock & Key', value: 'Security Lock' },
    stat3: { label: 'Warranty', value: '2-Year Direct' }
  },
  {
    id: 4,
    bgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=80',
    theme: 'Craft Brewery & Wine Cellars',
    subtitle: 'Dual zone independent temperature control for beers and fine wines',
    tag: 'Dual Zone Wine & Beer Chill',
    productName: 'DualZone Vintner 150L Beverage Hub',
    productPrice: '$779 USD',
    productId: 'dualzone-vintner-150l',
    productImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    capacity: '150 Litres • 42 Bottles + 60 Cans',
    stat1: { label: 'Dual Temps', value: '1°C & 12°C' },
    stat2: { label: 'Shelves', value: 'Beechwood + Wire' },
    stat3: { label: 'Energy Rating', value: '5-Star Eco' }
  },
  {
    id: 5,
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
    theme: 'Poolside Cabanas & BBQ Islands',
    subtitle: 'Sub-zero frosted glassware and rapid pull-down freezing',
    tag: 'Deep Frost Sub-Zero Technology',
    productName: 'GlacierBank 200L Heavy Duty Bar Freezer',
    productPrice: '$699 USD',
    productId: 'glacierbank-200l-freezer',
    productImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1000&q=80',
    capacity: '200 Litres Sub-Zero Vault',
    stat1: { label: 'Freezing Temp', value: '-18°C to -24°C' },
    stat2: { label: 'Insulation', value: 'Cyclopentane 70mm' },
    stat3: { label: 'Drainage', value: 'Front Defrost Plug' }
  }
];

export const HomePage: React.FC = () => {
  const { navigateTo, setSelectedCategory, setIsOrderModalOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'alfresco' | 'freezers'>('all');

  // Hero background slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bgOpacity, setBgOpacity] = useState<number>(100); // 100% full opacity default

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  useEffect(() => {
    if (!isAutoPlaying) return;

    setProgress(0);
    const tickInterval = 50;
    const increment = (tickInterval / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + increment;
      });
    }, tickInterval);

    return () => clearInterval(timer);
  }, [currentSlide, isAutoPlaying]);

  const selectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'popular') return p.badge === 'Popular' || p.badge === 'Best Value';
    if (activeTab === 'alfresco') return p.category === 'alfresco-outdoor';
    if (activeTab === 'freezers') return p.category === 'bar-freezers';
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section with High-Definition Background Slideshow */}
      <section 
        className="relative overflow-hidden pt-8 pb-20 lg:pt-16 lg:pb-28 text-white select-none bg-slate-950"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Full-Bleed Slideshow Background Images with Smooth Crossfade and Subtle Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Base Background Image: pexels-dogukan-melik-sevindik-1121476372-27798034 at High Opacity */}
          <div 
            className="absolute inset-0 w-full h-full transition-opacity duration-300"
            style={{ opacity: bgOpacity / 100 }}
          >
            <img
              src={PEXELS_HERO_IMAGE}
              onError={(e) => {
                e.currentTarget.src = PEXELS_HERO_FALLBACK;
              }}
              alt="Bar Fridges Alfresco Background"
              className="w-full h-full object-cover object-center brightness-105 contrast-105"
            />
          </div>

          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{ opacity: isActive ? bgOpacity / 100 : 0 }}
              >
                <img
                  src={slide.bgImage}
                  onError={(e) => {
                    if (slide.bgImage === PEXELS_HERO_IMAGE) {
                      e.currentTarget.src = PEXELS_HERO_FALLBACK;
                    }
                  }}
                  alt={slide.theme}
                  className={`w-full h-full object-cover object-center transform transition-transform duration-[6500ms] ease-out brightness-105 contrast-105 ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                />
              </div>
            );
          })}

          {/* Ultra-Light Ambient Scrim ensuring maximum photo opacity and visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/20 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 z-20 pointer-events-none" />
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/15 blur-[140px] pointer-events-none rounded-full z-20" />
        </div>

        {/* Live Slideshow Badge on Top Right */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-slate-200 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Living Scene:</span>
          <span className="text-white font-bold">{activeSlideData.theme}</span>
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Text Box inside High-Opacity Glass Card for crystal clear reading */}
            <div className="lg:col-span-7 bg-slate-950/75 sm:bg-slate-950/70 backdrop-blur-xl p-6 sm:p-9 rounded-3xl border border-white/15 shadow-2xl space-y-6 text-center lg:text-left">
              {/* Trust Badge with Active Slide Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-sky-400/50 text-sky-300 text-xs font-bold shadow-lg backdrop-blur-md">
                <ThermometerSnowflake className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Engineered for 43°C Aussie Summer Heat</span>
                <span className="hidden sm:inline text-slate-500">•</span>
                <span className="text-amber-300 font-semibold">{activeSlideData.tag}</span>
              </div>

              {/* Main Headline with High Contrast Styling */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-white tracking-tight leading-[1.12] drop-shadow-xl">
                Premium Commercial & Alfresco <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-sky-400">Bar Fridges For Sale</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal drop-shadow-md">
                {activeSlideData.subtitle}. Explore heavy-duty 304 marine stainless outdoor coolers, whisper-quiet glass display back-bar fridges, and sub-zero bar freezers tested across Australia. Free nationwide tailgate delivery.
              </p>

              {/* Value Points Pill Grid */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 text-xs font-bold text-slate-200 pt-1">
                <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/90 px-3.5 py-2 rounded-xl shadow-md">
                  <Truck className="w-4 h-4 text-sky-400" />
                  <span>Free Freight Nationwide</span>
                </span>
                <span className="flex items-center gap-1.5 bg-amber-500/30 backdrop-blur-md border border-amber-400/60 px-3.5 py-2 rounded-xl text-amber-200 shadow-md">
                  <Bitcoin className="w-4 h-4 text-amber-400" />
                  <span>Instant 10% Crypto Discount</span>
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-700/90 px-3.5 py-2 rounded-xl shadow-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2–3 Year Australian Warranty</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-sky-500 via-sky-600 to-blue-700 hover:from-sky-400 hover:to-blue-600 text-white font-extrabold rounded-2xl shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2.5 transition-all text-sm group hover:scale-[1.02]"
                >
                  <span>Explore Shop Catalog</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setIsOrderModalOpen(true)}
                  className="w-full sm:w-auto px-7 py-4 bg-slate-900/95 hover:bg-slate-800 text-white border border-slate-700 font-bold rounded-2xl flex items-center justify-center gap-2 transition-all text-sm shadow-lg backdrop-blur-md"
                >
                  <Bitcoin className="w-4 h-4 text-amber-400" />
                  <span>Direct Order Form (10% Off)</span>
                </button>
              </div>

              {/* Trustpilot Social Proof Snippet */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-200">
                <div className="flex -space-x-2">
                  <img className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                  <img className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover shadow-sm" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                  <img className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover shadow-sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                </div>
                <span>Over <strong className="text-white font-bold">2,148+ verified Australian buyers</strong> rated us 4.9/5 on Trustpilot</span>
              </div>
            </div>

            {/* Right Hero Visual Feature (Synchronized with Active Slide) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl p-3 bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950">
                  <img
                    key={activeSlideData.productImage}
                    src={activeSlideData.productImage}
                    alt={activeSlideData.productName}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent"></div>

                  {/* Floating badge on image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div className="bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80 shadow-xl max-w-[75%]">
                      <div className="text-[10px] uppercase font-bold text-sky-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span>
                        <span>Setting: {activeSlideData.theme}</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5 truncate">{activeSlideData.productName}</div>
                      <div className="text-xs text-amber-300 font-mono font-bold mt-0.5">
                        {activeSlideData.productPrice} • {activeSlideData.capacity}
                      </div>
                    </div>

                    <button
                      onClick={() => navigateTo('product-detail', { productId: activeSlideData.productId })}
                      className="p-3 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-xl font-bold shadow-lg transition-transform hover:scale-110 shrink-0"
                      title="View product details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Sub Features Row */}
                <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80">
                    <div className="text-sky-400 font-black text-xs sm:text-sm">{activeSlideData.stat1.value}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{activeSlideData.stat1.label}</div>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80">
                    <div className="text-emerald-400 font-black text-xs sm:text-sm">{activeSlideData.stat2.value}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{activeSlideData.stat2.label}</div>
                  </div>
                  <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800/80">
                    <div className="text-amber-400 font-black text-xs sm:text-sm">{activeSlideData.stat3.value}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{activeSlideData.stat3.label}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Slideshow Control Bar with Animated Progress Timers & Thumbnails */}
          <div className="mt-10 pt-6 border-t border-white/10">
            {/* Quick Navigation Tabs with Progress Timers */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
              {HERO_SLIDES.map((slide, idx) => {
                const isSelected = idx === currentSlide;
                return (
                  <button
                    key={slide.id}
                    onClick={() => selectSlide(idx)}
                    className={`relative text-left p-2.5 rounded-2xl transition-all duration-300 overflow-hidden border ${
                      isSelected
                        ? 'bg-slate-900/90 border-sky-400/80 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-950/60 hover:bg-slate-900/70 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {/* Animated Progress Fill Bar */}
                    {isSelected && (
                      <div 
                        className="absolute bottom-0 left-0 top-0 bg-sky-500/15 pointer-events-none transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    )}

                    <div className="relative z-10 flex items-center justify-between text-[10px] font-mono">
                      <span className={isSelected ? 'text-sky-400 font-bold' : 'text-slate-500'}>
                        0{idx + 1}
                      </span>
                      {isSelected && isAutoPlaying && (
                        <span className="text-[9px] uppercase tracking-wider text-sky-400 font-bold">Playing</span>
                      )}
                    </div>

                    <div className="relative z-10 mt-1">
                      <div className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                        {slide.theme.split('&')[0].trim()}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate hidden sm:block">
                        {slide.tag.split(' ')[0]} {slide.tag.split(' ')[1]}
                      </div>
                    </div>

                    {/* Bottom Progress Underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                      {isSelected && (
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 to-cyan-300 transition-all duration-75"
                          style={{ width: `${progress}%` }}
                        />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls Row: Play/Pause, Prev/Next, and Status */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-sky-400">
                  Slide {currentSlide + 1} of {HERO_SLIDES.length}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">
                  Scene: <strong className="text-white">{activeSlideData.theme}</strong>
                </span>
              </div>

              {/* Opacity Adjustment & Play Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Opacity Selector */}
                <div className="flex items-center gap-1.5 bg-slate-900/90 border border-white/10 px-2.5 py-1 rounded-xl text-[11px]">
                  <span className="text-slate-400 font-medium">Image Opacity:</span>
                  {[70, 85, 100].map((val) => (
                    <button
                      key={val}
                      onClick={() => setBgOpacity(val)}
                      className={`px-2 py-0.5 rounded-lg font-bold text-[10px] transition-all ${
                        bgOpacity === val
                          ? 'bg-sky-400 text-slate-950 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                      title={`Set background photo opacity to ${val}%`}
                    >
                      {val}%
                    </button>
                  ))}
                </div>

                {/* Buttons: Prev, Play/Pause, Next */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Previous slide"
                    title="Previous scene"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-200 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                    title={isAutoPlaying ? "Pause auto-slideshow" : "Resume auto-slideshow"}
                  >
                    {isAutoPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-[11px]">Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px]">Play</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-slate-300 hover:text-white transition-colors"
                    aria-label="Next slide"
                    title="Next scene"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustpilotBanner />
      </section>

      {/* Categories Grid (A = Category -> Subcategory -> Product) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-sky-700 uppercase tracking-widest">Browse by Refrigeration Category</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Engineered For Every Entertainment Space
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All Categories & Subcategories</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                navigateTo('shop', { categoryId: cat.id });
              }}
              className="group cursor-pointer bg-white border border-slate-200 hover:border-sky-400 rounded-3xl p-5 transition-all duration-200 flex flex-col justify-between hover:shadow-xl hover:shadow-sky-500/10 shadow-sm"
            >
              <div>
                <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 mb-3.5 group-hover:scale-110 transition-transform">
                  {idx === 0 && <Snowflake className="w-5 h-5" />}
                  {idx === 1 && <Layers className="w-5 h-5" />}
                  {idx === 2 && <Flame className="w-5 h-5" />}
                  {idx === 3 && <Sparkles className="w-5 h-5" />}
                  {idx === 4 && <Zap className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-sky-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-sky-700 font-bold">
                <span>{cat.subcategories.length} Subcategories</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase with Category Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Hand-Selected Aussie Favorites</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Top Rated Bar Fridges & Freezers For Sale
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Fridges
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'popular' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('alfresco')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'alfresco' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Outdoor Alfresco
            </button>
            <button
              onClick={() => setActiveTab('freezers')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all ${
                activeTab === 'freezers' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bar Freezers & Chests
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-4 bg-white hover:bg-slate-50 text-sky-800 border border-slate-300 hover:border-sky-400 rounded-2xl font-bold text-xs transition-all shadow-sm"
          >
            Explore Full Range of 12+ Units in Shop →
          </button>
        </div>
      </section>

      {/* Technical Engineering Spotlight: Aussie Tropical Climate with Ambient Slideshow Background */}
      <section className="relative overflow-hidden border-y border-slate-800 py-16 px-4 sm:px-6 lg:px-8 text-white">
        {/* Climate Section Background Slideshow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
            <img
              src={PEXELS_HERO_IMAGE}
              onError={(e) => {
                e.currentTarget.src = PEXELS_HERO_FALLBACK;
              }}
              alt="Australian Tropical Climate Testing"
              className="w-full h-full object-cover object-center"
            />
          </div>
          {/* Light Ambient Scrim for high image opacity */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-sky-950/40 to-slate-950/70" />
          <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-900/60 border border-sky-400/40 text-xs font-bold text-sky-300">
              <ThermometerSnowflake className="w-3.5 h-3.5 text-sky-400" />
              <span>Climate Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Why Australian Heat Demands Class-T Tropical Rated Fridges
            </h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              Most standard European and Asian domestic mini fridges are tested for 25°C air-conditioned rooms. In Australia, outdoor alfresco areas regularly exceed 38°C to 43°C during summer barbecue season.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-2xl backdrop-blur-md shadow-md">
                <div className="p-2 rounded-xl bg-sky-950 border border-sky-700 text-sky-400 shrink-0">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">43°C True Ambient Survival</h4>
                  <p className="text-xs text-slate-300 mt-0.5">High-displacement Embraco compressors maintain sub-zero drink chill without burning out the motor.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-2xl backdrop-blur-md shadow-md">
                <div className="p-2 rounded-xl bg-sky-950 border border-sky-700 text-sky-400 shrink-0">
                  <Snowflake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Heated Low-E Glass Against Sweating</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Electrical heating elements inside the double-glazed panes eliminate moisture dripping onto timber decks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/80 border border-slate-700/80 p-3.5 rounded-2xl backdrop-blur-md shadow-md">
                <div className="p-2 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">304 Marine Grade Stainless Steel</h4>
                  <p className="text-xs text-slate-300 mt-0.5">High nickel and chromium content defends against coastal sea spray and poolside chlorine corrosion.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-slate-700/90 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
                alt="Tropical rated alfresco outdoor bar fridge testing"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
                <div className="bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-700 w-full flex items-center justify-between">
                  <div>
                    <div className="text-xs text-sky-400 font-bold uppercase">Field Tested In QLD & WA</div>
                    <div className="text-white text-sm font-bold">Sub-Zero -2°C Cold Mode for Craft Beer</div>
                  </div>
                  <button
                    onClick={() => navigateTo('shop', { categoryId: 'alfresco-outdoor' })}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    View Alfresco Models
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Payment Promotion Banner (10% OFF) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 via-amber-100/60 to-amber-50 border border-amber-300 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs">
                <Bitcoin className="w-4 h-4 text-amber-600" />
                <span>Instant 10% Crypto Payment Rebate</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Pay With Bitcoin, USDT, ETH or Solana & Save 10% Automatically
              </h2>
              <p className="text-slate-700 text-sm max-w-2xl leading-relaxed">
                We pass payment gateway savings directly to you. No bank intermediary fees means you receive an instant 10% reduction on all commercial bar fridges and bar freezers at checkout.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <span className="px-3.5 py-1.5 bg-white rounded-xl text-xs font-mono text-amber-900 border border-amber-200 font-bold shadow-2xs">
                  BTC (Bitcoin)
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-xl text-xs font-mono text-emerald-900 border border-amber-200 font-bold shadow-2xs">
                  USDT (TRC20 / ERC20)
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-xl text-xs font-mono text-sky-900 border border-amber-200 font-bold shadow-2xs">
                  ETH (Ethereum)
                </span>
                <span className="px-3.5 py-1.5 bg-white rounded-xl text-xs font-mono text-purple-900 border border-amber-200 font-bold shadow-2xs">
                  SOL (Solana)
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
              >
                Open Crypto Order Form →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trustpilot Customer Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Verified Trustpilot Testimonials</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Loved By Over 2,000 Australian Homeowners & Venues
          </h2>
          <p className="text-xs text-slate-500">
            Real feedback from Brisbane, Sydney, Melbourne, Perth, and regional Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <div key={i} className="w-3.5 h-3.5 bg-[#00b67a] flex items-center justify-center rounded-sm">
                        <Star className="w-2.5 h-2.5 fill-white text-white" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>

                <h4 className="font-bold text-sm text-slate-900">{review.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{review.author}</div>
                  <div className="text-[11px] text-slate-500">{review.city}</div>
                </div>
                {review.verified && (
                  <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Blog & Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-sky-700 uppercase tracking-widest">Cooling Guides & Advice</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Latest From The Bar Fridge Blog
            </h2>
          </div>
          <button
            onClick={() => navigateTo('blog')}
            className="text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 group"
          >
            <span>Read All Articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <div
              key={post.id}
              onClick={() => navigateTo('blog-post', { blogId: post.id })}
              className="group cursor-pointer bg-white border border-slate-200 hover:border-sky-400 rounded-3xl overflow-hidden shadow-sm transition-all flex flex-col justify-between hover:shadow-xl hover:shadow-sky-500/10"
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-3.5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span className="text-sky-700 font-bold uppercase tracking-wider">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-xs font-bold text-sky-700 flex items-center gap-1 group-hover:gap-2 transition-all">
                  <span>Read Full Article</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Authority & Keywords Text Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 text-xs text-slate-600 leading-relaxed shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Australia’s Premier Destination For Bar Fridges For Sale, Freezers & Alfresco Coolers
          </h3>
          <p>
            When searching for <strong>bar fridges for sale</strong> in Australia, reliability, thermal efficiency, and outdoor performance are paramount. At Bar Fridges For Sale Australia (founded 17 May 2018), we supply commercial grade <strong>drinks fridge for sale</strong> and <strong>beverage fridge for sale</strong> collections directly to homeowners, hospitality venues, craft breweries, and luxury builder projects nationwide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Comparing Bar Fridge Sales & Prices in Australia</h4>
              <p>
                Navigating <strong>bar fridge prices</strong> shouldn’t mean sacrificing quality. From underbench compact single door units to 330L commercial back-bar displays, we guarantee competitive pricing backed by a direct <strong>10% crypto discount</strong>. Whether you need an office cooler or an outdoor BBQ station, explore our <strong>bar fridge buy</strong> options with confidence.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xs mb-1">Commercial Bar Freezers & Deep Chest Freezers For Sale</h4>
              <p>
                In addition to beverage coolers, we stock specialized <strong>bar freezer for sale</strong> models and heavy-duty <strong>chest freezer for sale</strong> units. With sub-zero pulldown temperatures to -24°C, they keep glassware iced and party supplies preserved even during intense Australian summer heatwaves.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
