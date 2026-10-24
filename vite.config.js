import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { headHtml } from './seo.config.js';

// Multi-page build: every page is its own HTML file (/, /services/, /work/, ...),
// so it works on any static host without rewrite rules.
const page = (p) => resolve(__dirname, p, 'index.html');

// Fills each page's <!--head:key--> placeholder with its title, meta tags, social card,
// fonts, hero preload and structured data from seo.config.js.
const seoHead = () => ({
  name: 'tezco-seo-head',
  transformIndexHtml: {
    order: 'pre',
    handler(html) {
      return html.replace(/<!--head:(\w+)-->/, (_, key) => headHtml(key));
    },
  },
});

export default defineConfig({
  plugins: [react(), seoHead()],
  build: {
    // Modern browsers only; keeps the bundle lean.
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        services: page('services'),
        work: page('work'),
        process: page('process'),
        about: page('about'),
        contact: page('contact'),
        privacy: page('privacy'),
        terms: page('terms'),
        notfound: resolve(__dirname, '404.html'),
      },
    },
  },
});
