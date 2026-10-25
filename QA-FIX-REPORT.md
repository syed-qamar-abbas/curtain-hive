# Curtain Hive — QA Fix & Retest Report

**25 October 2026 · Implemented locally after user approval**

## Result

**12/12 original findings addressed and verified**: 10 defect fixes and 2 design improvements. **0 open items in the original findings register.** This is closure of the reported scope, not a claim that every possible browser/device condition has been certified.

The left floating consultation CTA has been removed. Consultation remains available in the normal page/navigation actions, and the right WhatsApp icon remains.

The mobile homepage decreased from **12,461px to 9,885px**, approximately **20.7% shorter** at 390px width. The repeated detail section was consolidated, while all five services, the Studio, products, process, gallery and light comparison remain available.

## Finding-by-finding status

| ID | Original finding | Status | Implemented change |
|---|---|---|---|
| QA-001 | Floating consultation button blocks mobile footer links | Verified | Removed the left floating consultation CTA from every page, including its styles. Added footer clearance for the remaining WhatsApp icon. Privacy and Terms now open their correct pages. |
| QA-002 | Shop category controls overflow a narrow phone screen | Verified | Made narrow-shop categories a compact three-column row with appropriate button padding, and allowed larger category rows to wrap safely. |
| QA-003 | Guided planner advances without bringing the new question into view | Verified | Each guided step now places keyboard focus on its question and positions it below the sticky header. The confirmation receives the same treatment. |
| QA-004 | Email contact preference accepts a request without an email address | Verified | Email becomes required when Email is the preferred response method. Its label updates and incomplete/invalid addresses are blocked. |
| QA-005 | Invalid fractional quantity is accepted into the shopping bag | Verified | Product Add to bag now uses native form validation with explicit whole-number steps. Quantity state/add/bag boundaries reject invalid values; saved quantities are normalised to the 1–99 range. |
| QA-006 | Moving the pointer away can hide a keyboard-focused dropdown link | Verified | Dropdown dismissal now accounts for keyboard focus. Moving the pointer away no longer hides a focused link; Escape and outside dismissal remain functional. |
| QA-007 | Switching planner mode silently resets guided selections | Verified | Guided form data and progress now live above the mode switch. Service, room, preferences and contact details survive switching to the short form and back. |
| QA-008 | Each search keystroke creates a separate browser history entry | Verified | Search filters immediately from a local input draft. URL updates are debounced and replace the current history entry, preserving the whole query even during fast typing. |
| QA-009 | Category filters expose no selected state to assistive technology | Verified | Shop, gallery and FAQ categories now expose aria-pressed state. Result counts announce changes through polite status regions. |
| QA-010 | Valid URLs without a trailing slash get a Page not found title | Verified | Equivalent paths are normalised to a trailing slash before rendering. Titles, canonical URLs and navbar selection are correct while query strings and hashes are preserved. |
| DES-001 | Narrow product cards create three-line titles and uneven rhythm | Verified | Below 360px, product cards use one column, a compact photograph crop and readable titles. The category headline was shortened and narrow callout typography adjusted. |
| DES-002 | Long mobile homepage repeats visual material | Verified | Consolidated the repeated detail story into the existing process guidance, compacted the material/light section and composed the mobile gallery into a dominant photo plus two smaller photos. |

## Verification

- All 12 original acceptance scenarios passed in scripts/verify-qa-fixes.mjs.
- All 59 routes fit at 320, 390, 768 and 1440px: 236 route/width checks across the standard and narrow-layout suites.
- Existing catalogue, quick view, wishlist, bag persistence, integer totals, checkout enquiry, Studio preferences, short/guided consultation, photo preview, FAQ, gallery and contact tests passed. No external message/order was sent.
- Navbar, sliding bubble, pointer travel, mixed keyboard/pointer focus, mobile navigation, responsive switching, reduced motion, reveal cleanup and slower CPU/network tests passed.
- Ten core page families were recaptured at 320/390/768/1440px with no horizontal overflow, overlong headings or broken decoded images in that scan.
- Zero JavaScript errors were recorded by the relevant browser suites.
- Final production typecheck/build passed and prepared 59 route documents plus four redirects.
- Visual inspector: zero failures, three documented style warnings. Source style lint: zero failures, two subtle-control-outline warnings.

The visual warnings remain the inherited type-size count, absence of verified company video, and requested repeated card surfaces. The control outlines distinguish selectable inputs. They are not unresolved items from the original 12-finding register.

## Evidence

- **QA-001:** Left floating CTA removed; footer links work and stay clear at six widths.
- **QA-002:** All category controls fit at 320/360/390px with no horizontal overflow.
- **QA-003:** All six guided questions receive focus below the sticky header, including remount and confirmation.
- **QA-004:** Email preference requires a valid email and includes it in the prepared message.
- **QA-005:** Decimal/empty/out-of-range values are blocked; integer bag totals and persistence remain correct.
- **QA-006:** Pointer exit keeps the focused dropdown link open; Escape restores trigger focus.
- **QA-007:** Guided room, service, step and final contact details survive mode switches.
- **QA-008:** Fast typing preserves the full word, replaces the URL, and one Back returns to the preceding page.
- **QA-009:** Shop, gallery and FAQ filters expose selected states and live result counts.
- **QA-010:** Equivalent routes normalize to slash form with correct metadata, active navigation, query and hash.
- **DES-001:** Product titles fit within two lines at all three small-phone widths.
- **DES-002:** Repeated detail section consolidated, material story compacted and mobile gallery composed into fewer rows.

Raw results and captures are in this folder: acceptance-results.json, small-layout-results.json, scan-results.json, regression/results.json, navbar/results.json, bubble/results.json, consultation/flow-results.json, motion/results.json, motion/reveal-results.json and screens/. The final build log is build.log.

## Remaining launch requirements

The site still uses the disclosed WhatsApp enquiry flow. Payment/order backend setup, verified catalogue units/availability, final legal/editorial approval and real-device/cross-browser production checks remain separate launch requirements. No public deployment was made.

## Files changed

Main implementation: src/main.tsx, src/motion.tsx, src/premium.tsx, src/experience.css. New focused modules: src/catalog-search.ts, src/consultation-state.tsx and src/quantity.ts. No dependencies added.

[Open the local site](http://127.0.0.1:5173/)
