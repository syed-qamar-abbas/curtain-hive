/** Consent-aware adapters may listen for this local event. No data is sent or stored here. */
export function recordArticleWhatsAppClick(articleSlug: string, serviceSlug: string) {
  window.dispatchEvent(new CustomEvent('curtainhive:analytics', { detail: {
    event: 'whatsapp_cta_click', page_path: window.location.pathname,
    cta_location: 'article_checklist', content_type: 'article',
    article_slug: articleSlug, service_slug: serviceSlug,
  } }));
}
