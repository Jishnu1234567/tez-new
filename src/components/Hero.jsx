import { useEffect, useRef, useState } from 'react';
import { hero, company } from '../data/content.js';
import { brand, Layers, Code, Mobile, Spark, Bolt, Cap } from './Icons.jsx';
import { heroLayout, aboutFirst } from '../heroVariant.js';
import './Hero.css';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Circular badge: rotating text around an orange arrow button. */
function ExploreBadge({ data }) {
  return (
    <a className="hx-explore" href={data.href} aria-label={data.label}>
      <svg className="hx-explore-ring" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <path id="hx-ring-path" d="M60 60m-47 0a47 47 0 1 1 94 0a47 47 0 1 1 -94 0" />
        </defs>
        <text>
          <textPath href="#hx-ring-path" textLength="295" lengthAdjust="spacing">{data.ring}</textPath>
        </text>
      </svg>
      <span className="hx-explore-btn"><Arrow /></span>
    </a>
  );
}

/* The 3D "Get Started" keycap. */
function Keycap({ data }) {
  return (
    <a className="hx-key" href={data.href} aria-label={data.aria}>
      <span className="hx-key-shadow" aria-hidden="true" />
      <span className="hx-key-scene" aria-hidden="true">
        <span className="hx-box hx-base">
          <span className="f top" /><span className="f s1" /><span className="f s2" /><span className="f s3" /><span className="f s4" />
        </span>
        <span className="hx-box hx-cap">
          <span className="f s1" /><span className="f s2" /><span className="f s3" /><span className="f s4" />
          <span className="f top"><em>{data.label[0]}<br />{data.label[1]}</em></span>
        </span>
      </span>
    </a>
  );
}

/* Orange message composer that types real project ideas and sends the visible one on WhatsApp. */
function Composer({ data }) {
  const [idea, setIdea] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const ideas = data.ideas;
    let idx = 0, pos = 0, deleting = false, timer;
    const tick = () => {
      const full = ideas[idx];
      if (reducedMotion()) {
        setIdea(idx); setTyped(full);
        idx = (idx + 1) % ideas.length;
        timer = setTimeout(tick, 3500);
        return;
      }
      if (!deleting) {
        pos += 1; setIdea(idx); setTyped(full.slice(0, pos));
        if (pos >= full.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
        timer = setTimeout(tick, 42);
      } else {
        pos -= 1; setTyped(full.slice(0, pos));
        if (pos <= 0) { deleting = false; idx = (idx + 1) % ideas.length; timer = setTimeout(tick, 280); return; }
        timer = setTimeout(tick, 20);
      }
    };
    timer = setTimeout(tick, 900);
    return () => clearTimeout(timer);
  }, [data.ideas]);

  const message = `Hi Tezco, I'd like to build: ${data.ideas[idea]}`;
  const href = `${company.whatsappBase}?text=${encodeURIComponent(message)}`;

  return (
    <div className="hx-chat" data-reveal>
      <div className="hx-chat-head">
        <span className="hx-chat-av"><img src={brand.logomark.orange} alt="" /></span>
        <div>
          <strong>{data.name}</strong>
          <small><i aria-hidden="true" />{data.status}</small>
        </div>
      </div>
      <p className="hx-bubble">{data.greeting}</p>
      <div className="hx-compose">
        <span className="hx-typed" aria-hidden="true">{typed}<b className="hx-caret" /></span>
        <a className="hx-send" href={href} target="_blank" rel="noreferrer" aria-label={data.send}><Arrow /></a>
      </div>
      <span className="hx-chat-hint">{data.hint}</span>
    </div>
  );
}

const KEY_ICONS = { saas: Layers, web: Code, mobile: Mobile, ai: Spark, auto: Bolt, college: Cap };

/* Service keyboard: keycaps that light up and show each service on a small display. */
function ServiceKeyboard({ data }) {
  const [active, setActive] = useState(0);
  const touched = useRef(false);

  useEffect(() => {
    if (reducedMotion()) return undefined;
    const t = setInterval(() => {
      if (!touched.current) setActive((a) => (a + 1) % data.keys.length);
    }, 2800);
    return () => clearInterval(t);
  }, [data.keys.length]);

  const pick = (i) => { touched.current = true; setActive(i); };
  const k = data.keys[active];

  return (
    <div className="hx-kb" data-reveal>
      <div className="hx-kb-info">
        <span className="hx-chip"><i aria-hidden="true"><b /><b /><b /></i>{data.chip}</span>
        <div className="hx-screen" aria-live="polite">
          <div className="hx-screen-in" key={k.id}>
            <span className="hx-screen-k">{String(active + 1).padStart(2, '0')} / {String(data.keys.length).padStart(2, '0')}</span>
            <strong>{k.title}</strong>
            <p>{k.text}</p>
          </div>
        </div>
        <a className="hx-kb-link" href={data.href}>{data.link} <Arrow /></a>
      </div>
      <div className="hx-deck" role="group" aria-label="Tezco services">
        {data.keys.map((key, i) => {
          const Icon = KEY_ICONS[key.id];
          return (
            <button
              key={key.id}
              type="button"
              className={`hx-k${i === active ? ' on' : ''}`}
              aria-pressed={i === active}
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              onFocus={() => pick(i)}
            >
              <Icon width={16} height={16} />
              <span>{key.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Scale headline text to a target width. Two passes, because glyph widths
   do not scale perfectly linearly from the probe size. Returns the size used. */
function fitText(el, target) {
  let size = 100;
  for (let pass = 0; pass < 2; pass++) {
    el.style.fontSize = `${size}px`;
    const w = el.getBoundingClientRect().width;
    if (!w) return size;
    size *= target / w;
  }
  el.style.fontSize = `${size}px`;
  return size;
}

export default function Hero() {
  const zig = heroLayout === 'zig';
  const titleRef = useRef(null);   // classic: the single headline line
  const line1Ref = useRef(null);   // zigzag: "BUILD"
  const line2Ref = useRef(null);   // zigzag: "WHAT'S NEXT"
  const keyRef = useRef(null);

  useEffect(() => {
    const box = (zig ? line2Ref : titleRef).current.closest('.hx');
    const fit = () => {
      const inner = box.clientWidth - parseFloat(getComputedStyle(box).paddingLeft) - parseFloat(getComputedStyle(box).paddingRight);
      if (!zig) { fitText(titleRef.current, inner * 0.99); return; }
      const phone = window.innerWidth <= 760;
      // Desktop: "WHAT'S NEXT" fills the row beside the keycap. Phone: it fills the full width.
      const keyZone = phone ? 0 : (keyRef.current?.offsetWidth || 250) + 40;
      let size = fitText(line2Ref.current, (inner - keyZone) * 0.99);
      if (!phone) {
        // Keep both headline rows, the cards and the navbar inside one screen.
        const cardsH = box.querySelector('.hx-cards')?.offsetHeight || 260;
        const maxByHeight = (window.innerHeight - 92 - cardsH - 190) / (2 * 0.84);
        if (size > maxByHeight) {
          size = Math.max(64, maxByHeight);
          line2Ref.current.style.fontSize = `${size}px`;
        }
      }
      line1Ref.current.style.fontSize = `${size}px`;
      const l1 = line1Ref.current.getBoundingClientRect();
      box.style.setProperty('--l1w', `${l1.width}px`);
      box.style.setProperty('--l1h', `${l1.height}px`); // the hero photo capsule never outgrows "BUILD"
    };
    fit();
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener?.('loadingdone', fit);
    const t1 = setTimeout(fit, 400), t2 = setTimeout(fit, 1500);
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    return () => {
      ro.disconnect();
      clearTimeout(t1); clearTimeout(t2);
      document.fonts?.removeEventListener?.('loadingdone', fit);
    };
  }, [zig]);

  const cards = (
    <div className="hx-cards">
      <Composer data={hero.composer} />
      <ServiceKeyboard data={hero.keyboard} />
    </div>
  );

  const intro = (
    <div className="hx-about" data-reveal>
      <span className="hx-eyebrow"><i />{hero.eyebrow}</span>
      <p>{hero.intro}</p>
    </div>
  );

  if (zig) {
    return (
      <section id={aboutFirst ? 'build' : 'top'} className="hx-wrap">
        <div className="hx hx--zig">
          <div className="hx-rule top" />
          <div className="hz-grid">
            {/* One h1; its two lines are placed in opposite corners of the grid. */}
            <h2 className="hz-h1">
              <span className="hz-l1"><span ref={line1Ref}>{hero.titleLines[0]}</span></span>
              <span className="hz-l2"><span ref={line2Ref}>{hero.titleLines[1]}</span></span>
            </h2>
            <div className="hz-aside">
              {intro}
              <figure className="hx-shot">
                <img src={hero.shot.src} alt={hero.shot.alt} width="700" height="525" fetchpriority="high" />
              </figure>
              <ExploreBadge data={hero.explore} />
            </div>
            <div className="hx-rule hz-rule" />
            <div className="hz-keyzone" ref={keyRef}><Keycap data={hero.key} /></div>
          </div>
          {cards}
        </div>
      </section>
    );
  }

  return (
    <section id={aboutFirst ? 'build' : 'top'} className="hx-wrap">
      <div className="hx">
        <div className="hx-rule top" />
        <h2 className="hx-title"><span ref={titleRef}>{hero.title}</span></h2>
        <div className="hx-rule" />
        <div className="hx-mid">
          {intro}
          <Keycap data={hero.key} />
          <ExploreBadge data={hero.explore} />
        </div>
        {cards}
      </div>
    </section>
  );
}
