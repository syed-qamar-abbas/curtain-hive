# Curtain Hive — experience revamp

## Why the current version feels quiet
The cream note over a photograph makes the opening feel like a brochure. Uniform neutral section fields weaken the rhythm. All photography is static until hovered, category captions sit outside their images, and the most useful interaction is buried near the bottom. Sharp corners and small actions contradict the user's preferred softer modern style.

## Creative decision
Keep the researched photographic direction, original logo, Manrope, ivory and burgundy. Turn it into a tactile room-selection experience: **see a mood, choose a finish, start your room**. User-requested rounded buttons/cards override the skill's square-corner defaults. This is an implementation pass, not a separate proposal or new deployment.

## Implementation sequence
1. Replace the hero note with an immersive rounded room canvas. Confident two-line heading, legible photo scrim, primary consultation action, secondary Find my style anchor. Three manually selected real room photographs crossfade; each is explicitly style inspiration, not a recolour of the same installation. Keep the primary heading stable and avoid autoplay.
2. Create rounded service photo cards with visible captions, burgundy arrow buttons and clear hierarchy: two larger window-treatment cards, three supporting finish cards. Touch gets the same information without hover. Products use white rounded surfaces, accessible quick view and a stable price/info area.
3. Bring the existing Window Studio directly after service discovery. A deep burgundy chapter surrounds a white working panel; existing room/light/style choices and enquiry handoff remain intact. No false instant-quote promise.
4. Add a five-stage interactive process story. Buttons switch the contextual photograph, title and practical guidance. Content explains consultation, samples, dimensions, preparation and fitting without promising unsupported times or costs. Keyboard buttons and reduced motion work normally.
5. Apply consistent roundness to buttons, images, dialogs, forms, gallery, secondary-page heroes and navigation panels. Increase display/section contrast and reduce redundant gaps. Give each section one dominant object.
6. Choreograph hero lines, card entrances and selected photograph masks with CSS and the existing observer. Add a small scroll-progress indicator, restrained hover elevation and photo settling. No cursor replacement, scroll hijacking or new animation dependency.
7. Verify moods/process buttons, preserved Studio/planner/commerce behavior, 360–1920px responsiveness, keyboard and reduced motion, image loading, console errors and production build. Capture and review the final page, including important inner routes. Record explicit design-tool exceptions and limitations.

## Acceptance criteria
- New hero visibly differs from the previous ivory panel; CTA and category remain clear in the first viewport.
- Rounded geometry is consistent rather than added to isolated buttons.
- At least three purposeful interactions are discoverable: moods, Studio, process steps.
- Original business content/routes remain; no fabricated prices, ratings, completed projects or service guarantees.
- Animation enhances content and cancels under reduced motion. All content starts visible.
- Local preview remains on port 5173; nothing is published.
