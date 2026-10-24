import { useRef } from 'react';
import { cta } from '../data/content.js';
import { Eyebrow, FillTitle, ArrowUpRight, useInView, useParallax } from './Paper.jsx';
import { Phone, Mail } from './Icons.jsx';

// Contact: a large rounded image panel with the headline, three pill buttons
// (WhatsApp, phone, email) and a footer line with hours and availability.
// The photo drifts slowly, follows scroll with a parallax, and an orange glow
// follows the pointer across the panel.
export default function ContactSection({ image = cta.image, imageSm = image === cta.image ? cta.imageSm : undefined }) {
  const [ref, on] = useInView(0.15);
  const plx = useParallax(12);
  const raf = useRef(0);
  const onMove = (e) => {
    const el = e.currentTarget;
    const { clientX, clientY } = e;
    if (raf.current) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - r.left}px`);
      el.style.setProperty('--my', `${clientY - r.top}px`);
    });
  };
  return (
    <section id="contact" className="pp-sec pp-contact-sec" aria-labelledby="pp-contact-title">
      <div className={`pp-contact${on ? ' pp-on' : ''}`} ref={ref} onPointerMove={onMove}>
        <div className="pp-plx" ref={plx} aria-hidden="true">
          <picture>
            {imageSm && <source media="(max-width: 700px)" srcSet={imageSm} />}
            <img className="pp-contact-img" src={image} alt="" loading="lazy" />
          </picture>
        </div>
        <span className="pp-contact-shade" aria-hidden="true" />
        <span className="pp-contact-glow" aria-hidden="true" />
        <span className="pp-contact-grain" aria-hidden="true" />
        <div className="pp-contact-in">
          <Eyebrow light>{cta.eyebrow}</Eyebrow>
          <FillTitle lines={cta.title} id="pp-contact-title" light className="pp-fill--contact" />
          <p className="pp-contact-text pp-a" style={{ '--d': '.1s' }}>{cta.text}</p>
          <div className="pp-contact-acts pp-a" style={{ '--d': '.2s' }}>
            <a className="pp-btn is-accent is-caps" href={cta.whatsapp.href} target="_blank" rel="noreferrer">
              {cta.whatsapp.label}<span className="pp-btn-ic"><ArrowUpRight /></span>
            </a>
            <a className="pp-btn is-glass" href={cta.phone.href}><Phone width={16} height={16} />{cta.phone.label}</a>
            <a className="pp-btn is-glass" href={cta.email.href}><Mail width={16} height={16} />{cta.email.label}</a>
          </div>
          <div className="pp-contact-foot pp-a" style={{ '--d': '.3s' }}>
            <span>{cta.footLeft}</span>
            <span><i className="pp-pulse" aria-hidden="true" />{cta.footRight}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
