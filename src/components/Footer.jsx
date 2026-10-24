import Button from './Button.jsx';
import { Logo, Wordmark, brand } from './Icons.jsx';
import { footer, company } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="brand lg" aria-label="Tezco home"><Logo size={40} /><Wordmark height={24} /></a>
            <p>{footer.tagline}</p>
            <Button href="/contact/">Get Started</Button>
          </div>
          <div className="footer-cols">
            {footer.columns.map((c) => (
              <div key={c.title}>
                <h2 className="footer-h">{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href
                        ? <a href={l.href} {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>{l.label}</a>
                        : <span>{l.label}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</span>
          <span className="footer-legal"><a href="/privacy/">Privacy Policy</a><a href="/terms/">Terms of Service</a><span>CIN {company.cin}</span></span>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true"><img src={brand.wordmarkLarge.orange} width="2699" height="459" alt="" loading="lazy" decoding="async" /></div>
    </footer>
  );
}
