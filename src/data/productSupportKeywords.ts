import { PRODUCTS } from './products';
import { groupOf } from './productKeywords';

// Supporting keywords: four commercial-intent keywords per product, from the Semrush bank (docs/keywords/commercial.csv,
// all KD < 20). Each product group has its own pool; products rotate through it so neighbouring products get different
// sets, and a model whose capacity matches a "<n>l bar fridge" keyword in the bank gets that capacity keyword first.
const SUPPORT: Record<string, string[]> = {
  glass: ['glass door fridge', 'glass door fridges', 'glass door drinks fridge', 'fridge glass door', 'glass door drink refrigerator', 'glass door beverage fridge', 'bar fridge with glass door', 'glass front bar fridge', 'drinks fridge glass door', 'single glass door fridge', 'glass door beer fridge', 'clear door bar fridge', 'glass bar fridge', 'glass fronted bar fridge'],
  underBench: ['under bench fridge', 'under bench bar fridge', 'under counter bar fridge', 'undercounter bar fridge', 'bar fridge under bench', 'underbench bar fridge', 'under bench fridges', 'integrated under bench fridge', 'under counter bar fridges'],
  skinny: ['slimline bar fridge', 'slim bar fridge', 'narrow bar fridge', 'tall bar fridge', 'upright bar fridge', 'bar fridge dimensions', 'best bar fridge', 'drinks fridge', 'beverage fridge', 'quiet bar fridge'],
  retro: ['retro mini fridge', 'retro style mini fridge', 'mini fridge vintage', 'bar fridge retro', 'mini fridge retro', 'mini bar fridges', 'bar fridge mini fridge', 'black mini fridge'],
  novelty: ['mini bar fridges', 'beer fridge', 'drinks fridge', 'bar mini fridge', 'single door bar fridge', 'bar fridge single door', 'lockable bar fridge', 'mini fridge with lock'],
  stainless: ['stainless steel bar fridge', 'stainless bar fridge', 'bar fridge stainless steel', 'single door bar fridge', 'bar fridge single door', 'best bar fridge'],
  nightclub: ['beverage fridge', 'drinks fridge', 'bar fridge with glass door', 'mini bar fridges', 'beer fridge'],
  iceBox: ['bar cooler', 'beverage cooler', 'outdoor drinks fridge', 'outdoor beer fridge', 'bar fridge outdoor'],
  fridgeFreezer: ['bar fridge freezer combo', 'bar fridges with freezer', 'mini fridge and freezer', 'freezer bar fridge', 'bar fridge and freezer combo', 'bar fridge freezers'],
  wine: ['wine fridge', 'wine fridges', 'wine fridge dual zone', 'dual zone wine and beverage fridge', 'two zone wine fridge', 'wine and beer fridge', 'beer wine fridges', 'wine chiller fridge', 'under bench wine fridges', 'free standing wine fridge', 'dual zone wine coolers', 'wine cooler small'],
  outdoorSteel: ['outdoor fridge', 'outdoor fridges', 'outdoor refrigerator', 'weatherproof outdoor fridge', 'waterproof outdoor fridge', 'outdoor fridge cabinet', 'all weather outdoor fridge', 'best outdoor fridge'],
  outdoor: ['outdoor bar fridges', 'alfresco bar fridge', 'outdoor fridges australia', 'bar fridge outdoor', 'outdoor beverage fridge', 'outdoor drinks fridge', 'alfresco fridge', 'best outdoor bar fridge', 'weatherproof outdoor bar fridge', 'outdoor beer fridge', 'bar fridge alfresco', 'best alfresco bar fridge'],
  double: ['double door bar fridge', '2 door bar fridge', 'bar fridge 2 door', 'double bar fridge', 'two door bar fridge', 'bar fridge double door', 'double glass door bar fridge', '2 door beverage fridge', 'commercial bar fridge', '2 glass door fridge'],
  triple: ['3 door bar fridge', '3 door commercial fridge', 'commercial bar fridge', 'commercial bar fridges', 'commercial beer fridge', 'commercial drink fridges', '3 door bar fridges', 'commercial fridge for drinks'],
  freezerUpright: ['upright bar freezer', 'bar freezer upright', 'bar freezers', 'compact upright freezers', 'upright compact freezer', 'small compact freezer upright', 'commercial bar freezer', 'compact freezers'],
  freezerCompact: ['small bar freezer', 'mini bar freezer', 'bar freezers', 'freezer under bench', 'underbench freezers', 'under bench freezer australia', 'compact freezers', 'bar freezer upright'],
  freezerGlass: ['bar freezers', 'commercial bar freezer', 'compact freezers', 'small bar freezer', 'upright bar freezer', 'mini bar freezer'],
  freezer12v: ['outdoor freezer', 'mini bar freezer', 'compact freezers', 'small bar freezer', 'bar freezers']
};

const CAPACITY_KW: Record<number, string> = {
  43: '43l bar fridge', 50: '50l bar fridge', 65: '65l bar fridge', 70: '70l bar fridge', 75: '75l bar fridge', 80: '80 litre bar fridge',
  90: '90l bar fridge', 93: '93 litre bar fridge', 120: '120l bar fridge', 130: '130l bar fridge'
};

// Small pools can hold fewer than four: top up from broad commercial keywords so every product has exactly four.
const FILLERS = ['bar fridges australia', 'best bar fridge', 'bar fridge dimensions', 'energy efficient bar fridge'];

let cache: Map<string, string[]> | undefined;
function build(): Map<string, string[]> {
  const out = new Map<string, string[]>();
  const used: Record<string, number> = {};
  for (const p of PRODUCTS) {
    const g = groupOf(p);
    const pool = SUPPORT[g];
    const i = (used[g] = (used[g] ?? -1) + 1);
    const picks: string[] = [];
    const cap = CAPACITY_KW[p.capacityLitres];
    if (cap && !g.startsWith('freezer') && g !== 'wine') picks.push(cap);
    for (let j = 0; picks.length < 4 && j < pool.length * 2; j++) {
      const k = pool[(i * 3 + j) % pool.length];
      if (!picks.includes(k)) picks.push(k);
    }
    for (const extra of FILLERS) {
      if (picks.length >= 4) break;
      if (!picks.includes(extra)) picks.push(extra);
    }
    out.set(p.slug, picks.slice(0, 4));
  }
  return out;
}

export function supportingFor(slug: string): string[] {
  cache ??= build();
  return cache.get(slug) ?? [];
}

export const joinKeywords = (a: string[]) => (a.length > 1 ? `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}` : a[0] ?? '');
