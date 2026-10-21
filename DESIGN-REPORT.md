# Curtain Hive design and delivery report

Direction: **The place carries it**, seed **1777837576**. Ivory ground, soft sand fields, architectural olive actions, Instrument Serif headings and Manrope text. The original red/black logo is preserved; the site itself follows the supplied neutral palette.

The hero was redrawn once because the initial photo-strip blueprint contradicted the requested full-width interior hero. The resulting midline-navigation variant was adapted to the explicit centered composition and global-navigation requirements. The brief also overrides the skill's default ban on uppercase labels, outlined controls and centered headings. No generic stock imagery or generated images were introduced. Bundled scroll scenes were unavailable, so the motion system uses CSS and IntersectionObserver.

Idea: **Curtain Hive's five ways of finishing a room become a personal Window Studio, opening like the curtains in its name.** The visitor selects a room, a light/privacy preference and a look, sees a straightforward inspiration result, and carries those preferences into a six-step consultation.

## Sources and attribution

- All image titles, exact original URLs, local filenames and dimensions are recorded in `research/assets.json`. The source is [Curtain Hive](https://curtainhive.com/).
- The source site does not identify the individual photographers or publish a separate reuse licence. Images are used under the user's request for this redesign, without claiming new ownership, open licensing or verified project provenance.
- The footer links “Original collection imagery” to the source site. The gallery states that images are inspiration rather than verified client installations.
- No bundled photographs, code drawings or external stock images stand in for the business. No footage was available. The hero photograph has a slow settling motion with a reduced-motion fallback.
- Font files are self-hosted; their OFL licences are in `public/fonts/`.
- Competitor research covered The Curtain Cart, Malik Interiors, CurtainHouse, Sheikh Jee, Everhem, The Shade Store and Hillarys. Useful patterns were clear categories, visible consultation guidance, and separate shopping and made-to-measure journeys. No competitor copy or assets were used.
- 21st MCP was consulted for comparison-slider pattern metadata. The native keyboard-accessible slider remains custom code; no paid component code or generated 21st assets were imported.

## Content requiring confirmation

Six real catalogue products and their published prices are preserved. Price units, attributes, full descriptions, stock, delivery and taxes could not be retrieved. No new product specifications were added. The original about paragraph and customer testimonials are retained. The source privacy destination is preserved, while the unavailable policy text and missing terms require reconciliation before a public migration.

Three new journal articles are visibly marked as drafts. Gallery titles are descriptive inspiration titles, not invented client project records. The same-image comparison is explicitly a light study rather than false before/after evidence. New service guidance and FAQ answers remain conservative and should be reviewed by the business.

## Implementation boundaries

The original public website has not been modified. This is an independent private preview. All shopping and consultation frontend interactions work; checkout and forms prepare WhatsApp messages for the visitor to review and send. No payment is taken, order stored, photo uploaded, or appointment confirmed by the preview.

Before public launch, the full existing CMS/commerce export is needed to reconcile content inaccessible during this audit. The concrete migration and integration items are documented in README.md.

## Final review and verification

Final self-review: **7.8/10** — design 7.9, usability 8.2, creativity 7.0, content 7.8, weighted 40/30/20/10. This is a coherent, tested execution of an established editorial approach; the Window Studio is useful but not unprecedented. The intro statement could have stronger emphasis, the type scale could be simplified, and source content gaps limit catalogue depth.

The production build and TypeScript check passed. Browser checks covered all 59 routes at 1440, 768 and 390px with no horizontal overflow. Shopping search/filter/sort, quick view, wishlist, saved cart quantities, checkout validation, Window Studio handoff, all six consultation steps, local photo preview, FAQ, gallery keyboard controls, contact, mobile navigation and reduced motion passed with zero JavaScript errors. No external messages or orders were sent.

The final homepage visual inspector reports **0 failures and 3 warnings**. All 10 generated inspection images were opened. Representative secondary pages were also reviewed at desktop/mobile widths; the supplementary capture verifies all catalogue, product and consultation images decode at all three widths.

The remaining visual warnings are a broad computed font-size scale, an image-overlay contrast calculation that reads the page background instead of the photograph/scrim, and no video. The dark overlays were visually checked; no formal image-contrast certification is claimed. Source video was unavailable. Taste lint reports no failures and one accepted Instrument Serif warning.

Evidence: `research/qa/results.json`, `research/qa/media-results.json`, `.taste-skill/final/report.json`, and `.taste-skill/critique.md`. The first screenshot set missed some lazy images because scripted scrolling inherited smooth scrolling; the corrected secondary captures visit each section instantly and await image decoding. The site retains normal lazy loading.
