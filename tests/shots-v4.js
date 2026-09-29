// Capturas de las plantillas v4 exportadas (con fuentes reales vía @fontsource). Uso: node shots-v4.js <app> <outdir> [marca,...]
const { open } = require('./harness'); const { chromium } = require('playwright');
const fs = require('fs'), path = require('path'), http = require('http');
const FS = path.join(__dirname, 'node_modules/@fontsource'); const BS = path.join(__dirname, 'node_modules/bootstrap/dist');
(async () => {
  const [root, out, brandsArg] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const brands = (brandsArg || 'nc').split(',');
  const app = await open(path.resolve(root));
  const docs = await app.page.evaluate(brands => { const r = {}; const names = Object.keys(TEMPLATE_META).filter(n => !TEMPLATE_META[n].legacy);
    brands.forEach(b => names.forEach(n => { state.sections = tplSections(n); state.settings.brand = b; Object.assign(state.settings, { tel: '900 000 000', wa: '34600000000' }); r[b + '__' + n] = buildDoc(true); })); return r; }, brands);
  if (app.errors.length) console.log('ERR', app.errors);
  await app.close();
  const srv = http.createServer((q, a) => { const f = path.join(FS, decodeURIComponent(q.url.split('?')[0]).slice(4)); if (!fs.existsSync(f)) { a.writeHead(404); return a.end(); } a.writeHead(200, { 'content-type': f.endsWith('.css') ? 'text/css' : 'font/woff2', 'access-control-allow-origin': '*' }); fs.createReadStream(f).pipe(a); }).listen(0);
  await new Promise(r => srv.on('listening', r)); const B = 'http://localhost:' + srv.address().port;
  const b = await chromium.launch(); const report = [];
  for (const [k, html] of Object.entries(docs)) for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    await ctx.route('**/*', r => { const u = r.request().url();
      if (u.startsWith('https://landing.test')) return r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' });
      if (u.startsWith(B)) return r.continue();
      if (/fonts\.googleapis/.test(u)) { const fams = [...u.matchAll(/family=([^:&]+)(?::[^&]*wght@([\d;]+))?/g)].map(m => [decodeURIComponent(m[1]).replace(/\+/g, ' '), (m[2] || '400').split(';')]);
        const css = fams.flatMap(([n, ws]) => { const d = n.toLowerCase().replace(/ /g, '-'); return fs.existsSync(path.join(FS, d)) ? ws.filter(x => fs.existsSync(path.join(FS, d, x + '.css'))).map(x => `@import url(${B}/fs/${d}/${x}.css);`) : []; }).join('\n');
        return r.fulfill({ body: css, contentType: 'text/css' }); }
      if (/bootstrap.*\.css/.test(u)) return r.fulfill({ body: fs.readFileSync(BS + '/css/bootstrap.min.css'), contentType: 'text/css' });
      if (/bootstrap.*\.js/.test(u)) return r.fulfill({ body: fs.readFileSync(BS + '/js/bootstrap.bundle.min.js'), contentType: 'application/javascript' });
      return r.fulfill({ status: 204, body: '' }); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('https://landing.test/'); await p.waitForTimeout(700); await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => { const c = document.getElementById('ncCookies'); if (c) c.hidden = true; });
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const ovEl = ov > 0 ? await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.scrollWidth > e.clientWidth + 1 && getComputedStyle(e).overflowX !== 'hidden' && e.clientWidth > 0 || e.getBoundingClientRect().right > 391).map(e => e.tagName + '.' + (e.className||'').toString().slice(0,30)).slice(0, 4).join(',')) : ''; report.push(`${k} ${tag} overflow=${ov} errs=${errs.length} ${ovEl}`);
    await p.screenshot({ path: path.join(out, `${k.replace(/[^a-z0-9_]+/gi, '-')}-${tag}.png`), fullPage: true });
    await ctx.close();
  }
  await b.close(); srv.close(); console.log(report.join('\n'));
})();
