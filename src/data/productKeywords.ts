import type { Product } from '../types';
import { PRODUCTS } from './products';

// Every product gets its own primary keyword: a transactional keyword from the Semrush bank (docs/keywords/transactional.csv,
// all KD < 25) that matches the product type, combined with the brand and model code so no two products share one.
// Pools hold [keyword, monthly volume, KD]; products in a group rotate through their pool in catalogue order.
type Kw = [string, number, number];

const POOLS: Record<string, Kw[]> = {
  glass: [
    ['glass door fridge for sale', 90, 8], ['bar fridge glass door', 1000, 15], ['beverage fridge glass door', 110, 15],
    ['glass door refrigerators for sale', 70, 7], ['display fridges for sale', 210, 10], ['clear door fridge', 50, 7],
    ['glass door fridges for sale', 50, 7], ['drinks fridge for sale', 110, 12]
  ],
  underBench: [['bar fridge under counter', 170, 14], ['under counter fridge for sale', 50, 8]],
  skinny: [['display fridges for sale', 210, 10], ['beverage fridge for sale', 110, 16], ['drinks fridge for sale', 110, 12], ['fridge for beverage', 210, 6]],
  retro: [['retro bar fridge', 480, 11]],
  novelty: [['drinks fridge for sale', 110, 12], ['drink fridge for sale', 90, 24], ['fridge for beverage', 210, 6], ['beverage fridge for sale', 110, 16]],
  stainless: [['bar refrigerator price', 50, 17], ['bar fridges for sale', 590, 20]],
  nightclub: [['beverage fridge for sale', 110, 16]],
  iceBox: [['bar cooler outdoor', 20, 6]],
  fridgeFreezer: [['fridge and freezer on sale', 210, 14]],
  wine: [
    ['wine fridge for sale', 210, 15], ['wine fridges for sale', 140, 17], ['wine fridge sale', 210, 16], ['wine refrigerators for sale', 210, 21],
    ['buy wine fridge', 110, 21], ['wine coolers for sale', 70, 21], ['wine fridge on sale', 70, 13]
  ],
  outdoorSteel: [['stainless steel outdoor fridge', 40, 2], ['outdoor stainless steel refrigerator', 40, 5], ['outdoor refrigerator cabinet', 140, 7]],
  outdoor: [
    ['outdoor bar fridge', 1900, 8], ['outdoor bar refrigerator', 1300, 14], ['outdoor fridges for sale', 30, 8], ['outdoor fridge sale', 70, 11],
    ['outdoor bar with refrigerator', 320, 6], ['bar cooler outdoor', 20, 6]
  ],
  double: [['double door bar fridge for sale', 50, 11], ['2 door bar fridge for sale', 50, 4], ['2 door commercial fridge for sale', 70, 14]],
  triple: [['commercial bar fridge for sale', 210, 22], ['commercial fridge sales', 90, 23]],
  freezerUpright: [['upright freezers for sale', 390, 18], ['upright freezer for sale', 590, 17]],
  freezerCompact: [['small freezer for sale', 720, 20], ['mini freezer for sale', 260, 23]],
  freezerGlass: [['compact freezers for sale', 480, 17], ['freezers for sale', 2400, 22]],
  freezer12v: [['12 volt freezers australia', 40, 22]]
};

export function groupOf(p: Product): string {
  const n = p.name.toLowerCase();
  const sub = p.subcategory;
  if (/ice box|cooler box/.test(n) || sub === 'Ice Boxes & Coolers') return 'iceBox';
  if (p.category === 'bar-freezers' || /freezer/.test(n)) {
    if (/12v|camping|portable/.test(n + sub.toLowerCase())) return 'freezer12v';
    if (/upright/.test(n + sub.toLowerCase())) return 'freezerUpright';
    if (/glass/.test(n + sub.toLowerCase())) return 'freezerGlass';
    if (/with freezer/.test(sub.toLowerCase())) return 'fridgeFreezer';
    return 'freezerCompact';
  }
  if (/with freezer/.test(sub.toLowerCase())) return 'fridgeFreezer';
  if (p.category === 'wine-dual-zone') return 'wine';
  if (p.category === 'alfresco-outdoor') return /stainless/.test(n) ? 'outdoorSteel' : 'outdoor';
  if (p.category === 'double-triple-door') return /triple|3 door|three door/.test(n + sub.toLowerCase()) ? 'triple' : 'double';
  if (/retro/.test(n)) return 'retro';
  if (/under bench|under counter|underbench/.test(n)) return 'underBench';
  if (sub === 'Solid Stainless Steel Door') return 'stainless';
  if (sub === 'Night Club Multi-Colour LED') return 'nightclub';
  if (sub === 'Novelty & Branded Mini Bar') return 'novelty';
  if (sub === 'Skinny Upright') return 'skinny';
  return 'glass';
}

export interface ProductKeyword {
  /** Brand + model + transactional keyword, unique per product. */
  primary: string;
  /** The transactional keyword from the bank. */
  keyword: string;
  volume: number;
  kd: number;
  brand: string;
  model: string;
}

const brandOf = (p: Product) => p.name.split(' ')[0];
const modelOf = (p: Product) => p.name.split(' ')[1] ?? p.slug;

let cache: Map<string, ProductKeyword> | undefined;
function build(): Map<string, ProductKeyword> {
  const seen = new Set<string>();
  const used: Record<string, number> = {};
  const out = new Map<string, ProductKeyword>();
  for (const p of PRODUCTS) {
    const g = groupOf(p);
    const pool = POOLS[g];
    const i = (used[g] = (used[g] ?? -1) + 1);
    const [kw, volume, kd] = pool[i % pool.length];
    const brand = brandOf(p);
    const model = modelOf(p);
    const lead = kw.toLowerCase().startsWith(brand.toLowerCase()) ? '' : `${brand} `;
    let primary = `${lead}${model} ${kw}`;
    if (seen.has(primary.toLowerCase())) primary = `${lead}${model} ${p.capacityLitres}l ${kw}`;
    seen.add(primary.toLowerCase());
    out.set(p.slug, { primary, keyword: kw, volume, kd, brand, model });
  }
  return out;
}

export function keywordFor(slug: string): ProductKeyword | undefined {
  cache ??= build();
  return cache.get(slug);
}

export function allProductKeywords(): [string, ProductKeyword][] {
  cache ??= build();
  return [...cache.entries()];
}

/** Title case for display ("glass door fridge for sale" -> "Glass Door Fridge For Sale"). */
export const titleCase = (s: string) => s.replace(/\b([a-z])/g, (m) => m.toUpperCase());

/** Heading for the product's "About" section, carrying the primary keyword. */
export const aboutHeading = (slug: string) => {
  const k = keywordFor(slug);
  return k ? titleCase(k.primary) : '';
};
