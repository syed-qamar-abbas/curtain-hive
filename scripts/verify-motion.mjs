import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const out = 'research/motion-qa';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
page.setDefaultNavigationTimeout(90000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const base = 'http://127.0.0.1:5173';
const checks = [];
const pass = label => { checks.push(label); console.log('PASS: ' + label); };

await page.addInitScript(() => {
  window.__introTimes = {};
  new MutationObserver(() => {
    if (document.documentElement.dataset.intro === 'opening') window.__introTimes.start ??= performance.now();
    else if (window.__introTimes.start) window.__introTimes.end ??= performance.now();
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-intro'] });
});
await page.goto(base, { waitUntil: 'domcontentloaded' });
await page.locator('h1').waitFor();
await expect.poll(() => page.evaluate(() => !!window.__introTimes.end)).toBe(true);
const introElapsed = await page.evaluate(() => window.__introTimes.end - window.__introTimes.start);
assert(introElapsed >= 1000 && introElapsed < 3000, 'Intro duration: ' + introElapsed);
console.log('Intro measured at ' + Math.round(introElapsed) + 'ms.');
await expect(page.locator('.intro-curtain')).toHaveCount(0);
await page.reload();
await page.locator('h1').waitFor();
await expect(page.locator('.intro-curtain')).toHaveCount(0);
pass('Quick intro completes and plays once per session');

await page.evaluate(() => sessionStorage.removeItem('ch-intro'));
// Observe the short intro before fonts and images finish loading.
await page.reload({ waitUntil: 'commit' });
await page.locator('.intro-curtain').waitFor();
await page.keyboard.press('Tab');
await expect(page.locator('.intro-curtain')).toHaveCount(0);
pass('Keyboard interaction dismisses the intro immediately');

const services = page.locator('.desktop-nav').getByRole('button', { name: 'Services', exact: true });
await services.hover();
await expect(services).toHaveAttribute('aria-expanded', 'true');
await page.locator('#nav-services a').first().hover();
await page.waitForTimeout(250);
await expect(services).toHaveAttribute('aria-expanded', 'true');
await page.mouse.move(5, 5);
await expect(services).toHaveAttribute('aria-expanded', 'false');
await services.focus();
await page.keyboard.press('Enter');
await expect(services).toHaveAttribute('aria-expanded', 'true');
await page.keyboard.press('Tab');
await page.keyboard.press('Escape');
await expect(services).toHaveAttribute('aria-expanded', 'false');
await expect(services).toBeFocused();
pass('Dropdown pointer travel, keyboard opening, Escape and focus return');

await page.getByRole('button', { name: 'Search products', exact: true }).click();
await page.getByRole('dialog').waitFor();
await page.keyboard.press('Escape');
await expect(page.getByRole('dialog')).toHaveCount(0);
await expect(page.getByRole('button', { name: 'Search products', exact: true })).toBeFocused();
pass('Dialog exits smoothly and restores keyboard focus');

await page.goto(base + '/faq/');
await page.getByLabel('Search frequently asked questions').fill('smart home');
const details = page.locator('details');
await expect(details).toHaveCount(1);
await details.locator('summary').click();
await expect(details.locator('summary')).toHaveAttribute('aria-expanded', 'true');
await page.waitForTimeout(400);
assert((await details.locator('.accordion-panel').boundingBox()).height > 20);
await page.screenshot({ path: `${out}/faq-open.jpg` });
await details.locator('summary').click();
await expect(details).not.toHaveAttribute('open', '');
await details.locator('summary').click();
await details.locator('summary').click();
await details.locator('summary').click();
await expect(details.locator('summary')).toHaveAttribute('aria-expanded', 'true');
pass('Accordion opening, closing and rapid repeated toggles');

await page.goto(base + '/shop/');
const card = page.locator('.product-card').first();
await card.scrollIntoViewIfNeeded();
await page.waitForTimeout(1000);
await card.hover();
await page.waitForTimeout(800);
const hover = await card.evaluate(node => ({
  card: getComputedStyle(node).transform,
  image: getComputedStyle(node.querySelector('img')).transform,
}));
assert(hover.card !== 'none' && hover.image !== 'none');
await page.screenshot({ path: `${out}/shop-hover.jpg` });
await page.getByRole('button', { name: 'Curtains', exact: true }).click();
await expect(page.locator('.product-card')).toHaveCount(3);
await page.waitForTimeout(1000);
assert(await page.locator('.product-card').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).opacity === '1')));
pass('Card hover remains active after reveals and catalogue filtering');

for (const width of [1440, 768, 390]) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
  for (const route of ['/', '/shop/', '/product/elegant-sheer-curtains/', '/product-category/curtains/', '/our-services/', '/our-services/custom-curtains/', '/about-us/', '/contact-us/', '/consultation/', '/portfolio/']) {
    await page.goto(base + route);
    await page.locator('h1').waitFor();
    await page.addStyleTag({ content: 'html {scroll-behavior: auto !important;}' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => setTimeout(resolve, 80));
      }
    });
    await page.waitForTimeout(1100);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false, route + ' overflow at ' + width);
    const hidden = await page.locator('[data-reveal]').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).opacity === '0').length);
    assert.equal(hidden, 0, route + ' invisible revealed content');
    if (route === '/') {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({ path: `${out}/home-${width}.jpg` });
    }
  }
}
pass('Key pages at desktop, tablet and phone: no overflow or invisible reveal content');

await page.goto(base);
await page.getByRole('button', { name: 'Open menu', exact: true }).click();
await page.getByRole('dialog').waitFor();
await page.screenshot({ path: `${out}/mobile-menu.jpg` });
await page.getByRole('dialog').getByRole('link', { name: 'Shop', exact: true }).click();
await expect(page).toHaveURL(/\/shop\/$/);
await expect(page.getByRole('dialog')).toHaveCount(0);
pass('Mobile navigation and route changes remain usable');

await page.emulateMedia({ reducedMotion: 'reduce' });
await page.evaluate(() => sessionStorage.removeItem('ch-intro'));
await page.goto(base);
await page.locator('h1').waitFor();
await expect(page.locator('.intro-curtain')).toHaveCount(0);
assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
await page.goto(base + '/faq/');
await page.locator('summary').first().click();
await expect(page.locator('summary').first()).toHaveAttribute('aria-expanded', 'true');
assert.equal(await page.evaluate(() => document.getAnimations().length), 0);
pass('Reduced motion shows content immediately and keeps accordions functional');

await page.emulateMedia({ reducedMotion: 'no-preference' });
const cdp = await context.newCDPSession(page);
await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
await cdp.send('Network.enable');
await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 100, downloadThroughput: 750000, uploadThroughput: 375000 });
await page.goto(base);
await page.getByRole('heading', { level: 1 }).waitFor();
await expect(page.getByRole('link', { name: 'Book free consultation', exact: true }).first()).toBeVisible();
await expect(page.locator('.intro-curtain')).toHaveCount(0, { timeout: 5000 });
pass('Hero and consultation action remain available under slower CPU/network simulation');
await cdp.detach();
assert.deepEqual(errors, []);
writeFileSync(`${out}/results.json`, JSON.stringify({ passed: true, checks, consoleErrors: errors }, null, 2));
await browser.close();
