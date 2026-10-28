# Curtain Hive — services and Insights release

Implementation and browser QA: 26 October 2026. Delivery/access rechecked: 28 October 2026.

## Delivered in the source

- The existing homepage hero now presents all five services with three thumbnails visible at a time. Cards change the photograph, description and service destination. Previous/next controls, keyboard navigation, native touch scrolling and reduced-motion support work without autoplay.
- A new `/insights/` collection has a featured guide, service filters, five article cards and consultation handoff. Insights is linked from desktop/mobile navigation, the footer, homepage and corresponding service pages.
- Five complete guides apply the supplied AI Visibility PDF's relevant article standards. Each includes a direct answer, comparison, six substantive sections, practical checklist, FAQs, three primary-source references, related guides and a contextual WhatsApp link.
- All 65 routes now have complete build-time HTML. Article content remains readable without JavaScript. The browser hydrates that content while preserving existing cart/wishlist data.
- Page titles, descriptions, canonical URLs, social metadata and structured data are maintained from one route-aware source. Article publication dates reflect the initial 26 October preparation; they are not refreshed automatically on every build.

| Guide | Words | Route |
|---|---:|---|
| Sheer or blackout? | 1,309 | `/insights/sheer-vs-blackout-curtains/` |
| Motorized blinds. | 1,241 | `/insights/motorized-blinds-buying-guide/` |
| Before the wallpaper. | 1,222 | `/insights/wallpaper-wall-preparation-guide/` |
| Recover or replace? | 1,278 | `/insights/reupholster-or-replace-sofa/` |
| Furniture that fits. | 1,306 | `/insights/custom-furniture-measuring-guide/` |

Counts include the article's substantive fields and exclude navigation/footer. Reading times are computed, not manually assigned. See [INSIGHTS-EDITORIAL.md](INSIGHTS-EDITORIAL.md) for editorial maintenance, source references and the launch checklist.

## Verification

| Check | Result |
|---|---|
| TypeScript and production build | Pass; 65 full HTML routes, five guides, four legacy redirects, 404 output |
| New interaction suite | Pass; hero selection/bounds/keyboard, filters, guide links, checklists, FAQs, WhatsApp context, mobile navigation |
| New responsive coverage | 42 page/viewport combinations, widths 320/390/768/1101/1280/1440; no horizontal overflow or broken images |
| Existing site regression | All 65 routes at desktop/tablet/phone; shop filters/sorting/quick view, saved items, bag persistence, quantities, checkout validation, Window Studio, six-step consultation, photo preview, FAQ, gallery keyboard, contact and reduced motion passed |
| Header regression | Nine widths from 360 to 1920; collision bounds, search, dropdowns, mobile route changes and hero CTA passed |
| No-JavaScript reading | All five full guides readable |
| Console/hydration | No errors observed in the browser suites |
| Generated internal links | All 65 routes checked; no broken internal destinations found |
| Metadata/schema | Unique canonical and schema identities; complete article metadata; query/utility exclusions passed |
| Production configuration | Separate compilation at `https://curtainhive.com` with indexing enabled passed; 43 indexable routes, all five guides included. This check did not change the preview output or deploy to that domain. |
| Visual inspection | Index and article: zero inspector failures at 1440/768/390. All 17 inspector images and the three homepage fold captures reviewed. |

Reproduce the new checks after `npm run build` with `node scripts/verify-insights-seo.mjs`, and with `npm run preview` running, `node scripts/verify-insights.mjs`. Evidence is generated under `.sites-runtime/insights-qa/` and `.taste-skill/`; it is intentionally excluded from Git. Existing regression scripts were run against the same production preview using temporary port-adjusted copies.

## Design review

Retained direction: **Photographs at uneven sizes**, seed **1813855592**. No redraw; the user explicitly asked to retain the existing hero and card styling. The concept translates the five furnishing decisions from a home consultation into five useful reading guides. The service selector, category filters and article preparation checklist are the interactive elements.

The three correction rounds addressed the hero wrapping into two thumbnail rows, tablet heading breaks, mobile related-card titles, small supporting text and long desktop reading measure. Final pages have no observed clipped content or overflow.

Final self-review scores (not an external award or performance metric): design **7.0**, usability **8.5**, creativity **6.0**, content **8.5**; weighted result **7.4/10**. The result is professional and coherent, with limited originality beyond the established brand system; it does not claim a 7.5+ design score. The approved quiet reading style and retained photographic brand treatment limit the motion/creativity scores.

Remaining inspector warnings are documented deliberately:

- Type-size count: the shared header/footer, editorial hierarchy and reading interface use more than five sizes; no new readable text falls below 13px.
- No video: there is no verified Curtain Hive footage. Existing photographs support the actual services; no unrelated stock clip was inserted.
- Multiple left edges on the index: two large cards, three smaller cards and the split feature use consistent edges within their own grids.
- Index motion: ten elements moved, above the failure threshold; additional movement was avoided for a small reading collection. Article motion is deliberately quiet.
- Article title heuristic: the inspector flags “Sheer or blackout?” as a name; the visible category and first-screen sentence explicitly identify curtain layers, privacy and daylight.

All imagery is reused from the authorized Curtain Hive collection downloaded earlier from `curtainhive.com`, with existing provenance in `research/`. No new external photography, AI image or fabricated project evidence was introduced. The article publisher note and footer identify the source collection. These photographs illustrate decisions; they do not verify specific customer installations.

## Delivery and limits

The current local production preview uses `http://127.0.0.1:4185/`; Insights starts at `/insights/`. Port 4173 is currently occupied by a different project, which was left running. This preview is only accessible on the machine running it. Recreate it with `npm run preview -- --port 4185 --strictPort`; the interaction test accepts that origin as its first argument.

**Live publication remains blocked.** On 28 October the Sites connector still returned `SitesConnectorError: Sites project not found` for the unchanged project ID in `.openai/hosting.json`. The existing `toolpoint73.chatgpt.site` deployment has not been updated by this release. Restore access to that exact original Sites project/account to publish the tested build on the same link. No replacement Site was created and no audience setting was changed.

The client preview remains `noindex,follow`; production launch requires setting the approved domain and enabling indexing as documented. No Search Console, Bing Webmaster Tools, GA4/GTM, live search ranking, AI citation rate, Lighthouse or field Core Web Vitals result has been verified. The WhatsApp click hook emits only a local non-personal event; no third-party analytics is connected and clicks are not counted as qualified leads. Tests did not send messages, place orders or book appointments.
