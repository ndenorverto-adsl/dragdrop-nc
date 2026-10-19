/* ---------- SEED ---------- */
syncCustom();
/* Landings antiguas: bloques y marcas retirados se convierten antes de pintar */
["renderPreview","renderRight"].forEach(fn=>{const f=window[fn];window[fn]=function(){ncMigrateAll();return f.apply(this,arguments);};});
(function(){const _bd=buildDoc;buildDoc=function(){ncMigrateAll();return _bd.apply(this,arguments);};})();
tplSections(typeof NC_DEFAULT_TPL!=="undefined"&&TEMPLATES[NC_DEFAULT_TPL]?NC_DEFAULT_TPL:Object.keys(TEMPLATES)[0]).forEach(s=>{s.id=nid();state.sections.push(s);});
renderPalette();setTab("content");setDevice("desktop");renderRight();renderPreview();updHist();
ncInitWorkspace();
checkAuth();
