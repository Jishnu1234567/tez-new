// Content for the inner pages (Services, Work, Process, About, Contact).
// Facts here come from the main site copy in content.js; edit freely.
import { company } from './content.js';

// Contact panel background on each inner page, so no photo repeats across the site.
export const contactImages = {
  services: '/images/stock/contact-services.webp',
  work: '/images/stock/contact-work.webp',
  process: '/images/stock/contact-process.webp',
  about: '/images/stock/contact-about.webp',
};

export const pageHeroes = {
  services: {
    // Glass hero with the white-background video.
    video: '/video/services-white.mp4',
    videoMobile: '/video/services-white-960.mp4',
    poster: '/video/services-white-poster.webp',
    heading: [{ t: 'Built for ' }, { em: 'what’s next' }],
    placeholder: 'What do you want to build?',
    sub: 'Tell us your idea and it goes straight to our team on WhatsApp. SaaS, web, mobile, AI and automation, at a fixed price.',
    button: { label: 'Explore all services', href: '#services-list' },
    eyebrow: 'Services',
    title: [{ t: 'Everything you need to ' }, { em: 'build, launch' }, { t: ' and ' }, { em: 'grow.' }],
    text: 'SaaS platforms, websites, mobile apps, AI and automation, designed and engineered by one team at a fixed price.',
    image: '/images/stock/page-services.webp',
    cta: { label: 'Start a project', href: '/contact/' },
  },
  work: {
    eyebrow: 'Portfolio',
    title: [{ t: 'Work that ' }, { em: 'ships.' }],
    text: 'Real products we have designed, built and launched. Each one is live, in use and backed by a fixed price and weekly progress.',
    image: '/images/stock/page-work.webp',
    cta: { label: 'Start a project', href: '/contact/' },
  },
  process: {
    eyebrow: 'Process',
    title: [{ t: 'From ' }, { em: 'first call' }, { t: ' to ' }, { em: 'launch day.' }],
    text: 'Four clear steps, a fixed price agreed upfront and progress you can see every week.',
    image: '/images/stock/page-process.webp',
    cta: { label: 'Book a free call', href: '/contact/' },
  },
  about: {
    eyebrow: 'About Tezco',
    title: [{ t: 'Engineers of ' }, { em: 'digital growth.' }],
    text: 'A software engineering company building SaaS, web, mobile and AI products that move businesses forward.',
    image: '/images/stock/page-about.webp',
    cta: { label: 'Work with us', href: '/contact/' },
  },
  contact: {
    eyebrow: 'Contact',
    title: [{ t: "Let's build " }, { em: 'something worth launching.' }],
    text: 'Book a free 30-minute discovery call. We usually reply within a day.',
    image: '/images/stock/contact-handshake.webp',
    cta: { label: 'Chat on WhatsApp', href: company.whatsapp },
  },
};

// Services page: one detailed block per service (keyed by slug from content.js services).
export const serviceDetails = {
  saas: {
    image: '/images/stock/svcp-saas.webp',
    intro: 'From the first sketch to paying customers: we design, build and launch software-as-a-service products that are ready to scale.',
    includes: ['Product discovery and architecture', 'Multi-tenant accounts, roles and permissions', 'Subscription billing and invoices', 'Admin dashboards and analytics', 'APIs and third-party integrations', 'Cloud deployment and monitoring'],
    stack: ['React', 'Next.js', 'Node.js', 'FastAPI', 'PostgreSQL', 'Docker'],
  },
  web: {
    image: '/images/stock/svcp-web-site.webp',
    intro: 'Websites and online stores that load fast, rank well and turn visitors into enquiries and sales.',
    includes: ['Business websites and landing pages', 'E-commerce stores', 'SEO-first structure, metadata and speed', 'A CMS so your team can edit content', 'Analytics and conversion tracking', 'Domain, hosting and launch'],
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js'],
  },
  mobile: {
    image: '/images/stock/svcp-mobile.webp',
    intro: 'iOS and Android apps built from one codebase, designed for your users and taken all the way to the stores.',
    includes: ['iOS and Android from one codebase', 'UI/UX design and clickable prototypes', 'Payments, notifications and maps', 'Backend and admin panel', 'App Store and Play Store submission'],
    stack: ['Flutter', 'React Native', 'Firebase', 'Node.js'],
  },
  ai: {
    image: '/images/stock/svcp-ai-apps.webp',
    intro: 'Practical AI that fits the way your team already works, from chatbots to computer vision and prediction.',
    includes: ['LLM chatbots for your website and WhatsApp', 'Question answering over your own documents', 'Computer vision: detection and OCR', 'Predictive models and forecasting', 'Integration with your existing tools'],
    stack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
  },
  automation: {
    image: '/images/stock/svcp-automation-ai.webp',
    intro: 'Connect your tools and remove repetitive work, so your team spends time on what matters.',
    includes: ['Workflow automation', 'CRM setup and integrations', 'WhatsApp and email notifications', 'Data sync between your tools', 'Reports and dashboards'],
    stack: ['Node.js', 'Python', 'Firebase', 'PostgreSQL'],
  },
  college: {
    image: '/images/stock/svcp-college-team.webp',
    intro: 'Final year projects with everything you need to submit and present with confidence.',
    includes: ['Project ideas matched to your branch', 'Full, working source code', 'IEEE-format documentation and report', 'Presentation and viva preparation', 'Walkthrough sessions to explain the code'],
    stack: ['Python', 'React', 'Flutter', 'TensorFlow'],
    price: 'From ₹2,999',
  },
};

// Process page: detail for each of the four steps (matches services.process.steps).
export const processDetails = [
  { image: '/images/stock/team-meeting.webp', happens: 'We talk through your goals, your users, the must-have features, your timeline and your budget.', get: ['Clear next steps', 'An honest view of what is needed', 'No obligation'] },
  { image: '/images/stock/workspace.webp', happens: 'We turn the call into a written scope with milestones, a timeline and one fixed price.', get: ['A scope you can approve', 'A fixed price, no hidden costs', 'Milestones and a timeline'] },
  { image: '/images/stock/code-dark.webp', happens: 'Designs come to you for approval, then we build in weekly sprints with testing along the way.', get: ['UI/UX designs to approve', 'Weekly progress updates', 'Direct developer access'] },
  { image: '/images/stock/laptop-glow.webp', happens: 'We deploy, submit to the stores or go live, then stay with you while real users arrive.', get: ['Deployment assistance', 'Go-live and store submission', '30 days of free support'] },
];

export const faq = {
  eyebrow: 'FAQ',
  title: ['Questions,', 'answered.'],
  text: 'Straight answers on pricing, timelines and how we work. Anything else? Message us on WhatsApp.',
  items: [
    { q: 'How much does a project cost?', a: 'Every project gets a fixed price after the free discovery call, based on the scope we agree together. College projects start from ₹2,999.' },
    { q: 'Is the price really fixed?', a: 'Yes. You get a number upfront and we stick to it. If you want to change the scope later, we discuss and price the change before any work starts.' },
    { q: 'How will I know how the project is going?', a: 'You get progress updates every week of the build, and direct access to the developers working on your product.' },
    { q: 'What happens after launch?', a: 'Every build includes deployment assistance and 30 days of free support after go-live.' },
    { q: 'How quickly do you reply?', a: 'We usually reply within a day on WhatsApp and email, Monday to Saturday.' },
    { q: 'Which technologies do you use?', a: 'React and Next.js for the web, Flutter and React Native for mobile, Node.js, Python and FastAPI on the backend, and PostgreSQL, MongoDB and Firebase for data. We pick what suits your project.' },
  ],
};

// Work page: case study for each project (keyed by project name in content.js work.projects).
export const caseStudies = {
  'Element Sound Studio': {
    client: 'Element Sound Studio',
    industry: 'Music and recording studio',
    services: ['Web design', 'Development', 'Responsive build', 'Launch'],
    year: '2026',
    url: 'https://elementkochi.com/',
    overview: 'Element Sound Studio is a recording and music production studio offering recording, training programs, podcast production and live shows. They needed a website that feels as immersive as the studio itself and makes it effortless to get in touch.',
    built: [
      'An immersive studio gallery that shows the rooms, the gear and the people behind every session',
      'Dedicated sections for recording, training programs, podcast and live shows',
      'Ambient sound with a clear on/off control',
      'One-tap WhatsApp contact from anywhere on the site',
      'A fully responsive build tuned for phones, tablets and desktops',
    ],
    gallery: [
      { src: '/images/work/element/gallery.webp', alt: 'Element Sound Studio website: studio gallery section', wide: true },
      { src: '/images/work/element/recording.webp', alt: 'Element Sound Studio website: recording studio section' },
      { src: '/images/work/element/records.webp', alt: 'Element Sound Studio website: records label section' },
      { src: '/images/work/element/home.webp', alt: 'Element Sound Studio website: opening screen, "A creative music hub in the heart of Kochi"', wide: true },
    ],
    mobile: { src: '/images/work/element/mobile.webp', alt: 'Element Sound Studio website on a phone' },
  },
  'Ranjith Meleppat': {
    client: 'Ranjith Meleppat',
    industry: 'Music composer and producer',
    services: ['Web design', 'Development', 'Responsive build', 'Launch'],
    year: '2026',
    url: 'https://ranjithmeleppat.elementkochi.com/',
    overview: 'Ranjith Meleppat is an IRRA Award-winning music composer and producer with more than twenty years in film scoring, sound design and radio production across Kerala and Dubai. He needed a portfolio that lets filmmakers, labels and brands hear his work straight away and get in touch for a project.',
    built: [
      'A bold personal introduction with his awards, experience and studio bases at a glance',
      'A projects showcase of film songs, devotional and classical releases and brand films, each playable in one tap',
      'Five clearly explained services, from composition and scoring to studio consulting',
      'A career timeline, recognition and references that build trust with new clients',
      'A contact section and FAQ written for search engines and AI assistants, on a fully responsive build',
    ],
  },
};

// About page.
export const aboutPage = {
  story: {
    eyebrow: 'Who we are',
    title: ['Small team.', 'Full stack. Real outcomes.'],
    paras: [
      'Tezco is a software engineering company. We build SaaS platforms, websites, mobile apps and AI solutions for businesses that want to grow, and final year projects for students who want to learn by building.',
      'We keep it simple: one team does the design, backend, mobile and AI work, you get a fixed price upfront, and you see progress every week. When the product goes live, we stay with you for 30 days of free support.',
    ],
    image: '/images/stock/team-review.webp',
  },
  facts: [
    { label: 'Company', value: company.legalName },
    { label: 'Founded', value: company.founded },
    { label: 'CIN', value: company.cin },
    { label: 'Hours', value: company.hours },
  ],
  values: {
    eyebrow: 'Our values',
    title: ['What we', 'stand for.'],
    items: [
      { title: 'Integrity', desc: 'We are honest and transparent in everything we do.' },
      { title: 'Quality', desc: 'We deliver reliable, well-tested and professional work.' },
      { title: 'Client focus', desc: 'We put client needs at the centre of every decision.' },
      { title: 'Innovation', desc: 'We adopt modern tools and practices to stay ahead.' },
      { title: 'Accountability', desc: 'We take ownership of our commitments and outcomes.' },
    ],
  },
};

export const contactPage = {
  methods: [
    { kind: 'whatsapp', label: 'WhatsApp', value: 'Chat with the team', href: company.whatsapp, note: 'Fastest way to reach us' },
    { kind: 'phone', label: 'Phone', value: company.phone, href: company.phoneHref, note: company.hours },
    { kind: 'mail', label: 'Email', value: company.email, href: `mailto:${company.email}`, note: 'We usually reply within a day' },
  ],
  form: {
    eyebrow: 'Project brief',
    title: ['Tell us what', "you're building."],
    text: 'Fill this in and it opens a ready-to-send email or WhatsApp message. No account, no spam.',
    types: ['SaaS platform', 'Website or store', 'Mobile app', 'AI solution', 'Automation', 'College project', 'Something else'],
  },
};

// Work page (portfolio): warm near-black design with amber accents.
// Only real, live projects go in `projects`; upcoming work stays generic until it launches.
export const portfolio = {
  hero: {
    pill: 'Portfolio · Selected work',
    background: '/images/stock/page-work.webp',
    title: ['Work that', 'ships.'],
    text: 'Real products we have designed, built and launched. Each one is live, in use and backed by the same fixed-price, weekly-progress way of working.',
    primary: { label: 'View case studies', href: '#element' },
    secondary: { label: 'Start a project', href: '/contact/' },
    facts: [
      { k: 'Pricing', v: 'Fixed' },
      { k: 'Progress', v: 'Weekly' },
      { k: 'Support', v: '30 days' },
      { k: 'Reply', v: '< 24h' },
    ],
    shot: { src: '/images/work/element/gallery.webp', alt: 'Element Sound Studio website, "Every session leaves a trace" gallery section', url: 'elementkochi.com' },
    phone: { src: '/images/work/element/mobile.webp', alt: 'Element Sound Studio website on a phone' },
  },
  index: {
    eyebrow: 'Index',
    title: 'Selected projects',
    rows: [
      { n: '01', name: 'Element Sound Studio', what: 'Web design · Development', field: 'Music studio', year: '2026', status: 'Live', href: '#element' },
      { n: '02', name: 'Ranjith Meleppat', what: 'Portfolio website', field: 'Music composer', year: '2026', status: 'Live', href: '#ranjith' },
      { n: '03', name: 'Next launch', what: 'Client build in progress', field: 'Under wraps', year: '2026', status: 'Building' },
    ],
  },
  // Each case study: heading, details, one framed screenshot, the brief and what we built.
  caseStudies: [
    {
      slug: 'element',
      project: 'Element Sound Studio',
      kicker: 'Case study 01',
      tagline: 'An immersive website for a recording and music production studio, built to feel like stepping into the room.',
      platform: 'Responsive web',
      domain: 'elementkochi.com',
      image: { src: '/images/work/element/home.webp', width: 1550, height: 872, alt: 'Element Sound Studio website: "A creative music hub in the heart of Kochi"' },
    },
    {
      slug: 'ranjith',
      project: 'Ranjith Meleppat',
      kicker: 'Case study 02',
      tagline: 'A portfolio for an award-winning film composer, built so his music is one tap away.',
      platform: 'Responsive web',
      domain: 'ranjithmeleppat.elementkochi.com',
      image: { src: '/images/work/ranjith/home.webp', width: 1600, height: 900, alt: 'Ranjith Meleppat portfolio website: "Hi, I\u2019m Ranjith Meleppat, music composer and producer"' },
    },
  ],
  marquee: ['SaaS platforms', 'Websites', 'Mobile apps', 'AI solutions', 'Automation', 'College projects'],
  finale: {
    pill: 'Start your project',
    title: ['Your next launch', 'starts now.'],
    text: 'Describe it, we shape it in design and code, then ship it to the web, the App Store or the Play Store. Fixed price, weekly progress, no hidden costs.',
    cta: { label: 'Get started now', href: '/contact/' },
    blurb: ['Tezco keeps design, code and launch in one team,', 'so you never rebuild from scratch.'],
    columns: [
      { title: 'Explore', links: [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services/' }, { label: 'Portfolio', href: '/work/' }, { label: 'Process', href: '/process/' }] },
      { title: 'Services', links: [{ label: 'SaaS', href: '/services/#saas' }, { label: 'Web', href: '/services/#web' }, { label: 'Mobile apps', href: '/services/#mobile' }, { label: 'AI solutions', href: '/services/#ai' }, { label: 'Automation', href: '/services/#automation' }] },
      { title: 'Company', links: [{ label: 'About', href: '/about/' }, { label: 'Contact', href: '/contact/' }, { label: 'College projects', href: '/services/#college' }] },
    ],
    chat: { title: 'Tell us about your project', placeholder: 'A booking app for my clinic', note: 'Opens WhatsApp · Usually replies within a day' },
    sign: ['Tezco', 'Build what counts.'],
    editor: '/images/portfolio/editor-panel.webp',
  },
};

// Contact page hero: framed smoke card with an idea pill that opens WhatsApp.
export const contactHero = {
  title: ["Let's build", 'something worth launching.'],
  sub: ['Book a free 30-minute discovery call. Fixed price, clear timeline', 'and no hidden costs. We usually reply within a day.'],
  placeholder: 'Tell us what you want to build',
  button: 'Start on WhatsApp',
  blurb: 'Tezco builds SaaS platforms, websites, mobile apps and AI solutions for businesses that want to grow. Fixed price, weekly progress and 30 days of free support after every launch.',
  image: '/images/stock/contact-boardroom.webp',
  imageSm: '/images/stock/contact-boardroom-sm.webp',
};

// Process page hero: large two-tone headline with an inline "eye" pill, an ask box that
// opens WhatsApp, and a looping video that rises from the bottom of the screen.
export const processHero = {
  lead: 'Our process:',
  rest: ['four clear steps', 'from your first call to a'],
  before: 'fixed-price',
  after: 'launch day.',
  placeholder: 'Ask us anything about your project...',
  side: { label: 'steps', from: '01', to: '04', href: '#steps' },
  cornerLeft: '2026',
  cornerRight: 'fixed price · weekly progress',
  video: '/video/process-head.mp4',
  videoMobile: '/video/process-head-960.mp4',
  poster: '/video/process-head-poster.webp',
};

// About page hero: white stage, giant title and an exploded 3D view of a product being built.
export const aboutHero = {
  title: 'We are Tezco',
  row: ['Software studio', 'SaaS', 'Web', 'Mobile', 'AI', 'Automation', 'Since 2026'],
  tagline: ['We build what counts:', 'software for growing businesses'],
  cta: { label: 'Work with us', href: '/contact/' },
  shot: '/images/work/element/home.webp',
  layers: ['Launch', 'Design', 'Code'],
  // Code layer: [indent, [colour, width%], ...] per line. Colours: k keyword, s string, f function, p plain.
  code: [
    [0, ['k', 14], ['f', 26], ['p', 18]],
    [1, ['k', 10], ['p', 22], ['s', 30]],
    [1, ['f', 20], ['p', 34]],
    [2, ['p', 16], ['s', 40]],
    [2, ['k', 12], ['f', 22], ['p', 14]],
    [1, ['p', 28], ['s', 18]],
    [0, ['k', 18], ['p', 30]],
    [1, ['f', 24], ['p', 20], ['s', 16]],
  ],
};

// Portfolio hero: video panel with floating cards that show real project screenshots.
export const portfolioHero = {
  title: ['Real products,', 'live and', 'in use.'],
  lede: ['Websites and apps we have designed, built and launched,', 'each backed by a fixed price and weekly progress.'],
  cta: { label: 'View case studies', href: '#element' },
  facts: 'Fixed price · Weekly progress · 30 days free support',
  corner: ['Work', 'that ships.'],
  video: '/video/process-cliff.mp4',
  videoMobile: '/video/process-cliff-540.mp4',
  poster: '/video/process-cliff-poster.webp',
  project: { label: 'Live projects', name: 'Studio and artist websites', chip: 'Launched 2026', link: 'View case studies', href: '#element' },
  builds: [
    { name: 'Websites and stores', chip: 'Web', href: '/services/#web' },
    { name: 'SaaS platforms', chip: 'SaaS', href: '/services/#saas' },
    { name: 'Mobile apps', chip: 'iOS · Android', href: '/services/#mobile' },
  ],
  live: { text: 'Have a project in mind?', link: 'Start a project', href: '/contact/' },
  site: { left: 'Latest launch', right: 'Live', title: 'Ranjith Meleppat', link: 'Visit the live site', href: 'https://ranjithmeleppat.elementkochi.com/' },
};
