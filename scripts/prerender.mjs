// Post-build step (run by `npm run build`):
//  1. Renders every page to static HTML so search engines, AI crawlers and link previews
//     see the full content without running JavaScript. React then hydrates it.
//  2. Adds the page's theme classes to <html> so the first paint is already correct.
//  3. Writes sitemap.xml, robots.txt and llms.txt from seo.config.js.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pages, SITE } from '../seo.config.js';
import { htmlClasses } from '../src/pageTheme.js';
import { company, services } from '../src/data/content.js';
import { faq, caseStudies } from '../src/data/pages.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const FILES = {
  home: 'index.html', services: 'services/index.html', work: 'work/index.html', process: 'process/index.html',
  about: 'about/index.html', contact: 'contact/index.html', privacy: 'privacy/index.html', terms: 'terms/index.html', notfound: '404.html',
};

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

let failed = 0;
for (const [key, file] of Object.entries(FILES)) {
  const path = resolve(dist, file);
  let html = await readFile(path, 'utf8');
  let body = '';
  try {
    body = render(key);
  } catch (err) {
    failed += 1;
    console.error(`  prerender failed for ${key}:`, err.message);
  }
  html = html
    .replace(/<html lang="en-IN">/, `<html lang="en-IN" class="${htmlClasses(key).join(' ')}">`)
    .replace(`<div id="root" data-page="${key}"></div>`, `<div id="root" data-page="${key}">${body}</div>`);
  await writeFile(path, html);
  console.log(`  prerendered ${file.padEnd(20)} ${(body.length / 1024).toFixed(1)} kB`);
}
await rm(ssrDir, { recursive: true, force: true });

// ---- sitemap.xml ----
const today = new Date().toISOString().slice(0, 10);
const PRIORITY = { home: '1.0', services: '0.9', work: '0.8', process: '0.8', about: '0.7', contact: '0.8', privacy: '0.3', terms: '0.3' };
const urls = Object.entries(pages).filter(([, p]) => !p.noindex).map(([key, p]) => `  <url>
    <loc>${SITE}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${key === 'privacy' || key === 'terms' ? 'yearly' : 'monthly'}</changefreq>
    <priority>${PRIORITY[key] || '0.5'}</priority>
  </url>`).join('\n');
await writeFile(resolve(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

// ---- robots.txt (search engines and AI assistants are welcome) ----
await writeFile(resolve(dist, 'robots.txt'), `# Tezco - ${SITE}
User-agent: *
Allow: /
Disallow: /404.html

# AI search and assistant crawlers are explicitly allowed (GEO).
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

// ---- llms.txt: a plain summary for AI assistants (https://llmstxt.org) ----
const cs = Object.entries(caseStudies).map(([name, c]) => `- ${name}: ${c.industry}. ${c.services.join(', ')}. Launched ${c.year}. Live at ${c.url}`).join('\n');
await writeFile(resolve(dist, 'llms.txt'), `# Tezco

> Tezco (${company.legalName}, CIN ${company.cin}) is a software engineering company in Aluva, Ernakulam, Kerala, India, founded in ${company.founded}. It designs and builds SaaS platforms, websites, mobile apps, AI solutions and workflow automation for growing businesses, and final year projects for students. Every project has a fixed price agreed upfront, weekly progress updates and 30 days of free support after launch.

## Key facts
- Website: ${SITE}/
- Email: ${company.email}
- Phone and WhatsApp: ${company.phone}
- Address: ${company.address}
- Hours: ${company.hours}
- Pricing: fixed price per project after a free 30-minute discovery call; college projects from ₹2,999
- Typical reply time: within one working day

## Services
${services.items.map((s) => `- [${s.title}](${SITE}/services/#${s.slug}): ${s.text}`).join('\n')}

## Process
${services.process.steps.map((s) => `${s.n}. ${s.name} (${s.note}): ${s.text}`).join('\n')}

## Portfolio
${cs}

## FAQ
${faq.items.map((f) => `- ${f.q} ${f.a}`).join('\n')}

## Pages
${Object.values(pages).filter((p) => !p.noindex).map((p) => `- [${p.name}](${SITE}${p.path}): ${p.description}`).join('\n')}
`);

console.log(`  wrote sitemap.xml, robots.txt, llms.txt for ${SITE}`);
if (failed) { console.error(`${failed} page(s) failed to prerender`); process.exit(1); }
