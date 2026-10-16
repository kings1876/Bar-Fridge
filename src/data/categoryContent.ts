// Buyer's-guide copy for each category page (rendered under the product grid and
// included in the prerendered HTML). Keywords come from docs/keywords/targets.md.
// Facts here are general product knowledge (climate classes, ventilation, materials);
// store-specific numbers (model count, from-price) are computed live in the component.

export interface GuideSection {
  h: string;
  p: string[];
}
export interface CategoryGuide {
  heading: string; // H2 above the guide
  intro: string[];
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  blog: { slug: string; label: string };
  related: string[]; // category ids
}

export const CATEGORY_GUIDES: Record<string, CategoryGuide> = {
  'alfresco-outdoor': {
    heading: 'Choosing an Alfresco Bar Fridge for Australian Conditions',
    intro: [
      'An alfresco bar fridge has to cope with things an indoor fridge never sees: 40°C afternoons, humidity, salt air, dust and the occasional splash from the hose or a summer storm. That is why a standard indoor bar fridge is a poor fit for a patio, pool area or outdoor kitchen, and why this range focuses on outdoor fridge models built for the job.',
      'Every alfresco bar fridge below is tropical rated, so it keeps cooling when the ambient temperature climbs. Use the guide below to match the right outdoor bar refrigerator to your space.'
    ],
    sections: [
      {
        h: 'Look for a tropical (Class T) rating',
        p: [
          'Fridges are tested to a climate class. Standard SN and N units are designed for roughly 10°C to 32°C rooms, ST units for up to about 38°C, and Class T (tropical) units for up to 43°C. For an outdoor fridge in most of Australia, Class T is the safe choice because a covered alfresco area can easily exceed 35°C in summer.'
        ]
      },
      {
        h: '316 marine stainless steel vs IP-rated weatherproof',
        p: [
          '316 marine grade stainless steel resists corrosion from salt and moisture better than the 304 grade used on many indoor appliances, which matters near the coast or around a pool. IP-rated weatherproof models list how well the cabinet resists dust and water on their spec sheet; check the rating and the manufacturer\'s installation notes, because even weatherproof fridges should be placed under cover and away from direct rain and sprinklers.'
        ]
      },
      {
        h: 'Built-in or freestanding',
        p: [
          'If the fridge slides into joinery in an outdoor kitchen, choose a front-breathing model that vents through the kickplate. Rear-venting units need clear space behind and beside them, so they suit freestanding spots. Measure the opening and allow for the door swing before you order.'
        ]
      },
      {
        h: 'Glass door or solid door',
        p: [
          'A glass door alfresco bar fridge shows off the drinks and makes it quick to grab a beer without holding the door open, but a solid door holds temperature a little better in direct heat. Double glazed doors reduce condensation in humid weather.'
        ]
      }
    ],
    faqs: [
      {
        q: 'Can I use an indoor bar fridge outside?',
        a: 'It is not recommended. Indoor fridges are usually rated for cooler rooms, are not built to resist moisture or salt and can lose cooling performance in outdoor heat. An outdoor bar fridge with a tropical rating and a corrosion-resistant cabinet is designed for those conditions.'
      },
      {
        q: 'Does an outdoor fridge need to be under cover?',
        a: 'Yes. Even IP-rated and marine stainless models perform best and last longer when kept out of direct rain, sprinklers and full midday sun. Follow the installation guidance for the specific model.'
      },
      {
        q: 'What is the difference between an alfresco bar fridge and a normal bar fridge?',
        a: 'An alfresco bar fridge is built for outdoor use: tropical climate rating, corrosion-resistant stainless steel or sealed construction and often a front-breathing design for built-in outdoor kitchens.'
      }
    ],
    blog: { slug: 'why-tropical-rated-bar-fridges-matter', label: 'Why tropical-rated fridges matter outdoors' },
    related: ['single-door', 'double-triple-door', 'wine-dual-zone']
  },

  'single-door': {
    heading: 'How to Choose an Under Bench or Single Door Bar Fridge',
    intro: [
      'A single door bar fridge is the most popular size for home bars, man caves, offices and granny flats, and an under bench bar fridge slides neatly beneath a benchtop without taking up floor space. This range covers glass door display fridges, skinny upright models, novelty and branded mini bars and solid stainless steel units.',
      'Because there are so many single door fridges to pick from, start with where it will live and what you will keep in it.'
    ],
    sections: [
      {
        h: 'Under bench fit and ventilation',
        p: [
          'If the fridge will sit under a bench or in a cabinet, check the height, width and depth against the space and choose a front-breathing model that vents heat through the kickplate. A rear-venting fridge needs clearance around it and can overheat when boxed in.'
        ]
      },
      {
        h: 'Glass door vs solid door',
        p: [
          'A glass door bar fridge doubles as a display and is the usual choice for bars and entertaining areas. Double glazed glass reduces condensation in humid weather, while a solid stainless door is more energy conscious and suits spots where you do not want the contents on show.'
        ]
      },
      {
        h: 'Skinny uprights and mini bars',
        p: [
          'Skinny upright models give you more storage in a smaller footprint, which suits narrow gaps beside a bench or in a games room. Novelty and branded mini bars are a fun fit for a man cave or rumpus room where style matters as much as capacity.'
        ]
      },
      {
        h: 'Noise and climate rating',
        p: [
          'For a bedroom, cinema room or open-plan living area, look for a quiet unit; compressor and fan noise varies between models. If the fridge will sit in a garage, verandah or hot room, choose a tropical rated model so it keeps cooling in summer.'
        ]
      }
    ],
    faqs: [
      {
        q: 'What size under bench bar fridge do I need?',
        a: 'Measure the opening first, then choose the largest capacity that fits with the ventilation space the manufacturer specifies. Smaller 50 to 70 litre units suit a couple of drinks shelves, while larger single door fridges hold bottles and cartons.'
      },
      {
        q: 'Can a bar fridge be built into cabinetry?',
        a: 'Only if it is designed for it. Look for a front-breathing under bench bar fridge that vents through the kickplate; rear-venting models need open space around them.'
      },
      {
        q: 'Why does my glass door bar fridge sweat?',
        a: 'Condensation forms when warm humid air meets a cold glass surface. Double glazed or low-E glass doors reduce it, and keeping the door closed and the fridge out of direct humidity helps too.'
      }
    ],
    blog: { slug: 'top-bar-fridges-for-sale-australia-guide', label: 'Read our bar fridge buying guide' },
    related: ['double-triple-door', 'alfresco-outdoor', 'wine-dual-zone']
  },

  'double-triple-door': {
    heading: 'Choosing a Double Door or Commercial Bar Fridge',
    intro: [
      'A double door bar fridge gives pubs, cafes, clubs, event venues and serious home bars the capacity and display space a single door unit cannot match. This range includes hinged double glass door, sliding double door and triple door commercial bar fridges.',
      'Because commercial bar fridges run constantly and are opened all day, performance and efficiency matter as much as size.'
    ],
    sections: [
      {
        h: 'Hinged vs sliding doors',
        p: [
          'Hinged doors are the standard for back bar coolers and need clear space to swing open. Sliding doors save room in tight service areas where a swinging door would be in the way. Check the clearance in front of the fridge before you decide.'
        ]
      },
      {
        h: 'Two doors or three',
        p: [
          'A 2 door bar fridge suits a home bar, small cafe or function room. A triple door commercial bar fridge adds capacity and shelving for venues that stock a wide range of bottles, cans and mixers. Match capacity to peak service, not average days.'
        ]
      },
      {
        h: 'Heat, ventilation and noise',
        p: [
          'Commercial units work harder in hot rooms, so look for a tropical rated bar fridge if the area is warm. Allow ventilation clearance for the compressor, and note that forced-air commercial fridges can be louder than domestic models, which is fine behind a bar but noticeable near a lounge or television.'
        ]
      },
      {
        h: 'Running costs',
        p: [
          'A commercial bar fridge can be one of the bigger electricity loads in a venue. Good door seals, LED lighting and sensible placement away from ovens and direct sun all help keep running costs down.'
        ]
      }
    ],
    faqs: [
      {
        q: 'What is the best double door bar fridge for a venue?',
        a: 'The best choice depends on capacity, door type and ambient heat. For busy bars choose a tropical rated commercial bar fridge with enough shelving for your peak stock and a door style that fits your space.'
      },
      {
        q: 'Can I use a commercial bar fridge at home?',
        a: 'Yes. Many home bars and alfresco areas use commercial bar fridges for their capacity and display. Be aware that some commercial models are louder than domestic fridges.'
      },
      {
        q: 'How much space does a double door bar fridge need?',
        a: 'Allow for the fridge dimensions, door swing for hinged models and the ventilation clearance listed by the manufacturer.'
      }
    ],
    blog: { slug: 'energy-efficiency-bar-fridge-power-bills', label: 'Cut your bar fridge running costs' },
    related: ['single-door', 'alfresco-outdoor', 'bar-freezers']
  },

  'wine-dual-zone': {
    heading: 'Wine Fridges and Dual Zone Beverage Fridges: What to Look For',
    intro: [
      'A wine fridge keeps bottles at a steady, gentle temperature, while a dual zone beverage fridge lets you hold wine and cold drinks at two different temperatures in one cabinet. This range covers under bench dual zone units, dual zone wine and beer fridges and wine-only cabinets.',
      'If you serve both wine and beer, a dual zone wine and beverage fridge saves buying two appliances.'
    ],
    sections: [
      {
        h: 'Why dual zone?',
        p: [
          'Wine is generally stored and served warmer than beer and soft drinks. As a rough guide, wine suits roughly 12°C to 14°C for storage, while beer and soft drinks are best served at around 2°C to 5°C. A dual zone fridge gives each zone its own temperature control so you are not forced to compromise.'
        ]
      },
      {
        h: 'Under bench or freestanding',
        p: [
          'Under bench beverage fridges tuck into joinery and are a popular choice for kitchens and bars. Freestanding cabinets suit a dining room or wine corner. For built-in fitting, choose a front-breathing model and leave the clearance the manufacturer specifies.'
        ]
      },
      {
        h: 'Shelving and capacity',
        p: [
          'Check how many bottles the cabinet holds and whether the shelves adjust. Wooden or sliding shelves help with display and make it easier to reach bottles at the back.'
        ]
      },
      {
        h: 'Vibration, UV and the door',
        p: [
          'Wine prefers low vibration and protection from light. A tinted or UV-protective glass door helps keep bottles stable, and a well-sealed door keeps temperatures consistent.'
        ]
      }
    ],
    faqs: [
      {
        q: 'What is the difference between a wine fridge and a beverage fridge?',
        a: 'A wine fridge is built to hold wine at a stable cellar-like temperature. A beverage fridge runs colder for beer and soft drinks. A dual zone wine and beverage fridge does both in one cabinet.'
      },
      {
        q: 'Can I store beer in a wine fridge?',
        a: 'Single zone wine fridges are usually too warm for beer you want served cold. A dual zone fridge lets you set one zone for beer and another for wine.'
      },
      {
        q: 'Does a wine fridge need ventilation?',
        a: 'Yes. Follow the manufacturer clearance for the model, and choose a front-breathing unit if it will be built into cabinetry.'
      }
    ],
    blog: { slug: 'top-bar-fridges-for-sale-australia-guide', label: 'Read our bar fridge buying guide' },
    related: ['single-door', 'double-triple-door', 'alfresco-outdoor']
  },

  'bar-freezers': {
    heading: 'Choosing a Bar Freezer or Mini Freezer',
    intro: [
      'A bar freezer is the right partner to a bar fridge when you need ice, ice cream, frozen mixers or frozen food on hand. This range includes compact under bench freezers, glass door display freezers, upright commercial freezers and portable 12V camping freezers.',
      'A bar freezer holds food at deep freeze temperature, while a bar fridge only chills, so check which one your use case actually needs.'
    ],
    sections: [
      {
        h: 'Bar fridge or bar freezer?',
        p: [
          'A bar fridge keeps drinks cold but not frozen. A bar freezer is designed to hold items at around minus 18°C, which suits ice, ice cream, frozen cocktail ingredients and food. Many home bars use both. Our comparison guide explains the difference in more detail.'
        ]
      },
      {
        h: 'Compact under bench and upright freezers',
        p: [
          'A compact under bench freezer fits beneath a bench in a bar or kitchen. An upright bar freezer takes less floor space for the storage it offers and makes it easier to see and reach what is inside. Commercial upright models add capacity for venues.'
        ]
      },
      {
        h: 'Glass door display freezers',
        p: [
          'A glass door display freezer suits ice cream, packaged frozen treats and retail or cafe display. The glass lets customers see the product without opening the door.'
        ]
      },
      {
        h: 'Portable 12V camping freezers',
        p: [
          'Portable freezers that run from a vehicle 12V supply are built for camping, caravans and boats. Check the power requirements and consider a battery or dual battery setup for long trips.'
        ]
      }
    ],
    faqs: [
      {
        q: 'What temperature does a bar freezer run at?',
        a: 'Freezers are designed to hold food frozen, typically around minus 18°C. Check the temperature range on the specific model.'
      },
      {
        q: 'Do bar freezers need to be tropical rated?',
        a: 'If the freezer will sit in a hot garage, verandah or commercial kitchen, a tropical rated model keeps performing better in high ambient temperatures.'
      },
      {
        q: 'Can I put a bar freezer under a bench?',
        a: 'Yes, if it is a compact under bench model. Check the dimensions and the ventilation clearance listed by the manufacturer.'
      }
    ],
    blog: { slug: 'bar-fridge-vs-bar-freezer-comparison', label: 'Bar fridge vs bar freezer: which do you need?' },
    related: ['single-door', 'double-triple-door', 'alfresco-outdoor']
  }
};
