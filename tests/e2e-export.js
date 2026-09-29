// E2E de la landing EXPORTADA: consentimiento, atribución, formulario, tracking, móvil.
// Uso: node e2e-export.js <carpeta_app>
const { open } = require('./harness');
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok  ' : 'FAIL') + ' ' + m); if (!c) fails++; };
(async () => {
  const app = await open(path.resolve(process.argv[2]));
  const html = await app.page.evaluate(() => {
    loadTemplate('Oferta con precio'); state.sections.find(x => x.type === 'da_faq').props.items = '¿Hay permanencia?|No, ninguna.\n¿Cuánto tarda?|Menos de una semana.';
    Object.assign(state.settings, { tel: '910 000 000', wa: '34600000000', endpoint: 'https://leads.example.test/submit', gtm: 'GTM-TEST123',
      urlPrivacy: 'https://example.test/privacidad', urlCookies: 'https://example.test/cookies', legalOwner: 'Cliente Demo SL',
      pageUrl: 'https://ofertas.example.test/fibra', title: 'Fibra 1Gb al mejor precio | Demo', desc: 'Contrata fibra 1Gb sin permanencia. Te llamamos gratis en menos de 24 horas.', thanks: true });
    return buildDoc(true);
  });
  const audit = await app.page.evaluate(() => ncAudit());
  await app.close();
  fs.writeFileSync(path.join(OUT, 'landing.html'), html);
  ok(/<script data-nc-keep>[\s\S]*gtag\('consent','default'[\s\S]*gtm\.start/.test(html), 'Consent default antes de GTM en <head>');
  ok(/<link rel="canonical" href="https:\/\/ofertas\.example\.test\/fibra">/.test(html), 'canonical real');
  ok(!/\{\{URL_CANONICA\}\}/.test(html), 'sin placeholder de canonical');
  ok(/name="robots" content="noindex/.test(html), 'noindex por defecto');
  ok(/application\/ld\+json/.test(html), 'FAQPage JSON-LD');
  ok(/fetchpriority="high"/.test(html) || !/<img/.test(html), 'hero con fetchpriority (si hay imagen)');
  console.log('    checklist:', audit.map(a => a.lvl + ': ' + a.m).join(' | ') || 'vacío');

  const browser = await chromium.launch();
  const http = require('http'); let realHits = 0;
  const real = await new Promise(r => { const sv = http.createServer((q, a) => { let b=''; q.on('data', c => b += c); q.on('end', () => { realHits++; a.writeHead(200, { 'content-type': 'text/plain' }); a.end('ok'); }); }).listen(0, () => r(sv)); });
  const run = async (mode, viewport) => {
    const ctx = await browser.newContext({ viewport: viewport || { width: 1280, height: 900 } });
    const reqs = [];
    await ctx.route('**/*', async route => {
      const u = route.request().url();
      if (u.startsWith('http://127.0.0.1:')) return route.continue();
      if (u.startsWith('https://landing.test/')) return route.fulfill({ body: mode === 'nocors' ? html.split('https://leads.example.test/submit').join('http://127.0.0.1:' + real.address().port + '/submit') : html, contentType: 'text/html; charset=utf-8' });
      if (u.startsWith('https://leads.example.test/')) {
        { const b = route.request().postDataBuffer(); reqs.push(b ? b.toString('utf8') : ''); if (process.env.DBG) console.log('REQ', route.request().method(), (b ? b.toString('utf8') : '').replace(/------WebKitFormBoundary[A-Za-z0-9]+/g,'|').replace(/Content-Disposition: form-data; /g,'').slice(0, 900).replace(/\r?\n/g, ' ')); }
        if (mode === 'cors200') return route.fulfill({ status: 200, body: '{"ok":true}', headers: { 'access-control-allow-origin': '*', 'content-type': 'application/json' } });
        if (mode === 'cors500') return route.fulfill({ status: 500, body: 'err', headers: { 'access-control-allow-origin': '*' } });
        return route.fulfill({ status: 200, body: 'ok' }); // sin CORS
      }
      const DEPS = path.join(__dirname, 'node_modules');
      if (/bootstrap.*\.css/.test(u)) return route.fulfill({ body: fs.readFileSync(DEPS + '/bootstrap/dist/css/bootstrap.min.css'), contentType: 'text/css' });
      if (/bootstrap.*\.js/.test(u)) return route.fulfill({ body: fs.readFileSync(DEPS + '/bootstrap/dist/js/bootstrap.bundle.min.js'), contentType: 'application/javascript' });
      return route.fulfill({ status: 204, body: '' });
    });
    const p = await ctx.newPage(); const errs = [];
    p.on('pageerror', e => errs.push(e.message));
    await p.goto('https://landing.test/?utm_source=google&utm_medium=cpc&utm_campaign=fibra_es&gclid=TESTGCLID123');
    await p.waitForTimeout(400);
    return { ctx, p, reqs, errs };
  };
  const fillAndSubmit = async (p, tel) => {
    const f = p.locator('form[data-callback]').first();
    await f.scrollIntoViewIfNeeded();
    for (const el of await f.locator('input[required],select[required],textarea[required]').all()) {
      const t = (await el.getAttribute('type')) || (await el.evaluate(e => e.tagName.toLowerCase()));
      if (t === 'checkbox') await el.check({ force: true });
      else if (t === 'tel') await el.fill(tel);
      else if (t === 'email') await el.fill('lead@example.es');
      else if (t === 'select') await el.selectOption({ index: 1 });
      else if (t !== 'hidden') await el.fill('Prueba');
    }
    await f.locator('button[type=submit],button:not([type])').first().click();
    await p.waitForTimeout(600);
    return f;
  };
  const dl = p => p.evaluate(() => JSON.parse(JSON.stringify(window.dataLayer.map(x => (x && x.length !== undefined && typeof x !== 'string') ? Array.from(x) : x))));

  // 1) Consentimiento
  let t = await run('cors200');
  ok(await t.p.locator('#ncCookies').isVisible(), 'banner visible en primera visita');
  let d = await dl(t.p);
  ok(d.some(x => Array.isArray(x) && x[0] === 'consent' && x[1] === 'default' && x[2].ad_storage === 'denied'), 'consent default = denied');
  await t.p.click('[data-ck-act=reject]');
  d = await dl(t.p);
  ok(!(await t.p.locator('#ncCookies').isVisible()) && d.some(x => x.event === 'consent_update' && x.consent_ads === 'denied'), 'Rechazar oculta banner y empuja consent_update denied');
  await t.p.reload(); await t.p.waitForTimeout(300);
  ok(!(await t.p.locator('#ncCookies').isVisible()), 'la elección persiste al recargar');
  await t.p.click('[data-nc-cookies]');
  ok(await t.p.locator('#ncCookies').isVisible(), 'enlace "Configurar cookies" reabre el banner');
  await t.p.click('[data-ck-act=accept]');
  d = await dl(t.p);
  ok(d.some(x => Array.isArray(x) && x[0] === 'consent' && x[1] === 'update' && x[2].ad_storage === 'granted'), 'Aceptar → consent update granted');

  // 2) Atribución + honeypot
  const hidden = await t.p.evaluate(() => { const f = document.querySelector('form[data-callback]'); const g = n => (f.querySelector('[name="' + n + '"]') || {}).value; return { gclid: g('gclid'), src: g('utm_source'), camp: g('utm_campaign'), url: g('landing_url'), fid: g('form_id') }; });
  ok(hidden.gclid === 'TESTGCLID123' && hidden.src === 'google' && hidden.camp === 'fibra_es', 'UTM + gclid en campos ocultos (' + JSON.stringify(hidden) + ')');
  const hp = await t.p.locator('[name=nc_website]').first().boundingBox();
  ok(!hp || hp.x < -1000, 'honeypot fuera de pantalla');

  // 3) Teléfono inválido no envía
  await fillAndSubmit(t.p, '12345');
  ok(t.reqs.length === 0, 'teléfono inválido bloquea el envío');
  // 4) Envío correcto
  await t.p.reload(); await t.p.waitForTimeout(300);
  await fillAndSubmit(t.p, '600 11 22 33');
  d = await dl(t.p);
  const body = t.reqs[0] || '';
  ok(/600112233/.test(body) && /TESTGCLID123/.test(body) && /acepta_privacidad[\s\S]*si/.test(body), 'POST con teléfono normalizado, gclid y privacidad');
  const lead = d.find(x => x.event === 'generate_lead');
  ok(lead && lead.delivery === 'confirmed' && lead.user_data && lead.user_data.phone_number === '+34600112233', 'generate_lead confirmado con user_data');
  ok(await t.p.locator('[role=status]').first().isVisible(), 'mensaje de gracias');
  ok(d.some(x => x.event === 'form_start'), 'form_start');
  await t.p.evaluate(() => { const a = document.createElement('a'); a.href = 'tel:910000000'; a.setAttribute('data-cta', 'call'); a.textContent = 'Llamar'; a.id = 'tt'; document.body.appendChild(a); });
  await t.p.evaluate(() => document.getElementById('tt').addEventListener('click', e => e.preventDefault()));
  await t.p.click('#tt'); d = await dl(t.p);
  ok(d.some(x => x.event === 'click_to_call' && x.phone === '910000000'), 'click_to_call');
  ok(!t.errs.length, 'sin errores JS (' + t.errs.join(';') + ')');
  await t.ctx.close();

  // 5) Error HTTP del endpoint
  t = await run('cors500'); await t.p.click('[data-ck-act=accept]');
  await fillAndSubmit(t.p, '600112233'); d = await dl(t.p);
  ok(await t.p.locator('.nc-alert').first().isVisible() && d.some(x => x.event === 'form_error'), 'error 500 → aviso + form_error');
  ok(!d.some(x => x.event === 'generate_lead'), 'sin generate_lead si falla');
  await t.ctx.close();
  // 6) Endpoint sin CORS
  t = await run('nocors'); await t.p.click('[data-ck-act=accept]');
  await fillAndSubmit(t.p, '+34 600 112 233'); d = await dl(t.p);
  const l2 = d.find(x => x.event === 'generate_lead');
  ok(realHits <= 1 && l2 && l2.delivery === 'unconfirmed', 'sin CORS: nunca reenvía y marca delivery unconfirmed');
  await t.ctx.close();
  // 7) Móvil
  t = await run('cors200', { width: 390, height: 844 });
  await t.p.screenshot({ path: path.join(OUT, 'movil-banner.png') });
  await t.p.click('[data-ck-act=reject]');
  const f = t.p.locator('form[data-callback]').first(); await f.scrollIntoViewIfNeeded();
  await t.p.screenshot({ path: path.join(OUT, 'movil-form.png') });
  const overflow = await t.p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  ok(!overflow, 'sin scroll horizontal en móvil');
  await t.ctx.close(); await browser.close(); real.close();
  console.log(fails ? fails + ' FALLOS' : 'TODO OK'); process.exit(fails ? 1 : 0);
})();
