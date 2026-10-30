# Tezco website

Marketing website for **Tezco** (Technical Expertz Information Technology Pvt. Ltd.), a software engineering company in Aluva, Kochi, building SaaS platforms, websites, mobile apps, AI solutions and automation.

Built with React 18 and Vite as a multi-page static site. Every page is pre-rendered to HTML at build time, so it loads fast, works on any static host and is fully readable by search engines and AI assistants.

## Pages

| Path | Page |
|---|---|
| `/` | Home |
| `/about/` | About |
| `/services/` | Services |
| `/work/` | Portfolio |
| `/process/` | Process |
| `/contact/` | Contact |
| `/privacy/` | Privacy Policy |
| `/terms/` | Terms of Service |
| `/404.html` | Not found |

## Getting started

Requires Node.js 18 or later.

```bash
npm ci
npm run dev       # local development at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

`npm run build` runs three steps: the client build, a server render of every page, and `scripts/prerender.mjs`, which writes the pre-rendered HTML plus `sitemap.xml`, `robots.txt` and `llms.txt`.

## Project structure

```
index.html, */index.html   One HTML entry per page (head is filled from seo.config.js)
seo.config.js              Titles, descriptions, social cards, structured data per page
src/data/                  All site copy: content.js, pages.js, legal.js
src/components/            Page sections and shared UI
src/pages/                 Page components
src/pageTheme.js           Navbar theme per page
src/fonts.generated.js     Self-hosted @font-face rules (from scripts/fetch-fonts.mjs)
public/                    Images, videos, fonts, icons, _headers, .htaccess
scripts/                   prerender.mjs, fetch-fonts.mjs
```

## Contact form

The project brief form on `/contact/` delivers enquiries to your inbox through [Web3Forms](https://web3forms.com), with no server to run.

1. Go to web3forms.com, enter the inbox that should receive enquiries (for example build@thetezco.com) and copy the access key it emails you.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY=your-key`. On Netlify, Vercel or Cloudflare Pages, add the same variable in the project settings instead.
3. Rebuild with `npm run build`.

Without a key, or if the service is unreachable, the form keeps what the visitor typed and offers to send it by email or WhatsApp instead, so no enquiry is lost. The form validates every field, blocks spam bots with a hidden field and asks for consent under the Privacy Policy.

## Editing content

- **Text, services, FAQ, portfolio:** `src/data/content.js` and `src/data/pages.js`
- **Privacy Policy and Terms:** `src/data/legal.js`
- **Page titles, descriptions and search data:** `seo.config.js`
- **New portfolio project:** add it to `work.projects` (content.js), `caseStudies` and `portfolio.caseStudies` (pages.js), and an image in `public/images/work/`

## SEO, AEO and GEO

- Pre-rendered HTML, canonical URLs, Open Graph and Twitter cards on every page
- JSON-LD structured data: Organization and ProfessionalService, WebSite, breadcrumbs, services, HowTo, FAQ and portfolio sites
- `sitemap.xml`, `robots.txt` (AI crawlers allowed) and `llms.txt`
- Self-hosted fonts, no third-party requests

The production domain defaults to `https://thetezco.com`. To build for another domain:

```bash
SITE_URL=https://example.com npm run build
```

## Deployment

Upload `dist/` to any static host. Security and caching headers are included for Netlify or Cloudflare Pages (`public/_headers`) and Apache or cPanel (`public/.htaccess`). See [DEPLOYMENT.md](DEPLOYMENT.md) for the launch checklist.

## Credits

Stock photography from [Unsplash](https://unsplash.com/license); individual sources are listed in `public/images/stock/CREDITS.txt`.

© 2026 Technical Expertz Information Technology Private Limited. All rights reserved.
