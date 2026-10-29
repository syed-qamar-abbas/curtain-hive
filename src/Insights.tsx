import { useEffect, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Clock3, Link2, List, MessageCircle } from 'lucide-react';
import { insights, insightReadMinutes, insightEditorial, type Insight } from './insights-data';
import { services, wa } from './data';
import { recordArticleWhatsAppClick } from './analytics';
import { imageProps } from './image-delivery';

function GuideImage({ article, eager = false }: { article: Insight; eager?: boolean }) {
  return <img {...imageProps(article.image, eager ? '90vw' : '(max-width: 600px) calc(100vw - 44px), 65vw')} alt={article.imageAlt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

export function ServiceInsightLink({ serviceSlug }: { serviceSlug: string }) {
  const article = insights.find(item => item.serviceSlug === serviceSlug);
  return article ? <Link className="insight-service-guide" to={`/insights/${article.slug}/`}><span><small>A little guidance before you decide</small><strong>{article.title}</strong></span><ArrowUpRight size={22} /></Link> : null;
}

export function InsightsTeaser() {
  return <section className="section insights-teaser" aria-labelledby="insights-teaser-title">
    <div><h2 id="insights-teaser-title" data-reveal>A little knowledge.<br />A better room.</h2><p>Five practical guides to the decisions behind a considered home.</p><Link className="text-link" to="/insights/">Explore Insights <ArrowUpRight size={18} /></Link></div>
    <Link className="insights-teaser-feature" to={`/insights/${insights[0].slug}/`} data-reveal><GuideImage article={insights[0]} /><span><span>Curtains · {insightReadMinutes(insights[0])} min read</span><strong>Sheer or blackout?</strong><span>Find the right balance of daylight and privacy. <ArrowUpRight size={18} /></span></span></Link>
  </section>;
}

export function InsightsIndex() {
  const [params, setParams] = useSearchParams();
  const categories = ['All guides', ...insights.map(item => item.category)];
  const category = categories.includes(params.get('topic') || '') ? params.get('topic')! : 'All guides';
  const filtered = insights.filter(item => category === 'All guides' || item.category === category);
  const featured = insights[0];
  return <div className="insights-page">
    <section className="insights-intro section" aria-labelledby="insights-title">
      <div><p className="insights-location">Curtain Hive Insights · Rawalpindi & Islamabad</p><h1 id="insights-title">Good rooms<br />start here.</h1><p className="insights-lead">Practical guides to curtains, blinds, walls and furniture. A clearer idea of what works, before you make it yours.</p><a className="text-link" href="#all-guides">Find your next read <ArrowDown size={18} /></a></div>
      <Link className="insights-feature" to={`/insights/${featured.slug}/`} aria-label="Read Sheer or blackout?">
        <div className="insights-feature-photo"><GuideImage article={featured} eager /><span className="round-arrow"><ArrowUpRight size={26} /></span></div>
        <div className="insights-feature-copy"><span className="guide-meta">Start at the window <span>{insightReadMinutes(featured)} min read</span></span><h2>Sheer or blackout?</h2><p>Keep the daylight. Choose your privacy. Understand what each layer can do.</p></div>
      </Link>
    </section>
    <section className="section insights-library" id="all-guides" aria-labelledby="guide-library-title">
      <div className="insights-library-heading"><h2 id="guide-library-title">A guide for your next move.</h2><p>One useful decision at a time.</p></div>
      <div className="insights-filters" aria-label="Filter guides by service">{categories.map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setParams(item === 'All guides' ? {} : { topic: item }, { replace: true, preventScrollReset: true })}>{item}</button>)}</div>
      <p className="insights-result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'guide' : 'guides'}{category !== 'All guides' ? ` on ${category.toLowerCase()}` : ' to a more considered home'}</p>
      <div className="insights-guide-grid">{filtered.map((article, index) => <Link className={`insight-card insight-card-${index}`} key={article.slug} to={`/insights/${article.slug}/`} data-reveal>
        <div className="insight-card-image"><GuideImage article={article} /><span className="round-arrow"><ArrowUpRight size={21} /></span></div>
        <div className="insight-card-copy"><span className="guide-meta">{article.category}<span><Clock3 size={14} />{insightReadMinutes(article)} min</span></span><h3>{article.title}</h3><p>{article.standfirst}</p><span className="insight-read">Read the guide <ArrowUpRight size={16} /></span></div>
      </Link>)}</div>
    </section>
    <section className="insights-note section"><div><h2 data-reveal>From reading<br />to your room.</h2><p data-reveal>Bring your questions, a room photo and the ideas you like. We’ll help you explore the actual samples and measurements.</p><Link className="button light" to="/consultation/">Arrange a free consultation <ArrowUpRight size={18} /></Link></div><img {...imageProps("/images/consultation.jpg")} alt="Furnishing samples being compared during a consultation" loading="lazy" data-reveal /></section>
  </div>;
}

function Contents({ article, active, mobile = false }: { article: Insight; active: string; mobile?: boolean }) {
  const details = useRef<HTMLDetailsElement>(null);
  const links = <nav aria-label={mobile ? 'Article sections on mobile' : 'Article sections'}>{[{ id: 'quick-answer', title: 'The short answer' }, { id: 'compare', title: 'Compare your options' }, ...article.sections.map(({ id, title }) => ({ id, title })), { id: 'project-checklist', title: 'Your project checklist' }, { id: 'questions', title: 'Common questions' }, { id: 'sources', title: 'Sources & further reading' }].map(item => <a href={`#${item.id}`} key={item.id} aria-current={active === item.id ? 'location' : undefined} onClick={() => { if (details.current) details.current.open = false; }}>{item.title}</a>)}</nav>;
  return mobile ? <details className="insight-mobile-contents" ref={details}><summary><List size={18} /> In this guide <ChevronDown size={17} /></summary>{links}</details> : <aside className="insight-sidebar"><div className="insight-sidebar-inner"><span className="insight-contents-label"><List size={17} /> In this guide</span>{links}<Link className="insight-sidebar-service" to={`/our-services/${article.serviceSlug}/`}>Explore {article.category.toLowerCase()}<ArrowUpRight size={17} /></Link></div></aside>;
}

function ArticleBody({ article }: { article: Insight }) {
  const editorial = insightEditorial(article);
  const publishedLabel = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(editorial.datePublished));
  const [active, setActive] = useState('quick-answer');
  const [shareState, setShareState] = useState('');
  const [checked, setChecked] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const body = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const blocks = [...(body.current?.querySelectorAll<HTMLElement>('[data-article-section]') || [])];
        const top = (document.querySelector('.header')?.getBoundingClientRect().bottom || 0) + 60;
        const current = blocks.filter(item => item.getBoundingClientRect().top <= top).at(-1);
        setActive(current?.id || 'quick-answer');
        if (body.current) {
          const rect = body.current.getBoundingClientRect();
          setProgress(Math.min(1, Math.max(0, (top - rect.top) / Math.max(1, rect.height - innerHeight + top))));
        }
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [article.slug]);
  async function share() {
    try { await navigator.clipboard.writeText(new URL(`/insights/${article.slug}/`, location.origin).href); setShareState('Link copied'); }
    catch { setShareState('Copy the address from your browser to share this guide.'); }
  }
  return <>
    <div className="insight-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    <header className="insight-article-heading section">
      <nav className="insight-breadcrumb" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/insights/">Insights</Link><span>/</span><span>{article.category}</span></nav>
      <div className="insight-heading-grid"><div><p className="guide-meta">{article.category} <span><Clock3 size={14} />{insightReadMinutes(article)} min read</span></p><h1>{article.title}</h1><p className="insights-lead">{article.standfirst}</p></div><div className="insight-byline"><span>Written by <Link to="/about-us/">Curtain Hive</Link></span><time dateTime={editorial.datePublished}>{publishedLabel}</time><button type="button" onClick={share}><Link2 size={16} /> Share this guide</button><span role="status">{shareState}</span></div></div>
    </header>
    <figure className="insight-cover"><GuideImage article={article} eager /><figcaption>{article.takeaway}</figcaption></figure>
    <div className="section insight-reading-layout">
      <Contents article={article} active={active} />
      <div className="insight-reading-column" ref={body}>
        <Contents article={article} active={active} mobile />
        <section className="insight-answer" id="quick-answer" data-article-section><h2>The short answer</h2><p>{article.answer}</p></section>
        <section className="insight-section" id="compare" data-article-section><h2>{article.comparison.title}</h2><div className="insight-table-wrap" tabIndex={0} role="region" aria-label={`${article.category} comparison`}><table><caption className="sr-only">{article.comparison.title}</caption><thead><tr>{article.comparison.columns.map(col => <th key={col} scope="col">{col}</th>)}</tr></thead><tbody>{article.comparison.rows.map(row => <tr key={row[0]}>{row.map((value, index) => index === 0 ? <th key={index} scope="row">{value}</th> : <td key={index} data-label={article.comparison.columns[index]}>{value}</td>)}</tr>)}</tbody></table></div></section>
        {article.sections.map(section => <section className="insight-section" key={section.id} id={section.id} data-article-section><h2>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}{section.sources && <p className="insight-section-sources">Reference: {section.sources.map((index, i) => <span key={index}>{i > 0 && ' · '}<a href={article.sources[index].url} target="_blank" rel="noreferrer">{article.sources[index].title}<ArrowUpRight size={12} /></a></span>)}</p>}{section.image && <figure className="insight-inline-image"><img {...imageProps(section.image.src, "(max-width: 600px) calc(100vw - 44px), 65vw")} alt={section.image.alt} loading="lazy" /><figcaption>{section.image.caption}</figcaption></figure>}</section>)}
        <section className="insight-checklist" id="project-checklist" data-article-section><div><h2>Your project checklist</h2><p>Tick off what you have ready for the conversation.</p></div><div className="insight-checklist-items">{article.checklist.map((item) => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={event => setChecked(current => event.target.checked ? [...current, item] : current.filter(value => value !== item))} /><span className="checkmark" aria-hidden="true"><Check size={15} /></span><span>{item}</span></label>)}</div><p role="status" className="insight-checklist-status">{checked.length} of {article.checklist.length} ready</p><div className="insight-checklist-actions"><a className="button" href={wa(`Hello Curtain Hive, I read your guide “${article.title}” and would like advice about ${article.category.toLowerCase()} for my home. Could we discuss the suitable options?`)} target="_blank" rel="noreferrer" aria-label={`Ask about ${article.category.toLowerCase()} on WhatsApp (opens in a new tab)`} onClick={() => recordArticleWhatsAppClick(article.slug, article.serviceSlug)}>Ask about {article.category.toLowerCase()} <MessageCircle size={17} /></a><Link to={`/consultation/?service=${article.serviceSlug}`}>Or arrange a consultation <ArrowUpRight size={15} /></Link></div></section>
        <section className="insight-section insight-faq" id="questions" data-article-section><h2>Common questions</h2>{article.faq.map(item => <details key={item.q}><summary>{item.q}<ChevronDown size={18} /></summary><p>{item.a}</p></details>)}</section>
        <section className="insight-section insight-sources" id="sources" data-article-section><h2>Sources & further reading</h2><p>Technical references supporting this guide. Manufacturer examples describe their own products; confirm the specifications of the option proposed for your project.</p><ol>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title} <ArrowUpRight size={15} /></a><p>{source.note}</p></li>)}</ol><p className="insight-editorial-note">Curtain Hive is a furnishing studio serving Rawalpindi and Islamabad. This guide combines practical planning advice with the cited technical references. Product suitability and quotation scope are confirmed individually. <Link to="/contact-us/">Suggest a correction</Link>.</p></section>
      </div>
    </div>
  </>;
}

export function InsightArticle() {
  const { slug } = useParams();
  const article = insights.find(item => item.slug === slug);
  if (!article) return <section className="section empty"><h1>Guide not found.</h1><p>Explore our practical guides to your next furnishing decision.</p><Link className="button" to="/insights/">Browse Insights <ArrowUpRight size={17} /></Link></section>;
  const related = insightEditorial(article).relatedSlugs.map(relatedSlug => insights.find(item => item.slug === relatedSlug)!).filter(Boolean);
  const service = services.find(item => item.slug === article.serviceSlug)!;
  return <article className="insight-article"><ArticleBody article={article} key={article.slug} /><section className="section insight-related"><div className="insights-library-heading"><h2>Keep the ideas coming.</h2><Link className="text-link" to="/insights/">All Insights <ArrowUpRight size={17} /></Link></div><div className="insight-related-grid">{related.map(item => <Link to={`/insights/${item.slug}/`} key={item.slug}><GuideImage article={item} /><div><span className="guide-meta">{item.category} · {insightReadMinutes(item)} min read</span><h3>{item.title}</h3><ArrowUpRight size={22} /></div></Link>)}</div><Link className="insight-service-end" to={`/our-services/${service.slug}/`}>Make it yours with {service.name.toLowerCase()}<ArrowUpRight size={20} /></Link></section></article>;
}
