import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { useReveal } from './components/useReveal.js';
import HomePage from './pages/HomePage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ProcessPage from './pages/ProcessPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import LegalPage from './pages/LegalPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { privacy, terms } from './data/legal.js';
import { applyHtmlClasses } from './pageTheme.js';
import './pages/Pages.css';
import './pages/Mobile.css';

// Each HTML entry (index.html, services/index.html, ...) sets data-page on #root.
const PAGES = {
  home: HomePage,
  services: ServicesPage,
  work: WorkPage,
  process: ProcessPage,
  about: AboutPage,
  contact: ContactPage,
  privacy: () => <LegalPage doc={privacy} />,
  terms: () => <LegalPage doc={terms} />,
  notfound: NotFoundPage,
};

export default function App({ page = 'home' }) {
  useReveal();
  const Page = PAGES[page] || NotFoundPage;
  // Page classes on <html> drive the navbar theme and each page's mobile layout.
  applyHtmlClasses(page);
  return (
    <>
      <Navbar page={page} />
      <main id="main">
        <Page />
      </main>
      {/* The Portfolio page closes with its own CTA + footer. */}
      {page !== 'work' && <Footer />}
    </>
  );
}
