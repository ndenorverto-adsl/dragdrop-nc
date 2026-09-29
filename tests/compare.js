const [a, b] = process.argv.slice(2).map(f => JSON.parse(require('fs').readFileSync(f)));
let diff = 0; const norm = s => s.replace(/data-end="[^"]*"/g, '').replace(/faq[a-z0-9]{5}/g, 'faqID');
for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
  if (!(k in a) || !(k in b)) { console.log('SOLO EN UNO:', k); diff++; continue; }
  if (norm(a[k]) !== norm(b[k])) { diff++; const x = norm(a[k]), y = norm(b[k]); let i = 0; while (x[i] === y[i]) i++; console.log('DIFF', k, '@', i, '\n  A:', x.slice(i - 60, i + 80), '\n  B:', y.slice(i - 60, i + 80)); }
}
console.log(diff ? diff + ' diferencias' : 'IDÉNTICO (' + Object.keys(a).length + ' casos)');
