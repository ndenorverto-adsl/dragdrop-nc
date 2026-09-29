// Harness: sirve una carpeta, intercepta CDNs con copias locales y ejecuta el builder en Chromium headless.
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const DEPS = path.join(__dirname, 'node_modules');
const MAP = [
  [/bootstrap(@|\/)5\.3\.3.*bootstrap\.min\.css/, DEPS + '/bootstrap/dist/css/bootstrap.min.css', 'text/css'],
  [/bootstrap(@|\/)5\.3\.3.*bootstrap\.bundle\.min\.js/, DEPS + '/bootstrap/dist/js/bootstrap.bundle.min.js', 'application/javascript'],
  [/jszip/, DEPS + '/jszip/dist/jszip.min.js', 'application/javascript'],
  [/supabase-js/, DEPS + '/@supabase/supabase-js/dist/umd/supabase.js', 'application/javascript'],
];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml' };
function serve(root) {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
      const f = path.join(root, p);
      if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { rsp.writeHead(404); return rsp.end('404'); }
      rsp.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(rsp);
    }).listen(0, () => res(srv));
  });
}
async function open(root, opts = {}) {
  const srv = await serve(root); const port = srv.address().port;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: opts.viewport || { width: 1440, height: 900 } });
  await ctx.route('**/*', route => {
    const u = route.request().url();
    if (u.startsWith('http://localhost:' + port)) {
      if (!opts.cloud && /\/config\.js$/.test(u)) return route.fulfill({ body: opts.fake ? '/* config en fake */' : '/* test: sin nube */', contentType: 'application/javascript' });
      return route.continue();
    }
    if (opts.fake && /supabase-js/.test(u)) return route.fulfill({ body: opts.fake, contentType: 'application/javascript' });
    for (const [re, file, ct] of MAP) if (re.test(u)) return route.fulfill({ body: fs.readFileSync(file), contentType: ct });
    if (/fonts\.(googleapis|gstatic)/.test(u)) return route.fulfill({ body: '', contentType: 'text/css' });
    return route.fulfill({ status: 204, body: '' }); // resto de red externa: vacío
  });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  page.on('dialog', d => d.accept());
  await page.goto(`http://localhost:${port}/${opts.file || 'index.html'}`);
  await page.waitForTimeout(opts.wait || 1200);
  return { page, ctx, errors, port, close: async () => { await browser.close(); srv.close(); } };
}
module.exports = { open, serve };
