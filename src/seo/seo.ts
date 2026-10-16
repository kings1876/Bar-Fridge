// Single source of truth for per-page SEO. Used at runtime (src/components/Seo.tsx)
// and at build time (scripts/prerender.mjs) so crawlers get the right <head> without JS.
// Keyword targets come from docs/keywords/targets.md (Semrush AU, KD within limits).
// Deliberately emits NO ratings / reviews in structured data.
import { PRODUCTS, CATEGORIES } from '../data/products';
import { BLOG_POSTS } from '../data/blogPosts';
import { FAQS_DATA } from '../data/faqs';
import { CATEGORY_GUIDES } from '../data/categoryContent';
import { SUBCATEGORY_GUIDES, subStats } from '../data/subcategoryContent';
import { richToHtml, richToText } from './richtext';
import { longDescriptionFor } from '../data/productLongDescriptions';
import { SITE, REPLY } from '../../shared/reply.config.js';

export { PRODUCTS, CATEGORIES, CATEGORY_GUIDES, SUBCATEGORY_GUIDES, subStats, BLOG_POSTS, FAQS_DATA, SITE, richToHtml, longDescriptionFor };

export interface SeoMeta {
  title: string;
  description: string;
  canonical: string;
  image: string;
  robots: string;
  ogType: 'website' | 'article' | 'product';
  jsonLd: object[];
  h1: string;
  keyword: string;
  lead?: string; // short crawlable intro used in the static HTML fallback
}

import { slugify } from './slug';
export { slugify };

const ORIGIN: string = SITE.origin;
const abs = (p: string) => (p.startsWith('http') ? p : `${ORIGIN}${p}`);
const DEFAULT_IMAGE = '/images/products/schmick-hus-sc70-ss-1.webp';

import { CATEGORY_SEO } from './categorySeo';
export { CATEGORY_SEO };

// Blog keyword plan (data-backed where the Semrush files had a match).
const BLOG_SEO: Record<string, { keyword: string; title: string; description: string }> = {
  'top-bar-fridges-for-sale-australia-guide': {
    keyword: 'best bar fridge',
    title: 'Best Bar Fridge in Australia: 2026 Buying Guide',
    description:
      'Our guide to the best bar fridge for Australian conditions: tropical ratings, glass door condensation, front venting and noise levels explained.'
  },
  'why-tropical-rated-bar-fridges-matter': {
    keyword: 'outdoor fridge',
    title: 'Outdoor Fridge Guide: Why Tropical Rating (43°C) Matters',
    description:
      'Why a standard fridge fails outdoors and why a Class T tropical-rated outdoor fridge is the right choice for Australian alfresco kitchens.'
  },
  'bar-fridge-vs-bar-freezer-comparison': {
    keyword: 'upright bar freezer',
    title: 'Bar Fridge vs Upright Bar Freezer: Which Do You Need?',
    description:
      'Bar fridge or upright bar freezer? Compare temperature range, storage, use cases and running costs to choose the right unit for your home bar or venue.'
  },
  'save-10-percent-bar-fridges-with-crypto': {
    keyword: 'bar fridge au',
    title: 'Save 10% on a Bar Fridge (AU) Paying with Crypto',
    description:
      'How the 10% crypto discount works on every bar fridge AU order: accepted coins, how the discount is applied and what happens after you order.'
  },
  'outdoor-kitchen-fridge-guide': {
    keyword: 'outdoor kitchen fridge',
    title: 'Outdoor Kitchen Fridge Guide for Alfresco BBQ Areas',
    description:
      'Choosing an outdoor kitchen fridge? Compare climate ratings, 316 stainless, front venting, size and placement for an Australian alfresco BBQ area.'
  },
  'glass-door-fridge-guide': {
    keyword: 'glass door fridge',
    title: 'Glass Door Fridge Guide: Glazing & Condensation',
    description:
      'A glass door fridge guide for Australian homes and venues: single, double and triple glazing, heated glass, condensation and sizing explained.'
  },
  'built-in-bar-fridge-guide': {
    keyword: 'built in bar fridge',
    title: 'Built In Bar Fridge Guide: Height, Size & Venting',
    description:
      'Choosing a built in bar fridge? Learn how to measure bar fridge height and width, why front venting matters and the clearance to allow.'
  },
  'beer-fridge-guide': {
    keyword: 'beer fridge',
    title: 'Beer Fridge Guide: Best Temperature, Size & Type',
    description:
      'Choosing a beer fridge or drinks fridge? Compare bar fridges, beverage fridges and dual zone models, plus the best temperature for beer.'
  },
  'quiet-bar-fridge-guide': {
    keyword: 'quiet bar fridge',
    title: 'Quiet Bar Fridge: How to Choose a Low-Noise Model',
    description:
      'Need a quiet bar fridge for the lounge or home theatre? Learn what dB ratings mean, what makes fridges noisy and how to choose a quiet model.'
  },
  'retro-bar-fridge-guide': {
    keyword: 'retro bar fridge',
    title: 'Retro Bar Fridge Guide: 46L & 70L Mini Bar Fridges',
    description:
      'Retro bar fridge guide: compare 46 litre and 70 litre retro mini bar fridges, branded designs and what to check before you buy.'
  },
  'dual-zone-wine-and-beverage-fridge-guide': {
    keyword: 'dual zone wine and beverage fridge',
    title: 'Dual Zone Wine and Beverage Fridge: How to Choose One',
    description:
      'A dual zone wine and beverage fridge holds wine and beer at different temperatures. Learn how zones work, sizes to consider and under bench fitting.'
  },
  'commercial-bar-fridge-guide': {
    keyword: 'commercial bar fridge',
    title: 'Commercial Bar Fridge Guide for Pubs, Cafes and Venues',
    description:
      'Choosing a commercial bar fridge? Compare double, sliding and triple door models from 190 to 473 litres, plus noise, heat and running costs.'
  },
  'mini-bar-fridge-guide': {
    keyword: 'mini bar fridges',
    title: 'Mini Bar Fridge Guide: 31, 46 and 70 Litre Sizes Compared',
    description:
      'Choosing a mini bar fridge? Compare compact sizes from 23 to 70 litres, how many cans each holds, glass door vs retro styles and where they fit.'
  },
  'lockable-bar-fridge-guide': {
    keyword: 'lockable bar fridge',
    title: 'Lockable Bar Fridge: Mini Fridges With a Lock Explained',
    description:
      'Need a lockable bar fridge or a mini fridge with a lock? See where a lock helps, which of our models have a lockable door and how to pick a size.'
  },
  'rhino-bar-fridge-guide': {
    keyword: 'rhino bar fridge',
    title: 'Rhino Bar Fridges: ENVY, SG, GSP and SGT Ranges Explained',
    description:
      'A guide to Rhino bar fridges: how the ENVY, SG, GSP and SGT model codes work and which Rhino fridge suits indoor, alfresco or commercial use.'
  },
  'branded-beer-fridge-guide': {
    keyword: 'vb beer fridge',
    title: 'Branded Beer Fridges: VB, Carlton & Great Northern',
    description:
      'Looking for a VB beer fridge or other branded bar fridge for your man cave? Compare Cub mini, glass door and skinny upright designs and sizes.'
  },
  'bar-fridge-dimensions-guide': {
    keyword: 'bar fridge dimensions',
    title: 'Bar Fridge Dimensions: Width, Height and Depth by Size',
    description:
      'Real bar fridge dimensions by size, from 23 litre minis to triple door units, with width, depth and height ranges and tips for measuring your space.'
  },
  'stainless-steel-bar-fridge-guide': {
    keyword: 'stainless steel bar fridge',
    title: 'Stainless Steel Bar Fridge Guide: 304 vs 316 and Finishes',
    description:
      'Choosing a stainless steel bar fridge? Compare 304 and 316 marine grade steel, solid stainless vs glass doors, and models for indoor and outdoor use.'
  },
  'black-bar-fridge-guide': {
    keyword: 'black bar fridge',
    title: 'Black Bar Fridge Guide: Sizes, Finishes and Styling',
    description:
      'Looking for a black bar fridge? Compare black mini, glass door and double door models from 31 to 473 litres, and how black compares with stainless.'
  },
  'slimline-bar-fridge-guide': {
    keyword: 'slimline bar fridge',
    title: 'Slimline Bar Fridge Guide: Narrow and Tall Upright Models',
    description:
      'Short on space? Compare slimline and narrow upright bar fridges, including 390 mm wide 160 litre models, with dimensions, brands and placement tips.'
  },
  'outdoor-bar-with-refrigerator-guide': {
    keyword: 'outdoor bar with refrigerator',
    title: 'Outdoor Bar With Refrigerator: How to Set One Up',
    description:
      'Planning an outdoor bar with a refrigerator? Learn how to choose the fridge, where to put it, what power and cover it needs and which models suit.'
  },
  'small-bar-freezer-guide': {
    keyword: 'small bar freezer',
    title: 'Small Bar Freezers: Mini, Under Counter and Upright Options',
    description:
      'Choosing a small bar freezer? Compare mini glass and solid door freezers, under counter built in models and uprights, with sizes and temperatures.'
  },
  'energy-efficiency-bar-fridge-power-bills': {
    keyword: 'energy efficient bar fridge',
    title: 'Energy Efficient Bar Fridge: Cut Running Costs',
    description:
      'Run an energy efficient bar fridge without high power bills: placement, ventilation, door seals and settings that keep running costs down.'
  }
};

const trim = (s: string, max: number) => {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:–-]+$/, '') + '…';
};
const firstSentence = (s: string) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name,
    item: abs(path)
  }))
});

const NOINDEX = 'noindex, nofollow';
const INDEX = 'index, follow, max-image-preview:large';

const STATIC: Record<string, { title: string; description: string; h1: string; keyword: string }> = {
  about: {
    title: 'About Us | Bar Fridges For Sale Australia',
    description:
      'Meet the team behind Bar Fridges For Sale: Australian-tested outdoor bar fridges, commercial coolers and bar freezers built for tropical heat.',
    h1: 'About Bar Fridges For Sale',
    keyword: 'bar fridges australia'
  },
  contact: {
    title: 'Contact Us | Bar Fridges For Sale',
    description:
      'Questions about an outdoor bar fridge, alfresco fridge or bar freezer? Contact Bar Fridges For Sale for stock, delivery and order help.',
    h1: 'Contact Bar Fridges For Sale',
    keyword: 'bar fridge'
  },
  faq: {
    title: 'Bar Fridge FAQ | Orders, Shipping & Warranty',
    description:
      'Answers about ordering a bar fridge online, crypto payment, free shipping, tropical ratings, warranty and returns from Bar Fridges For Sale.',
    h1: 'Bar Fridge FAQ: Orders, Shipping & Warranty',
    keyword: 'bar fridge'
  },
  shipping: {
    title: 'Shipping & Delivery | Bar Fridges For Sale',
    description:
      'Free nationwide shipping on bar fridges, outdoor fridges and bar freezers. Delivery times, tailgate freight and what to expect on arrival.',
    h1: 'Shipping & Delivery',
    keyword: 'bar fridge'
  },
  refund: {
    title: 'Returns & Refund Policy | Bar Fridges For Sale',
    description:
      'Returns, refunds and warranty policy for bar fridges, outdoor fridges and bar freezers bought from Bar Fridges For Sale.',
    h1: 'Returns & Refund Policy',
    keyword: 'bar fridge'
  },
  privacy: {
    title: 'Privacy Policy | Bar Fridges For Sale',
    description: 'How Bar Fridges For Sale collects, uses and protects your personal information when you order or contact us.',
    h1: 'Privacy Policy',
    keyword: 'bar fridge'
  },
  terms: {
    title: 'Terms & Conditions | Bar Fridges For Sale',
    description: 'Terms and conditions for ordering bar fridges, outdoor fridges and bar freezers from Bar Fridges For Sale.',
    h1: 'Terms & Conditions',
    keyword: 'bar fridge'
  }
};

const HOME: SeoMeta = {
  title: 'Outdoor Bar Fridge Australia | Bar Fridges For Sale',
  description:
    'Shop an outdoor bar fridge or alfresco bar fridge in Australia. Tropical-rated, glass door and commercial bar fridges for sale with free shipping.',
  canonical: abs('/'),
  image: abs(DEFAULT_IMAGE),
  robots: INDEX,
  ogType: 'website',
  h1: 'Outdoor Bar Fridges: Alfresco & Commercial Bar Fridges For Sale',
  keyword: 'outdoor bar fridge',
  lead:
    'Buy an outdoor bar fridge built for Australian summers. Browse alfresco bar fridges, glass door and commercial bar fridges, wine and beverage fridges and bar freezers, shipped free across Australia.',
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: abs('/')
    }
  ]
};

const SHOP: SeoMeta = {
  title: 'Bar Fridges For Sale Australia | Outdoor & Glass Door',
  description:
    'Bar fridges for sale in Australia: outdoor, glass door, under bench and commercial models, plus beer fridges and drinks fridges. Free shipping.',
  canonical: abs('/shop'),
  image: abs(DEFAULT_IMAGE),
  robots: INDEX,
  ogType: 'website',
  h1: 'Bar Fridges For Sale in Australia',
  keyword: 'bar fridges for sale',
  lead:
    'Bar fridges for sale across Australia: outdoor and alfresco models, glass door display fridges, under bench units, beer fridges and drinks fridges, plus bar freezers. Free nationwide shipping.',
  jsonLd: []
};

const itemList = (products: typeof PRODUCTS) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: abs(`/${p.slug}`),
    name: p.name
  }))
});

export function seoForPath(pathname: string, search = ''): SeoMeta {
  const parts = pathname.split('/').filter(Boolean);
  const [first, second, third] = parts;
  const params = new URLSearchParams(search);

  if (first === 'admin' || first === 'order' || first === 'api') {
    return { ...HOME, title: `${SITE.name}`, canonical: abs(pathname), robots: NOINDEX, jsonLd: [] };
  }
  if (!first) return HOME;

  if (first === 'shop') {
    // Legacy /shop?category=x → point at the clean category URL.
    const cat = params.get('category');
    if (cat && CATEGORY_SEO[cat]) {
      const sub = params.get('subcategory');
      const c = CATEGORIES.find((x) => x.id === cat)!;
      const subName = sub && c.subcategories.find((s) => s === sub);
      return seoForPath(`/category/${cat}${subName ? '/' + slugify(subName) : ''}`);
    }
    return {
      ...SHOP,
      jsonLd: [
        crumbs([['Home', '/'], ['Bar Fridges For Sale', '/shop']]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: SHOP.h1,
          url: SHOP.canonical,
          description: SHOP.description
        },
        itemList(PRODUCTS.slice(0, 12))
      ]
    };
  }

  if (first === 'category' && second && CATEGORY_SEO[second]) {
    const cat = CATEGORIES.find((c) => c.id === second)!;
    const plan = CATEGORY_SEO[second];
    const inCat = PRODUCTS.filter((p) => p.category === second);
    const sub = third ? cat.subcategories.find((s) => slugify(s) === third) : undefined;
    if (third && !sub) return seoForPath(`/category/${second}`);
    if (sub) {
      const subProducts = inCat.filter((p) => p.subcategory === sub);
      const path = `/category/${second}/${slugify(sub)}`;
      const SUB_OVERRIDE: Record<string, { h1: string; desc: string }> = {
        'Ice Boxes & Coolers': { h1: 'Ice Boxes & Coolers', desc: 'Heavy duty roto mould ice boxes and coolers in 35 and 42 litre sizes, with free shipping across Australia.' },
        'Bar Fridge With Freezer': { h1: 'Bar Fridge With Freezer', desc: 'A bar fridge with a mini freezer in one cabinet: compare capacity, dimensions and ratings, with free shipping across Australia.' }
      };
      const ov = SUB_OVERRIDE[sub];
      const h1 = `${sub} ${plan.keyword === 'wine fridge' ? 'Fridges' : 'Bar Fridges'}`.replace('Bar Fridges Bar Fridges', 'Bar Fridges');
      return {
        title: trim(`${sub} | ${cat.name}`, 60),
        description: ov
          ? ov.desc
          : trim(
              `${sub}: ${subProducts.length} ${plan.keyword} models in the ${cat.name} range. Compare sizes and prices with free shipping across Australia.`,
              158
            ),
        canonical: abs(path),
        image: abs(subProducts[0]?.image ?? DEFAULT_IMAGE),
        // thin lists (1-2 products) just duplicate the product pages: keep crawlable but out of the index
        robots: subProducts.length < 3 ? 'noindex, follow' : INDEX,
        ogType: 'website',
        h1: ov ? ov.h1 : h1,
        keyword: plan.keyword,
        lead: `${sub}: ${subProducts.length} models in our ${cat.name} range.`,
        jsonLd: [
          crumbs([['Home', '/'], ['Bar Fridges For Sale', '/shop'], [cat.name, `/category/${second}`], [sub, path]]),
          itemList(subProducts)
        ]
      };
    }
    return {
      title: plan.title,
      description: plan.description,
      canonical: abs(`/category/${second}`),
      image: abs(inCat[0]?.image ?? DEFAULT_IMAGE),
      robots: INDEX,
      ogType: 'website',
      h1: plan.h1,
      keyword: plan.keyword,
      lead: `${cat.description} ${inCat.length} models: ${cat.subcategories.join(', ')}.`,
      jsonLd: [
        crumbs([['Home', '/'], ['Bar Fridges For Sale', '/shop'], [cat.name, `/category/${second}`]]),
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: plan.h1,
          url: abs(`/category/${second}`),
          description: plan.description
        },
        itemList(inCat),
        ...(CATEGORY_GUIDES[second]
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: CATEGORY_GUIDES[second].faqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a }
                }))
              }
            ]
          : [])
      ]
    };
  }

  if (first === 'blog' && !second) {
    return {
      title: 'Bar Fridge Guides & Buying Advice | Blog',
      description:
        'Bar fridge buying guides for Australia: choosing the best bar fridge, outdoor fridge tropical ratings, bar freezers and running costs.',
      canonical: abs('/blog'),
      image: abs(DEFAULT_IMAGE),
      robots: INDEX,
      ogType: 'website',
      h1: 'Bar Fridge Guides & Buying Advice',
      keyword: 'best bar fridge',
      lead: 'Buying guides and advice on choosing the best bar fridge for your home bar, alfresco kitchen or venue.',
      jsonLd: [crumbs([['Home', '/'], ['Blog', '/blog']])]
    };
  }

  // /{slug} (post-name permalinks) plus legacy /product/{slug} and /blog/{slug}
  const slug = first === 'product' || first === 'blog' ? second : first;
  const product = slug ? PRODUCTS.find((p) => p.slug === slug) : undefined;
  if (product && first !== 'blog') {
    const cat = CATEGORIES.find((c) => c.id === product.category)!;
    const url = abs(`/${product.slug}`);
    const title =
      product.name.length + 23 <= 60 ? `${product.name} | Bar Fridges For Sale` : product.name.slice(0, 60).replace(/\s+\S*$/, '');
    const lead = firstSentence(product.description);
    const tail = ' Free shipping Australia-wide.';
    const desc = lead.length + tail.length <= 158 ? lead + tail : trim(lead, 158);
    const brand = product.name.split(' ')[0];
    return {
      title,
      description: desc,
      canonical: url,
      image: abs(product.image),
      robots: INDEX,
      ogType: 'product',
      h1: product.name,
      keyword: CATEGORY_SEO[product.category].keyword,
      lead: product.description,
      jsonLd: [
        crumbs([['Home', '/'], ['Bar Fridges For Sale', '/shop'], [cat.name, `/category/${product.category}`], [product.name, `/${product.slug}`]]),
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          sku: product.id,
          image: [product.image, ...product.galleryImages].filter(Boolean).map(abs),
          description: (() => {
            const long = longDescriptionFor(product.slug);
            return long ? `${product.description} ${richToText(long)}`.slice(0, 5000) : product.description;
          })(),
          brand: { '@type': 'Brand', name: brand },
          category: cat.name,
          offers: {
            '@type': 'Offer',
            url,
            priceCurrency: REPLY.currency.code,
            price: product.price.toFixed(2),
            availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            itemCondition: 'https://schema.org/NewCondition'
          }
        }
      ]
    };
  }

  const post = slug ? BLOG_POSTS.find((b) => b.slug === slug) : undefined;
  if (post) {
    const plan = BLOG_SEO[post.slug];
    const url = abs(`/${post.slug}`);
    const iso = new Date(`${post.date} UTC`);
    return {
      title: plan?.title ?? trim(post.title, 60),
      description: plan?.description ?? trim(post.excerpt, 158),
      canonical: url,
      image: abs(post.image),
      robots: INDEX,
      ogType: 'article',
      h1: post.title,
      keyword: plan?.keyword ?? 'bar fridge',
      lead: post.excerpt,
      jsonLd: [
        crumbs([['Home', '/'], ['Blog', '/blog'], [post.title, `/${post.slug}`]]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: trim(post.title, 110),
          description: plan?.description ?? post.excerpt,
          image: abs(post.image),
          author: { '@type': 'Person', name: post.author.replace(/\s*\(.*\)$/, '') },
          publisher: { '@type': 'Organization', name: SITE.name, url: ORIGIN },
          datePublished: isNaN(+iso) ? undefined : iso.toISOString().slice(0, 10),
          mainEntityOfPage: url
        }
      ]
    };
  }

  const st = STATIC[first];
  if (st) {
    const path = `/${first}`;
    return {
      title: st.title,
      description: st.description,
      canonical: abs(path),
      image: abs(DEFAULT_IMAGE),
      robots: first === 'privacy' || first === 'terms' ? 'noindex, follow' : INDEX,
      ogType: 'website',
      h1: st.h1,
      keyword: st.keyword,
      lead: st.description,
      jsonLd: [
        crumbs([['Home', '/'], [st.h1, path]]),
        ...(first === 'faq'
          ? [
              {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: FAQS_DATA.map((f) => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer }
                }))
              }
            ]
          : [])
      ]
    };
  }

  // Unknown path: the SPA shows the home page; don't index it as a separate URL.
  return { ...HOME, canonical: abs('/'), robots: NOINDEX };
}

// Every indexable route, used by the prerender + sitemap.
export function allRoutes(): string[] {
  const routes = ['/', '/shop', '/blog', '/about', '/contact', '/faq', '/shipping', '/refund', '/privacy', '/terms'];
  for (const c of CATEGORIES) {
    routes.push(`/category/${c.id}`);
    for (const s of c.subcategories) routes.push(`/category/${c.id}/${slugify(s)}`);
  }
  PRODUCTS.forEach((p) => routes.push(`/${p.slug}`));
  BLOG_POSTS.forEach((b) => routes.push(`/${b.slug}`));
  return routes;
}
