import { useLayoutEffect, useRef } from 'react';

type Bounds = { x: number; y: number; width: number; height: number };

/** A clipped colour layer keeps white lettering exactly inside the travelling pill. */
export function NavigationBubble({ activeKey, expandedKey }: { activeKey: string | null; expandedKey: string | null }) {
  const layer = useRef<HTMLDivElement>(null);
  const selected = useRef(activeKey);
  const update = useRef<((animate: boolean) => void) | null>(null);
  selected.current = activeKey;

  useLayoutEffect(() => {
    const bubble = layer.current;
    const nav = bubble?.parentElement;
    if (!bubble || !nav) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let previous: Bounds | null = null;
    let animation: Animation | null = null;
    let disposed = false;
    const items = [...nav.querySelectorAll<HTMLElement>(':scope > a, :scope > .nav-drop > button')];
    const clip = ({ x, y, width, height }: Bounds) =>
      `inset(${y}px ${nav.clientWidth - x - width}px ${nav.clientHeight - y - height}px ${x}px round 999px)`;

    const measure = (animate: boolean) => {
      if (disposed) return;
      const frame = nav.getBoundingClientRect();
      const target = items.find(item => item.dataset.navKey === selected.current);
      if (!target || !frame.width || getComputedStyle(nav).display === 'none') {
        animation?.cancel();
        animation = null;
        bubble.style.opacity = '0';
        previous = null;
        return;
      }
      const bounds = target.getBoundingClientRect();
      const next = { x: bounds.left - frame.left, y: bounds.top - frame.top, width: bounds.width, height: bounds.height };
      const currentClip = getComputedStyle(bubble).clipPath;
      const clones = items.map(item => {
        const rect = item.getBoundingClientRect();
        const style = getComputedStyle(item);
        const clone = item.cloneNode(true) as HTMLElement;
        clone.removeAttribute('id');
        clone.removeAttribute('aria-controls');
        clone.removeAttribute('data-nav-key');
        clone.className = 'nav-bubble-label';
        clone.tabIndex = -1;
        Object.assign(clone.style, {
          left: `${rect.left - frame.left}px`, top: `${rect.top - frame.top}px`,
          width: `${rect.width}px`, height: `${rect.height}px`,
          font: style.font, letterSpacing: style.letterSpacing,
          padding: style.padding, gap: style.gap,
        });
        const arrow = clone.querySelector('svg');
        const originalArrow = item.querySelector('svg');
        if (arrow && originalArrow) arrow.style.transform = item.getAttribute('aria-expanded') === 'true' ? 'rotate(180deg)' : 'none';
        return clone;
      });
      bubble.replaceChildren(...clones);
      animation?.cancel();
      bubble.style.clipPath = clip(next);
      bubble.style.opacity = '1';
      nav.dataset.bubbleReady = 'true';
      const moved = previous && (Math.abs(previous.x - next.x) > .5 || Math.abs(previous.width - next.width) > .5);
      if (animate && moved && !preference.matches && bubble.animate) {
        const direction = next.x > previous!.x ? 1 : -1;
        const stretch = { x: next.x + direction * 5 - 5, y: next.y + 2, width: next.width + 10, height: next.height - 4 };
        const settle = { x: next.x - direction * 2 + 1, y: next.y - 1, width: next.width - 2, height: next.height + 2 };
        animation = bubble.animate([
          { clipPath: currentClip, offset: 0, easing: 'cubic-bezier(.32, 0, .2, 1)' },
          { clipPath: clip(stretch), offset: .62, easing: 'ease-out' },
          { clipPath: clip(settle), offset: .82, easing: 'ease-out' },
          { clipPath: clip(next), offset: 1 },
        ], { duration: 600, easing: 'linear' });
      }
      previous = next;
    };
    update.current = measure;
    measure(false);
    const observer = new ResizeObserver(() => measure(false));
    observer.observe(nav);
    items.forEach(item => observer.observe(item));
    document.fonts.ready.then(() => measure(false));
    const stop = () => measure(false);
    preference.addEventListener('change', stop);
    return () => {
      disposed = true;
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener('change', stop);
      delete nav.dataset.bubbleReady;
      update.current = null;
    };
  }, []);

  useLayoutEffect(() => { update.current?.(true); }, [activeKey, expandedKey]);
  return <div ref={layer} className="nav-selection-bubble" aria-hidden="true" inert />;
}
