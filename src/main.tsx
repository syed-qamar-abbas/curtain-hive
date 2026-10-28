import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

const root = document.getElementById('root')!;
const app = <BrowserRouter><App /></BrowserRouter>;
// Query-dependent screens are rendered from their URL in the browser.
if (root.hasChildNodes() && root.dataset.renderedPath === window.location.pathname && !window.location.search) hydrateRoot(root, app);
else createRoot(root).render(app);
