import { company } from '../data/content.js';
import { contactPage } from '../data/pages.js';
import ContactHero from '../components/ContactHero.jsx';
import Faq from '../components/Faq.jsx';
import ProjectForm from '../components/ProjectForm.jsx';
import { ArrowUpRight, useInView } from '../components/Paper.jsx';
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

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <div className="pp">
        <section className="pp-sec" aria-label="Ways to reach us"><Methods /></section>
        <ProjectForm />
        <Faq whatsapp={company.whatsapp} />
      </div>
    </>
  );
}
