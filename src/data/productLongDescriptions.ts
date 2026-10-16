import { Product } from '../types';
import { keywordFor } from './productKeywords';
import { supportingFor, joinKeywords } from './productSupportKeywords';
import { PRODUCTS } from './products';
import { generateLongDescription, familyDetails } from './productLongGenerated';

// Longer, hand-written descriptions for the products the store already labels
// "Popular" or "Best Value". Narrative is written per product; every measurement,
// capacity, noise, energy and warranty figure is read from the product's own data so
// it cannot drift from the specs table. Markup: "### h3", "- bullet", "[label](/path)".

const art = (n: number) => (n === 8 || n === 11 || n === 18 || (n >= 80 && n <= 89) || (n >= 800 && n <= 899) ? 'an' : 'a');
const warranty = (p: Product) => p.specs['Warranty'] ?? '2 Years Parts & Labour';
const dims = (p: Product) =>
  `${p.dimensions.width} mm wide, ${p.dimensions.depth} mm deep and ${p.dimensions.height} mm high`;
const cans = (p: Product) => (p.specs['Gross Capacity'] ?? '').match(/\((.*?)\)/)?.[1] ?? '';
const tail = (p: Product, catLabel: string, catId: string) =>
  `Every unit ships free across Australia. Warranty: ${warranty(p)}. Compare more options in our [${catLabel}](/category/${catId}).`;

type Writer = (p: Product) => string[];

// --- Under bench heated-glass / front-venting glass door models -------------------
const underBenchGlass: Writer = (p) => [
    `The ${p.name.split(' ').slice(0, 2).join(' ')} is ${art(p.capacityLitres)} ${p.capacityLitres} litre under bench bar fridge with a glass door that doubles as a display. It is designed to vent from the front, so it can sit under a bench or inside joinery without the clearance a rear-venting fridge needs.`,
    '### Key features',
    '- Heated glass door that prevents external condensation, so the glass stays clear in humid weather.',
    '- Quiet running compressor, rated at ' + p.noiseLevelDb + ' dB.',
    `- Holds ${cans(p) || 'a full range of cans and bottles'}.`,
    '- Tropical rated for Australian climates.',
    '### Size and fit',
    `The cabinet is ${dims(p)}, which makes it a good match for a home bar, kitchen or entertaining area where it needs to tuck neatly under a bench. Always measure your opening and leave the ventilation clearance listed by the manufacturer. For measuring tips, read our [built in bar fridge guide](/built-in-bar-fridge-guide).`,
    tail(p, 'single door bar fridges', 'single-door')
  ];

// --- Skinny uprights -------------------------------------------------------------
const skinnyUpright: Writer = (p) => [
  `The ${p.name.split(' ').slice(0, 2).join(' ')} is ${art(p.capacityLitres)} ${p.capacityLitres} litre skinny upright bar fridge. Its slim footprint gives you a lot of storage in a narrow space, which suits entertaining areas, garages, games rooms and corners where a wide fridge will not fit.`,
  '### Key features',
  ...p.features.map((f) => `- ${f}.`),
  `- ${p.noiseLevelDb} dB sound rating and ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
  '### Size and fit',
  `At ${dims(p)}, it stands tall and takes up very little floor space. ${p.tropicalRated ? 'It is tropical rated, so it copes with warm Australian rooms and covered alfresco spaces.' : 'It is built for indoor installation.'} Leave the manufacturer's clearance around the cabinet for ventilation.`,
  tail(p, 'single door bar fridges', 'single-door')
];

// --- Multi-door commercial -------------------------------------------------------
const multiDoor =
  (doors: string, uses: string): Writer =>
  (p) => [
    `The ${p.name.split(' ').slice(0, 2).join(' ')} is ${art(p.capacityLitres)} ${p.capacityLitres} litre ${doors} bar fridge for ${uses}. It combines a large capacity with a glass front, so stock is easy to see and serve.`,
    '### Key features',
    ...p.features.map((f) => `- ${f}.`),
    `- ${p.noiseLevelDb} dB sound rating and ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
    '### Size and fit',
    `The cabinet is ${dims(p)}. Check the width carefully against your bar or service area, and allow for ventilation and for the door swing. A fridge of this size can be a significant electricity load, so see our tips on [cutting bar fridge running costs](/energy-efficiency-bar-fridge-power-bills).`,
    tail(p, 'double and triple door bar fridges', 'double-triple-door')
  ];

// --- Retro / novelty minis ---------------------------------------------------------
const retroMini =
  (look: string): Writer =>
  (p) => [
    `The ${p.name.split(' ').slice(0, 2).join(' ')} is ${art(p.capacityLitres)} ${p.capacityLitres} litre mini bar fridge with ${look}. It is a fun, practical fridge for a man cave, games room, shed, office or home bar.`,
    '### Key features',
    ...p.features.map((f) => `- ${f}.`),
    `- ${p.noiseLevelDb} dB sound rating and ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
    '### Size and fit',
    `It measures ${dims(p)}, so it is easy to place on a bench or in a corner. It is listed as suitable for ${(p.specs['Suitability'] ?? 'indoor').toLowerCase()} use, so keep it out of direct sun and leave the manufacturer's ventilation clearance. Thinking about the whole range? Read our [retro bar fridge guide](/retro-bar-fridge-guide).`,
    tail(p, 'single door bar fridges', 'single-door')
  ];

export const LONG_DESCRIPTIONS: Record<string, Writer> = {
  // Under bench, heated glass, front venting
  'schmick-sk86l-b-hd-89l': underBenchGlass,
  'schmick-sk86r-hd-89l': underBenchGlass,
  'schmick-sk86l-hd-89l': underBenchGlass,
  'schmick-sk146l-hd-164l': (p) => [
    `The Schmick SK146L-HD is ${art(p.capacityLitres)} ${p.capacityLitres} litre stainless steel under bench bar fridge with a heated glass door and quiet, front venting design. It is a step up in capacity for kitchens, bars and alfresco areas that need to hold plenty of drinks.`,
    '### Key features',
    '- Heated glass door that prevents external condensation.',
    `- Quiet running compressor, ${p.noiseLevelDb} dB.`,
    `- Holds ${cans(p)}.`,
    `- Tropical rated, with ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
    '### Size and fit',
    `The cabinet is ${dims(p)}. Being front venting, it is intended for built in installation under a bench. Measure the opening and follow the manufacturer's clearance. Our [built in bar fridge guide](/built-in-bar-fridge-guide) walks through the measurements.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],
  'schmick-sk146r-sd-164l': (p) => [
    `The Schmick SK146R-SD is ${art(p.capacityLitres)} ${p.capacityLitres} litre under bench bar fridge with a solid stainless steel door. It suits spots where you want a clean, uniform look and do not need the contents on display.`,
    '### Key features',
    `- Solid stainless steel door and ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
    `- Quiet running compressor, ${p.noiseLevelDb} dB.`,
    '- Front venting for under bench installation.',
    `- Holds ${cans(p)}, with a reversible door hinge for flexible installation.`,
    `- Tropical rated for Australian climates.`,
    '### Size and fit',
    `It measures ${dims(p)}. A solid door insulates better than glass, which can help keep running costs down in warm spots. Allow the ventilation clearance the manufacturer lists.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],
  'schmick-sk118r-ss-118l': (p) => [
    `The Schmick SK118R-SS is ${art(p.capacityLitres)} ${p.capacityLitres} litre stainless steel glass door bar fridge with heated, triple glazed glass. That combination is aimed at humid conditions where an ordinary glass door would sweat.`,
    '### Key features',
    '- 304 stainless steel finish.',
    '- Heated glass door prevents external condensation.',
    '- Triple glazed glass for thermal efficiency.',
    `- Holds ${cans(p)}; tropical rated, ${p.noiseLevelDb} dB.`,
    '### Size and fit',
    `The cabinet is ${dims(p)}, with ${art(p.energyStars)} ${p.energyStars} star energy rating. It suits entertaining areas, verandahs and kitchens that get warm. See our [glass door fridge guide](/glass-door-fridge-guide) for how glazing affects condensation and running costs.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],

  // Compact
  'schmick-hus-sc70-b-70l': (p) => [
    `The Schmick HUS-SC70-B is ${art(p.capacityLitres)} ${p.capacityLitres} litre black glass door bar fridge with double glazed glass and a tropical rating, so it is suited to both indoor and alfresco installation.`,
    '### Key features',
    '- Double glazed glass reduces condensation.',
    '- Tropical rated for Australian climates.',
    `- Holds up to ${cans(p)}.`,
    `- ${p.energyStars} star energy rating and ${p.noiseLevelDb} dB sound rating.`,
    '### Size and fit',
    `It measures ${dims(p)}, a popular size for home bars and entertaining corners. If you are weighing it up against other models, our [bar fridge buying guide](/top-bar-fridges-for-sale-australia-guide) covers climate ratings and ventilation.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],
  'schmick-hus-rnd70b-68l': (p) => [
    `The Schmick HUS-RND70B is ${art(p.capacityLitres)} ${p.capacityLitres} litre black bar fridge with rounded styling, a quiet running compressor and ${art(p.energyStars)} ${p.energyStars} star energy rating.`,
    '### Key features',
    '- Quiet running compressor, ' + p.noiseLevelDb + ' dB.',
    '- Energy efficient compressor.',
    `- Holds ${cans(p)}.`,
    '### Size and fit',
    `The cabinet is ${dims(p)}, which makes it easy to place in a lounge, bedroom or office. It is built for indoor installation. Looking for the quietest options? Read our [quiet bar fridge guide](/quiet-bar-fridge-guide).`,
    tail(p, 'single door bar fridges', 'single-door')
  ],
  'schmick-sk40-b-31l': (p) => [
    `The Schmick SK40-B is ${art(p.capacityLitres)} ${p.capacityLitres} litre black glass door mini bar fridge with a shallow depth, designed for accommodation and tight spaces.`,
    '### Key features',
    '- Quiet running compressor.',
    `- Holds ${cans(p)}.`,
    '- Reversible door hinge for flexible installation.',
    `- Tropical rated, ${p.energyStars} star energy rating, ${p.noiseLevelDb} dB.`,
    '### Size and fit',
    `At ${dims(p)}, it is one of the most compact fridges in the range. The shallow depth helps it fit on narrow benches and in small cabinets.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],

  // Outdoor and alfresco
  'rhino-gsp1h-ss-138l': (p) => [
    `The Rhino GSP1H-SS is ${art(p.capacityLitres)} ${p.capacityLitres} litre outdoor bar fridge built to keep beers cold in 40°C temperatures. It is listed for indoor or outdoor installation and carries a tropical rating.`,
    '### Key features',
    `- Holds ${cans(p)}.`,
    '- Reversible door hinge for flexible installation.',
    `- Temperature range of ${p.temperatureRange}, ${p.energyStars} star energy rating.`,
    '- Tropical rated for Australian climates.',
    '### Size and fit',
    `The cabinet is ${dims(p)}, a practical size for a covered patio or outdoor kitchen. Like any outdoor fridge, it should be kept under cover and out of direct rain and sprinklers. Our [outdoor kitchen fridge guide](/outdoor-kitchen-fridge-guide) explains what to check.`,
    tail(p, 'alfresco and outdoor bar fridges', 'alfresco-outdoor')
  ],
  'schmick-sc88-ss-ned-98l': (p) => [
    `The Schmick SC88-SS-NED is ${art(p.capacityLitres)} ${p.capacityLitres} litre Ned Kelly themed alfresco bar fridge. It combines a distinctive design with a tropical rating, so it works as both a feature piece and a working fridge.`,
    '### Key features',
    `- Holds ${cans(p)}.`,
    '- Reversible door hinge for flexible installation.',
    `- Tropical rated, ${p.energyStars} star energy rating, ${p.noiseLevelDb} dB.`,
    '### Size and fit',
    `It measures ${dims(p)} and is listed for ${(p.specs['Suitability'] ?? 'indoor / alfresco').toLowerCase()} installation. Keep it under cover and leave the manufacturer's ventilation clearance.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],

  // Skinny uprights
  'cub-ss-p160-gold-160l': skinnyUpright,
  'schmick-ss-p160fa-joker-160l': skinnyUpright,
  'schmick-hus-sc372b-370l': (p) => [
    `The Schmick HUS-SC372B is ${art(p.capacityLitres)} ${p.capacityLitres} litre upright black glass door bar fridge. It is the largest single door unit in our popular range, built for people who want serious capacity in a quiet cabinet.`,
    '### Key features',
    '- Quiet running compressor.',
    `- Holds ${cans(p)}.`,
    `- Reversible door hinge for flexible installation, ${p.energyStars} star energy rating, ${p.noiseLevelDb} dB.`,
    '### Size and fit',
    `It measures ${dims(p)}, so check ceiling and doorway clearances. It is built for indoor installation. For a sense of how sizes compare, see our [bar fridge buying guide](/top-bar-fridges-for-sale-australia-guide).`,
    tail(p, 'single door bar fridges', 'single-door')
  ],

  // Multi-door
  'schmick-sk246-b-hd-257l': multiDoor('twin door', 'home bars, function rooms and small venues'),
  'schmick-sk386-b-hd-399l': multiDoor('3 door', 'venues, clubs and large entertaining areas'),
  'rhino-env3h-ss-388l': (p) => [
    `The Rhino ENV3H-SS is ${art(p.capacityLitres)} ${p.capacityLitres} litre outdoor ENVY 3 door bar fridge in 316 marine grade stainless steel, designed for the coldest beer in hot weather and installation indoors or outdoors with no condensation.`,
    '### Key features',
    '- 316 marine grade stainless steel finish.',
    `- Holds ${cans(p)}.`,
    `- Quiet running compressor, ${p.noiseLevelDb} dB; reversible door hinge.`,
    '- Tropical rated for Australian climates.',
    '### Size and fit',
    `The cabinet is ${dims(p)}, a big fridge for a big outdoor bar. Measure the space and allow for ventilation and for the door swing. See our [outdoor kitchen fridge guide](/outdoor-kitchen-fridge-guide) for placement advice.`,
    tail(p, 'alfresco and outdoor bar fridges', 'alfresco-outdoor')
  ],

  // Freezer
  'schmick-mslf241-241l': (p) => [
    `The Schmick MSLF241 is ${art(p.capacityLitres)} ${p.capacityLitres} litre upright freezer listed as an integrated, built in model, with a temperature range of ${p.temperatureRange}. It suits kitchens, bars and utility spaces that need extra frozen storage.`,
    '### Key features',
    '- Reversible door hinge for flexible installation.',
    `- ${p.energyStars} star energy rating and ${p.noiseLevelDb} dB sound rating.`,
    '- Built for indoor installation.',
    '### Size and fit',
    `It measures ${dims(p)}. Check the specifications table below and confirm the clearances before building it into cabinetry. Not sure whether you need a fridge or a freezer? Read our [bar fridge vs bar freezer guide](/bar-fridge-vs-bar-freezer-comparison).`,
    tail(p, 'bar freezers', 'bar-freezers')
  ],

  // Filed under bar freezers in the catalogue, but the product names say otherwise (ice boxes, a bar fridge,
  // a bar fridge with a mini freezer). Written from the names and physical specs only; the freezer-style
  // temperature, energy and noise data is deliberately left out because it contradicts the names.
  'schmick-yf-nl35-35l': (p) => [
    `The Schmick YF-NL35 is a ${p.capacityLitres} litre heavy duty roto mould ice box with a temperature gauge. It is listed for indoor or outdoor use.`,
    '### Key features',
    '- Heavy duty roto mould construction.',
    '- Built-in temperature gauge.',
    `- Capacity: ${p.capacityLitres} litres (${cans(p)}).`,
    '### Size and fit',
    `The ice box measures ${dims(p)}. Check the dimensions against the space or vehicle where you plan to use it.`,
    tail(p, 'single door bar fridges, ice boxes and coolers', 'single-door')
  ],
  'schmick-yf-nl42-42l': (p) => [
    `The Schmick YF-NL42 is a ${p.capacityLitres} litre heavy duty roto mould ice box, listed for indoor or outdoor use.`,
    '### Key features',
    '- Heavy duty roto mould construction.',
    `- Capacity: ${p.capacityLitres} litres.`,
    '### Size and fit',
    `The ice box measures ${dims(p)}. Check the dimensions against the space or vehicle where you plan to use it.`,
    tail(p, 'single door bar fridges, ice boxes and coolers', 'single-door')
  ],
  'schmick-ss-p160fa-pb-160l': (p) => [
    `The Schmick SS-P160FA-PB is a ${p.capacityLitres} litre branded skinny upright bar fridge with a Police Box design. Its slim ${p.dimensions.width} mm width gives you generous storage in a narrow space.`,
    '### Key features',
    `- Holds ${cans(p)}.`,
    '- Reversible door hinge for flexible installation.',
    '- Tropical rated, listed for indoor or alfresco use.',
    '### Size and fit',
    `At ${dims(p)}, it stands tall and takes up very little floor space. Leave the manufacturer's ventilation clearance around the cabinet. Our [slimline bar fridge guide](/slimline-bar-fridge-guide) covers the narrow upright range.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],
  'dellcool-dw100cd-100l': (p) => [
    `The Dellcool DW100CD is a ${p.capacityLitres} litre silent bar fridge with a mini freezer, listed for indoor use.`,
    '### Key features',
    '- Quiet running compressor.',
    `- Holds ${cans(p)}.`,
    '- Reversible door hinge for flexible installation.',
    '### Size and fit',
    `The cabinet measures ${dims(p)}. Allow the ventilation clearance the manufacturer specifies, and check the specifications table for the full details.`,
    tail(p, 'single door bar fridges', 'single-door')
  ],

  // Retro and novelty
  'schmick-hus-bc46w-ret-46l': retroMini('white retro styling and a bottle opener'),
  'schmick-bc46b-travel-46l': retroMini('a vintage luggage case design'),
  'schmick-bc46b-footy-46l': retroMini('a retro footy design'),
  'schmick-bc46b2-safe-46l': retroMini('a retro bank safe design'),
  'schmick-bc46b-crate-46l': retroMini('a wooden crate design'),
  'schmick-bc70b-ned-70l': retroMini('a Ned Kelly retro design'),
  'schmick-bc70b-roadie-aus-70l': retroMini('a music roadie case design')
};

/** A one-paragraph, sentence-form summary of the product's own specifications. */
function glance(p: Product): string {
  const short = `${p.specs['Brand'] ?? p.name.split(' ')[0]} ${p.specs['Model'] ?? ''}`.trim();
  const cans = (p.specs['Gross Capacity'] ?? '').match(/\((.*?)\)/)?.[1];
  const parts: string[] = [];
  parts.push(`The ${short} has a capacity of ${p.capacityLitres} litres${cans ? `, holding ${cans}` : ''}, and measures ${dims(p)}.`);
  const ratings: string[] = [];
  if (p.energyStars > 0) ratings.push(`a ${art(p.energyStars)} ${p.energyStars} star energy rating`);
  if (p.noiseLevelDb > 0) ratings.push(`a sound rating of ${p.noiseLevelDb} dB`);
  if (ratings.length) parts.push(`It has ${ratings.join(' and ')}.`);
  const suit = (p.specs['Suitability'] ?? '').toLowerCase();
  if (suit) parts.push(`It is listed for ${suit} installation${p.tropicalRated ? ' and is tropical rated for Australian climates' : ''}.`);
  if (p.energyStars > 0 && p.temperatureRange) parts.push(`The listed temperature range is ${p.temperatureRange.replace(/\s*\|\s*/g, '; ')}.`);
  parts.push(`Warranty: ${warranty(p)}. Check the full specifications table below before you order.`);
  return parts.join(' ');
}

/** How ordering, delivery and warranty work on this site (matches the order flow and the published terms). */
function ordering(p: Product): string {
  return `Add the ${p.specs['Brand'] ?? ''} ${p.specs['Model'] ?? ''} to your cart and complete the order form with your delivery details. We confirm your order by email and, once we have reviewed it, email you the payment details for your chosen method: pay the exact amount shown and upload a screenshot of your payment using the confirmation link. Dispatch occurs within 24 hours of confirmed payment. Shipping on our bar fridges and freezers is free across Australia, paying with Bitcoin, USDT, Ethereum or Solana takes 10% off, and every unit carries the warranty above. Our [shipping](/shipping) and [returns](/refund) pages explain delivery and returns in full, and our [FAQ](/faq) answers common questions.`.replace(/\s+/g, ' ');
}

/** Hand-written description if one exists, otherwise a spec-driven one; every product also gets the same two closing sections. */
/** Opening paragraph that carries the product's own primary keyword. */
export function keywordIntro(p: Product): string | undefined {
  const k = keywordFor(p.slug);
  if (!k) return undefined;
  return `If you are looking for a ${k.keyword}, the ${k.brand} ${k.model} is a ${p.capacityLitres} litre ${p.subcategory.toLowerCase()} model you can buy online here with free shipping across Australia. Buyers also search for ${joinKeywords(supportingFor(p.slug))}, and all of those describe this model.`;
}

export function longDescriptionFor(slug: string): string[] | undefined {
  const w = LONG_DESCRIPTIONS[slug] as Writer | undefined;
  const p = PRODUCTS.find((x) => x.slug === slug);
  if (!p) return undefined;
  let lines: string[];
  if (!w) lines = generateLongDescription(p);
  else {
    lines = w(p);
    const details = familyDetails(p);
    // hand-written copy: slot the family details in before the closing line
    if (details.length) lines = [...lines.slice(0, -1), ...details, lines[lines.length - 1]];
  }
  const closing = lines[lines.length - 1];
  const intro = keywordIntro(p);
  return [...(intro ? [intro] : []), ...lines.slice(0, -1), '### At a glance', glance(p), '### Ordering, delivery and warranty', ordering(p), closing];
}
