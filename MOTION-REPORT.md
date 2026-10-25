# Curtain Hive — motion update

The approved site now has a shared motion system. The curtain intro lasts **2.2 seconds**, increased from 1.3 seconds. This update is served locally at http://127.0.0.1:5173/ under the user's local-hosting instruction.

## Updated files and components

- `src/motion.tsx`: reusable Intro, MotionEffects, NavigationDropdown, Modal and Accordion components.
- `src/motion.css`: shared easing/timing, hero choreography, hover feedback and interface transitions.
- `src/main.tsx`: connects existing routes and business components to the shared motion layer; adds polite form confirmations and keyed photo/testimonial transitions.
- `src/styles.css`: removes the old competing animation block. Approved layout, colours, typography, content and imagery are retained.
- `scripts/verify-motion.mjs`: targeted motion and accessibility checks. The existing verification/capture scripts recognize the new once-per-session intro version.

## Effects and behavior

| Area | Result |
| --- | --- |
| Intro | 2.15-second panel opening, removed at 2.2 seconds; logo fades before the opening completes. Plays once per session. Any keyboard or pointer interaction dismisses it. |
| Hero | Heading, supporting text and CTAs arrive in a short coordinated sequence; the existing room photograph settles gently. The introduction and hero share timing rather than stacking independent entrances. |
| Buttons and links | 2px CTA lift, small existing-arrow movement, restrained pressed states, smooth colour changes and a flat underline reveal. Keyboard focus stays clear. |
| Navigation | Persistent dropdown panels fade and move 8px. A 140ms pointer-leave grace period prevents flicker while crossing into the menu. Escape closes the menu and returns focus. Closed links are inert. |
| Products and galleries | Fine-pointer product lift is 3px with a faint hover-only shadow and 1.035x image zoom. Gallery zoom is 1.025x. Quick-view remains visible on touch layouts. Product/gallery photo changes have a short opacity entrance. |
| Scroll reveals | One IntersectionObserver per route, 18–24px movement for text/cards, selected image clipping, 650–900ms duration and 70ms coordinated stagger capped at 140ms. New filtered results are registered too. |
| Accordions | 320ms opening and 220ms closing with a short grid-row transition; native details/summary semantics and explicit expanded state. Rapid repeated clicks are handled. |
| Dialogs and mobile menu | 300ms entrance and 180ms exit; native focus trapping, Escape and backdrop dismissal. Closing releases the inert background before restoring trigger focus. Mobile links follow a short, restrained sequence. |
| Forms and testimonials | Focus/selection feedback, short confirmation and validation entrances, and a brief testimonial change without autoplay. Existing progress feedback is retained. |

## Accessibility and performance

Reduced motion removes the intro, animated travel, stagger and decorative transitions while keeping every interaction usable. A preference change cancels active scroll animations. Reveals are enhancements: content is visible by default and animations release their transform/opacity when complete, so hover transforms work afterwards.

No animation library or dependency was added. Observers, animation handles, timers and listeners are cleaned up. Motion uses transform/opacity, plus selected clip-path openings and the brief accordion grid exception. Scrolling stays native. No wheel interception, new sticky scenes, artificial fabric distortion, continuous parallax or new back-to-top feature was introduced. The existing optional photograph motion is a finite animation.

The user's explicit request for a longer curtain intro overrides the Taste skill's usual 1.2-second entrance limit. The intro remains dismissible and is skipped for reduced motion.

## Verification

- `scripts/verify-motion.mjs` passed intro duration/session behavior, immediate keyboard dismissal, dropdown pointer/keyboard behavior, modal focus return, rapid accordion toggles, product hover/filtering, mobile navigation and reduced motion.
- Ten representative page types were checked at 1440, 768 and 390px, with no horizontal overflow or invisible reveal content.
- A slower CPU/network simulation retained a visible hero and consultation action. This is a local lab check, not a field-performance certification.
- The existing full verification suite passed all 59 routes at desktop, tablet and phone widths, plus shopping, cart persistence, checkout validation, Window Studio, all consultation steps, photo preview, FAQ, gallery keyboard controls and contact handoff. No messages or orders were sent. No JavaScript errors were observed.
- Evidence: `research/motion-qa/results.json`, `research/qa/results.json` and the corresponding screenshots. Final build and visual inspection results are recorded below.

The earlier catalogue, payment/backend and content-review boundaries remain described in README.md and DESIGN-REPORT.md. This motion update changes no commerce integration.

## Final result

The final production build and TypeScript check passed, generating all 59 routes. A separate live-reveal check also passed: animations start on section entry, release styles after completion, do not replay on a return scroll, and cancel cleanly when the reduced-motion preference changes. Evidence is in `research/motion-qa/reveal-results.json`.

The final visual inspector reports **0 failures and 4 warnings** at 1440, 768 and 390px. All ten inspection images were opened, as were the targeted intro, menu, accordion, hover and settled-hero captures. The inspector's initial-fold capture falls just before the requested 2.2-second intro ends, so narrow curtain-panel edges remain in some inspection folds; settled-hero captures show the full-width composition after the intro finishes.

Remaining warnings: the approved broad type scale; an overlay contrast calculation that samples the page ground instead of the photograph/scrim; no source footage; and a low motion count from the inspector's recorder. The implementation uses the Web Animations API for scroll entrances, which is verified separately by live animation checks rather than inflating the page with additional effects. The dark overlays were visually checked, but no formal image-contrast or field-performance certification is claimed.

Final self-review remains **7.8/10**: design 7.9, usability 8.2, creativity 7.0, content 7.8. The approved editorial direction is preserved, the new interactions are responsive, and the known type/content limitations remain. See `.taste-skill/motion-critique.md` for the two motion-review rounds.

The local preview returned HTTP 200 after final verification and remains running in the background. No hosted version was changed during this local update.
