/* ---------- SEED ---------- */
syncCustom();
TEMPLATES["Captación · llamada"].forEach(t=>state.sections.push({id:nid(),type:t,props:LIB[t].def(),style:{}}));
renderPalette();setTab("content");setDevice("desktop");renderRight();renderPreview();updHist();
ncInitWorkspace();
checkAuth();
