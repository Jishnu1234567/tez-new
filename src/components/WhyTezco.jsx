import { why } from '../data/content.js';
import { PaperHead, ArrowUpRight, useInView, CountUp } from './Paper.jsx';

// Why Tezco: a bento of proof cards (one large dark promise card plus stat
// cards in Tezco tones), then a black strip with the core values.
export default function WhyTezco() {
  const [ref, on] = useInView(0.08);
  const f = why.feature;
  return (
    <section id="why-tezco" className="pp-sec" aria-labelledby="pp-why-title">
      <PaperHead eyebrow={why.eyebrow} title={why.title} text={why.text} id="pp-why-title" link={{ label: 'About Tezco', href: '/about/' }} />

      <div className={`pp-bento${on ? ' pp-on' : ''}`} ref={ref}>
        <article className="pp-card is-black pp-feature pp-a">
          <span className="pp-kicker">{f.kicker}</span>
          <h3>{f.title}</h3>
          <p>{f.text}</p>
          <a className="pp-btn is-accent" href={f.cta.href}>{f.cta.label}<span className="pp-btn-ic"><ArrowUpRight /></span></a>
        </article>
        {why.stats.map((s, i) => {
          const last = i === why.stats.length - 1;
          return (
            <article className={`pp-card pp-stat is-${s.tone}${last ? ' pp-wide' : ''} pp-a`} style={{ '--d': `${(i + 1) * 0.07}s` }} key={s.big}>
              <div>
                <strong><CountUp value={s.big} /></strong>
                <p>{s.label}</p>
              </div>
              {/* The closing full-width card also carries the core values. */}
              {last && (
                <ul className="pp-values" aria-label="Our core values">
                  {why.values.map((v) => <li key={v}>{v}</li>)}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
