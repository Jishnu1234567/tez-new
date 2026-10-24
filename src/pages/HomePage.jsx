import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Marquee from '../components/Marquee.jsx';
import Services from '../components/Services.jsx';
import Work from '../components/Work.jsx';
import WhyTezco from '../components/WhyTezco.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ContactSection from '../components/ContactSection.jsx';
import { aboutFirst } from '../heroVariant.js';

// Home: video hero, BUILD / WHAT COUNTS, then one cream panel with a short
// version of every section. Each section links to its own page.
export default function HomePage() {
  return (
    <>
      {aboutFirst ? <><About /><Hero /></> : <><Hero /><About /></>}
      <div className="pp">
        <Marquee />
        <Services />
        <Work />
        <WhyTezco />
        <Testimonials />
        <ContactSection />
      </div>
    </>
  );
}
