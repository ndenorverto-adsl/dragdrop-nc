/* ---------- SEED ---------- */
syncCustom();
/* Landings antiguas: bloques y marcas retirados se convierten antes de pintar */
["renderPreview","renderRight"].forEach(fn=>{const f=window[fn];window[fn]=function(){ncMigrateAll();return f.apply(this,arguments);};});
(function(){const _bd=buildDoc;buildDoc=function(){ncMigrateAll();return _bd.apply(this,arguments);};})();
/* v5.7: se arranca siempre en blanco y desde 0 (cabecera, sección desde 0 vacía, pie y barra fija); las plantillas, en «Plantillas» */
if(typeof ncBlankSections==="function"){state.sections=ncBlankSections();state.selected=state.sections[1].id;}
else tplSections(typeof NC_DEFAULT_TPL!=="undefined"&&TEMPLATES[NC_DEFAULT_TPL]?NC_DEFAULT_TPL:Object.keys(TEMPLATES)[0]).forEach(s=>{s.id=nid();state.sections.push(s);});
renderPalette();setTab("content");setDevice("desktop");renderRight();renderPreview();updHist();
ncInitWorkspace();
checkAuth();
