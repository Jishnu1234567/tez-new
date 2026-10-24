import { useEffect, useRef, useState } from 'react';
import { services } from '../data/content.js';
import { PaperHead, Eyebrow, FillTitle, ArrowUpRight, useInView } from './Paper.jsx';
import { Layers, Code, Mobile, Spark, Bolt, Cap } from './Icons.jsx';

const SVC_ICONS = { saas: Layers, web: Code, mobile: Mobile, ai: Spark, automation: Bolt, college: Cap };

/* Home page service showcase: a sticky index rail on the left and a deck of cards
   on the right that stack on top of each other as you scroll. The card underneath
   shrinks and dims, each photo goes from grey to full colour as its card arrives,
   and the rail tracks which service is on top. */
const THEMES = ['light', 'dark', 'accent', 'light', 'dark', 'accent'];
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ServiceStack() {
  const rootRef = useRef(null);
  const [active, setActive] = useState(0);
  const [headRef, on] = useInView(0.05);
  const items = services.items;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const lis = Array.from(root.querySelectorAll('.ss-item'));
    const still = reducedMotion();
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const box = root.getBoundingClientRect();
      if (box.bottom < -100 || box.top > vh + 100) return;
      let current = 0;
      lis.forEach((li, i) => {
        const r = li.getBoundingClientRect();
        const card = li.firstElementChild;
        // How far the next card has slid over this one (0 = not at all, 1 = fully).
        const next = lis[i + 1];
        let cover = 0;
        if (next) {
          const nr = next.getBoundingClientRect();
          cover = Math.min(1, Math.max(0, 1 - (nr.top - r.top) / r.height));
        }
        // Photo reveal as the card climbs into place.
        const reveal = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.55)));
        if (!still) {
          card.style.setProperty('--cover', cover.toFixed(3));
          card.style.setProperty('--reveal', reveal.toFixed(3));
        }
        card.classList.toggle('is-live', reveal > 0.55);
        if (r.top < vh * 0.5) current = i;
      });
      setActive(current);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, []);

  // Scroll so card i has just landed on the deck. Sticky items report where they are
  // stuck, so the target is worked out from the list top plus the heights before it.
  const jump = (e, i) => {
    e.preventDefault();
    const list = rootRef.current.querySelector('.ss-stack');
    const lis = Array.from(list.children);
    let y = list.getBoundingClientRect().top + window.scrollY;
    for (let k = 0; k < i; k += 1) {
      const cs = getComputedStyle(lis[k]);
      y += lis[k].offsetHeight + parseFloat(cs.marginBottom);
    }
    y -= parseFloat(getComputedStyle(lis[i]).top) || 0;
    window.scrollTo({ top: y + 2, behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  const pad = (n) => String(n).padStart(2, '0');
  return (
    <div className={`ss${on ? ' pp-on' : ''}`} ref={(el) => { rootRef.current = el; headRef.current = el; }} style={{ '--count': items.length }}>
      <aside className="ss-rail pp-a" aria-label="Service index">
        <div className="ss-count" aria-hidden="true">
          <span className="ss-count-now" key={active}>{pad(active + 1)}</span>
          <span className="ss-count-all">/ {pad(items.length)}</span>
        </div>
        <ol className="ss-index">
          {items.map((s, i) => (
            <li key={s.slug} className={i === active ? 'is-on' : i < active ? 'is-done' : ''}>
              <a href={`/services/#${s.slug}`} onClick={(e) => jump(e, i)}>
                <span className="ss-index-n">{pad(i + 1)}</span>
                <span className="ss-index-t">{s.title}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="ss-bar" aria-hidden="true"><i style={{ transform: `scaleX(${(active + 1) / items.length})` }} /></div>
      </aside>

      <ol className="ss-stack">
        {items.map((s, i) => {
          const Icon = SVC_ICONS[s.slug];
          return (
            <li className="ss-item" style={{ '--i': i }} key={s.slug}>
              <a className={`ss-card is-${THEMES[i % THEMES.length]}`} href={`/services/#${s.slug}`}>
                <span className="ss-body">
                  <span className="ss-top">
                    <span className="ss-icon" aria-hidden="true"><Icon width={20} height={20} /></span>
                    <span className="ss-num">{pad(i + 1)} / {pad(items.length)}</span>
                  </span>
                  <strong className="ss-title">{s.title}</strong>
                  <span className="ss-text">{s.text}</span>
                  <span className="ss-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</span>
                  <span className="ss-link">Explore service<span className="ss-link-ic"><ArrowUpRight /></span></span>
                  <span className="ss-ghost" aria-hidden="true">{pad(i + 1)}</span>
                </span>
                <span className="ss-media">
                  <img src={s.image} alt="" loading="lazy" />
                  <span className="ss-media-glow" aria-hidden="true" />
                </span>
                <span className="ss-shade" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* The four process steps as cards. */
export function ProcessCards() {
  const [ref, on] = useInView(0.1);
  return (
    <ol className={`pp-proc-grid${on ? ' pp-on' : ''}`} ref={ref}>
      {services.process.steps.map((s, i) => (
        <li className={`pp-card pp-a${i === 0 ? ' is-dark' : ''}`} style={{ '--d': `${i * 0.08}s` }} key={s.n}>
          <span className="pp-proc-n">{s.n}</span>
          <strong>{s.name}</strong>
          <p>{s.text}</p>
          <span className="pp-pill">{s.note}</span>
        </li>
      ))}
    </ol>
  );
}

// Home page: the service list, then the four-step process.
export default function Services() {
  const p = services.process;
  return (
    <section id="services" className="pp-sec" aria-labelledby="pp-services-title">
      <PaperHead eyebrow={services.eyebrow} title={services.title} text={services.text} id="pp-services-title" link={{ label: 'All services', href: '/services/' }} />
      <ServiceStack />
      <div id="process" className="pp-proc">
        <div className="pp-proc-head pp-head">
          <div>
            <Eyebrow>{p.eyebrow}</Eyebrow>
            <FillTitle lines={p.title} as="h3" className="pp-fill--sm" />
          </div>
          <a className="pp-btn is-dark" href="/process/">How we work<span className="pp-btn-ic"><ArrowUpRight /></span></a>
        </div>
        <ProcessCards />
      </div>
    </section>
  );
}
