# Page keyword targets (decided 2026-10-16)

"bar fridge" (KD 23, intent blank) and "bar fridges" (KD 23, informational) are NOT used: they fail the KD limits.
Data rule: each keyword uses its row from the Semrush file where it is most relevant (same keyword differs by file).

| Page | Primary | Vol | KD | Intent | Secondary |
|---|---|---|---|---|---|
| Home `/` | outdoor bar fridge | 1,900 | 8 | Transactional | outdoor bar fridges (480, KD 12), alfresco bar fridge (170, KD 6) |
| Shop `/shop` | bar fridges for sale | 590 | 20 | Transactional | beer fridge (1,600, KD 11), drinks fridge (1,600, KD 11) |

Note: "bar fridges for sale" is KD 20 on its own Semrush run but 25 in two other files — borderline.
Fallback for Shop if it underperforms: outdoor bar refrigerator.

## Full page map (implemented in src/seo/seo.ts)
| Page | Primary keyword | Also |
|---|---|---|
| /category/alfresco-outdoor | alfresco bar fridge | outdoor fridge, bar fridge alfresco, outdoor bar refrigerator |
| /category/single-door | under bench bar fridge | single door bar fridge, under bench fridge, glass door fridge |
| /category/double-triple-door | double door bar fridge | commercial bar fridge, 2 door bar fridge |
| /category/wine-dual-zone | wine fridge | beverage fridge, dual zone wine and beverage fridge |
| /category/bar-freezers | bar freezer | bar freezers, bar freezer for sale, upright bar freezer |
| Blog: top guide | best bar fridge | |
| Blog: tropical rated | outdoor fridge | |
| Blog: fridge vs freezer | upright bar freezer | |
| Blog: crypto 10% | bar fridge au | no stronger data-backed term |
| Blog: energy | energy efficient bar fridge | |
| Blog: outdoor-kitchen-fridge-guide | outdoor kitchen fridge (320, KD 11) | fridge for outdoor kitchen, outdoor kitchen refrigerator |
| Blog: glass-door-fridge-guide | glass door fridge (1,300, KD 8) | fridge with glass door, glass door drink cooler |
| Blog: built-in-bar-fridge-guide | built in bar fridge (90, KD 16) | bar fridge height, built in wine and beverage fridge |
| Blog: beer-fridge-guide | beer fridge (1,600, KD 11) | drinks fridge, best temperature for beverage refrigerator |
| Blog: quiet-bar-fridge-guide | quiet bar fridge (70, KD 1) | best bar fridges |
| Blog: retro-bar-fridge-guide | retro bar fridge (480, KD 11) | mini retro fridge, retro style fridge |
Guide posts live in src/data/blogPostsGuides.ts (markup: ## h2, ### h3, - list, [label](/path)).
Products: unique model-name titles; description = first sentence + free shipping.

## Guide posts batch 2 (src/data/blogPostsGuides2.ts)
| Post | Primary keyword | Also |
|---|---|---|
| dual-zone-wine-and-beverage-fridge-guide | dual zone wine and beverage fridge (390, KD 4-12) | wine fridge dual zone (210, KD 10) |
| commercial-bar-fridge-guide | commercial bar fridge (590, KD 6) | commercial bar fridges (260, KD 12) |
| mini-bar-fridge-guide | mini bar fridges (320, KD 17) | mini fridge vintage (210, KD 6) |
| lockable-bar-fridge-guide | lockable bar fridge (90, KD 12) | mini fridge with lock (210, KD 14), bar fridge with lock (50, KD 11) |
| rhino-bar-fridge-guide | rhino bar fridge (210, KD 6) | rhino fridges (110), rhino bar fridges (70), rhino fridge (70) |
| branded-beer-fridge-guide | vb beer fridge (170, KD 15) | vb fridge (210, KD 16), man cave fridges (70, KD 3) |
