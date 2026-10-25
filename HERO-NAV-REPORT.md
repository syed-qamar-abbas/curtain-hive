# Hero and navigation refinement — 24 October 2026

The latest local update replaces the dark photographic opening with an editorial split: a large two-line heading, burgundy emphasis, plain service/location copy and consultation action beside an unobscured room photograph. The room mood selector now uses three photo thumbnails, making its choices visible before selection. A fabric-detail link connects the opening to the collection.

The navbar is a rounded floating surface with the original logo, a readable brand name, grouped desktop navigation, clear shopping tools and a consultation action. Mobile keeps the brand, bag and menu; the hero and menu provide consultation actions. Existing menus, search, links, counts and focus behavior are retained.

Changes: src/premium.tsx, src/main.tsx, src/hero-navbar.css. No new dependency, asset download or publication. The local preview is http://127.0.0.1:5173/.

## Verification
- Nine-width layout check from 360 to 1920px: no navbar collisions or horizontal overflow, hero headline within two lines and consultation action in the first viewport.
- Desktop dropdown navigation, catalogue search and mobile menu route changes passed without JavaScript errors.
- Mood switching, active image decoding, Studio anchor, process controls and reduced motion passed at five widths.
- Short consultation, preference transfer, retained planner and WhatsApp message preparation passed. No message was sent.
- Production typecheck/build passed, with 59 route documents and four redirects prepared. Source style lint: zero failures, two inherited outline warnings.
- Final motion suite passed: intro dismissal, pointer/keyboard dropdown behavior, dialog focus restoration, accordions, post-reveal hover, ten key routes at three widths, mobile navigation, reduced motion and slower CPU/network simulation. An initial test waited for full image loading before observing the short intro; it now observes navigation commit. A build-time preview reload interrupted another run; the final isolated run passed.
- All ten final desktop/tablet/mobile screenshots were opened. Visual inspector: zero failures and three explained warnings (type count, no verified footage and requested card grids).
- Automated evidence: research/hero-nav-qa/results.json and research/experience-qa/interaction-results.json. Final visual captures: .taste-skill/hero-nav-final/.

## Design decisions and limits
The original images, Manrope and burgundy/ivory brand system remain. A neutral scrim only separates controls from the room photograph; there are no new decorative gradients. Counts are functional and cards are explicitly requested. The inherited site's multiple type sizes and responsive card grids remain; no verified company video was available. Thumbnail labels and secondary notes use 13px text, while running hero copy uses the full ink colour.

This supersedes the hero/navbar treatment in EXPERIENCE-REPORT.md. Its business/content provenance and enquiry-only launch limitations still apply.

## Navbar bug fixes

Reproduced and fixed hover-then-click collapsing a dropdown, missing outside dismissal and a mobile current-page link leaving its menu open. Dropdown state is now shared so only one opens; route changes close it, Escape works even for hover-opened menus, arrow keys enter the links, and a transparent pointer bridge spans the visual gap. Active sections and mobile current-page links are indicated. Mobile search is available, resizing to desktop releases the mobile dialog and body scroll lock, and dropdowns scroll within shorter viewports.

`node scripts/verify-navbar-fixes.mjs` passed the reproduced scenarios, pointer travel, focus return, same-page navigation, search, consultation, resize, reduced motion and ten viewport widths. Evidence: research/navbar-fixes/results.json. Header code was formatted for review. The existing hero and page content were not changed in this fix.

## Sliding selection bubble

The selected desktop navbar item now uses one shared red bubble. It slides to the next selected link, briefly stretches, then settles with the requested restrained jiggle over 600ms. A clipped white lettering layer keeps labels readable throughout travel. Dropdown previews borrow the same bubble and return it to the selected page on dismissal. Rapid changes cancel from the bubble's current position; resizing and reduced-motion settings place it directly at the correct destination. No animation dependency was added.

Implementation: src/NavigationBubble.tsx with integration in the existing header and dropdown trigger. `node scripts/verify-nav-bubble.mjs` covers travel, final width, rapid changes, browser Back, dropdown preview/return, non-intercepting and inaccessible duplicate labels, reduced motion and mobile/desktop switching. Evidence: research/nav-bubble/.
