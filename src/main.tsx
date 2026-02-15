import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// #region agent log
const DEBUG_LOG = (location: string, message: string, data: Record<string, unknown>, hypothesisId: string) => {
  fetch('http://127.0.0.1:7243/ingest/15d72b18-4db9-409d-a404-3915799ed5f7', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location, message, data, timestamp: Date.now(), hypothesisId }) }).catch(() => {});
};
// #endregion

try {
  // #region agent log
  DEBUG_LOG('main.tsx:entry', 'main.tsx entered', {}, 'H5');
  // #endregion
  const rootElement = document.getElementById('root');
  // #region agent log
  DEBUG_LOG('main.tsx:root', 'root element', { hasRoot: !!rootElement }, 'H1');
  // #endregion
  if (!rootElement) {
    throw new Error('Could not find root element to mount to');
  }

  const root = ReactDOM.createRoot(rootElement);
  // #region agent log
  DEBUG_LOG('main.tsx:before-render', 'about to render App', {}, 'H1');
  // #endregion
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // #region agent log
  DEBUG_LOG('main.tsx:after-render', 'App render scheduled', {}, 'H1');
  // #endregion
} catch (e) {
  // #region agent log
  DEBUG_LOG('main.tsx:catch', 'mount error', { err: String(e), name: e instanceof Error ? e.name : '' }, 'H1');
  // #endregion
  throw e;
}
