import { useEffect, useState } from 'react';
import { Logo, Wordmark } from './Icons.jsx';
import { nav, company } from '../data/content.js';
import { NAV_DARK } from '../pageTheme.js';
import './Navbar.css';

const Arrow = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

// One navbar for every page: a floating glass capsule with the logo, page links and a
// "Contact us" button. Light glass on light pages, dark glass on dark ones. It tightens
// once the page scrolls, and on phones opens a full menu panel.
export default function Navbar({ page }) {
  const dark = NAV_DARK.includes(page);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // While the phone menu is open: lock page scroll and close on Escape.
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [open]);

  const cls = ['tn', dark ? 'tn--dark' : 'tn--light', scrolled && 'is-scrolled', open && 'is-open'].filter(Boolean).join(' ');
  return (
    <header className={cls}>
      <a className="tn-skip" href="#main">Skip to content</a>
      <div className="tn-bar">
        <a href="/" className="tn-brand" aria-label="Tezco home">
          <Logo size={28} />
          <Wordmark height={15} color={dark ? 'white' : 'black'} />
        </a>

        <nav className="tn-links" aria-label="Primary">
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className={l.page === page ? 'is-active' : undefined} aria-current={l.page === page ? 'page' : undefined}>{l.label}</a>
          ))}
        </nav>

        <a href={nav.ctaHref} className="tn-cta">{nav.cta}<span className="tn-cta-ic"><Arrow /></span></a>

        <button type="button" className="tn-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="tn-menu" onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
      </div>

      {/* Phone and tablet menu */}
      <div id="tn-menu" className="tn-menu" hidden={!open}>
        <nav aria-label="Mobile">
          {nav.links.map((l, i) => (
            <a key={l.label} href={l.href} className={l.page === page ? 'is-active' : undefined} aria-current={l.page === page ? 'page' : undefined} onClick={() => setOpen(false)} style={{ '--i': i }}>
              <span>{String(i + 1).padStart(2, '0')}</span>{l.label}
            </a>
          ))}
        </nav>
        <div className="tn-menu-foot">
          <a href={nav.ctaHref} className="tn-cta tn-cta--block" onClick={() => setOpen(false)}>{nav.cta}<span className="tn-cta-ic"><Arrow /></span></a>
          <p><a href={`mailto:${company.email}`}>{company.email}</a><a href={company.phoneHref}>{company.phone}</a></p>
        </div>
      </div>
      {open && <button type="button" className="tn-scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
    </header>
  );
}
