import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
await page.addInitScript(() => sessionStorage.setItem('ch-intro', 'premium-v3'));
mkdirSync('research/navbar-fixes', { recursive: true });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://127.0.0.1:5173/portfolio/');
const services = page.getByRole('button', { name: 'Services', exact: true });
await services.hover();
await services.click();
console.log('Hover then click open:', await services.getAttribute('aria-expanded'));
await page.mouse.move(5, 5);
await services.focus(); await page.keyboard.press('Enter');
await page.mouse.click(1400, 800);
console.log('Outside click closed:', await services.getAttribute('aria-expanded'));
for (const width of [360, 700, 701, 768, 1000, 1100, 1101, 1200, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  console.log(JSON.stringify(await page.evaluate(() => ({ width: innerWidth, nav: getComputedStyle(document.querySelector('.desktop-nav')).display, menu: getComputedStyle(document.querySelector('.mobile-menu-button')).display, overflow: document.documentElement.scrollWidth > innerWidth, header: [...document.querySelector('.header').children].map(n => ({ class: n.className, x: n.getBoundingClientRect().x, width: n.getBoundingClientRect().width })) }))));
}
await page.setViewportSize({ width: 390, height: 844 });
await page.getByRole('button', { name: 'Open menu' }).click();
await page.getByRole('dialog').getByRole('link', { name: 'Inspiration', exact: true }).click();
console.log('Current-page mobile link closes:', await page.getByRole('dialog').count() === 0);
await page.screenshot({ path: 'research/navbar-fixes/before-mobile.jpg' });
await browser.close();
