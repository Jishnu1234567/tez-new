import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App page={root.dataset.page || 'home'} />
  </React.StrictMode>
);

// Production pages are pre-rendered at build time (scripts/prerender.mjs), so React
// hydrates the existing HTML. In development the root is empty and React renders it.
if (root.firstElementChild) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
