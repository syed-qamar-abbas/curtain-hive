import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Check, MessageCircle, Phone, ArrowDown, MoveRight } from 'lucide-react';
import { business, media, services, wa } from './data';

function Photo({ src, alt, priority = false, className = '' }: { src: string; alt: string; priority?: boolean; className?: string }) {
  return <img src={src} alt={alt} width="1200" height="900" loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" className={className} />;
}

const roomMoods = [
  { name: 'Soft daylight', image: media.hero, detail: 'Sheer layers. A softer morning.', colour: '#d9cbbc' },
  { name: 'Quiet elegance', image: media.upholstery, detail: 'Gentle curves. Considered texture.', colour: '#b4aaa0' },
  { name: 'A bolder mood', image: '/images/about-interior.jpg', detail: 'Rich drapery. A little more presence.', colour: '#8f2435' },
];

function RoomExperience() {
  const [active, setActive] = useState(0);
  return <section className="room-hero" aria-labelledby="home-title">
    <div className="room-hero-copy">
      <div className="hero-introduction"><span />Thoughtfully made. Personally yours.</div>
      <h1 id="home-title"><span>A room that</span><span>feels like you.</span></h1>
      <p>Beautiful curtains. Considered interiors.<br /> Made around the way you live, in<br /> Rawalpindi & Islamabad.</p>
      <div className="hero-action-row"><Link className="button" to="/consultation/">Book free consultation <ArrowUpRight size={18} /></Link><a className="hero-style-link" href="#window-studio">Find my style <ArrowDown size={18} /></a></div>
      <a className="hero-material-note" href="#finish-collection"><Photo src="/images/crafting.webp" alt="Curtain fabric textures" /><span><strong>Good rooms start with a feeling.</strong><span>Explore the fabrics. Find your finish.</span></span><ArrowUpRight size={20} /></a>
    </div>
    <div className="hero-room-canvas">
      <div className="mood-images" aria-hidden="true">{roomMoods.map((mood, index) => <Photo key={mood.name} src={mood.image} alt="" priority={index === 0} className={`room-hero-photo ${index === active ? 'is-active' : ''}`} />)}</div>
      <div className="room-hero-scrim" />
      <div className="hero-photo-label"><span className="hero-photo-dot" />The art of feeling at home</div>
      <Link className="hero-photo-explore" to="/portfolio/" aria-label="Explore room inspiration"><ArrowUpRight size={25} /></Link>
    <div className="mood-picker" aria-label="Explore room moods">
      <div className="mood-picker-heading"><span>Change the feeling</span><span>0{active + 1} / 03</span></div>
      <div className="mood-options">{roomMoods.map((mood, index) => <button key={mood.name} type="button" aria-pressed={active === index} aria-label={`View ${mood.name.toLowerCase()}`} onClick={() => setActive(index)}><span className="mood-thumbnail"><Photo src={mood.image} alt="" />{active === index && <Check size={14} />}</span><span>{mood.name}</span></button>)}</div>
      <p className="mood-caption" aria-live="polite" aria-atomic="true" key={active}>{roomMoods[active].detail}</p>
      <span className="mood-disclosure">Room inspiration from our collection</span>
    </div>
    </div>
  </section>;
}

function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - innerHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${distance > 0 ? Math.min(1, scrollY / distance) : 0})`;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}

export function PremiumHome({ products, studio, testimonials, lightStudy }: { products: ReactNode; studio: ReactNode; testimonials: ReactNode; lightStudy: ReactNode }) {
  const categoryCopy = [
    ['Custom curtains', 'Soft daylight. A little privacy. A beautiful fit.'],
    ['Blinds & motorization', 'Light control, with a cleaner line.'],
    ['3D wallpaper', 'A new dimension for your walls.'],
    ['Sofa upholstery', 'A fresh feel for a familiar favourite.'],
    ['Custom furniture', 'Considered around your room.'],
  ];
  return <div className="premium-home">
    <ReadingProgress />
    <RoomExperience />

    <div className="home-assurances" aria-label="Our services at a glance">
      {['Made to measure', 'Fabric samples at home', 'Professional installation', 'Your local furnishing team'].map(text => <span key={text}><Check size={16} aria-hidden="true" />{text}</span>)}
    </div>

    <section className="category-edit section" id="finish-collection" aria-labelledby="category-title">
      <div className="editorial-heading"><h2 id="category-title" data-reveal>Small changes.<br />A new feeling.</h2><div><p>Start at the window. Stay for the possibilities.</p><Link className="text-link" to="/our-services/">Explore all services <ArrowUpRight size={18} /></Link></div></div>
      <div className="category-wall">
        {services.map((service, i) => <Link className={`category-piece category-${i}`} key={service.slug} to={`/our-services/${service.slug}/`} data-reveal>
          <div className="category-photo"><Photo src={service.image} alt={service.name} /></div>
          <div className="category-caption"><h3>{categoryCopy[i][0]}</h3><ArrowUpRight size={21} /></div>
          <p>{categoryCopy[i][1]}</p>
        </Link>)}
      </div>
    </section>

    <div className="studio-chapter">{studio}</div>

    <section className="daylight-story section" aria-labelledby="daylight-title">
      <figure className="daylight-detail" data-reveal><Photo src="/images/crafting.webp" alt="Close view of herringbone fabric and neatly finished curtain pleats" /><figcaption>Texture you can see. Samples you can feel.</figcaption></figure>
      <div className="daylight-text"><h2 id="daylight-title" data-reveal>Make room<br />for daylight.</h2><p>Think about the light you love, the privacy you need, and how you use your room. The right fabric brings those choices together.</p><Link className="text-link" to="/our-services/custom-curtains/">Find your curtain style <ArrowUpRight size={18} /></Link></div>
      <details className="light-preview"><summary>Explore the light study <ArrowRight size={17} /></summary>{lightStudy}</details>
    </section>

    <section className="selected-collection section" aria-labelledby="collection-title">
      <div className="editorial-heading"><div><h2 id="collection-title" data-reveal>A closer look.</h2><p>A few starting points from the Curtain Hive collection.</p></div><Link className="text-link" to="/shop/">View the collection <ArrowUpRight size={18} /></Link></div>
      <div className="product-grid home-products">{products}</div>
      <p className="small-note price-context">Published catalogue prices. Confirm the price basis, size and fitting with the team.</p>
    </section>

    <PremiumProcess />

    <section className="room-gallery section" aria-labelledby="rooms-title">
      <div className="editorial-heading"><h2 id="rooms-title" data-reveal>Rooms to imagine.</h2><p>Find a detail you love. Bring it into the conversation about your own space.</p></div>
      <div className="room-gallery-grid">
        {[['/images/gallery-texture.jpg', 'Rich in texture', 'rich-in-texture'], ['/images/gallery-room.jpg', 'Room to gather', 'room-to-gather'], ['/images/curtains-blackout-detail.jpg', 'Classic drapery', 'classic-drapery']].map(([src, title, slug]) => <Link key={slug} to={`/portfolio/${slug}/`} data-reveal><Photo src={src} alt={title} /><span>{title}<ArrowUpRight size={18} /></span></Link>)}
      </div>
      <div className="gallery-end"><p className="small-note">Interior inspiration from our image collection.</p><Link className="text-link" to="/portfolio/">Explore the gallery <ArrowUpRight size={18} /></Link></div>
    </section>
    {testimonials}
    <PremiumCTA />
  </div>;
}

export function PremiumProcess() {
  const [active, setActive] = useState(0);
  const steps = [
    ['Start a conversation', 'Tell us about your room and arrange a free consultation.', '/images/consultation.jpg', 'A room photo and a few ideas are enough to begin. We’ll discuss the service you need and confirm a suitable time.'],
    ['Explore the fabrics', 'Compare samples, colours and finishes in your space.', '/images/crafting.webp', 'Look at samples beside your walls and furniture. See how the texture feels and how the colour changes in your light.'],
    ['Measure & agree', 'Confirm dimensions, the quotation and what is included.', media.curtains, 'Check length, fullness and fitting together. Materials, measurements and the scope of installation are agreed before work begins.'],
    ['Prepare your pieces', 'Your chosen solution is crafted or prepared to the agreed details.', '/images/curtains-blackout-detail.jpg', 'Your selected solution follows the agreed details. The team confirms the schedule for your particular materials and project.'],
    ['Arrange the fitting', 'Confirm a suitable installation date and the finishing details.', '/images/installation.jpg', 'Arrange fitting with the team and review the finished details together. Ask about care instructions for your chosen fabric or finish.'],
  ];
  return <section className="project-process section" aria-labelledby="process-title"><div className="editorial-heading"><h2 id="process-title" data-reveal>Your idea.<br />Our craft.</h2><p>A clear path from the first conversation to the final fitting.</p></div><div className="process-experience"><div className="process-navigation" aria-label="Explore your project steps">{steps.map(([title, text], index) => <button type="button" key={title} aria-pressed={active === index} aria-controls="process-detail" className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span className="process-number">0{index + 1}</span><span><strong>{title}</strong><small>{text}</small></span><MoveRight size={20} /></button>)}</div><div className="process-detail" id="process-detail" aria-live="polite" aria-atomic="true"><Photo src={steps[active][2]} alt={steps[active][0] + ' inspiration'} key={steps[active][2]} /><div className="process-detail-copy" key={active}><span>0{active + 1} / Your project</span><h3>{steps[active][0]}</h3><p>{steps[active][3]}</p><Link className="text-link" to="/consultation/">Start with a free consultation <ArrowUpRight size={17} /></Link></div></div></div></section>;
}

export function PremiumCTA() {
  return <section className="consultation-close section"><div><h2 data-reveal>Let's find your finish.</h2><p>Bring us your ideas. We'll help with the fabrics, the measurements and the next step.</p><div className="actions"><Link to="/consultation/" className="button">Book free consultation <ArrowUpRight size={18} /></Link><a href={wa('Hello Curtain Hive, I would like guidance for my space.')} className="text-link">Chat on WhatsApp <MessageCircle size={18} /></a></div></div><Photo src="/images/about-interior.jpg" alt="Deep burgundy curtains framing a bright room" /></section>;
}

/** Short enquiry is the default; the existing detailed planner remains available. */
export function QuickConsultation({ guided }: { guided: ReactNode }) {
  const [params] = useSearchParams();
  const [showGuided, setShowGuided] = useState(params.get('guided') === '1');
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: services.find(s => s.slug === params.get('service'))?.name || '', city: '', notes: '' });
  const context = [params.get('room'), params.get('need'), params.get('style')].filter(Boolean).join(' · ');
  const message = `Hello Curtain Hive, I would like a free consultation.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}\nLocation: ${form.city}\n${context ? `Room preferences: ${context}\n` : ''}Notes: ${form.notes || 'To discuss'}\nPlease confirm visit availability and a suitable time.`;
  if (showGuided) return <><div className="planner-switch"><button className="text-link" onClick={() => setShowGuided(false)}>Use the short enquiry form <ArrowRight size={16} /></button></div>{guided}</>;
  return <>
    <section className="page-hero"><div><h1>Let's talk about your room.</h1><p>Request a free home consultation in Rawalpindi & Islamabad. A few details are all we need to start.</p></div></section>
    <section className="quick-consultation section">
      <aside><Photo src="/images/consultation.jpg" alt="Fabric and colour samples ready for a personal consultation" /><h2>See the possibilities.</h2><p>Explore fabric samples, discuss your ideas and arrange measurements with the Curtain Hive team.</p><a className="text-link" href={`tel:${business.tel}`}><Phone size={18} />{business.phone}</a><p className="small-note">{business.hours}<br />Gulrez, Rawalpindi</p></aside>
      <div className="quick-consultation-form" data-ui>
        {ready ? <div className="confirmation" role="status" aria-live="polite"><Check size={30} /><h2>Your message is ready.</h2><p>Review and send it in WhatsApp. Your visit will be confirmed by the team; no booking has been submitted yet.</p><dl>{[['Name', form.name], ['Service', form.service], ['Location', form.city]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><a className="button" href={wa(message)} target="_blank" rel="noreferrer">Review & send on WhatsApp <MessageCircle size={18} /></a><button className="text-link" onClick={() => setReady(false)}>Edit my details</button></div> : <form onSubmit={e => { e.preventDefault(); setReady(true); }}>
          <h2>Tell us a little.</h2>
          {context && <p className="carried-preferences">Your direction: {context}</p>}
          <div className="form-grid"><label>Your name<input required autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><label>Phone / WhatsApp<input required type="tel" autoComplete="tel" pattern="[+0-9 ()-]{7,20}" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></label></div>
          <label>What can we help with?<select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option value="">Choose a service</option>{services.map(s => <option key={s.slug}>{s.name}</option>)}<option>Multiple services</option><option>Help me choose</option></select></label>
          <label>City / neighbourhood<input required autoComplete="address-level2" placeholder="For example, Gulrez, Rawalpindi" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} /></label>
          <label>Anything you'd like to share? (optional)<textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Your room, rough measurements or a look you have in mind…" /></label>
          <button className="button" type="submit">Prepare my consultation request <ArrowUpRight size={18} /></button>
          <p className="small-note">You'll review the message in WhatsApp before sending. Visits outside Rawalpindi & Islamabad need confirmation.</p>
        </form>}
        <div className="guided-option"><p>Want to work through your room, style and preferences?</p><button className="text-link" onClick={() => setShowGuided(true)}>Use guided planner <ArrowRight size={17} /></button></div>
      </div>
    </section>
  </>;
}
