// Subcategories listed here get their own page; groups with fewer than 3 products stay in their category only.
// Product categories (kept separate from the large product list so the app shell can use them cheaply).
export const CATEGORIES = [
  {
    id: 'single-door',
    name: 'Single Door Bar Fridges',
    description: 'Compact and underbench single door glass, solid, and novelty bar fridges for homes and bars.',
    subcategories: ['Glass Door Display', 'Novelty & Branded Mini Bar', 'Skinny Upright', 'Solid Stainless Steel Door']
  },
  {
    id: 'double-triple-door',
    name: 'Double & Triple Door Bar Fridges',
    description: 'High capacity commercial back bar coolers with hinged, sliding, or triple glass doors.',
    subcategories: ['Hinged Double Glass Door', 'Triple Door Commercial']
  },
  {
    id: 'alfresco-outdoor',
    name: 'Alfresco & Outdoor Bar Fridges',
    description: '316 marine-grade stainless steel and IP-rated fridges built for brutal Australian summer heat.',
    subcategories: ['316 Marine Grade Stainless', 'IP-Rated Weatherproof']
  },
  {
    id: 'wine-dual-zone',
    name: 'Wine & Dual Zone Beverage Centers',
    description: 'Independent dual climate zones and dedicated wine cabinets for craft beer, soda, and fine wines.',
    subcategories: ['Under Bench Dual Zone']
  },
  {
    id: 'bar-freezers',
    name: 'Bar Freezers & Mini Freezers',
    description: 'Compact, portable, and commercial freezers for ice cream display, camping, and deep freeze.',
    subcategories: []
  },
] as const;
