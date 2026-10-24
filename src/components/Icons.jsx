const base = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Arrow = (p) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const Play = (p) => (<svg {...base} {...p}><path d="M8 5v14l11-7z" fill="currentColor" stroke="none" /></svg>);
export const Spark = (p) => (<svg {...base} {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>);
export const Check = (p) => (<svg {...base} {...p}><path d="m5 12 4 4 10-10" /></svg>);
export const Left = (p) => (<svg {...base} {...p}><path d="M15 6l-6 6 6 6" /></svg>);
export const Right = (p) => (<svg {...base} {...p}><path d="m9 6 6 6-6 6" /></svg>);
export const Quote = (p) => (<svg width="28" height="28" viewBox="0 0 24 24" {...p}><path fill="currentColor" d="M7 7h4v4c0 3-1.5 5-4 6l-.8-1.4C7.6 14.8 8.4 13.6 8.5 12H7zm7 0h4v4c0 3-1.5 5-4 6l-.8-1.4c1.4-.8 2.2-2 2.3-3.6H14z" /></svg>);
export const Menu = (p) => (<svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = (p) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const X = (p) => (<svg {...base} {...p}><path d="M4 4l16 16M20 4 4 20" /></svg>);
export const LinkedIn = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></svg>);
export const Insta = (p) => (<svg {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></svg>);
export const Layers = (p) => (<svg {...base} {...p}><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></svg>);
export const Users = (p) => (<svg {...base} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4-6" /></svg>);
export const Headset = (p) => (<svg {...base} {...p}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>);
export const Bolt = (p) => (<svg {...base} {...p}><path d="M13 3 4 14h7l-1 7 9-11h-7z" /></svg>);
export const Grid = (p) => (<svg {...base} {...p}><rect x="4" y="4" width="6" height="6" rx="1.5" /><rect x="14" y="4" width="6" height="6" rx="1.5" /><rect x="4" y="14" width="6" height="6" rx="1.5" /><rect x="14" y="14" width="6" height="6" rx="1.5" /></svg>);
export const Code = (p) => (<svg {...base} {...p}><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></svg>);
export const Cloud = (p) => (<svg {...base} {...p}><path d="M7 18a4.5 4.5 0 0 1-.5-9A6 6 0 0 1 18 9.5 4.3 4.3 0 0 1 17.5 18z" /></svg>);
export const Mail = (p) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m4 7 8 6 8-6" /></svg>);
export const Phone = (p) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>);
export const WhatsApp = (p) => (<svg {...base} {...p}><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1a4 4 0 0 1-2-2l1-1-1-2z" fill="currentColor" stroke="none" /></svg>);
export const Mobile = (p) => (<svg {...base} {...p}><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></svg>);
export const Cap = (p) => (<svg {...base} {...p}><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></svg>);
export const Search = (p) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" /></svg>);

// Official Tezco brand assets (copied from "Brand Identity/Logos" into public/brand).
export const brand = {
  logomark: { orange: '/brand/logomark-orange.webp', white: '/brand/logomark-white.webp', black: '/brand/logomark-black.webp' },
  wordmark: { orange: '/brand/wordmark-orange-sm.webp', white: '/brand/wordmark-white-sm.webp', black: '/brand/wordmark-black-sm.webp' },
  // Full-resolution wordmark for the giant footer lettering.
  wordmarkLarge: { orange: '/brand/wordmark-orange.png' },
};

// The "TE" logomark. Its artwork ratio is 1527 x 1395.
export const Logo = ({ size = 28, color = 'orange' }) => (
  <img src={brand.logomark[color]} alt="" aria-hidden="true" className="logomark"
    width={size} height={Math.round(size * 1395 / 1527)} />
);

// The "TEZCO" wordmark. Its artwork ratio is 2699 x 459.
export const Wordmark = ({ height = 18, color = 'white', className = '' }) => (
  <img src={brand.wordmark[color]} alt="Tezco" className={`wordmark ${className}`}
    height={height} width={Math.round(height * 2699 / 459)} />
);
