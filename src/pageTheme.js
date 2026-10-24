// Page-level theme classes on <html>. Shared by the app (App.jsx, Navbar.jsx) and the
// build-time prerender script, so the first paint already has the right navbar colours.

export const PAGE_KEYS = ['home', 'services', 'work', 'process', 'about', 'contact', 'privacy', 'terms', 'notfound'];

// Hero is light, so the navbar starts with dark text.
export const LIGHT_HERO = ['home', 'services', 'process', 'work', 'about', 'privacy', 'terms'];
// Once scrolled, the navbar becomes a light frosted bar with dark text.
export const LIGHT_BAR = ['home', 'services', 'process', 'about', 'work', 'privacy', 'terms'];

export function htmlClasses(page, { wide = true, aboutFirst = true } = {}) {
  return [
    wide && 'hero-wide',
    aboutFirst && 'about-first',
    `page-${page}`,
    page === 'home' && 'hero-light',
    LIGHT_HERO.includes(page) && page !== 'home' && 'hero-light-page',
    LIGHT_BAR.includes(page) && 'nav-light',
  ].filter(Boolean);
}

export function applyHtmlClasses(page) {
  if (typeof document === 'undefined') return;
  const el = document.documentElement;
  const keep = ['hero-wide', 'about-first'].filter((c) => el.classList.contains(c));
  const managed = ['hero-light', 'hero-light-page', 'nav-light', ...PAGE_KEYS.map((k) => `page-${k}`)];
  el.classList.remove(...managed);
  htmlClasses(page, { wide: keep.includes('hero-wide'), aboutFirst: keep.includes('about-first') })
    .filter((c) => managed.includes(c))
    .forEach((c) => el.classList.add(c));
}

// Pages with a dark hero get the dark glass navbar.
export const NAV_DARK = ['contact', 'notfound'];
