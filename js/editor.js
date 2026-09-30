/* ---------- PREVIEW ---------- */
let pendingScrollId=null;
function renderPreview(){const f=document.getElementById("pv");
  f.onload=function(){if(pendingScrollId){try{const el=f.contentDocument.querySelector('[data-sec="'+pendingScrollId+'"]');if(el)el.scrollIntoView({behavior:"smooth",block:"center"});}catch(e){}pendingScrollId=null;}};
  f.srcdoc=buildDoc(false);renderOutline();}
function patchSection(id){const s=state.sections.find(x=>x.id===id);if(!s)return;
  const doc=document.getElementById("pv").contentDocument;if(!doc){renderPreview();return;}
  const wrap=doc.querySelector('[data-sec="'+id+'"]');if(!wrap){renderPreview();return;}
  const tb=wrap.querySelector('.nc-tb');
  wrap.innerHTML=(tb?tb.outerHTML:"")+renderSection(s);}

/* ---------- PALETA ---------- */
function renderPalette(){
  const ps=document.getElementById("palSearch");
  let q=(ps&&ps.value||"").toLowerCase();
  if(q.indexOf("@")>-1){ q=""; if(ps)ps.value=""; }   // el navegador autocompleta el email: lo descartamos
  const cats={};ORDER.forEach(t=>{const b=LIB[t];if(!b||b.hidden)return;if(b.brand&&b.brand!==state.settings.brand)return;if(q&&!(b.label.toLowerCase().includes(q)||b.cat.toLowerCase().includes(q)))return;(cats[b.cat]=cats[b.cat]||[]).push(t);});
  let h="";Object.keys(cats).forEach(cat=>{h+=`<div class="paneltitle">${cat}</div><div class="cat">`;
    cats[cat].forEach(t=>{const b=LIB[t];h+=`<div class="chip" draggable="true" data-add="${t}"><span class="ico">${b.ico}</span> ${b.label}<span class="k">+</span></div>`;});h+="</div>";});
  const p=document.getElementById("palette");p.innerHTML=h||`<div class="empty">Sin resultados</div>`;
  p.querySelectorAll('.chip[data-add]').forEach(c=>{
    c.addEventListener('dragstart',()=>{dragType=c.dataset.add;showDrop(true);});
    c.addEventListener('dragend',()=>showDrop(false));
    c.addEventListener('click',()=>addSection(c.dataset.add));});
}

/* ---------- ESTRUCTURA ---------- */
function renderOutline(){const o=document.getElementById("outline");
  document.getElementById("secCount").textContent="· "+state.sections.length;
  if(!state.sections.length){o.innerHTML=`<div class="empty">Vacío. Arrastra un bloque o haz clic en la izquierda.</div>`;return;}
  o.innerHTML=state.sections.map((s,i)=>`<div class="oitem ${s.id===state.selected?'sel':''} ${s.hidden?'hid':''}" draggable="true" data-id="${s.id}" data-i="${i}"><span class="grip">⋮⋮</span><span class="nm">${LIB[s.type].label}${s.hidden?' <span class="tag">oculta</span>':''}</span><button class="mini" data-act="hide" title="${s.hidden?'Mostrar':'Ocultar (no se exporta)'}">${s.hidden?'◌':'👁'}</button><button class="mini" data-act="up">↑</button><button class="mini" data-act="down">↓</button><button class="mini" data-act="dup">⧉</button><button class="mini" data-act="del">🗑</button></div>`).join("");
  o.querySelectorAll('.oitem').forEach(el=>{const id=el.dataset.id;
    el.addEventListener('click',e=>{if(e.target.dataset.act)return;select(id);});
    el.querySelectorAll('.mini').forEach(btn=>btn.addEventListener('click',e=>{e.stopPropagation();rowAction(id,btn.dataset.act);}));
    el.addEventListener('dragstart',()=>{dragId=id;dragType=null;});
    el.addEventListener('dragover',e=>{e.preventDefault();el.classList.add('dragover');});
    el.addEventListener('dragleave',()=>el.classList.remove('dragover'));
    el.addEventListener('drop',e=>{e.preventDefault();el.classList.remove('dragover');dropOnIndex(parseInt(el.dataset.i,10));});});
}

/* ---------- CAMPOS (content/style) ---------- */
function subField(sf,it,repk,i){
  const v=it[sf.k];
  if(sf.t==="select")return `<select data-rf="${repk}" data-ri="${i}" data-rk="${sf.k}">${sf.opts.map(o=>`<option value="${o[0]}" ${String(v)===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select>`;
  if(sf.t==="image"){const key=repk+"|"+i+"|"+sf.k;return `<div class="up"><input type="file" accept="image/*" data-rfile="${key}" style="display:none"><div class="thumbrow">${v?`<img class="thumb" src="${v}">`:""}<button type="button" class="btn sm" data-rup="${key}">${v?"Cambiar":"Subir"}</button>${v?`<button type="button" class="btn sm ghost" data-rrm="${key}">Quitar</button>`:""}</div></div>`;}
  if(sf.t==="ta")return `<textarea data-rf="${repk}" data-ri="${i}" data-rk="${sf.k}">${esc(v||"")}</textarea>`;
  return `<input data-rf="${repk}" data-ri="${i}" data-rk="${sf.k}" value="${esc(v||"")}">`;
}
function defRepItem(f){const o={};(f.item||[]).forEach(sf=>{o[sf.k]=(sf.def!==undefined?sf.def:"");});return o;}
function fieldHTML(f,obj){
  const v=obj[f.k];
  if(f.t==="elements"){const L=arr(v);const lbl={};(f.parts||[]).forEach(pp=>lbl[pp[0]]=pp[1]);
    return `<div class="rep">${L.map((it,i)=>`<div class="rep-item" style="display:flex;align-items:center;gap:8px;padding:7px 9px"><input type="checkbox" data-elon="${f.k}" data-ei="${i}" ${it.on!==false?'checked':''}><span style="flex:1">${esc(lbl[it.k]||it.k)}</span><button type="button" class="mini" data-emv="${f.k}" data-ei="${i}" data-d="up">↑</button><button type="button" class="mini" data-emv="${f.k}" data-ei="${i}" data-d="down">↓</button></div>`).join("")}</div>`;}
  if(f.t==="repeater"){const L=arr(v);return `<div class="rep">${L.map((it,i)=>`<div class="rep-item"><div class="rep-head"><b>#${i+1}</b><span><button type="button" class="mini" data-rmv="${f.k}" data-ri="${i}" data-d="up">↑</button><button type="button" class="mini" data-rmv="${f.k}" data-ri="${i}" data-d="down">↓</button><button type="button" class="mini" data-rdel="${f.k}" data-ri="${i}">✕</button></span></div>${(f.item||[]).map(sf=>`<div class="fld"><label>${sf.l}</label>${subField(sf,it,f.k,i)}</div>`).join("")}</div>`).join("")}<button type="button" class="btn sm" data-radd="${f.k}">+ ${f.addLabel||'Añadir'}</button></div>`;}
  if(f.t==="ta")return `<textarea data-fk="${f.k}">${esc(v||"")}</textarea><div class="help">Una fila por línea; campos separados por “|”.</div>`;
  if(f.t==="select")return `<select data-fk="${f.k}">${f.opts.map(o=>`<option value="${o[0]}" ${String(v)===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select>`;
  if(f.t==="image")return `<div class="up"><input type="file" accept="image/*" data-file="${f.k}" style="display:none"><div class="thumbrow">${v?`<img class="thumb" src="${v}">`:""}<button type="button" class="btn sm" data-upbtn="${f.k}">${v?"Cambiar":"Subir imagen"}</button>${v?`<button type="button" class="btn sm ghost" data-rm="${f.k}">Quitar</button>`:""}</div><div class="help">Se incrusta en el HTML (Base64).</div></div>`;
  if(f.t==="photo"){const ext=v&&!/^data:/.test(v);return `<div class="up"><input type="file" accept="image/*" data-file="${f.k}" style="display:none"><div class="thumbrow">${v?`<img class="thumb" src="${esc(v)}" alt="">`:""}<button type="button" class="btn sm" data-upbtn="${f.k}">${v?"Cambiar":"Subir foto"}</button>${v?`<button type="button" class="btn sm ghost" data-rm="${f.k}">Quitar</button>`:""}</div>
    <input data-fk="${f.k}" value="${ext?esc(v):""}" placeholder="…o pega la URL de una imagen" style="margin-top:6px">
    <div class="help" style="margin:8px 0 4px">Fotos libres (licencia Unsplash):</div><div class="nc-freeph">${NC_PHOTOS.map(id=>`<button type="button" data-pick="${f.k}" data-url="${ncPhotoUrl(id)}" title="Usar esta foto" class="${v===ncPhotoUrl(id)?'on':''}"><img src="${ncPhotoUrl(id,200)}" alt="" loading="lazy"></button>`).join("")}</div>
    <div class="help">Sin foto se muestra una ilustración con los colores de la marca. Más fotos en <a href="https://unsplash.com/es" target="_blank" rel="noopener" style="color:inherit">unsplash.com</a> (clic derecho en la foto → copiar dirección de imagen).</div></div>`;}
  if(f.t==="images"){const L=arr(v);return `<div class="up"><input type="file" accept="image/*" multiple data-filem="${f.k}" style="display:none"><div class="thumbs">${L.map((s,i)=>`<div class="t"><img src="${s}"><button type="button" data-rmi="${f.k}" data-i="${i}">×</button></div>`).join("")}</div><button type="button" class="btn sm" data-upbtnm="${f.k}">+ Añadir imágenes</button></div>`;}
  return `<input data-fk="${f.k}" value="${esc(v||"")}" placeholder="${esc(f.ph||"")}">`;
}
function bindContentFields(container,obj,after,fields){
  const rr=()=>{renderRight();renderPreview();};
  container.querySelectorAll('textarea[data-fk],input[data-fk]').forEach(inp=>inp.addEventListener('input',()=>{commitDebounced();obj[inp.dataset.fk]=inp.value;after();}));
  container.querySelectorAll('select[data-fk]').forEach(inp=>inp.addEventListener('change',()=>{commit();obj[inp.dataset.fk]=inp.value;after();renderRight();}));
  container.querySelectorAll('[data-upbtn]').forEach(btn=>btn.addEventListener('click',()=>container.querySelector('[data-file="'+btn.dataset.upbtn+'"]').click()));
  container.querySelectorAll('[data-file]').forEach(inp=>inp.addEventListener('change',e=>readImg(e.target.files[0],url=>{commit();obj[inp.dataset.file]=url;renderRight();renderPreview();})));
  container.querySelectorAll('[data-pick]').forEach(btn=>btn.addEventListener('click',()=>{commit();obj[btn.dataset.pick]=btn.dataset.url;renderRight();renderPreview();}));
  container.querySelectorAll('[data-rm]').forEach(btn=>btn.addEventListener('click',()=>{commit();obj[btn.dataset.rm]="";renderRight();renderPreview();}));
  container.querySelectorAll('[data-upbtnm]').forEach(btn=>btn.addEventListener('click',()=>container.querySelector('[data-filem="'+btn.dataset.upbtnm+'"]').click()));
  container.querySelectorAll('[data-filem]').forEach(inp=>inp.addEventListener('change',e=>{const fs=Array.from(e.target.files);commit();obj[inp.dataset.filem]=arr(obj[inp.dataset.filem]);let n=fs.length;fs.forEach(file=>readImg(file,url=>{obj[inp.dataset.filem].push(url);if(--n===0){renderRight();renderPreview();}}));}));
  container.querySelectorAll('[data-rmi]').forEach(btn=>btn.addEventListener('click',()=>{commit();arr(obj[btn.dataset.rmi]).splice(parseInt(btn.dataset.i,10),1);renderRight();renderPreview();}));
  // repeater
  container.querySelectorAll('[data-rf]').forEach(inp=>inp.addEventListener(inp.tagName==='SELECT'?'change':'input',()=>{commitDebounced();const it=arr(obj[inp.dataset.rf])[+inp.dataset.ri];if(it){it[inp.dataset.rk]=inp.value;after();}}));
  container.querySelectorAll('[data-radd]').forEach(btn=>btn.addEventListener('click',()=>{const f=(fields||[]).find(x=>x.k===btn.dataset.radd);if(!f)return;commit();obj[f.k]=arr(obj[f.k]);obj[f.k].push(defRepItem(f));rr();}));
  container.querySelectorAll('[data-rdel]').forEach(btn=>btn.addEventListener('click',()=>{commit();arr(obj[btn.dataset.rdel]).splice(+btn.dataset.ri,1);rr();}));
  container.querySelectorAll('[data-rmv]').forEach(btn=>btn.addEventListener('click',()=>{const a=arr(obj[btn.dataset.rmv]);const i=+btn.dataset.ri;const j=btn.dataset.d==='up'?i-1:i+1;if(j<0||j>=a.length)return;commit();const t=a[i];a[i]=a[j];a[j]=t;rr();}));
  container.querySelectorAll('[data-rup]').forEach(btn=>btn.addEventListener('click',()=>container.querySelector('[data-rfile="'+CSS.escape(btn.dataset.rup)+'"]').click()));
  container.querySelectorAll('[data-rfile]').forEach(inp=>inp.addEventListener('change',e=>{const p=inp.dataset.rfile.split('|');readImg(e.target.files[0],url=>{commit();const it=arr(obj[p[0]])[+p[1]];if(it){it[p[2]]=url;rr();}});}));
  container.querySelectorAll('[data-rrm]').forEach(btn=>btn.addEventListener('click',()=>{const p=btn.dataset.rrm.split('|');commit();const it=arr(obj[p[0]])[+p[1]];if(it){it[p[2]]="";rr();}}));
  container.querySelectorAll('[data-elon]').forEach(cb=>cb.addEventListener('change',()=>{commit();const it=arr(obj[cb.dataset.elon])[+cb.dataset.ei];if(it){it.on=cb.checked;after();}}));
  container.querySelectorAll('[data-emv]').forEach(btn=>btn.addEventListener('click',()=>{const a=arr(obj[btn.dataset.emv]);const i=+btn.dataset.ei;const j=btn.dataset.d==='up'?i-1:i+1;if(j<0||j>=a.length)return;commit();const t=a[i];a[i]=a[j];a[j]=t;renderRight();renderPreview();}));
}
function readImg(file,cb){ if(!file)return;
  if(window.NC_SB){
    const clean=file.name.replace(/[^a-zA-Z0-9._-]/g,'_');
    const path=Date.now()+'_'+Math.random().toString(36).slice(2,7)+'_'+clean;
    const bucket=(window.NC_CONFIG&&window.NC_CONFIG.BUCKET)||'landings-assets';
    toast('Subiendo imagen…');
    window.NC_SB.storage.from(bucket).upload(path,file,{cacheControl:'3600',upsert:false}).then(function(r){
      if(r.error){toast('Error al subir: '+r.error.message);return;}
      const pub=window.NC_SB.storage.from(bucket).getPublicUrl(path);
      cb(pub.data.publicUrl); toast('Imagen subida ✓');
    });
  } else {
    if(file.size>3*1024*1024)toast('⚠ Imagen >3MB: engordará el HTML');
    const r=new FileReader();r.onload=()=>cb(r.result);r.readAsDataURL(file);
  }
}

/* ---------- PANEL DERECHO ---------- */
function renderRight(){
  const s=state.sections.find(x=>x.id===state.selected);
  const cf=document.getElementById("contentFields");
  if(!s){cf.innerHTML=`<div class="empty">Selecciona una sección (en el preview o en Estructura) para editar su contenido.</div>`;}
  else if(s.type==="imported"){renderImportedFields(cf,s);}
  else{cf.innerHTML=`<div class="paneltitle" style="padding:0 0 8px">${LIB[s.type].label}</div>`+LIB[s.type].fields.map(f=>`<div class="fld"><label>${f.l}</label>${fieldHTML(f,s.props)}</div>`).join("");
    bindContentFields(cf,s.props,()=>patchSection(s.id),LIB[s.type].fields);}
  const sf=document.getElementById("styleFields");
  if(!s){sf.innerHTML=`<div class="empty">Selecciona una sección para editar su estilo.</div>`;}
  else if(LIB[s.type].raw&&/^d[abcx]_/.test(s.type)){const st=Object.assign(v4Style(s),{_type:s.type});s.style=s.style||{};
    sf.innerHTML=V4_STYLE_FIELDS.filter(f=>!f.when||f.when(st)).map(f=>f.t==="head"?`<div class="paneltitle" style="padding:12px 0 4px">${f.l}</div>`:`<div class="fld"><label>${f.l}</label>${fieldHTML(f,st)}</div>`).join("")+`<div class="help">Los ajustes de móvil se aplican por debajo de 768 px. Revisa el resultado con el botón “Móvil”.</div>`;
    sf.querySelectorAll('select[data-fk]').forEach(inp=>inp.addEventListener('change',()=>{commit();s.style[inp.dataset.fk]=inp.value;renderPreview();}));}
  else if(LIB[s.type].raw){sf.innerHTML=`<div class="empty">Esta sección estructural no usa controles de estilo (formato fijo).</div>`;}
  else{const st=styleOf(s);s.style=s.style||{};
    sf.innerHTML=STYLE_FIELDS.filter(f=>!f.when||f.when(st)).map(f=>`<div class="fld"><label>${f.l}</label>${fieldHTML(f,st)}</div>`).join("");
    sf.querySelectorAll('select[data-fk],input[data-fk]').forEach(inp=>{
      const ev=inp.tagName==="SELECT"?'change':'input';
      inp.addEventListener(ev,()=>{commit();s.style[inp.dataset.fk]=inp.value;renderPreview();if(inp.tagName==="SELECT")renderRight();});});
    sf.querySelectorAll('[data-upbtn]').forEach(btn=>btn.addEventListener('click',()=>sf.querySelector('[data-file="'+btn.dataset.upbtn+'"]').click()));
    sf.querySelectorAll('[data-file]').forEach(inp=>inp.addEventListener('change',e=>readImg(e.target.files[0],url=>{commit();s.style[inp.dataset.file]=url;renderRight();renderPreview();})));
    sf.querySelectorAll('[data-rm]').forEach(btn=>btn.addEventListener('click',()=>{commit();s.style[btn.dataset.rm]="";renderRight();renderPreview();}));}
  renderGlobal();
}
function renderGlobal(){
  const st=state.settings;const b=BRANDS[state.settings.brand];const gf=document.getElementById("globalFields");
  let theme="";
  if(!b.locked){theme=`
    <div class="paneltitle" style="padding:6px 0">Tema (marca editable)</div>
    <div class="fld inline"><label>Color primario</label><input type="color" data-ct="bp" value="${CUSTOM.bp}"></div>
    <div class="fld inline"><label>Color de acento</label><input type="color" data-ct="ba" value="${CUSTOM.ba}"></div>
    <div class="fld inline"><label>Color de texto</label><input type="color" data-ct="ink" value="${CUSTOM.ink}"></div>
    <div class="fld inline"><label>Fondo suave</label><input type="color" data-ct="soft" value="${CUSTOM.soft}"></div>
    <div class="row2"><div class="fld"><label>Fuente títulos</label><select data-ct="fhead">${FONTS.map(f=>`<option ${f===CUSTOM.fhead?'selected':''}>${f}</option>`).join("")}</select></div>
    <div class="fld"><label>Fuente texto</label><select data-ct="fbody">${FONTS.map(f=>`<option ${f===CUSTOM.fbody?'selected':''}>${f}</option>`).join("")}</select></div></div>
    <div class="fld inline"><label>Radio botón (${CUSTOM.btnr}px)</label><input type="range" min="0" max="40" data-ct="btnr" value="${CUSTOM.btnr}"></div>
    <div class="fld inline"><label>Radio card (${CUSTOM.cardr}px)</label><input type="range" min="0" max="30" data-ct="cardr" value="${CUSTOM.cardr}"></div>`;}
  else theme=`<div class="note">${b.note}</div><button class="btn sm" id="dupBrand">Duplicar en marca editable</button>`;
  ncEnsureLookFonts();const LK=LOOKS[ncLook()];
  gf.innerHTML=`
    <div class="fld"><label>Marca</label><select id="gBrand">${brandOptions(state.settings.brand)}</select></div>
    <div class="paneltitle" style="padding:10px 0 4px">Estilo de diseño</div>
    <div class="lk-cats">${["Todos",...(typeof LOOK_CATS!=="undefined"?LOOK_CATS:[])].map(c=>`<button type="button" class="chipf sm ${(window.ncLkCat||"Todos")===c?'on':''}" data-lkcat="${c}">${c}</button>`).join("")}</div>
    <div class="lk-grid">${LOOK_ORDER.filter(k=>{const c=window.ncLkCat||"Todos";return c==="Todos"||k===ncLook()||LOOKS[k].cat===c;}).map(k=>{const L=LOOKS[k];return `<button type="button" class="lk-tile ${ncLook()===k?'on':''}" data-look="${k}" title="${esc(L.desc)} Ideal: ${esc(L.best)}."><span class="sw">${L.sample.map(c=>`<i style="background:${c.indexOf('var(')===0?ncBrandColor():c}"></i>`).join("")}</span><b style="font-family:${L.head?`'${L.head}',`:''}Inter,sans-serif;font-weight:${L.hw||700}">${esc(L.name)}</b><small>${esc(L.head||'Tipografía de la marca')}</small></button>`;}).join("")}</div>
    <div class="help" style="margin:6px 0 8px">${esc(LK.desc)} <b>Ideal:</b> ${esc(LK.best)}. Los colores siempre son los de la marca.</div>
    <div class="fld inline"><label>Usar tipografía de la marca</label><input type="checkbox" id="gLookFont" ${st.lookBrandFont?'checked':''} ${ncLook()==='base'?'disabled':''}></div>
    <div class="paneltitle" style="padding:10px 0 4px">Toques personales</div>
    <div class="fld inline"><label>Anotaciones a mano (flechas, círculo en el precio)</label><input type="checkbox" id="gAnnot" ${st.annot!==false?'checked':''}></div>
    <div class="fld inline"><label>Letra manuscrita en las notas</label><input type="checkbox" id="gHand" ${st.hand!==false?'checked':''}></div>
    <div class="fld"><label>Textura</label><select id="gTex">${[["grain","Grano suave"],["paper","Papel"],["none","Sin textura"]].map(o=>`<option value="${o[0]}" ${(st.texture||'grain')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    <div class="fld inline"><label>Composición editorial (secciones numeradas, cabeceras asimétricas)</label><input type="checkbox" id="gEd" ${st.editorial!==false?'checked':''}></div>
    <div class="fld"><label>Voz de los textos</label><select id="gVoice">${[["estilo","Según el estilo"],["cercano","Cercano y directo"],["neutral","Profesional sobrio"]].map(o=>`<option value="${o[0]}" ${(st.voice||'estilo')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select><div class="help">Cambia los textos que no has editado (botones, formularios, microcopy). Nunca inventa precios, plazos ni datos.</div></div>
    ${theme}
    <div class="paneltitle" style="padding:10px 0 4px">Contacto (tel: · wa.me · form)</div>
    <div class="fld"><label>Teléfono</label><input id="gTel" value="${esc(state.settings.tel)}" placeholder="{{TELEFONO}}"></div>
    <div class="fld"><label>WhatsApp (con prefijo)</label><input id="gWa" value="${esc(state.settings.wa)}" placeholder="{{WHATSAPP}}"></div>
    <div class="fld"><label>Endpoint del formulario</label><input id="gEp" value="${esc(state.settings.endpoint)}" placeholder="{{ENDPOINT_FORMULARIO}}"></div>
    <div class="paneltitle" style="padding:10px 0 4px">Botones y acciones</div>
    <div class="fld"><label>Capa UI extra (bloques clásicos)</label><select id="gStyleKit">${STYLEKIT_LIST.map(o=>`<option value="${o[0]}" ${state.settings.styleKit===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select><div class="help">Capa de diseño (glass, neumorphism, brutalism…) sobre la marca.</div></div>
    <div class="fld inline"><label>Animaciones (reveal + micro-interacciones)</label><input type="checkbox" id="gMotion" ${state.settings.motion?'checked':''}></div>
    <div class="fld"><label>Estilo de botón (CTA)</label><select id="gCtaStyle">${[["brand","Marca"],["apple","Apple (pill azul)"],["instagram","Instagram (degradado)"],["ncgreen","Verde NC (botonazo)"],["neon","Neón"],["outline","Contorno"],["dark","Oscuro"],["pill","Pastilla marca"]].map(o=>`<option value="${o[0]}" ${state.settings.ctaStyle===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    <div class="fld"><label>Acción de los botones (por defecto)</label><select id="gCtaAction">${[["scroll","Ir al formulario"],["popup","Abrir el popup"],["popupimg","Popup antiguo con imagen"],["call","Llamar (tel:)"],["whatsapp","WhatsApp"]].map(o=>`<option value="${o[0]}" ${state.settings.ctaAction===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select><div class="help">Aplica a todos los botones “Ir al formulario”.</div></div>
    <div class="paneltitle" style="padding:10px 0 4px">Popup de los botones</div>
    <div class="help" style="margin:0 0 8px">Se abre en los botones con “Al pulsar el botón → Abrir el popup” (por defecto, los “La quiero” de las tarifas) o en todos si eliges Popup arriba.</div>
    <div class="fld"><label>Título</label><input id="gPopTitle" value="${esc(state.settings.popupTitle&&state.settings.popupTitle!=='¿Necesitas ayuda?'?state.settings.popupTitle:'')}" placeholder="${esc(vt('popTitle'))}"></div>
    <div class="fld"><label>Texto</label><input id="gPopSub" value="${esc(st.popSub||'')}" placeholder="${esc(vt('popSub'))}"></div>
    <div class="fld"><label>Botón</label><input id="gPopBtn" value="${esc(st.popBtn||'')}" placeholder="${esc(vt('popBtn'))}"></div>
    <div class="fld inline"><label>Mostrar la tarifa elegida</label><input type="checkbox" id="gPopPlan" ${st.popPlan!==false?'checked':''}></div>
    <div class="fld inline"><label>Botón de llamar</label><input type="checkbox" id="gPopCall" ${st.popCall!==false?'checked':''}></div>
    <div class="fld inline"><label>Botón de WhatsApp</label><input type="checkbox" id="gPopWa" ${st.popWa!==false?'checked':''}></div>
    ${state.settings.ctaAction==='popupimg'?`<div class="fld"><label>Imagen del popup (modelo antiguo)</label>${fieldHTML({k:"popupImg",l:"",t:"image"},state.settings)}</div>`:''}
    <div class="paneltitle" style="padding:10px 0 4px">Móvil</div>
    <div class="fld"><label>Tamaño de titulares</label><select id="gMTitle">${[["S","Pequeño"],["M","Normal"],["L","Grande"]].map(o=>`<option value="${o[0]}" ${(st.mTitle||'M')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    <div class="fld"><label>Espaciado entre secciones</label><select id="gMSpace">${[["S","Compacto"],["M","Normal"],["L","Amplio"]].map(o=>`<option value="${o[0]}" ${(st.mSpace||'M')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    <div class="fld"><label>Barra fija: cuándo aparece</label><select id="gStkShow">${[["scroll","Al dejar atrás el formulario"],["always","Siempre"]].map(o=>`<option value="${o[0]}" ${(st.stickyShow||'scroll')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    <div class="fld"><label>Barra fija: estilo</label><select id="gStkStyle">${[["bar","Barra (del estilo)"],["float","Flotante"],["single","Un solo botón (el principal)"]].map(o=>`<option value="${o[0]}" ${(st.stickyStyle||'bar')===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select><div class="help">Los botones y el canal principal se eligen en el bloque “Barra fija móvil”.</div></div>
    <div class="paneltitle" style="padding:10px 0 4px">Formulario y RGPD</div>
    <div class="fld inline"><label>Gracias sin recargar (AJAX)</label><input type="checkbox" id="gThanks" ${st.thanks?'checked':''}></div>
    ${st.thanks?`<div class="fld"><label>Texto de gracias</label><input id="gThanksTxt" value="${esc(st.thanksText)}"></div>`:''}
    <div class="fld"><label>URL de gracias (opcional)</label><input id="gThanksUrl" value="${esc(st.thanksUrl)}" placeholder="https://…/gracias"><div class="help">Si la rellenas, tras enviar redirige ahí (ideal para medir la conversión en Google Ads).</div></div>
    <div class="fld inline"><label>Casilla de privacidad obligatoria</label><input type="checkbox" id="gPrivCheck" ${st.privacyCheck!==false?'checked':''}></div>
    <div class="fld"><label>URL política de privacidad</label><input id="gUrlPriv" value="${esc(st.urlPrivacy)}" placeholder="{{URL_PRIVACIDAD}}"></div>
    <div class="fld"><label>Responsable del tratamiento</label><input id="gLegalOwner" value="${esc(st.legalOwner)}" placeholder="Razón social del cliente"><div class="help">Muestra la primera capa informativa RGPD bajo cada formulario.</div></div>
    <div class="fld inline"><label>Capturar UTM y gclid/gbraid/fbclid</label><input type="checkbox" id="gAttr" ${st.attribution!==false?'checked':''}></div>
    <div class="fld inline"><label>Enhanced Conversions (user_data)</label><input type="checkbox" id="gEc" ${st.ecData!==false?'checked':''}></div>
    <div class="paneltitle" style="padding:10px 0 4px">Cookies</div>
    <div class="fld"><label>Gestión del consentimiento</label><select id="gConsent">${[["banner","Banner NC + Consent Mode v2"],["external","CMP externa en GTM (Cookiebot, OneTrust…)"],["none","Sin gestión (no recomendado)"]].map(o=>`<option value="${o[0]}" ${st.consent===o[0]?'selected':''}>${o[1]}</option>`).join("")}</select></div>
    ${st.consent==='banner'?`<div class="fld"><label>URL política de cookies</label><input id="gUrlCk" value="${esc(st.urlCookies)}" placeholder="{{URL_COOKIES}}"></div>`:''}
    <div class="paneltitle" style="padding:10px 0 4px">SEO / Medición</div>
    <div class="fld"><label>Título SEO</label><input id="gTitle" value="${esc(st.title)}" placeholder="{{TITULO_SEO}}"><div class="help" id="gTitleCnt"></div></div>
    <div class="fld"><label>Meta description</label><textarea id="gDesc" placeholder="{{META_DESCRIPTION}}">${esc(st.desc)}</textarea><div class="help" id="gDescCnt"></div></div>
    <div class="fld"><label>URL final de la landing</label><input id="gPageUrl" value="${esc(st.pageUrl)}" placeholder="https://ofertas.dominio.es/fibra"><div class="help">Genera canonical y og:url.</div></div>
    <div class="fld inline"><label>noindex (recomendado en paid)</label><input type="checkbox" id="gNoindex" ${st.noindex?'checked':''}></div>
    <div class="fld"><label>Imagen al compartir (og:image)</label><span id="gOg"></span>${fieldHTML({k:"ogImage",l:"",t:"image"},st)}<div class="help">1200×630. Si no hay, usa la imagen del hero.</div></div>
    <div class="fld"><label>Favicon (URL)</label><input id="gFav" value="${esc(st.favicon)}" placeholder="Vacío = cuadrado con el color de marca"></div>
    <div class="fld"><label>GTM ID</label><input id="gGtm" value="${esc(st.gtm)}" placeholder="GTM-XXXXXXX"></div>
    <div class="fld"><label>Nombre de archivo</label><input id="gSlug" value="${esc(st.slug)}"></div>`;
  document.getElementById("gBrand").addEventListener("change",e=>{commit();state.settings.brand=e.target.value;document.getElementById("brandTop").value=e.target.value;renderPalette();renderPreview();renderRight();});
  const dup=document.getElementById("dupBrand");if(dup)dup.addEventListener('click',()=>{const cur=BRANDS[state.settings.brand];
    const g=(k,d)=>{const m=cur.vars.match(new RegExp("--"+k+":([^;]+)"));return m?m[1].trim():d;};
    CUSTOM.bp=g("bp","#2563EB");CUSTOM.ba=g("ba","#10B981");CUSTOM.ink=g("bink","#0f172a");CUSTOM.soft=g("bsoft","#f1f5f9");
    CUSTOM.fhead=(cur.fhead.match(/'([^']+)'/)||[])[1]||"Inter";CUSTOM.fbody=(cur.fbody.match(/'([^']+)'/)||[])[1]||"Inter";
    syncCustom();commit();state.settings.brand="custom";document.getElementById("brandTop").value="custom";renderPreview();renderRight();toast("Copiado a marca editable");});
  gf.querySelectorAll('[data-ct]').forEach(inp=>{const ev=(inp.type==="range"||inp.type==="color")?'input':'change';
    inp.addEventListener(ev,()=>{commitDebounced();const k=inp.dataset.ct;CUSTOM[k]=(inp.type==="range")?parseInt(inp.value,10):inp.value;syncCustom();renderPreview();if(inp.tagName==="SELECT"||inp.type==="range")renderGlobal();});});
  const bindG=(id,key,pv)=>{const el=document.getElementById(id);if(el)el.addEventListener('input',()=>{commitDebounced();state.settings[key]=el.value;if(pv)renderPreview();});};
  bindG("gTel","tel",true);bindG("gWa","wa",true);bindG("gEp","endpoint",true);
  bindG("gTitle","title",false);bindG("gDesc","desc",false);bindG("gGtm","gtm",false);bindG("gSlug","slug",false);
  bindG("gThanksUrl","thanksUrl",false);bindG("gUrlPriv","urlPrivacy",true);bindG("gLegalOwner","legalOwner",true);bindG("gUrlCk","urlCookies",false);bindG("gPageUrl","pageUrl",false);bindG("gFav","favicon",false);
  const chk=(id,key,rr)=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[key]=el.checked;renderPreview();if(rr)renderGlobal();});};
  chk("gPrivCheck","privacyCheck");chk("gAttr","attribution");chk("gEc","ecData");chk("gNoindex","noindex");
  const cn=document.getElementById("gConsent");if(cn)cn.addEventListener('change',()=>{commit();state.settings.consent=cn.value;state.settings.cookies=(cn.value==='banner');renderPreview();renderGlobal();});
  const cnt=(id,out,lo,hi)=>{const el=document.getElementById(id),o=document.getElementById(out);if(!el||!o)return;const u=()=>{const n=el.value.length;o.textContent=n+' caracteres · ideal '+lo+'–'+hi;o.style.color=(n&&(n<lo||n>hi))?'var(--danger)':'';};el.addEventListener('input',u);u();};
  cnt("gTitle","gTitleCnt",30,60);cnt("gDesc","gDescCnt",70,155);
  const cs=document.getElementById("gCtaStyle");if(cs)cs.addEventListener('change',()=>{commit();state.settings.ctaStyle=cs.value;renderPreview();});
  gf.querySelectorAll('[data-lkcat]').forEach(b=>b.addEventListener('click',()=>{window.ncLkCat=b.dataset.lkcat;renderGlobal();}));
  gf.querySelectorAll('[data-look]').forEach(b=>b.addEventListener('click',()=>{commit();state.settings.look=b.dataset.look;renderPreview();renderGlobal();if(state.selected)renderRight();}));
  [["gMTitle","mTitle"],["gMSpace","mSpace"],["gStkShow","stickyShow"],["gStkStyle","stickyStyle"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[k]=el.value;renderPreview();});});
  [["gAnnot","annot"],["gHand","hand"],["gEd","editorial"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[k]=el.checked;renderPreview();});});
  [["gTex","texture"],["gVoice","voice"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[k]=el.value;renderPreview();});});
  const lf=document.getElementById("gLookFont");if(lf)lf.addEventListener('change',()=>{commit();state.settings.lookBrandFont=lf.checked;renderPreview();});
  const sk=document.getElementById("gStyleKit");if(sk)sk.addEventListener('change',()=>{commit();state.settings.styleKit=sk.value;renderPreview();});
  const mo=document.getElementById("gMotion");if(mo)mo.addEventListener('change',()=>{commit();state.settings.motion=mo.checked;renderPreview();});
  const ca=document.getElementById("gCtaAction");if(ca)ca.addEventListener('change',()=>{commit();state.settings.ctaAction=ca.value;renderPreview();renderGlobal();});
  const pt=document.getElementById("gPopTitle");if(pt)pt.addEventListener('input',()=>{commitDebounced();state.settings.popupTitle=pt.value;renderPreview();});
  [["gPopSub","popSub"],["gPopBtn","popBtn"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener('input',()=>{commitDebounced();state.settings[k]=el.value;renderPreview();});});
  [["gPopPlan","popPlan"],["gPopCall","popCall"],["gPopWa","popWa"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener('change',()=>{commit();state.settings[k]=el.checked;renderPreview();});});
  const th=document.getElementById("gThanks");if(th)th.addEventListener('change',()=>{commit();state.settings.thanks=th.checked;renderPreview();renderGlobal();});
  const tt=document.getElementById("gThanksTxt");if(tt)tt.addEventListener('input',()=>{commitDebounced();state.settings.thanksText=tt.value;renderPreview();});
  gf.querySelectorAll('[data-upbtn]').forEach(btn=>btn.addEventListener('click',()=>gf.querySelector('[data-file="'+btn.dataset.upbtn+'"]').click()));
  gf.querySelectorAll('[data-file]').forEach(inp=>inp.addEventListener('change',e=>readImg(e.target.files[0],url=>{commit();state.settings[inp.dataset.file]=url;renderGlobal();renderPreview();})));
  gf.querySelectorAll('[data-rm]').forEach(btn=>btn.addEventListener('click',()=>{commit();state.settings[btn.dataset.rm]="";renderGlobal();renderPreview();}));
}

/* ---------- ACCIONES ---------- */
function addSection(type,index){commit();const s={id:nid(),type,props:LIB[type].def(),style:{}};
  if(index==null||index<0||index>state.sections.length)state.sections.push(s);else state.sections.splice(index,0,s);
  state.selected=s.id;renderPreview();renderRight();toast(LIB[type].label+" añadido");}
function select(id){state.selected=id;setTab("content");pendingScrollId=id;renderPreview();renderRight();}
function rowAction(id,act){if(act==="copy"){wsCopy(id);return;}const i=state.sections.findIndex(x=>x.id===id);if(i<0)return;commit();
  if(act==="up"&&i>0){const t=state.sections[i-1];state.sections[i-1]=state.sections[i];state.sections[i]=t;}
  if(act==="down"&&i<state.sections.length-1){const t=state.sections[i+1];state.sections[i+1]=state.sections[i];state.sections[i]=t;}
  if(act==="dup"){const c=JSON.parse(JSON.stringify(state.sections[i]));c.id=nid();state.sections.splice(i+1,0,c);state.selected=c.id;}
  if(act==="del"){state.sections.splice(i,1);if(state.selected===id)state.selected=null;}
  if(act==="hide"){const s=state.sections[i];s.hidden=!s.hidden;toast(s.hidden?"Sección oculta: no se exporta":"Sección visible");}
  renderPreview();renderRight();renderPalette();}
let dragId=null,dragType=null;
function dropOnIndex(t){if(dragType){addSection(dragType,t);dragType=null;return;}
  if(dragId){commit();const from=state.sections.findIndex(x=>x.id===dragId);if(from<0)return;const m=state.sections.splice(from,1)[0];let to=t;if(from<t)to=t-1;state.sections.splice(to,0,m);dragId=null;renderPreview();renderRight();renderPalette();}}
function showDrop(on){const d=document.getElementById("dropZone");d.style.display=on?"grid":"none";}
function resetDrag(){dragType=null;dragId=null;showDrop(false);}
document.addEventListener('dragend',resetDrag,true);
document.addEventListener('drop',()=>setTimeout(resetDrag,0),true);
window.addEventListener('mouseup',()=>{ if(dragType||dragId) resetDrag(); });

/* ---------- HISTORIAL ---------- */
let past=[],future=[];
const snap=()=>JSON.stringify({s:state.sections,g:state.settings,c:CUSTOM,u:uid});
function commit(){past.push(snap());if(past.length>50)past.shift();future=[];updHist();ncDirty();}
let cdArmed=true,cdT=null;
function commitDebounced(){ncDirty();if(cdArmed){commit();cdArmed=false;}clearTimeout(cdT);cdT=setTimeout(()=>cdArmed=true,700);}
function restore(str){const o=JSON.parse(str);state.sections=o.s;state.settings=o.g;Object.assign(CUSTOM,o.c);uid=o.u;syncCustom();}
function undo(){if(!past.length)return;future.push(snap());restore(past.pop());state.selected=null;document.getElementById("brandTop").value=state.settings.brand;renderPreview();renderRight();renderPalette();updHist();}
function redo(){if(!future.length)return;past.push(snap());restore(future.pop());state.selected=null;document.getElementById("brandTop").value=state.settings.brand;renderPreview();renderRight();renderPalette();updHist();}
function updHist(){document.getElementById("btnUndo").disabled=!past.length;document.getElementById("btnRedo").disabled=!future.length;}

/* ---------- TABS / DEVICE / EXPORT / PLANTILLAS ---------- */
function setTab(t){state.tab=t;document.getElementById("tabContent").style.display=t==="content"?"":"none";
  document.getElementById("tabStyle").style.display=t==="style"?"":"none";document.getElementById("tabGlobal").style.display=t==="global"?"":"none";
  document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===t));}
function setDevice(d){state.device=d;const w={mobile:"390px",tablet:"768px",desktop:"100%"}[d];const fw=document.getElementById("frameWrap");
  fw.style.width=w;fw.style.maxWidth=d==="desktop"?"1100px":w;document.querySelectorAll('#devSeg button').forEach(b=>b.classList.toggle('on',b.dataset.dev===d));}
function dlBlob(data,name,type){const blob=(data instanceof Blob)?data:new Blob([data],{type:type||"text/plain;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();}
function buildReadme(html){
  const s=state.settings;const b=BRANDS[s.brand];
  const phs=[...new Set((html.match(/\{\{[A-Z0-9_]+\}\}/g)||[]))];
  const phHint={TELEFONO:"Teléfono real (tel:)",WHATSAPP:"Número WhatsApp con prefijo",ENDPOINT_FORMULARIO:"URL a la que hace POST el formulario",GTM_ID:"ID de Google Tag Manager","GTM-XXXXXXX":"ID de Google Tag Manager",URL_CANONICA:"URL final de la página",URL_LEGAL:"URL de aviso legal / privacidad",URL_COOKIES:"URL de política de cookies",RAZON_SOCIAL:"Razón social para el footer",TITULO_SEO:"Título SEO (<title>)",META_DESCRIPTION:"Meta description",LOGO:"Logo de la marca",IMG_HERO:"Imagen del hero",IMG_POPUP:"Imagen del popup",IMG:"Imagen"};
  const list=phs.length?phs.map(p=>{const k=p.replace(/[{}]/g,"");return "- `"+p+"` — "+(phHint[k]||"Rellenar");}).join("\n"):"- (ninguno pendiente)";
  const fam=(b.fhead+","+b.fbody).match(/'([^']+)'/g);const fonts=fam?[...new Set(fam.map(x=>x.replace(/'/g,"")))].join(", "):"—";
  return "# Landing — handoff para desarrollo\n\n"+
"Página de conversión generada con **NC Landing Builder**. Es HTML estático listo para maquetar/desplegar.\n\n"+
"## Stack\n- **Bootstrap 5.3.3** (por CDN).\n- **Google Fonts**: "+fonts+".\n- CSS propio en `css/styles.css` (tokens de marca + componentes).\n- JS propio en `js/main.js` (tracking dataLayer, acciones de CTA, widgets: calculadora/calendario/quiz, cookies).\n\n"+
"## Estructura\n```\nindex.html        # markup de la landing\ncss/styles.css    # estilos (variables de marca + componentes)\njs/main.js        # comportamiento (tracking, CTAs, widgets)\nREADME.md\n```\n\n"+
"## Marca aplicada: "+b.name+"\nVariables CSS (en `:root` dentro de `index.html`):\n```css\n"+b.vars.replace(/;/g,";\n")+"\n```\n\n"+
"## Datos a rellenar (placeholders)\nBusca y sustituye en `index.html`:\n"+list+"\n\n"+
"## Configuración actual\n- Teléfono: "+(s.tel||"(pendiente)")+"\n- WhatsApp: "+(s.wa||"(pendiente)")+"\n- Endpoint formulario: "+(s.endpoint||"(pendiente)")+"\n- GTM: "+(s.gtm||"(pendiente)")+"\n- Acción CTA principal: "+s.ctaAction+"\n\n"+
"## Medición (dataLayer)\n| Evento | Cuándo | Datos |\n|---|---|---|\n| `click_to_call` | clic en cualquier `tel:` | `phone`, `cta`, `section_index` |\n| `whatsapp_click` | clic en `wa.me` | `cta`, `section_index` |\n| `cta_click` | resto de CTAs | `cta`, `cta_text` |\n| `form_start` | primer foco en un formulario | `form_id` |\n| `generate_lead` | envío correcto | `form_id`, `delivery` (confirmed/unconfirmed)"+(s.ecData!==false?", `user_data` (Enhanced Conversions)":"")+" |\n| `form_error` | fallo de envío | `form_id`, `reason` |\n| `consent_update` | elección en el banner | `consent_analytics`, `consent_ads` |\n| `quiz_complete` / `schedule` | widgets | respuestas / fecha |\n\n"+
"## Formularios\n- Campos ocultos de atribución: "+NC_ATTR_KEYS.concat(NC_CTX_KEYS).map(k=>"`"+k+"`").join(", ")+", `form_id`.\n- Honeypot anti-spam `nc_website`: si llega relleno, descártalo en el backend.\n- Teléfono normalizado a 9 cifras antes de enviar. Casilla `acepta_privacidad=si` (RGPD).\n- Envío: POST multipart/form-data. Si el endpoint responde con CORS se detectan errores HTTP; si no, se marca `delivery: unconfirmed`.\n\n"+
"## Consentimiento\n- Modo: "+({banner:"banner NC con Consent Mode v2 (por defecto todo denegado hasta que el usuario acepta)",external:"CMP externa gestionada desde GTM",none:"sin gestión"}[s.consent]||s.consent)+".\n\n"+
"## Despliegue\n- **FTP**: sube la carpeta tal cual (index.html + css/ + js/).\n- **Vercel/estático**: arrastra la carpeta o conéctala a un repo (sin build).\n\n"+
"## Notas\n- Las imágenes son URLs (Supabase Storage) o Base64 embebido.\n- Mobile-first; probar en móvil.\n";
}
function exportZip(){
  const full=buildDoc(true);const slug=(state.settings.slug||"landing");
  let css="";
  let html=full.replace(/<style>([\s\S]*?)<\/style>/,function(m,c){css=c;return '<link rel="stylesheet" href="css/styles.css">';});
  let js="";
  html=html.replace(/<script>([\s\S]*?)<\/script>/g,function(m,c){if(/gtm\.start/.test(c))return m;js+=c+"\n";return "";});
  html=html.replace("</body>",'<script src="js/main.js"><\/script>\n</body>');
  const readme=buildReadme(full);
  if(!window.JSZip){ toast("Sin JSZip: descargo HTML autocontenido"); dlBlob(full,slug+".html","text/html;charset=utf-8"); return; }
  const zip=new JSZip();const root=zip.folder(slug);
  root.file("index.html",html);root.file("css/styles.css",css.trim());root.file("js/main.js",js.trim());root.file("README.md",readme);
  zip.generateAsync({type:"blob"}).then(function(blob){dlBlob(blob,slug+".zip");toast("ZIP exportado ✓");}).catch(function(){dlBlob(full,slug+".html","text/html;charset=utf-8");});
}
function exportHTML(){const html=buildDoc(true);const kb=Math.round(html.length/1024);
  const blob=new Blob([html],{type:"text/html;charset=utf-8"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=(state.settings.slug||"landing")+".html";document.body.appendChild(a);a.click();a.remove();
  toast("HTML exportado ✓ ("+kb+" KB)");}
const TEMPLATE_BRAND={"Apple (literal)":"apple","Movistar (literal)":"movistar","T-Mobile (literal)":"tmobile","O2 (literal)":"o2","MyTraffic (literal)":"mytraffic","AB Tasty (literal)":"abtasty","Cliente · Jazztel":"c_jazztel","Cliente · MásMóvil":"c_masmovil","Cliente · Simyo":"c_simyo","Cliente · Yoigo":"c_yoigo","Cliente · Vodafone":"c_vodafone","Cliente · Lowi":"c_lowi","Cliente · MásAhorro":"c_masahorro","Cliente · Prosegur":"c_prosegur"};

function ncEnsureLookFonts(){if(document.getElementById("lkFonts"))return;const l=document.createElement("link");l.id="lkFonts";l.rel="stylesheet";
  l.href=fontsHrefMany(LOOK_ORDER.map(k=>LOOKS[k].head).filter(Boolean));document.head.appendChild(l);}
