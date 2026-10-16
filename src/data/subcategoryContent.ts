import { Product } from '../types';

// Buyer's-guide copy for each subcategory page (shown under the product list and included in the
// prerendered HTML). Prose is deliberately free of hard numbers; model counts, litre ranges and
// tropical / heated-glass counts come from subStats() so they always match the catalogue.
export interface SubGuide {
  heading: string;
  intro: string[];
  points: string[];
  links: { label: string; path: string }[];
  showRatings?: boolean; // false for items where tropical/heated-glass counts are meaningless
}

export const SUBCATEGORY_GUIDES: Record<string, SubGuide> = {
  'Glass Door Display': {
    heading: 'Choosing a Glass Door Bar Fridge',
    intro: [
      'A glass door bar fridge shows off your drinks and saves opening the door just to see what is inside. It is the most popular style in our range, from compact minis to under bench models and larger display fridges.',
      'Glass is a weaker insulator than a solid door, so the details matter: how many layers of glass, whether the glass is heated, and whether the fridge is rated for the room it will sit in.'
    ],
    points: [
      'Heated glass keeps the outside of the door clear of condensation in humid weather.',
      'Double and triple glazing improve insulation and help the door hold temperature.',
      'Front venting models can sit under a bench or inside joinery; rear venting models need open space around them.',
      'A tropical rating keeps the fridge cooling in warm rooms and alfresco areas.'
    ],
    links: [
      { label: 'Glass door fridge guide', path: '/glass-door-fridge-guide' },
      { label: 'Built in bar fridge guide', path: '/built-in-bar-fridge-guide' },
      { label: 'Quiet bar fridge guide', path: '/quiet-bar-fridge-guide' }
    ]
  },
  'Novelty & Branded Mini Bar': {
    heading: 'Novelty and Branded Mini Bar Fridges',
    intro: [
      'These mini bar fridges turn a drinks fridge into a feature. The range includes retro and vintage styles, beer brand designs from Cub, themed designs such as roadie cases, bank safes and wooden crates, and Holden heritage fridges.',
      'Underneath the artwork they are working bar fridges, mostly compact and listed for indoor use, so they suit a man cave, games room, shed, office or home bar.'
    ],
    points: [
      'Check the capacity and dimensions: most are compact, so confirm the size against your space.',
      'Most are listed for indoor use, so keep them out of direct sun and leave the ventilation clearance listed by the manufacturer.',
      'Within a size, designs share the same cabinet, so choose the artwork you like best.',
      'Several models are listed with a bottle opener, so check the individual listing.'
    ],
    links: [
      { label: 'Retro bar fridge guide', path: '/retro-bar-fridge-guide' },
      { label: 'Branded beer fridge guide', path: '/branded-beer-fridge-guide' },
      { label: 'Mini bar fridge guide', path: '/mini-bar-fridge-guide' }
    ]
  },
  'Skinny Upright': {
    heading: 'Choosing a Skinny Upright Bar Fridge',
    intro: [
      'A skinny upright bar fridge gives you storage by going up instead of out. The narrowest models are only 390 mm wide, which suits gaps beside a bench, garages, games rooms and corners where a wide fridge will not fit.',
      'The range also includes taller, wider uprights for people who want serious capacity, from branded Cub designs to glass door models in black and white.'
    ],
    points: [
      'Measure the height and the ceiling clearance, and check doorways and stairs on the way in.',
      'Make sure the floor is level so a tall fridge stands steady.',
      'Leave the ventilation space the manufacturer specifies.',
      'Check whether the model is listed for indoor use or for indoor and alfresco use.'
    ],
    links: [
      { label: 'Slimline bar fridge guide', path: '/slimline-bar-fridge-guide' },
      { label: 'Bar fridge dimensions guide', path: '/bar-fridge-dimensions-guide' },
      { label: 'Branded beer fridge guide', path: '/branded-beer-fridge-guide' }
    ]
  },
  'Solid Stainless Steel Door': {
    heading: 'Solid Stainless Steel Door Bar Fridges',
    intro: [
      'A solid stainless steel door gives a clean, uniform look and keeps the contents out of sight. It also suits spots where you do not want a display.',
      'Most models here are quiet running, and several are front venting, so they are designed to sit under a bench or inside joinery.'
    ],
    points: [
      'Compare the capacity and dimensions against your opening, and allow the ventilation clearance listed.',
      'Choose a front venting model if the fridge will be enclosed on the sides, top and back.',
      'Wipe stainless with a soft cloth and mild detergent, and avoid abrasive pads.',
      'Check whether the stainless grade is listed for outdoor use if it will sit near the coast.'
    ],
    links: [
      { label: 'Stainless steel bar fridge guide', path: '/stainless-steel-bar-fridge-guide' },
      { label: 'Built in bar fridge guide', path: '/built-in-bar-fridge-guide' }
    ]
  },
  'Night Club Multi-Colour LED': {
    heading: 'Night Club Multi-Colour LED Bar Fridges',
    intro: [
      'The Night Club models are Rhino commercial glass door bar fridges with multi-colour LED lighting, so the drinks are lit up in colour. They suit bars, games rooms and entertaining areas where the lighting is part of the look.',
      'They are quiet running and tropical rated, and listed for indoor or alfresco use.'
    ],
    points: [
      'Check the dimensions against your space and leave the ventilation clearance listed.',
      'A glass door shows the display but is a weaker insulator than a solid door.',
      'Compare with the other Rhino glass door fridges if you do not need the colour lighting.'
    ],
    links: [{ label: 'Rhino bar fridge guide', path: '/rhino-bar-fridge-guide' }, { label: 'Glass door fridge guide', path: '/glass-door-fridge-guide' }]
  },
  'Bar Fridge With Freezer': {
    heading: 'Bar Fridge With a Mini Freezer',
    intro: [
      'A bar fridge with a mini freezer gives you cold drinks and a small amount of frozen storage in one cabinet. The Dellcool DW100CD is listed as a silent bar fridge with a mini freezer, for indoor use.',
      'If you need a lot of frozen storage, a dedicated bar freezer is the better tool.'
    ],
    points: [
      'Check the specifications table for the full details of the fridge and freezer sections.',
      'Allow the ventilation clearance the manufacturer specifies.',
      'Compare with a separate fridge and freezer if you need more freezer space.'
    ],
    links: [
      { label: 'Bar fridge vs bar freezer guide', path: '/bar-fridge-vs-bar-freezer-comparison' },
      { label: 'Small bar freezer guide', path: '/small-bar-freezer-guide' }
    ],
    showRatings: false
  },
  'Ice Boxes & Coolers': {
    heading: 'Ice Boxes and Coolers',
    intro: [
      'These heavy duty roto mould ice boxes are listed for indoor or outdoor use. They suit camping, outdoor entertaining and anywhere you want a rugged portable cooler.',
      'They are separate from our powered bar fridges, so check the dimensions and capacity against where you plan to use them.'
    ],
    points: [
      'Heavy duty roto mould construction.',
      'The 35 litre model includes a temperature gauge.',
      'Check the dimensions against your vehicle or space.'
    ],
    links: [{ label: 'Browse all bar fridges', path: '/shop' }],
    showRatings: false
  },
  'Hinged Double Glass Door': {
    heading: 'Choosing a Double Door Bar Fridge',
    intro: [
      'Hinged double glass door bar fridges give pubs, cafes, clubs, function rooms and serious home bars the capacity and display width a single door fridge cannot match.',
      'Every model in this range is tropical rated, which matters in a warm bar, a courtyard or a room without air conditioning.'
    ],
    points: [
      'Check the width, depth and height, and allow for the door swing.',
      'Heated glass versions are designed to prevent external condensation.',
      'Most models are quiet running; compare the sound rating if the fridge will be near seating.',
      'Size for your busiest night rather than an average day.'
    ],
    links: [
      { label: 'Commercial bar fridge guide', path: '/commercial-bar-fridge-guide' },
      { label: 'Rhino bar fridge guide', path: '/rhino-bar-fridge-guide' },
      { label: 'Bar fridge dimensions guide', path: '/bar-fridge-dimensions-guide' }
    ]
  },
  'Triple Door Commercial': {
    heading: 'Triple Door Commercial Bar Fridges',
    intro: [
      'Triple door commercial bar fridges give maximum capacity and display width for busy venues, clubs and large entertaining areas. The widest models are around 1,350 mm.',
      'All are tropical rated, and two are listed for outdoor or indoor and outdoor installation.'
    ],
    points: [
      'Measure the bar or service area, and check doorways on the way in.',
      'Allow the ventilation clearance the manufacturer specifies.',
      'A fridge this size can be a significant electricity load, so compare the energy ratings.',
      'Heated glass versions are designed to prevent external condensation.'
    ],
    links: [
      { label: 'Commercial bar fridge guide', path: '/commercial-bar-fridge-guide' },
      { label: 'Cutting bar fridge running costs', path: '/energy-efficiency-bar-fridge-power-bills' }
    ]
  },
  'Sliding Double Door': {
    heading: 'Sliding Double Door Bar Fridges',
    intro: [
      'A sliding double door bar fridge suits tight service areas where a swinging door would block staff or customers. The Rhino SG2S-B is a 208 litre black sliding door model.',
      'Check the clearance in front of the fridge and allow the ventilation space the manufacturer lists.'
    ],
    points: ['Sliding doors save space compared with hinged doors.', 'Check the width and depth against your bar.'],
    links: [{ label: 'Commercial bar fridge guide', path: '/commercial-bar-fridge-guide' }]
  },
  '316 Marine Grade Stainless': {
    heading: 'Choosing a 316 Marine Grade Stainless Outdoor Fridge',
    intro: [
      'The ENVY range is built in 316 marine grade stainless steel, which resists salt and moisture better than the 304 grade used on many indoor appliances. That makes it a strong choice for coastal homes, pool areas and outdoor kitchens.',
      'All models are tropical rated and listed for indoor or outdoor installation.'
    ],
    points: [
      'Install the fridge under cover, out of direct rain, sprinklers and full midday sun.',
      'Measure the opening and leave the ventilation clearance the manufacturer lists.',
      'Choose a size for your biggest gathering: single door or double door.',
      'Have outdoor power points installed by a licensed electrician.'
    ],
    links: [
      { label: 'Stainless steel bar fridge guide', path: '/stainless-steel-bar-fridge-guide' },
      { label: 'Outdoor kitchen fridge guide', path: '/outdoor-kitchen-fridge-guide' },
      { label: 'Outdoor bar with refrigerator', path: '/outdoor-bar-with-refrigerator-guide' }
    ]
  },
  'IP-Rated Weatherproof': {
    heading: 'Choosing a Weatherproof Outdoor Bar Fridge',
    intro: [
      'IP-rated weatherproof bar fridges are built to resist the dust and moisture an alfresco area throws at them. They are listed for indoor or outdoor installation and are all tropical rated for hot Australian conditions.',
      'Even weatherproof fridges perform best and last longest when installed under cover, away from direct rain and sprinklers.'
    ],
    points: [
      'Check the rating and the installation notes on the product page.',
      'Measure the space and allow for ventilation, especially if the fridge will be built in.',
      'Compare the size: these models are mid-size units suited to regular entertaining.',
      'Have outdoor power points installed by a licensed electrician.'
    ],
    links: [
      { label: 'Outdoor bar with refrigerator', path: '/outdoor-bar-with-refrigerator-guide' },
      { label: 'Outdoor kitchen fridge guide', path: '/outdoor-kitchen-fridge-guide' },
      { label: 'Why tropical rated matters', path: '/why-tropical-rated-bar-fridges-matter' }
    ]
  },
  'Under Bench Dual Zone': {
    heading: 'Under Bench Dual Zone Wine and Beverage Fridges',
    intro: [
      'An under bench dual zone fridge gives wine and drinks their own temperature in one cabinet. Our models list Zone 1 at 1°C to 10°C for beer, soft drinks and white wine, and Zone 2 at 5°C to 18°C for red wine and warmer drinks.',
      'They are designed to sit under a bench, so measure the opening and check the ventilation before you order.'
    ],
    points: [
      'Check how many bottles and cans each model holds.',
      'Some models are indoor only while others are tropical rated for indoor or alfresco use.',
      'Allow the ventilation clearance the manufacturer lists.',
      'A heated glass version is designed to prevent external condensation.'
    ],
    links: [
      { label: 'Dual zone wine and beverage fridge guide', path: '/dual-zone-wine-and-beverage-fridge-guide' },
      { label: 'Built in bar fridge guide', path: '/built-in-bar-fridge-guide' }
    ]
  },
  'Dual Zone Wine & Beer': {
    heading: 'Dual Zone Wine and Beer Fridges',
    intro: [
      'The Schmick JC190-GG is a 190 litre dual zone wine and beer fridge, with Zone 1 from 1°C to 10°C and Zone 2 from 5°C to 18°C. It is listed for indoor or alfresco use.',
      'Dual zones let you keep beer cold and wine at a more suitable temperature in the same cabinet.'
    ],
    points: ['Check the dimensions against your space.', 'Allow the ventilation clearance the manufacturer lists.'],
    links: [{ label: 'Dual zone wine and beverage fridge guide', path: '/dual-zone-wine-and-beverage-fridge-guide' }],
    showRatings: false
  },
  'Wine Only Cabinet': {
    heading: 'Wine Cabinets',
    intro: [
      'A wine cabinet is built to hold wine at a steady temperature. The Schmick BD425W is a 405 litre upright cabinet, listed for indoor use.',
      'Choose a dual zone fridge if you also want cold drinks in the same unit.'
    ],
    points: ['Measure the height, as upright cabinets are tall.', 'Allow the ventilation clearance the manufacturer lists.'],
    links: [{ label: 'Dual zone wine and beverage fridge guide', path: '/dual-zone-wine-and-beverage-fridge-guide' }],
    showRatings: false
  },
  'Compact Underbench Freezer': {
    heading: 'Compact Under Bench Freezers',
    intro: [
      'Compact under bench freezers give a home bar or kitchen extra frozen storage for ice, mixers and food in a small footprint. They run at -15°C to -18°C according to the specifications.',
      'Check the ventilation and fitting guidance before building one into cabinetry.'
    ],
    points: ['Compare the capacity and dimensions.', 'Choose a tropical rated model for a warm space.', 'Allow the ventilation clearance the manufacturer lists.'],
    links: [{ label: 'Small bar freezer guide', path: '/small-bar-freezer-guide' }, { label: 'Bar fridge vs bar freezer guide', path: '/bar-fridge-vs-bar-freezer-comparison' }],
    showRatings: false
  },
  'Glass Door Display Freezer': {
    heading: 'Glass Door Display Freezers',
    intro: [
      'A glass door display freezer shows the contents, which suits ice cream, frozen treats and cafe or bar display. The models here are mini freezers listed for indoor use.',
      'They run at -15°C to -18°C according to the specifications.'
    ],
    points: ['Check the dimensions against your counter or space.', 'Keep the freezer out of direct sun.'],
    links: [{ label: 'Small bar freezer guide', path: '/small-bar-freezer-guide' }],
    showRatings: false
  },
  'Commercial Upright Freezer': {
    heading: 'Upright Freezers',
    intro: [
      'An upright freezer gives you a lot of frozen storage for the floor space it takes. The models here are around 214 to 241 litres and 1,770 mm high, listed for indoor use.',
      'Check doorways and ceiling height, and allow the ventilation clearance the manufacturer lists.'
    ],
    points: ['Measure the height and the space around the cabinet.', 'Compare the energy ratings.'],
    links: [{ label: 'Small bar freezer guide', path: '/small-bar-freezer-guide' }, { label: 'Bar fridge vs bar freezer guide', path: '/bar-fridge-vs-bar-freezer-comparison' }],
    showRatings: false
  },
  'Portable 12V Camping Freezer': {
    heading: 'Portable Camping Fridge Freezers',
    intro: [
      'The Cub BDC60-GNBC is a 60 litre portable camping fridge freezer that runs on 12 to 24V or 240V power, so it works in a vehicle or at a campsite with power.',
      'Check the power requirements for your vehicle and consider a battery setup for long trips.'
    ],
    points: ['Check the dimensions against your vehicle.', 'Confirm your power supply before you travel.'],
    links: [{ label: 'Small bar freezer guide', path: '/small-bar-freezer-guide' }],
    showRatings: false
  }
};

/** Live facts for a subcategory, computed from the catalogue so they never go stale. */
export function subStats(products: Product[], showRatings = true): string {
  if (!products.length) return '';
  const caps = products.map((p) => p.capacityLitres);
  const min = Math.min(...caps);
  const max = Math.max(...caps);
  const n = products.length;
  let s = `${n} model${n === 1 ? '' : 's'}`;
  s += min === max ? `, ${min} litres` : ` from ${min} to ${max} litres`;
  if (showRatings) {
    const trop = products.filter((p) => p.tropicalRated).length;
    const heated = products.filter((p) => p.features.some((f) => /heated glass/i.test(f))).length;
    s += trop === n ? '; all tropical rated' : trop ? `; ${trop} tropical rated` : '';
    if (heated) s += `; ${heated} with heated glass`;
  }
  return s + '.';
}
