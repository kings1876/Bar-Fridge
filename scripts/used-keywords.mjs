// Regenerates docs/keywords/used-keywords.csv: every bank keyword that appears in src/, with counts per file.
import fs from 'node:fs'; import path from 'node:path';
const root = process.cwd();
const walk = d => fs.readdirSync(d,{withFileTypes:true}).flatMap(e => e.isDirectory()? walk(path.join(d,e.name)) : /\.(tsx?|jsx?)$/.test(e.name)? [path.join(d,e.name)] : []);
const files = walk(path.join(root,'src')).map(f => [path.relative(path.join(root,'src'),f).split(path.sep).join('/'), fs.readFileSync(f,'utf8').toLowerCase()]);
const parse = l => { const o=[]; let c='',q=false; for(const ch of l){ if(ch==='"') q=!q; else if(ch===','&&!q){o.push(c);c='';} else c+=ch;} o.push(c); return o; };
const rows = [];
for (const type of ['commercial','transactional','informational']) {
  const lines = fs.readFileSync(path.join(root,'docs/keywords',type+'.csv'),'utf8').split(/\r?\n/).filter(Boolean);
  const h = parse(lines[0]).map(s=>s.toLowerCase());
  const ki = h.findIndex(x=>x.startsWith('keyword')), vi = h.findIndex(x=>x.startsWith('vol')), di = h.findIndex(x=>x==='kd'||x.startsWith('keyword diff')||x.startsWith('kd'));
  for (const l of lines.slice(1)) { const c = parse(l); const k=(c[ki]||'').trim().toLowerCase(); if(!k) continue;
    const re = new RegExp('(?<![a-z0-9])'+k.split('').map(ch => /[a-z0-9 ]/.test(ch) ? ch : String.fromCharCode(92) + ch).join('')+'(?![a-z0-9])','g');
    let total=0; const where=[];
    for (const [f,t] of files){ const n=(t.match(re)||[]).length; if(n){total+=n; where.push(f+':'+n);} }
    if(total) rows.push({k,vol:c[vi],kd:c[di],type,total,where:where.join('; ')});
  }
}
rows.sort((a,b)=>b.total-a.total);
fs.writeFileSync(path.join(root,'docs/keywords/used-keywords.csv'),'Keyword,Volume,KD,Type,Total_Mentions,Where_Used (file:count)\n'+rows.map(r=>`"${r.k}",${r.vol},${r.kd},${r.type},${r.total},"${r.where}"`).join('\n')+'\n');
const by = t=>rows.filter(r=>r.type===t).length;
console.log('used:',rows.length,'commercial',by('commercial'),'transactional',by('transactional'),'informational',by('informational'));
console.log(rows.slice(0,15).map(r=>`${r.k} (${r.type}, vol ${r.vol}, KD ${r.kd}) x${r.total}`).join('\n'));
