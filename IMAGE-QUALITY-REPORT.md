# Image quality upgrade

29 October 2026. All **44 photographs currently rendered on the website** now use upgraded image delivery. The 500px original brand logo is already substantially larger than its displayed size and is preserved.

## Assets

- **25 Inspiration photographs:** retrieved higher-resolution versions from their recorded Pexels sources, each 3200px on its longest side, delivered as quality-92 WebP. The master files retain the source photograph's composition and detail.
- **19 existing Curtain Hive photographs:** upscaled using Lanczos resampling and conservative sharpening (radius 1.0, amount 65%, threshold 3). Their longest dimension is at least 1600px. Three first recover the larger original 1200px website file in place of a 1000px copy. No objects, room layouts, colours or fabric patterns were regenerated.
- **119 display renditions:** responsive widths up to 800, 1600 and each image's master width. Card/thumbnail sizes select appropriate files on dense screens. Gallery full-image views use the master file. Intrinsic image dimensions now reflect each photograph's actual proportions.

The built-in image enhancement request returned `usage_limit_reached`. The user then explicitly selected standard non-AI upscaling and light sharpening. No paid API fallback, generative restoration or new imagery was used. Standard enlargement improves edge presentation and available pixel dimensions; it cannot recover detail absent from a small original photograph. The 25 higher-resolution source photographs do supply additional genuine source detail.

All final assets are in `public/images/enhanced/`. Original project assets remain available for provenance and rollback. `research/image-quality.json` records original/native/output dimensions, method, source, checksums and file sizes. `src/image-variants.json` contains only the compact data needed to render responsive images; the shared `image-delivery.ts` is used by the homepage, services, products, gallery, Contact and Insights. Social metadata also uses the upgraded master. Existing sources and licences remain in `research/inspiration-images.json`.

## Verification

- TypeScript and production build passed: 90 full routes, five articles, redirects and 404 output.
- All 44 photographs have higher master resolution than the previous file. All 119 rendition files and their recorded sizes exist.
- 234 photo tags across 95 generated HTML files use enhanced assets; logos remain original.
- Downscaled comparisons against prior files found no composition changes; mean absolute per-channel pixel difference was below 4/255 for every image. This is a fidelity check, not a perceptual quality score.
- 24 browser page/viewport combinations at 390/768/1440px and 2x device density decoded successfully, with no horizontal overflow or runtime/hydration errors.
- A full gallery view decoded the 3200px master. Seven browser captures and four before/after comparisons were reviewed, including homepage, gallery, Contact and the full-image view.

The upgrade preserves the existing layout, content, gallery categories and direct WhatsApp Contact page. The static preview indexing policy remains unchanged. No Lighthouse or field-performance score is claimed. The desktop/tablet/mobile variants avoid sending every large master to ordinary thumbnail views.
