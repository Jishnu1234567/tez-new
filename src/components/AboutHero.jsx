import { useEffect, useRef } from 'react';
import { useIsoLayoutEffect } from './useClient.js';
import { aboutHero } from '../data/pages.js';
import './AboutHero.css';

// About page hero: white stage, a giant condensed title that spans the width, and an
// exploded 3D view of a product being built (code, design, live site) that follows the
// pointer slightly.

const Arrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Scale the title so it spans its container exactly. */
function useFitText() {
  const ref = useRef(null);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => {
      const box = el.parentElement.clientWidth;
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      if (w) el.style.fontSize = `${(100 * box) / w}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el.parentElement);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    return () => ro.disconnect();
  }, []);
  return ref;
}

/* The ring drifts and leans toward the pointer, easing frame by frame (1 - e^(-dt/140ms)). */
function useMagnet() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    // A long-running animation gives a steady clock for the easing.
    const clock = el.animate([{ opacity: 1 }, { opacity: 1 }], { duration: 1e9 });
    const now = () => (clock.currentTime == null ? performance.now() : Number(clock.currentTime));
    let tx = 0; let ty = 0; let tr = 0;
    let x = 0; let y = 0; let r = 0;
    let last = now(); let raf = 0;
    const onMove = (e) => {
      const b = el.getBoundingClientRect();
      const cx = b.left + b.width * 0.5;
      const cy = b.top + b.height * 0.66;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = b.width;
      const k = dist >= reach ? 0 : 0.5 * (1 + Math.cos((Math.PI * dist) / reach)); // smooth fall-off
      const nx = Math.max(-1, Math.min(1, dx / reach));
      const ny = Math.max(-1, Math.min(1, dy / reach));
      tx = nx * 34 * k; ty = ny * 34 * 0.45 * k; tr = -nx * 3.5 * k;
    };
    const onLeave = () => { tx = 0; ty = 0; tr = 0; };
    const tick = () => {
      const t = now(); const dt = Math.min(64, t - last); last = t;
      const a = 1 - Math.exp(-dt / 140);
      x += (tx - x) * a; y += (ty - y) * a; r += (tr - r) * a;
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf); clock.cancel();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);
  return ref;
}

export default function AboutHero() {
  const h = aboutHero;
  const title = useFitText();
  const ring = useMagnet();
  const root = useRef(null);

  // Entrance: row fades in, title letters wipe up, ring fades in, lettering draws, tagline wipes up.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || !el.animate || reduced()) return undefined;
    const ease = 'cubic-bezier(.16, 1, .3, 1)';
    const q = (s) => Array.from(el.querySelectorAll(s));
    const anims = [];
    const add = (nodes, frames, delay, step = 0, duration = 900) => nodes.forEach((n, i) => {
      anims.push(n.animate(frames, { duration, delay: delay + i * step, easing: ease, fill: 'backwards' }));
    });
    add(q('.ah-row'), [{ opacity: 0 }, { opacity: 1 }], 0, 0, 700);
    add(q('.ah-char'), [{ transform: 'translateY(105%)' }, { transform: 'none' }], 150, 45, 900);
    add(q('.ah-float'), [{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }], 500, 0, 1200);
    add(q('.ah-label'), [{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }], 1500, 120, 700);
    add(q('.ah-tag .ah-tl > span'), [{ transform: 'translateY(105%)' }, { transform: 'none' }], 1150, 120, 900);
    add(q('.ah-cta'), [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], 1450);
    const done = setTimeout(() => anims.forEach((a) => a.cancel()), 3200);
    return () => { clearTimeout(done); anims.forEach((a) => a.cancel()); };
  }, []);

  return (
    <section className="ah" ref={root} aria-labelledby="ah-title">
      <div className="ah-top">
        <ul className="ah-row" aria-label="What we do">
          {h.row.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="ah-title-box">
          <h1 id="ah-title" className="ah-title" ref={title} aria-label={h.title}>
            {h.title.split('').map((c, i) => (
              <span className={`ah-cw${i > h.title.lastIndexOf(' ') ? ' is-accent' : ''}`} key={i} aria-hidden="true"><span className="ah-char">{c === ' ' ? ' ' : c}</span></span>
            ))}
          </h1>
        </div>
      </div>

      <div className="ah-stage">
        {/* Exploded view of a product being built: code at the base, design above it,
            the live site on top, joined by orange guides. Pure CSS 3D, so it stays sharp. */}
        <div className="ah-piece" ref={ring} aria-hidden="true">
          <div className="ah-float">
            <div className="ah-iso">
              <div className="ah-layer ah-layer--code" style={{ '--z': 0 }}>
                <span className="ah-code-bar" />
                {h.code.map((line, i) => (
                  <span className="ah-code" key={i} style={{ '--indent': line[0] }}>
                    {line.slice(1).map((w, j) => <i key={j} className={`c${w[0]}`} style={{ width: `${w[1]}%` }} />)}
                  </span>
                ))}
              </div>
              <div className="ah-layer ah-layer--design" style={{ '--z': 1 }}>
                <span className="ah-wf ah-wf--nav" /><span className="ah-wf ah-wf--h1" /><span className="ah-wf ah-wf--h2" />
                <span className="ah-wf ah-wf--btn" /><span className="ah-wf ah-wf--img" />
                <span className="ah-wf ah-wf--card" /><span className="ah-wf ah-wf--card2" /><span className="ah-wf ah-wf--card3" />
              </div>
              <div className="ah-layer ah-layer--launch" style={{ '--z': 2 }}>
                <img src={h.shot} width="1550" height="872" alt="" />
              </div>
              <span className="ah-guide ah-guide--a" /><span className="ah-guide ah-guide--b" />
              <span className="ah-guide ah-guide--c" /><span className="ah-guide ah-guide--d" />
            </div>
          </div>
          <span className="ah-floor" />
          <ul className="ah-labels">
            {h.layers.map((l, i) => (
              <li className={`ah-label ah-label--${i}`} key={l}><b>{String(3 - i).padStart(2, '0')}</b>{l}</li>
            ))}
          </ul>
        </div>

        <div className="ah-tag">
          <p className="ah-tagline">
            <span className="ah-tl"><span>{h.tagline[0]}</span></span>
            <span className="ah-tl"><span>{h.tagline[1]}</span></span>
          </p>
          <a className="ah-cta" href={h.cta.href}>{h.cta.label}<span className="ah-cta-ic"><Arrow /></span></a>
        </div>
      </div>
    </section>
  );
}
