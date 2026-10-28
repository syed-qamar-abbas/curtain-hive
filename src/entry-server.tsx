import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App';
export { pageMetadata, allPagePaths, siteOrigin, siteIndexable } from './seo';
export { insights, insightWordCount, insightEditorial } from './insights-data';

export function render(path: string) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>);
}
