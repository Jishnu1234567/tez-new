import { notFound } from '../data/legal.js';
import { company } from '../data/content.js';
import './Legal.css';

// 404: on-brand dead end with clear ways back into the site.
export default function NotFoundPage() {
  const n = notFound;
  return (
    <section className="nf" aria-labelledby="nf-title">
      <span className="nf-code" aria-hidden="true">{n.code}</span>
      <div className="nf-in">
        <span className="nf-tag">Error {n.code}</span>
        <h1 id="nf-title">{n.title}</h1>
        <p>{n.text}</p>
        <div className="nf-acts">
          <a className="nf-btn is-primary" href="/">Back to home</a>
          <a className="nf-btn" href={company.whatsapp} target="_blank" rel="noreferrer">Ask us on WhatsApp</a>
        </div>
        <nav className="nf-links" aria-label="Popular pages">
          {n.links.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
        </nav>
      </div>
    </section>
  );
}
