import { articles, business, media, products, services } from './data';
import { insights, insightEditorial, insightWordCount } from './insights-data';

export const siteOrigin = (import.meta.env.VITE_SITE_ORIGIN || 'https://curtain-hive-studio.toolpoint73.chatgpt.site').replace(/\/+$/, '');
export const siteIndexable = import.meta.env.VITE_INDEXABLE === 'true';
const parsedOrigin = new URL(siteOrigin);
if (parsedOrigin.protocol !== 'https:' || parsedOrigin.pathname !== '/' || parsedOrigin.search || parsedOrigin.hash) throw new Error('VITE_SITE_ORIGIN must be a clean HTTPS origin.');
const absolute = (path: string) => new URL(path, siteOrigin).href;
const routeTitles: Record<string, string> = {
  '/': 'Custom curtains & interiors in Rawalpindi and Islamabad',
  '/about-us/': 'About our furnishing studio', '/our-services/': 'Custom furnishing services',
  '/shop/': 'Shop curtains & wallpaper', '/portfolio/': 'Interior inspiration',
  '/insights/': 'Insights: practical furnishing guides', '/news-blog/': 'The journal archive',
  '/faq/': 'Your questions answered', '/contact-us/': 'Visit & contact us',
  '/consultation/': 'Free home consultation', '/cart/': 'Your shopping bag',
  '/checkout/': 'Checkout preview', '/wishlist/': 'Your saved pieces',
  '/privacy-policy/': 'Privacy information', '/terms-and-conditions/': 'Customer terms',
};
const galleryTitles: Record<string, string> = { 'soft-daylight': 'Soft daylight', 'rich-in-texture': 'Rich in texture', 'room-to-gather': 'Room to gather', 'a-quiet-pattern': 'A quiet pattern', 'clean-lines': 'Clean lines', 'softly-sculpted': 'Softly sculpted', 'classic-drapery': 'Classic drapery', 'botanical-walls': 'Botanical walls' };
const categoryNames = [...new Set(['curtains', 'wallpaper', ...products.flatMap(product => product.categories || [])])];
const tagNames = [...new Set(products.flatMap(product => product.tags || []))];
export const allPagePaths = [
  ...Object.keys(routeTitles), ...services.map(service => `/our-services/${service.slug}/`),
  ...products.map(product => `/product/${product.slug}/`), ...categoryNames.map(slug => `/product-category/${slug}/`),
  ...tagNames.map(slug => `/product-tag/${slug}/`), ...Object.keys(galleryTitles).map(slug => `/portfolio/${slug}/`),
  ...articles.map(article => `/news-blog/${article.slug}/`), ...insights.map(article => `/insights/${article.slug}/`),
];
type JsonRecord = Record<string, unknown>;
export type PageMetadata = { title: string; description: string; canonical: string; image: string; robots: string; indexable: boolean; exists: boolean; type: 'article' | 'website'; structuredData: JsonRecord; };

export function pageMetadata(path: string, search = ''): PageMetadata {
  const pathname = path === '/' ? '/' : path.replace(/\/+$/, '') + '/';
  const slug = pathname.split('/').filter(Boolean).at(-1);
  const article = pathname.startsWith('/insights/') ? insights.find(item => item.slug === slug) : undefined;
  const service = pathname.startsWith('/our-services/') ? services.find(item => item.slug === slug) : undefined;
  const product = pathname.startsWith('/product/') ? products.find(item => item.slug === slug) : undefined;
  const journal = pathname.startsWith('/news-blog/') ? articles.find(item => item.slug === slug) : undefined;
  const galleryTitle = pathname.startsWith('/portfolio/') ? galleryTitles[slug || ''] : undefined;
  const exists = allPagePaths.includes(pathname);
  const title = article?.seoTitle || routeTitles[pathname] || service?.name || product?.name || journal?.title || galleryTitle || (exists && pathname.startsWith('/product-category/') ? `Collection: ${slug!.replaceAll('-', ' ')}` : exists && pathname.startsWith('/product-tag/') ? `Tagged: ${slug!.replaceAll('-', ' ')}` : 'Page not found');
  const description = article?.description || (pathname === '/insights/' ? 'Practical guides to curtains, motorized blinds, wallpaper, upholstery and custom furniture. Clear answers for your Rawalpindi or Islamabad home.' : service?.description ? `${service.description} Discuss ${service.short.toLowerCase()} for your home in Rawalpindi or Islamabad with Curtain Hive.` : journal?.excerpt || `${title}. Explore Curtain Hive curtains, blinds, wallpaper, upholstery and furniture in Rawalpindi and Islamabad. Arrange a free home consultation.`);
  const canonical = absolute(pathname);
  const image = absolute(article?.image || service?.image || product?.image || journal?.image || media.hero);
  const utility = ['/cart/', '/checkout/', '/wishlist/', '/privacy-policy/', '/terms-and-conditions/'].includes(pathname) || pathname.startsWith('/news-blog/') || pathname.startsWith('/product-tag/');
  const indexable = siteIndexable && exists && !utility && !search;
  const organizationId = `${siteOrigin}/#organization`, websiteId = `${siteOrigin}/#website`, pageId = `${canonical}#webpage`;
  const organization: JsonRecord = {
    '@type': 'LocalBusiness', '@id': organizationId, name: 'Curtain Hive', url: `${siteOrigin}/`,
    description: 'Custom curtains, motorized blinds, wallpaper installation, sofa upholstery and custom furniture in Rawalpindi and Islamabad.',
    logo: absolute(media.logo), image: absolute(media.hero), telephone: business.tel,
    address: { '@type': 'PostalAddress', streetAddress: 'Chaudhry Bostan Khan Road, Phase 3, Gulrez Housing Scheme', addressLocality: 'Rawalpindi', addressCountry: 'PK' },
    areaServed: ['Rawalpindi', 'Islamabad'].map(name => ({ '@type': 'City', name })),
    openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '21:00' },
    sameAs: ['https://www.instagram.com/curtainhive/', 'https://web.facebook.com/curtainhiveoffical/'],
  };
  const page: JsonRecord = { '@type': pathname === '/insights/' ? 'CollectionPage' : 'WebPage', '@id': pageId, url: canonical, name: `${title} | Curtain Hive`, description, inLanguage: 'en-PK', isPartOf: { '@id': websiteId }, about: { '@id': organizationId } };
  const graph: JsonRecord[] = [organization, { '@type': 'WebSite', '@id': websiteId, name: 'Curtain Hive', url: `${siteOrigin}/`, publisher: { '@id': organizationId }, inLanguage: 'en-PK' }, page];
  if (pathname !== '/' && exists) {
    const crumbs = [{ name: 'Home', item: `${siteOrigin}/` }];
    if (article) crumbs.push({ name: 'Insights', item: absolute('/insights/') });
    else if (service) crumbs.push({ name: 'Services', item: absolute('/our-services/') });
    else if (product) crumbs.push({ name: 'Shop', item: absolute('/shop/') });
    else if (galleryTitle) crumbs.push({ name: 'Inspiration', item: absolute('/portfolio/') });
    else if (journal) crumbs.push({ name: 'Journal', item: absolute('/news-blog/') });
    crumbs.push({ name: article?.title || title, item: canonical });
    graph.push({ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumbs`, itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb })) });
    page.breadcrumb = { '@id': `${canonical}#breadcrumbs` };
  }
  if (article) {
    const editorial = insightEditorial(article);
    page.mainEntity = { '@id': `${canonical}#article` };
    graph.push({ '@type': 'BlogPosting', '@id': `${canonical}#article`, url: canonical, headline: article.title,
      description, image: [image], author: { '@type': 'Organization', '@id': organizationId, name: 'Curtain Hive', url: absolute(editorial.author.profile) },
      publisher: { '@id': organizationId }, datePublished: `${editorial.datePublished}T00:00:00+05:00`, dateModified: `${editorial.dateModified}T00:00:00+05:00`,
      mainEntityOfPage: { '@id': pageId }, inLanguage: editorial.locale, articleSection: article.category,
      wordCount: insightWordCount(article), keywords: editorial.tags.join(', '), citation: article.sources.map(source => source.url),
      about: { '@type': 'Thing', name: article.category },
    });
  }
  if (pathname === '/insights/') page.mainEntity = { '@type': 'ItemList', itemListElement: insights.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.title, url: absolute(`/insights/${item.slug}/`) })) };
  if (service) graph.push({ '@type': 'Service', '@id': `${canonical}#service`, name: service.name, description: service.description, url: canonical, provider: { '@id': organizationId }, areaServed: ['Rawalpindi', 'Islamabad'] });
  return { title: `${title} | Curtain Hive`, description, canonical, image, robots: indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow', indexable, exists, type: article ? 'article' : 'website', structuredData: { '@context': 'https://schema.org', '@graph': graph } };
}

export function applyPageMetadata(pathname: string, search = '') {
  const data = pageMetadata(pathname, search);
  document.title = data.title;
  function meta(key: string, content: string, property = false) {
    const attribute = property ? 'property' : 'name';
    let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
    if (!node) { node = document.createElement('meta'); node.setAttribute(attribute, key); document.head.append(node); }
    node.content = content;
  }
  meta('description', data.description); meta('robots', data.robots);
  for (const [key, value] of Object.entries({ 'og:title': data.title, 'og:description': data.description, 'og:url': data.canonical, 'og:image': data.image, 'og:type': data.type, 'og:site_name': 'Curtain Hive', 'og:locale': 'en_PK' })) meta(key, value, true);
  meta('twitter:card', 'summary_large_image'); meta('twitter:title', data.title); meta('twitter:description', data.description); meta('twitter:image', data.image);
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
  canonical.href = data.canonical;
  let schema = document.getElementById('page-schema');
  if (!schema) { schema = document.createElement('script'); schema.id = 'page-schema'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema); }
  schema.textContent = JSON.stringify(data.structuredData);
}
