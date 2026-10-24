import { useEffect, useRef, useState } from 'react';
import './Paper.css';

// Shared pieces for the cream sections (Services, Work, Why Tezco, Testimonials, Contact).

/* True once the element has scrolled into view. */
export function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, on];
}

/* "—— SERVICES" style label. */
export function Eyebrow({ children, light }) {
  return <span className={`pp-eyebrow${light ? ' is-light' : ''}`}><i aria-hidden="true" />{children}</span>;
}

/* Big heading whose letters fill from grey to ink as it scrolls up the screen. */
export function FillTitle({ lines, as: Tag = 'h2', id, light, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { el.style.setProperty('--fp', 1); return undefined; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.92 - r.top) / (vh * 0.5)));
      el.style.setProperty('--fp', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  let i = 0;
  const total = lines.join('').length;
  return (
    <Tag ref={ref} id={id} className={`pp-fill${light ? ' is-light' : ''} ${className}`} style={{ '--n': total }} aria-label={lines.join(' ')}>
      {lines.map((line, li) => (
        <span className="pp-line" key={li} aria-hidden="true">
          {line.split(/(\s+)/).map((word, wi) => (
            /^\s+$/.test(word)
              ? <span key={wi}>{word.split('').map(() => { i += 1; return ' '; })}</span>
              : (
                <span className="pp-word" key={wi}>
                  {word.split('').map((ch, ci) => { const k = i; i += 1; return <span className="pp-c" key={ci} style={{ '--i': k }}>{ch}</span>; })}
                </span>
              )
          ))}
        </span>
      ))}
    </Tag>
  );
}

/* Section header: eyebrow + fill title on the left, short text on the right. */
export function PaperHead({ eyebrow, title, text, id, light, link, as }) {
  return (
    <header className="pp-head">
      <div>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <FillTitle lines={title} id={id} light={light} as={as} />
      </div>
      {(text || link) && (
        <div className="pp-head-side">
          {text && <p className="pp-head-text">{text}</p>}
          {link && <a className="pp-btn is-dark" href={link.href}>{link.label}<span className="pp-btn-ic"><ArrowUpRight /></span></a>}
        </div>
      )}
    </header>
  );
}

export const ArrowUpRight = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scroll parallax for an image layer inside a rounded panel: as the panel crosses the
   screen the layer drifts from -range% to +range% and zooms from 1.1 to 1.22. */
export function useParallax(range = 12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) return undefined;
    const box = el.parentElement;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = box.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < -200 || r.top > vh + 200) return;
      const t = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));   // 0 entering, 1 leaving
      el.style.transform = `translateY(${(-range + 2 * range * t).toFixed(3)}%) scale(${(1.1 + 0.12 * t).toFixed(4)})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [range]);
  return ref;
}

/* Counts the leading number of a value up from 0 when it scrolls into view ("30", "24h").
   Values without a leading number are shown as they are. */
export function CountUp({ value, duration = 1400 }) {
  const m = /^(\d+)(.*)$/.exec(value);
  const [ref, on] = useInView(0.4);
  const [n, setN] = useState(null);
  useEffect(() => { if (m && !reduced()) setN(0); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!m || !on || reduced()) return undefined;
    const target = +m[1];
    let raf; const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <span ref={ref}>{value}</span>;
  return <span ref={ref} aria-label={value}>{n === null ? m[1] : n}{m[2]}</span>;
}
