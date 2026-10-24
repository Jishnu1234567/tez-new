import { aboutPage, contactImages } from '../data/pages.js';
import AboutHero from '../components/AboutHero.jsx';
import WhyTezco from '../components/WhyTezco.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ContactSection from '../components/ContactSection.jsx';
import { PaperHead, Eyebrow, FillTitle, useInView, useParallax } from '../components/Paper.jsx';

function Story() {
  const s = aboutPage.story;
  const [ref, on] = useInView(0.1);
  const plx = useParallax(10);
  return (
    <section className={`pp-sec pg-story${on ? ' pp-on' : ''}`} ref={ref} aria-labelledby="pg-story-title">
      <div className="pg-story-text">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <FillTitle lines={s.title} id="pg-story-title" />
        {s.paras.map((t, i) => <p className="pg-lead pp-a" style={{ '--d': `${0.1 + i * 0.08}s` }} key={i}>{t}</p>)}
        <dl className="pg-facts pp-a" style={{ '--d': '.25s' }}>
          {aboutPage.facts.map((f) => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}
        </dl>
      </div>
      <div className="pg-story-media pp-a" style={{ '--d': '.1s' }}>
        <div className="pp-plx" ref={plx} aria-hidden="true"><img src={s.image} alt="" loading="lazy" /></div>
      </div>
    </section>
  );
}

function Values() {
  const v = aboutPage.values;
  const [ref, on] = useInView(0.1);
  return (
    <section className="pp-sec" aria-labelledby="pg-values-title">
      <PaperHead eyebrow={v.eyebrow} title={v.title} id="pg-values-title" />
      <ol className={`pg-values${on ? ' pp-on' : ''}`} ref={ref}>
        {v.items.map((x, i) => (
          <li className={`pp-card pp-a${i === 0 ? ' is-orange' : ''}`} style={{ '--d': `${i * 0.07}s` }} key={x.title}>
            <span className="pp-proc-n">{String(i + 1).padStart(2, '0')}</span>
            <strong>{x.title}</strong>
            <p>{x.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <div className="pp">
        <Story />
        <WhyTezco />
        <Values />
        <Testimonials />
        <ContactSection image={contactImages.about} />
      </div>
    </>
  );
}
