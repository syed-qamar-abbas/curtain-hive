import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await page.addInitScript(() => sessionStorage.setItem('ch-intro', '1'));
const checks = [];
for (const width of [1440, 768, 390]) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
  for (const [route, label] of [['/shop/', 'shop'], ['/consultation/', 'consultation'], ['/product/elegant-sheer-curtains/', 'product']]) {
    await page.goto('http://127.0.0.1:5173' + route);
    await page.locator('h1').waitFor();
    // Instant capture scrolling ensures the browser visits every lazy image.
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        scrollTo({ top: y, behavior: 'instant' });
        await new Promise(resolve => setTimeout(resolve, 160));
      }
      await Promise.all([...document.images].map(img => img.decode()));
      scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(1000);
    const failed = await page.locator('img').evaluateAll(imgs => imgs.filter(img => !img.complete || !img.naturalWidth).map(img => img.src));
    assert.deepEqual(failed, [], `${route} at ${width}`);
    await page.screenshot({ path: `research/qa/${label}-${width}.jpg`, fullPage: true });
    checks.push({ route, width, allImagesDecoded: true });
    console.log(`${label} at ${width}: all images loaded and captured.`);
  }
}
writeFileSync('research/qa/media-results.json', JSON.stringify({ passed: true, checks }, null, 2));
await browser.close();
