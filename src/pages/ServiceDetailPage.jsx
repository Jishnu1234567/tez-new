import { company, services } from '../data/content.js';
import { serviceDetails, contactImages } from '../data/pages.js';
import { servicePages } from '../data/servicePages.js';
import { ProcessCards } from '../components/Services.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Faq from '../components/Faq.jsx';
import { PaperHead, Eyebrow, ArrowUpRight, useInView, useParallax } from '../components/Paper.jsx';

// One page per service (/services/saas-development/, ...). Same cream panels as the
// Services page: a hero with the service photo, who it is for, what is included, the
// four-step process, service-specific FAQs, the other services and the contact panel.
export default function ServiceDetailPage({ slug }) {
  const s = services.items.find((x) => x.slug === slug);
  const d = serviceDetails[slug];
  const p = servicePages[slug];
  const [heroRef, heroOn] = useInView(0.05);
  const [forRef, forOn] = useInView(0.1);
  const [incRef, incOn] = useInView(0.1);
  const [moreRef, moreOn] = useInView(0.1);
  const plx = useParallax(8);
  const others = services.items.filter((x) => x.slug !== slug);
  const wa = `${company.whatsappBase}?text=${encodeURIComponent(`Hi Tezco, I would like to discuss ${p.name.toLowerCase()}.`)}`;

  return (
    <div className="pp sd">
      <section className={`pp-sec sd-hero${heroOn ? ' pp-on' : ''}`} ref={heroRef} aria-labelledby="sd-title">
        <div className="sd-hero-body">
          <nav className="sd-crumbs pp-a" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/services/">Services</a><span aria-hidden="true">/</span><span aria-current="page">{s.title}</span>
          </nav>
          <h1 id="sd-title" className="sd-title pp-a" style={{ '--d': '.05s' }}>
            {p.h1[0]}<br /><em>{p.h1[1]}</em>
          </h1>
          <p className="pg-lead pp-a" style={{ '--d': '.1s' }}>{p.lead}</p>
          <ul className="sd-promise pp-a" style={{ '--d': '.15s' }}>
            <li>Fixed price</li><li>Weekly progress</li><li>30 days free support</li>
          </ul>
          <div className="sd-acts pp-a" style={{ '--d': '.2s' }}>
            <a className="pp-btn is-accent" href="/contact/">Book a free call<span className="pp-btn-ic"><ArrowUpRight /></span></a>
            <a className="pp-btn is-dark" href={wa} target="_blank" rel="noreferrer">Ask on WhatsApp<span className="pp-btn-ic"><ArrowUpRight /></span></a>
          </div>
        </div>
        <div className="sd-hero-media pp-a" style={{ '--d': '.1s' }}>
          <div className="pp-plx" ref={plx} aria-hidden="true"><img src={d.image} alt="" fetchpriority="high" /></div>
          {d.price && <span className="pp-pill is-accent pg-svc-price">{d.price}</span>}
        </div>
      </section>

      <section className={`pp-sec sd-about${forOn ? ' pp-on' : ''}`} ref={forRef} aria-labelledby="sd-for-title">
        <div className="sd-about-text">
          <Eyebrow>{s.title}</Eyebrow>
          <h2 id="sd-for-title" className="sd-h2 pp-a">What we do and who it is for</h2>
          {p.about.map((t, i) => <p className="pg-lead pp-a" style={{ '--d': `${0.05 + i * 0.05}s` }} key={i}>{t}</p>)}
        </div>
        <ul className="sd-for">
          {p.forWho.map((f, i) => (
            <li className={`pp-card pp-a${i === 1 ? ' is-dark' : ''}`} style={{ '--d': `${i * 0.08}s` }} key={f.t}>
              <span className="pp-proc-n">{String(i + 1).padStart(2, '0')}</span>
              <strong>{f.t}</strong>
              <p>{f.d}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={`pp-sec sd-inc${incOn ? ' pp-on' : ''}`} ref={incRef} aria-labelledby="sd-inc-title">
        <div className="sd-inc-card pp-a">
          <div>
            <Eyebrow>What's included</Eyebrow>
            <h2 id="sd-inc-title" className="sd-h2">Everything you need, one team, one price.</h2>
            <ul className="pg-checks is-big">{d.includes.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div className="sd-inc-side">
            <h3 className="pg-mini">Built with</h3>
            <div className="pg-stack">{d.stack.map((t) => <span key={t}>{t}</span>)}</div>
            <h3 className="pg-mini">Every project includes</h3>
            <ul className="pg-checks">
              <li>A free 30-minute discovery call</li>
              <li>A written scope and one fixed price</li>
              <li>Progress updates every week</li>
              <li>Deployment and 30 days of free support</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="pp-sec" aria-labelledby="sd-proc-title">
        <PaperHead eyebrow="Process" title={['From first call', 'to launch day.']} id="sd-proc-title" link={{ label: 'How we work', href: '/process/' }} />
        <ProcessCards />
      </section>

      <Faq whatsapp={wa} items={p.faqs} title={[`${s.title}:`, 'your questions.']} text={`Straight answers about ${p.name.toLowerCase()} with ${company.name}. Anything else? Message us on WhatsApp.`} />

      <section className={`pp-sec${moreOn ? ' pp-on' : ''}`} ref={moreRef} aria-labelledby="sd-more-title">
        <PaperHead eyebrow="More services" title={['Need something', 'else as well?']} id="sd-more-title" link={{ label: 'All services', href: '/services/' }} />
        <ul className="sd-more">
          {others.map((o, i) => (
            <li className="pp-a" style={{ '--d': `${i * 0.06}s` }} key={o.slug}>
              <a href={servicePages[o.slug].path}>
                <span className="sd-more-img"><img src={o.image} alt="" loading="lazy" /></span>
                <strong>{o.title}</strong>
                <span>{o.text}</span>
                <span className="pp-circle" aria-hidden="true"><ArrowUpRight /></span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <ContactSection image={contactImages.services} />
    </div>
  );
}
