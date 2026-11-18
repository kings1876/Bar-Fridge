// IndexNow: tells Bing (and Yandex, Naver, Seznam, Yep) about new or changed URLs the moment they are live.
// Run it AFTER a deploy has finished, because the search engine fetches public/<key>.txt to verify the key.
//   npm run indexnow                  submit sitemap URLs not submitted before (state: docs/indexnow-submitted.txt)
//   npm run indexnow -- --all         resubmit every sitemap URL
//   npm run indexnow -- <url> [...]   submit specific URLs (full URLs or paths such as /my-post)
// The key is public by design (it is published as /<key>.txt); it is not a secret.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const HOST = 'www.barfridgesforsale.com.au';
const ORIGIN = `https://${HOST}`;
const keyFile = fs.readdirSync(path.join(root, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (public/<32 hex>.txt) found');
const KEY = keyFile.replace(/\.txt$/, '');
const stateFile = path.join(root, 'docs', 'indexnow-submitted.txt');
const submitted = new Set(fs.existsSync(stateFile) ? fs.readFileSync(stateFile, 'utf8').split(/\r?\n/).filter(Boolean) : []);

const args = process.argv.slice(2);
const all = args.includes('--all');
const explicit = args.filter((a) => !a.startsWith('--')).map((a) => (a.startsWith('http') ? a : ORIGIN + (a.startsWith('/') ? a : '/' + a)));

let urls;
if (explicit.length) urls = explicit;
else {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  const live = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(webp|png|jpe?g|svg)$/i.test(u));
  urls = all ? live : live.filter((u) => !submitted.has(u));
}
if (!urls.length) { console.log('Nothing new to submit.'); process.exit(0); }

const keyCheck = await fetch(`${ORIGIN}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error(`Key file is not live at ${ORIGIN}/${KEY}.txt yet: deploy first.`);

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: urls.slice(0, 10000) })
});
console.log(`IndexNow: HTTP ${res.status} for ${urls.length} URL(s)`);
if (res.status === 200 || res.status === 202) {
  for (const u of urls) submitted.add(u);
  fs.writeFileSync(stateFile, [...submitted].sort().join('\n') + '\n');
} else {
  console.log(await res.text());
  process.exit(1);
}
