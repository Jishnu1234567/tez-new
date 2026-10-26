import { useRef, useState } from 'react';
import { company } from '../data/content.js';
import { contactPage } from '../data/pages.js';
import { PaperHead, ArrowUpRight } from './Paper.jsx';

// Project brief form. Submissions are sent to Tezco's inbox through Web3Forms
// (https://web3forms.com): no server to run, works on any static host.
// The access key comes from VITE_WEB3FORMS_KEY at build time (see .env.example).
// If no key is set, or the service cannot be reached, the visitor is offered the same
// message by email or WhatsApp instead, so an enquiry is never lost.

const ENDPOINT = 'https://api.web3forms.com/submit';
const KEY = import.meta.env.VITE_WEB3FORMS_KEY || '';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const EMPTY = { name: '', email: '', phone: '', type: '', budget: '', message: '', consent: false, botcheck: '' };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (v.phone && !/^[+\d][\d\s()-]{6,}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number, or leave it blank.';
  if (!v.type) e.type = 'Please choose what you are building.';
  if (v.message.trim().length < 15) e.message = 'Please add a little more detail (at least 15 characters).';
  if (!v.consent) e.consent = 'Please agree so we can reply to you.';
  return e;
}

export default function ProjectForm() {
  const f = contactPage.form;
  const [v, setV] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const set = (k) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setV((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const summary = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone || '-'}\nProject: ${v.type}\nBudget: ${v.budget || '-'}\n\n${v.message}`;
  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Project enquiry: ${v.type || 'New project'}`)}&body=${encodeURIComponent(`Hi Tezco,\n\n${summary}`)}`;
  const wa = `${company.whatsappBase}?text=${encodeURIComponent(`Hi Tezco,\n\n${summary}`)}`;

  const focusFirstError = (e) => {
    const first = Object.keys(e)[0];
    const el = formRef.current?.querySelector(first === 'type' ? '[name="type"]' : `[name="${first}"]`);
    if (el) el.focus();
  };

  const submit = async (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) { focusFirstError(e); return; }
    if (v.botcheck) { setStatus('sent'); return; } // spam bots fill the hidden field
    if (!KEY) { setStatus('failed'); statusRef.current?.focus(); return; }

    setStatus('sending');
    try {
      // Plain form data: a "simple" request, so no CORS pre-flight is needed.
      const body = new FormData();
      Object.entries({
        access_key: KEY,
        subject: `New project enquiry: ${v.type} (${v.name})`,
        from_name: 'Tezco website',
        replyto: v.email,
        name: v.name,
        email: v.email,
        phone: v.phone || 'Not given',
        project: v.type,
        budget: v.budget || 'Not given',
        message: v.message,
        page: typeof window !== 'undefined' ? window.location.href : '',
      }).forEach(([k, val]) => body.append(k, val));
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error(data.message || `HTTP ${res.status}`);
      setStatus('sent');
      setV(EMPTY);
    } catch {
      setStatus('failed');
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const err = (k) => errors[k] && <span className="pg-err" id={`pf-${k}-err`}>{errors[k]}</span>;
  const aria = (k) => (errors[k] ? { 'aria-invalid': true, 'aria-describedby': `pf-${k}-err` } : {});

  return (
    <section className="pp-sec pg-brief" aria-labelledby="pg-brief-title">
      <PaperHead eyebrow={f.eyebrow} title={f.title} text={f.text} id="pg-brief-title" />

      {status === 'sent' ? (
        <div className="pg-form pg-form-done" role="status" tabIndex={-1} ref={statusRef}>
          <span className="pg-done-ic" aria-hidden="true">✓</span>
          <h3>Thanks, your brief is with us.</h3>
          <p>We usually reply within a day ({company.hours}). If it is urgent, message us on <a href={company.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>.</p>
          <button type="button" className="pp-btn is-dark" onClick={() => setStatus('idle')}>Send another brief<span className="pp-btn-ic"><ArrowUpRight /></span></button>
        </div>
      ) : (
        <form className="pg-form" ref={formRef} onSubmit={submit} noValidate>
          <label>
            <span>Your name *</span>
            <input name="name" required value={v.name} onChange={set('name')} autoComplete="name" maxLength={80} {...aria('name')} />
            {err('name')}
          </label>
          <label>
            <span>Email *</span>
            <input name="email" type="email" required value={v.email} onChange={set('email')} autoComplete="email" inputMode="email" maxLength={120} {...aria('email')} />
            {err('email')}
          </label>
          <label>
            <span>Phone or WhatsApp</span>
            <input name="phone" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" maxLength={20} placeholder="Optional" {...aria('phone')} />
            {err('phone')}
          </label>
          <label>
            <span>Budget</span>
            <select name="budget" value={v.budget} onChange={set('budget')}>
              <option value="">Not sure yet</option>
              {f.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </label>

          <fieldset className="pg-types" {...(errors.type ? { 'aria-describedby': 'pf-type-err' } : {})}>
            <legend>What are you building? *</legend>
            {f.types.map((t) => (
              <label key={t} className={v.type === t ? 'is-on' : ''}>
                <input type="radio" name="type" value={t} checked={v.type === t} onChange={set('type')} />{t}
              </label>
            ))}
            {err('type')}
          </fieldset>

          <label className="is-full">
            <span>Tell us about the project *</span>
            <textarea name="message" rows={5} value={v.message} onChange={set('message')} maxLength={3000} placeholder="Goals, users, must-have features, timeline..." {...aria('message')} />
            {err('message')}
          </label>

          {/* Honeypot: hidden from people, filled in by bots. */}
          <input type="text" name="botcheck" className="pg-hp" tabIndex={-1} autoComplete="off" value={v.botcheck} onChange={set('botcheck')} aria-hidden="true" />

          <label className="pg-consent is-full">
            <input type="checkbox" name="consent" checked={v.consent} onChange={set('consent')} {...aria('consent')} />
            <span>I agree that Tezco can use these details to reply to my enquiry, as described in the <a href="/privacy/">Privacy Policy</a>.</span>
          </label>
          {err('consent')}

          {status === 'failed' && (
            <div className="pg-form-alert is-full" role="alert" tabIndex={-1} ref={statusRef}>
              <strong>We could not send the form just now.</strong>
              <p>Your details are still here. Send the same message another way and we will reply as usual:</p>
              <div className="pg-form-acts">
                <a className="pp-btn is-dark" href={mailto}>Send by email<span className="pp-btn-ic"><ArrowUpRight /></span></a>
                <a className="pp-btn is-accent" href={wa} target="_blank" rel="noreferrer">Send on WhatsApp<span className="pp-btn-ic"><ArrowUpRight /></span></a>
              </div>
            </div>
          )}

          <div className="pg-form-acts">
            <button className="pp-btn is-accent" type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send project brief'}
              <span className="pp-btn-ic">{status === 'sending' ? <i className="pg-spin" aria-hidden="true" /> : <ArrowUpRight />}</span>
            </button>
            <p className="pg-form-note">We reply within a day. No spam, ever.</p>
          </div>
        </form>
      )}
    </section>
  );
}
