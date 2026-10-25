import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await page.addInitScript(() => sessionStorage.setItem('ch-intro', 'premium-v3'));
const folder = process.argv[2] || 'research/redesign-qa';
mkdirSync(folder, { recursive: true });
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const results = [];
for (const width of [1440, 768, 390, 1920]) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
  for (const [path, name] of [['/', 'home'], ['/our-services/custom-curtains/', 'service'], ['/shop/', 'shop'], ['/product/elegant-sheer-curtains/', 'product'], ['/consultation/', 'consultation'], ['/contact-us/', 'contact'], ['/about-us/', 'about'], ['/portfolio/', 'gallery']]) {
    await page.goto('http://127.0.0.1:5173' + path);
    await page.locator('h1').waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const img of document.images) img.loading = 'eager';
      await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(1100);
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth + 1,
      headings: [...document.querySelectorAll('h1,h2,h3')].filter(el => el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight) > 2.15).map(el => ({ text: el.textContent, lines: el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight) })),
      broken: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
      serif: [...document.querySelectorAll('h1,h2,h3')].some(el => !getComputedStyle(el).fontFamily.includes('Manrope')),
    }));
    results.push({ width, path, ...metrics });
    await page.screenshot({ path: `${folder}/${name}-${width}.jpg`, fullPage: true });
    if (name === 'home') await page.screenshot({ path: `${folder}/fold-${width}.jpg` });
    console.log(JSON.stringify({ width, path, ...metrics }));
  }
}
writeFileSync(`${folder}/visual-results.json`, JSON.stringify({ results, errors }, null, 2));
await browser.close();
