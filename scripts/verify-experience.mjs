import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await page.addInitScript(() => sessionStorage.setItem('ch-intro', 'premium-v3'));
const errors = [];
page.on('pageerror', error => errors.push(error.message));
const results = [];
mkdirSync('research/experience-qa', { recursive: true });
for (const width of [360, 390, 768, 1440, 1920]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto('http://127.0.0.1:5173/');
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
  for (const [label, caption] of [['View quiet elegance', 'Gentle curves.'], ['View a bolder mood', 'Rich drapery.'], ['View soft daylight', 'Sheer layers.']]) {
    const button = page.getByRole('button', { name: label, exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.mood-caption')).toContainText(caption);
    await expect(page.locator('.room-hero-photo.is-active')).toHaveCount(1);
    await expect.poll(() => page.locator('.room-hero-photo.is-active').evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    const copy = await page.locator('.room-hero-copy').boundingBox();
    const picker = await page.locator('.mood-picker').boundingBox();
    assert(copy.x + copy.width <= picker.x || copy.y + copy.height <= picker.y, `Hero controls overlap at ${width}`);
  }
  await page.getByRole('link', { name: 'Find my style', exact: true }).click();
  assert.equal(new URL(page.url()).hash, '#window-studio');
  await expect(page.locator('#window-studio')).toBeInViewport();
  for (const card of await page.locator('.category-piece').all()) {
    const title = await card.locator('.category-caption').boundingBox();
    const detail = await card.locator(':scope > p').boundingBox();
    assert(title.y + title.height <= detail.y, `Service caption overlap at ${width}`);
  }
  for (const button of await page.locator('.process-navigation > button').all()) {
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.process-detail h3')).toHaveText(await button.locator('strong').innerText());
  }
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
  await expect.poll(() => page.locator('.reading-progress').evaluate(n => new DOMMatrixReadOnly(getComputedStyle(n).transform).a)).toBeGreaterThan(.99);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
  const longHeadings = await page.locator('h1,h2,h3').evaluateAll(nodes => nodes.filter(n => n.getBoundingClientRect().height / parseFloat(getComputedStyle(n).lineHeight) > 2.15).map(n => n.textContent));
  assert.deepEqual(longHeadings, [], `Long headings at ${width}`);
  results.push({ width, passed: true });
}
await page.emulateMedia({ reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/');
await page.getByRole('button', { name: 'View quiet elegance', exact: true }).click();
await page.locator('.process-navigation > button').nth(1).click();
assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
assert.deepEqual(errors, []);
writeFileSync('research/experience-qa/interaction-results.json', JSON.stringify({ passed: true, results, errors, checks: ['Keyboard room mood changes with decoded images', 'Hero controls do not overlap', 'Find my style anchors to Studio', 'Keyboard process steps update content', 'Reading progress reaches end', 'No horizontal overflow', 'Headings fit in two lines', 'Reduced-motion interactions remain instant'] }, null, 2));
console.log('PASS: room moods, process steps, style anchor, progress and reduced motion at all five widths.');
await browser.close();
