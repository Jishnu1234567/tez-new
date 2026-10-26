// Legal pages. Written for Tezco's current setup: no accounts, no payments on the site,
// no analytics or advertising cookies; enquiries arrive by email, phone or WhatsApp.
// Have a lawyer review both documents before launch and whenever the setup changes
// (for example if analytics, a CRM or online payments are added).
import { company } from './content.js';

export const LEGAL_UPDATED = '26 October 2026';

export const privacy = {
  slug: 'privacy',
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  intro: `This policy explains what personal data ${company.legalName} ("Tezco", "we", "us") collects through this website and when you contact us, why we use it, and the choices you have. It is written to meet the Information Technology Act, 2000 and its rules, and the Digital Personal Data Protection Act, 2023.`,
  sections: [
    {
      id: 'who-we-are', title: 'Who we are',
      body: [
        `${company.legalName} (CIN ${company.cin}) is a software engineering company registered in India, with its office at ${company.address}.`,
        `We are the data fiduciary for the personal data described in this policy. You can reach us at ${company.email} or ${company.phone}.`,
      ],
    },
    {
      id: 'what-we-collect', title: 'What we collect',
      body: ['We only collect what we need to answer you and to deliver projects:'],
      list: [
        'Contact details you give us, such as your name, email address, phone number and company name, including through the project brief form on our Contact page.',
        'Project information you choose to share, such as your idea, requirements, timeline and budget.',
        'Messages you send us by email, phone or WhatsApp, and any files you attach.',
        'Basic technical data that our hosting provider records automatically when you visit, such as IP address, browser type, pages requested and the time of the request. This is used for security and to keep the site running.',
      ],
      after: ['This website does not use advertising or analytics cookies, and it does not ask you to create an account. We do not knowingly collect sensitive personal data such as financial, health or biometric information through the website.'],
    },
    {
      id: 'how-we-use', title: 'How we use your data',
      list: [
        'To reply to your enquiry, prepare a proposal and arrange a discovery call.',
        'To deliver, support and invoice the work we agree with you.',
        'To keep the website secure and working properly.',
        'To meet our legal, tax and accounting obligations.',
      ],
      after: ['We do not sell your personal data, and we do not use it for automated decision-making or profiling.'],
    },
    {
      id: 'consent', title: 'Consent and legal basis',
      body: [
        'When you contact us, you give your personal data voluntarily and consent to us using it for the purposes above. You can withdraw your consent at any time by writing to us. Withdrawing consent does not affect anything we did before, and we may still keep data where the law requires it.',
        'Where we have a signed agreement with you, we also use your data to perform that agreement.',
      ],
    },
    {
      id: 'sharing', title: 'Who we share it with',
      body: ['We share personal data only with service providers who help us run our business, and only as much as they need:'],
      list: [
        'Messaging and email providers, for example WhatsApp (Meta) when you contact us on WhatsApp, and our email service provider.',
        'Web3Forms, which delivers the contact form on this website to our inbox. It processes the details you enter only to deliver them to us.',
        'Our website hosting provider, which serves the site and keeps its technical logs.',
        'Professional advisers such as accountants and lawyers, under a duty of confidentiality.',
        'Government or law-enforcement authorities, where the law requires it.',
      ],
      after: ['Some of these providers may store data outside India. Where that happens, we rely on their published privacy and security commitments and transfer data only as permitted under Indian law.'],
    },
    {
      id: 'retention', title: 'How long we keep it',
      body: [
        'We keep enquiry details for up to 24 months after our last contact, so we can follow up on your request. If you become a client, we keep project and billing records for as long as the agreement runs and for up to 8 years afterwards, as required for tax and accounting. After that, we delete or anonymise the data.',
      ],
    },
    {
      id: 'security', title: 'How we protect it',
      body: [
        'We use reasonable security practices, including encrypted connections (HTTPS), access limited to the people who need it, and secure, access-controlled storage for project files. No system is perfectly secure, but if we become aware of a personal data breach that affects you, we will inform you and the Data Protection Board of India as the law requires.',
      ],
    },
    {
      id: 'your-rights', title: 'Your rights',
      body: ['Under the Digital Personal Data Protection Act, 2023 you have the right to:'],
      list: [
        'Ask for a summary of the personal data we hold about you and how we use it.',
        'Ask us to correct, complete or update your data.',
        'Ask us to erase your data when it is no longer needed, unless we must keep it by law.',
        'Withdraw your consent at any time.',
        'Nominate another person to exercise your rights if you die or become unable to do so.',
        'Raise a grievance with us, and if you are not satisfied with our answer, complain to the Data Protection Board of India.',
      ],
      after: [`To use any of these rights, email ${company.email}. We will reply within 30 days.`],
    },
    {
      id: 'children', title: 'Children',
      body: [
        'Our services are meant for businesses and adults. If you are under 18, for example a student asking about a college project, please contact us with the consent of a parent or guardian. If we learn that we have collected data from a child without that consent, we will delete it.',
      ],
    },
    {
      id: 'grievance', title: 'Grievance Officer',
      body: [
        `If you have a question or complaint about how we handle your personal data, contact our Grievance Officer at ${company.email}, or write to ${company.legalName}, ${company.address}. We will acknowledge your complaint within 48 hours and aim to resolve it within 30 days.`,
      ],
    },
    {
      id: 'changes', title: 'Changes to this policy',
      body: [
        'We may update this policy when our services or the law change. The date at the top shows when it was last updated. If the changes are significant, we will highlight them on this page.',
      ],
    },
  ],
};

export const terms = {
  slug: 'terms',
  eyebrow: 'Legal',
  title: 'Terms of Service',
  intro: `These terms apply to your use of this website and to any enquiry you make to ${company.legalName} ("Tezco", "we", "us"). By using the website you agree to them. Project work is always governed by a separate written agreement.`,
  sections: [
    {
      id: 'about', title: 'About us',
      body: [`${company.legalName} (CIN ${company.cin}) is a company registered in India, with its office at ${company.address}. Contact: ${company.email}, ${company.phone}.`],
    },
    {
      id: 'website', title: 'Using this website',
      list: [
        'You may browse the website and share links to it for personal or business use.',
        'You must not misuse the website, for example by trying to break its security, overload it, scrape it at scale or use it to send spam.',
        'We try to keep information on the website accurate and up to date, but it is provided for general information and may change without notice.',
      ],
    },
    {
      id: 'quotes', title: 'Quotes, proposals and projects',
      list: [
        'Prices, timelines and features described on the website are indicative. They become binding only when they are written into a proposal or agreement that both sides accept.',
        'Our fixed-price commitment applies to the scope written in that agreement. Changes to the scope are discussed and priced before any extra work starts.',
        'Payment terms, milestones, deliverables, acceptance and support (including the 30 days of free support after launch) are set out in each project agreement.',
        'If anything in a signed project agreement conflicts with these terms, the agreement wins.',
      ],
    },
    {
      id: 'ip', title: 'Intellectual property',
      list: [
        'The website, its design, text, graphics and the Tezco name and logo belong to Tezco or its licensors. You may not copy or reuse them without our written permission.',
        'Ownership of the software, designs and other work we create for a client is set out in that client\'s project agreement. Unless the agreement says otherwise, ownership passes to the client once full payment is received.',
        'Project screenshots in our portfolio are shown with our clients\' permission and remain the property of their owners.',
      ],
    },
    {
      id: 'college', title: 'College and academic projects',
      body: [
        'We provide college projects, source code, documentation and viva preparation as learning and reference material. Students are responsible for following their institution\'s rules on academic integrity and for how they submit or present the work.',
      ],
    },
    {
      id: 'third-party', title: 'Third-party links and services',
      body: [
        'The website links to services we do not control, such as WhatsApp and our clients\' live websites. Their own terms and privacy policies apply, and we are not responsible for their content or availability.',
      ],
    },
    {
      id: 'liability', title: 'Disclaimer and limitation of liability',
      body: [
        'The website is provided "as is". To the extent the law allows, we are not liable for any indirect or consequential loss arising from your use of the website, or from relying on its content. Our liability for project work is limited as set out in the relevant project agreement. Nothing in these terms limits liability that cannot be limited under Indian law.',
      ],
    },
    {
      id: 'privacy', title: 'Privacy',
      body: ['How we handle your personal data is explained in our Privacy Policy.'],
      link: { label: 'Read the Privacy Policy', href: '/privacy/' },
    },
    {
      id: 'law', title: 'Governing law',
      body: ['These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at Ernakulam, Kerala.'],
    },
    {
      id: 'changes', title: 'Changes to these terms',
      body: ['We may update these terms from time to time. The date at the top shows when they were last updated. Continuing to use the website after a change means you accept the updated terms.'],
    },
  ],
};

export const notFound = {
  code: '404',
  title: 'This page took a different route.',
  text: 'The page you are looking for has moved or no longer exists. Try one of these instead, or tell us what you were after.',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services/' },
    { label: 'Portfolio', href: '/work/' },
    { label: 'Process', href: '/process/' },
    { label: 'About', href: '/about/' },
  ],
};
