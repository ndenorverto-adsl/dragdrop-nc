/* ---------- SEED ---------- */
syncCustom();
tplSections("Oferta con precio").forEach(s=>{s.id=nid();state.sections.push(s);});
renderPalette();setTab("content");setDevice("desktop");renderRight();renderPreview();updHist();
ncInitWorkspace();
checkAuth();
