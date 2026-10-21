import {readFileSync,writeFileSync} from 'node:fs';
const h=readFileSync('research/home.html','utf8');
const a=[...h.matchAll(/<a[^>]+href=["'](https:\/\/curtainhive.com\/\?page_id=\d+)["'][^>]*>([\s\S]*?)<\/a>/g)].map(m=>({url:m[1],label:m[2].replace(/<[^>]+>/g,'').trim().slice(0,100)}));
const result=[...new Map(a.map(x=>[x.url+' '+x.label,x])).values()];writeFileSync('research/legacy-links.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
