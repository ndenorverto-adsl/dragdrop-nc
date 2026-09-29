/* ---------- LISTENERS ---------- */
window.addEventListener("message",e=>{if(!e.data)return;if(e.data.nc==="key"){wsKey(e.data);return;}if(e.data.nc==="sel")select(e.data.id);if(e.data.nc==="act")rowAction(e.data.id,e.data.act);if(e.data.nc==="reorder")canvasReorder(e.data);
  if(e.data.nc==="edit"){const s=state.sections.find(x=>x.id===e.data.id);if(s){commitDebounced();updImportedText(s,e.data.k,e.data.val);}}
  if(e.data.nc==="move"){const s=state.sections.find(x=>x.id===e.data.id);if(s&&s.freeHtml){commitDebounced();s.freeHtml=_freeSetT(s.freeHtml,e.data.ncid,e.data.transform);}}
  if(e.data.nc==="delel"){const s=state.sections.find(x=>x.id===e.data.id);if(s&&s.freeHtml){commit();s.freeHtml=_freeDel(s.freeHtml,e.data.ncid);}}
  if(e.data.nc==="editimg"){const s=state.sections.find(x=>x.id===e.data.id);if(!s)return;const inp=document.createElement("input");inp.type="file";inp.accept="image/*";inp.onchange=ev=>readImg(ev.target.files[0],url=>{commit();updImportedImg(s,e.data.k,url);renderPreview();});inp.click();}
});
function canvasReorder(d){const from=state.sections.findIndex(x=>x.id===d.dragId);if(from<0||d.dragId===d.refId)return;commit();const m=state.sections.splice(from,1)[0];let to=state.sections.findIndex(x=>x.id===d.refId);if(to<0){state.sections.splice(from,0,m);return;}if(!d.before)to=to+1;state.sections.splice(to,0,m);renderPreview();renderRight();renderPalette();toast("Sección movida");}
document.querySelectorAll('.tabs button').forEach(b=>b.addEventListener('click',()=>setTab(b.dataset.tab)));
document.querySelectorAll('#devSeg button').forEach(b=>b.addEventListener('click',()=>setDevice(b.dataset.dev)));
document.getElementById("btnExport").addEventListener('click',()=>ncOpenChecklist(exportZip));
document.getElementById("btnExportHtml").addEventListener('click',()=>ncOpenChecklist(exportHTML));
document.getElementById("btnCheck").addEventListener('click',()=>ncOpenChecklist());
document.getElementById("btnUndo").addEventListener('click',undo);
document.getElementById("btnRedo").addEventListener('click',redo);
document.getElementById("palSearch").addEventListener('input',renderPalette);
setTimeout(()=>{const ps=document.getElementById("palSearch");if(ps&&/@/.test(ps.value)){ps.value="";renderPalette();}},500);
document.getElementById("btnPreview").addEventListener('click',()=>{try{const url=URL.createObjectURL(new Blob([buildDoc(true)],{type:"text/html;charset=utf-8"}));const w=window.open(url,"_blank");if(!w)toast("El navegador bloqueó la ventana · usa Exportar");}catch(e){toast("Aquí no se puede abrir en pestaña · usa Exportar");}});
document.getElementById("dropZone").addEventListener('dragover',e=>e.preventDefault());
document.getElementById("dropZone").addEventListener('drop',e=>{e.preventDefault();showDrop(false);if(dragType){addSection(dragType);dragType=null;}});
(function(){const sel=document.getElementById("brandTop");sel.innerHTML=brandOptions(state.settings.brand);sel.value=state.settings.brand;
  sel.addEventListener('change',e=>{commit();state.settings.brand=e.target.value;renderPalette();renderPreview();renderRight();});})();
(function(){const t=document.getElementById("tplSel");t.innerHTML='<option value="">Plantilla…</option>'+Object.keys(CLIENT_HTML).map(n=>`<option>${n}</option>`).join("")+Object.keys(TEMPLATES).map(n=>`<option>${n}</option>`).join("");
  Object.entries(CLIENT_HTML).forEach(([n,u])=>{fetch(u,{method:'HEAD'}).then(r=>{if(!r.ok)throw 0;}).catch(()=>{[...t.options].forEach(o=>{if(o.text===n)o.remove();});});});
  t.addEventListener('change',e=>{const v=e.target.value;if(v){if(CLIENT_HTML[v])loadClientHtml(v);else loadTemplate(v);}e.target.value="";});})();
/* atajos de teclado: ver js/workspace.js */
