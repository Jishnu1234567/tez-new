import { marquee } from '../data/content.js';

const Star = () => (
  <svg className="pp-mq-star" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12 0l2.2 8.1L21.5 3.6l-4.6 7.3L24 12l-7.1 1.1 4.6 7.3-7.3-4.5L12 24l-2.2-8.1-7.3 4.5 4.6-7.3L0 12l7.1-1.1-4.6-7.3 7.3 4.5z" />
  </svg>
);

// A tilted dark strip of the tech we build with, scrolling across an orange band.
export default function Marquee() {
  const row = marquee.items.map((it) => (
    <span className="pp-mq-item" key={it.name}>
      <img src={it.logo} alt="" loading="lazy" />
      <span>{it.name}</span>
      <Star />
    </span>
  ));
  return (
    <section className="pp-mq" aria-label={`${marquee.label}: ${marquee.items.map((i) => i.name).join(', ')}`}>
      <div className="pp-mq-band" aria-hidden="true" />
      <div className="pp-mq-strip" aria-hidden="true">
        <div className="pp-mq-track">
          <div className="pp-mq-set">{row}</div>
          <div className="pp-mq-set">{row}</div>
        </div>
      </div>
    </section>
  );
}
