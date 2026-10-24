import { useState } from 'react';
import { company } from '../data/content.js';
import { contactHero } from '../data/pages.js';
import { Logo } from './Icons.jsx';
import './ContactHero.css';

// Contact page hero: a framed card of slowly swirling orange smoke on black with a
// centred headline and a "tell us your idea" pill that opens WhatsApp, then a
// minimal two-column contact strip underneath.
export default function ContactHero() {
  const h = contactHero;
  const [idea, setIdea] = useState('');

  const send = (e) => {
    e.preventDefault();
    const text = idea.trim() ? `Hi Tezco, I would like to build: ${idea.trim()}` : 'Hi Tezco, I would like to discuss a project.';
    window.open(`${company.whatsappBase}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const address = company.address.split(', ');
  return (
    <section className="ch" aria-labelledby="ch-title">
      <div className="ch-frame">
        <div className="ch-card">
          <picture>
            <source media="(max-width: 760px)" srcSet={h.imageSm} />
            <img className="ch-plate" src={h.image} width="2000" height="1333" alt="" aria-hidden="true" fetchpriority="high" />
          </picture>
          <span className="ch-shade" aria-hidden="true" />
          <div className="ch-in">
            <nav className="ch-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact</span></nav>
            <h1 id="ch-title" className="ch-title">{h.title[0]}<em>{h.title[1]}</em></h1>
            <p className="ch-sub">{h.sub[0]}{' '}<br />{h.sub[1]}</p>
            <form className="ch-form" onSubmit={send}>
              <label className="sr-only" htmlFor="ch-idea">What would you like to build?</label>
              <input id="ch-idea" type="text" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder={h.placeholder} autoComplete="off" />
              <button type="submit">{h.button}</button>
            </form>
          </div>
        </div>
      </div>

      <div className="ch-foot">
        <div className="ch-foot-top">
          <div className="ch-foot-brand">
            <Logo size={34} />
            <p>{h.blurb}</p>
          </div>
          <address className="ch-foot-contact">
            <strong>Contact us</strong>
            <a href={company.phoneHref}>{company.phone}</a>
            <span>{address.slice(0, 2).join(', ')},<br />{address.slice(2, 4).join(', ')},<br />{address.slice(4).join(', ')}</span>
          </address>
        </div>
        <div className="ch-foot-bottom">
          <span>{company.hours}</span>
          <span className="ch-legal"><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></span>
          <span>Email us: <a href={`mailto:${company.email}`}>{company.email}</a></span>
        </div>
      </div>
    </section>
  );
}
