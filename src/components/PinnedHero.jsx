import { useEffect, useRef } from 'react';
import { useVideoSrc } from './useClient.js';
import './Opening.css';

// A tall section with a sticky, full-screen inner frame. While it is pinned the media
// card opens from an inset rounded frame to full screen (--p 0 -> 1), then the page
// continues. Used for the home hero (video) and every inner page header (image).
export default function PinnedHero({ light, video, videoMobile, image, poster, title, text, cta, book, eyebrow, crumbs, variant = 'home' }) {
  const wrap = useRef(null);
  const media = useRef(null);
  // Phones and small tablets get the lighter video file.
  const videoSrc = useVideoSrc(video, videoMobile);

  useEffect(() => {
    const el = wrap.current;
    // Home: a static full-screen hero, so nothing is driven by scroll.
    if (variant === 'home') return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const pinned = Math.max(1, el.offsetHeight - vh);
      const opening = Math.min(vh * 1.2, pinned);
      const y = Math.min(Math.max(-el.getBoundingClientRect().top, 0), pinned);
      const p = Math.min(1, y / opening);
      el.style.setProperty('--p', p.toFixed(4));
      // Inner pages: the photo also eases in slightly while pinned.
      if (image && media.current) media.current.style.transform = `scale(${(1.12 - 0.12 * (y / pinned)).toFixed(4)})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  }, [image, variant]);

  useEffect(() => {
    const v = media.current;
    if (video && v && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.removeAttribute('autoplay'); v.pause(); }
  }, [video]);

  return (
    <section id="top" className={`vh-wrap vh-wrap--${variant}${light ? ' vh-wrap--light' : ''}`} ref={wrap} aria-labelledby="vh-title">
      <div className="vh-sticky">
        <div className="vh">
          {video ? (
            <video ref={media} className="vh-video" src={videoSrc} poster={poster} autoPlay loop muted playsInline preload="auto" aria-hidden="true" />
          ) : (
            <img ref={media} className="vh-video vh-photo" src={image} alt="" fetchpriority="high" />
          )}
          {(image || variant === 'page') && <span className="vh-veil" aria-hidden="true" />}
          <div className="vh-content">
            {crumbs && (
              <nav className="vh-crumbs fade-rise" aria-label="Breadcrumb">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{crumbs}</span>
              </nav>
            )}
            {eyebrow && !crumbs && <span className="vh-eyebrow fade-rise">{eyebrow}</span>}
            <h1 id="vh-title" className="vh-title fade-rise">
              {title.map((part, i) => (part.em ? <em key={i}>{part.em}</em> : <span key={i}>{part.t}</span>))}
            </h1>
            {text && <p className="vh-text fade-rise-d1">{text}</p>}
            {book && (
              <a className="vh-book fade-rise-d2" href={book.href} aria-label={`${book.label}: ${book.note}`}>
                <span className="vh-book-dot" aria-hidden="true" />
                <span className="vh-book-txt"><strong>{book.note}</strong><small>{book.sub}</small></span>
                <span className="vh-book-go">
                  <span className="vh-book-label">{book.label}</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
                </span>
              </a>
            )}
            {cta && (
              <a className="vh-cta liquid-glass fade-rise-d2" href={cta.href} {...(/^https?:/.test(cta.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>{cta.label}</a>
            )}
          </div>
          <span className="vh-scroll" aria-hidden="true"><i />Scroll</span>
        </div>
      </div>
    </section>
  );
}
