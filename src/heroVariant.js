// Temporary switch for comparing hero layouts.
// Default: full-width zigzag layout. Add ?hero=classic to the URL for the centred layout.
export const heroLayout =
  typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('hero') === 'classic' ? 'classic' : 'zig';

// The zigzag hero spans the full screen width, so the navbar widens to the same edges.
if (typeof document !== 'undefined') document.documentElement.classList.toggle('hero-wide', heroLayout === 'zig');

// EXPERIMENT: show "Who we are" first and the BUILD / WHAT COUNTS hero second.
// Set to false to restore the original order (hero first). ?order=hero also restores it for a quick compare.
export const aboutFirst =
  typeof window === 'undefined' || new URLSearchParams(window.location.search).get('order') !== 'hero';
if (typeof document !== 'undefined') document.documentElement.classList.toggle('about-first', aboutFirst);
