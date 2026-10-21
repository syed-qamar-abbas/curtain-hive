# Curtain Hive — complete website preview

React 19, TypeScript, Vite 7 and Tailwind CSS 4. Data-driven services, product pages and editorial templates. The source lives in this folder; the static production site is generated into `dist/`.

## Run locally

```sh
npm install
npm run dev
npm run build
npm run preview
```

On this Windows machine, the Sites npm shim resolves incorrectly. The verified fallback is `node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build`. No global configuration was changed.

## Included

- Homepage, About, five service detail pages, service overview, catalogue, products, categories, tags, wishlist, cart, checkout, portfolio and image detail pages, journal and article templates, FAQ, contact, and six-step consultation.
- Window Studio with deterministic recommendations and a consultation handoff that carries selections.
- Search, sorting, real source product prices, gallery images, quick view, local-storage cart/wishlist, quantity editing and removal.
- Native accessible modal dialogs, keyboard lightbox, reduced-motion support, one-session curtain intro, on-scroll entrances, and keyboard/pointer light comparison.
- Contact and checkout prepare real WhatsApp links. They do not silently send messages, take payments, create orders or confirm appointments.
- Room photo selection previews the file locally. It is not uploaded; the visitor is prompted to attach it separately in WhatsApp.
- Static output for 59 canonical routes, metadata, canonical tags, LocalBusiness schema, sitemap, private-preview robots policy and legacy route mappings.

## Content integrity

All 25 images were downloaded directly from curtainhive.com; the existing logo is unchanged. The six product names and published prices, exact original company introduction, and three original testimonials were recovered from the homepage. Full source exports and asset provenance are in `research/`.

The product pages and commerce APIs returned access errors. Product units, technical attributes, detailed descriptions, stock, taxes, delivery and payment configuration remain unverified. No specifications were fabricated. The fallback product descriptions explicitly invite confirmation.

There was no verified project provenance or matching before/after image pair. The portfolio is labeled inspiration; the interactive comparison is a labeled light study using one image. No company video was available, so the hero uses an animated photograph. Three new journal guides are explicitly marked editorial drafts for review. The existing privacy link is preserved; the source terms link has no destination.

## Before replacing the public website

1. Export and reconcile the full WordPress/WooCommerce database, including any inaccessible authentic product descriptions, posts, legal policies and project records.
2. Confirm product price units, variations, stock, tax, shipping, returns and installation terms.
3. Connect order storage, payment processing and any desired form/photo backend. The current explicit WhatsApp inquiry path remains usable.
4. Review new editorial copy and journal drafts; verify portfolio attribution before claiming customer installations.
5. Map the actual public domain, enable indexing, and apply the query-string HTTP 301 redirects documented in `research/redirect-map.json`. The preview already handles legacy `page_id` routes in the browser. Keep original product slugs.

## Verification

`node scripts/verify.mjs` tests all 59 routes at desktop, tablet and mobile widths, catalogue interactions, wishlist, cart persistence, checkout validation, all consultation steps, local photo preview, FAQ search, gallery keyboard interactions, contact handoff, mobile navigation and reduced motion. It does not send messages or place orders.

The Taste skill lint and real-browser inspection were also run. See `.taste-skill/critique.md` and `DESIGN-REPORT.md` for the visual result and explicit brief-overrides. The original site's desktop capture hit a browser-check screen, so a reliable numerical before/after comparison is unavailable.

Final result: production build/typecheck passed, all 59 routes fit at 1440/768/390px, all listed interaction flows passed, and no JavaScript errors were observed. The homepage visual inspector reports zero failures and three documented warnings. `scripts/capture-secondary.mjs` also checks complete image decoding and produces corrected secondary-page captures; see `research/qa/media-results.json`.
