import { useEffect, useRef, useState } from 'react';
import { useIsoLayoutEffect, useVideoSrc } from './useClient.js';
import { portfolioHero } from '../data/pages.js';
import './PortfolioHero.css';

// Portfolio hero: a tall rounded panel with a looping clifftop video and floating cards
// that show real project screenshots (left), and a calm off-white column with the
// headline and call to action (right). Only the UI animates; the scene is the video.

const Arrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function PortfolioHero() {
  const h = portfolioHero;
  const root = useRef(null);
  const video = useRef(null);
  const [live, setLive] = useState(false);
  const src = useVideoSrc(h.video, h.videoMobile);
  const [still, setStill] = useState(false);
  useEffect(() => { if (reduced()) setStill(true); }, []);

  // Fade the video in once its first frame is ready.
  useEffect(() => {
    const v = video.current;
    if (!v) return undefined;
    const on = () => setLive(true);
    if (v.readyState >= 2) on();
    v.addEventListener('loadeddata', on);
    return () => v.removeEventListener('loadeddata', on);
  }, []);

  // One entrance timeline (Web Animations), cancelled once it has finished.
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el || still || !el.animate) return undefined;
    const ease = 'cubic-bezier(.16, 1, .3, 1)';
    const q = (s) => Array.from(el.querySelectorAll(s));
    const anims = [];
    const add = (nodes, frames, delay, step = 0, duration = 900) => nodes.forEach((n, i) => {
      anims.push(n.animate(frames, { duration, delay: delay + i * step, easing: ease, fill: 'backwards' }));
    });
    add(q('.pf-top'), [{ opacity: 0, transform: 'translateY(-10px)' }, { opacity: 1, transform: 'none' }], 100);
    add(q('.pf-title .pf-ln > span'), [{ transform: 'translateY(110%)' }, { transform: 'none' }], 300, 140, 1000);
    add(q('.pf-lede'), [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 900);
    add(q('.pf-cta'), [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 1050);
    add(q('.pf-facts'), [{ opacity: 0 }, { opacity: 1 }], 1250);
    add(q('.pf-card'), [{ opacity: 0, transform: 'translateY(40px) scale(.94)' }, { opacity: 1, transform: 'none' }], 700, 180, 1200);
    add(q('.pf-corner'), [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], 1300);
    const done = setTimeout(() => anims.forEach((a) => a.cancel()), 2600);
    return () => { clearTimeout(done); anims.forEach((a) => a.cancel()); };
  }, [still]);

  return (
    <section className="pf" ref={root} aria-labelledby="pf-title">
      <div className="pf-panel">
        <img className="pf-photo" src={h.poster} alt="" aria-hidden="true" fetchpriority="high" />
        {!still && <video ref={video} className={`pf-video${live ? ' is-live' : ''}`} src={src} autoPlay loop muted playsInline preload="auto" aria-hidden="true" />}
        <svg className="pf-dust" viewBox="0 0 400 160" aria-hidden="true">
          <circle cx="40" cy="30" r="1.6" /><circle cx="120" cy="70" r="1.1" /><circle cx="210" cy="24" r="1.4" />
          <circle cx="300" cy="90" r="1" /><circle cx="360" cy="40" r="1.5" /><circle cx="250" cy="130" r="1.2" />
        </svg>

        <div className="pf-cards">
          {/* 1. Orange project card */}
          <a className="pf-card pf-card--project" href={h.project.href}>
            <span className="pf-k">{h.project.label}</span>
            <strong className="pf-big">{h.project.name}</strong>
            <span className="pf-row"><span className="pf-chip is-white">{h.project.chip}</span><i className="pf-dot" /></span>
            <span className="pf-link">{h.project.link}</span>
          </a>

          {/* 2. Glass card: what we build, each linking to its service */}
          <div className="pf-card pf-card--glass">
            {h.builds.map((s, i) => (
              <a className="pf-item" href={s.href} key={s.name}>
                <span className="pf-item-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="pf-item-name">{s.name}</span>
                <span className={`pf-chip${i === 0 ? ' is-white' : ' is-orange'}`}>{s.chip}</span>
              </a>
            ))}
            <span className="pf-note">
              <span>{h.live.text}</span>
              <a className="pf-link is-dark" href={h.live.href} {...(/^https?:/.test(h.live.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>{h.live.link} ↗</a>
            </span>
          </div>

          {/* 3. Dark card: the live address as a heading and a link */}
          <a className="pf-card pf-card--dark" href={h.site.href} target="_blank" rel="noreferrer">
            <span className="pf-dark-top"><span>{h.site.left}</span><span>{h.site.right}</span></span>
            <strong className="pf-dark-url">{h.site.title}</strong>
            <span className="pf-dark-link">{h.site.link} ↗</span>
          </a>
        </div>

        <p className="pf-corner" aria-hidden="true">{h.corner[0]}{' '}<br /><em>{h.corner[1]}</em></p>
      </div>

      <div className="pf-col">
        <div className="pf-top">
          <nav className="pf-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Portfolio</span></nav>
        </div>
        <div className="pf-main">
          <h1 id="pf-title" className="pf-title" aria-label={h.title.join(' ')}>
            {h.title.map((l, i) => (
              <span className="pf-ln" key={l} aria-hidden="true"><span>{i === h.title.length - 1 ? <em>{l}</em> : l}</span></span>
            ))}
          </h1>
          <p className="pf-lede">{h.lede[0]}{' '}<br />{h.lede[1]}</p>
          <a className="pf-cta" href={h.cta.href}>{h.cta.label}<span className="pf-cta-ic"><Arrow /></span></a>
        </div>
        <p className="pf-facts">{h.facts}</p>
      </div>
    </section>
  );
}
