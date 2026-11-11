// Single source of truth for every page's <head>: title, description, canonical URL,
// social cards, fonts, the hero image to preload and structured data (JSON-LD).
// Used by the Vite plugin in vite.config.js and by scripts/prerender.mjs
// (sitemap.xml, robots.txt, llms.txt).
import { company, services } from './src/data/content.js';
import { faq, caseStudies, serviceDetails } from './src/data/pages.js';
import { servicePages } from './src/data/servicePages.js';
import { FONT_FACES, FONT_PRELOAD } from './src/fonts.generated.js';
import { loadEnv } from 'vite';

// Build-time settings from the host or a local .env file (see .env.example).
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };

// Name exactly as on the Google Business Profile (see company.name).
const NAME = company.name;

// Cloudflare Web Analytics: cookie-free visitor counts, so no cookie banner is needed.
// Leave CF_ANALYTICS_TOKEN empty to build without analytics.
const CF_TOKEN = (env.CF_ANALYTICS_TOKEN || '').trim();

// Google Business Profile ("Tezco Technology Studio"). The share link the owner gave,
// plus a Maps search for the exact name and town, so search engines tie this website
// to that profile and not to other businesses called Tezco.
// Better: replace GBP_MAPS with the profile's own Maps link (maps.app.goo.gl/... from
// Share on Google Maps on a computer) when available.
const GBP_SHARE = 'https://share.google/VBYIkYAu2piIPS5Dv';
const GBP_MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Tezco Technology Studio, Aluva, Kerala');

const svcUrl = (slug) => `${SITE}${servicePages[slug].path}`;

// Production address of the site. Override at build time with SITE_URL=https://... if it changes.
export const SITE = (process.env.SITE_URL || 'https://thetezco.com').replace(/\/$/, '');
export const OG_IMAGE = '/og-image.jpg';
// Official profile picture (same as the Google Business Profile, LinkedIn and Instagram):
// orange square with the white TEZCO wordmark and "Technology Studio".
export const LOGO = '/brand/tezco-technology-studio-logo.png';

// Fonts are self-hosted (scripts/fetch-fonts.mjs). Each page lists the families it uses;
// their @font-face rules are inlined in <head> and the main ones preloaded.
const fonts = (...extra) => ['interTight', 'instrumentSerif', ...extra];

export const pages = {
  home: {
    path: '/',
    title: 'Tezco Technology Studio | SaaS, Web, Mobile App & AI Development in Kochi, Kerala',
    description: 'Tezco Technology Studio builds SaaS platforms, websites, mobile apps and AI solutions in Aluva, Kochi, Kerala. Fixed price, weekly progress and 30 days of free support.',
    fonts: fonts('archivo'),
    preload: '/video/hero-white-poster.webp',
    name: 'Home',
  },
  services: {
    path: '/services/',
    title: 'SaaS, Web, Mobile, AI & Automation Services | Tezco Technology Studio',
    description: 'SaaS development, websites, iOS and Android apps, AI chatbots and workflow automation, designed and built by one team at a fixed price. College projects from ₹2,999.',
    fonts: fonts(),
    preload: '/video/services-white-poster.webp',
    name: 'Services',
    faq: true,
  },
  work: {
    path: '/work/',
    title: 'Portfolio | Websites and Apps Built by Tezco Technology Studio',
    description: 'Real products designed, built and launched by Tezco Technology Studio, including the Element Sound Studio website. See the brief, what we built and the live result.',
    fonts: fonts('instrumentSans', 'googleSansFlex'),
    preload: '/video/process-cliff-poster.webp',
    name: 'Portfolio',
  },
  process: {
    path: '/process/',
    title: 'Our Process | Fixed-Price Software Development | Tezco Technology Studio',
    description: 'From a free 30-minute discovery call to launch day: a fixed-price proposal, weekly sprints with visible progress, and 30 days of free support after go-live.',
    fonts: fonts('outfit', 'inter'),
    preload: '/video/process-head-poster.webp',
    name: 'Process',
    faq: true,
  },
  about: {
    path: '/about/',
    title: 'About Tezco Technology Studio | Software Company in Aluva, Kochi',
    description: 'Tezco Technology Studio is a software engineering company in Aluva, Kochi, building SaaS, web, mobile and AI products for growing businesses at a fixed price.',
    fonts: fonts('anton', 'robotoCondensed', 'bigShoulders'),
    preload: '/images/work/element/home.webp',
    name: 'About',
  },
  contact: {
    path: '/contact/',
    title: 'Contact Tezco Technology Studio | Free 30-Minute Discovery Call',
    description: `Book a free 30-minute discovery call with Tezco Technology Studio, Aluva, Kochi, on WhatsApp, phone or email (${company.email}). We usually reply within a day.`,
    fonts: fonts('inter'),
    preload: '/images/stock/contact-boardroom.webp',
    preloadSm: '/images/stock/contact-boardroom-sm.webp',
    name: 'Contact',
    faq: true,
  },
  privacy: {
    path: '/privacy/',
    title: 'Privacy Policy | Tezco Technology Studio',
    description: 'How Tezco Technology Studio collects, uses and protects personal data, and your rights under the Digital Personal Data Protection Act, 2023.',
    fonts: fonts(),
    name: 'Privacy Policy',
  },
  terms: {
    path: '/terms/',
    title: 'Terms of Service | Tezco Technology Studio',
    description: 'The terms that apply to using the Tezco Technology Studio website and making an enquiry about a project.',
    fonts: fonts(),
    name: 'Terms of Service',
  },
  // One page per service: svc-saas, svc-web, ... (content in src/data/servicePages.js).
  ...Object.fromEntries(Object.entries(servicePages).map(([slug, s]) => [`svc-${slug}`, {
    path: s.path,
    title: s.seoTitle,
    description: s.seoDescription,
    fonts: fonts(),
    preload: serviceDetails[slug].image,
    name: s.name,
    service: slug,
  }])),
  notfound: {
    path: '/404.html',
    title: 'Page not found | Tezco Technology Studio',
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
  name: NAME,
  legalName: company.legalName,
  alternateName: ['Tezco', 'TheTezco', 'Tezco Solutions', 'Tezco Services', 'Technical Expertz'],
  // Official profiles: lets search engines connect the brand across the web.
  sameAs: [
    'https://in.linkedin.com/company/tezco-technical-expertz',
    'https://www.instagram.com/tezcoservices/',
    GBP_SHARE,
  ],
  hasMap: GBP_MAPS,
  url: `${SITE}/`,
  logo: { '@type': 'ImageObject', '@id': `${SITE}/#logo`, url: `${SITE}${LOGO}`, contentUrl: `${SITE}${LOGO}`, width: 1200, height: 1200, caption: NAME },
  image: [`${SITE}${LOGO}`, `${SITE}${OG_IMAGE}`],
  description: 'Tezco Technology Studio is a software engineering company in Aluva, Kochi, Kerala, building SaaS platforms, websites, mobile apps, AI solutions and workflow automation at a fixed price, with weekly progress and 30 days of free support.',
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
      itemOffered: { '@type': 'Service', name: s.title, description: s.text, url: svcUrl(s.slug) },
    })),
  },
};

const website = {
  '@type': 'WebSite', '@id': SITE_ID, url: `${SITE}/`, name: NAME, alternateName: ['Tezco', 'thetezco.com'], inLanguage: 'en-IN', publisher: { '@id': ORG_ID },
};

const breadcrumb = (p) => {
  const trail = [{ name: 'Home', path: '/' }];
  if (p.service) trail.push({ name: 'Services', path: '/services/' });
  if (p.path !== '/') trail.push({ name: p.name, path: p.path });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE}${p.path}#breadcrumb`,
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${SITE}${t.path}` })),
  };
};

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
        item: { '@type': 'Service', name: s.title, description: s.text, serviceType: s.title, provider: { '@id': ORG_ID }, areaServed: 'IN', url: svcUrl(s.slug) },
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
  if (p.service) {
    const s = servicePages[p.service];
    const d = serviceDetails[p.service];
    graph.push({
      '@type': 'Service', '@id': `${url}#service`, name: s.name, serviceType: s.name, url,
      description: s.seoDescription, provider: { '@id': ORG_ID },
      areaServed: [{ '@type': 'City', name: 'Kochi' }, { '@type': 'State', name: 'Kerala' }, { '@type': 'Country', name: 'India' }],
      image: `${SITE}${d.image}`,
      hasOfferCatalog: { '@type': 'OfferCatalog', name: `${s.name}: what is included`, itemListElement: d.includes.map((x) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: x } })) },
      ...(d.price ? { offers: { '@type': 'Offer', priceCurrency: 'INR', price: d.price.replace(/[^d]/g, ''), priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'INR', minPrice: d.price.replace(/[^d]/g, '') } } } : {}),
    });
    graph.push({
      '@type': 'FAQPage', '@id': `${url}#faq`,
      mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
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
    `<meta name="author" content="${NAME}" />`,
    '<meta name="format-detection" content="telephone=no" />',
    '<meta name="geo.region" content="IN-KL" />',
    '<meta name="geo.placename" content="Aluva, Ernakulam, Kerala" />',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />',
    '<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />',
    '<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
    '<link rel="manifest" href="/site.webmanifest" />',
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${NAME}" />`,
    '<meta property="og:locale" content="en_IN" />',
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    '<meta property="og:image:alt" content="Tezco Technology Studio: software, web, mobile and AI development" />',
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
    CF_TOKEN ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: CF_TOKEN })}'></script>` : '',
  ].filter(Boolean).join('\n    ');
}
