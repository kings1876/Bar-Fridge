import { Product } from '../types';

// Buyer's-guide copy for each subcategory page (shown under the product list and included in the
// prerendered HTML). Prose is deliberately free of hard numbers; model counts, litre ranges and
// tropical / heated-glass counts come from subStats() so they always match the catalogue.
export interface SubGuide {
  heading: string;
  intro: string[];
  extra?: string[]; // additional paragraphs of buying advice
  faqs?: { q: string; a: string }[];
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
    extra: [
      'Start with size. Compact glass door models suit a bench, shelf or small bar, mid-size under bench models suit kitchens and entertaining areas, and the larger display fridges suit busy bars and venues. Check the width, depth and height in the specifications table, then allow the ventilation clearance the manufacturer lists.',
      'Glass doors let more heat in than solid doors, so look at the energy rating and keep the fridge out of direct sun. Every product page lists the sound rating, which is worth checking if the fridge will sit in a lounge room, bedroom or home theatre.',
      'Finish matters too. This range includes black cabinets and stainless steel frames, and brands including Schmick, Rhino, Cub and Fuel. If you are comparing models, start with whether you need front venting for an under bench fit, then narrow by capacity and glass type.'
    ],
    faqs: [
      { q: 'Do glass door fridges use more electricity?', a: 'A glass door lets more heat in than a solid door, so a glass door fridge generally works a little harder. Multi-layer or heated glass and good door seals help, and every product page lists the energy rating so you can compare.' },
      { q: 'Why does my glass door fridge sweat?', a: 'Condensation forms when warm, humid air meets cold glass. Heated or multi-layer glass reduces it, as does keeping the door closed and the fridge out of humid, sunny spots.' }
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
    extra: [
      'Choose the size first. Most of these fridges are compact mini bar models that hold a few dozen cans, with a few larger uprights in branded designs. Check the dimensions against your bench, shelf or corner before you fall for the artwork.',
      'Because the artwork changes but the cabinet stays the same within each size, it is worth comparing the specifications rather than the designs: capacity, dimensions, energy rating and sound rating are listed on each product page.',
      'These fridges also make popular gifts for beer fans, car enthusiasts and collectors. If you are buying for someone else, check the listing for the design name and size, and whether the model includes a bottle opener.'
    ],
    faqs: [
      { q: 'Are branded bar fridges real working fridges?', a: 'Yes. They are compact bar fridge cabinets with a printed design, and each product page lists the capacity, ratings and warranty.' },
      { q: 'Can I use a mini bar fridge outdoors?', a: 'Most are listed for indoor use, so check the suitability line on the product page. For outdoor areas, choose a model listed for alfresco or outdoor installation.' }
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
    extra: [
      'The narrowest models in this range are only 390 mm wide, which is slimmer than most bar fridges and ideal for gaps beside a bench or in a narrow entertaining area. Taller, wider uprights add capacity if you have the floor space.',
      'Measure more than the floor. Check the ceiling height, the door swing, and the doorways and stairs the fridge must pass through on delivery. A level floor helps a tall fridge stand steady, and the ventilation clearance listed by the manufacturer still applies.',
      'Branded designs from Cub, in VB, Carlton Dry, Carlton Draught, Great Northern and Corona, sit alongside plain black and white glass door models, so you can choose between a feature piece and a quiet addition to the room.'
    ],
    faqs: [
      { q: 'How narrow is a skinny upright bar fridge?', a: 'The narrowest models are 390 mm wide and about 1,880 mm high, and they hold around 144 cans.' },
      { q: 'Will a tall fridge fit through my doorway?', a: 'Measure the doorways, hallways and stairs on the delivery path and compare them with the height and depth listed in the specifications.' }
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
    extra: [
      'A solid stainless door insulates better than glass, which makes these models a good fit for warm spots. They also suit kitchens and bars where a clean, uniform look matters more than a display.',
      'Sizes run from compact to larger under bench models, and many are front venting so they can sit under a bench or inside joinery. Always measure the opening and leave the clearance the manufacturer lists.',
      'Stainless is easy to clean with a soft cloth and mild detergent. Avoid abrasive pads that scratch the surface, and wipe along the grain where it is visible.'
    ],
    faqs: [
      { q: 'Does a solid door keep the fridge colder?', a: 'A solid door insulates better than glass, so it loses less cold when closed, but both styles are listed with the same 1°C to 10°C temperature range.' },
      { q: 'Can a solid stainless fridge go under a bench?', a: 'Front venting models can. Check the listing and leave the ventilation clearance the manufacturer specifies.' }
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
  'Hinged Double Glass Door': {
    heading: 'Choosing a Double Door Bar Fridge',
    intro: [
      'Hinged double glass door bar fridges give pubs, cafes, clubs, function rooms and serious home bars the capacity and display width a single door fridge cannot match.',
      'Every model in this range is tropical rated, which matters in a warm bar, a courtyard or a room without air conditioning.'
    ],
    extra: [
      'Hinged double glass door fridges are the standard back bar choice. Capacity runs from around 200 litres up to the tall 473 litre models, enough for a busy night at a small bar or a serious home bar.',
      'The doors need space to swing, so measure the clearance in front of the fridge as well as the width of the opening. Models listed for alfresco or outdoor use suit covered beer gardens and outdoor bars.',
      'Heated glass versions are designed to prevent external condensation, and quiet running models keep noise down near seating. Energy ratings vary across the range, so compare them if the fridge will run all day.'
    ],
    faqs: [
      { q: 'How many cans does a double door bar fridge hold?', a: 'Capacity runs from about 240 cans in the 208 litre models up to about 450 cans in the largest 473 litre model, according to the specifications.' },
      { q: 'Can a double door bar fridge be used outdoors?', a: 'Models listed for outdoor or indoor and outdoor installation can, kept under cover. Check the suitability line on the product page.' }
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
    extra: [
      'Triple door models are for venues that need maximum display and capacity: the biggest hold close to 400 litres. At up to 1,350 mm wide they need a proper space, so measure the bar or service area and check doorways on the way in.',
      'A fridge this size runs all day, so compare the energy ratings and consider heated glass versions if the room is humid. All models are tropical rated, which suits hot venues and covered outdoor areas.',
      'Layout matters too: leave the ventilation clearance the manufacturer lists, keep the fridge out of direct sun and away from ovens or grills, and think about how staff will reach the doors during service.'
    ],
    faqs: [
      { q: 'How wide is a triple door bar fridge?', a: 'The widest models are about 1,350 mm wide, so measure your space and the delivery path before you order.' },
      { q: 'Are triple door fridges tropical rated?', a: 'Yes. Every model in this range is tropical rated, which suits hot venues and covered outdoor areas.' }
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
  '316 Marine Grade Stainless': {
    heading: 'Choosing a 316 Marine Grade Stainless Outdoor Fridge',
    intro: [
      'The ENVY range is built in 316 marine grade stainless steel, which resists salt and moisture better than the 304 grade used on many indoor appliances. That makes it a strong choice for coastal homes, pool areas and outdoor kitchens.',
      'All models are tropical rated and listed for indoor or outdoor installation.'
    ],
    extra: [
      'The six models here are all Rhino ENVY fridges in 316 marine grade stainless steel, available as single door models at 148 litres and double door models at 248 litres. They are listed for indoor or outdoor installation and are tropical rated.',
      'Marine grade 316 stainless is the better choice near the coast, around pools and in humid outdoor kitchens, where salt and chemicals attack ordinary stainless. Keep the fridge under cover and out of direct rain and sprinklers even so.',
      'Some models have a glass door and some have a solid stainless door, so decide whether you want a display or a clean uniform look. Measure the opening, allow ventilation, and have outdoor power points installed by a licensed electrician.'
    ],
    faqs: [
      { q: 'What is 316 marine grade stainless steel?', a: 'It is a stainless steel grade that resists corrosion from salt and moisture better than 304, which suits coastal homes and pool areas.' },
      { q: 'Can I install an ENVY fridge in an outdoor kitchen?', a: 'Yes. They are listed for indoor or outdoor installation. Keep them under cover and allow the ventilation clearance the manufacturer lists.' }
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
    extra: [
      'These weatherproof models are mid-size, from 129 to 138 litres, which suits regular entertaining on a patio or in an outdoor kitchen. All are tropical rated and listed for indoor or outdoor installation.',
      'The IP rating describes how well the cabinet resists dust and water. Check the rating and installation notes on the product page, and remember that even weatherproof fridges last longer when kept under cover and away from direct rain and sprinklers.',
      'If you need more capacity, look at the 316 marine grade ENVY range, which includes 148 litre and 248 litre models. For help planning the whole space, read our outdoor bar and outdoor kitchen guides.'
    ],
    faqs: [
      { q: 'What does IP-rated mean?', a: 'An IP rating describes how well an enclosure resists dust and water. Check the rating on the product page for the model you choose.' },
      { q: 'Can I leave a weatherproof fridge in the rain?', a: 'It is best to install it under cover. Even weatherproof fridges last longer when kept out of direct rain and sprinklers.' }
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
    extra: [
      'Capacity runs from 122 to 244 litres in this range, with around 28 to 34 wine bottles in the larger models alongside cans, so you can store drinks for different occasions in one cabinet.',
      'Zone 1 runs from 1°C to 10°C for beer, soft drinks and white wine, and Zone 2 from 5°C to 18°C for red wine and warmer drinks. Set each zone to suit what you are serving.',
      'Most are built to sit under a bench, so measure the opening carefully and allow ventilation. Some are indoor only and some are tropical rated for alfresco use, so match the model to the room.'
    ],
    faqs: [
      { q: 'What temperatures do the two zones run at?', a: 'Zone 1 runs from 1°C to 10°C and Zone 2 from 5°C to 18°C, according to the specifications.' },
      { q: 'Can I store beer and wine together?', a: 'Yes. Use the colder zone for beer and soft drinks, and the warmer zone for red wine.' }
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
