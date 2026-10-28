# Curtain Hive — complete website preview

React 19, TypeScript, Vite 7 and Tailwind CSS 4. Data-driven services, product pages and editorial templates. The source lives in this folder; the static production site is generated into `dist/`. Use Node.js 22 LTS or a compatible newer release.

## Services and Insights release — October 2026

Gallery expansion, 28 October: Inspiration now includes **25 additional real photographs**, five each for Curtains, Blinds, Wallpaper, Upholstery and Furniture. The gallery has 33 ideas, category links, progressive loading, responsive local WebP images and photographer credits in image/detail views. The build now produces **90 full HTML routes**. See [GALLERY-UPDATE.md](GALLERY-UPDATE.md) and [photo provenance](research/inspiration-images.json). This supersedes the route counts in the earlier release notes below.

Contact follow-up, 28 October: the Contact form is replaced with one direct WhatsApp CTA, alongside showroom details. See [CONTACT-UPDATE.md](CONTACT-UPDATE.md).

The hero now has five service previews with three visible thumbnails, manual navigation and service-specific destinations. `/insights/` contains five complete, source-referenced furnishing guides with comparisons, interactive checklists, FAQs and related reads. Navigation, homepage and service pages link to the new guides.

The build now renders **65 complete HTML routes**, including full article text readable without JavaScript. Canonicals, social metadata and structured data share one route-aware source. The default client-preview build uses `noindex,follow`; production-domain/indexing configuration is documented in `.env.example` and [INSIGHTS-EDITORIAL.md](INSIGHTS-EDITORIAL.md). No search ranking, AI citation or analytics result is implied.

See [INSIGHTS-PLAN.md](INSIGHTS-PLAN.md) for the implementation plan, [INSIGHTS-REPORT.md](INSIGHTS-REPORT.md) for verification and delivery status, and [INSIGHTS-EDITORIAL.md](INSIGHTS-EDITORIAL.md) for maintaining the articles. Earlier reports below describe their dated releases.

## Run locally

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The development site runs at `http://127.0.0.1:5173/`. `npm run build` produces the static preview in `dist/`. Local hosting metadata, dependencies and generated QA captures are excluded from version control. Verification scripts recreate their evidence folders when run.

## Included

- Homepage, About, five service detail pages, service overview, catalogue, products, categories, tags, wishlist, cart, checkout, portfolio and image detail pages, journal and article templates, FAQ, contact, and six-step consultation.
- Window Studio with deterministic recommendations and a consultation handoff that carries selections.
- Search, sorting, real source product prices, gallery images, quick view, local-storage cart/wishlist, quantity editing and removal.
- Native accessible modal dialogs, keyboard lightbox, reduced-motion support, one-session curtain intro, on-scroll entrances, and keyboard/pointer light comparison.
- Contact and checkout prepare real WhatsApp links. They do not silently send messages, take payments, create orders or confirm appointments.
- Room photo selection previews the file locally. It is not uploaded; the visitor is prompted to attach it separately in WhatsApp.
- Complete static HTML for 65 routes, route-specific metadata and canonical tags, LocalBusiness/BlogPosting/BreadcrumbList schema, environment-controlled sitemap and legacy route mappings.

## Content integrity

The original 25 images were downloaded directly from curtainhive.com; the existing logo is unchanged. The Inspiration extension adds 25 photographs sourced from Pexels, with their creator, source page and licence recorded in `research/inspiration-images.json`. The six product names and published prices, exact original company introduction, and three original testimonials were recovered from the homepage. Full source exports and asset provenance are in `research/`.

The product pages and commerce APIs returned access errors. Product units, technical attributes, detailed descriptions, stock, taxes, delivery and payment configuration remain unverified. No specifications were fabricated. The fallback product descriptions explicitly invite confirmation.

There was no verified project provenance or matching before/after image pair. The portfolio is labeled inspiration; the interactive comparison is a labeled light study using one image. No company video was available, so the hero uses an animated photograph. Three new journal guides are explicitly marked editorial drafts for review. The existing privacy link is preserved; the source terms link has no destination.

## Before replacing the public website

1. Export and reconcile the full WordPress/WooCommerce database, including any inaccessible authentic product descriptions, posts, legal policies and project records.
2. Confirm product price units, variations, stock, tax, shipping, returns and installation terms.
3. Connect order storage, payment processing and any desired form/photo backend. The current explicit WhatsApp inquiry path remains usable.
4. Review new editorial copy and journal drafts; verify portfolio attribution before claiming customer installations.
5. Map the actual public domain, enable indexing, and apply the query-string HTTP 301 redirects documented in `research/redirect-map.json`. The preview already handles legacy `page_id` routes in the browser. Keep original product slugs.

## Verification

`node scripts/verify.mjs` tests all routes in the generated manifest at desktop, tablet and mobile widths, catalogue interactions, wishlist, cart persistence, checkout validation, all consultation steps, local photo preview, FAQ search, gallery keyboard interactions, contact handoff, mobile navigation and reduced motion. It expects the development server at port 5173. It does not send messages or place orders.

After building, run `npm run preview` in a separate terminal, then `node scripts/verify-insights.mjs` for the service slider and article interactions (port 4173 by default). Run `node scripts/verify-insights-seo.mjs` to validate generated links, schema, canonicals and the separate production-domain configuration. Browser checks use an installed Google Chrome through the existing Playwright dependency.

The Taste skill lint and real-browser inspection were also run. See `.taste-skill/critique.md` and `DESIGN-REPORT.md` for the visual result and explicit brief-overrides. The original site's desktop capture hit a browser-check screen, so a reliable numerical before/after comparison is unavailable.

Final result: production build/typecheck passed, all 59 routes fit at 1440/768/390px, all listed interaction flows passed, and no JavaScript errors were observed. The homepage visual inspector reports zero failures and three documented warnings. `scripts/capture-secondary.mjs` also checks complete image decoding and produces corrected secondary-page captures; see `research/qa/media-results.json`.

## Local motion update

The subsequent animation pass increases the curtain intro from 1.3 to 2.2 seconds and adds a shared motion layer for hover, scroll reveals, dropdowns, dialogs, accordions and form feedback. The update is hosted locally at http://127.0.0.1:5173/. Build/typecheck, the full existing interaction suite, and targeted motion/reduced-motion checks passed. The latest visual result is zero failures and four documented warnings; see `MOTION-REPORT.md` for files, behavior, evidence and remaining limits.

## Premium redesign — 24 October 2026

The latest local version uses Manrope, warm ivory and burgundy, a rebuilt photographic homepage, a short consultation form with optional guided planner, and a quick 1.1-second intro. This supersedes earlier visual and intro timing notes. See [REDESIGN-REPORT.md](REDESIGN-REPORT.md) for implementation, sources, QA and owner confirmation items. Run `node scripts/verify-premium.mjs` for the new enquiry flow, `node scripts/verify.mjs` for the route/commerce suite, and `node scripts/verify-motion.mjs` for motion/access checks. Local preview: http://127.0.0.1:5173/. No new deployment was made.

## Rounded experience revamp — latest

The follow-up adds an immersive mood-switching hero, rounded cards/actions, stronger photographic hierarchy, a prominent burgundy Window Studio, interactive process steps and richer motion. See [EXPERIENCE-PLAN.md](EXPERIENCE-PLAN.md) and [EXPERIENCE-REPORT.md](EXPERIENCE-REPORT.md). New interaction and layout checks: `node scripts/verify-experience.mjs`. All existing route/commerce/enquiry checks pass; the preview stays local on port 5173.

The subsequent hero/navbar refinement uses a bright editorial split, photographic mood thumbnails and a floating navigation bar. See [HERO-NAV-REPORT.md](HERO-NAV-REPORT.md); `node scripts/verify-hero-nav.mjs` covers nine responsive widths plus search/menu navigation.

## QA fixes — 25 October 2026

The left floating consultation CTA is removed. All ten reported defects and both design recommendations have been implemented and retested: responsive filters, guided-step focus and draft retention, conditional email validation, integer quantities, focus-aware dropdowns, search history, accessible filter states, URL normalization and a shorter mobile homepage. Run `node scripts/verify-qa-fixes.mjs` for the acceptance scenarios and `node scripts/verify-small-layout.mjs` for all routes at 320px. See [QA-FIX-REPORT.md](QA-FIX-REPORT.md) for the verified fixes. Detailed screenshots and raw audit evidence are generated locally and excluded from this repository.
