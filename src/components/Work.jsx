import { work } from '../data/content.js';
import { PaperHead, ArrowUpRight, useInView } from './Paper.jsx';

// Selected work: image cards with a tag pill, arrow button, title, summary and a
// result pill. A dark card beside them notes the builds still in development.
export default function Work() {
  const [ref, on] = useInView(0.08);
  return (
    <section id="work" className="pp-sec" aria-labelledby="pp-work-title">
      <PaperHead eyebrow={work.eyebrow} title={work.title} text={work.text} id="pp-work-title" link={{ label: 'Case studies', href: '/work/' }} />

      <div className={`pp-cases${on ? ' pp-on' : ''}`} ref={ref}>
        {work.projects.map((p, i) => (
          <a className="pp-case pp-a" style={{ '--d': `${i * 0.1}s` }} href="/work/" key={p.name}>
            <img src={p.image} alt={p.alt} loading="lazy" />
            <span className="pp-case-shade" aria-hidden="true" />
            <span className="pp-tag">{p.tag}</span>
            <span className="pp-circle is-white" aria-hidden="true"><ArrowUpRight /></span>
            <span className="pp-case-body">
              <strong>{p.name}</strong>
              <span>{p.summary}</span>
              <em className="pp-pill is-accent">{p.result}</em>
            </span>
          </a>
        ))}

        <div className="pp-case pp-case--pending pp-a" style={{ '--d': '.15s' }}>
          <span className="pp-tag is-dark"><i className="pp-pulse" aria-hidden="true" />{work.pending.tag}</span>
          <span className="pp-case-body">
            <strong>{work.pending.title}</strong>
            <span>{work.pending.text}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
