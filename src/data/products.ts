import { Product } from '../types';

export const CATEGORIES = [
  {
    id: 'single-door',
    name: 'Single Door Bar Fridges',
    description: 'Compact and underbench single door glass and solid bar fridges for homes and bars.',
    subcategories: ['Glass Door Display', 'Solid Stainless Underbench', 'Compact Mini Bar']
  },
  {
    id: 'double-triple-door',
    name: 'Double & Triple Door Bar Fridges',
    description: 'High capacity commercial back bar coolers with hinged or sliding glass doors.',
    subcategories: ['Hinged Double Glass Door', 'Sliding Double Door', 'Triple Door Back Bar']
  },
  {
    id: 'alfresco-outdoor',
    name: 'Alfresco & Outdoor Bar Fridges',
    description: 'Marine-grade 304 stainless steel fridges tested for brutal 43°C Australian summer heat.',
    subcategories: ['304 Marine Grade Stainless', 'Tropical Heated Glass', 'Outdoor Built-In BBQ']
  },
  {
    id: 'wine-dual-zone',
    name: 'Wine & Dual Zone Beverage Centers',
    description: 'Independent dual climate zones for storing craft beer, soda, and fine wines.',
    subcategories: ['Dual Zone Wine & Beer', 'Sommelier Underbench', 'Slimline Beverage Tower']
  },
  {
    id: 'bar-freezers',
    name: 'Bar Freezers & Deep Chest Freezers',
    description: 'Sub-zero frost-free commercial bar freezers and deep chest storage freezers.',
    subcategories: ['Glass Door Display Freezer', 'Compact Underbench Freezer', 'Commercial Deep Chest Freezer']
  }
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'polarchill-138l-glass',
    name: 'PolarChill Pro 138L Single Glass Door Bar Fridge',
    slug: 'polarchill-pro-138l-single-glass-door-bar-fridge',
    price: 489,
    originalPrice: 599,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Glass Door Display',
    badge: 'Popular',
    rating: 4.9,
    reviewsCount: 312,
    capacityLitres: 138,
    temperatureRange: '0°C to 10°C (Digital Touch Control)',
    dimensions: { width: 595, depth: 575, height: 840 },
    tropicalRated: true,
    ambientRating: 'Sub-Tropical (Tested up to 38°C)',
    noiseLevelDb: 38,
    energyStars: 4.5,
    finish: 'Brushed Stainless Frame & Double Glazed Low-E Glass',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The PolarChill Pro 138L is our best-selling single door glass bar fridge for Australian homes, man caves, and boutique bars. Engineered with whisper-quiet fan-assisted cooling and Low-E tempered safety glass that stops condensation dead in its tracks.',
    features: [
      'Holds up to 142 standard 375ml beverage cans',
      'Double glazed argon-filled Low-E glass prevents condensation',
      'Quiet Embraco energy-efficient compressor (38dB)',
      'Blue/White switchable ambient interior LED illumination',
      'Security door lock with 2 keys included',
      'Fits neatly under standard 850mm kitchen and bar benchtops'
    ],
    specs: {
      'Gross Capacity': '138 Litres',
      'Exterior Dimensions': '595mm (W) x 575mm (D) x 840mm (H)',
      'Interior Shelves': '3 Heavy Duty Chrome Adjustable Wire Shelves',
      'Refrigerant': 'Eco-Friendly R600a',
      'Compressor': 'Commercial Grade Embraco Quiet Cycle',
      'Door Hinge': 'Right Hand (Reversible)',
      'Warranty': '2 Years Replacement Warranty in Australia'
    },
    seoKeywords: ['bar fridges for sale', 'bar fridge sales', 'bar fridge buy', 'beverage fridge for sale', 'bar fridge prices']
  },
  {
    id: 'outbackmaster-190l-alfresco',
    name: 'OutbackMaster 190L 304 Stainless Alfresco Bar Fridge',
    slug: 'outbackmaster-190l-304-stainless-alfresco-outdoor-bar-fridge',
    price: 899,
    originalPrice: 1049,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: '304 Marine Grade Stainless',
    badge: 'Best Value',
    rating: 5.0,
    reviewsCount: 247,
    capacityLitres: 190,
    temperatureRange: '-2°C to 10°C (Sub-Zero Chill Mode)',
    dimensions: { width: 600, depth: 600, height: 865 },
    tropicalRated: true,
    ambientRating: 'True Tropical Rated (43°C Ambient Tested)',
    noiseLevelDb: 40,
    energyStars: 5.0,
    finish: 'Marine Grade 304 Stainless Steel Interior & Exterior',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Built specifically to survive the scorching Australian outdoor summer. With marine-grade 304 stainless steel inside and out, heated glass door to defeat high humidity, and sub-zero chill capability for ice-cold beer on 40°C patio days.',
    features: [
      'Tropical Class T (43°C ambient temperature certified)',
      'Full 304 grade stainless steel exterior and internal liner',
      'Heated glass panel prevents external condensation in coastal humid zones',
      'Self-closing door with magnetic gasket seal',
      'Front venting underbench design for zero-clearance installations',
      'Sub-Zero chill setting pulls beverages down to -2°C without freezing cans'
    ],
    specs: {
      'Gross Capacity': '190 Litres (approx 198 cans)',
      'Dimensions': '600mm (W) x 600mm (D) x 865mm (H)',
      'Weather Protection': 'IPX4 Waterproof outdoor rated',
      'Glass Type': 'Triple Glazed Heated Tempered Glass',
      'Thermostat': 'Carel Italian Electronic Controller',
      'Lockable': 'Yes, integrated barrel lock',
      'Warranty': '3 Years Nationwide Outdoor Warranty'
    },
    seoKeywords: ['bar fridges for sale', 'outdoor bar fridge for sale', 'alfresco bar fridge', 'drinks fridge for sale', 'buy bar fridge']
  },
  {
    id: 'arc-vault-210l-sliding',
    name: 'ArcticVault 210L Double Sliding Door Commercial Bar Fridge',
    slug: 'arcticvault-210l-double-sliding-door-commercial-bar-fridge',
    price: 949,
    originalPrice: 1099,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Sliding Double Door',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 184,
    capacityLitres: 210,
    temperatureRange: '1°C to 8°C',
    dimensions: { width: 900, depth: 520, height: 900 },
    tropicalRated: true,
    ambientRating: 'Commercial Tropical (38°C Ambient)',
    noiseLevelDb: 42,
    energyStars: 4.5,
    finish: 'Textured Black Steel Shell & Mirrored Polished Interior',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Designed for tight back-bar corridors, restaurant service stations, and crowded games rooms. Smooth sliding double doors save walkway space while the mirror-finish interior amplifies LED beverage display lighting.',
    features: [
      'Space-saving self-closing sliding double glass doors',
      'High-velocity dual circulating fans for rapid pulldown',
      'Polished stainless mirrored interior bounces internal LED light',
      'Sturdy chrome wire shelves with weight capacity of 40kg each',
      'Front breathing design allows tight undercounter installation'
    ],
    specs: {
      'Gross Capacity': '210 Litres (Holds 220 cans)',
      'Dimensions': '900mm (W) x 520mm (D) x 900mm (H)',
      'Door Style': 'Sliding Double Glazed Low-E',
      'Lighting': 'Full Length Vertical Cool White LEDs',
      'Refrigerant': 'R290 Eco Hydrocarbon',
      'Lockable': 'Yes, dual key sliding latch'
    },
    seoKeywords: ['bar fridges for sale', 'bar fridge sales', 'commercial drinks fridge for sale', 'bar refrigerator price']
  },
  {
    id: 'frostpeak-330l-triple',
    name: 'FrostPeak 330L Triple Door Commercial Beverage Chiller',
    slug: 'frostpeak-330l-triple-door-commercial-beverage-chiller',
    price: 1399,
    originalPrice: 1650,
    category: 'double-triple-door',
    categoryName: 'Double & Triple Door Bar Fridges',
    subcategory: 'Triple Door Back Bar',
    badge: 'Premium',
    rating: 4.9,
    reviewsCount: 156,
    capacityLitres: 330,
    temperatureRange: '0°C to 10°C',
    dimensions: { width: 1350, depth: 520, height: 900 },
    tropicalRated: true,
    ambientRating: 'Commercial Heavy Duty (38°C Ambient)',
    noiseLevelDb: 44,
    energyStars: 4.0,
    finish: 'Matte Obsidian Black with Stainless Top Lip',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The heavyweight of Australian pub back-bars and luxury home entertaining suites. Three independent hinged doors provide massive 330-litre cooling volume with room for over 340 beer bottles or cans.',
    features: [
      '3 High-durability self-closing hinged glass doors',
      'Heavy commercial Secop compressor for round-the-clock cooling',
      'Adjustable heavy-gauge steel shelving holds full kegs and cases',
      'Integrated lock system for all 3 doors',
      'Easy clean bottom drain hole and removable shelf clips'
    ],
    specs: {
      'Gross Capacity': '330 Litres',
      'Dimensions': '1350mm (W) x 520mm (D) x 900mm (H)',
      'Compressor': 'Secop Heavy Duty Commercial',
      'Doors': '3 Hinged Argon Filled Low-E Glass Doors',
      'Control': 'Digital Display Microprocessor'
    },
    seoKeywords: ['bar fridges for sale', 'commercial bar fridge for sale', 'drinks fridge for sale', 'bar fridge prices']
  },
  {
    id: 'dualzone-vintner-150l',
    name: 'DualZone Vintner 150L Wine & Craft Beer Center',
    slug: 'dualzone-vintner-150l-wine-and-craft-beer-center',
    price: 779,
    originalPrice: 899,
    category: 'wine-dual-zone',
    categoryName: 'Wine & Dual Zone Beverage Centers',
    subcategory: 'Dual Zone Wine & Beer',
    badge: 'New',
    rating: 4.9,
    reviewsCount: 122,
    capacityLitres: 150,
    temperatureRange: 'Left Zone: 1°C - 10°C | Right Zone: 5°C - 18°C',
    dimensions: { width: 595, depth: 575, height: 820 },
    tropicalRated: true,
    ambientRating: 'Sub-Tropical (38°C)',
    noiseLevelDb: 36,
    energyStars: 5.0,
    finish: 'Seamless Seamless Stainless Door Frame & Beechwood Slats',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'No more compromising between freezing cold IPA cans and cellar-temperature Pinot Noir. Dual precision micro-compressor climate zones allow crisp lagers on the left and fine vintage wines on smooth-glide natural beechwood shelves on the right.',
    features: [
      'Dual independent temperature touch zones with LED readouts',
      'Slide-out roller beechwood wine shelves absorb vibration',
      'Anti-UV smoked glass blocks damaging ultraviolet rays',
      'Active charcoal carbon air filter eliminates interior odours',
      'Front plinth ventilation for seamless integrated joinery'
    ],
    specs: {
      'Capacity': '19 Bordeaux Wine Bottles + 60 Beverage Cans',
      'Dimensions': '595mm (W) x 575mm (D) x 820mm (H)',
      'Vibration Absorption': 'Soft-Mount Rubber Isolated Compressor',
      'Lighting': 'Warm Amber & Soft Blue Atmosphere Modes'
    },
    seoKeywords: ['beverage fridge for sale', 'wine fridge bar fridge buy', 'bar fridges for sale near me', 'drinks fridge for sale']
  },
  {
    id: 'subzero-edge-98l-freezer',
    name: 'SubZero Edge 98L Underbench Bar Freezer',
    slug: 'subzero-edge-98l-underbench-bar-freezer',
    price: 429,
    originalPrice: 499,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Deep Chest Freezers',
    subcategory: 'Compact Underbench Freezer',
    badge: 'Sale',
    rating: 4.8,
    reviewsCount: 96,
    capacityLitres: 98,
    temperatureRange: '-12°C to -24°C Deep Freeze',
    dimensions: { width: 545, depth: 550, height: 845 },
    tropicalRated: true,
    ambientRating: 'Tropical T-Class (Tested to 40°C)',
    noiseLevelDb: 39,
    energyStars: 4.0,
    finish: 'Brushed Stainless Finish with Hidden Pocket Handle',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Keep craft ice balls, frozen margarita mugs, and premium vodka chilled to absolute sub-zero perfection right next to your bar fridge. Frost-free design with heavy pull-out storage drawers.',
    features: [
      'Rapid Super-Freeze Turbo mode for instant party prep',
      'Frost-Free auto defrost technology prevents ice buildup',
      '3 Heavy duty transparent pull-out organizer drawers',
      'Reversible door hinging fits any undercounter space',
      'Whisper quiet 39dB night-quiet operation'
    ],
    specs: {
      'Capacity': '98 Litres',
      'Dimensions': '545mm (W) x 550mm (D) x 845mm (H)',
      'Freezing System': 'Direct Cool Multi-Air Flow',
      'Warranty': '2 Years Full In-Home Warranty'
    },
    seoKeywords: ['bar freezer for sale', 'freezers for sale', 'freezers in sale', 'bar fridge buy']
  },
  {
    id: 'glaciomax-200l-chest-freezer',
    name: 'GlacioMax 200L Commercial Deep Chest Freezer',
    slug: 'glaciomax-200l-commercial-deep-chest-freezer',
    price: 519,
    originalPrice: 620,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Deep Chest Freezers',
    subcategory: 'Commercial Deep Chest Freezer',
    badge: 'Best Value',
    rating: 4.9,
    reviewsCount: 141,
    capacityLitres: 200,
    temperatureRange: '-14°C to -26°C Deep Freeze',
    dimensions: { width: 905, depth: 550, height: 845 },
    tropicalRated: true,
    ambientRating: 'Heavy Tropical (43°C Ambient Tested)',
    noiseLevelDb: 40,
    energyStars: 4.5,
    finish: 'Corrosion-Resistant Powder Coated Steel & Aluminum Liner',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'High-efficiency deep chest freezer engineered for long-term frozen food preservation, party ice storage, and commercial hospitality kitchens. Thick polyurethane insulation retains cold for up to 36 hours during power outages.',
    features: [
      'Counterbalanced stay-open lid (holds at 45° to 90° angles)',
      'Front drainage plug for effortless rapid defrosting',
      'Removable wire hanging basket for quick-access items',
      'Heavy-duty castor wheels for easy mobility around the garage or bar',
      'Super quiet hermetic compressor'
    ],
    specs: {
      'Gross Capacity': '200 Litres',
      'Dimensions': '905mm (W) x 550mm (D) x 845mm (H)',
      'Insulation': '65mm Ultra-Dense Cyclopentane Foam',
      'Lid': 'Foam Insulated Balanced Spring Hinge'
    },
    seoKeywords: ['chest freezer for sale', 'buy chest freezer', 'freezers for sale', 'freezers in sale']
  },
  {
    id: 'stealthbar-70l-mini',
    name: 'StealthBar 70L Ultra-Quiet Hotel & Office Glass Fridge',
    slug: 'stealthbar-70l-ultra-quiet-hotel-and-office-glass-fridge',
    price: 349,
    originalPrice: 410,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Compact Mini Bar',
    badge: 'Best Value',
    rating: 4.7,
    reviewsCount: 169,
    capacityLitres: 70,
    temperatureRange: '2°C to 12°C',
    dimensions: { width: 430, depth: 480, height: 690 },
    tropicalRated: false,
    ambientRating: 'Standard Indoor (Up to 32°C)',
    noiseLevelDb: 32,
    energyStars: 5.0,
    finish: 'Sleek Matte Black Cabinet with Tinted Glass Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Ultra-compact, virtually silent 32dB mini bar fridge crafted for master bedrooms, executive home offices, cinema rooms, and luxury guest suites.',
    features: [
      'Near-silent absorption hybrid cooling cycle at only 32dB',
      'Space-saving slim footprint fits bedside or inside credenzas',
      'Concealed interior soft glow illumination',
      'Adjustable internal shelving with tall bottle door rack',
      'Key lock for privacy'
    ],
    specs: {
      'Capacity': '70 Litres (Holds approx 65 cans)',
      'Dimensions': '430mm (W) x 480mm (D) x 690mm (H)',
      'Sound Output': '32dB (Bedroom Quiet)',
      'Lock': 'Base cylinder lock with 2 keys'
    },
    seoKeywords: ['hisense bar fridge', 'bar fridge buy', 'bar fridges for sale near me', 'bar refrigerator price']
  },
  {
    id: 'alfrescoshield-230l-double',
    name: 'AlfrescoShield 230L Double Door Tropical Rated BBQ Bar Fridge',
    slug: 'alfrescoshield-230l-double-door-tropical-rated-bbq-bar-fridge',
    price: 1180,
    originalPrice: 1350,
    category: 'alfresco-outdoor',
    categoryName: 'Alfresco & Outdoor Bar Fridges',
    subcategory: 'Tropical Heated Glass',
    badge: 'Premium',
    rating: 5.0,
    reviewsCount: 198,
    capacityLitres: 230,
    temperatureRange: '-2°C to 8°C',
    dimensions: { width: 865, depth: 520, height: 865 },
    tropicalRated: true,
    ambientRating: 'Extreme Tropical 43°C Rated',
    noiseLevelDb: 42,
    energyStars: 4.5,
    finish: 'Marine Grade 304 Stainless Steel & Heated Glass Doors',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The definitive outdoor companion for your Australian alfresco outdoor kitchen and BBQ island. Features heated glass to banish condensation during humid wet seasons and commercial stainless racks.',
    features: [
      'Certified Class T 43°C ambient temperature rating',
      'Heated double glazed doors eliminate dripping condensation',
      'Marine grade 304 stainless steel exterior',
      'Front venting under-counter air channel system',
      'IPX4 weatherproof rain and splash protection'
    ],
    specs: {
      'Capacity': '230 Litres (approx 240 cans)',
      'Dimensions': '865mm (W) x 520mm (D) x 865mm (H)',
      'Thermostat': 'Carel Touch Digital Outdoor Controller',
      'Warranty': '3 Years Nationwide Coverage'
    },
    seoKeywords: ['bar fridges for sale', 'outdoor bar fridge for sale', 'bar fridge sales', 'drinks fridge for sale']
  },
  {
    id: 'icemaster-160l-display-freezer',
    name: 'IceMaster 160L Upright Glass Door Display Freezer',
    slug: 'icemaster-160l-upright-glass-door-display-freezer',
    price: 689,
    originalPrice: 799,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Deep Chest Freezers',
    subcategory: 'Glass Door Display Freezer',
    badge: 'Sale',
    rating: 4.8,
    reviewsCount: 88,
    capacityLitres: 160,
    temperatureRange: '-18°C to -22°C Commercial Freeze',
    dimensions: { width: 595, depth: 610, height: 1120 },
    tropicalRated: true,
    ambientRating: 'Sub-Tropical (38°C)',
    noiseLevelDb: 43,
    energyStars: 4.0,
    finish: 'Black Powder Coated Body with Heated Triple Glazed Glass',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Upright commercial display glass door freezer for frozen spirits, luxury ice creams, craft cocktail cubes, and chilled steins. Features heated triple pane glass to maintain crystalline visibility.',
    features: [
      'Heated triple pane glass door stays completely fog-free',
      'Self-closing door with safety lock',
      'Vertical LED strip interior lighting',
      'Adjustable heavy duty frozen goods shelving',
      'Fast pull-down forced air refrigeration system'
    ],
    specs: {
      'Capacity': '160 Litres',
      'Dimensions': '595mm (W) x 610mm (D) x 1120mm (H)',
      'Glass': 'Heated Triple Pane Argon Vacuum Glazing'
    },
    seoKeywords: ['bar freezer for sale', 'freezers for sale', 'freezers in sale', 'electrolux fridges']
  },
  {
    id: 'metrochill-115l-matte-black',
    name: 'MetroChill 115L Matte Black Glass Beverage Fridge',
    slug: 'metrochill-115l-matte-black-glass-beverage-fridge',
    price: 410,
    originalPrice: 480,
    category: 'single-door',
    categoryName: 'Single Door Bar Fridges',
    subcategory: 'Glass Door Display',
    badge: 'Popular',
    rating: 4.8,
    reviewsCount: 175,
    capacityLitres: 115,
    temperatureRange: '1°C to 10°C',
    dimensions: { width: 540, depth: 540, height: 840 },
    tropicalRated: true,
    ambientRating: 'Sub-Tropical (38°C Tested)',
    noiseLevelDb: 38,
    energyStars: 4.5,
    finish: 'Contemporary Matte Black with Smoked Glass Door',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The architect\'s choice. Seamless matte black aluminum framing with subtle smoked glass and minimalist touch thermostat. Adds sleek modern luxury to modern kitchens and entertaining zones.',
    features: [
      'Architectural minimalist matte black exterior',
      'Smoked double-glazed UV resistant glass',
      'Low noise 38dB fan cooling',
      'Chromed flat wire shelves with anti-roll lip',
      'Automatic cycling defrost'
    ],
    specs: {
      'Capacity': '115 Litres (Holds approx 110 cans)',
      'Dimensions': '540mm (W) x 540mm (D) x 840mm (H)',
      'Weight': '34 kg'
    },
    seoKeywords: ['bar fridges for sale', 'bar fridge buy', 'bar refrigerator price', 'beverage fridge for sale']
  },
  {
    id: 'nordicfrost-280l-chest',
    name: 'NordicFrost 280L Heavy Duty Commercial Chest Freezer',
    slug: 'nordicfrost-280l-heavy-duty-commercial-chest-freezer',
    price: 629,
    originalPrice: 750,
    category: 'bar-freezers',
    categoryName: 'Bar Freezers & Deep Chest Freezers',
    subcategory: 'Commercial Deep Chest Freezer',
    badge: 'Best Value',
    rating: 4.9,
    reviewsCount: 160,
    capacityLitres: 280,
    temperatureRange: '-14°C to -28°C Deep Freeze',
    dimensions: { width: 1115, depth: 645, height: 850 },
    tropicalRated: true,
    ambientRating: 'Heavy Tropical 43°C Rated',
    noiseLevelDb: 41,
    energyStars: 5.0,
    finish: 'Commercial Stucco Embossed Aluminum Interior with Lock',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Massive capacity deep chest freezer built for venues, sports clubs, catering companies, and home bulk storage. Tropical rated for hot Australian sheds and garages.',
    features: [
      'Huge 280-litre deep storage cavern',
      'Includes 2 heavy duty powder-coated storage baskets',
      'Stucco aluminum inner lining accelerates freezing transfer',
      'Exterior temperature adjustment dial and power indicator',
      'Key lock on lid handle for security'
    ],
    specs: {
      'Capacity': '280 Litres',
      'Dimensions': '1115mm (W) x 645mm (D) x 850mm (H)',
      'Defrost': 'Manual with Front Drain Outlet',
      'Warranty': '2 Years Commercial Warranty'
    },
    seoKeywords: ['chest freezer for sale', 'buy chest freezer', 'freezers for sale', 'freezers in sale']
  }
];
