// One page per service: /services/<path>/. Each page targets the searches people type for
// that service ("mobile app development Kochi", "final year projects Kerala", ...).
// Keyed by the service slug in content.js (services.items). The "What's included" list,
// tech stack, image and price come from serviceDetails in pages.js.
//
// Only state facts that are true for every project: fixed price, weekly progress,
// 30 days of free support, the stack we use. No invented numbers or client names.

export const servicePages = {
  saas: {
    path: '/services/saas-development/',
    name: 'SaaS Development',
    seoTitle: 'SaaS Development Company in Kochi, Kerala | Tezco Technology Studio',
    seoDescription: 'SaaS development in Kochi, Kerala: multi-tenant platforms with subscription billing, dashboards and APIs, built by Tezco Technology Studio at a fixed price.',
    h1: ['SaaS development', 'in Kochi, Kerala'],
    lead: 'We design, build and launch software-as-a-service products, from the first sketch to paying customers, at a fixed price agreed before any work starts.',
    about: [
      'A SaaS product has to do more than work on demo day. It needs accounts for many customers, roles and permissions, billing that renews on its own, and a dashboard your team can run the business from. We plan all of that from the start, so you do not rebuild the foundations once customers arrive.',
      'One team handles product discovery, UI/UX design, the backend, the web app and deployment. You see progress every week, and after launch we stay with you for 30 days of free support.',
    ],
    forWho: [
      { t: 'Founders with a new idea', d: 'Turn the idea into a first version that real customers can sign up for and pay for.' },
      { t: 'Businesses with a manual process', d: 'Replace spreadsheets and emails with software your customers or staff log in to.' },
      { t: 'Teams with an ageing product', d: 'Rebuild an old system on a modern, scalable stack without losing your data.' },
    ],
    faqs: [
      { q: 'How much does it cost to build a SaaS product?', a: 'It depends on the features in the first version. After a free 30-minute discovery call we send a written scope with one fixed price, and we stick to it.' },
      { q: 'Can you add subscription billing and invoices?', a: 'Yes. Plans, trials, recurring payments, invoices and upgrades or downgrades are a standard part of the SaaS products we build.' },
      { q: 'Who owns the source code?', a: 'You do. When the project is paid for, the code, designs and accounts are handed over to you.' },
      { q: 'Can the product grow with more customers?', a: 'Yes. We build multi-tenant from day one and deploy on cloud infrastructure that can scale as your customer base grows.' },
    ],
  },
  web: {
    path: '/services/web-development/',
    name: 'Web Development',
    seoTitle: 'Website Development Company in Kochi, Kerala | Tezco Technology Studio',
    seoDescription: 'Website and e-commerce development in Kochi, Kerala. Fast, SEO-first sites built with React and Next.js by Tezco Technology Studio at a fixed price.',
    h1: ['Website development', 'in Kochi, Kerala'],
    lead: 'Business websites and online stores that load fast, rank on Google and turn visitors into enquiries and sales.',
    about: [
      'Your website is often the first thing a customer sees. We build sites that open quickly on a phone, are structured for search engines from the first line of code, and make it easy for visitors to call, message or buy.',
      'You get the design, the build, a way for your team to edit content, analytics, and help with your domain and hosting. Every project has a fixed price, weekly progress and 30 days of free support after launch.',
    ],
    forWho: [
      { t: 'Local businesses', d: 'A professional site that shows up when people nearby search for what you offer.' },
      { t: 'Shops and brands', d: 'An online store with products, payments and orders you can manage yourself.' },
      { t: 'Companies with an outdated site', d: 'A faster, modern redesign that keeps your search rankings.' },
    ],
    faqs: [
      { q: 'How much does a website cost?', a: 'Every website gets a fixed price after a free discovery call, based on the number of pages and features you need. There are no hidden costs.' },
      { q: 'Will my website show up on Google?', a: 'We build every site SEO-first: fast loading, clean structure, page titles and descriptions, structured data and a sitemap, so search engines can understand and rank it.' },
      { q: 'Can I update the website myself?', a: 'Yes. Where you need it, we add a simple content management system so your team can edit text, images and products without a developer.' },
      { q: 'Do you help with the domain and hosting?', a: 'Yes. We help you choose and set up the domain and hosting, and we handle the launch.' },
    ],
  },
  mobile: {
    path: '/services/mobile-app-development/',
    name: 'Mobile App Development',
    seoTitle: 'Mobile App Development Company in Kochi, Kerala | Tezco Technology Studio',
    seoDescription: 'iOS and Android app development in Kochi, Kerala with Flutter and React Native, from design to App Store and Play Store launch, at a fixed price.',
    h1: ['Mobile app development', 'in Kochi, Kerala'],
    lead: 'iOS and Android apps built from one codebase, designed for your users and taken all the way to the App Store and Play Store.',
    about: [
      'Building with Flutter or React Native means one codebase runs on both iPhone and Android, which saves time and money compared with two separate apps, without giving up a smooth, native feel.',
      'We design the screens, build the app and the backend and admin panel behind it, add payments, notifications and maps where needed, and handle the store submission. Fixed price, weekly progress and 30 days of free support after launch.',
    ],
    forWho: [
      { t: 'Startups', d: 'Launch a first version on both stores and learn from real users quickly.' },
      { t: 'Businesses', d: 'Give customers an app for bookings, orders, loyalty or support.' },
      { t: 'Teams in the field', d: 'An internal app for staff to log work, collect data or track deliveries.' },
    ],
    faqs: [
      { q: 'How much does it cost to build an app?', a: 'It depends on the screens and features. After a free discovery call you get one fixed price for the whole app, including the backend and store submission.' },
      { q: 'Do you build for both iPhone and Android?', a: 'Yes. We use Flutter or React Native, so one codebase runs on both iOS and Android.' },
      { q: 'Will you publish the app to the stores?', a: 'Yes. We prepare the store listings and handle submission to the Apple App Store and Google Play Store.' },
      { q: 'What happens after the app is live?', a: 'You get 30 days of free support after launch for fixes and help, and we can continue with new features after that.' },
    ],
  },
  ai: {
    path: '/services/ai-development/',
    name: 'AI Development',
    seoTitle: 'AI Development & Chatbots in Kochi, Kerala | Tezco Technology Studio',
    seoDescription: 'AI development in Kochi, Kerala: LLM chatbots for your website and WhatsApp, document Q&A, computer vision and prediction, built by Tezco Technology Studio.',
    h1: ['AI development and', 'chatbots in Kochi'],
    lead: 'Practical AI that fits the way your team already works, from chatbots that answer customers to models that read documents and predict demand.',
    about: [
      'Most businesses do not need a research lab. They need AI that solves one clear problem: answering the same customer questions, finding information in hundreds of documents, reading invoices, or forecasting sales. We start from that problem and pick the simplest approach that works.',
      'We connect the AI to the tools you already use, such as your website, WhatsApp, CRM or database, and test it on your real data before launch. Fixed price, weekly progress and 30 days of free support.',
    ],
    forWho: [
      { t: 'Customer support teams', d: 'A chatbot on your website or WhatsApp that answers common questions day and night.' },
      { t: 'Document-heavy businesses', d: 'Ask questions across your own files, or pull data out of invoices and forms automatically.' },
      { t: 'Growing operations', d: 'Forecast demand or spot patterns in your data to plan ahead.' },
    ],
    faqs: [
      { q: 'Can you build a chatbot for WhatsApp?', a: 'Yes. We build LLM chatbots for websites and WhatsApp that answer from your own information and hand over to a person when needed.' },
      { q: 'Is my business data safe?', a: 'We only use your data for your project, keep access limited, and agree with you upfront where it is stored and which AI services process it.' },
      { q: 'Do I need a lot of data to start?', a: 'Not always. Chatbots and document Q&A can work with the documents you already have. Prediction models need some history, which we check during the discovery call.' },
      { q: 'How is the price decided?', a: 'After a free discovery call we send a written scope with one fixed price for the build. Any ongoing AI service usage costs are explained before you approve.' },
    ],
  },
  automation: {
    path: '/services/workflow-automation/',
    name: 'Workflow Automation',
    seoTitle: 'Workflow Automation & CRM Integration in Kochi | Tezco Technology Studio',
    seoDescription: 'Workflow automation and CRM integrations in Kochi, Kerala. Connect your tools, sync data and send WhatsApp and email alerts automatically. Fixed price.',
    h1: ['Workflow automation', 'and CRM integration'],
    lead: 'Connect your tools and remove repetitive work, so your team spends its time on customers instead of copying data between systems.',
    about: [
      'If someone on your team copies leads from a form into a spreadsheet, sends the same follow-up message every day, or builds the same report every week, that work can usually be automated.',
      'We map how work moves through your business, then connect your website, CRM, WhatsApp, email and databases so data flows on its own and the right people are notified. Fixed price, weekly progress and 30 days of free support.',
    ],
    forWho: [
      { t: 'Sales teams', d: 'New leads land in your CRM automatically, with instant WhatsApp or email alerts.' },
      { t: 'Operations', d: 'Orders, bookings and stock stay in sync across the tools you use.' },
      { t: 'Managers', d: 'Reports and dashboards that update themselves instead of being built by hand.' },
    ],
    faqs: [
      { q: 'Which tools can you connect?', a: 'Most tools with an API: CRMs, Google Sheets, accounting software, payment gateways, WhatsApp, email and databases. We confirm what is possible on the discovery call.' },
      { q: 'Do we need to change the software we use?', a: 'Usually not. We connect the tools you already have, and only suggest a change when a tool cannot be connected.' },
      { q: 'Can you set up a CRM for us?', a: 'Yes. We can set up and configure a CRM, import your existing data and connect it to your website and messaging.' },
      { q: 'How much does automation cost?', a: 'Each workflow is scoped on a free discovery call and priced at one fixed amount before work starts.' },
    ],
  },
  college: {
    path: '/services/final-year-projects/',
    name: 'Final Year College Projects',
    seoTitle: 'Final Year Projects in Kerala from ₹2,999 | Tezco Technology Studio',
    seoDescription: 'Final year projects for B.Tech, MCA, BCA and B.Sc students in Kerala from ₹2,999, with full source code, IEEE documentation and viva preparation.',
    h1: ['Final year projects', 'in Kerala'],
    lead: 'Final year projects with full working source code, IEEE-format documentation and viva preparation, so you can submit and present with confidence.',
    about: [
      'We help students choose a project that suits their branch and interests, then build it with them in a modern stack such as Python, React, Flutter or TensorFlow, covering web, mobile, machine learning and AI.',
      'You get the complete source code, the report in IEEE format, presentation support and walkthrough sessions where we explain how the code works, so you can answer questions in your viva. Projects start from ₹2,999.',
    ],
    forWho: [
      { t: 'B.Tech and B.E. students', d: 'Projects in CSE, IT, ECE and other branches, including AI and machine learning.' },
      { t: 'MCA, BCA and B.Sc students', d: 'Web, mobile and data projects that match your syllabus.' },
      { t: 'Student teams', d: 'Group projects with work split clearly so every member can explain their part.' },
    ],
    faqs: [
      { q: 'How much does a final year project cost?', a: 'Projects start from ₹2,999. The final price depends on the topic and features, and is fixed before we start.' },
      { q: 'Will I get the full source code?', a: 'Yes. You get the complete, working source code along with instructions to run it.' },
      { q: 'Do you provide the project report?', a: 'Yes. We provide documentation and a report in IEEE format, plus help with your presentation.' },
      { q: 'Will you help me prepare for the viva?', a: 'Yes. We run walkthrough sessions that explain how the project and code work, and help you prepare for common viva questions.' },
    ],
  },
};
