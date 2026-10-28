# Curtain Hive — services and Insights implementation plan

Date: 26 October 2026. Scope: extend the existing approved website, preserve its ivory/burgundy Manrope identity and the current homepage composition, publish to the existing public client-preview Site.

## Audience and argument

Readers are homeowners in Rawalpindi and Islamabad making a furnishing decision before requesting a quotation. They need a clear choice, the limits of that choice, and the right questions to bring to a home consultation.

Client-specific inventory: Gulrez showroom; Chaudhry Bostan Khan Road address; two-city service area; free home consultation; fabric samples in the room; five complementary services; custom dimensions; remote-operated blinds with system-specific compatibility; existing sofa assessment; wall assessment; measurement before production; a single team contact for the furnishing conversation.

Concept: the five decisions discussed during Curtain Hive's home consultation become a practical, visual reading collection. The reader can move from a service in the hero, to a specific decision guide, to a consultation with a useful checklist.

1. Home hero: five services can change this room → real service images, a selected-service preview and direct service link.
2. Insights introduction: make a better furnishing decision before ordering → one substantial featured curtain guide and an immediately useful answer.
3. Reading collection: each of the five services has a distinct planning problem → five complete guides, filtered by service, with reading times calculated from their actual text.
4. Article: explain the decision first → answer summary, relevant photography, comparison, sections and concrete checklist.
5. Evidence: technical advice has a traceable basis → primary-source references, clear attribution, no invented case studies, specifications, prices or performance statistics.
6. Next step: turn reading into an informed consultation → contextual service links, related guides, a useful project brief and normal consultation CTA.

## Hero interaction

Keep the existing panel, rounded thumbnails, accent selection, hero headline, margins and photo canvas. Replace room moods with the five services. Three cards remain visible; small previous/next controls select the adjacent service and keep its card in view. Selecting a card changes the hero visual, caption and service destination. No autoplay. Keyboard operation, visible focus, descriptive labels, disabled end states and reduced-motion behavior are required. Native horizontal scrolling supports touch.

## Content deck

- Insights hero: **Good rooms start here.** Supporting copy: Practical guides to curtains, blinds, walls and furniture, made for the decisions you face in a Rawalpindi or Islamabad home. Primary action: Explore the guides.
- Curtains guide: **Sheer or blackout?** Explain daytime/night-time privacy, fabric versus installed light control, layering, headings, measurements, quotation scope and care.
- Blinds guide: **Motorized blinds, explained.** Explain power versus control, batteries/wiring, radio/bridge compatibility, manual operation during outages, opening measurements and commissioning questions.
- Wallpaper guide: **Before the wallpaper.** Explain damp assessment, surface preparation, repeat/drop/batch calculations, light and pattern scale, installer scope and care.
- Upholstery guide: **Recover or replace?** Explain frame/comfort assessment, fabric construction/care codes, abrasion-test limits, quotation breakdown and household-use considerations.
- Furniture guide: **Furniture that fits.** Explain room-use dimensions versus overall piece dimensions, access route, drawer/door movement, material specifications, approvals and delivery checks.

Each article will be substantive, approximately 1,000–1,500 words where useful, without padding to a ranking target. Five distinct comparisons and decision checklists; concise visible FAQs; organization byline and truthful publication date. Source notes distinguish general manufacturer guidance from Curtain Hive's confirmed offering. Original room photos are illustrative rather than claimed completed installations.

## Art direction

Retain the established `Photographs at uneven sizes` direction (seed 1813855592), approved rounded surfaces, burgundy accent and Manrope. No new draw: user explicitly asks to preserve the design. Insights adapts the established editorial grid with a dominant feature photo, smaller supporting guide images and warm neutral reading surfaces. Long-form pages use a comfortable text measure, sticky desktop contents and a collapsible mobile contents list. Existing photographs are preferred; semantic HTML diagrams/comparisons explain decisions better than decorative generated imagery.

## Architecture and discoverability

- Add `/insights/` and five durable, descriptive article URLs, linked in desktop/mobile navigation, footer and relevant sections. Existing journal URLs continue to work.
- Extract a shared app component and render routes during the build with React's server renderer. Hydrate the same markup in the browser; guard browser-only storage and intro state. This gives all public routes real initial HTML, including complete article text.
- Single metadata source for HTML generation and client-side navigation: title, description, canonical, Open Graph, social image, robots and JSON-LD.
- Use WebSite/Organization/LocalBusiness identity consistently; BlogPosting, CollectionPage and BreadcrumbList only where appropriate. No invented review/rating schema or promised FAQ rich results.
- Indexing is environment-controlled. Client-preview deployment stays `noindex,follow`; its canonical and social URLs describe the actual preview origin. A documented production-origin/indexing switch and generated sitemap prepare the eventual main-domain launch. Google can crawl the preview to read the noindex directive.
- No unsupported promises of AEO/GEO rankings or special AI files. Prioritize useful sourced content, HTML accessibility, internal links and honest entity information.

## Verification and delivery

Build/type checks; static HTML text and metadata assertions; schema parse/consistency; all five article routes and sources; links/filters/contents; hero boundaries/keyboard/service destinations; mobile and desktop navigation; 320/390/768/1440 layouts; reduced motion; anonymous live smoke check. Inspect screenshots and correct observed problems in at most three design rounds. Publish through the existing Sites project and synchronize GitHub main. Record evidence, launch settings and any remaining limits in an implementation report.

## PDF guidance incorporated during implementation

The user supplied `CREA8IV_Media_Codex_6_1_AI_Visibility_Master_Prompt.pdf` specifically as the article prompt. Apply its editorial standards to the five articles expressly requested in the conversation; its generic six-article default does not change that count. Do not expand this bounded update into its unrelated case-study, external profile or paid-service workstreams.

Adopt distinct commercial intent, substantive original decision frameworks, typed editorial records, truthful organization attribution, source-check status, unique representative images, related service/read links, full HTML rendering, visible FAQs, topic-specific user-initiated WhatsApp handoff and a local no-PII click event adapter. Record unavailable analytics integrations accurately. No first-hand client results or human expert review are invented. Existing user authorization covers updating the live preview and GitHub repository.
