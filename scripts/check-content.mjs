import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative } from 'node:path';
const root=process.cwd();
const excluded=new Set(['node_modules','.git','.agents','.codex','.github','contributing','scripts']);
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>excluded.has(e.name)?[]:e.isDirectory()?walk(resolve(dir,e.name)):[resolve(dir,e.name)]);}
function pages(x){if(typeof x==='string')return [x];if(Array.isArray(x))return x.flatMap(pages);if(x&&typeof x==='object')return ['pages','groups','tabs','anchors','dropdowns'].flatMap(k=>pages(x[k]));return [];}
const config=JSON.parse(readFileSync('docs.json','utf8'));const navigation=pages(config.navigation);const errors=[];
for(const name of navigation)if(!existsSync(`${name}.mdx`))errors.push(`Missing navigation page: ${name}`);
const files=walk(root).filter(p=>p.endsWith('.mdx'));
for(const file of files){
 const name=relative(root,file).replace(/\.mdx$/,'');const source=readFileSync(file,'utf8');const fm=source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)([\s\S]*)/);
 if(!fm){errors.push(`${name}: invalid frontmatter`);continue;}
 for(const key of ['title','description'])if(!new RegExp(`^${key}:\\s*\\S`,'m').test(fm[1]))errors.push(`${name}: missing ${key}`);
 if(fm[2].trim().length<80)errors.push(`${name}: empty or incomplete article`);
 if(/<CardGroup[^>]*>\s*<\/CardGroup>/.test(source))errors.push(`${name}: empty CardGroup`);
 if(/\bTODO\b|\bFIXME\b|Add product-specific/.test(source))errors.push(`${name}: unresolved placeholder`);
 if(!navigation.includes(name))errors.push(`${name}: page is outside navigation (remove or add intentionally)`);
 if(/(?:AKIA[0-9A-Z]{16}|-----BEGIN .*PRIVATE KEY-----|postgres(?:ql)?:\/\/)/.test(source))errors.push(`${name}: suspected private operational content`);
 for(const m of source.matchAll(/!\[([^\]]*)\]\((\/[^)]+)\)/g)){if(!m[1].trim())errors.push(`${name}: missing image alt text`);if(!existsSync(resolve(root,'.'+m[2])))errors.push(`${name}: missing image ${m[2]}`);}
}
for(const r of config.redirects||[])if(!existsSync(resolve(root,`.${r.destination}.mdx`)))errors.push(`Redirect target missing: ${r.destination}`);
console.log(`${files.length} articles; ${navigation.length} navigation entries; ${(config.redirects||[]).length} redirects`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log('Content checks passed');
