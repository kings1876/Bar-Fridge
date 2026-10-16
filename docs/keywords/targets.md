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
