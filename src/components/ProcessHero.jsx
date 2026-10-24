import { useState } from 'react';
import { company } from '../data/content.js';
import { processHero } from '../data/pages.js';
import { useMediaQuery, useVideoSrc } from './useClient.js';
import './ProcessHero.css';

// Process page hero: a large two-tone headline with an inline "eye" pill, an ask box
// that opens WhatsApp, and a looping video that rises from below and blends into the
// page colour. Small labels anchor the edges.

const Arrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ProcessHero() {
  const h = processHero;
  const [q, setQ] = useState('');
  // Phones get the lighter file.
  // Phones get the lighter file; both are chosen after mount.
  const src = useVideoSrc(h.video, h.videoMobile);
  const still = useMediaQuery('(prefers-reduced-motion: reduce)');

  const ask = (e) => {
    e.preventDefault();
    const text = q.trim() ? `Hi Tezco, ${q.trim()}` : 'Hi Tezco, I have a question about your process.';
    window.open(`${company.whatsappBase}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  return (
    <section className="ph" aria-labelledby="ph-title">
      <div className="ph-media" aria-hidden="true">
        {still
          ? <img className="ph-video" src={h.poster} alt="" />
          : <video className="ph-video" src={src} poster={h.poster} autoPlay loop muted playsInline preload="auto" />}
        <span className="ph-fade" />
      </div>

      <div className="ph-grid">
        <div className="ph-copy">
          <nav className="ph-crumbs" aria-label="Breadcrumb"><a href="/">home</a><span aria-hidden="true">/</span><span aria-current="page">process</span></nav>
          <h1 id="ph-title" className="ph-title">
            <span className="ph-dark">{h.lead}</span>{' '}
            {h.rest[0]}{' '}<br />
            {h.rest[1]}{' '}<br />
            {h.before}{' '}
            <span className="ph-eye" aria-hidden="true"><i /></span>{' '}
            {h.after}
          </h1>
          <form className="ph-ask" onSubmit={ask}>
            <label className="ph-sr" htmlFor="ph-q">Ask us about your project</label>
            <input id="ph-q" type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder={h.placeholder} autoComplete="off" />
            <button type="submit" aria-label="Send on WhatsApp"><Arrow /></button>
          </form>
        </div>
      </div>

      <a className="ph-side" href={h.side.href}>
        <span>{h.side.label}</span><b>{h.side.from}</b><i aria-hidden="true" /><b>{h.side.to}</b>
      </a>
      <span className="ph-corner ph-corner--l">{h.cornerLeft}</span>
      <span className="ph-corner ph-corner--r">{h.cornerRight}</span>
    </section>
  );
}
