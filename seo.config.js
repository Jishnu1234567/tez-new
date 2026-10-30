// Single source of truth for every page's <head>: title, description, canonical URL,
// social cards, fonts, the hero image to preload and structured data (JSON-LD).
// Used by the Vite plugin in vite.config.js and by scripts/prerender.mjs
// (sitemap.xml, robots.txt, llms.txt).
import { company, services } from './src/data/content.js';
import { faq, caseStudies } from './src/data/pages.js';
import { FONT_FACES, FONT_PRELOAD } from './src/fonts.generated.js';

// Production address of the site. Override at build time with SITE_URL=https://... if it changes.
export const SITE = (process.env.SITE_URL || 'https://thetezco.com').replace(/\/$/, '');
export const OG_IMAGE = '/og-image.jpg';

// Fonts are self-hosted (scripts/fetch-fonts.mjs). Each page lists the families it uses;
// their @font-face rules are inlined in <head> and the main ones preloaded.
const fonts = (...extra) => ['interTight', 'instrumentSerif', ...extra];

export const pages = {
  home: {
    path: '/',
    title: 'Tezco | SaaS, Web, Mobile App & AI Development Company in Kerala',
    description: 'Tezco builds SaaS platforms, websites, mobile apps and AI solutions in Kochi, Kerala. Fixed price, weekly progress and 30 days of free support.',
    fonts: fonts('archivo'),
    preload: '/video/hero-white-poster.webp',
    name: 'Home',
  },
  services: {
    path: '/services/',
    title: 'Services | SaaS, Web, Mobile, AI & Automation Development | Tezco',
    description: 'SaaS development, websites, iOS and Android apps, AI chatbots and workflow automation, designed and built by one team at a fixed price. College projects from ₹2,999.',
    fonts: fonts(),
    preload: '/video/services-white-poster.webp',
    name: 'Services',
    faq: true,
  },
  work: {
    path: '/work/',
    title: 'Portfolio | Websites and Apps Built by Tezco',
    description: 'Real products designed, built and launched by Tezco, including the Element Sound Studio website. See the brief, what we built and the live result.',
    fonts: fonts('instrumentSans', 'googleSansFlex'),
    preload: '/video/process-cliff-poster.webp',
    name: 'Portfolio',
  },
  process: {
    path: '/process/',
    title: 'Our Process | Fixed-Price Software Development in 4 Steps | Tezco',
    description: 'From a free 30-minute discovery call to launch day: a fixed-price proposal, weekly sprints with visible progress, and 30 days of free support after go-live.',
    fonts: fonts('outfit', 'inter'),
    preload: '/video/process-head-poster.webp',
    name: 'Process',
    faq: true,
  },
  about: {
    path: '/about/',
    title: 'About Tezco | Software Engineering Company in Aluva, Kochi',
    description: 'Tezco is a software engineering company in Aluva, Kochi, building SaaS, web, mobile and AI products for growing businesses at a fixed price.',
    fonts: fonts('anton', 'robotoCondensed', 'bigShoulders'),
    preload: '/images/work/element/home.webp',
    name: 'About',
  },
  contact: {
    path: '/contact/',
    title: 'Contact Tezco | Book a Free 30-Minute Discovery Call',
    description: `Book a free 30-minute discovery call with Tezco on WhatsApp, phone or email (${company.email}). We usually reply within a day.`,
    fonts: fonts('inter'),
    preload: '/images/stock/contact-boardroom.webp',
    preloadSm: '/images/stock/contact-boardroom-sm.webp',
    name: 'Contact',
    faq: true,
  },
  privacy: {
    path: '/privacy/',
    title: 'Privacy Policy | Tezco Software Development, Kochi',
    description: 'How Tezco collects, uses and protects personal data, and your rights under the Digital Personal Data Protection Act, 2023.',
    fonts: fonts(),
    name: 'Privacy Policy',
  },
  terms: {
    path: '/terms/',
    title: 'Terms of Service | Tezco Software Development, Kochi',
    description: 'The terms that apply to using the Tezco website and making an enquiry about a project.',
    fonts: fonts(),
    name: 'Terms of Service',
  },
  notfound: {
    path: '/404.html',
    title: 'Page not found | Tezco',
    description: 'The page you are looking for has moved or no longer exists.',
    fonts: fonts(),
    noindex: true,
    name: 'Page not found',
  },
};

// ---- Structured data ----
const ORG_ID = `${SITE}/#organization`;
const SITE_ID = `${SITE}/#website`;

const organization = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: 'Tezco',
  legalName: company.legalName,
  alternateName: ['Tezco Solutions', 'Technical Expertz'],
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png`, width: 512, height: 512 },
  image: `${SITE}${OG_IMAGE}`,
  description: 'Software engineering company building SaaS platforms, websites, mobile apps, AI solutions and workflow automation at a fixed price, with weekly progress and 30 days of free support.',
  email: company.email,
  telephone: company.phone.replace(/\s/g, ''),
  foundingDate: company.founded,
  identifier: { '@type': 'PropertyValue', propertyID: 'CIN', value: company.cin },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Building No. 23/93-1, Thynothil Road',
    addressLocality: 'Aluva',
    addressRegion: 'Kerala',
    postalCode: '683101',
    addressCountry: 'IN',
  },
  areaServed: [{ '@type': 'Country', name: 'India' }, { '@type': 'Place', name: 'Worldwide' }],
  openingHoursSpecification: [{
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '10:00', closes: '19:00',
  }],
  contactPoint: [{
    '@type': 'ContactPoint', contactType: 'sales', telephone: company.phone.replace(/\s/g, ''), email: company.email,
    availableLanguage: ['English'], areaServed: 'IN',
  }],
  knowsAbout: ['SaaS development', 'Web development', 'Mobile app development', 'Flutter', 'React', 'Next.js', 'Artificial intelligence', 'LLM chatbots', 'Workflow automation', 'Final year college projects'],
  priceRange: '₹₹',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software development services',
    itemListElement: services.items.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, description: s.text, url: `${SITE}/services/#${s.slug}` },
    })),
  },
};

const website = {
  '@type': 'WebSite', '@id': SITE_ID, url: `${SITE}/`, name: 'Tezco', inLanguage: 'en-IN', publisher: { '@id': ORG_ID },
};

const breadcrumb = (p) => ({
  '@type': 'BreadcrumbList',
  '@id': `${SITE}${p.path}#breadcrumb`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
    ...(p.path === '/' ? [] : [{ '@type': 'ListItem', position: 2, name: p.name, item: `${SITE}${p.path}` }]),
  ],
});

const PAGE_TYPE = { about: 'AboutPage', contact: 'ContactPage', work: 'CollectionPage' };

export function jsonLd(key) {
  const p = pages[key];
  const url = `${SITE}${p.path}`;
  const graph = [organization, website];
  if (p.noindex) return { '@context': 'https://schema.org', '@graph': graph };
  graph.push({
    '@type': PAGE_TYPE[key] || 'WebPage',
    '@id': `${url}#webpage`,
    url, name: p.title, description: p.description, inLanguage: 'en-IN',
    isPartOf: { '@id': SITE_ID }, about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE}${OG_IMAGE}` },
    breadcrumb: { '@id': `${url}#breadcrumb` },
  });
  graph.push(breadcrumb(p));

  if (key === 'services') {
    graph.push({
      '@type': 'ItemList', name: 'Tezco services',
      itemListElement: services.items.map((s, i) => ({
        '@type': 'ListItem', position: i + 1,
        item: { '@type': 'Service', name: s.title, description: s.text, serviceType: s.title, provider: { '@id': ORG_ID }, areaServed: 'IN', url: `${SITE}/services/#${s.slug}` },
      })),
    });
  }
  if (key === 'process') {
    graph.push({
      '@type': 'HowTo', name: 'How Tezco delivers a software project',
      description: 'Four steps from a free discovery call to launch, at a fixed price with weekly progress.',
      step: services.process.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: `${s.text} (${s.note})` })),
    });
  }
  if (key === 'work') {
    graph.push(...Object.entries(caseStudies).map(([name, c]) => ({
      '@type': 'WebSite', name: `${name} website`, about: c.industry, dateCreated: c.year,
      description: c.overview, creator: { '@id': ORG_ID }, url: c.url,
    })));
  }
  if (p.faq) {
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: faq.items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function headHtml(key) {
  const p = pages[key];
  const url = `${SITE}${p.path}`;
  const img = `${SITE}${OG_IMAGE}`;
  return [
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />',
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<meta name="robots" content="${p.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'}" />`,
    p.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    '<meta name="theme-color" content="#0b0b0b" />',
    '<meta name="color-scheme" content="light" />',
    '<meta name="author" content="Tezco" />',
    '<meta name="format-detection" content="telephone=no" />',
    '<meta name="geo.region" content="IN-KL" />',
    '<meta name="geo.placename" content="Aluva, Ernakulam, Kerala" />',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />',
    '<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="Tezco" />',
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Tezco: software, web, mobile and AI development" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    // Body font and the page's display font start downloading straight away.
    ...p.fonts.slice(0, 1).concat(p.fonts.length > 2 ? [p.fonts[2]] : [])
      .map((f) => `<link rel="preload" as="font" type="font/woff2" href="${FONT_PRELOAD[f]}" crossorigin />`),
    p.preload && p.preloadSm ? `<link rel="preload" as="image" href="${p.preloadSm}" media="(max-width: 760px)" fetchpriority="high" />` : '',
    p.preload ? `<link rel="preload" as="image" href="${p.preload}"${p.preloadSm ? ' media="(min-width: 761px)"' : ''} fetchpriority="high" />` : '',
    `<style>${p.fonts.map((f) => FONT_FACES[f]).join('\n')}</style>`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd(key)).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('\n    ');
}
