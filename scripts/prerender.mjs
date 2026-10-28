import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';
import assert from 'node:assert/strict';

// Compile the same React app for build-time HTML. This bundle is never deployed.
await build({ build: { ssr: 'src/entry-server.tsx', outDir: '.sites-runtime/ssr', copyPublicDir: false, emptyOutDir: true } });
const { render, pageMetadata, allPagePaths, siteOrigin, siteIndexable, insights, insightWordCount, insightEditorial } = await import(pathToFileURL(resolve('.sites-runtime/ssr/entry-server.js')).href);
const base = readFileSync('dist/index.html', 'utf8');
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll("'", '&#x27;');
const schemaJson = value => JSON.stringify(value).replaceAll('<', '\\u003c');

function htmlFor(path) {
  const meta = pageMetadata(path);
  const metadata = `<link rel="canonical" href="${escape(meta.canonical)}"/>` +
    Object.entries({ 'og:title': meta.title, 'og:description': meta.description, 'og:url': meta.canonical, 'og:image': meta.image, 'og:type': meta.type, 'og:site_name': 'Curtain Hive', 'og:locale': 'en_PK' }).map(([name, value]) => `<meta property="${name}" content="${escape(value)}"/>`).join('') +
    Object.entries({ 'twitter:card': 'summary_large_image', 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': meta.image }).map(([name, value]) => `<meta name="${name}" content="${escape(value)}"/>`).join('') +
    `<script id="page-schema" type="application/ld+json">${schemaJson(meta.structuredData)}</script>`;
  return base.replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?\s*>/, `<meta name="description" content="${escape(meta.description)}"/>`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/?\s*>/, `<meta name="robots" content="${meta.robots}"/>`)
    .replace('</head>', `${metadata}</head>`)
    .replace('<div id="root"></div>', () => `<div id="root" data-rendered-path="${escape(path)}">${render(path)}</div>`);
}

const routes = {};
for (const path of allPagePaths) {
  const dir = join('dist', path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), htmlFor(path));
  routes[path] = pageMetadata(path).title.replace(/ \| Curtain Hive$/, '');
}
writeFileSync('dist/404.html', htmlFor('/not-found/'));
const redirects = { '/about/': '/about-us/', '/services/': '/our-services/', '/contact/': '/contact-us/', '/blog/': '/news-blog/' };
for (const [path, target] of Object.entries(redirects)) {
  const dir = join('dist', path);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,follow"><meta http-equiv="refresh" content="0;url=${target}"><title>Continue to Curtain Hive</title><link rel="canonical" href="${siteOrigin}${target}"></head><body><a href="${target}">Continue to Curtain Hive</a></body></html>`);
}
writeFileSync('dist/_redirects', Object.entries(redirects).map(([path, target]) => `${path} ${target} 301`).join('\n') + '\n' + allPagePaths.filter(path => path !== '/').map(path => `${path.slice(0, -1)} ${path} 301`).join('\n') + '\n/* /404.html 404\n');
const indexablePaths = allPagePaths.filter(path => pageMetadata(path).indexable);
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n${siteIndexable ? `Sitemap: ${siteOrigin}/sitemap.xml\n` : '# Client preview: pages use noindex,follow; allow crawling so that directive can be read.\n'}`);
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexablePaths.map(path => {
  const article = insights.find(item => `/insights/${item.slug}/` === path);
  return `<url><loc>${escape(siteOrigin + path)}</loc>${article ? `<lastmod>${insightEditorial(article).dateModified}</lastmod>` : ''}</url>`;
}).join('')}</urlset>`);
writeFileSync('research/route-manifest.json', JSON.stringify({ routes, redirects }, null, 2));

assert.equal(insights.length, 5, 'The brief requires five guides.');
assert.equal(new Set(insights.map(article => article.slug)).size, insights.length);
for (const article of insights) {
  const html = readFileSync(join('dist', `/insights/${article.slug}/`, 'index.html'), 'utf8');
  assert(insightWordCount(article) > 900, `${article.slug}: incomplete guide`);
  assert(html.includes(escape(article.sections.at(-1).paragraphs.at(-1))), `${article.slug}: missing static body`);
  assert(html.includes('BlogPosting') && html.includes('BreadcrumbList'));
  assert(existsSync(join('public', article.image)));
  assert.equal(new Set(article.sections.map(section => section.id)).size, article.sections.length);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${article.slug}: one H1 required`);
  for (const source of article.sources) assert(new URL(source.url).protocol === 'https:');
}
mkdirSync('.sites-runtime/insights-qa', { recursive: true });
writeFileSync('.sites-runtime/insights-qa/content-manifest.json', JSON.stringify({ origin: siteOrigin, indexable: siteIndexable, routes: allPagePaths.length, sitemapUrls: indexablePaths.length, articles: insights.map(article => ({ title: article.title, slug: article.slug, words: insightWordCount(article), ...insightEditorial(article) })) }, null, 2));
console.log(`Rendered ${allPagePaths.length} complete HTML routes, ${insights.length} full guides, 4 redirects and 404. Indexing: ${siteIndexable ? 'production enabled' : 'client preview disabled'}.`);
