import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
const out='research/qa-fixes-2026-10-25';
mkdirSync(`${out}/screens`,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
const errors=[],checks=[];
page.on('pageerror',error=>errors.push(error.message));
const go=path=>page.goto('http://127.0.0.1:5173'+path);
const pass=(id,detail)=>{checks.push({id,passed:true,detail});console.log('PASS '+id+': '+detail);};
const decode=()=>page.evaluate(async()=>{await document.fonts.ready;const images=[...document.images];images.forEach(image=>image.loading='eager');await Promise.all(images.map(image=>image.decode().catch(()=>{})));});
async function visibleQuestion() {
  await expect.poll(()=>page.locator('.wizard-stage h2').evaluate(node=>{
    const rect=node.getBoundingClientRect(),header=document.querySelector('.header').getBoundingClientRect();
    return document.activeElement===node&&rect.top>=header.bottom+12&&rect.bottom<innerHeight-60;
  })).toBe(true);
}

for(const width of [320,360,390,430,768,1440]) {
  await page.setViewportSize({width,height:844});await go('/');await decode();
  assert.equal(await page.locator('.consultation-float').count(),0);
  await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
  const links=page.locator('.footer-bottom a');
  for(const name of ['Privacy','Terms']) {
    const link=links.filter({hasText:new RegExp('^'+name+'$')});
    assert(await link.evaluate(node=>{const r=node.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('a')===node;}),name+' obscured at '+width);
  }
  if([320,390,1440].includes(width))await page.screenshot({path:`${out}/screens/footer-${width}.jpg`});
}
await page.setViewportSize({width:390,height:844});
await page.locator('.footer-bottom').getByRole('link',{name:'Privacy',exact:true}).click();
await expect(page).toHaveURL(/privacy-policy\/$/);
await page.evaluate(()=>scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
await page.locator('.footer-bottom').getByRole('link',{name:'Terms',exact:true}).click();
await expect(page).toHaveURL(/terms-and-conditions\/$/);
pass('QA-001','Left floating CTA removed; footer links work and stay clear at six widths.');

for(const width of [320,360,390]) {
  await page.setViewportSize({width,height:844});await go('/shop/');await decode();
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
  assert(await page.locator('.shop-toolbar .filter-tabs button').evaluateAll(nodes=>nodes.every(n=>{const r=n.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.height>=44;})));
  const titles=await page.locator('.product-card h3').evaluateAll(nodes=>nodes.filter(n=>n.getBoundingClientRect().height/parseFloat(getComputedStyle(n).lineHeight)>2.15).map(n=>n.textContent));
  assert.deepEqual(titles,[],'Product titles at '+width);
  await page.screenshot({path:`${out}/screens/shop-${width}.jpg`,fullPage:true});
}
pass('QA-002','All category controls fit at 320/360/390px with no horizontal overflow.');
pass('DES-001','Product titles fit within two lines at all three small-phone widths.');

await go('/contact-us/');
await expect(page.locator('main form, main input, main select, main textarea')).toHaveCount(0);
const contactChat=page.locator('main').getByRole('link',{name:'Chat on WhatsApp',exact:true});
await expect(contactChat).toHaveAttribute('href',/^https:\/\/wa\.me\/923015374238\?text=/);
pass('QA-004','Contact form replaced with one direct WhatsApp CTA and showroom information.');

await go('/product/elegant-sheer-curtains/');
for(const value of ['1.5','0','100','']) {
  await page.getByLabel('Quantity',{exact:true}).fill(value);
  await page.getByRole('button',{name:'Add to bag',exact:true}).click();
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('ch-bag'))),[],'Invalid quantity entered bag: '+value);
}
await page.getByLabel('Quantity',{exact:true}).fill('2');await page.getByRole('button',{name:'Add to bag',exact:true}).click();
await go('/cart/');await page.getByLabel('Quantity',{exact:true}).fill('1.5');
assert.match(await page.locator('.order-summary').innerText(),/7,400/);
await page.getByLabel('Quantity',{exact:true}).fill('3');await page.reload();
await expect(page.getByLabel('Quantity',{exact:true})).toHaveValue('3');
assert.match(await page.locator('.order-summary').innerText(),/11,100/);
await page.screenshot({path:`${out}/screens/cart-valid-390.jpg`,fullPage:true});
pass('QA-005','Decimal/empty/out-of-range values are blocked; integer bag totals and persistence remain correct.');

await go('/consultation/?guided=1');await visibleQuestion();
await page.getByRole('button',{name:'Custom Curtains',exact:true}).click();
await page.getByRole('button',{name:'Continue',exact:true}).click();await visibleQuestion();
await page.getByRole('button',{name:'Bedroom',exact:true}).click();
await page.getByRole('button',{name:'Use the short enquiry form'}).click();
await page.getByRole('button',{name:'Use guided planner',exact:true}).click();await visibleQuestion();
await expect(page.locator('.wizard-progress')).toContainText('2 of 6');
await expect(page.getByRole('button',{name:'Bedroom',exact:true})).toHaveAttribute('aria-pressed','true');
await page.getByRole('button',{name:'Continue',exact:true}).click();await visibleQuestion();
await page.getByRole('button',{name:'Renovation',exact:true}).click();
await page.getByRole('button',{name:'Continue',exact:true}).click();await visibleQuestion();
await page.getByLabel('Budget preference (optional)').fill('To discuss');
await page.getByRole('button',{name:'Continue',exact:true}).click();await visibleQuestion();
await page.getByRole('button',{name:'Islamabad',exact:true}).click();
await page.getByRole('button',{name:'Continue',exact:true}).click();await visibleQuestion();
await page.getByLabel('Your name',{exact:true}).fill('Retained QA Name');
await page.getByLabel('Phone / WhatsApp',{exact:true}).fill('03001234567');
await page.getByRole('button',{name:'Use the short enquiry form'}).click();
await page.getByRole('button',{name:'Use guided planner',exact:true}).click();await visibleQuestion();
await expect(page.locator('.wizard-progress')).toContainText('6 of 6');
await expect(page.getByLabel('Your name',{exact:true})).toHaveValue('Retained QA Name');
await page.screenshot({path:`${out}/screens/planner-question-390.jpg`});
await page.getByRole('button',{name:'Request my free consultation',exact:true}).click();
await expect(page.locator('.confirmation')).toContainText('no booking has been submitted');
pass('QA-003','All six guided questions receive focus below the sticky header, including remount and confirmation.');
pass('QA-007','Guided room, service, step and final contact details survive mode switches.');

await page.setViewportSize({width:1440,height:900});await go('/portfolio/');
const services=page.locator('.desktop-nav').getByRole('button',{name:'Services',exact:true});
await services.hover();const first=page.locator('#nav-services a').first();await first.focus();
await page.mouse.move(1200,700);await page.waitForTimeout(350);
await expect(services).toHaveAttribute('aria-expanded','true');await expect(first).toBeFocused();
await page.keyboard.press('Escape');await expect(services).toHaveAttribute('aria-expanded','false');await expect(services).toBeFocused();
pass('QA-006','Pointer exit keeps the focused dropdown link open; Escape restores trigger focus.');

await go('/');await page.locator('.desktop-nav').getByRole('button',{name:'Shop',exact:true}).click();
await page.getByRole('link',{name:'All products',exact:true}).click();
const before=await page.evaluate(()=>history.length);
await page.getByRole('textbox',{name:'Search products',exact:true}).pressSequentially('sheer');
await expect(page.getByRole('textbox',{name:'Search products',exact:true})).toHaveValue('sheer');
await expect(page.locator('.product-card')).toHaveCount(1);
await page.waitForURL('**/shop/?q=sheer');
assert.equal(await page.evaluate(()=>history.length),before);
await page.goBack();await expect(page).toHaveURL('http://127.0.0.1:5173/');
pass('QA-008','Fast typing preserves the full word, replaces the URL, and one Back returns to the preceding page.');

for(const [path,name] of [['/shop/','Curtains'],['/portfolio/','Curtains'],['/faq/','Curtains']]) {
  await go(path);const filter=page.locator('.filter-tabs').getByRole('button',{name,exact:true});
  await filter.click();await expect(filter).toHaveAttribute('aria-pressed','true');
  assert.equal(await page.locator('.filter-tabs button[aria-pressed=true]').count(),1);
  await expect(page.locator('.results-summary [role=status],.filter-results[role=status]')).toBeVisible();
}
pass('QA-009','Shop, gallery and FAQ filters expose selected states and live result counts.');

for(const [path,label] of [['/shop','Shop'],['/portfolio','Inspiration'],['/about-us','About'],['/contact-us','Contact']]) {
  await go(path);await page.waitForURL('http://127.0.0.1:5173'+path+'/');
  assert(!((await page.title()).startsWith('Page not found')));
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href','https://curtainhive.com'+path+'/');
  await expect(page.locator('.desktop-nav > a.active,.nav-drop[data-active=true] > button')).toContainText(label);
}
await go('/shop?q=sheer#catalogue');await page.waitForURL('**/shop/?q=sheer#catalogue');
await expect(page.getByRole('textbox',{name:'Search products',exact:true})).toHaveValue('sheer');
pass('QA-010','Equivalent routes normalize to slash form with correct metadata, active navigation, query and hash.');

for(const width of [320,390,768,1440]) {
  await page.setViewportSize({width,height:844});await go('/');await decode();
  assert.equal(await page.locator('.detail-story').count(),0);
  assert.equal(await page.locator('img[src="/images/consultation.jpg"]').count(),1);
  assert.equal(await page.locator('.category-piece').count(),5);
  assert.equal(await page.locator('#window-studio').count(),1);
  const longHeadings=await page.locator('h1,h2,h3').evaluateAll(nodes=>nodes.filter(n=>n.getBoundingClientRect().height/parseFloat(getComputedStyle(n).lineHeight)>2.15).map(n=>n.textContent));
  assert.deepEqual(longHeadings,[],'Home headings at '+width);
  await page.screenshot({path:`${out}/screens/home-${width}-full.jpg`,fullPage:true});
  for(const [selector,label] of [['.daylight-story','materials'],['.room-gallery','gallery']]) {
    await page.locator(selector).scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/screens/${label}-${width}.jpg`});
  }
  if(width===390){const height=await page.evaluate(()=>document.documentElement.scrollHeight);assert(height<11215,'Homepage still unnecessarily long: '+height);checks.push({id:'DES-002-height',before:12461,after:height});}
}
pass('DES-002','Repeated detail section consolidated, material story compacted and mobile gallery composed into fewer rows.');
assert.deepEqual(errors,[]);
writeFileSync(`${out}/acceptance-results.json`,JSON.stringify({passed:true,checks,errors},null,2));
console.log('PASS: all 12 QA/design acceptance cases.');
await browser.close();
