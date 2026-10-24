import { useEffect, useRef, useState } from 'react';
import { company } from '../data/content.js';
import { Phone, Mail, WhatsApp } from './Icons.jsx';
import { useVideoSrc } from './useClient.js';
import './GlassHero.css';

const FADE = 500;          // ms
const FADE_OUT_AT = 0.55;  // seconds before the end

const Arrow = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

// Full-screen hero with a looping white-background video, cinematic serif heading and
// liquid-glass controls. The loop uses a JS fade (rAF) so the restart is never visible.
export default function GlassHero({ video, videoMobile, poster, title, text, placeholder, button, crumbs }) {
  const ref = useRef(null);
  const raf = useRef(0);
  const fadingOut = useRef(false);
  const [idea, setIdea] = useState('');
  const src = useVideoSrc(video, videoMobile);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Fade from the current opacity to `to` over FADE ms, cancelling any running fade.
    const fade = (to) => {
      cancelAnimationFrame(raf.current);
      const from = parseFloat(v.style.opacity || '0');
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / FADE);
        v.style.opacity = String(from + (to - from) * p);
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    };
    if (reduce) { v.style.opacity = '1'; v.pause(); return undefined; }
    v.style.opacity = '0';
    const onPlay = () => { fadingOut.current = false; fade(1); };
    const onTime = () => {
      if (!fadingOut.current && v.duration && v.duration - v.currentTime <= FADE_OUT_AT) { fadingOut.current = true; fade(0); }
    };
    const onEnded = () => {
      cancelAnimationFrame(raf.current);
      v.style.opacity = '0';
      setTimeout(() => { v.currentTime = 0; v.play().catch(() => {}); }, 100);
    };
    v.addEventListener('playing', onPlay);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('ended', onEnded);
    if (!v.paused && v.readyState > 2) onPlay();
    return () => {
      cancelAnimationFrame(raf.current);
      v.removeEventListener('playing', onPlay);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
    };
  }, [src]);

  const send = (e) => {
    e.preventDefault();
    const msg = idea.trim() ? `Hi Tezco, I'd like to build: ${idea.trim()}` : 'Hi Tezco, I would like to discuss a project.';
    window.open(`${company.whatsappBase}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  };

  return (
    <section id="top" className="gh" aria-labelledby="gh-title">
      <video ref={ref} className="gh-video" src={src} poster={poster} autoPlay muted playsInline preload="auto" aria-hidden="true" />

      <div className="gh-content">
        {crumbs && (
          <nav className="gh-crumbs liquid-glass" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{crumbs}</span>
          </nav>
        )}
        <h1 id="gh-title" className="gh-title">
          {title.map((p, i) => (p.em ? <em key={i}>{p.em}</em> : <span key={i}>{p.t}</span>))}
        </h1>
        <div className="gh-stack">
          <form className="gh-input liquid-glass" onSubmit={send}>
            <label htmlFor="gh-idea" className="gh-sr">What do you want to build?</label>
            <input id="gh-idea" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder={placeholder} autoComplete="off" />
            <button type="submit" aria-label="Send your idea to Tezco on WhatsApp"><Arrow /></button>
          </form>
          <p className="gh-text">{text}</p>
          <a className="gh-btn liquid-glass" href={button.href}>{button.label}</a>
        </div>
      </div>

      <div className="gh-social">
        <a className="liquid-glass" href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp width={20} height={20} /></a>
        <a className="liquid-glass" href={company.phoneHref} aria-label={`Call ${company.phone}`}><Phone width={20} height={20} /></a>
        <a className="liquid-glass" href={`mailto:${company.email}`} aria-label={`Email ${company.email}`}><Mail width={20} height={20} /></a>
      </div>
    </section>
  );
}
