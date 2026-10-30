// Checks the blog keyword rule against a finished build (run after `npm run build`):
// each mapped post has 1 primary + 3 to 5 supporting keywords, all from the commercial / transactional banks,
// every phrase appears in the published text, and the primary is in the SEO title and the H1.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').replace(/\s+/g, ' ').trim();
const bank = new Map();
for (const [file, kind, kd] of [['commercial', 'C', 20], ['transactional', 'T', 25]]) {
  for (const line of fs.readFileSync(path.join(root, 'docs/keywords', file + '.csv'), 'utf8').split(/\r?\n/).slice(1).filter(Boolean)) {
    const m = line.match(/^"([^"]*)",(\d+),(\d+)/);
    if (m && Number(m[3]) < kd && !bank.has(m[1].toLowerCase())) bank.set(m[1].toLowerCase(), kind);
  }
}
const map = JSON.parse(fs.readFileSync(path.join(root, 'docs/keywords/blog-post-keywords.json'), 'utf8'));
// Posts written under the category-and-shop linking rule.
const BLOG_LINK_RULE_FROM = ['beer-and-wine-fridge-guide', 'drinks-fridge-glass-door-guide', '70l-bar-fridge-guide'];
let problems = 0;
const bad = (m) => { problems++; console.log('  FAIL', m); };
for (const [slug, { primary, supporting }] of Object.entries(map)) {
  console.log(slug);
  const file = path.join(root, 'dist', slug, 'index.html');
  if (!fs.existsSync(file)) { bad('not built'); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const title = norm((html.match(/<title>([^<]*)/) || [])[1]);
  const h1 = norm((html.match(/<h1>([^<]*)/) || [])[1]);
  const body = norm(html.slice(html.indexOf('data-prerender-wrap')).replace(/<[^>]+>/g, ' '));
  if (supporting.length < 3 || supporting.length > 5) bad(`needs 3 to 5 supporting keywords, has ${supporting.length}`);
  for (const k of [primary, ...supporting]) {
    if (!bank.has(k)) bad(`"${k}" is not a commercial (KD<20) or transactional (KD<25) bank keyword`);
    if (!body.includes(norm(k))) bad(`"${k}" is not used in the text`);
  }
  if (!title.includes(norm(primary))) bad(`primary "${primary}" is not in the SEO title`);
  if (!h1.includes(norm(primary))) bad(`primary "${primary}" is not in the H1`);
  // Standing rule (30 Oct 2026): posts point mostly at product category pages and the shop page.
  if (BLOG_LINK_RULE_FROM.includes(slug)) {
    const wrap = html.slice(html.indexOf('data-prerender-wrap'));
    const hrefs = [...wrap.matchAll(/href="([^"#?]*)"/g)].map((m) => m[1]).filter((h) => h.startsWith('/'));
    const cat = hrefs.filter((h) => h.startsWith('/category/')).length;
    const shop = hrefs.filter((h) => h === '/shop' || h === '/shop/').length;
    const prod = hrefs.filter((h) => !h.startsWith('/category/') && !h.startsWith('/shop') && fs.existsSync(path.join(root, 'dist', h, 'index.html')) && h.split('-').length > 2 && !h.endsWith('-guide')).length;
    if (cat < 8) bad(`needs at least 8 links to category pages, has ${cat}`);
    if (shop < 3) bad(`needs at least 3 links to /shop, has ${shop}`);
    console.log(`  links: ${cat} category, ${shop} shop, ${prod} product`);
  }
}
console.log(problems ? `\n${problems} problem(s)` : '\nAll posts pass the keyword rule.');
process.exit(problems ? 1 : 0);
