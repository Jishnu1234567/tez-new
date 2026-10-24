import { testimonials } from '../data/content.js';
import { PaperHead, useInView } from './Paper.jsx';

const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
const TONES = ['white', 'orange', 'white', 'peach'];

const QuoteMark = () => (
  <svg viewBox="0 0 32 24" width="30" height="22" aria-hidden="true">
    <path fill="currentColor" d="M0 24V14C0 6 4 1.5 12 0l1.5 3C9 4.5 7 7 6.8 11H13v13zm19 0V14c0-8 4-12.5 12-14l1 3c-4.5 1.5-6.5 4-6.7 8H32v13z" />
  </svg>
);

// Client words: one large black quote card, then a scrolling row of smaller cards.
// Renders nothing until real quotes are added in content.js (testimonials.items).
export default function Testimonials() {
  const [ref, on] = useInView(0.08);
  const items = testimonials.items;
  if (!items.length) return null;
  const [lead, ...rest] = items;
  const row = rest.length >= 3 ? [...rest, ...rest] : rest; // doubled for a seamless loop

  return (
    <section id="testimonials" className="pp-sec" aria-labelledby="pp-t-title">
      <PaperHead eyebrow={testimonials.eyebrow} title={testimonials.title} text={testimonials.text} id="pp-t-title" />
      <div className={`pp-quotes${on ? ' pp-on' : ''}`} ref={ref}>
        <figure className="pp-lead pp-a">
          <span className="pp-qm"><QuoteMark /></span>
          <blockquote>“{lead.quote}”</blockquote>
          <figcaption>
            {lead.stat && <span className="pp-pill is-accent">{lead.stat}</span>}
            <span className="pp-who"><span className="pp-av">{initials(lead.name)}</span><span><strong>{lead.name}</strong><small>{lead.role}</small></span></span>
          </figcaption>
        </figure>
        {rest.length > 0 && (
          <div className={`pp-qrow pp-a${rest.length >= 3 ? ' is-loop' : ''}`} style={{ '--d': '.15s' }}>
            <ul>
              {row.map((t, i) => (
                <li className={`pp-q is-${TONES[i % TONES.length]}`} key={i} aria-hidden={i >= rest.length || undefined}>
                  <span className="pp-qm"><QuoteMark /></span>
                  <p>“{t.quote}”</p>
                  <span className="pp-who"><span className="pp-av">{initials(t.name)}</span><span><strong>{t.name}</strong><small>{t.role}</small></span></span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
