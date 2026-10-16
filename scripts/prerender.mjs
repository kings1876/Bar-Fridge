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
const { seoForPath, allRoutes, PRODUCTS, CATEGORIES, CATEGORY_GUIDES } = await import(pathToFileURL(outfile).href);

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
function fallback(route, m) {
  let extra = '';
  if (route === '/' || route === '/shop') {
    extra = `<ul>${CATEGORIES.map((c) => `<li>${link(`/category/${c.id}`, c.name)}</li>`).join('')}</ul>` +
      (route === '/shop' ? `<ul>${PRODUCTS.slice(0, 48).map((p) => `<li>${link(`/${p.slug}`, p.name)}</li>`).join('')}</ul>` : '');
  } else if (route.startsWith('/category/')) {
    const id = route.split('/')[2];
    const g = route.split('/').length === 3 ? CATEGORY_GUIDES[id] : null;
    const guide = g
      ? `<h2>${esc(g.heading)}</h2>${g.intro.map((t) => `<p>${esc(t)}</p>`).join('')}` +
        g.sections.map((s) => `<h3>${esc(s.h)}</h3>${s.p.map((t) => `<p>${esc(t)}</p>`).join('')}`).join('') +
        `<h3>Frequently asked questions</h3>` + g.faqs.map((f) => `<h4>${esc(f.q)}</h4><p>${esc(f.a)}</p>`).join('')
      : '';
    extra = guide + `<ul>${PRODUCTS.filter((p) => p.category === id).map((p) => `<li>${link(`/${p.slug}`, p.name)}</li>`).join('')}</ul>`;
  } else if (m.ogType === 'product') {
    const p = PRODUCTS.find((x) => `/${x.slug}` === route);
    extra = `<p>${link(`/category/${p.category}`, p.categoryName)} · ${link('/shop', 'Bar fridges for sale')}</p>`;
  }
  return `<main data-prerender><h1>${esc(m.h1)}</h1><p>${esc(m.lead ?? m.description)}</p>${extra}</main>`;
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
  urls.map((u) => `  <url><loc>${esc(u.loc)}</loc><image:image><image:loc>${esc(u.image)}</image:loc></image:image></url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.rmSync(tmp, { recursive: true, force: true });
console.log(`prerender: ${allRoutes().length} routes, ${urls.length} in sitemap`);
if (warnings.length) console.warn('SEO warnings:\n  ' + warnings.join('\n  '));
