import { Product } from '../types';
import { PRODUCTS } from './products';
import { FAMILY_NOTES } from './productFamilyNotes';

// Spec-driven long descriptions for products without a hand-written one.
// Every claim comes from the product's own data (features, specs, name, subcategory);
// wording is varied by a stable hash of the slug so sibling products don't read identically.
// Markup: "### h3", "- bullet", "[label](/path)".

const hash = (s: string) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
};
const pick = <T,>(arr: T[], p: Product, salt = 0) => arr[(hash(p.slug) + salt * 7) % arr.length];

const art = (n: number) => (n === 8 || n === 11 || n === 18 || (n >= 80 && n <= 89) || (n >= 800 && n <= 899) ? 'an' : 'a');
const model = (p: Product) => p.specs['Model'] ?? p.id.toUpperCase();
const brand = (p: Product) => p.specs['Brand'] ?? p.name.split(' ')[0];
const short = (p: Product) => `${brand(p)} ${model(p)}`;
const dims = (p: Product) => `${p.dimensions.width} mm wide, ${p.dimensions.depth} mm deep and ${p.dimensions.height} mm high`;
const capText = (p: Product) => p.specs['Gross Capacity']?.match(/\((.*?)\)/)?.[1] ?? '';
const suit = (p: Product) => (p.specs['Suitability'] ?? 'Indoor').toLowerCase();
const has = (p: Product, re: RegExp) => p.features.some((f) => re.test(f));
const nameHas = (p: Product, re: RegExp) => re.test(p.name);
const warranty = (p: Product) => p.specs['Warranty'] ?? '2 Years Parts & Labour';

const sizeClass = (l: number) =>
  l < 50 ? 'a compact' : l < 100 ? 'a small' : l < 170 ? 'a mid-size' : l < 280 ? 'a large' : 'an extra large';

const CAT_LABEL: Record<string, string> = {
  'single-door': 'single door bar fridges',
  'double-triple-door': 'double and triple door bar fridges',
  'alfresco-outdoor': 'alfresco and outdoor bar fridges',
  'wine-dual-zone': 'wine and dual zone beverage fridges',
  'bar-freezers': 'bar freezers'
};

function guideLinks(p: Product): string {
  const links: string[] = [];
  if (p.category === 'alfresco-outdoor') links.push('[outdoor kitchen fridge guide](/outdoor-kitchen-fridge-guide)');
  else if (p.category === 'bar-freezers') links.push('[bar fridge vs bar freezer guide](/bar-fridge-vs-bar-freezer-comparison)');
  else if (p.category === 'wine-dual-zone') links.push('[beer fridge guide](/beer-fridge-guide)');
  else if (p.category === 'double-triple-door') links.push('[guide to cutting bar fridge running costs](/energy-efficiency-bar-fridge-power-bills)');
  else if (p.subcategory === 'Novelty & Branded Mini Bar' && nameHas(p, /retro|vintage/i)) links.push('[retro bar fridge guide](/retro-bar-fridge-guide)');
  else if (p.subcategory === 'Glass Door Display') links.push('[glass door fridge guide](/glass-door-fridge-guide)');
  else links.push('[bar fridge buying guide](/top-bar-fridges-for-sale-australia-guide)');
  if (nameHas(p, /front venting|under bench|underbench/i) && p.category !== 'bar-freezers') links.push('[built in bar fridge guide](/built-in-bar-fridge-guide)');
  else if (has(p, /quiet/i)) links.push('[quiet bar fridge guide](/quiet-bar-fridge-guide)');
  return links.slice(0, 2).join(' and our ');
}

// Products that share brand, capacity, dimensions and subcategory are the same cabinet in different versions.
const sig = (p: Product) => [brand(p), p.capacityLitres, p.dimensions.width, p.dimensions.depth, p.dimensions.height, p.subcategory].join('|');
const GENERIC = new Set(['bar', 'fridge', 'fridges', 'mini', 'litre', 'door', 'the', 'and', 'with', 'for', 'a']);
const toks = (p: Product) =>
  p.name.split(/\s+/).filter((w) => w && w !== brand(p) && w !== model(p) && !GENERIC.has(w.toLowerCase()));
const familyOf = (p: Product) => PRODUCTS.filter((x) => sig(x) === sig(p));

/** What sets this version apart: name words not shared by every member of its family. */
function distinct(p: Product): string {
  const fam = familyOf(p);
  if (fam.length < 2) return '';
  const common = toks(fam[0]).filter((w) => fam.every((x) => toks(x).includes(w)));
  return toks(p).filter((w) => !common.includes(w)).slice(0, 6).join(' ');
}
/** Short reference used in copy instead of repeating the full product name. */
const ref = (p: Product) => {
  const d = distinct(p);
  return `${model(p)}${d ? ` (${d})` : ''}`;
};

function intro(p: Product): string {
  const s = short(p);
  const cap = p.capacityLitres;
  const cans = capText(p);
  const trop = p.tropicalRated ? ' with a tropical rating' : '';
  const t = (variants: string[]) => pick(variants, p);

  switch (p.subcategory) {
    case 'Glass Door Display':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre glass door bar fridge${trop}, catalogued as ${ref(p)}. The glass front shows off your drinks and saves opening the door to check what is inside.`,
        `Looking for ${sizeClass(cap)} glass door bar fridge? The ${s} offers ${cap} litres${cans ? ` (${cans})` : ''} behind a see-through door${trop}.`,
        `${s}: ${sizeClass(cap)} ${cap} litre glass door bar fridge for home bars, entertaining areas and small venues, catalogued as ${ref(p)}.`
      ]);
    case 'Novelty & Branded Mini Bar':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre novelty mini bar fridge, catalogued as ${ref(p)}. It turns a drinks fridge into a feature for a man cave, games room, shed or home bar.`,
        `Want a fridge with personality? The ${s} is ${sizeClass(cap)} ${cap} litre branded mini bar fridge${cans ? ` that holds ${cans}` : ''}, catalogued as ${ref(p)}.`,
        `${s}: a themed ${cap} litre bar fridge for people who want their drinks fridge to be a talking point. Catalogue reference: ${ref(p)}.`
      ]);
    case 'Skinny Upright':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre skinny upright bar fridge, catalogued as ${ref(p)}. Its slim ${p.dimensions.width} mm width gives you generous storage in a narrow space.`,
        `Short on floor space? The ${s} is ${sizeClass(cap)} upright bar fridge only ${p.dimensions.width} mm wide${cans ? `, holding ${cans}` : ''}.`,
        `${s}: ${cap} litres of upright storage in a slim cabinet, catalogued as ${ref(p)}. A good fit for narrow gaps in entertaining areas, garages and games rooms.`
      ]);
    case 'Solid Stainless Steel Door':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre bar fridge with a solid stainless steel door, catalogued as ${ref(p)}. It suits spots where you want a clean, uniform look rather than a display.`,
        `${s}: ${sizeClass(cap)} ${cap} litre bar fridge with a solid stainless door${trop}, for people who prefer drinks kept out of sight.`,
        `Prefer a solid door? The ${s} offers ${cap} litres${cans ? ` (${cans})` : ''} in a stainless steel cabinet, catalogued as ${ref(p)}.`
      ]);
    case 'Night Club Multi-Colour LED':
      return `The ${s} is ${art(cap)} ${cap} litre bar fridge with multi-colour LED styling, catalogued as ${ref(p)}. It is aimed at bars, game rooms and entertaining areas where the lighting is part of the look.`;
    case 'Hinged Double Glass Door':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre double glass door bar fridge, catalogued as ${ref(p)}. The hinged doors and large capacity suit busy bars, function rooms and serious home bars.`,
        `Need more capacity than a single door fridge? The ${s} gives you ${cap} litres${cans ? ` (${cans})` : ''} behind two glass doors${trop}.`,
        `${s}: ${sizeClass(cap)} ${cap} litre twin glass door bar fridge for venues and home bars that need a lot of cold drinks on display.`
      ]);
    case 'Triple Door Commercial':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre triple door commercial bar fridge, catalogued as ${ref(p)}. With three doors and a very large capacity, it is built for venues, clubs and large entertaining areas.`,
        `${s}: ${cap} litres across three doors${cans ? `, holding ${cans}` : ''}. A back bar cooler for places that stock a wide range of drinks.`,
        `Running a busy bar? The ${s} is ${sizeClass(cap)} three door commercial bar fridge${trop}, catalogued as ${ref(p)}.`
      ]);
    case 'Sliding Double Door':
      return `The ${s} is ${art(cap)} ${cap} litre double door bar fridge with space-saving sliding doors, catalogued as ${ref(p)}. Sliding doors suit tight service areas where a swinging door would be in the way.`;
    case 'Under Bench Dual Zone':
    case 'Dual Zone Wine & Beer':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre dual zone beverage fridge, catalogued as ${ref(p)}. Two independent temperature zones let you keep wine and beer at different temperatures in one cabinet.`,
        `${s}: ${sizeClass(cap)} ${cap} litre wine and beverage fridge${cans ? ` that holds ${cans}` : ''}, with separate temperature control for each zone.`
      ]);
    case 'Wine Only Cabinet':
      return `The ${s} is ${art(cap)} ${cap} litre wine cabinet, catalogued as ${ref(p)}${cans ? `, holding ${cans}` : ''}. It is built to keep wine at a steady, cellar-like temperature.`;
    case '316 Marine Grade Stainless':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre outdoor bar fridge in 316 marine grade stainless steel, catalogued as ${ref(p)}. Marine grade steel resists salt and moisture better than the 304 grade used on many indoor appliances.`,
        `${s}: ${sizeClass(cap)} ${cap} litre alfresco bar fridge in marine grade stainless steel${cans ? `, holding ${cans}` : ''}, for patios, outdoor kitchens and coastal homes.`
      ]);
    case 'IP-Rated Weatherproof':
      return t([
        `The ${s} is ${art(cap)} ${cap} litre weatherproof outdoor bar fridge, catalogued as ${ref(p)}. It is IP rated for outdoor use, so it is designed to handle the dust and moisture an alfresco area throws at it.`,
        `${s}: ${sizeClass(cap)} ${cap} litre outdoor bar fridge with weatherproof construction${cans ? `, holding ${cans}` : ''}.`
      ]);
    case 'Compact Underbench Freezer':
      return `The ${s} is ${art(cap)} ${cap} litre compact under bench freezer, catalogued as ${ref(p)}. It gives a home bar or kitchen extra frozen storage for ice, mixers and food in a small footprint.`;
    case 'Glass Door Display Freezer':
      return `The ${s} is ${art(cap)} ${cap} litre glass door display freezer, catalogued as ${ref(p)}. The glass door shows the contents, which suits ice cream, frozen treats and cafe or bar display.`;
    case 'Commercial Upright Freezer':
      return `The ${s} is ${art(cap)} ${cap} litre upright freezer, catalogued as ${ref(p)}. An upright layout gives you a lot of frozen storage for the floor space it takes.`;
    case 'Portable 12V Camping Freezer':
      return `The ${s} is ${art(cap)} ${cap} litre portable freezer, catalogued as ${ref(p)}. It is built for camping, caravans and travel where you need to keep food frozen away from mains power.`;
    default:
      return `The ${s} is ${art(cap)} ${cap} litre ${p.categoryName.toLowerCase().replace(/s$/, '')}, catalogued as ${ref(p)}.`;
  }
}

const FEATURE_VARIANTS: [RegExp, string[]][] = [
  [/reversible door hinge/i, ['Reversible door hinge for flexible installation.', 'The door hinge can be reversed to suit your layout.', 'Reversible door hinge, so the door can open from the side that suits your space.']],
  [/^quiet running compressor/i, ['Quiet running compressor.', 'A quiet running compressor keeps operating noise down.', 'Quiet compressor design.']],
  [/heated glass/i, ['Heated glass door prevents external condensation.', 'Heated glass keeps the outside of the door clear of condensation.', 'The glass door is heated to prevent external condensation.']],
  [/triple glazed/i, ['Triple glazed glass for thermal efficiency.', 'Three layers of glass improve thermal efficiency.', 'Triple glazing helps the door hold temperature.']],
  [/double glazed/i, ['Double glazed glass reduces condensation.', 'Two layers of glass help limit condensation.']],
  [/tropical rated/i, ['Tropical rated for Australian climates.', 'Tropical rating for hot Australian conditions.', 'Built with a tropical rating for Australian climates.']],
  [/energy efficient compressor/i, ['Energy efficient compressor.', 'An energy efficient compressor helps manage running costs.']],
  [/led interior/i, ['LED interior illumination.', 'Interior LED lighting makes the contents easy to see.']],
  [/lockable/i, ['Lockable door for security.', 'The door locks, which is handy in shared or commercial spaces.']],
  [/independent dual/i, ['Independent dual temperature zones.', 'Two separate temperature zones, each set on its own.']],
  [/sliding door/i, ['Space-saving sliding door(s).', 'Sliding doors save space where a swing door would be in the way.']]
];

function featureBullet(p: Product, f: string, i: number): string {
  const holds = f.match(/^Holds up to (.*)$/i);
  if (holds) {
    return '- ' + pick([f.replace(/\.$/, '') + '.', `Fits up to ${holds[1].replace(/\.$/, '')}.`, `Storage for up to ${holds[1].replace(/\.$/, '')}.`], p, i) + '';
  }
  for (const [re, vs] of FEATURE_VARIANTS) if (re.test(f)) return '- ' + pick(vs, p, i);
  return `- ${f.replace(/\.$/, '')}.`;
}

/** Stable rank of this product by capacity within its subcategory (1 = largest). */
function rankInfo(p: Product) {
  const group = PRODUCTS.filter((x) => x.subcategory === p.subcategory);
  const sorted = [...group].sort((a, b) => b.capacityLitres - a.capacityLitres || a.slug.localeCompare(b.slug));
  return { rank: sorted.findIndex((x) => x.slug === p.slug) + 1, total: group.length, min: sorted[sorted.length - 1].capacityLitres, max: sorted[0].capacityLitres };
}
const ord = (n: number) => { const v = n % 100; return n + (['th', 'st', 'nd', 'rd'][(v - 20) % 10] || ['th', 'st', 'nd', 'rd'][v] || 'th'); };

function rankSentence(p: Product): string {
  const r = rankInfo(p);
  const sub = p.subcategory.toLowerCase();
  if (r.total < 2) return '';
  const where =
    r.rank === 1 ? 'the largest' : r.rank === r.total ? 'the smallest' : `the ${ord(r.rank)} largest of ${r.total}`;
  return pick(
    [
      `At ${p.capacityLitres} litres it is ${where} in our ${sub} range, which runs from ${r.min} to ${r.max} litres.`,
      `In our ${sub} range (${r.min} to ${r.max} litres across ${r.total} models) this one is ${where} by capacity.`,
      `For comparison, our ${sub} models span ${r.min} to ${r.max} litres, and this ${p.capacityLitres} litre unit is ${where}.`
    ],
    p,
    5
  );
}

function bullets(p: Product): string[] {
  const out: string[] = [];
  p.features.forEach((f, i) => out.push(featureBullet(p, f, i)));
  const cans = capText(p);
  if (cans && !p.features.some((f) => /^Holds/i.test(f))) out.push(`- Capacity: ${p.capacityLitres} litres (${cans}).`);
  const tr = p.temperatureRange.replace(/\s*\|\s*/g, '; ');
  out.push(pick([`- Temperature range: ${tr}.`, `- Operating range: ${tr}.`, `- Temperature: ${tr}.`], p, 2));
  const stars = `${p.energyStars} star energy rating`;
  const db = `${p.noiseLevelDb} dB sound rating`;
  out.push(pick([`- ${stars} and ${db}.`, `- ${db} and ${art(p.energyStars)} ${stars}.`, `- Rated at ${p.energyStars} energy stars and ${p.noiseLevelDb} dB.`], p, 3));
  out.push(`- Listed for ${suit(p)} installation${p.tropicalRated && !p.features.some((f) => /tropical/i.test(f)) ? ', with a tropical rating' : ''}.`);
  if (p.finish && !/^Cabinet Finish$/i.test(p.finish) && !/^undefined$/.test(p.finish)) out.push(`- Finish: ${p.finish.replace(/\s*Finish$/i, '').trim().toLowerCase() || p.finish}.`);
  // rotate order so bullets do not line up identically across siblings
  const k = hash(p.slug) % out.length;
  return [...out.slice(k), ...out.slice(0, k)];
}

function sizeFit(p: Product): string {
  const d = dims(p);
  const g = guideLinks(p);
  const front = nameHas(p, /front venting|front breathing/i);
  const under = nameHas(p, /under bench|underbench/i);
  const parts: string[] = [];
  parts.push(
    pick(
      [
        `The cabinet measures ${d}.`,
        `Exterior dimensions are ${d}.`,
        `It is ${d}.`
      ],
      p,
      1
    )
  );
  if (front) parts.push('The listing describes it as front venting, which is the feature to look for if you plan to enclose it in joinery.');
  else if (under) parts.push('It is described as an under bench model, so measure your opening carefully.');
  else if (p.category === 'bar-freezers' && p.subcategory === 'Portable 12V Camping Freezer')
    parts.push('Check the power requirements for your vehicle and consider a battery setup for long trips.');
  else if (p.category === 'alfresco-outdoor') parts.push('Install it under cover, out of direct rain, sprinklers and full midday sun.');
  else if (p.category === 'double-triple-door') parts.push('Check the width against your bar or service area, and allow for the door swing and ventilation.');
  else if (p.tropicalRated) parts.push('Because it is tropical rated, it is designed to keep cooling in warm Australian rooms.');
  else parts.push('It is intended for indoor use, so keep it out of direct sun and hot rooms.');
  const r = rankSentence(p);
  if (r) parts.push(r);
  parts.push(pick(['Always leave the ventilation clearance listed by the manufacturer.', 'Check the manufacturer\'s ventilation clearance before you fix its position.', 'Allow the ventilation space the manufacturer specifies around the cabinet.'], p, 4));
  if (g) parts.push(`Not sure what to check? Read our ${g}.`);
  return parts.join(' ');
}

/**
 * "How this version differs" for products in a family of 4+ versions of the same cabinet:
 * a hand-written note (from the product photo and listing) plus data-driven comparisons
 * of sound level, energy rating and heated glass against the sibling versions.
 */
export function familyDetails(p: Product): string[] {
  const fam = familyOf(p);
  if (fam.length < 4) return [];
  const parts: string[] = [];
  const note = FAMILY_NOTES[p.slug];
  if (note) parts.push(note);

  const dbs = fam.map((x) => x.noiseLevelDb);
  const minDb = Math.min(...dbs);
  const maxDb = Math.max(...dbs);
  if (minDb !== maxDb) {
    const rank = dbs.filter((d) => d < p.noiseLevelDb).length + 1;
    const tie = dbs.filter((d) => d === p.noiseLevelDb).length > 1;
    const quiet = `${tie ? 'joint ' : ''}${rank === 1 ? 'quietest' : `${ord(rank)} quietest`}`;
    parts.push(
      pick(
        [
          `At ${p.noiseLevelDb} dB it is the ${quiet} of the ${fam.length} versions (the family ranges from ${minDb} to ${maxDb} dB).`,
          `Across the ${fam.length} versions of this cabinet, sound ratings run from ${minDb} to ${maxDb} dB, and this one is rated at ${p.noiseLevelDb} dB.`
        ],
        p,
        11
      )
    );
  }
  const stars = fam.map((x) => x.energyStars);
  const minS = Math.min(...stars);
  const maxS = Math.max(...stars);
  if (minS !== maxS) {
    parts.push(`Its ${p.energyStars} star energy rating compares with ${minS} to ${maxS} stars across the family.`);
  }
  const heated = (x: Product) => x.features.some((f) => /heated glass/i.test(f));
  const nHeated = fam.filter(heated).length;
  if (nHeated > 0 && nHeated < fam.length) {
    parts.push(
      heated(p)
        ? `It is one of ${nHeated} heated glass versions of this cabinet.`
        : `It does not list the heated glass feature that ${nHeated} of its sibling versions have.`
    );
  }
  if (/left hing/i.test(p.name)) parts.push('Its listing describes it as left hinged.');
  return parts.length ? ['### How this version differs', parts.join(' ')] : [];
}

export function generateLongDescription(p: Product): string[] {
  const label = CAT_LABEL[p.category] ?? 'bar fridges';
  const h1 = pick(['Key features', 'Highlights', 'What you get'], p, 6);
  const h2 = pick(['Size and fit', 'Dimensions and placement', 'Where it fits'], p, 8);
  const tailLine = pick(
    [
      `Every unit ships free across Australia. Warranty: ${warranty(p)}. Compare more options in our [${label}](/category/${p.category}).`,
      `Delivery is free across Australia and the warranty is ${warranty(p)}. Browse the full range of [${label}](/category/${p.category}).`,
      `Free shipping Australia-wide applies to this model (warranty: ${warranty(p)}). See more [${label}](/category/${p.category}).`
    ],
    p,
    9
  );
  const sib = familyOf(p).filter((x) => x.slug !== p.slug).slice(0, 5);
  const sibBlock = sib.length
    ? [
        '### Other versions of this cabinet',
        `The ${model(p)} shares its ${p.capacityLitres} litre cabinet with ${sib.length === 1 ? 'one other model' : `${familyOf(p).length - 1} other models`} in our range: ${sib
          .map((x) => `[${model(x)}](/${x.slug})`)
          .join(', ')}${familyOf(p).length - 1 > sib.length ? ' and more' : ''}. ${pick(
          ['Choose the model code that matches the version you want when you order.', 'Compare the listings to pick the finish, design or door version you prefer.', 'The cabinet size and capacity are the same, so the choice comes down to the version you prefer.'],
          p,
          10
        )}`
      ]
    : [];
  return [intro(p), `### ${h1}`, ...bullets(p), `### ${h2}`, sizeFit(p), ...familyDetails(p), ...sibBlock, tailLine];
}
