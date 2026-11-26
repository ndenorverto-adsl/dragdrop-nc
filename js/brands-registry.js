/* ---------- REGISTRO ÚNICO DE MARCAS (tabla nc_brands de Supabase) ----------
   Las marcas se leen de la tabla compartida nc_brands, la misma que usarán Creative
   Studio, los popups y Figma → Bootstrap. brands.js queda como respaldo: sin conexión
   o sin la tabla creada, el builder funciona igual que antes.
   - Se carga justo después de brands.js y aplica en el acto la última copia guardada
     (localStorage), para que una landing con una marca del registro no se quede sin ella.
   - Al terminar de cargar la página pide la versión fresca y refresca el selector.
   Esquema y carga inicial: supabase-migration-v6.0-brands.sql y
   OneDrive/Documents/023_Brandbooks_Clientes/registro-marcas/. */
const BRAND_REGISTRY = { rows: [], source: "brands.js", loadedAt: null, error: null };
const BRAND_REG_CACHE = "nc_brands_cache_v1";
const BRAND_TOKEN_ORDER = ["bp","bp2","ba","bink","bmuted","bsoft","line","btnr","cardr","btntext","ink0"];

function brandRowToBuilder(r){
  const t0 = r.tokens || {};
  if(!/^#[0-9a-f]{6}$/i.test(String(t0.bp||""))) return null;          // sin color principal no hay marca usable
  // Los bloques usan todas las variables: lo que falte se completa con valores neutros
  const dark = h => { const n = parseInt(h.slice(1),16), f = v => Math.round(v*.85).toString(16).padStart(2,"0"); return "#"+f(n>>16&255)+f(n>>8&255)+f(n&255); };
  const t = Object.assign({ bp2: dark(t0.bp), ba: t0.bp, bink: "#111111", bmuted: "#5b6573", bsoft: "#f5f6f8", line: "#e2e8f0", btnr: "8px", cardr: "12px" }, t0);
  const safe = v => String(v).replace(/[;{}<>]/g,"").trim();             // un valor no puede romper la cadena de variables
  const keys = BRAND_TOKEN_ORDER.concat(Object.keys(t).filter(k => !BRAND_TOKEN_ORDER.includes(k)));
  const vars = keys.filter(k => /^[\w-]+$/.test(k) && t[k] != null && t[k] !== "").map(k => `--${k}:${safe(t[k])};`).join("");
  const head = r.font_head || "Inter", body = r.font_body || head;
  const fam = n => `'${String(n).replace(/'/g,"")}',${FONT_SERIF.includes(n) ? "serif" : "sans-serif"}`;
  const out = { name: r.name, locked: true, vars, fhead: fam(head), fbody: fam(body), fonts: fontsHref(head, body),
    note: r.note || "",
    registry: { id: r.id, domain: r.domain || "", logos: r.logos || [], texts: r.texts || [], colors: r.colors || [], updated: r.updated_at || null } };
  if(r.grupo !== "Next Conversion & marcas") out.client = true;
  return out;
}

/* Devuelve las claves del builder que han cambiado */
function applyBrandRows(rows){
  const changed = [];
  (rows || []).forEach(r => {
    const key = r && r.builder_key;
    if(!key || key === "custom" || r.active === false) return;
    const b = brandRowToBuilder(r); if(!b) return;
    const prev = BRANDS[key];
    if(!prev || prev.vars !== b.vars || prev.fhead !== b.fhead || prev.fbody !== b.fbody || prev.name !== b.name) changed.push(key);
    BRANDS[key] = Object.assign({}, prev || {}, b);
    if(!BRAND_GROUPS.some(g => g[1].includes(key))){
      const gname = r.grupo || "Clientes NC";
      let g = BRAND_GROUPS.find(x => x[0] === gname);
      if(!g){ g = [gname, []]; BRAND_GROUPS.push(g); }
      g[1].push(key);
    }
  });
  BRAND_REGISTRY.rows = rows || [];
  return changed;
}

function refreshBrandUI(changed){
  try{
    if(typeof state === "undefined" || !state.settings) return;
    const cur = state.settings.brand;
    const bt = document.getElementById("brandTop");
    if(bt && typeof brandOptions === "function"){ bt.innerHTML = brandOptions(cur); bt.value = cur; }
    if(changed.includes(cur)){
      if(typeof renderPreview === "function") renderPreview();
      if(typeof renderRight === "function") renderRight();
    }
  }catch(e){ console.warn("Registro de marcas: no se pudo refrescar la interfaz", e); }
}

async function loadBrandRegistry(){
  if(!window.NC_SB) return;
  try{
    const { data, error } = await window.NC_SB.from("nc_brands")
      .select("id,builder_key,name,grupo,domain,tokens,font_head,font_body,colors,texts,logos,note,active,updated_at")
      .eq("active", true);
    if(error){ BRAND_REGISTRY.error = error.message; console.info("Registro de marcas no disponible, se usa brands.js:", error.message); return; }
    const changed = applyBrandRows(data);
    BRAND_REGISTRY.source = "supabase"; BRAND_REGISTRY.loadedAt = new Date().toISOString(); BRAND_REGISTRY.error = null;
    try{ localStorage.setItem(BRAND_REG_CACHE, JSON.stringify({ at: BRAND_REGISTRY.loadedAt, rows: data })); }catch(e){}
    refreshBrandUI(changed);
    console.info(`Registro de marcas: ${data.length} marcas (${changed.length} cambios frente a lo cargado)`);
  }catch(e){ BRAND_REGISTRY.error = String(e); console.info("Registro de marcas no disponible, se usa brands.js"); }
}

// 1) Copia local: inmediata, antes de que se abra ninguna landing
(function(){
  try{
    const c = JSON.parse(localStorage.getItem(BRAND_REG_CACHE) || "null");
    if(c && Array.isArray(c.rows)){ applyBrandRows(c.rows); BRAND_REGISTRY.source = "cache"; BRAND_REGISTRY.loadedAt = c.at; }
  }catch(e){}
})();
// 2) Versión fresca de Supabase cuando ya existe el cliente (cloud.js) y la interfaz
window.addEventListener("load", loadBrandRegistry);
