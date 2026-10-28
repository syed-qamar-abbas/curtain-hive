import assert from 'node:assert/strict';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

// Run after npm run build. The production configuration is compiled separately;
// this check never changes the client-preview deployment in dist.
const preview = await import(pathToFileURL(resolve('.sites-runtime/ssr/entry-server.js')).href);
const routes = new Set(preview.allPagePaths);
const failures = [];
for (const route of routes) {
  const html = readFileSync(join('dist', route, 'index.html'), 'utf8');
  const meta = preview.pageMetadata(route);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, route);
  assert(html.includes(`href="${meta.canonical}"`), route);
  const schema = JSON.parse(html.match(/<script id="page-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const ids = schema['@graph'].map(item => item['@id']);
  assert.equal(new Set(ids).size, ids.length, `${route}: duplicate schema identity`);
  for (const match of html.matchAll(/href="(\/[^"\s]*)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    const url = new URL(href, preview.siteOrigin);
    const target = url.pathname;
    if (routes.has(target) || existsSync(join('dist', target))) continue;
    failures.push({ from: route, to: href });
  }
}
assert.deepEqual(failures, [], 'Broken internal links in generated HTML');
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, [...routes].filter(path => preview.pageMetadata(path).indexable).length);
assert(readFileSync('dist/404.html', 'utf8').includes('noindex,follow'));
await build({ define: { 'import.meta.env.VITE_SITE_ORIGIN': JSON.stringify('https://curtainhive.com'), 'import.meta.env.VITE_INDEXABLE': JSON.stringify('true') }, build: { ssr: 'src/entry-server.tsx', outDir: '.sites-runtime/seo-production', copyPublicDir: false, emptyOutDir: true } });
const production = await import(pathToFileURL(resolve('.sites-runtime/seo-production/entry-server.js')).href);
assert.equal(production.siteOrigin, 'https://curtainhive.com');
assert.equal(production.siteIndexable, true);
for (const article of production.insights) {
  const meta = production.pageMetadata(`/insights/${article.slug}/`);
  assert(meta.indexable && meta.canonical.startsWith('https://curtainhive.com/insights/'));
  const schema = meta.structuredData['@graph'].find(item => item['@type'] === 'BlogPosting');
  assert.equal(schema.wordCount, production.insightWordCount(article));
  assert.equal(schema.citation.length, 3);
}
for (const path of ['/cart/', '/checkout/', '/wishlist/', '/news-blog/', '/does-not-exist/']) assert.equal(production.pageMetadata(path).indexable, false, path);
assert.equal(production.pageMetadata('/insights/', '?topic=curtains').indexable, false);
assert.equal(production.pageMetadata('/insights/', '?topic=curtains').canonical, 'https://curtainhive.com/insights/');
const result = { passed: true, routes: routes.size, brokenInternalLinks: failures, previewIndexable: preview.siteIndexable, productionOrigin: production.siteOrigin, productionIndexableRoutes: production.allPagePaths.filter(path => production.pageMetadata(path).indexable).length, articles: production.insights.map(article => ({ slug: article.slug, words: production.insightWordCount(article) })) };
mkdirSync('.sites-runtime/insights-qa', { recursive: true });
writeFileSync('.sites-runtime/insights-qa/seo-results.json', JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
