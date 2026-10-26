# SEO blog plan: 20 Oct to 31 Dec 2026

Goal: win the unused, low-difficulty commercial and transactional keywords in the bank (docs/keywords) that the 23 existing posts do not target yet, in the weeks that matter for Australian buyers (Black Friday, summer, Christmas).

Rules
- Standing keyword rule (from 26 Oct): every post uses commercial and transactional keywords from the bank, one primary plus 3 to 5 supporting, all used in the text. The set for each post is in docs/keywords/blog-post-keywords.json, and `node scripts/check-blog-keywords.mjs` must pass after the build.
- Cadence: 2 posts a week (Tuesday and Friday), 20 posts in total, starting Tuesday 20 Oct.
- One primary keyword per post, 4 to 5 supporting keywords written into the text naturally. Primary in the title (60 characters or fewer), meta description, H1 (distinct from every other page), first paragraph and one H2.
- Length 1,200 to 1,600 words, one FAQ block, a comparison table where it helps, product facts only from the catalogue (capacity, size, rating, price). No invented claims, no fake sales.
- Every post links to its category page, 3 or more product pages, and 2 related guides. Each product it features links back.
- Keyword codes: T = transactional (KD under 25), C = commercial (KD under 20). Format: monthly volume / KD.
- Excluded on purpose: competitor brands we do not stock (Husky, Haier, Westinghouse, Vintec, Smeg, Hisense), BBQ and outdoor kitchen terms, city-specific terms.

## Calendar

| # | Date | Post (working title) | Primary keyword | Supporting keywords | Intent | Link to |
|---|---|---|---|---|---|---|
| 1 | Tue 20 Oct | Double Door Bar Fridges: Sizes, Glass and Venue Use | double door bar fridge 590/7 C | 2 door bar fridge 590/8, bar fridge 2 door 170/5, double bar fridge 320/6, bar fridge double door 140/6, two door bar fridge 110/14 | Commercial | /category/double-triple-door, Hinged Double Glass Door |
| 2 | Fri 23 Oct | Bar Fridges Australia: The Complete Buying Hub | bar fridges australia 3600/17 C | best bar fridges australia 140/16, bar fridges for sale 590/20 T, best bar fridge 320/14 | Commercial (pillar) | all 5 categories, 5 existing guides |
| 3 | Tue 27 Oct | 3 Door Bar Fridges for Venues and Big Entertaining | 3 door bar fridge 390/7 C | 3 door commercial fridge 140/6, commercial bar fridge 590/6, 3 door bar fridges 70/4 | Commercial | Triple Door Commercial |
| 4 | Fri 30 Oct | Drink Fridge: How to Pick the Right One | drink fridge 1000/13 C | drink refrigerator 480/15, drink fridges 210/18, fridge for beverages 590/13, fridge with drinks 1300/16 | Commercial | /shop, Glass Door Display |
| 5 | Tue 3 Nov | Under Bench Fridges and Under Counter Bar Fridges | under bench fridges 260/6 C | under counter bar fridge 320/15, undercounter bar fridge 170/9, bar fridge under counter 170/14 T, underbench bar fridge 110/4, under counter fridge for sale 50/8 T | Commercial + transactional | single-door, front-venting models |
| 6 | Fri 6 Nov | Outdoor Bar Refrigerators for Sale in Australia | outdoor bar refrigerator 1300/14 T | refrigerator outdoors 480/13, refrigerator for outdoors 320/17, outdoor fridges for sale 30/8 T, outdoor fridge sale 70/11 T | Transactional | /category/alfresco-outdoor |
| 7 | Tue 10 Nov | Beer and Wine Fridge: One Dual Zone or Two Fridges? | beer wine fridges 260/7 C | beer and wine fridge 210/11, wine beer fridge 170/14, beer and wine refrigerator 140/7, beer wine coolers 140/12 | Commercial | /category/wine-dual-zone |
| 8 | Fri 13 Nov | Drinks Fridge With a Glass Door: Glazing, Lights and Locks | drinks fridge glass door 260/13 C | glass door drinks fridge 320/11, beverage fridge with glass door 320/12, glass door drink refrigerator 210/10, beverage fridge glass door 110/15 T | Commercial | Glass Door Display (check overlap with glass-door-fridge-guide) |
| 9 | Tue 17 Nov | 50L, 70L and 80L Bar Fridges: What Fits and Who It Suits | 70l bar fridge 140/15 C | 50l bar fridge 140/8, 80 litre bar fridge 140/17, 90l bar fridge 90/10 | Commercial | products by capacity (from catalogue data) |
| 10 | Fri 20 Nov | Commercial Beer Fridges for Pubs, Cafes and Clubs | commercial beer fridge 210/6 C | commercial beer refrigerator 170/4, commercial bar fridge for sale 210/22 T, display fridges for sale 210/10 T, commercial drink fridges 110/4 | Commercial + transactional | Triple Door Commercial, Hinged Double Glass |
| 11 | Tue 24 Nov | Bar Fridge Prices in Australia: What You Pay and Why | bar refrigerator price 50/17 T | bar fridge prices 50/17, cheapest bar fridge 50/19, best bar fridges australia 140/16 | Transactional | price bands built from product data |
| 12 | Fri 27 Nov | Black Friday Bar Fridge Checklist (and the 10% Crypto Saving) | bar fridge black friday sale 50/17 T | cheapest bar fridge 50/19, bar fridges for sale 590/20 T | Transactional (seasonal) | crypto article, /shop. Real offers only: free shipping and 10% crypto discount |
| 13 | Tue 1 Dec | Summer Outdoor Entertaining: The Outdoor Drinks Fridge | outdoor beverage fridge 140/11 C | outdoor drinks fridge 170/13, bar fridge outdoor 210/6, outdoor fridges australia 140/15, best outdoor beer fridge 20/5 | Commercial (seasonal) | alfresco category, tropical-rated post |
| 14 | Fri 4 Dec | Upright Bar Freezers and Compact Upright Freezers | upright bar freezer 170/14 C | bar freezer upright 170/15, compact upright freezers 1000/17, compact freezers for sale 480/17 T, commercial bar freezer 50/6 | Commercial + transactional | /category/bar-freezers |
| 15 | Tue 8 Dec | Wine Fridges for Sale in Australia: What to Check | wine fridge for sale 210/15 T | wine fridges for sale 140/17 T, wine fridge sale 210/16 T, wine fridge dual zone 210/10, two zone wine fridge 260/6, wine chiller fridge 210/18 | Transactional | /category/wine-dual-zone |
| 16 | Fri 11 Dec | Mini Bar Fridges: Christmas Gift and Man Cave Guide | mini bar fridges 320/17 C | bar fridge mini fridge 480/19, mini fridge and freezer 170/19, bar mini fridge 110/17 | Commercial (seasonal) | Novelty and Branded Mini Bar |
| 17 | Tue 15 Dec | Outdoor Fridge Cabinets: Weatherproof, Waterproof, Built for Alfresco | outdoor refrigerator cabinet 140/7 T | outdoor fridge cabinet 170/9, weatherproof outdoor fridge 90/17, waterproof outdoor fridge 90/6, outdoor refrigerator 140/19 | Transactional | IP-Rated Weatherproof, 316 Marine Grade Stainless |
| 18 | Fri 18 Dec | Integrated Bar Fridges: Install Clearances and Measurements | integrated bar fridge 590/19 C | integrated under bench fridge 90/6, bar fridge measurements 210/16, built in bar fridge 90/16 | Commercial | built-in and dimensions guides |
| 19 | Tue 22 Dec | Glass Front or Solid Door Bar Fridge? | glass front bar fridge 390/17 C | glass bar fridge 590/19, clear door bar fridge 70/18, bar fridge with glass door 1000/17 | Commercial | Glass Door Display, Solid Stainless Steel Door |
| 20 | Tue 29 Dec | Our Best Bar Fridges of 2026 by Use | best bar fridges 70/11 C | best bar fridges australia 140/16, best bar fridge 320/14 | Commercial | all categories (round-up, links to the 20 new posts) |

Note on #12 and #16: no discount, sale or stock claim beyond what the site already states (free shipping, 10% crypto discount). Delivery cut-offs for Christmas are not promised in any post.

## Refresh track (existing posts, one per week alongside the new ones)
| Week | Existing post | Add | Keywords |
|---|---|---|---|
| 1 | beer-fridge-guide | a "beer fridge vs refrigerator" section | refrigerator beer 1000/12, beer fridge beer fridge 210/6 |
| 3 | glass-door-fridge-guide | glass front and clear door sections | bar fridge with glass door 1000/17 (the new #19 links here) |
| 5 | bar-fridge-dimensions-guide | measurements table by capacity | bar fridge measurements 210/16 |
| 7 | small-bar-freezer-guide | link to the new upright guide | compact freezers 110/17 |
| 9 | energy-efficiency-bar-fridge-power-bills | efficient models list from catalogue data | energy efficient bar fridge 110/13 |

## Cannibalisation guard
Two posts never share a primary keyword. The risky pairs: #8 and #19 against glass-door-fridge-guide, #18 against built-in-bar-fridge-guide, #6 and #17 against outdoor-kitchen-fridge-guide. Each carries a different angle in its title and links to the other, with the older post as the main target for the plain "glass door fridge" and "built in bar fridge" terms.

## Publishing and tracking
- Publishing: I write and deploy each week's two posts as a batch (build, prerender, sitemap update), then request indexing for the new URLs in Google Search Console and submit them in Bing.
- Checkpoints: week 4 (mid Nov): confirm posts 1 to 8 are indexed and read first impressions. Week 8 (mid Dec): compare impressions by post, then move the strongest topics earlier in the second half. 31 Dec: report on indexed posts, impressions, clicks, and top queries per post.
- Semrush: rerun the Site Audit after each batch to keep Site Health at 100%, and run the on-page checker on each new post.
- Success measures by 31 Dec: 20 posts live and indexed, every post earning impressions for its primary keyword, 10 or more posts with any average position under 30 for their primary.
