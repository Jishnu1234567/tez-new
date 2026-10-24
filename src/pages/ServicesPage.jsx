import { services } from '../data/content.js';
import { pageHeroes, serviceDetails, contactImages } from '../data/pages.js';
import GlassHero from '../components/GlassHero.jsx';
import { ProcessCards } from '../components/Services.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Faq from '../components/Faq.jsx';
import { company } from '../data/content.js';
import { PaperHead, ArrowUpRight, useInView, useParallax } from '../components/Paper.jsx';

function ServiceBlock({ s, i }) {
  const d = serviceDetails[s.slug];
  const [ref, on] = useInView(0.12);
  const plx = useParallax(8);
  return (
    <article id={s.slug} className={`pg-svc${i % 2 ? ' is-flip' : ''}${on ? ' pp-on' : ''}`} ref={ref}>
      <div className="pg-svc-media pp-a">
        <div className="pp-plx" ref={plx} aria-hidden="true"><img src={d.image} alt="" loading="lazy" /></div>
        <span className="pp-tag">{String(i + 1).padStart(2, '0')} / {String(services.items.length).padStart(2, '0')}</span>
        {d.price && <span className="pp-pill is-accent pg-svc-price">{d.price}</span>}
      </div>
      <div className="pg-svc-body">
        <h2 className="pp-a" style={{ '--d': '.05s' }}>{s.title}</h2>
        <p className="pg-lead pp-a" style={{ '--d': '.1s' }}>{d.intro}</p>
        <h3 className="pg-mini pp-a" style={{ '--d': '.15s' }}>What's included</h3>
        <ul className="pg-checks pp-a" style={{ '--d': '.2s' }}>
          {d.includes.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="pg-stack pp-a" style={{ '--d': '.25s' }}>
          {d.stack.map((t) => <span key={t}>{t}</span>)}
        </div>
        <a className="pp-btn is-accent pp-a" style={{ '--d': '.3s' }} href="/contact/">Discuss this service<span className="pp-btn-ic"><ArrowUpRight /></span></a>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  const h = pageHeroes.services;
  return (
    <>
      <GlassHero video={h.video} videoMobile={h.videoMobile} poster={h.poster} title={h.heading} text={h.sub} placeholder={h.placeholder} button={h.button} crumbs="Services" />
      <div className="pp">
        <section id="services-list" className="pp-sec" aria-labelledby="pg-svc-title">
          <PaperHead eyebrow={services.eyebrow} title={services.title} text={services.text} id="pg-svc-title" />
          <nav className="pg-jump" aria-label="Jump to a service">
            {services.items.map((s, i) => (
              <a key={s.slug} href={`#${s.slug}`}><b>{String(i + 1).padStart(2, '0')}</b>{s.title}</a>
            ))}
          </nav>
          <div className="pg-svc-list">
            {services.items.map((s, i) => <ServiceBlock s={s} i={i} key={s.slug} />)}
          </div>
        </section>
        <section className="pp-sec" aria-labelledby="pg-proc-title">
          <PaperHead eyebrow={services.process.eyebrow} title={services.process.title} id="pg-proc-title" link={{ label: 'How we work', href: '/process/' }} />
          <ProcessCards />
        </section>
        <Faq whatsapp={company.whatsapp} />
        <ContactSection image={contactImages.services} />
      </div>
    </>
  );
}
