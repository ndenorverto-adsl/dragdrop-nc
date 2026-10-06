// Capturas de plantillas × estilos de diseño (fuentes reales vía @fontsource, fotos sustituidas). Uso: node shots-looks.js <app> <outdir> "<plantilla|…>" "<look,…>" [marca]
// Opcional: SHOTS_VP="390x844:m,768x1024:t" (viewports) · NOSHOT=1 (solo informe de desbordes, sin capturas)
const { open } = require('./harness'); const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FS = path.join(__dirname, 'node_modules/@fontsource'); const BS = path.join(__dirname, 'node_modules/bootstrap/dist');
const PHOTO = process.env.NC_PHOTO && fs.existsSync(process.env.NC_PHOTO) ? fs.readFileSync(process.env.NC_PHOTO) : null;
const VPS = (process.env.SHOTS_VP || '1440x900:d,390x844:m').split(',').map(v => { const [wh, t] = v.split(':'); const [w, h] = wh.split('x').map(Number); return [w, h, t]; });
const NOSHOT = !!process.env.NOSHOT;
const PROPS = process.env.SHOTS_PROPS ? JSON.parse(fs.readFileSync(process.env.SHOTS_PROPS, 'utf8')) : null; // solo pruebas: props de ejemplo por tipo de bloque
(async () => {
  const [root, out, tplArg, lookArg, brand, extra] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const app = await open(path.resolve(root));
  const docs = await app.page.evaluate(([tpls, looks, brand, extra, PROPS]) => { const r = {};
    const names = tpls ? tpls.split('|') : Object.keys(TEMPLATE_META); const L = looks ? looks.split(',') : LOOK_ORDER;
    names.forEach(n => L.forEach(lk => { state.sections = tplSections(n); if (PROPS) state.sections.forEach(s => { if (PROPS[s.type]) Object.assign(s.props, PROPS[s.type]); }); if (extra) { const e = JSON.parse(extra); state.sections.forEach(s => { if (/_hero$/.test(s.type)) Object.assign(s.props, e); }); }
      state.settings.brand = brand && brand !== 'auto' ? brand : (TEMPLATE_BRAND[n] || 'nc'); state.settings.look = lk; Object.assign(state.settings, { tel: '900 000 000', wa: '34600000000' });
      r[lk + '__' + n] = buildDoc(true); })); return r; }, [tplArg || '', lookArg || '', brand || '', extra || '', PROPS]);
  if (app.errors.length) console.log('ERR', app.errors);
  await app.close();
  const b = await chromium.launch(); const report = [];
  for (const [k, html] of Object.entries(docs)) for (const [w, h, tag] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h } });
    await ctx.route('**/*', r => { const u = r.request().url();
      if (u.startsWith('https://landing.test')) return r.fulfill({ body: html, contentType: 'text/html; charset=utf-8' });
      if (u.startsWith('https://fontfiles.test/')) { const f = path.join(FS, decodeURIComponent(u.slice(23).split('?')[0])); if (!fs.existsSync(f)) return r.fulfill({ status: 404, body: '' });
        return r.fulfill({ body: fs.readFileSync(f), contentType: f.endsWith('.css') ? 'text/css' : 'font/woff2', headers: { 'access-control-allow-origin': '*' } }); }
      if (/fonts\.googleapis/.test(u)) { const fams = [...u.matchAll(/family=([^:&]+)(?::([^&]*))?/g)].map(m => [decodeURIComponent(m[1]).replace(/\+/g, ' '), [...new Set(((m[2] || '').match(/\b[1-9]00\b/g) || ['400']))]]);
        const css = fams.flatMap(([n, ws]) => { const d = n.toLowerCase().replace(/ /g, '-'); if (!fs.existsSync(path.join(FS, d))) return [];
          const all = ws.filter(x => fs.existsSync(path.join(FS, d, x + '.css'))).map(x => `@import url(https://fontfiles.test/${d}/${x}.css);`);
          ws.forEach(x => { if (fs.existsSync(path.join(FS, d, x + '-italic.css'))) all.push(`@import url(https://fontfiles.test/${d}/${x}-italic.css);`); }); return all; }).join('\n');
        return r.fulfill({ body: css, contentType: 'text/css' }); }
      if (process.env.SHOTS_STANDIN) { const bn = decodeURIComponent(u.split('?')[0].split('/').pop()); const f = path.join(process.env.SHOTS_STANDIN, bn.replace(/\.webp$/, '.png')); if (fs.existsSync(f)) return r.fulfill({ body: fs.readFileSync(f), contentType: f.endsWith('.svg') ? 'image/svg+xml' : 'image/png' }); } // solo pruebas: imágenes sustitutas
      if (/images\.unsplash\.com/.test(u) && PHOTO) return r.fulfill({ body: PHOTO, contentType: 'image/jpeg' });
      if (/bootstrap.*\.css/.test(u)) return r.fulfill({ body: fs.readFileSync(BS + '/css/bootstrap.min.css'), contentType: 'text/css' });
      if (/bootstrap.*\.js/.test(u)) return r.fulfill({ body: fs.readFileSync(BS + '/js/bootstrap.bundle.min.js'), contentType: 'application/javascript' });
      return r.fulfill({ status: 204, body: '' }); });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.emulateMedia({ reducedMotion: 'reduce' });
    await p.goto('https://landing.test/'); await p.waitForTimeout(500); await p.evaluate(() => document.fonts.ready);
    await p.evaluate(() => { const c = document.getElementById('ncCookies'); if (c) c.hidden = true; });
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    const ovEl = ov > 0 ? await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > window.innerWidth + 1 || (e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 0 && !['hidden','clip','auto'].includes(getComputedStyle(e).overflowX))).map(e => e.tagName + '.' + (e.className || '').toString().slice(0, 30)).slice(0, 4).join(',')) : '';
    report.push(`${k} ${tag} overflow=${ov} errs=${errs.length} ${ovEl} ${errs.join('|').slice(0, 120)}`);
    if (!NOSHOT) await p.screenshot({ path: path.join(out, `${k.replace(/[^a-z0-9_]+/gi, '-')}-${tag}.png`), fullPage: true });
    await ctx.close();
  }
  await b.close(); console.log(report.join('\n'));
})();
