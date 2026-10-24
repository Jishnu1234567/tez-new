import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Build-time render of one page to static HTML (used by scripts/prerender.mjs).
export function render(page) {
  return renderToString(<App page={page} />);
}
