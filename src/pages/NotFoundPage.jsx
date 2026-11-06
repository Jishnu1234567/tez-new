import { useEffect, useRef, useState } from 'react';
import { company } from '../data/content.js';
import { notFound } from '../data/legal.js';
import { useVideoSrc } from '../components/useClient.js';
import './NotFound.css';

// 404: a full-screen video that scrubs forwards and backwards as the pointer moves
// sideways, a blurred intro label, a typewriter line and pill links back into the site.

const SENSITIVITY = 0.8;

/* Reveals `text` one character at a time after `startDelay`. */
function useTypewriter(text, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplayed(text); setDone(true); return undefined; }
    let i = 0; let iv = 0;
    const start = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(iv); setDone(true); }
      }, speed);
    }, startDelay);
    return () => { clearTimeout(start); clearInterval(iv); };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

/* Scrubs the video by horizontal pointer movement, queuing seeks so they never pile up. */
function useScrub(ref) {
  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let prevX = null; let target = 0; let seeking = false;
    const seek = () => {
      if (!v.duration || Math.abs(v.currentTime - target) < 0.01) { seeking = false; return; }
      seeking = true;
      v.currentTime = target;
    };
    const onSeeked = () => { seeking = false; if (Math.abs(v.currentTime - target) > 0.01) seek(); };
    const onMove = (e) => {
      const x = e.clientX;
      if (prevX === null) { prevX = x; return; }
      const delta = x - prevX;
      prevX = x;
      if (!v.duration) return;
      target = Math.min(v.duration, Math.max(0, target + (delta / window.innerWidth) * SENSITIVITY * v.duration));
      if (!seeking) seek();
    };
    v.addEventListener('seeked', onSeeked);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { v.removeEventListener('seeked', onSeeked); window.removeEventListener('pointermove', onMove); };
  }, [ref]);
}

const CopyIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.4" />
    <path d="M8.5 2.2V1.9A1.4 1.4 0 0 0 7.1.5H1.9A1.4 1.4 0 0 0 .5 1.9v5.2a1.4 1.4 0 0 0 1.4 1.4h.3" />
  </svg>
);

export default function NotFoundPage() {
  const n = notFound;
  const video = useRef(null);
  const chosen = useVideoSrc(n.video, n.videoMobile);
  // Load the video only after the page itself has finished loading, so it never
  // competes with the text and fonts for the first paint. The poster shows until then.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const go = () => (window.requestIdleCallback || ((f) => setTimeout(f, 200)))(() => setReady(true));
    if (document.readyState === 'complete') go();
    else window.addEventListener('load', go, { once: true });
    return () => window.removeEventListener('load', go);
  }, []);
  const src = ready ? chosen : undefined;
  useScrub(video);
  const { displayed, done } = useTypewriter(n.line);
  const [shown, setShown] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => { const t = setTimeout(() => setShown(true), 400); return () => clearTimeout(t); }, []);

  const copy = async () => {
    try { await navigator.clipboard.writeText(company.email); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { window.location.href = `mailto:${company.email}`; }
  };

  return (
    <section className="nf" aria-labelledby="nf-title">
      <video ref={video} className="nf-video" src={src} poster={n.poster} muted playsInline preload="auto" aria-hidden="true" />
      <span className="nf-wash" aria-hidden="true" />

      <div className="nf-in">
        <p className="nf-big" aria-hidden="true"><span>404</span><em>Page not found</em></p>
        <p className="nf-blur" aria-hidden="true">{n.intro[0]}<br />{n.intro[1]}</p>
        <h1 id="nf-title" className="nf-sr">{n.title}</h1>
        <p className="nf-type">
          <span className="nf-sr">{n.line}</span>
          <span aria-hidden="true">{displayed}</span>
          {!done && <span className="nf-cursor" aria-hidden="true" />}
        </p>

        <nav className={`nf-pills${shown ? ' is-shown' : ''}`} aria-label="Popular pages">
          {n.links.map((l) => <a key={l.href} className="nf-pill" href={l.href}>{l.label}</a>)}
          <button type="button" className="nf-pill nf-pill--outline" onClick={copy} aria-label={`Copy email address ${company.email}`}>
            <span>{copied ? 'Copied to clipboard' : <>Reach us: <u>{company.email}</u></>}</span>
            <CopyIcon />
          </button>
        </nav>
      </div>

    </section>
  );
}
