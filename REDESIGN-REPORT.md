# Curtain Hive premium redesign

Completed locally on 24 October 2026. Preview: http://127.0.0.1:5173/

## Changes

The homepage now uses bright room photography, an inset ivory introduction, asymmetric service photography, fabric storytelling, real catalogue listings, a five-stage process, inspiration, the Window Studio and a consultation close. The shared design system uses locally hosted Manrope, warm ivory, charcoal and burgundy (#8F2435, hover #741B2A). Body copy is 16px; hero supporting copy is 18px. The original logo remains intact.

The same typography, fields, buttons, surfaces and spacing apply to services, products, shop, gallery, about, contact, consultation, journal, FAQ, bag and checkout. Desktop navigation has five primary entries. Mobile navigation and all existing routes remain accessible. The footer includes the business's published Instagram and Facebook profiles, address, hours, phone and WhatsApp.

A short consultation form replaces the mandatory six-stage journey as the default. It validates four required fields and optional notes, then prepares a WhatsApp message for the visitor to review and send. The detailed planner remains available. Window Studio preferences carry into both paths. Nothing claims that an enquiry has been sent or an appointment confirmed.

Shopping filters, sorting, quick view, wishlist, persistent bag, quantities, gallery controls, local photo previews and contact preparation remain functional. The original light comparison remains under “Explore the light study”, labelled as an illustrative comparison using one photo, not a completed-project transformation.

## Research and art direction

Actual pages reviewed: [CurtainHouse](https://www.curtainhouse.pk/), [The Curtain Cart](https://www.thecurtaincart.com/), [Malik Interiors](https://malikinteriors.com/), [The Shade Store](https://www.theshadestore.com/), [Kvadrat](https://www.kvadrat.dk/en) and [Curtain Hive](https://curtainhive.com/). Curtainshop.pk timed out twice; no inspection findings are attributed to it. REDESIGN-NOTES.md records the audit, research and copy argument.

Direction: **Photographs at uneven sizes**, seed **1813855592**. One hero redraw removed a specimen mosaic requiring unavailable product cutouts. The user's ivory palette, sans typography, practical process and restrained motion override incompatible drawn elements such as a dark page and prolonged pinned scene.

Idea: Curtain Hive's five room-finishing services become a material selection wall, leading from one window to the whole room. The live interaction is Window Studio: room, light and style choices lead to a service and populate consultation. This concept fits the business but is not claimed to be unique among all furnishing companies.

## Motion and accessibility

The latest brief asks for a quick entrance, so the intro now lasts **1.1 seconds**, measured at **1,111ms**. It plays once per session and dismisses on pointer or keyboard input. This supersedes the earlier 2.2-second motion pass.

CSS handles the hero, photo settling, hover, menus and feedback. Existing IntersectionObserver and Web Animations API code handles selected reveals, with 18–24px travel, 650–720ms durations and 70ms stagger. Completed animations release their styles. No animation dependency was added.

Dialogs restore focus, dropdowns support Escape and keyboard input, and accordions tolerate repeated toggles. Reduced-motion preference removes animation while retaining content. Primary burgundy buttons pass the targeted 4.5:1 contrast check; this is not a full accessibility certification.

## Verification

| Check | Result |
| --- | --- |
| TypeScript and production build | Passed; 59 routes and 4 redirects |
| Existing route/commerce suite | Passed: catalogue, sort, quick view, wishlist, bag persistence/quantities, enquiry checkout, Studio, guided planner, photo preview, gallery, FAQ and contact |
| Responsive route checks | All 59 routes without horizontal overflow at 1440, 768 and 390px |
| Final visual capture | Eight principal page types at 1440, 768, 390 and 1920px; no broken decoded images, overflow, non-Manrope headings or headings exceeding two lines in this set |
| New short enquiry | Validation, preference handoff, WhatsApp recipient/payload, edit retention and planner switching passed |
| First-screen primary action | Visible at 360, 390, 768, 1440 and 1920px |
| Light study | Keyboard range control and disclosure passed |
| Motion/access checks | Intro, menus, modal focus, hover, accordions, mobile navigation and reduced motion passed |
| Live reveals | Entrance, released styles, no replay and preference-change cancellation passed |
| Slower-device simulation | Hero/action available with 4× CPU throttling and a throttled local connection |
| JavaScript errors | None in completed suites |
| Visual inspector | **0 FAIL, 3 WARN** at 1440/768/390 |
| Source taste lint | **0 FAIL, 1 WARN**, with explicit brief exceptions documented in CSS |

All ten final inspector screenshots were opened. Separate settled captures wait for every image to decode; the inspector's rapid scroll sheets can capture lazy images before decoding. This is not a Lighthouse or Core Web Vitals certification.

Before → after: two typefaces → one; shaded centered hero → bright room with inset copy; eight navigation entries → five; mandatory six-stage enquiry → short form with optional planner. Visual inspector: 2 failures/6 warnings → 0 failures/3 warnings. Requested ivory, captions, process numbering and subtle separators are intentional inspection exceptions.

Remaining warnings: no video because suitable business footage was not supplied; the inspector records limited motion, while live reveal/interaction tests pass; twelve computed text sizes on mobile across the commercial interface. Source lint notes the intentional button border. The design keeps restrained motion instead of adding effects to inflate a score.

Final visual assessment: design 7.8, usability 8.2, creativity 7.0, content 7.7; weighted **7.8/10**. The main improvement opportunity is a consistent set of verified installation photographs. See .taste-skill/redesign-critique.md.

## Files and evidence

Implementation: src/premium.tsx, src/premium.css, src/main.tsx, src/motion.tsx, src/motion.css, src/styles.css and index.html. No framework migration or new dependencies.

Evidence: research/qa/results.json; research/redesign-qa/visual-results.json; research/redesign-qa/flow-results.json; research/motion-qa/results.json; research/motion-qa/reveal-results.json; .taste-skill/redesign-final/report.json. Reusable checks remain in scripts/.

## Owner confirmation before launch

1. Catalogue price units, current availability, material options, installation charges and lead times. No new prices or stock claims were invented.
2. Verified project photos, project details and image permissions if the inspiration gallery is to become an installation portfolio.
3. Permission and wording for testimonials already on the business site. These are sourced business comments, not independently authenticated third-party reviews.
4. Existing draft journal content and legal policies. Payment processing, order submission and appointment confirmation are not implemented; the visitor sends the prepared enquiry through WhatsApp.

No deployment was made. The preview stays local on port 5173.

## Image provenance

All imagery is the existing downloaded Curtain Hive collection, reused at the user's request. No competitor assets, generated rooms, new stock imagery or stand-in drawings were introduced. Creator names and a separate public licence are not supplied by the source website; none are invented here. The footer links to the original collection. Exact source URLs, dimensions and usage notes remain in research/assets.json.

| Existing asset | Original source |
| --- | --- |
| Original Curtain Hive logo | [logo.png](https://curtainhive.com/wp-content/uploads/2025/11/logo-removebg-preview.png) |
| Red and grey living room drapery | [hero-interior.jpg](https://curtainhive.com/wp-content/uploads/2024/05/7c99f036f719fb58bbf4a97cdd526772.jpg) |
| Contemporary blue living room | [hero-wallpaper.jpg](https://curtainhive.com/wp-content/uploads/2024/05/eda420b06067afb2a18603ec28569eb0.jpg) |
| Navy curtains with white blinds | [hero-blinds.png](https://curtainhive.com/wp-content/uploads/2025/11/6.png) |
| Wine-coloured curtains around tall windows | [about-interior.jpg](https://curtainhive.com/wp-content/uploads/2025/12/1cca14076b1ca907c3b1889504094e75.jpg) |
| Fabric and finish samples at a consultation | [consultation.jpg](https://curtainhive.com/wp-content/uploads/2025/12/3a9fc1f716b5bffc5f9efdc2a5211bfc.jpg) |
| Textured pleated curtain fabric and black rail | [crafting.webp](https://curtainhive.com/wp-content/uploads/2026/01/60051a9688523b482332756f0d1027ff.webp) |
| Curtain installation in a light interior | [installation.jpg](https://curtainhive.com/wp-content/uploads/2025/12/57a6d42a4985464af0c00e971fa2281f.jpg) |
| Warm ivory living room with layered curtains | [curtains-service.jpg](https://curtainhive.com/wp-content/uploads/2026/01/779fee383cd1197bca40fbe02e33afe8.jpg) |
| Zebra blinds in a contemporary living room | [blinds-service.jpg](https://curtainhive.com/wp-content/uploads/2026/01/daa91d26912a06cc658cfc23d40b0fb1.jpg) |
| Decorative dimensional floral wallpaper | [wallpaper-service.jpg](https://curtainhive.com/wp-content/uploads/2026/01/ce79da633820c86cfebd1059943683c3.jpg) |
| Cream upholstered sofas and textured finishes | [upholstery-service.jpg](https://curtainhive.com/wp-content/uploads/2026/01/e18efcb31cd8e5a17b49f269928edb22.jpg) |
| White and black modern coffee table | [furniture-service.jpg](https://curtainhive.com/wp-content/uploads/2026/01/01e75bf36b9a08232e966fb3e27b1835.jpg) |
| Dark marble-effect designer wallpaper | [wallpaper-designer.jpg](https://curtainhive.com/wp-content/uploads/2024/05/p3a-1000x1000.jpg) |
| Botanical wallpaper in a bedroom | [wallpaper-vinyl.jpg](https://curtainhive.com/wp-content/uploads/2024/05/153b93a5423c95fa326a35cd05793914.jpg) |
| Soft patterned wall treatment | [wallpaper-patterned.jpg](https://curtainhive.com/wp-content/uploads/2024/05/b2c7b3177bd33f7c1a9a5d56e22589dc-1000x1000.jpg) |
| Sheer curtains in a light living room | [curtains-sheer.jpg](https://curtainhive.com/wp-content/uploads/2024/05/5a116dddee8deed253c3cd6743ca0019.jpg) |
| Classic lined curtains in a formal sitting room | [curtains-blackout.jpg](https://curtainhive.com/wp-content/uploads/2024/05/00d12b9d608db0bf3ce1a90fa300f073-1000x1000.jpg) |
| Pink and grey ring-top drapes | [curtains-drapes.jpg](https://curtainhive.com/wp-content/uploads/2026/01/1w.jpg) |
| Layered curtains in a warm sitting room | [curtains-sheer-detail.jpg](https://curtainhive.com/wp-content/uploads/2024/05/ea96361bf78e3bfdee153c93415784ae.jpg) |
| Curtain layers and soft window light | [curtains-blackout-detail.jpg](https://curtainhive.com/wp-content/uploads/2024/05/822866891f39fe83093b8a6bf1c60080.jpg) |
| Pink, white and grey drapery combination | [curtains-drapes-detail.jpg](https://curtainhive.com/wp-content/uploads/2026/01/23.jpg) |
| Contemporary living room with dark timber details | [gallery-texture.jpg](https://curtainhive.com/wp-content/uploads/2025/12/2bc2f9b0bfe5c4efffd3d13c5834c29f.jpg) |
| Silver dining room with patterned drapery | [gallery-drapery.jpg](https://curtainhive.com/wp-content/uploads/2025/12/test1.jpg) |
| Light dining room with floor-to-ceiling curtains | [gallery-room.jpg](https://curtainhive.com/wp-content/uploads/2025/12/tesst2.jpg) |
