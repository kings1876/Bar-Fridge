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
const { seoForPath, allRoutes, PRODUCTS, CATEGORIES, CATEGORY_GUIDES, BLOG_POSTS, FAQS_DATA, SITE, slugify, richToHtml, longDescriptionFor } = await import(pathToFileURL(outfile).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const jsonSafe = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function head(m) {
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${esc(m.robots)}" />`,
    `<link rel="canonical" href="${esc(m.canonical)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
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

function fallback(route, m) {
  let extra = '';
  if (route === '/') {
    extra =
      CATEGORIES.map((c) => `<h2>${link(`/category/${c.id}`, c.name)}</h2><p>${esc(c.description)}</p>${li(c.subcategories.map((s) => [`/category/${c.id}/${slugify(s)}`, s]))}`).join('') +
      `<h2>Popular bar fridges</h2>${li(popular.map((p) => [`/${p.slug}`, p.name]))}` +
      `<h2>Buying guides</h2>${li(BLOG_POSTS.map((b) => [`/${b.slug}`, b.title]))}`;
  } else if (route === '/blog') {
    extra = BLOG_POSTS.map((b) => `<h2>${link(`/${b.slug}`, b.title)}</h2><p>${esc(b.excerpt)}</p>`).join('');
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
    const subs = route.split('/').length === 3 ? `<h2>Browse ${esc(cat.name)} by type</h2>${li(cat.subcategories.map((s) => [`/category/${id}/${slugify(s)}`, s]))}` : `<p>${link(`/category/${id}`, `All ${cat.name}`)}</p>`;
    extra = guide + subs + `<ul>${PRODUCTS.filter((p) => p.category === id && (route.split('/').length === 3 || `/category/${id}/${slugify(p.subcategory)}` === route)).map((p) => `<li>${link(`/${p.slug}`, p.name)}</li>`).join('')}</ul>`;
  } else if (m.ogType === 'product') {
    const p = PRODUCTS.find((x) => `/${x.slug}` === route);
    const long = longDescriptionFor(p.slug);
    extra = (long ? `<h2>About the ${esc(p.name.split(' ').slice(0, 2).join(' '))}</h2>${richToHtml(long)}` : '') +
      `<p>${link(`/category/${p.category}`, p.categoryName)} · ${link('/shop', 'Bar fridges for sale')}</p>`;
  }
  if (m.ogType === 'article') {
    const post = BLOG_POSTS.find((b) => `/${b.slug}` === route);
    if (post) extra = richToHtml(post.content);
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
    .replace('</head>', `    ${head(m)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${fallback(route, m)}</div>`);

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
  '<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />' +
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
