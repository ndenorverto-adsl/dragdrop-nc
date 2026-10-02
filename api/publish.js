// /api/publish — publica landings desde el builder (FTP/FTPS o Vercel). Las credenciales viven SOLO en variables de entorno de Vercel.
//
//  GET  /api/publish                       → destinos disponibles (sin secretos)
//  POST /api/publish {target, action:"put", dir, file, data(base64)}  → sube un archivo (FTP) o lo registra (Vercel)
//  POST /api/publish {target, action:"finish", dir, files:[...], prod} → FTP: devuelve la URL · Vercel: crea el despliegue
//
//  Cabecera obligatoria: Authorization: Bearer <access_token de la sesión de Supabase del builder>.
//
//  Variables de entorno:
//   NC_PUBLISH_TARGETS  JSON con los destinos, p. ej.
//     [{"id":"nc","name":"Servidor NC","type":"ftp","host":"ftp.midominio.com","port":21,"user":"...","password":"...","secure":true,
//       "base":"/public_html/landings","publicUrl":"https://landings.midominio.com"},
//      {"id":"prev","name":"Vista previa","type":"ftp","preview":true, ...},
//      {"id":"vercel","name":"Vercel landings","type":"vercel","token":"...","team":"team_xxx","prefix":"nc-"}]
//   NC_PUBLISH_EMAILS   (opcional) quién puede publicar: "@nextconversion.es,ana@x.com"
//   NC_SUPABASE_URL / NC_SUPABASE_ANON (opcional) — si no están, se leen de config.js
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { Readable } = require('stream');

const MAX_FILE = 3.2 * 1024 * 1024; // por archivo (el cuerpo de una función de Vercel admite ~4,5 MB)
const VAPI = process.env.NC_VERCEL_API || 'https://api.vercel.com';

function targets() {
  try { const t = JSON.parse(process.env.NC_PUBLISH_TARGETS || '[]'); return Array.isArray(t) ? t.filter(x => x && x.id && x.type) : []; }
  catch (e) { return []; }
}
function publicTarget(t) {
  return { id: t.id, name: t.name || t.id, type: t.type, preview: !!t.preview, publicUrl: t.publicUrl || '', prefix: t.prefix || '' };
}
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
  if (!tok) return { error: 'Inicia sesión en el builder para publicar.', code: 401 };
  const s = supa();
  if (!s.url || !s.anon) return { error: 'Falta la configuración de Supabase en el servidor.', code: 500 };
  const r = await fetch(s.url + '/auth/v1/user', { headers: { apikey: s.anon, Authorization: 'Bearer ' + tok } });
  if (!r.ok) return { error: 'Sesión caducada: vuelve a entrar.', code: 401 };
  const u = await r.json().catch(() => ({}));
  const email = String(u.email || '').toLowerCase();
  const allow = String(process.env.NC_PUBLISH_EMAILS || '').toLowerCase().split(',').map(x => x.trim()).filter(Boolean);
  if (allow.length && !allow.some(a => (a.startsWith('@') ? email.endsWith(a) : email === a))) return { error: 'Tu usuario no tiene permiso para publicar.', code: 403 };
  return { email };
}
// rutas seguras: solo letras, números, - _ . / ; sin "..", sin barra inicial
function cleanRel(p) {
  const s = String(p || '').replace(/\\/g, '/').replace(/^\/+/, '');
  if (!s || s.length > 200 || /(^|\/)\.\.?(\/|$)/.test(s) || !/^[a-zA-Z0-9._\-\/]+$/.test(s)) return null;
  return s;
}
function cleanName(p) { const s = String(p || '').toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 90); return s || null; }

async function ftpPut(t, remote, buf) {
  const ftp = require('basic-ftp');
  const c = new ftp.Client(25000);
  try {
    await c.access({ host: t.host, port: t.port || 21, user: t.user, password: t.password, secure: !!t.secure,
      secureOptions: t.secure ? { rejectUnauthorized: t.rejectUnauthorized !== false } : undefined });
    await c.ensureDir(path.posix.dirname(remote));
    await c.uploadFrom(Readable.from([buf]), path.posix.basename(remote));
  } finally { c.close(); }
}
async function vercelFile(t, buf) {
  const sha = crypto.createHash('sha1').update(buf).digest('hex');
  const q = t.team ? '?teamId=' + encodeURIComponent(t.team) : '';
  const r = await fetch(VAPI + '/v2/files' + q, { method: 'POST', headers: { Authorization: 'Bearer ' + t.token, 'Content-Type': 'application/octet-stream', 'x-vercel-digest': sha, 'Content-Length': String(buf.length) }, body: buf });
  if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error((j.error && j.error.message) || ('Vercel ' + r.status)); }
  return { sha, size: buf.length };
}
async function vercelDeploy(t, name, files, prod) {
  const q = t.team ? '?teamId=' + encodeURIComponent(t.team) : '';
  const body = { name, project: name, files, projectSettings: { framework: null, buildCommand: null, outputDirectory: null, installCommand: null, devCommand: null } };
  if (prod) body.target = 'production';
  const r = await fetch(VAPI + '/v13/deployments' + q + (q ? '&' : '?') + 'skipAutoDetectionConfirmation=1', { method: 'POST', headers: { Authorization: 'Bearer ' + t.token, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j.error && j.error.message) || ('Vercel ' + r.status));
  return { url: 'https://' + j.url, alias: prod ? 'https://' + name + '.vercel.app' : '', id: j.id };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const send = (code, body) => res.status(code).json(body);
  try {
    const me = await whoami(req);
    if (me.error) return send(me.code, { error: me.error });
    const T = targets();
    if (req.method === 'GET') return send(200, { targets: T.map(publicTarget), user: me.email });
    if (req.method !== 'POST') return send(405, { error: 'Método no permitido' });
    const b = req.body || {};
    const t = T.find(x => x.id === b.target);
    if (!t) return send(400, { error: 'Destino desconocido. Revisa NC_PUBLISH_TARGETS en Vercel.' });

    if (b.action === 'put') {
      const dir = cleanRel(b.dir), file = cleanRel(b.file);
      if (!dir || !file) return send(400, { error: 'Ruta no válida: ' + String(b.dir) + '/' + String(b.file).slice(0, 80) });
      const rel = dir + '/' + file;
      const buf = Buffer.from(String(b.data || ''), 'base64');
      if (!buf.length) return send(400, { error: 'Archivo vacío' });
      if (buf.length > MAX_FILE) return send(413, { error: 'Archivo demasiado grande (' + Math.round(buf.length / 1024) + ' KB). Optimiza las imágenes antes de publicar.' });
      if (t.type === 'ftp') {
        const base = String(t.base || '/').replace(/\/+$/, '');
        await ftpPut(t, base + '/' + rel, buf);
        return send(200, { ok: true });
      }
      if (t.type === 'vercel') { const f = await vercelFile(t, buf); return send(200, Object.assign({ ok: true, file }, f)); }
      return send(400, { error: 'Tipo de destino no soportado: ' + t.type });
    }

    if (b.action === 'finish') {
      const dir = cleanRel(b.dir);
      if (!dir) return send(400, { error: 'Carpeta no válida' });
      if (t.type === 'ftp') {
        const pub = String(t.publicUrl || '').replace(/\/+$/, '');
        return send(200, { ok: true, url: pub ? pub + '/' + dir + '/' : '', note: pub ? '' : 'Sube hecho. Añade "publicUrl" al destino para ver la URL pública.' });
      }
      if (t.type === 'vercel') {
        const files = (Array.isArray(b.files) ? b.files : []).filter(f => f && cleanRel(f.file) && /^[a-f0-9]{40}$/.test(f.sha)).map(f => ({ file: f.file, sha: f.sha, size: +f.size || 0 }));
        if (!files.some(f => f.file === 'index.html')) return send(400, { error: 'Falta index.html' });
        const name = cleanName((t.prefix || '') + dir.replace(/\//g, '-'));
        if (!name) return send(400, { error: 'Nombre de proyecto no válido' });
        const d = await vercelDeploy(t, name, files, !!b.prod && !t.preview);
        return send(200, Object.assign({ ok: true }, d, { url: d.alias || d.url }));
      }
    }
    return send(400, { error: 'Acción no válida' });
  } catch (e) {
    return send(502, { error: 'No se pudo publicar: ' + (e && e.message ? e.message : e) });
  }
};
