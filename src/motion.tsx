import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Plus, X } from 'lucide-react';
import { media } from './data';

const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const INTRO_VERSION = 'premium-v3';
export const INTRO_DURATION = 1100;

/** A single observer per route; content stays visible if motion is unavailable. */
export function MotionEffects() {
  const { pathname } = useLocation();
  useEffect(() => {
    const root = document.querySelector('main');
    if (!root || !('IntersectionObserver' in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new WeakSet<Element>();
    const active = new Set<Animation>();
    const observer = new IntersectionObserver(entries => {
      const entering = entries.filter(entry => entry.isIntersecting);
      entering.forEach((entry, index) => {
        const node = entry.target as HTMLElement;
        observer.unobserve(node);
        node.classList.add('revealed');
        if (preference.matches || !node.animate) return;
        const picture = node.matches('.studio-visual, .daylight-room, .daylight-detail, .detail-story figure');
        const heading = node.matches('h2, .section-head');
        const card = node.matches('.category-piece, .product-card');
        const frames = picture
          ? [{ clipPath: 'inset(0 5%)', opacity: .65 }, { clipPath: 'inset(0 0)', opacity: 1 }]
          : card
            ? [{ transform: 'translateY(32px) scale(.97)', opacity: .55 }, { transform: 'translateY(0) scale(1)', opacity: 1 }]
            : [{ transform: `translateY(${heading ? 24 : 18}px)`, opacity: .45 }, { transform: 'translateY(0)', opacity: 1 }];
        const animation = node.animate(frames, {
          duration: picture ? 1100 : heading ? 800 : 850,
          delay: Math.min(index, 3) * 80,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          // Hold the first frame during a stagger, then release hover transforms on completion.
          fill: 'backwards',
        });
        active.add(animation);
        animation.finished.then(() => active.delete(animation), () => active.delete(animation));
      });
    }, { threshold: .06, rootMargin: '0px 0px -5% 0px' });
    const register = () => root.querySelectorAll<HTMLElement>('[data-reveal]').forEach(node => {
      if (seen.has(node)) return;
      seen.add(node);
      // The first screen never waits for a scroll observer.
      if (preference.matches || (scrollY < 5 && node.getBoundingClientRect().top < innerHeight)) {
        node.classList.add('revealed');
      } else observer.observe(node);
    });
    register();
    const changes = new MutationObserver(records => {
      if (records.some(record => record.addedNodes.length)) register();
    });
    changes.observe(root, { childList: true, subtree: true });
    const finish = () => {
      if (!preference.matches) return;
      observer.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
      root.querySelectorAll('[data-reveal]').forEach(node => node.classList.add('revealed'));
    };
    preference.addEventListener('change', finish);
    return () => {
      observer.disconnect();
      changes.disconnect();
      preference.removeEventListener('change', finish);
      active.forEach(animation => animation.cancel());
    };
  }, [pathname]);
  return null;
}

export function Intro() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try { setShow(sessionStorage.getItem('ch-intro') !== INTRO_VERSION && !reducedMotion()); }
    catch { /* Storage is optional. */ }
  }, []);
  useEffect(() => {
    if (!show) return;
    try { sessionStorage.setItem('ch-intro', INTRO_VERSION); } catch { /* Storage is optional. */ }
    document.documentElement.dataset.intro = 'opening';
    const dismiss = () => setShow(false);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setTimeout(dismiss, INTRO_DURATION);
    // Intentional interaction can dismiss the signature moment immediately.
    window.addEventListener('pointerdown', dismiss, { once: true });
    window.addEventListener('keydown', dismiss, { once: true });
    preference.addEventListener('change', dismiss, { once: true });
    return () => {
      clearTimeout(timer);
      delete document.documentElement.dataset.intro;
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      preference.removeEventListener('change', dismiss);
    };
  }, [show]);
  return show ? <div className="intro-curtain" aria-hidden="true"><div /><div /><span><img src={media.logo} alt="" /><small>Interiors, tailored to you.</small></span></div> : null;
}

export function Modal({ children, title, onClose, wide = false }: { children: ReactNode; title: string; onClose: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const [closing, setClosing] = useState(false);
  const latestClose = useRef(onClose);
  latestClose.current = onClose;
  useLayoutEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const dialog = ref.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(timer.current);
      document.body.style.overflow = overflow;
      // Release the dialog's inert background before returning focus to its trigger.
      dialog?.close();
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  const close = () => {
    if (closing) return;
    if (reducedMotion()) { latestClose.current(); return; }
    setClosing(true);
    timer.current = window.setTimeout(() => latestClose.current(), 180);
  };
  return <dialog ref={ref} className={`modal ${wide ? 'wide' : ''}`} data-closing={closing} aria-label={title}
    onCancel={event => { event.preventDefault(); close(); }}
    onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <button className="icon-button close" onClick={close} aria-label="Close dialog"><X /></button>{children}
  </dialog>;
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const target = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const frame = useRef(0);
  useEffect(() => () => { clearTimeout(timer.current); cancelAnimationFrame(frame.current); }, []);
  const toggle = () => {
    target.current = !target.current;
    clearTimeout(timer.current);
    cancelAnimationFrame(frame.current);
    if (reducedMotion()) { setOpen(target.current); setExpanded(target.current); return; }
    if (target.current) {
      setOpen(true);
      frame.current = requestAnimationFrame(() => {
        frame.current = requestAnimationFrame(() => setExpanded(true));
      });
    } else {
      setExpanded(false);
      timer.current = window.setTimeout(() => setOpen(false), 220);
    }
  };
  return <details open={open} data-expanded={expanded}>
    <summary aria-expanded={expanded} onClick={event => { event.preventDefault(); toggle(); }}>{q}<Plus size={18} /></summary>
    <div className="accordion-panel" inert={!expanded}><div><p>{a}</p></div></div>
  </details>;
}

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  return <div className="accordion">{items.map(item => <AccordionItem key={item.q} {...item} />)}</div>;
}

export function NavigationDropdown({ label, children, open, onOpenChange, active = false }: { label: string; children: ReactNode; open: boolean; onOpenChange: (open: boolean) => void; active?: boolean }) {
  const timer = useRef<number | undefined>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const hoverOpened = useRef(false);
  const keyboardNavigation = useRef(false);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => {
    if (!open) { clearTimeout(timer.current); hoverOpened.current = false; return; }
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onOpenChange(false); trigger.current?.focus(); }
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [open, onOpenChange]);
  const enter = () => { clearTimeout(timer.current); keyboardNavigation.current = false; if (!open) hoverOpened.current = true; onOpenChange(true); };
  const leave = () => {
    timer.current = window.setTimeout(() => {
      const focused = document.activeElement;
      const focusedLink = root.current?.querySelector('.dropdown')?.contains(focused);
      if (focusedLink || (keyboardNavigation.current && root.current?.contains(focused))) return;
      onOpenChange(false);
    }, 220);
  };
  const focusLink = (last = false) => requestAnimationFrame(() => {
    const links = root.current?.querySelectorAll<HTMLAnchorElement>('.dropdown a');
    if (links?.length) links[last ? links.length - 1 : 0].focus();
  });
  return <div ref={root} className="nav-drop" data-open={open} data-active={active}
    onPointerEnter={event => { if (event.pointerType === 'mouse') enter(); }}
    onPointerLeave={event => { if (event.pointerType === 'mouse') leave(); }}
    onPointerDown={() => { keyboardNavigation.current = false; }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) onOpenChange(false); }}
    onKeyDown={event => {
      keyboardNavigation.current = true;
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); onOpenChange(false); trigger.current?.focus(); }
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && event.target === trigger.current) {
        event.preventDefault(); clearTimeout(timer.current); hoverOpened.current = false; onOpenChange(true); focusLink(event.key === 'ArrowUp');
      }
    }}>
    <button ref={trigger} type="button" data-nav-key={label} aria-expanded={open} aria-controls={`nav-${label.toLowerCase()}`}
      onClick={event => {
        clearTimeout(timer.current);
        // A pointer's first click must not undo the menu it just opened on hover.
        if (event.detail > 0 && hoverOpened.current) { hoverOpened.current = false; onOpenChange(true); }
        else { hoverOpened.current = false; onOpenChange(!open); }
      }}>{label}<ChevronDown size={13} /></button>
    <div id={`nav-${label.toLowerCase()}`} className="dropdown" inert={!open} aria-hidden={!open}
      onClick={event => { if ((event.target as HTMLElement).closest('a')) onOpenChange(false); }}>{children}</div>
  </div>;
}
