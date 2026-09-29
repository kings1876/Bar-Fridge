import { Product } from '../types';

export const CATEGORIES = [
  {
    id: 'single-door',
    name: 'Single Door Bar Fridges',
    description: 'Compact and underbench single door glass and solid bar fridges for homes and bars.',
    subcategories: ['Glass Door Display', 'Solid Stainless Steel Door', 'Night Club Multi-Colour LED']
  },
  {
    id: 'double-triple-door',
    name: 'Double & Triple Door Bar Fridges',
    description: 'High capacity commercial back bar coolers with hinged or sliding glass doors.',
    subcategories: ['Hinged Double Glass Door', 'Sliding Double Door', 'Triple Door Commercial']
  },
  {
    id: 'alfresco-outdoor',
    name: 'Alfresco & Outdoor Bar Fridges',
    description: '316 marine-grade stainless steel fridges built for brutal Australian summer heat.',
    subcategories: ['316 Marine Grade Stainless', 'Tropical Heated Glass', 'IP-Rated Weatherproof']
  },
  {
    id: 'wine-dual-zone',
    name: 'Wine & Dual Zone Beverage Centers',
    description: 'Independent dual climate zones for storing craft beer, soda, and fine wines.',
    subcategories: ['Dual Zone Wine & Beer', 'Under Bench Dual Zone', 'Twin Zone Cabinet']
  },
  {
    id: 'bar-freezers',
    name: 'Bar Freezers & Mini Freezers',
    description: 'Compact and portable freezers for ice cream display, camping, and small-footprint deep freeze.',
    subcategories: ['Compact Underbench Freezer', 'Glass Door Display Freezer', 'Portable 12V Camping Freezer']
  }
] as const;

export const PRODUCTS: Product[] = [
  // ---- Single Door Bar Fridges ----
  {
    id: 'schmick-hus-sc70-ss',
    name: 'Schmick HUS-SC70-SS Tropical Triple Glazed Glass Door Bar Fridge 70L',
    slug: 'schmick-hus-sc70-ss-70l-tropical-glass-door-bar-fridge',
    price: 747,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Glass Door Display',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 164,
    capacityLitres: 70,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 430, depth: 500, height: 700 },
    tropicalRated: true,
    ambientRating: 'Tropical Rated',
    noiseLevelDb: 38,
    energyStars: 9,
    finish: 'Stainless Steel Frame with Triple Glazed Glass Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A compact 70 litre glass door bar fridge built with triple glazing to resist condensation in humid Australian conditions. Suits homes, small bars, and boutique retail counters where floor space is tight.',
    features: [
      'Triple glazed glass door reduces condensation build-up',
      'Holds up to 85 standard cans',
      'LED interior illumination',
      'Lockable door for security',
      'Tropical rated for warm Australian climates'
    ],
    specs: {
      'Model': 'HUS-SC70-SS',
      'Brand': 'Schmick',
      'Gross Capacity': '70 Litres (85 cans)',
      'Exterior Dimensions': '430mm (W) x 500mm (D) x 700mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['schmick bar fridge', 'bar fridges for sale', 'glass door bar fridge', 'tropical bar fridge australia']
  },
  {
    id: 'rhino-sg1r-hd',
    name: 'Rhino SG1R-HD Stainless Steel Heated Glass Door Bar Fridge 129L',
    slug: 'rhino-sg1r-hd-129l-heated-glass-door-bar-fridge',
    price: 1867,
    originalPrice: 2087,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Glass Door Display',
    badge: 'Sale',
    rating: 4.7,
    reviewsCount: 4,
    capacityLitres: 129,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 600, depth: 500, height: 840 },
    tropicalRated: true,
    ambientRating: 'Alfresco Rated',
    noiseLevelDb: 40,
    energyStars: 7,
    finish: 'Stainless Steel with Heated Glass Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A quiet-running single door bar fridge with a heated glass panel to stop condensation fogging the display, built with genuine brand parts for reliable round-the-clock operation.',
    features: [
      'Heated glass door prevents external condensation',
      'Holds up to 140 standard cans',
      'Low energy consumption compressor',
      'Quiet running operation',
      'Suitable for indoor or covered alfresco use'
    ],
    specs: {
      'Model': 'SG1R-HD',
      'Brand': 'Rhino',
      'Gross Capacity': '129 Litres (140 cans)',
      'Exterior Dimensions': '600mm (W) x 500mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '7 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['rhino bar fridge', 'heated glass door fridge', 'bar fridges for sale', 'buy bar fridge']
  },
  {
    id: 'rhino-env1l-sd',
    name: 'Rhino ENVY ENV1L-SD 316 Stainless Solid Door Bar Fridge 148L',
    slug: 'rhino-env1l-sd-148l-alfresco-solid-door-bar-fridge',
    price: 2747,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Solid Stainless Steel Door',
    badge: 'Premium',
    rating: 4.9,
    reviewsCount: 5,
    capacityLitres: 148,
    temperatureRange: '0°C to 8°C',
    dimensions: { width: 600, depth: 575, height: 840 },
    tropicalRated: true,
    ambientRating: '43°C+ Rated',
    noiseLevelDb: 41,
    energyStars: 8,
    finish: '316 Marine Grade Stainless Steel Solid Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Part of the ENVY range engineered to keep beer coldest in 43°C+ heat. The solid door version trades the glass display front for extra insulation, ideal for exposed alfresco installations.',
    features: [
      '316 marine grade stainless steel body',
      'Left hinge solid door for tighter insulation',
      'Holds 140 cans or 48 wine bottles',
      'No condensation build-up in humid conditions',
      'Rated for direct outdoor exposure'
    ],
    specs: {
      'Model': 'ENV1L-SD',
      'Brand': 'Rhino',
      'Gross Capacity': '148 Litres (140 cans / 48 wine bottles)',
      'Exterior Dimensions': '600mm (W) x 575mm (D) x 840mm (H)',
      'Suitability': 'Indoor or Outdoor',
      'Energy Star Rating': '8 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['rhino envy bar fridge', 'outdoor bar fridge for sale', 'alfresco bar fridge', '316 stainless bar fridge']
  },
  {
    id: 'rhino-sg1r-nc',
    name: 'Rhino SG1R-NC Night Club Multi-Colour LED Bar Fridge 129L',
    slug: 'rhino-sg1r-nc-129l-nightclub-led-bar-fridge',
    price: 1587,
    originalPrice: 1717,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Night Club Multi-Colour LED',
    badge: 'Sale',
    rating: 4.6,
    reviewsCount: 12,
    capacityLitres: 129,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 600, depth: 500, height: 840 },
    tropicalRated: false,
    ambientRating: 'Commercial Indoor',
    noiseLevelDb: 39,
    energyStars: 9,
    finish: 'Black Cabinet with Multi-Colour LED Interior',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A commercial-grade black bar fridge with switchable multi-colour LED lighting designed for nightclubs, cocktail bars, and event spaces that want the drinks display to be part of the atmosphere.',
    features: [
      'Multi-colour switchable LED interior lighting',
      'Commercial-grade quiet compressor',
      'Right hinged door',
      'Holds up to 140 standard cans',
      'Energy efficient for continuous commercial use'
    ],
    specs: {
      'Model': 'SG1R-NC',
      'Brand': 'Rhino',
      'Gross Capacity': '129 Litres (140 cans)',
      'Exterior Dimensions': '600mm (W) x 500mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['nightclub bar fridge', 'led bar fridge', 'commercial bar fridge for sale', 'rhino bar fridge']
  },

  // ---- Double & Triple Door Bar Fridges ----
  {
    id: 'schmick-sk190-ss',
    name: 'Schmick SK190-SS 2 Door Heated Glass Bar Fridge 190L',
    slug: 'schmick-sk190-ss-190l-2-door-heated-glass-bar-fridge',
    price: 1627,
    originalPrice: 1807,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Hinged Double Glass Door',
    badge: 'Sale',
    rating: 4.8,
    reviewsCount: 27,
    capacityLitres: 190,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 870, depth: 500, height: 875 },
    tropicalRated: true,
    ambientRating: 'Tropical Rated',
    noiseLevelDb: 41,
    energyStars: 6,
    finish: 'Stainless Steel with Heated Triple Glazed Glass',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A 190 litre double hinged door fridge with heated triple glazing, sized for busy home bars and small venues that need more display width than a single door unit offers.',
    features: [
      'Two independent hinged glass doors',
      'Heated glass eliminates condensation fogging',
      'Holds up to 220 standard cans',
      'Triple glazed for thermal efficiency',
      'Stainless steel cabinet'
    ],
    specs: {
      'Model': 'SK190-SS',
      'Brand': 'Schmick',
      'Gross Capacity': '190 Litres (220 cans)',
      'Exterior Dimensions': '870mm (W) x 500mm (D) x 875mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '6 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['schmick 2 door bar fridge', 'double door bar fridge for sale', 'commercial bar fridge']
  },
  {
    id: 'rhino-sg2s-b',
    name: 'Rhino SG2S-B Black Sliding 2 Door Bar Fridge 208L',
    slug: 'rhino-sg2s-b-208l-sliding-2-door-bar-fridge',
    price: 1877,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Sliding Double Door',
    badge: 'Best Value',
    rating: 4.7,
    reviewsCount: 18,
    capacityLitres: 208,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 900, depth: 515, height: 840 },
    tropicalRated: true,
    ambientRating: 'Commercial Tropical',
    noiseLevelDb: 42,
    energyStars: 9,
    finish: 'Black Cabinet with Sliding Glass Doors',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Space-saving sliding double doors make this under bench fridge ideal for tight walkways behind commercial bars, where a hinged door would swing into foot traffic.',
    features: [
      'Space-saving sliding double glass doors',
      'Energy efficient compressor',
      'Holds up to 240 standard cans',
      'Under bench footprint',
      'Commercial-grade continuous duty rated'
    ],
    specs: {
      'Model': 'SG2S-B',
      'Brand': 'Rhino',
      'Gross Capacity': '208 Litres (240 cans)',
      'Exterior Dimensions': '900mm (W) x 515mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['sliding door bar fridge', 'under bench bar fridge for sale', 'rhino bar fridge']
  },
  {
    id: 'rhino-sg3h-hd',
    name: 'Rhino SG3H-HD Stainless 3 Door Heated Glass Bar Fridge 330L',
    slug: 'rhino-sg3h-hd-330l-3-door-heated-glass-bar-fridge',
    price: 3627,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Triple Door Commercial',
    badge: 'Premium',
    rating: 4.9,
    reviewsCount: 9,
    capacityLitres: 330,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 1350, depth: 500, height: 840 },
    tropicalRated: true,
    ambientRating: 'Commercial Heavy Duty',
    noiseLevelDb: 44,
    energyStars: 7,
    finish: 'Stainless Steel with Heated Glass Doors',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A heavyweight three door commercial fridge for pub back-bars and function venues needing serious cold storage volume without sacrificing display visibility.',
    features: [
      '3 independent hinged heated glass doors',
      'Holds up to 350 standard cans',
      'Heavy duty commercial compressor',
      'Stainless steel cabinet built for continuous use',
      'Heated glass prevents condensation across all 3 doors'
    ],
    specs: {
      'Model': 'SG3H-HD',
      'Brand': 'Rhino',
      'Gross Capacity': '330 Litres (350 cans)',
      'Exterior Dimensions': '1350mm (W) x 500mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '7 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['3 door bar fridge', 'commercial bar fridge for sale', 'rhino triple door fridge']
  },
  {
    id: 'schmick-sk386-b-hd',
    name: 'Schmick SK386-B-HD Black 3 Door Heated Glass Bar Fridge 399L',
    slug: 'schmick-sk386-b-hd-399l-3-door-black-bar-fridge',
    price: 2797,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Triple Door Commercial',
    badge: 'Best Value',
    rating: 4.8,
    reviewsCount: 14,
    capacityLitres: 399,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 1345, depth: 590, height: 840 },
    tropicalRated: true,
    ambientRating: 'Commercial Heavy Duty',
    noiseLevelDb: 44,
    energyStars: 6,
    finish: 'Black Cabinet with Heated Glass Doors',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The largest capacity fridge in our range at 399 litres, built for venues that go through serious volume — three quiet-running heated glass doors keep the full width fog-free.',
    features: [
      'Largest capacity model in the range (399L)',
      'Holds up to 396 standard cans',
      '3 heated glass doors',
      'Quiet running commercial compressor',
      'Black cabinet finish'
    ],
    specs: {
      'Model': 'SK386-B-HD',
      'Brand': 'Schmick',
      'Gross Capacity': '399 Litres (396 cans)',
      'Exterior Dimensions': '1345mm (W) x 590mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '6 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['schmick 3 door bar fridge', 'commercial drinks fridge for sale', 'large bar fridge']
  },

  // ---- Alfresco & Outdoor Bar Fridges ----
  {
    id: 'rhino-env2h-ss',
    name: 'Rhino ENVY ENV2H-SS 316 Stainless 2 Door Alfresco Fridge 248L',
    slug: 'rhino-env2h-ss-248l-316-stainless-alfresco-bar-fridge',
    price: 3847,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: '316 Marine Grade Stainless',
    badge: 'Premium',
    rating: 4.9,
    reviewsCount: 11,
    capacityLitres: 248,
    temperatureRange: '0°C to 8°C',
    dimensions: { width: 900, depth: 575, height: 840 },
    tropicalRated: true,
    ambientRating: '43°C+ Rated',
    noiseLevelDb: 42,
    energyStars: 7,
    finish: '316 Marine Grade Stainless Steel',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The flagship of the ENVY outdoor range, built to keep beer coldest through 43°C+ Australian summers. Full 316 marine grade stainless resists coastal corrosion better than standard 304 grade.',
    features: [
      '316 marine grade stainless steel (coastal corrosion resistant)',
      'Rated for direct outdoor exposure at 43°C+ ambient',
      'Holds 240 cans or 48 wine bottles',
      'No condensation build-up in humid climates',
      'Quiet operation for entertaining areas'
    ],
    specs: {
      'Model': 'ENV2H-SS',
      'Brand': 'Rhino',
      'Gross Capacity': '248 Litres (240 cans / 48 wine bottles)',
      'Exterior Dimensions': '900mm (W) x 575mm (D) x 840mm (H)',
      'Suitability': 'Indoor or Outdoor',
      'Energy Star Rating': '7 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['rhino envy outdoor fridge', 'outdoor bar fridge for sale', '316 stainless alfresco fridge']
  },
  {
    id: 'rhino-env1r-ss',
    name: 'Rhino ENVY ENV1R-SS 316 Stainless Alfresco Bar Fridge 148L',
    slug: 'rhino-env1r-ss-148l-316-stainless-alfresco-bar-fridge',
    price: 2747,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: '316 Marine Grade Stainless',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 19,
    capacityLitres: 148,
    temperatureRange: '0°C to 8°C',
    dimensions: { width: 600, depth: 575, height: 840 },
    tropicalRated: true,
    ambientRating: '43°C+ Rated',
    noiseLevelDb: 41,
    energyStars: 8,
    finish: '316 Marine Grade Stainless Steel',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A single door version of the ENVY outdoor range for smaller alfresco kitchens and BBQ islands, keeping the same 43°C+ heat rating and marine grade stainless build.',
    features: [
      '316 marine grade stainless steel',
      'Rated for direct outdoor exposure',
      'Holds 140 cans or 48 wine bottles',
      'No condensation in humid coastal zones',
      'Compact footprint for BBQ islands'
    ],
    specs: {
      'Model': 'ENV1R-SS',
      'Brand': 'Rhino',
      'Gross Capacity': '148 Litres (140 cans / 48 wine bottles)',
      'Exterior Dimensions': '600mm (W) x 575mm (D) x 840mm (H)',
      'Suitability': 'Indoor or Outdoor',
      'Energy Star Rating': '8 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['rhino envy bar fridge', 'outdoor bar fridge for sale', 'alfresco bbq fridge']
  },
  {
    id: 'schmick-hus-sc88l-ss',
    name: 'Schmick HUS-SC88L-SS Tropical Triple Glazed Alfresco Fridge 98L',
    slug: 'schmick-hus-sc88l-ss-98l-tropical-alfresco-bar-fridge',
    price: 857,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: 'Tropical Heated Glass',
    badge: 'Best Value',
    rating: 4.8,
    reviewsCount: 84,
    capacityLitres: 98,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 470, depth: 500, height: 850 },
    tropicalRated: true,
    ambientRating: 'Tropical Rated',
    noiseLevelDb: 39,
    energyStars: 10,
    finish: 'Stainless Steel with Triple Glazed Low-E Glass',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A tropical-rated triple glazed alfresco fridge with LED strip lighting and a lock, compact enough for tighter outdoor kitchen benches while still handling humid Australian heat well indoors too.',
    features: [
      'Triple glazed Low-E glass door',
      'LED strip interior lighting',
      'Lockable door',
      'Holds up to 115 standard cans',
      'Also suited to indoor use'
    ],
    specs: {
      'Model': 'HUS-SC88L-SS',
      'Brand': 'Schmick',
      'Gross Capacity': '98 Litres (115 cans)',
      'Exterior Dimensions': '470mm (W) x 500mm (D) x 850mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '10 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['schmick alfresco fridge', 'tropical bar fridge', 'outdoor bar fridge for sale']
  },
  {
    id: 'rhino-gsp2h-ss',
    name: 'Rhino GSP2H-SS IP24 Alfresco Twin Door Bar Fridge 210L',
    slug: 'rhino-gsp2h-ss-210l-ip24-alfresco-twin-door-bar-fridge',
    price: 2447,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: 'IP-Rated Weatherproof',
    badge: 'Premium',
    rating: 4.9,
    reviewsCount: 7,
    capacityLitres: 210,
    temperatureRange: '0°C to 8°C',
    dimensions: { width: 900, depth: 500, height: 865 },
    tropicalRated: true,
    ambientRating: 'IP24 Weatherproof',
    noiseLevelDb: 42,
    energyStars: 9,
    finish: 'Stainless Steel with LOW-E Twin Glass Doors',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An IP24-rated twin door alfresco fridge built to shrug off splashes and rain in exposed outdoor kitchens, with LOW-E glass to keep the display cool and condensation-free.',
    features: [
      'IP24 weatherproof rating for outdoor exposure',
      'LOW-E twin glass doors',
      'Holds up to 240 standard cans',
      'Stainless steel cabinet',
      'Suitable for indoor or outdoor installation'
    ],
    specs: {
      'Model': 'GSP2H-SS',
      'Brand': 'Rhino',
      'Gross Capacity': '210 Litres (240 cans)',
      'Exterior Dimensions': '900mm (W) x 500mm (D) x 865mm (H)',
      'Suitability': 'Indoor or Outdoor',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['ip24 outdoor fridge', 'weatherproof bar fridge', 'alfresco twin door fridge']
  },

  // ---- Wine & Dual Zone Beverage Centers ----
  {
    id: 'schmick-sk198d-b-hd',
    name: 'Schmick SK198D-B-HD Under Bench Dual Zone Beer & Wine Fridge 215L',
    slug: 'schmick-sk198d-b-hd-215l-dual-zone-wine-beer-fridge',
    price: 1567,
    originalPrice: 1697,
    category: 'wine-dual-zone',
    categoryName: 'Wine & Dual Zone Beverage Centers',
    subcategory: 'Dual Zone Wine & Beer',
    badge: 'New',
    rating: 4.8,
    reviewsCount: 6,
    capacityLitres: 215,
    temperatureRange: 'Zone 1: 1°C-10°C | Zone 2: 5°C-18°C',
    dimensions: { width: 750, depth: 570, height: 840 },
    tropicalRated: true,
    ambientRating: 'Alfresco Rated',
    noiseLevelDb: 40,
    energyStars: 7,
    finish: 'Black Cabinet with Heated Glass Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A new-for-2026 under bench dual zone fridge that runs independent temperatures for beer and wine side by side, so lagers stay ice cold while reds sit at cellar temperature.',
    features: [
      'Two independent temperature zones',
      'Holds 88 cans or 28 wine bottles',
      'Heated glass door for condensation control',
      'Under bench install footprint',
      'Front venting for cabinetry integration'
    ],
    specs: {
      'Model': 'SK198D-B-HD',
      'Brand': 'Schmick',
      'Gross Capacity': '215 Litres (88 cans / 28 wine bottles)',
      'Exterior Dimensions': '750mm (W) x 570mm (D) x 840mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '7 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['dual zone wine fridge', 'beer and wine fridge for sale', 'schmick wine fridge']
  },
  {
    id: 'schmick-jc190-gg',
    name: 'Schmick JC190-GG Twin Zone Beer & Wine Bar Fridge 190L',
    slug: 'schmick-jc190-gg-190l-twin-zone-wine-beer-fridge',
    price: 1800,
    originalPrice: 2267,
    category: 'wine-dual-zone',
    categoryName: 'Wine & Dual Zone Beverage Centers',
    subcategory: 'Twin Zone Cabinet',
    badge: 'Sale',
    rating: 4.9,
    reviewsCount: 8,
    capacityLitres: 190,
    temperatureRange: 'Zone 1: 1°C-10°C | Zone 2: 5°C-18°C',
    dimensions: { width: 900, depth: 595, height: 800 },
    tropicalRated: true,
    ambientRating: 'Alfresco Rated',
    noiseLevelDb: 39,
    energyStars: 8,
    finish: 'Glass Front Twin Zone Cabinet',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A wide-format twin zone cabinet for home entertainers who want a single showpiece unit covering both a beer fridge and a proper wine cellar zone.',
    features: [
      'Two independently controlled climate zones',
      'Holds 80 cans or 29 wine bottles',
      'Wide format for display-style layouts',
      'Glass front construction',
      'Alfresco rated for covered outdoor areas'
    ],
    specs: {
      'Model': 'JC190-GG',
      'Brand': 'Schmick',
      'Gross Capacity': '190 Litres (80 cans / 29 wine bottles)',
      'Exterior Dimensions': '900mm (W) x 595mm (D) x 800mm (H)',
      'Suitability': 'Indoor / Alfresco',
      'Energy Star Rating': '8 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['twin zone wine fridge', 'wine and beer fridge', 'schmick dual zone fridge']
  },
  {
    id: 'schmick-jc165b',
    name: 'Schmick JC165B Under Bench Dual Zone Beer & Wine Fridge 165L',
    slug: 'schmick-jc165b-165l-under-bench-dual-zone-fridge',
    price: 1567,
    category: 'wine-dual-zone',
    categoryName: 'Wine & Dual Zone Beverage Centers',
    subcategory: 'Under Bench Dual Zone',
    badge: 'Popular',
    rating: 4.7,
    reviewsCount: 10,
    capacityLitres: 165,
    temperatureRange: 'Zone 1: 1°C-10°C | Zone 2: 5°C-18°C',
    dimensions: { width: 750, depth: 570, height: 865 },
    tropicalRated: false,
    ambientRating: 'Standard Indoor',
    noiseLevelDb: 38,
    energyStars: 9,
    finish: 'Under Bench Dual Zone Cabinet',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A compact indoor dual zone fridge sized to slot under standard benchtops, ideal for a kitchen island or home bar where you want beer and wine covered without giving up two appliances of space.',
    features: [
      'Two independent temperature zones',
      'Holds 90 cans or 30 wine bottles',
      'Fits standard under bench cabinetry',
      'Quiet 38dB operation',
      'Indoor use only'
    ],
    specs: {
      'Model': 'JC165B',
      'Brand': 'Schmick',
      'Gross Capacity': '165 Litres (90 cans / 30 wine bottles)',
      'Exterior Dimensions': '750mm (W) x 570mm (D) x 865mm (H)',
      'Suitability': 'Indoor',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['under bench wine fridge', 'dual zone beverage fridge', 'schmick wine fridge']
  },

  // ---- Bar Freezers & Mini Freezers ----
  {
    id: 'schmick-bd36',
    name: 'Schmick BD36 Mini Solid Door Freezer 36L',
    slug: 'schmick-bd36-36l-mini-solid-door-freezer',
    price: 427,
    originalPrice: 527,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Mini Freezers',
    subcategory: 'Compact Underbench Freezer',
    badge: 'Sale',
    rating: 4.6,
    reviewsCount: 15,
    capacityLitres: 36,
    temperatureRange: '-15°C to -18°C',
    dimensions: { width: 440, depth: 470, height: 520 },
    tropicalRated: false,
    ambientRating: 'Up to 25°C Ambient',
    noiseLevelDb: 43,
    energyStars: 9,
    finish: 'White Cabinet with Solid Foamed Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The smallest mini freezer on the Australian market according to the manufacturer, well suited to display items like ice cream and small frozen goods rather than deep meat storage. Reversible door and lockable for tight spaces.',
    features: [
      'Smallest footprint mini freezer available',
      'Reversible door (left or right hinge)',
      'Lockable door',
      'Chills to -15°C to -18°C in up to 25°C ambient',
      'Not suited for deep freezing of meat — display items only'
    ],
    specs: {
      'Model': 'BD36',
      'Brand': 'Schmick',
      'Gross Capacity': '36 Litres (16 cans)',
      'Exterior Dimensions': '440mm (W) x 470mm (D) x 520mm (H)',
      'Suitability': 'Indoor or Outdoor Enclosed Under Cover',
      'Energy Star Rating': '9 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['mini freezer for sale', 'small freezer australia', 'schmick mini freezer', 'compact freezer']
  },
  {
    id: 'dellware-dw-sd50',
    name: 'Dellware DW-SD50 Mini Glass Door Freezer 50L',
    slug: 'dellware-dw-sd50-50l-glass-door-mini-freezer',
    price: 1125,
    originalPrice: 1317,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Mini Freezers',
    subcategory: 'Glass Door Display Freezer',
    badge: 'Sale',
    rating: 4.7,
    reviewsCount: 8,
    capacityLitres: 50,
    temperatureRange: '-12°C to -18°C',
    dimensions: { width: 570, depth: 530, height: 520 },
    tropicalRated: false,
    ambientRating: 'Standard Indoor',
    noiseLevelDb: 42,
    energyStars: 7,
    finish: 'Glass Door Display Cabinet',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A compact glass door freezer for displaying frozen desserts, ice cream tubs, and cocktail garnishes at the bar while keeping them visible to customers.',
    features: [
      'Glass door for visible product display',
      'Compact 50 litre capacity',
      'Suited to hospitality dessert and bar service',
      'Indoor commercial-grade compressor',
      'Holds up to 44 standard cans equivalent'
    ],
    specs: {
      'Model': 'DW-SD50',
      'Brand': 'Dellware',
      'Gross Capacity': '50 Litres (44 cans)',
      'Exterior Dimensions': '570mm (W) x 530mm (D) x 520mm (H)',
      'Suitability': 'Indoor',
      'Energy Star Rating': '7 Stars',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['glass door freezer', 'mini display freezer', 'bar freezer for sale']
  },
  {
    id: 'schmick-sk-bdc60',
    name: 'Schmick SK-BDC60 Portable 12V/24V/240V Camping Fridge Freezer 60L',
    slug: 'schmick-sk-bdc60-60l-portable-12v-camping-fridge-freezer',
    price: 997,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Mini Freezers',
    subcategory: 'Portable 12V Camping Freezer',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 22,
    capacityLitres: 60,
    temperatureRange: '-18°C to +10°C (Adjustable)',
    dimensions: { width: 740, depth: 495, height: 520 },
    tropicalRated: false,
    ambientRating: 'Portable / All-Weather',
    noiseLevelDb: 45,
    energyStars: 0,
    finish: 'Rotomolded Portable Cabinet',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'A dual-purpose portable fridge/freezer that runs off 12V, 24V, or 240V power, built for camping trips, tailgates, and 4WD touring where mains power isn\'t always available.',
    features: [
      'Runs on 12V, 24V, or 240V power sources',
      'Switchable between fridge and freezer modes',
      'Holds up to 69 standard cans',
      'Portable rotomolded build for off-road use',
      'Digital temperature control'
    ],
    specs: {
      'Model': 'SK-BDC60',
      'Brand': 'Schmick',
      'Gross Capacity': '60 Litres (69 cans)',
      'Exterior Dimensions': '740mm (W) x 495mm (D) x 520mm (H)',
      'Suitability': 'Indoor / Alfresco / Camping',
      'Power': '12V / 24V / 240V',
      'Warranty': '2 Years Parts & Labour'
    },
    seoKeywords: ['portable camping fridge freezer', '12v fridge freezer', 'camping freezer australia']
  }
];
