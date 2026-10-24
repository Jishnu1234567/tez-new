import { useEffect, useRef, useState } from 'react';
import { work, company } from '../data/content.js';
import { caseStudies, portfolio } from '../data/pages.js';
import { useInView } from '../components/Paper.jsx';
import { Logo, Wordmark, Mail, Phone, WhatsApp, brand } from '../components/Icons.jsx';
import PortfolioHero from '../components/PortfolioHero.jsx';
import './Work.css';

// Work page: a portfolio in warm near-black with amber accents.
// Split hero with project cards over a video panel, a project index, a full case study,
// a service marquee, and a closing CTA + footer with the giant wordmark.

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ArrowUR = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5v.9c-4.6.5-7 2.9-7.5 7.5h-.9c-.5-4.6-2.9-7-7.5-7.5V10c4.6-.5 7-2.9 7.5-7.5z" />
  </svg>
);

function ProjectIndex() {
  const ix = portfolio.index;
  const [ref, on] = useInView(0.15);

  return (
    <section className={`wk-sec wk-index${on ? ' wk-in' : ''}`} ref={ref} aria-labelledby="wk-index-title">
      <div className="wk-wrap">
        <header className="wk-head">
          <span className="wk-eyebrow wk-e">{ix.eyebrow}</span>
          <h2 id="wk-index-title" className="wk-h2 wk-e" style={{ '--d': '.08s' }}>{ix.title}<sup>({String(ix.rows.length).padStart(2, '0')})</sup></h2>
        </header>
        <div className="wk-table-head wk-e" style={{ '--d': '.12s' }} aria-hidden="true">
          <span>No.</span><span>Project</span><span>Scope</span><span>Field</span><span>Year</span><span>Status</span>
        </div>
        <ol className="wk-rows">
          {ix.rows.map((r, i) => {
            const Tag = r.href ? 'a' : 'div';
            return (
              <li className="wk-e" style={{ '--d': `${0.16 + i * 0.07}s` }} key={r.n}>
                <Tag className={`wk-row${r.href ? '' : ' is-pending'}`} {...(r.href ? { href: r.href } : {})}>
                  <span className="wk-row-n">{r.n}</span>
                  <strong className="wk-row-name">{r.name}</strong>
                  <span className="wk-row-what">{r.what}</span>
                  <span className="wk-row-field">{r.field}</span>
                  <span className="wk-row-year">{r.year}</span>
                  <span className={`wk-status${r.href ? ' is-live' : ''}`}><i />{r.status}</span>
                  <span className="wk-row-go" aria-hidden="true"><ArrowUR /></span>
                </Tag>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function CaseStudy({ cs }) {
  const c = caseStudies[cs.project];
  const [headRef, headOn] = useInView(0.2);
  const [shotRef, shotOn] = useInView(0.15);
  const [briefRef, briefOn] = useInView(0.15);
  const titleId = `wk-case-${cs.slug}`;
  return (
    <article id={cs.slug} className="wk-sec wk-case" aria-labelledby={titleId}>
      <div className="wk-wrap">
        <header className={`wk-case-head${headOn ? ' wk-in' : ''}`} ref={headRef}>
          <div>
            <span className="wk-eyebrow wk-e">{cs.kicker}</span>
            <h2 id={titleId} className="wk-case-title wk-e" style={{ '--d': '.06s' }}>{cs.project}</h2>
            <p className="wk-lead wk-e" style={{ '--d': '.12s' }}>{cs.tagline}</p>
            <a className="wk-btn wk-e" style={{ '--d': '.18s' }} href={c.url} target="_blank" rel="noreferrer">Visit live site<span className="wk-btn-ic"><ArrowUR /></span></a>
          </div>
          <dl className="wk-meta wk-e" style={{ '--d': '.2s' }}>
            <div><dt>Client</dt><dd>{c.client}</dd></div>
            <div><dt>Industry</dt><dd>{c.industry}</dd></div>
            <div><dt>Year</dt><dd>{c.year}</dd></div>
            <div><dt>Platform</dt><dd>{cs.platform}</dd></div>
            <div className="is-wide"><dt>Services</dt><dd>{c.services.join(' · ')}</dd></div>
          </dl>
        </header>
      </div>

      {/* One framed screenshot of the live site */}
      <div className="wk-wrap">
        <figure className={`wk-shot${shotOn ? ' wk-in' : ''}`} ref={shotRef}>
          <a className="wk-shot-frame wk-e" href={c.url} target="_blank" rel="noreferrer" aria-label={`Visit the ${cs.project} website (opens in a new tab)`}>
            <span className="wk-shot-bar" aria-hidden="true"><i /><i /><i /><span>{cs.domain}</span></span>
            <img src={cs.image.src} width={cs.image.width} height={cs.image.height} alt={cs.image.alt} loading="lazy" decoding="async" />
            <span className="wk-shot-cta" aria-hidden="true">Visit live site ↗</span>
          </a>
        </figure>
      </div>

      <div className="wk-wrap">
        <div className={`wk-brief${briefOn ? ' wk-in' : ''}`} ref={briefRef}>
          <div className="wk-brief-side">
            <span className="wk-eyebrow wk-e">The brief</span>
            <p className="wk-brief-text wk-e" style={{ '--d': '.06s' }}>{c.overview}</p>
          </div>
          <div>
            <span className="wk-eyebrow wk-e" style={{ '--d': '.1s' }}>What we built</span>
            <ol className="wk-built">
              {c.built.map((b, i) => (
                <li className="wk-e" style={{ '--d': `${0.14 + i * 0.06}s` }} key={b}>
                  <span>{String(i + 1).padStart(2, '0')}</span>{b}
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </article>
  );
}

function Marquee() {
  const items = [...portfolio.marquee, ...portfolio.marquee];
  return (
    <div className="wk-marquee">
      <p className="wk-sr">What we build: {portfolio.marquee.join(', ')}</p>
      <div className="wk-marquee-track" aria-hidden="true">
        {items.map((t, i) => <span key={i}>{t}<Sparkle width={18} height={18} /></span>)}
      </div>
    </div>
  );
}

function Finale() {
  const f = portfolio.finale;
  const [ref, on] = useInView(0.12);
  const [idea, setIdea] = useState('');
  const send = (e) => {
    e.preventDefault();
    const text = idea.trim() ? `Hi Tezco, I would like to build: ${idea.trim()}` : 'Hi Tezco, I would like to discuss a project.';
    window.open(`${company.whatsappBase}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };
  return (
    <footer className={`wk-finale${on ? ' wk-in' : ''}`} ref={ref} aria-labelledby="wk-finale-title">
      <div className="wk-wrap wk-cta">
        <div className="wk-cta-copy">
          <span className="wk-pill wk-e"><Sparkle width={13} height={13} />{f.pill}</span>
          <h2 id="wk-finale-title" className="wk-cta-title" aria-label={f.title.join(' ')}>
            {f.title.map((l, i) => <span className="wk-ln" key={l} aria-hidden="true"><span style={{ '--d': `${0.1 + i * 0.1}s` }}>{l}</span></span>)}
          </h2>
          <p className="wk-lead wk-e" style={{ '--d': '.32s' }}>{f.text}</p>
          <a className="wk-btn is-lg wk-e" style={{ '--d': '.42s' }} href={f.cta.href}>{f.cta.label}<span className="wk-btn-ic"><ArrowUR /></span></a>
        </div>
        <img className="wk-editor wk-e wk-e--editor" style={{ '--d': '.5s' }} src={f.editor} alt="" aria-hidden="true" loading="lazy" />
      </div>

      <div className="wk-wrap wk-foot">
        <div className="wk-foot-brand wk-e" style={{ '--d': '.6s' }}>
          <a href="/" className="wk-foot-logo" aria-label="Tezco home"><Logo size={34} /><Wordmark height={18} /></a>
          <p>{f.blurb[0]}{' '}<br />{f.blurb[1]}</p>
          <div className="wk-social">
            <a href={company.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"><WhatsApp width={18} height={18} /></a>
            <a href={`mailto:${company.email}`} aria-label="Email"><Mail width={18} height={18} /></a>
            <a href={company.phoneHref} aria-label="Phone"><Phone width={18} height={18} /></a>
          </div>
        </div>
        {f.columns.map((col, i) => (
          <nav className="wk-foot-col wk-e" style={{ '--d': `${0.66 + i * 0.06}s` }} key={col.title} aria-label={col.title}>
            <h2 className="wk-foot-h">{col.title}</h2>
            <ul>{col.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
        ))}
        <form className="wk-chat wk-e" style={{ '--d': '.86s' }} onSubmit={send}>
          <label htmlFor="wk-idea">{f.chat.title}</label>
          <div className="wk-field">
            <input id="wk-idea" type="text" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder={f.chat.placeholder} autoComplete="off" />
            <button type="submit" className="wk-key" aria-label="Send on WhatsApp"><ArrowUR /></button>
          </div>
          <small>{f.chat.note}</small>
        </form>
      </div>

      <div className="wk-sign">
        <p className="wk-sign-text">
          <span>©{new Date().getFullYear()}</span><span>{f.sign[0]}</span><span>{f.sign[1]}</span>
        </p>
        <p className="wk-legal">{company.legalName} · CIN {company.cin} · <a href="/privacy/">Privacy</a> · <a href="/terms/">Terms</a></p>
        <span className="wk-word" aria-hidden="true"><img src={brand.wordmarkLarge.orange} width="2699" height="459" alt="" loading="lazy" decoding="async" /></span>
      </div>
    </footer>
  );
}

export default function WorkPage() {
  return (
    <div className="wk">
      <PortfolioHero />
      <div className="wk-paper">
        <ProjectIndex />
        {portfolio.caseStudies.map((cs) => <CaseStudy cs={cs} key={cs.slug} />)}
      </div>
      <Marquee />
      <Finale />
    </div>
  );
}
