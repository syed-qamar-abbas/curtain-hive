import manifest from './image-variants.json';

type Rendition = { src: string; width: number; height: number };
type ImageRecord = { original: string; image: string; width: number; height: number; variants: Rendition[] };
const records = manifest.images as ImageRecord[];
const bySource = new Map(records.flatMap(record => [[record.original, record], [record.image, record]] as [string, ImageRecord][]));

export function highQualityImage(src: string) {
  return bySource.get(src)?.image || src;
}

// Small screens receive a suitable rendition; full image views use the master.
export function imageProps(src: string, sizes = '(max-width: 600px) calc(100vw - 44px), 50vw', full = false) {
  const record = bySource.get(src);
  if (!record) return { src, srcSet: undefined, sizes: undefined, width: src.endsWith('logo.png') ? 500 : 1200, height: src.endsWith('logo.png') ? 500 : 900 };
  return {
    src: full ? record.image : record.variants[0].src,
    srcSet: full ? undefined : record.variants.map(variant => `${variant.src} ${variant.width}w`).join(', '),
    sizes: full ? undefined : sizes,
    width: record.width,
    height: record.height,
  };
}
