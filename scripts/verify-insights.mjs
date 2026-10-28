import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
const origin = process.argv[2] || 'http://127.0.0.1:4173';
const out = '.sites-runtime/insights-qa';
mkdirSync(out, { recursive: true });
const manifest = JSON.parse(readFileSync(`${out}/content-manifest.json`, 'utf8'));
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [], checks = [], visualIssues = [];
page.on('pageerror', error => errors.push(error.message));
page.on('console', message => { if (message.type() === 'error' && /hydration|hydrating|Minified React error/i.test(message.text())) errors.push(message.text()); });
const go = async path => { const response = await page.goto(origin + path); assert(response.ok(), `${path}: ${response.status()}`); await page.locator('main h1').first().waitFor(); await page.evaluate(() => document.fonts.ready); };
const pass = text => { checks.push(text); console.log('PASS ' + text); };
try {
  await go('/');
  const cards = page.locator('.service-picker .mood-options > button');
  await expect(cards).toHaveCount(5);
  assert.equal(await cards.evaluateAll(nodes => new Set(nodes.map(node => Math.round(node.getBoundingClientRect().top))).size), 1, 'Service cards must remain in a single sliding row');
  assert.equal(await cards.evaluateAll(nodes => { const p=nodes[0].parentElement.getBoundingClientRect(); return nodes.filter(node=>{const r=node.getBoundingClientRect();return r.left>=p.left-3&&r.right<=p.right+3;}).length; }), 3, 'Show exactly three service cards');
  await expect(page.getByRole('button', { name: 'Previous service', exact: true })).toBeDisabled();
  for (let index = 0; index < 5; index++) {
    if (index) await page.getByRole('button', { name: 'Next service', exact: true }).click();
    await expect(cards.nth(index)).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => cards.nth(index).evaluate(node => { const r=node.getBoundingClientRect(),p=node.parentElement.getBoundingClientRect(); return r.left>=p.left-3 && r.right<=p.right+3; })).toBe(true);
    const href = await page.locator('.service-preview-link').getAttribute('href');
    assert(href.includes(manifest.articles[index].slug === 'sheer-vs-blackout-curtains' ? 'custom-curtains' : ['','motorized-blinds','wallpaper-installation','sofa-fabric-upholstery','custom-furniture'][index]));
  }
  await expect(page.getByRole('button', { name: 'Next service', exact: true })).toBeDisabled();
  await cards.nth(4).focus(); await page.keyboard.press('Home');
  await expect(cards.nth(0)).toBeFocused();
  await expect(cards.nth(0)).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('End'); await expect(cards.nth(4)).toBeFocused();
  await page.locator('.service-preview-link').click(); await expect(page).toHaveURL(/our-services\/custom-furniture\/$/);
  pass('Five hero services; arrows, bounds, keyboard, preview and service destinations.');

  await go('/insights/');
  await expect(page.locator('.insight-card')).toHaveCount(5);
  for (const category of ['Curtains','Blinds','Wallpaper','Upholstery','Furniture']) {
    await page.locator('.insights-filters').getByRole('button', { name: category, exact: true }).click();
    await expect(page.locator('.insight-card')).toHaveCount(1);
    await expect(page.locator('.insights-result-count')).toContainText('1 guide');
  }
  await page.reload(); await expect(page.locator('.insight-card')).toHaveCount(1);
  await page.locator('.insights-filters').getByRole('button', { name: 'All guides' }).click();
  await expect(page.locator('.insight-card')).toHaveCount(5);
  pass('Insights filters, results announcements and reloadable topic URLs.');

  for (const article of manifest.articles) {
    await go(article.path);
    await expect(page.locator('.insight-article-heading h1')).toHaveText(article.title);
    assert((await page.locator('.insight-reading-column').innerText()).split(/\s+/).length > 900);
    const schema = await page.locator('#page-schema').evaluate(node => JSON.parse(node.textContent));
    const posting = schema['@graph'].find(node => node['@type'] === 'BlogPosting');
    assert.equal(posting.headline, article.title);
    assert.equal(posting.wordCount, article.words);
    assert(posting.image[0].endsWith(article.featuredImage));
    assert.equal(await page.locator('link[rel=canonical]').count(), 1);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), manifest.origin + article.path);
    assert.equal(await page.locator('.insight-reading-column .insight-checklist input').count(), 5);
    await page.locator('.insight-checklist label').first().click();
    await expect(page.locator('.insight-checklist-status')).toHaveText('1 of 5 ready');
    await page.locator('.insight-faq summary').first().click();
    await expect(page.locator('.insight-faq details').first()).toHaveAttribute('open', '');
    const link = new URL(await page.locator('.insight-checklist-actions a.button').getAttribute('href'));
    assert.equal(link.hostname, 'wa.me'); assert.equal(link.pathname, '/923015374238');
    assert(link.searchParams.get('text').includes(article.title));
    assert.equal(await page.locator('.insight-related-grid > a').count(), 2);
    const broken = await page.locator('a[href^="#"]').evaluateAll(nodes => nodes.map(node => node.getAttribute('href')).filter(href => href.length > 1 && !document.getElementById(decodeURIComponent(href.slice(1)))));
    assert.deepEqual(broken, []);
  }
  pass('Five full article routes, schema, canonicals, checklists, FAQs, related reads and contextual WhatsApp links.');

  await go(manifest.articles[0].path);
  await page.evaluate(() => { window.__ctaEvents=[]; window.addEventListener('curtainhive:analytics',e=>window.__ctaEvents.push(e.detail)); document.querySelector('.insight-checklist-actions a.button').addEventListener('click',e=>e.preventDefault()); });
  await page.locator('.insight-checklist-actions a.button').click();
  const events = await page.evaluate(() => window.__ctaEvents);
  assert.equal(events.length, 1); assert.equal(events[0].event, 'whatsapp_cta_click');
  assert(!JSON.stringify(events).includes('923015374238'));
  pass('One local non-PII WhatsApp click event; no message sent.');
  await page.evaluate(() => { localStorage.setItem('ch-bag', JSON.stringify([{id:'test-invalid',qty:2}])); localStorage.setItem('ch-saved', JSON.stringify(['persisted-test'])); });
  await page.reload();
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ch-saved')))).toEqual(['persisted-test']);
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('ch-bag')))).toEqual([]);
  await page.evaluate(() => { localStorage.removeItem('ch-saved'); localStorage.removeItem('ch-bag'); });
  pass('Server-rendered app hydrates without discarding saved local state.');

  for (const width of [320,390,768,1101,1280,1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['/', '/insights/', ...manifest.articles.map(article => article.path)]) {
      await go(path);
      const issue = await page.evaluate(async () => {
        const images = [...document.images]; images.forEach(image => image.loading='eager'); await Promise.all(images.map(image => image.decode().catch(()=>{})));
        return { overflow: document.documentElement.scrollWidth > innerWidth+1, brokenImages: images.filter(image=>!image.naturalWidth).map(image=>image.src), headings: [...document.querySelectorAll('main h1,main h2,main h3')].filter(node=>node.getBoundingClientRect().height / parseFloat(getComputedStyle(node).lineHeight) > 2.15).map(node=>node.textContent) };
      });
      assert(!issue.overflow, `${width} ${path}: horizontal overflow`);
      assert.deepEqual(issue.brokenImages, [], `${width} ${path}: images`);
      if (issue.headings.length) visualIssues.push({ width, path, headings: issue.headings });
      if ([390,768,1440].includes(width) && ['/', '/insights/', manifest.articles[0].path].includes(path)) {
        const name=path==='/'?'home':path==='/insights/'?'insights':'article';
        await page.screenshot({ path:`${out}/${name}-${width}-fold.jpg` });
        if (name === 'insights') await page.screenshot({ path:`${out}/${name}-${width}-full.jpg`, fullPage:true });
        if (name === 'article') { await page.locator('#compare').scrollIntoViewIfNeeded(); await page.screenshot({path:`${out}/${name}-${width}-comparison.jpg`}); }
      }
    }
  }
  pass('42 desktop/tablet/phone page checks: no horizontal overflow or broken images.');
  await page.setViewportSize({ width:390,height:844 }); await go('/');
  await page.getByRole('button',{name:'Open menu',exact:true}).click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Insights',exact:true}).click();
  await expect(page).toHaveURL(/\/insights\/$/); await expect(page.getByRole('dialog')).toHaveCount(0);
  pass('Mobile Insights navigation opens and releases the menu.');
  const noJs = await browser.newContext({ javaScriptEnabled:false });
  const noJsPage = await noJs.newPage();
  for (const article of manifest.articles) { await noJsPage.goto(origin+article.path); assert((await noJsPage.locator('.insight-reading-column').innerText()).split(/\s+/).length>900); }
  await noJs.close(); pass('All five complete articles readable with JavaScript disabled.');
  assert.deepEqual(errors, [], 'Runtime/hydration errors');
  writeFileSync(`${out}/browser-results.json`, JSON.stringify({ origin, checks, errors, visualIssues, passed:true },null,2));
  console.log(JSON.stringify({ visualIssues, errors }));
} finally { await browser.close(); }
