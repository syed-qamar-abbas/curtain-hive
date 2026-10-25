import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const out='research/qa-fixes-2026-10-25';
mkdirSync(`${out}/screens`, { recursive: true });
const {routes}=JSON.parse(readFileSync('research/route-manifest.json','utf8'));
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:320,height:844},reducedMotion:'reduce'});
const results=[];
for(const route of Object.keys(routes)){
  await page.goto('http://127.0.0.1:5173'+route);await page.locator('h1').waitFor();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,'320px overflow: '+route);
  assert.equal(await page.locator('.consultation-float').count(),0);
  results.push({route,width:320,passed:true});
}
await page.setViewportSize({width:390,height:844});
await page.goto('http://127.0.0.1:5173/');
await page.evaluate(async()=>{await document.fonts.ready;const imgs=[...document.images];imgs.forEach(img=>img.loading='eager');await Promise.all(imgs.map(img=>img.decode().catch(()=>{})));});
const height=await page.evaluate(()=>document.documentElement.scrollHeight);
assert(height<11215);
await page.locator('.daylight-story').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/screens/materials-390.jpg`});
await page.locator('.room-gallery').scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/screens/gallery-390.jpg`});
writeFileSync(`${out}/small-layout-results.json`,JSON.stringify({passed:true,routes:results,homepageHeight:{before:12461,after:height,reduction:Math.round((1-height/12461)*1000)/10}},null,2));
console.log(`PASS: all ${results.length} routes at 320px; mobile homepage ${height}px (${Math.round((1-height/12461)*100)}% shorter).`);
await browser.close();
