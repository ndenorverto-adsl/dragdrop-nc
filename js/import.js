/* ---------- IMPORTAR HTML DE CLIENTE ---------- */
function annotateImported(htmlStr){
  try{const d=new DOMParser().parseFromString('<div id="R">'+htmlStr+'</div>','text/html');const root=d.getElementById("R");
    let ii=0,ti=0;
    root.querySelectorAll('img').forEach(img=>img.setAttribute('data-ncimg',ii++));
    root.querySelectorAll('*').forEach(el=>{if(['SCRIPT','STYLE','IMG','BR','HR','INPUT','SVG','PATH'].includes(el.tagName))return;if(el.children.length===0){const t=el.textContent.replace(/\s+/g,' ').trim();if(t)el.setAttribute('data-nctext',ti++);}});
    return root.innerHTML;
  }catch(e){return htmlStr;}
}
function ncParse(html){const d=new DOMParser().parseFromString('<div id="R">'+html+'</div>','text/html');return d.getElementById("R");}
function updImportedText(s,k,val){const r=ncParse(s.props.html);const el=r.querySelector('[data-nctext="'+k+'"]');if(el){el.textContent=val;s.props.html=r.innerHTML;}}
function updImportedImg(s,k,url){const r=ncParse(s.props.html);const el=r.querySelector('[data-ncimg="'+k+'"]');if(el){el.setAttribute('src',url);el.removeAttribute('srcset');s.props.html=r.innerHTML;}}
function renderImportedFields(cf,s){
  const r=ncParse(s.props.html);
  let h=`<div class="paneltitle" style="padding:0 0 8px">Sección importada (editable)</div>`;
  const imgs=r.querySelectorAll('[data-ncimg]'),txts=r.querySelectorAll('[data-nctext]');
  if(!imgs.length&&!txts.length)h+=`<div class="help">Sin campos detectados. Edita el HTML crudo abajo.</div>`;
  imgs.forEach(img=>{const k=img.getAttribute('data-ncimg');const src=img.getAttribute('src')||'';h+=`<div class="fld"><label>Imagen ${+k+1}</label><div class="up"><input type="file" accept="image/*" data-ncfile="${k}" style="display:none"><div class="thumbrow">${src?`<img class="thumb" src="${esc(src)}">`:''}<button type="button" class="btn sm" data-ncup="${k}">${src?'Cambiar':'Subir'}</button></div></div></div>`;});
  txts.forEach(el=>{const k=el.getAttribute('data-nctext');const t=el.textContent.replace(/\s+/g,' ').trim();h+=t.length>55?`<div class="fld"><label>Texto ${+k+1}</label><textarea data-nctxt="${k}">${esc(t)}</textarea></div>`:`<div class="fld"><input data-nctxt="${k}" value="${esc(t)}" placeholder="Texto ${+k+1}"></div>`;});
  h+=`<details style="margin-top:10px"><summary style="cursor:pointer;color:var(--muted2);font-size:11.5px">HTML crudo</summary><textarea data-ncraw style="min-height:120px;font-family:monospace;font-size:10.5px;margin-top:6px">${esc(s.props.html)}</textarea></details>`;
  cf.innerHTML=h;
  cf.querySelectorAll('[data-nctxt]').forEach(inp=>inp.addEventListener('input',()=>{commitDebounced();updImportedText(s,inp.dataset.nctxt,inp.value);patchSection(s.id);}));
  cf.querySelectorAll('[data-ncup]').forEach(b=>b.addEventListener('click',()=>cf.querySelector('[data-ncfile="'+b.dataset.ncup+'"]').click()));
  cf.querySelectorAll('[data-ncfile]').forEach(inp=>inp.addEventListener('change',e=>readImg(e.target.files[0],url=>{commit();updImportedImg(s,inp.dataset.ncfile,url);renderRight();renderPreview();})));
  const raw=cf.querySelector('[data-ncraw]');if(raw)raw.addEventListener('input',()=>{commitDebounced();s.props.html=raw.value;patchSection(s.id);});
}
function _txt(el){return el?(el.textContent||'').replace(/\s+/g,' ').trim():'';}
function _img(el){const i=el.querySelector('img');return i?(i.getAttribute('src')||''):'';}
function translateSection(el){
  const tag=el.tagName;const t=_txt(el);
  const heads=[...el.querySelectorAll('h1,h2,h3')].map(_txt).filter(Boolean);
  const btns=[...el.querySelectorAll('a,button')].map(_txt).filter(x=>x&&x.length<30);
  const prices=(t.match(/\d{1,3}[.,]\d{2}\s?€/g)||[]);
  const pcta=b=>b||'Solicitar información';
  const form=el.querySelector('form');
  if(form){const fields=[...form.querySelectorAll('input,select,textarea')].filter(i=>!['hidden','checkbox','submit','button'].includes((i.getAttribute('type')||'').toLowerCase())).map(i=>({label:i.getAttribute('placeholder')||i.getAttribute('name')||'Campo',name:i.getAttribute('name')||'campo',type:i.tagName==='TEXTAREA'?'textarea':(i.getAttribute('type')==='tel'?'tel':(i.getAttribute('type')==='email'?'email':'text')),required:i.hasAttribute('required')?'si':'no',options:''}));
    return {type:'form',props:{title:heads[0]||'Te llamamos gratis',subtitle:'',cta:btns.find(b=>/llam|solicit|quiero|enviar|pide/i.test(b))||'Enviar',consent:'Acepto la política de privacidad.',fields:fields.length?fields:undefined}};}
  const details=el.querySelectorAll('details,.accordion-item,[class*=accordion]');const qs=heads.filter(h=>/\?/.test(h));
  if(details.length>=2||qs.length>=2){let items;
    if(details.length>=2){items=[...details].map(d=>{const q=_txt(d.querySelector('summary,h2,h3,button,.accordion-button,.accordion-header'))||'Pregunta';let a=_txt(d);if(q&&a.startsWith(q))a=a.slice(q.length).trim();return q+'|'+(a||'Respuesta.');});}
    else{items=qs.map(q=>q+'|Respuesta.');}
    return {type:'faq',props:{title:heads.find(h=>/frecuent|faq|dudas|preguntas/i.test(h))||'Preguntas frecuentes',items:items.slice(0,8).join('\n')}};}
  if(prices.length>=2){const plans=prices.slice(0,4).map((pr,i)=>({name:heads[i+1]||heads[i]||('Tarifa '+(i+1)),price:pr.replace(/\s?€/,''),feat:'',cta:pcta(btns[i])}));
    return {type:'tel_tarifas',props:{title:heads[0]||'Tarifas destacadas',plans}};}
  if(tag==='NAV'||tag==='HEADER'||(el.querySelector('nav')&&t.length<220)){const links=[...el.querySelectorAll('a')].map(_txt).filter(x=>x&&x.length<20&&!/\d{6,}/.test(x)).slice(0,5);const cta=btns.find(b=>/llam|contact|express/i.test(b))||'Llámanos';
    return {type:'tel_nav',props:{logo:heads[0]||'Marca',links:links.join('|')||'Inicio|Tarifas|Ayuda',cta}};}
  if(tag==='FOOTER'){return {type:'tel_footer',props:{company:heads[0]||'Marca',cols:'Enlaces:Aviso legal,Privacidad,Cookies'}};}
  if(heads.length&&btns.length){const eb=[...el.querySelectorAll('[class*=badge],[class*=oferta],[class*=eyebrow],small')].map(_txt).find(x=>x&&x.length<40)||'';
    return {type:'hero_split',props:{eyebrow:eb,headline:heads[0],sub:(el.querySelector('p')?_txt(el.querySelector('p')).slice(0,140):''),cta:btns.find(b=>/quiero|solicit|llam|contrat|pide/i.test(b))||btns[0],cta2:'Llamar',image:_img(el)}};}
  if(heads.length>=3){const items=heads.slice(0,6).map(h=>'✅|'+h+'|');return {type:'features',props:{title:'Ventajas',subtitle:'',items:items.join('\n')}};}
  if(t.length>15)return {type:'richtext',props:{title:heads[0]||'',body:t.slice(0,500)}};
  return null;
}
function _norm(p){const o=[];p.split('/').forEach(s=>{if(s===''||s==='.')return;if(s==='..')o.pop();else o.push(s);});return o.join('/');}
function _resolve(ref,baseDir){ref=ref.trim().replace(/^\.\//,'');if(ref.startsWith('/'))return _norm(ref.slice(1));return _norm((baseDir||'')+ref);}
const _MIME={webp:'image/webp',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',svg:'image/svg+xml',gif:'image/gif',ico:'image/x-icon',avif:'image/avif',woff:'font/woff',woff2:'font/woff2',ttf:'font/ttf',otf:'font/otf',bin:'application/octet-stream',mp4:'video/mp4'};
async function zipImport(file){
  if(!window.JSZip){toast("JSZip no cargó (prueba en tu Vercel)");return;}
  const info=document.getElementById("zipInfo");info.textContent="Descomprimiendo…";
  try{
    const zip=await JSZip.loadAsync(file);
    const paths=Object.keys(zip.files).filter(p=>!zip.files[p].dir);
    // assets -> dataURL
    const assets={};
    for(const p of paths){const ext=(p.split('.').pop()||'').toLowerCase();if(_MIME[ext]&&ext!=='html'&&ext!=='css'&&ext!=='js'&&ext!=='json'){const b64=await zip.files[p].async("base64");assets[_norm(p)]='data:'+_MIME[ext]+';base64,'+b64;}}
    // html principal (page.html preferido, evitar source)
    let htmlPath=paths.find(p=>/(^|\/)page\.html$/i.test(p))||paths.find(p=>/\.html$/i.test(p)&&!/source/i.test(p))||paths.find(p=>/\.html$/i.test(p));
    if(!htmlPath){info.textContent="No encontré HTML en el ZIP";return;}
    let html=await zip.files[htmlPath].async("string");
    const baseDir=htmlPath.includes('/')?htmlPath.slice(0,htmlPath.lastIndexOf('/')+1):'';
    info.textContent="Incrustando estilos e imágenes…";
    const repUrl=(css,cssDir)=>css.replace(/url\((["']?)([^)"']+)\1\)/g,(m,q,u)=>{if(/^data:|^https?:|^\/\//.test(u.trim()))return m;const key=_resolve(u.split('#')[0].split('?')[0],cssDir);return assets[key]?`url(${assets[key]})`:m;});
    // inline <link ... .css>
    const linkRe=/<link[^>]+href=(["'])([^"']+\.css)\1[^>]*>/gi;let mm;const links=[];while((mm=linkRe.exec(html)))links.push(mm);
    for(const lm of links){const cssKey=_resolve(lm[2].split('?')[0],baseDir);const cf=zip.files[cssKey];if(cf){let css=await cf.async("string");css=repUrl(css,cssKey.includes('/')?cssKey.slice(0,cssKey.lastIndexOf('/')+1):'');html=html.replace(lm[0],'<style>\n'+css+'\n</style>');}}
    // procesar <style> inline (url())
    html=html.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi,(m,c)=>'<style>'+repUrl(c,baseDir)+'</style>');
    // src/href/poster -> dataURL
    html=html.replace(/\b(src|href|poster|data-src)=(["'])([^"']+)\2/gi,(m,a,q,u)=>{if(/^data:|^https?:|^\/\/|^#|^mailto:|^tel:|^javascript:/.test(u.trim()))return m;const key=_resolve(u.split('#')[0].split('?')[0],baseDir);return assets[key]?`${a}=${q}${assets[key]}${q}`:m;});
    // srcset
    html=html.replace(/srcset=(["'])([^"']+)\1/gi,(m,q,v)=>{const out=v.split(',').map(part=>{const seg=part.trim().split(/\s+/);const key=_resolve((seg[0]||'').split('#')[0].split('?')[0],baseDir);if(assets[key])seg[0]=assets[key];return seg.join(' ');});return `srcset=${q}${out.join(', ')}${q}`;});
    document.getElementById("importText").value=html;
    info.textContent="ZIP listo ✓ — pulsa “Importar fiel” o “Traducir a bloques”";
    toast("ZIP procesado (autocontenido). Elige Importar fiel o Traducir.");
  }catch(e){info.textContent="Error leyendo el ZIP";toast("No pude leer el ZIP");}
}
function getImportSections(){
  const txt=(document.getElementById("importText").value||"").trim();
  if(!txt){toast("Pega el HTML primero");return null;}
  let doc;try{doc=new DOMParser().parseFromString(txt,"text/html");}catch(e){toast("HTML no válido");return null;}
  try{
    doc.querySelectorAll('[class*="cookie" i],[id*="cookie" i],.acepta_cookies,.rechaza_cookies,.guarda_cookies').forEach(el=>{const m=el.closest('.modal,[class*="modal" i],[role="dialog"]');(m||el).remove();});
    doc.querySelectorAll('.modal-backdrop,.modal.show,.modal.in,.offcanvas.show,[class*="consent" i],[id*="consent" i],[class*="cmp" i],[id*="cmp" i],[class*="gdpr" i],[id*="gdpr" i]').forEach(el=>el.remove());
    [...doc.querySelectorAll('div,section,aside')].forEach(el=>{const tt=el.textContent||"";if(/cookies/i.test(tt)&&/(aceptar|rechazar|configurar)/i.test(tt)&&el.querySelector('a,button')&&tt.length<1500){el.remove();}});
  }catch(e){}
  let container=doc.body;const blockKids=[...doc.body.children].filter(e=>["SECTION","DIV","HEADER","FOOTER","MAIN","NAV","ARTICLE"].includes(e.tagName));
  if(blockKids.length<=2){const main=doc.querySelector("main")||blockKids.sort((a,b)=>b.innerHTML.length-a.innerHTML.length)[0];if(main)container=main;}
  return {doc,els:[...container.children].filter(el=>!["SCRIPT","NOSCRIPT","STYLE","LINK","TEMPLATE"].includes(el.tagName)&&(_txt(el).length>15||(el.querySelector&&el.querySelector('img'))))};
}
function doTranslate(){
  const r=getImportSections();if(!r)return;
  const blocks=r.els.map(translateSection).filter(Boolean);
  if(!blocks.length){toast("No pude traducir");return;}
  commit();state.settings.importCSS="";
  state.sections=blocks.map(b=>({id:nid(),type:b.type,props:Object.assign(LIB[b.type].def(),b.props),style:{}}));
  state.selected=null;document.getElementById("importOverlay").style.display="none";
  renderPalette();renderPreview();renderRight();toast("Traducido a "+blocks.length+" bloques nativos");
}
function importFromText(txt){
  if(!txt){toast("Pega o sube el HTML primero");return;}
  let doc;try{doc=new DOMParser().parseFromString(txt,"text/html");}catch(e){toast("HTML no válido");return;}
  // quitar overlays de cookies/consentimiento y modales abiertos (dependen de JS que no se importa)
  try{
    doc.querySelectorAll('[class*="cookie" i],[id*="cookie" i],.acepta_cookies,.rechaza_cookies,.guarda_cookies').forEach(el=>{const m=el.closest('.modal,[class*="modal" i],[role="dialog"]');(m||el).remove();});
    doc.querySelectorAll('.modal-backdrop,.modal.show,.modal.in,.offcanvas.show,[class*="consent" i],[id*="consent" i],[class*="cmp" i],[id*="cmp" i],[class*="gdpr" i],[id*="gdpr" i]').forEach(el=>el.remove());
    [...doc.querySelectorAll('div,section,aside')].forEach(el=>{const t=el.textContent||"";if(/cookies/i.test(t)&&/(aceptar|rechazar|configurar)/i.test(t)&&el.querySelector('a,button')&&t.length<1500){el.remove();}});
  }catch(e){}
  // CSS real (links + styles)
  let css="";doc.querySelectorAll('link[rel="stylesheet"],style').forEach(el=>{css+=el.outerHTML+"\n";});
  // localizar contenedor con las secciones
  let container=doc.body;
  const blockKids=[...doc.body.children].filter(e=>["SECTION","DIV","HEADER","FOOTER","MAIN","NAV","ARTICLE"].includes(e.tagName));
  if(blockKids.length<=2){const main=doc.querySelector("main")||blockKids.sort((a,b)=>b.innerHTML.length-a.innerHTML.length)[0];if(main)container=main;}
  const secs=[...container.children].filter(el=>!["SCRIPT","NOSCRIPT","STYLE","LINK","TEMPLATE"].includes(el.tagName)).map(el=>el.outerHTML.trim()).filter(h=>h.length>25);
  if(!secs.length){toast("No pude trocear secciones");return;}
  commit();
  state.settings.importCSS=css;
  state.sections=secs.map(h=>({id:nid(),type:"imported",props:{html:annotateImported(h)},style:{}}));
  state.selected=null;document.getElementById("importOverlay").style.display="none";
  renderPalette();renderPreview();renderRight();toast("Importado: "+secs.length+" secciones");
}
function doImport(){importFromText((document.getElementById("importText").value||"").trim());}
const CLIENT_HTML={"Cliente · Prosegur (real)":"plantillas/prosegur.html"};
function loadClientHtml(name){const url=CLIENT_HTML[name];if(!url)return;if(state.sections.length&&!confirm("¿Reemplazar la landing actual por “"+name+"”?"))return;toast("Cargando "+name+"…");fetch(url).then(r=>{if(!r.ok)throw 0;return r.text();}).then(t=>importFromText(t)).catch(e=>toast("No encuentro "+url+" — súbelo al repo"));}
function loadTemplate(name){const t=TEMPLATES[name];if(!t)return;if(state.sections.length&&!confirm("¿Reemplazar la landing actual por la plantilla “"+name+"”?"))return;
  commit();const bk=TEMPLATE_BRAND[name];if(bk&&BRANDS[bk]){state.settings.brand=bk;const bt=document.getElementById("brandTop");if(bt)bt.value=bk;}
  state.sections=t.map(ty=>{const type=(typeof ty==="string")?ty:ty.type;const props=Object.assign(LIB[type].def(),(typeof ty==="object"&&ty.props)||{});return {id:nid(),type,props,style:(typeof ty==="object"&&ty.style)||{}};});state.selected=null;renderPalette();renderPreview();renderRight();toast("Plantilla cargada");}
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove("show"),2100);}
