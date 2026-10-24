// All website copy lives here. Sources: the Tezco Company Profile (TEZCO-CO-001),
// the proposal system's company data, and the previous tezcoservices.com site.

export const company = {
  brand: 'Tezco',
  legalName: 'Technical Expertz Information Technology Private Limited',
  cin: 'U62099KL2026PTC104235',
  founded: '2026',
  email: 'build@thetezco.com',
  phone: '+91 99955 99294',
  phoneHref: 'tel:+919995599294',
  whatsappBase: 'https://wa.me/919995599294',
  whatsapp: 'https://wa.me/919995599294?text=' + encodeURIComponent('Hi Tezco, I would like to discuss a project.'),
  website: 'www.tezcoservices.com',
  address: 'Building No. 23/93-1, Thynothil Road, Aluva, Ernakulam, Kerala 683101',
  hours: 'Mon to Sat, 10:00 AM to 7:00 PM IST',
};

export const nav = {
  links: [
    { label: 'Home', href: '/', page: 'home' },
    { label: 'About', href: '/about/', page: 'about' },
    { label: 'Services', href: '/services/', page: 'services' },
    { label: 'Portfolio', href: '/work/', page: 'work' },
    { label: 'Process', href: '/process/', page: 'process' },
  ],
  cta: 'Contact us',
  ctaHref: '/contact/',
};


export const hero = {
  title: "Build what counts",
  // Zigzag layout splits the headline over two staggered rows.
  titleLines: ['Build', 'What counts'],
  eyebrow: 'About Tezco',
  intro: 'We build reliable software, apps and AI solutions that help businesses grow.',
  key: { label: ['Get', 'Started'], href: '/contact/', aria: 'Get started with Tezco' },
  // Rotating badge in the middle row (links to the Work section).
  // Kinetic product shot beside the intro (same grayscale + orange-streak look as Who we are).
  shot: {
    src: '/images/stock/build-capsule.webp',
    alt: 'A laptop showing code on a bright desk beside a plant and a yellow cup',
  },
  explore: { label: 'Explore our work', ring: 'EXPLORE OUR WORK • TEZCO SOLUTIONS • ', href: '/work/' },
  // Orange message composer: types real project ideas, sends the shown one on WhatsApp.
  composer: {
    name: 'Tezco team',
    status: 'Usually replies within 24 hours',
    greeting: 'Hi! What would you like to build?',
    ideas: [
      'A booking app for my clinic',
      'An AI chatbot for WhatsApp',
      'A SaaS dashboard for my team',
      'A fast website for my business',
      'A final year project with IEEE docs',
    ],
    send: 'Send this idea to Tezco on WhatsApp',
    hint: 'Opens WhatsApp with your message',
  },
  // Service keyboard: press a key to see what Tezco builds.
  keyboard: {
    chip: 'What we build',
    link: 'Explore services',
    href: '/services/',
    keys: [
      { id: 'saas', label: 'SaaS', title: 'SaaS Development', text: 'Multi-tenant platforms with subscription billing, dashboards and APIs.' },
      { id: 'web', label: 'Web', title: 'Web Development', text: 'Fast, SEO-first websites and stores built on React and Next.js.' },
      { id: 'mobile', label: 'Mobile', title: 'Mobile Apps', text: 'iOS and Android apps with Flutter and React Native, through to store launch.' },
      { id: 'ai', label: 'AI', title: 'AI Solutions', text: 'LLM chatbots, computer vision and predictive models for your workflow.' },
      { id: 'auto', label: 'Automate', title: 'Automation', text: 'Workflow automation and CRM integrations that cut manual busywork.' },
      { id: 'college', label: 'College', title: 'College Projects', text: 'Final year projects with source code, IEEE documentation and viva prep.' },
    ],
  },
};

export const about = {
  // Opening hero: fullscreen looping video, cinematic serif headline, liquid-glass button.
  // Words in `em` are shown in the accent colour.
  title: [{ t: 'We engineer ' }, { em: 'software' }, { t: ' that moves ' }, { em: 'business forward.' }],
  text: 'Tezco builds SaaS platforms, websites, mobile apps and AI solutions for businesses that want to grow, at a fixed price, with weekly progress and 30 days of free support.',
  // Hero booking capsule (replaces the old big button).
  book: { note: 'Free 30-min discovery call', sub: 'Usually replies within a day', label: 'Book a call', href: '/contact/' },
  // Self-hosted video with the night sky keyed out to white.
  video: '/video/hero-white.mp4',
  videoMobile: '/video/hero-white-960.mp4', // lighter file for screens up to 900px wide
  poster: '/video/hero-white-poster.webp',
};



// Services + process showcase (3D card ring + browser mock).
// Marquee: the stack we build with, scrolling across a tilted strip.
export const marquee = {
  label: 'The stack we build with',
  items: [
    { name: 'React', logo: '/images/tech/react.svg' },
    { name: 'Next.js', logo: '/images/tech/nextjs.svg' },
    { name: 'TypeScript', logo: '/images/tech/typescript.svg' },
    { name: 'Node.js', logo: '/images/tech/nodejs.svg' },
    { name: 'Python', logo: '/images/tech/python.svg' },
    { name: 'FastAPI', logo: '/images/tech/fastapi.svg' },
    { name: 'Flutter', logo: '/images/tech/flutter.svg' },
    { name: 'Firebase', logo: '/images/tech/firebase.svg' },
    { name: 'PostgreSQL', logo: '/images/tech/postgresql.svg' },
    { name: 'MongoDB', logo: '/images/tech/mongodb.svg' },
    { name: 'TensorFlow', logo: '/images/tech/tensorflow.svg' },
    { name: 'Docker', logo: '/images/tech/docker.svg' },
  ],
};

export const services = {
  eyebrow: 'Services',
  title: ['What we build —', 'end to end.'],
  text: 'One team, the full product stack: design, engineering, AI and the systems that tie them together.',
  items: [
    { slug: 'saas', title: 'SaaS Development', image: '/images/stock/svc-saas-sm.webp', text: 'Multi-tenant platforms with subscription billing, dashboards and APIs, designed, built and launched by one team.', tags: ['Billing', 'Dashboards', 'APIs'] },
    { slug: 'web', title: 'Web Development', image: '/images/stock/svc-web-sm.webp', text: 'Fast, SEO-first websites and online stores built on React and Next.js, ready to rank and convert.', tags: ['React', 'Next.js', 'SEO'] },
    { slug: 'mobile', title: 'Mobile Apps', image: '/images/stock/svc-mobile-app-sm.webp', text: 'iOS and Android apps with Flutter and React Native, from the first screen through to store launch.', tags: ['iOS', 'Android', 'Flutter'] },
    { slug: 'ai', title: 'AI Solutions', image: '/images/stock/svc-ai-sm.webp', text: 'LLM chatbots, computer vision and predictive models that fit the way your team already works.', tags: ['LLMs', 'Vision', 'Prediction'] },
    { slug: 'automation', title: 'Automation', image: '/images/stock/svc-automation-ai-sm.webp', text: 'Workflow automation and CRM integrations that cut manual busywork and keep your data in sync.', tags: ['Workflows', 'CRM', 'Integrations'] },
    { slug: 'college', title: 'College Projects', image: '/images/stock/svc-college-sm.webp', text: 'Final year projects with full source code, IEEE documentation and viva preparation.', tags: ['Source code', 'IEEE docs', 'Viva prep'] },
  ],
  process: {
    eyebrow: 'Process',
    title: ['From first call', 'to launch day.'],
    steps: [
      { n: '01', name: 'Discovery call', note: 'Free · 30 minutes', text: 'We learn your goals, users and requirements, with no obligation.' },
      { n: '02', name: 'Proposal', note: 'Fixed price', text: 'A clear scope, timeline and price that we stick to.' },
      { n: '03', name: 'Design & build', note: 'Weekly sprints', text: 'UI/UX, engineering and QA, with progress you can see every week.' },
      { n: '04', name: 'Launch', note: '30 days free support', text: 'Go-live, deployment and a month of support after launch.' },
    ],
  },
};

export const showcase = {
  badge: 'Six core services, one full-stack team',
  h1: ['Design with intent.', 'Build with impact.'],
  sub1: { strong: 'SaaS / Web / Mobile / AI / Automation', rest: ' built by one team, with' },
  sub2: 'fixed pricing, weekly progress and 30 days of free support.',
  cta: 'Start a Project',
  cards: [
    { v: 'light', img: '/images/photos/laptop-code.webp', kicker: 'SERVICE 01', t1: 'Web', t2: 'Development', points: ['REACT / NEXT.JS', 'SEO-FIRST BUILDS'] },
    { v: 'peach', img: '/images/photos/analytics-laptop.webp', t1: 'SAAS', t2: 'PLATFORMS' },
    { v: 'white', img: '/images/photos/phone-app.webp', title: 'MOBILE APPS', small: 'iOS · Android · Flutter', pill: 'Build yours' },
    { v: 'deep', img: '/images/photos/ai-brain.webp', text: 'LLM chatbots, computer vision and predictive models, tailored to the way your team works.', mark: 'AI Solutions' },
    { v: 'promo', img: '/images/photos/students.webp', ribbon: 'FINAL YEAR PROJECTS', t1: 'From', t2: '₹2,999' },
    { v: 'plain', img: '/images/photos/server-racks.webp', t: 'AUTOMATION' },
    { v: 'power', img: '/images/photos/workshop-notes.webp', t1: 'DISCOVERY', t2: 'CALL', small: '01 · a free 30-minute call' },
    { v: 'plain', img: '/images/photos/wireframe-sketch.webp', t: '02 · PROPOSAL' },
    { v: 'sprint', img: '/images/photos/code-screen.webp', small: '03 · Design & build', big: 'Sprints' },
    { v: 'plain', img: '/images/photos/team-high-five.webp', t: '04 · LAUNCH' },
  ],
  browser: {
    url: 'tezcoservices.com/how-we-work',
    announcement: 'Free 30-minute discovery call · No obligation',
    kicker: 'Technical Expertz',
    hero: {
      image: '/images/photos/bright-workspace.webp',
      alt: 'A bright, open-plan workspace with people at their desks',
      eyebrow: 'How we work',
      title: ['From first call', 'to launch day.'],
      cta: 'BOOK A CALL',
    },
    sectionTitle: 'Our process',
    sectionLink: '4 steps',
    steps: [
      { tag: 'FREE', name: 'Discovery Call', meta: 'Requirements · Goals', label: 'Step 01', note: '30 min', image: '/images/photos/team-hands.webp' },
      { tag: 'FIXED', name: 'Proposal', meta: 'Scope · Timeline', label: 'Step 02', note: 'Fixed price', image: '/images/photos/meeting-laptops.webp' },
      { tag: 'WEEKLY', name: 'Design & Build', meta: 'UI/UX · Sprints · QA', label: 'Step 03', note: 'Agile', image: '/images/photos/desks-top-view.webp' },
      { tag: '30 DAYS', name: 'Launch', meta: 'Go-live · Support', label: 'Step 04', note: 'Free support', image: '/images/photos/team-high-five.webp' },
    ],
    strip: ['Fixed price, no surprises', 'Weekly progress updates', '30 days free support', 'Direct developer access'],
  },
};


export const why = {
  eyebrow: 'Why Tezco',
  title: ['Proof over promises.', 'Engineering you can see.'],
  text: 'We are committed to delivering high-performance solutions that reflect your brand, engage your audience and drive results.',
  feature: { kicker: 'Our promise', title: 'Fixed price, no surprises.', text: 'You get a number upfront and we stick to it. No hidden costs, no scope games.', cta: { label: 'See how we work', href: '/process/' } },
  stats: [
    { big: '30', label: 'Days of free support after every launch', tone: 'orange' },
    { big: '24h', label: 'Typical reply time on WhatsApp and email', tone: 'white' },
    { big: 'Weekly', label: 'Progress updates in every sprint', tone: 'peach' },
    { big: 'Founder-led', label: 'Work directly with the people building your product', tone: 'white' },
    { big: 'Full-stack', label: 'Design, backend, mobile and AI under one roof', tone: 'dark' },
  ],
  values: ['Integrity', 'Quality', 'Client focus', 'Innovation', 'Accountability'],
};



export const work = {
  eyebrow: 'Selected work',
  title: ['Selected work,', 'real launches.'],
  text: 'Every project here is live and in use. More client builds are in development and will join this page as they launch.',
  projects: [
    {
      name: 'Element Sound Studio',
      tag: 'Web design · Development · Music studio',
      summary: 'A website for a recording and music production studio, with an immersive gallery, ambient sound and one-tap WhatsApp contact.',
      result: 'Live · Responsive · Launched 2026',
      url: 'https://elementkochi.com/',
      image: '/images/work/element/card.webp',
      alt: 'Element Sound Studio website, designed and built by Tezco, shown in two browser windows',
    },
    {
      name: 'Ranjith Meleppat',
      tag: 'Portfolio website · Music composer',
      summary: 'A personal portfolio for an award-winning film composer and producer, with playable projects, a career timeline and direct booking.',
      result: 'Live · Responsive · Launched 2026',
      url: 'https://ranjithmeleppat.elementkochi.com/',
      image: '/images/work/ranjith/home.webp',
      alt: 'Ranjith Meleppat portfolio website, designed and built by Tezco',
    },
  ],
  pending: { tag: 'In development', title: 'More launches on the way', text: 'Further client projects are in progress and will appear here as they go live.' },
};


// Contact section: editorial headline + forever-scrolling tile mosaic.
export const cta = {
  eyebrow: 'Contact',
  title: ["Let's build", 'something worth launching.'],
  text: 'Book a free 30-minute discovery call. Fixed price, clear timeline and no hidden costs. We usually reply within a day.',
  whatsapp: { label: 'WhatsApp', href: company.whatsapp },
  phone: { label: company.phone, href: company.phoneHref },
  email: { label: 'Email us', href: `mailto:${company.email}` },
  footLeft: company.hours,
  footRight: 'Available for new projects',
  // Orange and blue ink blooming in dark water (Unsplash). The tall crop is used on phones.
  image: '/images/stock/contact-ink.webp',
  imageSm: '/images/stock/contact-ink-sm.webp',
};

// Client testimonials. The section stays hidden until at least one real quote is added.
// Shape: { quote: '...', name: 'Full name', role: 'Role, Company', stat: 'Optional result' }
// The first quote is shown large; the rest scroll below it.
export const testimonials = {
  eyebrow: 'Client words',
  title: ['Clients speak,', 'results listen.'],
  text: 'Real words from the people we build for.',
  items: [],
};


export const footer = {
  tagline: 'Building the digital future from Aluva, Ernakulam, one project at a time.',
  columns: [
    {
      title: 'Explore',
      links: [
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services/' },
        { label: 'Portfolio', href: '/work/' },
        { label: 'Process', href: '/process/' },
        { label: 'About', href: '/about/' },
        { label: 'Contact', href: '/contact/' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'SaaS Development', href: '/services/#saas' },
        { label: 'Web Development', href: '/services/#web' },
        { label: 'Mobile Apps', href: '/services/#mobile' },
        { label: 'AI Solutions', href: '/services/#ai' },
        { label: 'Automation', href: '/services/#automation' },
        { label: 'College Projects', href: '/services/#college' },
      ],
    },
    {
      title: 'Contact',
      links: [
        { label: company.email, href: `mailto:${company.email}` },
        { label: company.phone, href: company.phoneHref },
        { label: 'WhatsApp', href: company.whatsapp },
        { label: company.hours },
        { label: company.address },
      ],
    },
  ],
};
