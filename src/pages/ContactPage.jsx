import { useState } from 'react';
import { company } from '../data/content.js';
import { contactPage } from '../data/pages.js';
import ContactHero from '../components/ContactHero.jsx';
import Faq from '../components/Faq.jsx';
import { PaperHead, ArrowUpRight, useInView } from '../components/Paper.jsx';
import { Phone, Mail, WhatsApp } from '../components/Icons.jsx';

const ICONS = { whatsapp: WhatsApp, phone: Phone, mail: Mail };

function Methods() {
  const [ref, on] = useInView(0.1);
  return (
    <ul className={`pg-methods${on ? ' pp-on' : ''}`} ref={ref}>
      {contactPage.methods.map((m, i) => {
        const Icon = ICONS[m.kind];
        return (
          <li className="pp-a" style={{ '--d': `${i * 0.08}s` }} key={m.kind}>
            <a className={`pp-card pg-method${i === 0 ? ' is-orange' : ''}`} href={m.href} {...(/^https?:/.test(m.href) ? { target: '_blank', rel: 'noreferrer' } : {})}>
              <span className="pg-method-ic"><Icon width={22} height={22} /></span>
              <span className="pg-method-label">{m.label}</span>
              <strong>{m.value}</strong>
              <span className="pg-method-note">{m.note}</span>
              <span className="pp-circle" aria-hidden="true"><ArrowUpRight /></span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

// Brief form: no backend, it composes an email or WhatsApp message with the details.
function Brief() {
  const f = contactPage.form;
  const [v, setV] = useState({ name: '', email: '', type: f.types[0], message: '' });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  const body = `Hi Tezco,\n\nName: ${v.name}\nEmail: ${v.email}\nProject: ${v.type}\n\n${v.message}`;
  const sendEmail = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry: ${v.type}`)}&body=${encodeURIComponent(body)}`;
  };
  const wa = `${company.whatsappBase}?text=${encodeURIComponent(body)}`;
  return (
    <section className="pp-sec pg-brief" aria-labelledby="pg-brief-title">
      <PaperHead eyebrow={f.eyebrow} title={f.title} text={f.text} id="pg-brief-title" />
      <form className="pg-form" onSubmit={sendEmail}>
        <label><span>Your name</span><input required value={v.name} onChange={set('name')} autoComplete="name" /></label>
        <label><span>Email</span><input required type="email" value={v.email} onChange={set('email')} autoComplete="email" /></label>
        <fieldset className="pg-types">
          <legend>What are you building?</legend>
          {f.types.map((t) => (
            <label key={t} className={v.type === t ? 'is-on' : ''}>
              <input type="radio" name="type" value={t} checked={v.type === t} onChange={set('type')} />{t}
            </label>
          ))}
        </fieldset>
        <label className="is-full"><span>Tell us about the project</span><textarea rows={5} value={v.message} onChange={set('message')} placeholder="Goals, users, must-have features, timeline..." /></label>
        <div className="pg-form-acts">
          <button className="pp-btn is-accent" type="submit">Send by email<span className="pp-btn-ic"><ArrowUpRight /></span></button>
          <a className="pp-btn is-dark" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp<span className="pp-btn-ic"><ArrowUpRight /></span></a>
        </div>
      </form>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="pp">
        <section className="pp-sec" aria-label="Ways to reach us"><Methods /></section>
        <Brief />
        <Faq whatsapp={company.whatsapp} />
      </div>
    </>
  );
}
