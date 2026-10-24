import { useEffect, useState } from 'react';
import { company } from '../data/content.js';
import { LEGAL_UPDATED } from '../data/legal.js';
import './Legal.css';

// Privacy Policy and Terms of Service: a calm cream page with a sticky table of contents
// that tracks the section in view.
export default function LegalPage({ doc }) {
  const [active, setActive] = useState(doc.sections[0].id);

  useEffect(() => {
    const els = doc.sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (seen[0]) setActive(seen[0].target.id);
    }, { rootMargin: '-20% 0px -65% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [doc]);

  return (
    <div className="legal">
      <header className="lg-head">
        <nav className="lg-crumbs" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">{doc.title}</span></nav>
        <h1>{doc.title}</h1>
        <p className="lg-intro">{doc.intro}</p>
        <p className="lg-date">Last updated: <time>{LEGAL_UPDATED}</time></p>
      </header>

      <div className="lg-body">
        <aside className="lg-toc" aria-label="On this page">
          <span className="lg-toc-title">On this page</span>
          <ol>
            {doc.sections.map((s, i) => (
              <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'is-on' : undefined}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</a></li>
            ))}
          </ol>
        </aside>

        <article className="lg-doc">
          {doc.sections.map((s, i) => (
            <section id={s.id} key={s.id} aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}><span>{String(i + 1).padStart(2, '0')}</span>{s.title}</h2>
              {s.body && s.body.map((t) => <p key={t}>{t}</p>)}
              {s.list && <ul>{s.list.map((t) => <li key={t}>{t}</li>)}</ul>}
              {s.after && s.after.map((t) => <p key={t}>{t}</p>)}
              {s.link && <p><a href={s.link.href}>{s.link.label} →</a></p>}
            </section>
          ))}
          <aside className="lg-contact">
            <strong>Questions about this page?</strong>
            <p>Write to <a href={`mailto:${company.email}`}>{company.email}</a> or call <a href={company.phoneHref}>{company.phone}</a>. {company.hours}.</p>
          </aside>
        </article>
      </div>
    </div>
  );
}
