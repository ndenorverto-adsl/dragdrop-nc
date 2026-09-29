// Supabase falso en memoria para tests (sin red). Expone window.__db.
window.NC_CONFIG = { SUPABASE_URL: 'https://fake.supabase.co', SUPABASE_ANON_KEY: 'x', BUCKET: 'b' };
(function () {
  const db = window.__db = { landings: [], landing_versions: [] }; let n = 0;
  const id = () => 'id' + (++n) + '-' + Math.random().toString(36).slice(2, 6);
  function Q(t) { this.t = t; this.op = 'select'; this.f = []; this.ord = null; this.rg = null; this.one = false; }
  Q.prototype.select = function () { return this; };
  Q.prototype.insert = function (r) { this.op = 'insert'; this.p = JSON.parse(JSON.stringify(r)); return this; };
  Q.prototype.upsert = function (r) { this.op = 'upsert'; this.p = JSON.parse(JSON.stringify(r)); return this; };
  Q.prototype.delete = function () { this.op = 'delete'; return this; };
  Q.prototype.eq = function (k, v) { this.f.push(r => r[k] === v); return this; };
  Q.prototype.in = function (k, vs) { this.f.push(r => vs.includes(r[k])); return this; };
  Q.prototype.order = function (k, o) { this.ord = [k, o && o.ascending]; return this; };
  Q.prototype.range = function (a, b) { this.rg = [a, b]; return this; };
  Q.prototype.single = function () { this.one = true; return this; };
  Q.prototype.then = function (res, rej) { return Promise.resolve(this.run()).then(res, rej); };
  Q.prototype.run = function () {
    const T = db[this.t]; if (!T) return { data: null, error: { message: 'relation "public.' + this.t + '" does not exist' } };
    const now = new Date(Date.now() + (n++)).toISOString();
    if (this.op === 'insert') { const r = Object.assign({ id: id(), created_at: now }, this.p); T.push(r); return { data: r, error: null }; }
    if (this.op === 'upsert') { let r = this.p.id && T.find(x => x.id === this.p.id); if (r) Object.assign(r, this.p); else { r = Object.assign({ id: id(), created_at: now }, this.p); T.push(r); } return { data: JSON.parse(JSON.stringify(r)), error: null }; }
    let rows = T.filter(r => this.f.every(f => f(r)));
    if (this.op === 'delete') { db[this.t] = T.filter(r => !rows.includes(r)); if (this.t === 'landings' && db.landing_versions) db.landing_versions = db.landing_versions.filter(v => !rows.some(r => r.id === v.landing_id)); return { data: null, error: null }; }
    if (this.ord) { const [k, asc] = this.ord; rows = rows.slice().sort((a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * (asc ? 1 : -1)); }
    if (this.rg) rows = rows.slice(this.rg[0], this.rg[1] + 1);
    rows = JSON.parse(JSON.stringify(rows));
    return this.one ? { data: rows[0] || null, error: rows[0] ? null : { message: 'not found' } } : { data: rows, error: null };
  };
  window.supabase = { createClient: () => ({ from: t => new Q(t),
    auth: { getSession: async () => ({ data: { session: { user: { email: 'equipo@nc.test' } } } }), signInWithPassword: async () => ({ error: null }) },
    storage: { from: () => ({ upload: async () => ({ error: { message: 'sin storage en test' } }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) } }) };
})();
