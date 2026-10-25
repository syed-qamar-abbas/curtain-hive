# Curtain Hive — tactile experience revamp

Completed locally on 24 October 2026. This update supersedes the visual treatment in REDESIGN-REPORT.md; the existing business information, source provenance and launch limitations still apply.

## Delivered
- Immersive rounded hero with a stronger two-line heading, consultation action, Find my style anchor and three manually selected room moods. Each mood uses an existing curtainhive.com photograph and is labeled inspiration.
- Pill buttons, circular arrow actions, rounded product/service cards, matching fields/dialogs/gallery imagery and tactile hover feedback across the existing site.
- Two dominant window-treatment cards and three supporting finish cards. Tablet switches to two columns with a full-width final card; mobile uses one column. Captions flow naturally with descriptions rather than overlapping them.
- Existing Window Studio moved near the top, inside a deep burgundy section. Room, light and style selections still carry into the enquiry.
- Five interactive project stages with keyboard-operable buttons and contextual photography/guidance.
- Staggered headline/card entrances, photo reveals, mood crossfades, a brief 4.8-second photo settling effect and a scroll progress bar. Existing 1.1-second intro remains. Reduced-motion settings cancel decorative animation.

Implementation lives in src/premium.tsx, src/experience.css and src/motion.tsx; src/main.tsx imports the new stylesheet. No dependencies or remote assets added. No public deployment made.

## Validation
- Production typecheck/build passed; 59 route documents and four redirects prepared.
- All 59 routes checked at 1440, 768 and 390px with no horizontal overflow. Existing catalogue, quick view, wishlist, persistent bag, checkout enquiry, Studio, guided consultation, local photo preview, FAQ, gallery and contact flows passed. Zero JavaScript errors in the suite.
- New interactions checked at 360, 390, 768, 1440 and 1920px: keyboard mood changes, decoded active photos, no hero/caption overlap, Studio anchor, all process buttons, progress indicator, two-line headings and reduced motion.
- Short enquiry, retained form details, correct WhatsApp destination/payload and visible first-screen consultation action passed. Tests prepared messages only; none were sent.
- Motion suite passed intro/session behavior, menus, dialog focus return, accordions, hover after reveals, mobile navigation and slower CPU/network simulation. Reveal cleanup and live reduced-motion preference changes also passed.
- Final visual inspection: 0 failures, 3 documented warnings. All ten final desktop/tablet/mobile screenshots opened. Inner-page captures reviewed as well.
- Source style lint: 0 failures, 2 border warnings. Photo scrims and removal of a shadow are explicitly documented lint exceptions.

Evidence: .taste-skill/experience-final/, research/experience-qa/interaction-results.json, research/qa/results.json, research/motion-qa/results.json, research/motion-qa/reveal-results.json, research/redesign-qa/flow-results.json. The initial broad screenshots in research/experience-qa/ predate the final shorter process heading and tablet-card correction; final inspector captures are authoritative.

## Design-tool exceptions and remaining limits
Rounded cards are an explicit user preference. The inspector's icon-card heuristic counts photographed service cards with arrow actions; they are not substitute icon feature tiles. Functional mood counts and ordered project steps retain numbering. Thin control outlines distinguish selectable choices; neutral gradients only improve contrast over photography. Hover elevation is absent at rest.

The three visual warnings are: inherited components produce more than five computed type sizes; no verified company video was available; mobile/tablet contain repeated service/product cards as requested. Existing imagery varies in style and repeats a few photographs. A verified project shoot could improve that consistency. The room moods are different reference rooms, not a simulation of one room's fabrics.

This remains an enquiry-based local preview. Existing unverified product units, legal/editorial drafts and absent payment/order backend are unchanged; see the earlier reports for launch preparation.

Local preview: http://127.0.0.1:5173/
