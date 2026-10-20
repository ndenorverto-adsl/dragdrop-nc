// /api/fetch — trae el HTML o el CSS de una página pública para convertir una sección en módulo («Mis módulos → Desde una web»).
//
//  GET /api/fetch?url=https://…   Cabecera obligatoria: Authorization: Bearer <access_token de la sesión de Supabase del builder>
//  → { url, finalUrl, contentType, text }
//
//  Seguridad: solo usuarios con sesión; solo http/https y puertos 80/443; bloquea IPs privadas, locales y de metadatos
//  (también tras cada redirección); máximo 3 redirecciones, 10 s y 3 MB; solo devuelve HTML o CSS.
const path = require('path');
const fs = require('fs');
const dns = require('dns').promises;
const net = require('net');

const MAX = 3 * 1024 * 1024;

function supa() {
  let url = process.env.NC_SUPABASE_URL || '', anon = process.env.NC_SUPABASE_ANON || '';
  if (!url || !anon) {
    try {
      const c = fs.readFileSync(path.join(__dirname, '..', 'config.js'), 'utf8');
      url = url || (c.match(/SUPABASE_URL\s*:\s*["']([^"']+)/) || [])[1] || '';
      anon = anon || (c.match(/SUPABASE_ANON_KEY\s*:\s*["']([^"']+)/) || [])[1] || '';
    } catch (e) {}
  }
  return { url: url.replace(/\/$/, ''), anon };
}
async function whoami(req) {
  const tok = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!tok) return { error: 'Inicia sesión en el builder para traer páginas.', code: 401 };
  const s = supa();
  if (!s.url || !s.anon) return { error: 'Falta la configuración de Supabase en el servidor.', code: 500 };
  const r = await fetch(s.url + '/auth/v1/user', { headers: { apikey: s.anon, Authorization: 'Bearer ' + tok } });
  if (!r.ok) return { error: 'Sesión caducada: vuelve a entrar.', code: 401 };
  return { ok: true };
}
function privateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224;
  }
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return privateIp(v.slice(7));
  return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80');
}
async function safeUrl(u) {
  let x;
  try { x = new URL(u); } catch (e) { return 'URL no válida'; }
  if (!/^https?:$/.test(x.protocol)) return 'Solo se admiten direcciones http o https';
  if (x.port && !['80', '443'].includes(x.port)) return 'Puerto no permitido';
  if (x.username || x.password) return 'URL no permitida';
  const host = x.hostname.replace(/^\[|\]$/g, '');
  if (/^(localhost|.*\.local|.*\.internal)$/i.test(host)) return 'Dirección no permitida';
  let addrs = [];
  try { addrs = net.isIP(host) ? [{ address: host }] : await dns.lookup(host, { all: true }); } catch (e) { return 'No se encuentra el dominio'; }
  if (!addrs.length || addrs.some(a => privateIp(a.address))) return 'Dirección no permitida';
  return null;
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  const send = (code, obj) => { res.statusCode = code; res.end(JSON.stringify(obj)); };
  try {
    if (req.method !== 'GET') return send(405, { error: 'Método no permitido' });
    const who = await whoami(req);
    if (who.error) return send(who.code, { error: who.error });
    const q = new URL(req.url, 'http://x').searchParams;
    let url = String(q.get('url') || '').trim();
    if (!url) return send(400, { error: 'Falta la URL' });
    let r = null;
    for (let hop = 0; hop <= 3; hop++) {
      const bad = await safeUrl(url);
      if (bad) return send(400, { error: bad });
      const ac = new AbortController(); const t = setTimeout(() => ac.abort(), 10000);
      try {
        r = await fetch(url, { redirect: 'manual', signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0 (NC Landing Builder; importador de módulos)', Accept: 'text/html,text/css,*/*;q=0.5', 'Accept-Language': 'es-ES,es;q=0.9' } });
      } finally { clearTimeout(t); }
      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) { url = new URL(r.headers.get('location'), url).toString(); continue; }
      break;
    }
    if (!r || (r.status >= 300 && r.status < 400)) return send(400, { error: 'Demasiadas redirecciones' });
    if (!r.ok) return send(502, { error: 'La página respondió ' + r.status });
    const ct = String(r.headers.get('content-type') || '');
    if (!/text\/html|text\/css|application\/xhtml/i.test(ct)) return send(415, { error: 'Solo se admiten páginas HTML u hojas CSS' });
    const len = +r.headers.get('content-length') || 0;
    if (len > MAX) return send(413, { error: 'La página pesa demasiado (máx. 3 MB)' });
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > MAX) return send(413, { error: 'La página pesa demasiado (máx. 3 MB)' });
    return send(200, { url: String(q.get('url')), finalUrl: url, contentType: ct, text: buf.toString('utf8') });
  } catch (e) {
    return send(500, { error: e && e.name === 'AbortError' ? 'La página tardó demasiado' : 'No se pudo traer la página' });
  }
};
