import { useState } from 'react';
import { faq } from '../data/pages.js';
import { PaperHead, ArrowUpRight, useInView } from './Paper.jsx';

// Two-column FAQ: heading and a WhatsApp button on the left, an accordion on the right.
export default function Faq({ whatsapp }) {
  const [open, setOpen] = useState(0);
  const [ref, on] = useInView(0.08);
  return (
    <section id="faq" className="pp-sec pp-faq" aria-labelledby="pp-faq-title">
      <div className="pp-faq-side">
        <PaperHead eyebrow={faq.eyebrow} title={faq.title} id="pp-faq-title" />
        <p className="pp-head-text">{faq.text}</p>
        {whatsapp && <a className="pp-btn is-dark" href={whatsapp} target="_blank" rel="noreferrer">Ask on WhatsApp<span className="pp-btn-ic"><ArrowUpRight /></span></a>}
      </div>
      <ul className={`pp-acc${on ? ' pp-on' : ''}`} ref={ref}>
        {faq.items.map((f, i) => {
          const isOpen = open === i;
          return (
            <li className={`pp-acc-item pp-a${isOpen ? ' is-open' : ''}`} style={{ '--d': `${i * 0.06}s` }} key={f.q}>
              <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </button>
              <div className="pp-acc-a" id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div><p>{f.a}</p></div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
