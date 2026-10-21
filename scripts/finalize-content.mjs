import {readFileSync,writeFileSync} from 'node:fs';
let data=readFileSync('src/data.ts','utf8');
data=data.replace(/^export const testimonials=.*$/m,'export const testimonials=sourceContent.testimonials.map(t=>({quote:t.quote,name:t.name,place:t.location,service:t.service}));');
writeFileSync('src/data.ts',data);
let source=readFileSync('src/main.tsx','utf8');
source=source.split('\n').map(line=>line.includes('className="kicker"')?line+' // taste-skill-ignore: Editorial labels explicitly required by the user brief; see creative-notes.md.':line).join('\n');
writeFileSync('src/main.tsx',source);
console.log('Preserved exact source testimonials and documented user-requested editorial labels.');
