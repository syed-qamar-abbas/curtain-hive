import {chromium,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
const base=process.argv[2]||'http://127.0.0.1:4185';
const out='.sites-runtime/intro';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const checks=[],errors=[];
const watch=page=>page.on('pageerror',error=>errors.push(error.message));
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage();watch(page);
 await page.addInitScript(()=>{
  window.__introTiming={};
  new MutationObserver(()=>{const state=window.__introTiming;if(document.documentElement.dataset.intro==='opening')state.start??=performance.now();else if(state.start)state.end??=performance.now();}).observe(document,{subtree:true,attributes:true,attributeFilter:['data-intro']});
 });
 await page.goto(base,{waitUntil:'domcontentloaded'});
 await expect(page.locator('.intro-wordmark text').first()).toHaveText('Curtain');
 await expect(page.locator('.brand-intro')).toHaveCount(0,{timeout:6000});
 const duration=await page.evaluate(()=>window.__introTiming.end-window.__introTiming.start);
 assert(duration>=2500&&duration<4000,`Duration ${duration}ms`);
 await page.reload();await expect(page.locator('.brand-intro')).toHaveCount(0);
 await page.getByRole('link',{name:'Inspiration',exact:true}).first().click();
 await expect(page).toHaveURL(/portfolio\/$/);await expect(page.locator('.brand-intro')).toHaveCount(0);
 checks.push(`Completes in ${Math.round(duration)}ms, once per session; route navigation does not replay.`);
 for(const action of ['keyboard','pointer','scroll','preference']){
  await page.evaluate(()=>sessionStorage.removeItem('ch-intro'));
  await page.goto(base,{waitUntil:'domcontentloaded'});await page.locator('.brand-intro').waitFor();
  if(action==='keyboard')await page.keyboard.press('Tab');
  if(action==='pointer')await page.getByRole('button',{name:'Skip intro animation'}).click();
  if(action==='scroll')await page.mouse.wheel(0,160);
  if(action==='preference')await page.emulateMedia({reducedMotion:'reduce'});
  await expect(page.locator('.brand-intro')).toHaveCount(0);
  assert.equal(await page.evaluate(()=>document.documentElement.dataset.intro),undefined);
  await page.emulateMedia({reducedMotion:'no-preference'});
 }
 checks.push('Keyboard, skip button, wheel and changing motion preference dismiss immediately and release the intro state.');
 await context.close();
 const touch=await browser.newContext({hasTouch:true,viewport:{width:390,height:844}});
 const touchPage=await touch.newPage();watch(touchPage);await touchPage.goto(base,{waitUntil:'domcontentloaded'});await touchPage.getByRole('button',{name:'Skip intro animation'}).tap();await expect(touchPage.locator('.brand-intro')).toHaveCount(0);await touch.close();
 checks.push('Phone touch control skips the intro.');
 for(const width of [1440,768,390]){
  const capture=await browser.newContext({viewport:{width,height:900}});const shot=await capture.newPage();watch(shot);
  await shot.clock.install();await shot.clock.pauseAt(new Date());
  await shot.goto(base,{waitUntil:'domcontentloaded'});await shot.locator('.brand-intro').waitFor();
  await shot.evaluate(()=>document.fonts.ready);
  const state=await shot.evaluate(()=>{const svg=document.querySelector('.intro-wordmark');return{overflow:document.documentElement.scrollWidth>innerWidth+1,words:[...svg.querySelectorAll('.intro-word text')].map(text=>{const box=text.getBBox();return{x:box.x,right:box.x+box.width,top:box.y,bottom:box.y+box.height};})};});
  assert(!state.overflow);for(const word of state.words){assert(word.x>=0&&word.right<=860,JSON.stringify(word));}
  for(const time of [550,1250,2150]){
   await shot.evaluate(time=>document.getAnimations().forEach(animation=>{animation.pause();animation.currentTime=time;}),time);
   await shot.screenshot({path:`${out}/intro-${width}-${time}.jpg`});
  }
  await capture.close();
 }
 checks.push('Three animation phases captured at 1440, 768 and 390px; both words fit horizontally and no page overflow.');
 const reduced=await browser.newContext({reducedMotion:'reduce',viewport:{width:390,height:844}});
 const reducedPage=await reduced.newPage();watch(reducedPage);await reducedPage.goto(base);await expect(reducedPage.locator('.brand-intro')).toHaveCount(0);await expect(reducedPage.locator('main h1')).toBeVisible();assert.equal(await reducedPage.evaluate(()=>document.getAnimations().length),0);await reduced.close();
 const noJs=await browser.newContext({javaScriptEnabled:false});const plain=await noJs.newPage();await plain.goto(base);if(!base.includes('127.0.0.1')||process.env.INTRO_PRERENDERED==='1')await expect(plain.locator('main h1')).toBeVisible();await expect(plain.locator('.brand-intro')).toHaveCount(0);await noJs.close();
 checks.push('Reduced motion skips the intro; no-JavaScript page is never covered.');
 assert.deepEqual(errors,[]);writeFileSync(`${out}/results.json`,JSON.stringify({passed:true,base,checks,errors},null,2));checks.forEach(check=>console.log('PASS '+check));
}finally{await browser.close();}
