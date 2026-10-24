import { useEffect, useRef } from 'react';
import { services, company } from '../data/content.js';
import { processDetails, contactImages } from '../data/pages.js';
import ProcessHero from '../components/ProcessHero.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Faq from '../components/Faq.jsx';
import { PaperHead, useInView, useParallax } from '../components/Paper.jsx';

function Step({ s, d, i }) {
  const [ref, on] = useInView(0.15);
  const plx = useParallax(8);
  return (
    <li className={`pg-step${on ? ' pp-on' : ''}`} ref={ref}>
      <div className="pg-step-n" aria-hidden="true">{s.n}</div>
      <div className="pg-step-body">
        <span className="pp-pill pp-a">{s.note}</span>
        <h2 className="pp-a" style={{ '--d': '.05s' }}>{s.name}</h2>
        <p className="pg-lead pp-a" style={{ '--d': '.1s' }}>{d.happens}</p>
        <h3 className="pg-mini pp-a" style={{ '--d': '.15s' }}>You get</h3>
        <ul className="pg-checks pp-a" style={{ '--d': '.2s' }}>{d.get.map((g) => <li key={g}>{g}</li>)}</ul>
      </div>
      <div className="pg-step-media pp-a" style={{ '--d': `${0.1 + i * 0.02}s` }}>
        <div className="pp-plx" ref={plx} aria-hidden="true"><img src={d.image} alt="" loading="lazy" /></div>
      </div>
    </li>
  );
}

export default function ProcessPage() {
  const p = services.process;
  // Timeline progress (used by the phone layout): --tl goes 0 -> 1 as the steps scroll past.
  const list = useRef(null);
  useEffect(() => {
    const el = list.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const t = (window.innerHeight * 0.6 - r.top) / r.height;
      el.style.setProperty('--tl', Math.min(1, Math.max(0, t)).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <ProcessHero />
      <div className="pp">
        <section className="pp-sec">
          <PaperHead eyebrow={p.eyebrow} title={p.title} text="Fixed price, weekly progress, direct developer access and 30 days of free support after launch." />
          <ol id="steps" className="pg-steps" ref={list}>
            {p.steps.map((s, i) => <Step s={s} d={processDetails[i]} i={i} key={s.n} />)}
          </ol>
        </section>
        <Faq whatsapp={company.whatsapp} />
        <ContactSection image={contactImages.process} />
      </div>
    </>
  );
}
