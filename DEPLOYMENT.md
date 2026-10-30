# Deploying the Tezco website

## Build

```bash
npm ci
npm run build          # client build + pre-render + sitemap.xml, robots.txt, llms.txt
```

Upload the contents of `dist/` to any static host. If the live domain is not
`https://thetezco.com`, build with `SITE_URL=https://your-domain npm run build`
and update the host name in `public/.htaccess`.

The build already includes:
- Pre-rendered HTML for every page, so search engines, AI assistants and link previews see full content.
- Per-page title, description, canonical URL, Open Graph and Twitter cards (`seo.config.js`).
- Structured data: Organization and ProfessionalService, WebSite, breadcrumbs, services, HowTo (process), FAQ, portfolio work.
- `sitemap.xml`, `robots.txt` (AI crawlers allowed), `llms.txt`, `site.webmanifest`, a 1200x630 share image.
- A 404 page, Privacy Policy and Terms of Service.
- Security and cache headers for Netlify or Cloudflare Pages (`_headers`) and Apache or cPanel (`.htaccess`).

## Before launch
- [ ] Contact form: get a free Web3Forms access key for the enquiry inbox, set `VITE_WEB3FORMS_KEY` on the host (or in `.env`), rebuild, then send one test brief from `/contact/` and confirm it arrives.
- [ ] Have a lawyer review `/privacy/` and `/terms/` (text lives in `src/data/legal.js`).
- [ ] Confirm the rights to the brief-supplied media still in use: the editor panel image (Portfolio footer), the lighthouse video (Portfolio hero) and the circuit-head video (Process hero).
- [ ] Confirm Element Sound Studio and Ranjith Meleppat are happy to be shown in the portfolio.
- [ ] Point the domain at the host and turn on HTTPS.
- [ ] Check that `/does-not-exist` shows the 404 page.

## After launch
- [ ] Google Search Console: verify the domain and submit `https://thetezco.com/sitemap.xml`.
- [ ] Bing Webmaster Tools: import from Search Console (this also feeds ChatGPT search and Copilot).
- [ ] Google Business Profile: create or claim it with the same name, address and phone as the site.
- [ ] Test sharing a link on WhatsApp and LinkedIn to see the preview card.
- [ ] Run PageSpeed Insights on the home page on mobile, and the Rich Results Test on `/services/`.
- [ ] Add any new client project to `src/data/content.js` (work) and `src/data/pages.js` (caseStudies).
