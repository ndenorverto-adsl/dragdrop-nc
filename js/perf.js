/* ---------- v4.6 · RENDIMIENTO Y SEO ----------
   · Imágenes: al subir se redimensionan (máx. 2000 px) y pasan a WebP si pesan; botón para optimizar las que ya están (base64).
   · Panel «⚡ Velocidad»: peso total, imágenes, fuentes, scripts, imagen principal (LCP), tiempo estimado en 4G y nota 0-100 con arreglos.
   · Export: schema Organization + WebPage (solo con datos reales, nunca placeholders) y aviso en la checklist si la página pesa demasiado. */
Object.assign(SETTINGS_DEFAULT,{imgOpt:true});if(state.settings.imgOpt===undefined)state.settings.imgOpt=true;
const NC_IMG_MAXW=2000,NC_IMG_Q=.82;
function ncLoadImg(src){return new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("imagen no válida"));i.src=src;});}
async function ncToWebp(dataUrl,maxW,q){if(!/^data:image\/(png|jpe?g|webp|bmp)/i.test(dataUrl))return {url:dataUrl,changed:false};
  const img=await ncLoadImg(dataUrl);const w=img.naturalWidth,h=img.naturalHeight;if(!w||!h)return {url:dataUrl,changed:false};
  const sc=Math.min(1,(maxW||NC_IMG_MAXW)/w);const c=document.createElement("canvas");c.width=Math.max(1,Math.round(w*sc));c.height=Math.max(1,Math.round(h*sc));
  c.getContext("2d").drawImage(img,0,0,c.width,c.height);const out=c.toDataURL("image/webp",q||NC_IMG_Q);
  if(!/^data:image\/webp/.test(out)||out.length>=dataUrl.length*.95)return {url:dataUrl,changed:false,w,h};return {url:out,changed:true,w:c.width,h:c.height};}
function ncDataUrlToFile(u,name){const m=u.match(/^data:([^;]+);base64,(.*)$/);const bin=atob(m[2]);const a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new File([a],name,{type:m[1]});}
/* subir imagen → optimizada */
(function(){const _r=readImg;readImg=function(file,cb){if(!file||state.settings.imgOpt===false||!/^image\/(png|jpeg|jpg|webp|bmp)$/i.test(file.type)||file.size<120*1024)return _r.apply(this,arguments);
  const fr=new FileReader();fr.onload=async()=>{try{const o=await ncToWebp(fr.result);if(!o.changed)return _r(file,cb);
      const nf=ncDataUrlToFile(o.url,file.name.replace(/\.[a-z0-9]+$/i,"")+".webp");toast(`Imagen optimizada: ${Math.round(file.size/1024)} → ${Math.round(nf.size/1024)} KB`);_r(nf,cb);}catch(e){_r(file,cb);}};fr.readAsDataURL(file);};})();
/* optimizar todas las imágenes base64 de la landing */
async function ncOptimizeAll(onStep){const urls=new Set();const scan=o=>{if(typeof o==="string"){if(/^data:image\/(png|jpe?g|webp|bmp)/i.test(o)&&o.length>160*1024*1.37)urls.add(o);return;}if(Array.isArray(o))o.forEach(scan);else if(o&&typeof o==="object")Object.values(o).forEach(scan);};
  scan(state.sections);scan(state.settings);const L=[...urls];if(!L.length)return {n:0,before:0,after:0};const map=new Map();let before=0,after=0,i=0;
  for(const u of L){i++;if(onStep)onStep(i,L.length);try{const o=await ncToWebp(u);before+=u.length;after+=o.url.length;if(o.changed)map.set(u,o.url);}catch(e){}}
  if(map.size){commit();const rep=o=>{if(typeof o==="string")return map.get(o)||o;if(Array.isArray(o))return o.map(rep);if(o&&typeof o==="object"){for(const k in o)o[k]=rep(o[k]);return o;}return o;};
    state.sections=rep(state.sections);rep(state.settings);
    state.sections.forEach(s=>{if(s.type==="imported"&&s.props&&s.props.html)map.forEach((v,k)=>{s.props.html=s.props.html.split(k).join(v);});});
    if(state.settings.importCSS)map.forEach((v,k)=>{state.settings.importCSS=state.settings.importCSS.split(k).join(v);});
    renderPreview();renderRight();}
  return {n:map.size,before:Math.round(before*.75/1024),after:Math.round(after*.75/1024)};}
/* medición */
function ncPerfMeasure(){const html=buildDoc(true);const kb=s=>Math.round(s.length/1024);
  const imgs=[...html.matchAll(/data:image\/([a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)/gi)].map(m=>({type:m[1],kb:Math.round(m[2].length*.75/1024)}));
  const ext=[...new Set([...html.matchAll(/<img[^>]+src="(https?:[^"]+)"/g)].map(m=>m[1]))];
  const fontsUrl=[...html.matchAll(/fonts\.googleapis\.com\/css2\?([^"']+)/g)].map(m=>m[1]).join("&");
  const fams=[...new Set((fontsUrl.match(/family=([^:&]+)/g)||[]).map(x=>decodeURIComponent(x.slice(7)).replace(/\+/g," ")))];
  const weights=(fontsUrl.match(/wght@[^&]*/g)||[]).reduce((a,x)=>a+x.split(";").length,0);
  const js=[...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].reduce((a,m)=>a+m[1].length,0);
  const css=[...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].reduce((a,m)=>a+m[1].length,0);
  const fontData=[...html.matchAll(/data:font\/[a-z0-9]+;base64,([A-Za-z0-9+/=]+)/g)].reduce((a,m)=>a+m[1].length*.75,0);
  const heroM=html.match(/<img[^>]+fetchpriority="high"[^>]*>/);const heroSrc=heroM?((heroM[0].match(/src="([^"]+)"/)||[])[1]||""):"";
  const heroKb=/^data:/.test(heroSrc)?Math.round(heroSrc.length*.75/1024):null;
  const tags=(html.match(/<[a-z][^>]*>/gi)||[]).length;const total=kb(html);
  const imgKb=imgs.reduce((a,x)=>a+x.kb,0);const big=imgs.filter(x=>x.kb>250);const notWebp=imgs.filter(x=>/png|jpe?g/i.test(x.type)&&x.kb>60);
  const est=+(0.6+(total+ext.length*120+fams.length*35)/220).toFixed(1); /* 4G ≈ 1,75 Mbps efectivos + latencia */
  const issues=[];let score=100;const pen=(n,m,fix,lvl)=>{score-=n;issues.push({m,fix,lvl:lvl||"warn"});};
  if(total>2500)pen(25,`La página pesa ${total} KB (objetivo < 1.000 KB).`,"opt","error");else if(total>1000)pen(12,`La página pesa ${total} KB (objetivo < 1.000 KB).`,"opt");
  if(big.length)pen(Math.min(20,big.length*6),`${big.length} imagen(es) de más de 250 KB.`,"opt");
  if(notWebp.length)pen(Math.min(10,notWebp.length*3),`${notWebp.length} imagen(es) PNG/JPG que pesarían menos en WebP.`,"opt");
  if(heroKb!=null&&heroKb>200)pen(10,`La imagen principal (LCP) pesa ${heroKb} KB (objetivo < 200 KB).`,"opt");
  if(fams.length>3)pen(8,`${fams.length} familias de Google Fonts (${fams.join(", ")}). Con 2 basta.`,"fonts");
  if(weights>12)pen(5,`${weights} grosores de fuente pedidos.`,"fonts");
  if(fontData>300*1024)pen(8,`Fuentes incrustadas: ${Math.round(fontData/1024)} KB.`,"");
  if(js>120*1024)pen(6,`JavaScript en línea: ${Math.round(js/1024)} KB.`,"");
  if(tags>3500)pen(6,`DOM grande (${tags} etiquetas).`,"");
  if(ext.length>12)pen(4,`${ext.length} imágenes externas distintas.`,"");
  if(state.settings.fxLevel==="llamativa")pen(3,"Animaciones en «Llamativa»: en móviles lentos retrasan la interacción.","fx");
  return {score:Math.max(0,Math.round(score)),total,imgKb,imgs:imgs.length,ext:ext.length,fams,weights,js:Math.round(js/1024),css:Math.round(css/1024),fontKb:Math.round(fontData/1024),heroKb,heroExt:heroSrc&&!/^data:/.test(heroSrc),tags,est,issues};}
function ncOpenPerf(){let o=document.getElementById("ncPerfOv");if(!o){o=document.createElement("div");o.id="ncPerfOv";o.className="nc-imprep";document.body.appendChild(o);o.onclick=e=>{if(e.target===o)o.style.display="none";};}
  const m=ncPerfMeasure();const col=m.score>=85?"#22c55e":m.score>=60?"#f5a524":"#ef4444";o.style.display="grid";
  const row=(k,v)=>`<div class="nc-pfrow"><span>${k}</span><b>${v}</b></div>`;
  o.innerHTML=`<div class="nc-imprep-box"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><b>⚡ Velocidad de la landing</b><button class="btn sm ghost" id="ncPfX">Cerrar</button></div>
   <div class="nc-pfscore"><span style="--c:${col}">${m.score}</span><div><b>${m.score>=85?"Rápida":m.score>=60?"Mejorable":"Lenta"}</b><small>≈ ${String(m.est).replace(".",",")} s hasta verse en 4G (estimación)</small></div></div>
   ${row("Peso total del HTML",m.total+" KB")}${row("Imágenes incrustadas",m.imgs+" · "+m.imgKb+" KB")}${row("Imágenes externas",m.ext)}${row("Imagen principal (LCP)",m.heroKb!=null?m.heroKb+" KB":m.heroExt?"externa · con preload":"sin imagen")}
   ${row("Fuentes",m.fams.length+" familias · "+m.weights+" grosores"+(m.fontKb?" · "+m.fontKb+" KB incrustadas":""))}${row("CSS / JS en línea",m.css+" KB / "+m.js+" KB")}${row("Etiquetas HTML",m.tags)}
   <div class="ck-list" style="margin-top:10px">${m.issues.length?m.issues.map(i=>`<div class="ck-it ${i.lvl}"><span class="ck-dot"></span><span class="ck-m">${esc(i.m)}</span>${i.fix==="opt"?`<button class="btn sm" data-pf="opt">Optimizar imágenes</button>`:i.fix==="fonts"?`<button class="btn sm" data-pf="fonts">Usar las de la marca</button>`:i.fix==="fx"?`<button class="btn sm" data-pf="fx">Pasar a «Media»</button>`:""}</div>`).join(""):`<div class="help">Sin avisos. 👌</div>`}</div>
   <label class="nc-pfchk"><input type="checkbox" id="ncPfOpt" ${state.settings.imgOpt!==false?"checked":""}> Optimizar las imágenes al subirlas (WebP, máx. 2000 px)</label>
   <div id="ncPfLog" class="nc-publog"></div><div class="help">Estimación orientativa calculada sobre el HTML exportado; para la nota real usa PageSpeed Insights sobre la URL publicada.</div></div>`;
  o.querySelector("#ncPfX").onclick=()=>{o.style.display="none";};
  o.querySelector("#ncPfOpt").onchange=e=>{state.settings.imgOpt=e.target.checked;};
  o.querySelectorAll("[data-pf]").forEach(b=>b.onclick=async()=>{const k=b.dataset.pf;const log=o.querySelector("#ncPfLog");
    if(k==="opt"){b.disabled=true;const r=await ncOptimizeAll((i,n)=>{log.textContent=`Optimizando ${i} / ${n}…`;});log.textContent=r.n?`✓ ${r.n} imagen(es): ${r.before} → ${r.after} KB`:"No había imágenes que mejorar.";setTimeout(ncOpenPerf,900);}
    if(k==="fonts"){commit();state.settings.fontHead=state.settings.fontBody="";state.settings.fontDisp="";state.settings.lookBrandFont=true;renderPreview();ncOpenPerf();}
    if(k==="fx"){commit();state.settings.fxLevel="media";renderPreview();ncOpenPerf();}});}
/* SEO: Organization + WebPage con datos reales */
(function(){const _hm=ncHeadMeta;ncHeadMeta=function(sectionsStr){let out=_hm.apply(this,arguments);const st=state.settings;const real=v=>v&&!/\{\{/.test(v);
  try{const foot=state.sections.find(s=>/_footer$/.test(s.type));const company=foot&&foot.props&&foot.props.company;const url=(st.pageUrl||"").trim();
    const g=[];if(real(st.title))g.push({"@type":"WebPage",name:st.title,description:real(st.desc)?st.desc:undefined,inLanguage:"es-ES",url:url||undefined});
    if(real(company)){const o={"@type":"Organization",name:company.replace(/^©\s*/,"")};if(real(st.tel))o.telephone=st.tel;if(url)try{o.url=new URL(url).origin;}catch(_){}g.push(o);}
    if(g.length)out+=`\n<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":g}).replace(/</g,"\\u003c")}<\/script>`;}catch(e){}
  return out;};})();
/* checklist: peso */
(function(){const _a=ncAudit;ncAudit=function(){const out=_a.apply(this,arguments);try{const m=ncPerfMeasure();if(m.total>2500)out.push({lvl:"warn",m:`La página pesa ${m.total} KB: optimiza las imágenes (⚡ Velocidad) para que cargue rápido en móvil.`});else if(m.heroKb!=null&&m.heroKb>400)out.push({lvl:"warn",m:`La imagen principal pesa ${m.heroKb} KB.`});}catch(e){}return out;};})();
document.addEventListener("DOMContentLoaded",()=>{const ref=document.getElementById("btnCro");if(!ref||document.getElementById("btnPerf"))return;
  const b=document.createElement("button");b.className="btn";b.id="btnPerf";b.title="Peso, imágenes, fuentes y tiempo de carga estimado";b.textContent="⚡ Velocidad";ref.parentNode.insertBefore(b,ref.nextSibling);b.addEventListener("click",ncOpenPerf);});
