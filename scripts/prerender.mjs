// Post-build: writes dist/<route>/index.html for every indexable route with the correct
// <title>, description, canonical, Open Graph and JSON-LD (so crawlers and link previews
// don't depend on JS), a crawlable fallback inside #root, and dist/sitemap.xml.
// Run after `vite build`. Uses esbuild (already a dependency) to load the TS SEO module.
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import os from 'node:os';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-'));
const outfile = path.join(tmp, 'seo.mjs');

await build({
  entryPoints: [path.join(root, 'src/seo/seo.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile,
  logLevel: 'error'
});
const { seoForPath, allRoutes, PRODUCTS, CATEGORIES, CATEGORY_GUIDES, SUBCATEGORY_GUIDES, subStats, BLOG_POSTS, FAQS_DATA, SITE, slugify, richToHtml, longDescriptionFor, aboutHeading } = await import(pathToFileURL(outfile).href);

// Server-render the real page components for the static routes, so crawlers that don't run JS get exactly
// what visitors see (home, shop, blog index, about, contact, FAQ and the policy pages).
const ssrDir = path.join(root, 'node_modules', '.cache', 'bar-ssr');
fs.mkdirSync(ssrDir, { recursive: true });
const ssrFile = path.join(ssrDir, 'entry.mjs');
await build({
  entryPoints: [path.join(root, 'src/ssr/entry.tsx')],
  bundle: true, format: 'esm', platform: 'node', outfile: ssrFile, jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime', 'react-dom/server'],
  mainFields: ['module', 'main'],
  banner: { js: "import { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);" },
  logLevel: 'error'
});
const ssr = await import(pathToFileURL(ssrFile).href + '?t=' + Date.now());
function renderStatic(route) {
  globalThis.window = {
    location: { pathname: route, search: '' }, addEventListener() {}, removeEventListener() {}, scrollTo() {},
    history: { pushState() {}, replaceState() {} }, matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} })
  };
  globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
  globalThis.__SSR__ = true; // staged sections render immediately in the server copy
  try {
    // Decorative icon SVGs make up a large share of the markup; the pre-built copy keeps the text and drops them.
    return ssr.renderStatic(route)
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<\/?(div|span|button)(\s[^>]*)?>/g, '') // non-semantic wrappers carry no meaning for crawlers
      .replace(/ (class|style|type|disabled|tabindex|role|title|aria-[a-z-]+|data-[a-z-]+)="[^"]*"/g, '')
      .replace(/ (disabled|hidden)(?=[\s>])/g, '');
  } catch (e) { console.warn('SSR failed for ' + route + ': ' + e.message); return null; }
}

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'));
const entryFiles = new Set();
const collect = (key, seen = new Set(), out = new Set()) => {
  const c = manifest[key];
  if (!c || seen.has(key)) return out;
  seen.add(key);
  out.add(c.file);
  (c.imports || []).forEach((k) => collect(k, seen, out));
  return out;
};
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);
collect(entryKey).forEach((f) => entryFiles.add(f));
const PAGE_FILE = {
  home: 'src/pages/HomePage.tsx', shop: 'src/pages/ShopPage.tsx', product: 'src/pages/ProductDetailPage.tsx',
  blog: 'src/pages/BlogPage.tsx', about: 'src/pages/AboutPage.tsx', contact: 'src/pages/ContactPage.tsx',
  faq: 'src/pages/FAQPage.tsx', policies: 'src/pages/PoliciesPage.tsx'
};
function pageKind(route, m) {
  if (route === '/') return 'home';
  if (route === '/shop' || route.startsWith('/category/')) return 'shop';
  if (m.ogType === 'product') return 'product';
  if (route === '/blog' || m.ogType === 'article') return 'blog';
  if (['/about', '/contact', '/faq'].includes(route)) return route.slice(1);
  return 'policies';
}
function preloadHints(route, m) {
  const key = PAGE_FILE[pageKind(route, m)];
  const files = [...collect(key)].filter((f) => !entryFiles.has(f));
  const links = files.map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`);
  const kind = pageKind(route, m);
  if (['home', 'product', 'shop'].includes(kind) && m.image) {
    const img = m.image.replace(/^https?:\/\/[^/]+/, '');
    links.push(`<link rel="preload" as="image" href="${esc(img)}" fetchpriority="high" />`);
  }
  return links.join('\n    ');
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonSafe = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function head(m) {
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${esc(m.robots)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    // one market, one language: each indexable page declares itself as the en-AU version and the default
    ...(m.robots.startsWith('index') ? [`<link rel="alternate" hreflang="en-AU" href="${esc(m.canonical)}" />`, `<link rel="alternate" hreflang="x-default" href="${esc(m.canonical)}" />`] : []),
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
    `<meta property="og:locale" content="en_AU" />`,
    `<meta property="og:url" content="${esc(m.canonical)}" />`,
    `<meta property="og:image" content="${esc(m.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(m.image)}" />`,
    ...m.jsonLd.map((o) => `<script type="application/ld+json" data-seo="1">${jsonSafe(o)}</script>`)
  ].join('\n    ');
}

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const li = (items) => `<ul>${items.map(([h, t]) => `<li>${link(h, t)}</li>`).join('')}</ul>`;
const NAV = `<nav aria-label="Main">${li([['/', 'Home'], ['/shop', 'Shop bar fridges'], ...CATEGORIES.map((c) => [`/category/${c.id}`, c.name]), ['/blog', 'Guides and advice']])}</nav>`;
const FOOT = `<footer><nav aria-label="Footer">${li([['/about', 'About us'], ['/contact', 'Contact'], ['/faq', 'FAQ'], ['/shipping', 'Shipping'], ['/refund', 'Returns and refunds'], ['/privacy', 'Privacy policy'], ['/terms', 'Terms and conditions'], ['/blog', 'Blog']])}</nav><p>${esc(SITE.name)} · <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p></footer>`;
const popular = PRODUCTS.filter((p) => p.badge === 'Popular' || p.badge === 'Best Value');

// Every product links to its neighbours by capacity inside its category (a ring, so none is left
// with a single inbound link), and every guide links to the next two guides plus two tag-related ones.
function relatedProducts(p) {
  const group = PRODUCTS.filter((x) => x.category === p.category && x.subcategory !== 'Ice Boxes & Coolers' === (p.subcategory !== 'Ice Boxes & Coolers'))
    .sort((a, b) => a.capacityLitres - b.capacityLitres || a.slug.localeCompare(b.slug));
  const i = group.findIndex((x) => x.slug === p.slug);
  const picks = new Set();
  for (const k of [1, -1, 2, -2]) { const x = group[(i + k + group.length * 2) % group.length]; if (x && x.slug !== p.slug) picks.add(x); }
  const portable = (x) => /ice box|portable|camping/i.test(x.name);
  if (portable(p)) PRODUCTS.filter((x) => portable(x) && x.slug !== p.slug).forEach((x) => picks.add(x));
  return [...picks];
}
function relatedGuides(post) {
  const i = BLOG_POSTS.findIndex((b) => b.slug === post.slug);
  const picks = new Map();
  [1, 2].forEach((k) => { const x = BLOG_POSTS[(i + k) % BLOG_POSTS.length]; picks.set(x.slug, x); });
  BLOG_POSTS.filter((b) => b.slug !== post.slug && !picks.has(b.slug))
    .map((b) => ({ b, n: b.tags.filter((tg) => post.tags.includes(tg)).length }))
    .sort((a, b) => b.n - a.n).slice(0, 2).forEach(({ b }) => picks.set(b.slug, b));
  return [...picks.values()].filter((x) => x.slug !== post.slug);
}

function fallback(route, m) {
  let extra = '';
  if (route === '/') {
    extra =
      CATEGORIES.map((c) => `<h2>${link(`/category/${c.id}`, c.name)}</h2><p>${esc(c.description)}</p>${li(c.subcategories.map((s) => [`/category/${c.id}/${slugify(s)}`, s]))}`).join('') +
      `<h2>Popular bar fridges</h2>${li(popular.map((p) => [`/${p.slug}`, p.name]))}` +
      `<h2>Buying guides</h2>${li(BLOG_POSTS.map((b) => [`/${b.slug}`, b.title]))}`;
  } else if (route === '/blog') {
    extra = BLOG_POSTS.map((b) => `<h2>${link(`/${b.slug}`, b.title)}</h2><p>${esc(b.excerpt)}</p>`).join('');
  } else if (route === '/shipping' || route === '/refund' || route === '/contact' || route === '/about') {
    const cats = { '/shipping': ['Shipping & Delivery'], '/refund': ['Warranty & Returns'], '/contact': ['Ordering & Payment'], '/about': ['Product & Technical'] }[route];
    const faqs = FAQS_DATA.filter((f) => cats.includes(f.category));
    extra =
      (route === '/contact' ? `<p>Email us at <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> for stock, delivery and order help.</p>` : '') +
      (route === '/about' ? `<h2>What we sell</h2>${CATEGORIES.map((c) => `<h3>${link(`/category/${c.id}`, c.name)}</h3><p>${esc(c.description)}</p>`).join('')}` : '') +
      `<h2>Common questions</h2>` + faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('') +
      `<p>More answers on our ${link('/faq', 'FAQ page')}.</p>`;
  } else if (route === '/faq') {
    extra = FAQS_DATA.map((f) => `<h2>${esc(f.question)}</h2><p>${esc(f.answer)}</p>`).join('');
  } else if (route === '/shop') {
    extra = li(CATEGORIES.map((c) => [`/category/${c.id}`, c.name])) + li(PRODUCTS.slice(0, 48).map((p) => [`/${p.slug}`, p.name]));
  } else if (route.startsWith('/category/')) {
    const id = route.split('/')[2];
    const g = route.split('/').length === 3 ? CATEGORY_GUIDES[id] : null;
    const guide = g
      ? `<h2>${esc(g.heading)}</h2>${g.intro.map((t) => `<p>${esc(t)}</p>`).join('')}` +
        g.sections.map((s) => `<h3>${esc(s.h)}</h3>${s.p.map((t) => `<p>${esc(t)}</p>`).join('')}`).join('') +
        `<h3>Frequently asked questions</h3>` + g.faqs.map((f) => `<h4>${esc(f.q)}</h4><p>${esc(f.a)}</p>`).join('')
      : '';
    const cat = CATEGORIES.find((c) => c.id === id);
    let subGuide = '';
    if (route.split('/').length === 4) {
      const subName = cat.subcategories.find((s) => slugify(s) === route.split('/')[3]);
      const sg = subName && SUBCATEGORY_GUIDES[subName];
      if (sg) {
        const items = PRODUCTS.filter((p) => p.category === id && p.subcategory === subName);
        subGuide = `<h2>${esc(sg.heading)}</h2><p>${esc(subStats(items, sg.showRatings !== false))}</p>${[...sg.intro, ...(sg.extra || [])].map((t) => `<p>${esc(t)}</p>`).join('')}<h3>What to look for</h3>${sg.points.map((p) => `<p>• ${esc(p)}</p>`).join('')}${(sg.faqs || []).length ? `<h3>Frequently asked questions</h3>${sg.faqs.map((f) => `<h4>${esc(f.q)}</h4><p>${esc(f.a)}</p>`).join('')}` : ''}${li(sg.links.map((l) => [l.path, l.label]))}`;
      }
    }
    const subs = route.split('/').length === 3 ? (cat.subcategories.length ? `<h2>Browse ${esc(cat.name)} by type</h2>${li(cat.subcategories.map((s) => [`/category/${id}/${slugify(s)}`, s]))}` : '') : `<p>${link(`/category/${id}`, `All ${cat.name}`)}</p><h2>Other types</h2>${li(cat.subcategories.filter((s) => `/category/${id}/${slugify(s)}` !== route).map((s) => [`/category/${id}/${slugify(s)}`, s]))}`;
    extra = guide + subGuide + subs + `<ul>${PRODUCTS.filter((p) => p.category === id && (route.split('/').length === 3 || `/category/${id}/${slugify(p.subcategory)}` === route)).map((p) => `<li>${link(`/${p.slug}`, p.name)}</li>`).join('')}</ul>`;
  } else if (m.ogType === 'product') {
    const p = PRODUCTS.find((x) => `/${x.slug}` === route);
    const long = longDescriptionFor(p.slug);
    extra = (long ? `<h2>${esc(aboutHeading(p.slug))}</h2>${richToHtml(long)}` : '') +
      `<p>${link(`/category/${p.category}`, p.categoryName)}${CATEGORIES.find((c) => c.id === p.category)?.subcategories.includes(p.subcategory) ? ` · ${link(`/category/${p.category}/${slugify(p.subcategory)}`, p.subcategory)}` : ''} · ${link('/shop', 'Bar fridges for sale')}</p>` +
      `<h2>Similar bar fridges</h2>${li(relatedProducts(p).map((x) => [`/${x.slug}`, x.name]))}`;
  }
  if (m.ogType === 'article') {
    const post = BLOG_POSTS.find((b) => `/${b.slug}` === route);
    if (post) extra = richToHtml(post.content) + `<h2>More guides</h2>${li(relatedGuides(post).map((b) => [`/${b.slug}`, b.title]))}`;
  }
  if (ssr.SSR_ROUTES.includes(route)) {
    const html = renderStatic(route);
    if (html) return `${NAV}<main data-prerender>${html}</main>${FOOT}`;
  }
  return `${NAV}<main data-prerender><h1>${esc(m.h1)}</h1>${m.ogType === 'article' ? '' : `<p>${esc(m.lead ?? m.description)}</p>`}${extra}</main>${FOOT}`;
}

const warnings = [];
const urls = [];
for (const route of allRoutes()) {
  const m = seoForPath(route);
  if (m.title.length > 60) warnings.push(`title ${m.title.length}>60 ${route}: ${m.title}`);
  if (m.description.length < 70 || m.description.length > 160) warnings.push(`desc ${m.description.length} ${route}`);

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace(/\s*<meta name="description"[^>]*>/, '')
    .replace(/\s*<meta property="og:[^>]*>/g, '')
    .replace(/\s*<meta name="twitter:card"[^>]*>/, '')
    .replace('</head>', `    ${head(m)}\n    ${preloadHints(route, m)}\n    <noscript><style>[data-prerender-wrap]{position:static!important;width:auto!important;height:auto!important;margin:0!important;overflow:visible!important;clip:auto!important;white-space:normal!important;content-visibility:visible!important}</style></noscript>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"><div data-prerender-wrap style="position:absolute;width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;content-visibility:hidden;contain-intrinsic-size:1px 1px">${fallback(route, m)}</div></div>`);

  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  if (m.robots.startsWith('index')) urls.push({ loc: m.canonical, image: m.image });
}

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n` +
  urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><image:image><image:loc>${esc(u.image)}</image:loc></image:image></url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// llms.txt: a plain-text map of the site for AI assistants (generated from the same data as the pages).
const LL = SITE.origin;
const llms = [
  '# ' + SITE.name,
  '',
  '> Australian online store for outdoor and alfresco bar fridges, commercial bar fridges, wine and dual zone beverage fridges and bar freezers. Every product page lists capacity, dimensions, sound and energy ratings and warranty. Prices are in AUD, shipping is free across Australia, and ordering is by online order form with payment by cryptocurrency (Bitcoin, USDT, Ethereum) at 10% off, or by bank transfer, PayID or Osko.',
  '',
  '## Shop',
  '- [Shop all bar fridges](' + LL + '/shop): the full range with filters by category',
  ...CATEGORIES.map((c) => '- [' + c.name + '](' + LL + '/category/' + c.id + '): ' + c.description),
  '',
  '## Buying guides',
  ...BLOG_POSTS.map((b) => '- [' + b.title + '](' + LL + '/' + b.slug + '): ' + b.excerpt),
  '',
  '## Help and policies',
  '- [FAQ](' + LL + '/faq): ordering, payment, delivery, warranty and technical questions',
  '- [Shipping](' + LL + '/shipping): free Australia-wide freight and delivery details',
  '- [Returns and refunds](' + LL + '/refund): change of mind period and warranty',
  '- [Contact](' + LL + '/contact): ' + SITE.email,
  '- [About](' + LL + '/about): about ' + SITE.name,
  '',
  '## Optional',
  '- [Sitemap](' + LL + '/sitemap.xml): every indexable page',
  ''
].join('\n');
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

// Real 404 page (served with status 404 for any URL that has no prerendered file).
const notFoundLinks = li([
  ['/', 'Home'],
  ['/shop', 'Shop bar fridges'],
  ...CATEGORIES.map((c) => ['/category/' + c.id, c.name]),
  ['/blog', 'Guides and advice'],
  ['/contact', 'Contact us']
]);
fs.writeFileSync(
  path.join(dist, '404.html'),
  '<!doctype html><html lang="en-AU"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />' +
    '<title>Page not found | ' + esc(SITE.name) + '</title><meta name="robots" content="noindex, follow" />' +
    '<style>body{font-family:system-ui,Arial,sans-serif;max-width:720px;margin:12vh auto;padding:0 20px;color:#0f172a;line-height:1.6}a{color:#0284c7}li{margin:.3em 0}</style></head>' +
    '<body><h1>Page not found</h1><p>Sorry, we could not find that page. Try one of these instead:</p>' + notFoundLinks + '</body></html>'
);

// App shell for client-only routes (/admin, /order/*): the original SPA HTML, not indexable.
fs.writeFileSync(
  path.join(dist, 'app-shell.html'),
  template.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow" />')
);

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`prerender: ${allRoutes().length} routes, ${urls.length} in sitemap`);
if (warnings.length) console.warn('SEO warnings:\n  ' + warnings.join('\n  '));
