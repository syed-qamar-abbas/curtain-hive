# Insights publishing and search handoff

The five initial guides follow the user's article brief and the supplied Crea8iv Media AI Visibility PDF's applicable editorial standards. The PDF's generic six-article default is superseded by the explicit five-article request. Curtain Hive remains the publisher; no agency branding, invented expert author, case study or performance claim has been added.

## Content inventory

| Article | Route | Intent | Service | Visual |
|---|---|---|---|---|
| Sheer or blackout? | `/insights/sheer-vs-blackout-curtains/` | Compare opacity, privacy and layering | Custom curtains | `curtains-service.jpg` |
| Motorized blinds. | `/insights/motorized-blinds-buying-guide/` | Understand power, controls and compatibility | Motorized blinds | `blinds-service.jpg` |
| Before the wallpaper. | `/insights/wallpaper-wall-preparation-guide/` | Avoid preparation and specification mistakes | Wallpaper installation | `wallpaper-patterned.jpg` |
| Recover or replace? | `/insights/reupholster-or-replace-sofa/` | Assess suitability and quotation scope | Sofa upholstery | `upholstery-service.jpg` |
| Furniture that fits. | `/insights/custom-furniture-measuring-guide/` | Plan dimensions, materials and delivery access | Custom furniture | `furniture-service.jpg` |

Every guide contains a direct answer, a distinct comparison, six substantive sections, a working preparation checklist, four visible FAQs, three primary-source references, two related reads, the matching service link and a contextual WhatsApp handoff. Reading time is an estimate calculated at 220 words/minute from the actual guide text. Photographs come from the existing authorized Curtain Hive collection and illustrate furnishing decisions; they are not presented as verified client projects.

## Maintaining an article

1. Add a typed record to `src/insights-data.ts`. Keep the slug stable and unique. Write the complete body, concise answer and specific comparison before adding a card.
2. Supply a distinct relevant image and honest alt text. Confirm usage rights. New photographs need appropriate dimensions and crop checks; don't use fake project imagery as evidence.
3. Supply primary sources beside the claims they support. Mark examples as examples. Manufacturer documentation is not evidence of a Curtain Hive dealership or the performance of an unspecified product.
4. Extend the explicit editorial intent and related-guide mappings in that file. Retain the real publication date; change the modification date only for a substantive revision. The organization byline does not represent a named expert review.
5. Confirm service links, related slugs and the context of the WhatsApp enquiry. Never insert a different phone number in an article; `wa()` uses the central verified number.
6. Run `npm run build`, then `npm run preview`, then `node scripts/verify-insights.mjs`. The build validates complete static article content, one H1, unique section IDs and representative image availability. The current five-guide release-count assertion must be updated deliberately when adding a sixth guide.
7. Review screenshots, sources and mobile reading flow before publishing through the existing Sites project. The source records state source-check status and do not claim client/SME approval that has not been recorded.

The reusable `Insights.tsx` template supplies reader controls. `seo.ts` supplies title, description, canonical, social metadata and schema for initial HTML and SPA navigation. `scripts/prerender.mjs` renders the same React application to complete HTML at build time; no server subscription, CMS or database is needed.

## Evidence register

| Fact | Status | Source / constraint | Checked |
|---|---|---|---|
| Curtain Hive name, five services, Rawalpindi/Islamabad coverage, Gulrez address, +923015374238, daily 9–9 hours | Existing verified project data | `src/data.ts`, original source export in `research/content.json` | 2026-10-26 |
| Free home consultation and fabric guidance | Existing business offering | `src/data.ts`; confirm visit scope and time with the team | 2026-10-26 |
| Opacity and edge-gap distinctions | Primary sources checked | IKEA and Hunter Douglas links in the curtain guide | 2026-10-26 |
| Motor power and compatibility | Primary sources checked | Somfy pages cited as system-specific examples only | 2026-10-26 |
| Wallpaper preparation and product symbols | Primary sources checked | Wallcoverings Association, Graham & Brown, Rasch | 2026-10-26 |
| Abrasion testing and fabric-specific care | Primary sources checked | ACT and Sunbrella | 2026-10-26 |
| Measuring furniture and delivery routes | Primary sources checked | Room & Board, Article and Pottery Barn | 2026-10-26 |
| Product units, exact motor models, warranties, current prices, stock and lead times | Not verified | Do not infer from illustrations; confirm per quotation | — |
| First-hand project results, expert review, client case-study permission | Unavailable | Not claimed in the guides | — |

## Indexing and domain settings

The shared `chatgpt.site` link remains a client preview. It is publicly viewable but intentionally uses `noindex,follow`. `robots.txt` permits crawling so search engines can see that directive. Its sitemap contains no noindex URLs. Canonical, organization, social-image and article URLs consistently use the actual preview origin.

At the approved main-domain launch, configure `VITE_SITE_ORIGIN` to the final HTTPS origin and `VITE_INDEXABLE=true`, then rebuild. The generated sitemap includes eligible routes only; utility screens, old journal drafts, tags and query-filter URLs remain excluded. The actual production server must honor the generated redirects/404 policy. Verify HTTP status, host redirects and Search Console ownership after changing hosts. Publishing a client preview is not evidence of search indexing or AI citations.

Google's guidance emphasizes useful accessible content and ordinary Search eligibility, rather than special AI files or guaranteed inclusion: [AI features](https://developers.google.com/search/docs/appearance/ai-features), [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article). Visible FAQs help readers; no FAQ rich-result benefit is promised. The implementation uses truthful BlogPosting, CollectionPage, BreadcrumbList, WebSite and business/service identity. No fake ratings, reviews, awards or special AI schema.

## Measurement

`src/analytics.ts` dispatches one local `curtainhive:analytics` event per intentional article WhatsApp click. Its detail contains `event: whatsapp_cta_click`, page path, CTA location, content type, article slug and service slug. It does not send network requests, store tracking IDs, or include phone numbers, message text or entered personal data. A consent-aware analytics adapter can subscribe when a verified GA4/GTM integration is supplied.

No analytics property, Search Console property or CRM is connected in this update. The event is an outbound-click signal only: it does not establish a sent message, conversation, qualified lead, booking or sale. No forms or WhatsApp messages are submitted during QA.

## Follow-up after the main-domain launch

- 30 days: verify indexing/canonicals, read real search queries and inspect article-to-service clicks; resolve actual crawl or user-flow problems.
- 60 days: refine unclear sections using customer questions and observed queries; add approved firsthand photographs or project evidence when available.
- 90 days: compare qualified enquiries and quotations by source if a real measurement workflow exists; improve the content that helps suitable customers take the next step.

External account connection, domain migration, Search Console submissions, real expert approval and outcome reporting are separate from the code and content delivered here.
