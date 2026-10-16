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
Products: unique model-name titles; description = first sentence + free shipping.
