/* ---------- v4.5 · PANEL IZQUIERDO POR OBJETIVO ----------
   · Desplegables por objetivo de conversión (abrir/cerrar se recuerda), con contador.
   · Miniatura esquemática en cada bloque + vista previa real al pasar el ratón (con la marca y el estilo actuales).
   · Favoritos (★) y recientes, guardados en este navegador.
   · Filtros de sector y canal: el bloque entra ya con el copy de ese sector y con ese canal como principal. */
const PAL_GOALS=[
  ["top","Cabecera y hero","Lo primero que se ve: navegación, barra de oferta y hero.",/^(d[abc]_(nav|topbar|hero)|dx_(subnav|product)|topbar|navbar|hero_\w+)$/],
  ["lead","Captar el lead","Formularios, CTAs, quiz y canales directos.",/(_cta|form|form2|quiz|leadmag|exit|_wa|thanks|^cal\w*|coverage|callback|booking)$/],
  ["price","Precio y oferta","Tarifas, calculadora, cuenta atrás y comparativas de precio.",/(plans|pricing|calc|countdown|ptab|comparison|_vs|offer|finder|bundle)$/],
  ["trust","Confianza y prueba","Cifras, sellos, opiniones, garantías y quién te atiende.",/(trust|seals|reviews|rating|logos|logowall|guarantee|_pro|letter|stats|testimonials|security|counters|marquee|area|vtestis)$/],
  ["explain","Explicar y resolver dudas","Ventajas, pasos, imagen + texto, bento y preguntas.",/(benefits|steps|story|media|_text|tiles|article|compare|features|imagetext|gallery|video|richtext|faq)$/],
  ["close","Cierre y elementos fijos","Footer y barra fija de móvil.",/(footer|sticky)$/]
];
const PAL_SECTORS=["Telco","Energía","Alarmas","Seguros","Salud","Legal"];
const PAL_CANAL=[["","Todos"],["form","Formulario"],["call","Llamada"],["wa","WhatsApp"]];
const PAL_LS={fav:"nc_pal_fav_v1",rec:"nc_pal_rec_v1",open:"nc_pal_open_v1",flt:"nc_pal_flt_v1"};
function palGet(k,d){try{const v=JSON.parse(localStorage.getItem(PAL_LS[k])||"null");return v==null?d:v;}catch(e){return d;}}
function palSet(k,v){try{localStorage.setItem(PAL_LS[k],JSON.stringify(v));}catch(e){}}
function palGoal(t){const g=PAL_GOALS.find(g=>g[3].test(t));return g?g[0]:"explain";}
function palFam(t){const m=t.match(/^(d[abcx])_/);return m?{da:"A",db:"B",dc:"C",dx:"✚"}[m[1]]:"·";}
/* miniatura esquemática (SVG 56×34) según la forma del bloque */
function palThumb(t){const P="var(--acc,#7c6cff)",L="currentColor";const r=(x,y,w,h,f,o)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="1.5" fill="${f||L}" opacity="${o==null?.35:o}"/>`;let s="";
  if(/_nav|navbar|subnav/.test(t))s=r(3,13,12,8)+r(30,15,8,4)+r(42,13,11,8,P,.9);
  else if(/topbar/.test(t))s=r(0,12,56,10,L,.25)+r(14,15,28,4);
  else if(/dx_product|hero_center/.test(t))s=r(16,4,24,3,P,.8)+r(10,9,36,5)+r(18,16,20,4,P,.9)+r(12,22,32,10,L,.2);
  else if(/hero/.test(t))s=r(3,6,24,5)+r(3,13,18,3)+r(3,19,12,5,P,.9)+r(33,5,20,24,L,.2)+r(36,18,14,4,P,.9);
  else if(/vtestis/.test(t))s=[3,21,39].map(x=>r(x,4,14,20,L,.3)+`<circle cx="${x+7}" cy="14" r="3.2" fill="${P}" opacity=".9"/>`+r(x+1,27,12,3)).join("");
  else if(/booking/.test(t))s=[4,14,24,34,44].map(x=>r(x,5,8,9,L,.3)).join("")+[4,20,36].map(x=>r(x,18,14,5,L,.22)).join("")+r(4,26,48,5,P,.9);
  else if(/bundle/.test(t))s=[5,13,21].map((y,i)=>r(3,y,4,4,i<2?P:L,i<2?.9:.35)+r(10,y,22,4,L,.3)).join("")+r(36,5,17,24,L,.2)+r(38,22,13,4,P,.9);
  else if(/finder/.test(t))s=[3,13,23,33].map(x=>r(x,3,8,4,L,.35)).join("")+[3,21,39].map(x=>r(x,11,14,20,L,.2)+r(x+2,24,10,4,P,.9)).join("");
  else if(/plans|pricing|ptab/.test(t))s=[3,21,39].map(x=>r(x,5,14,24,L,.2)+r(x+2,9,10,3)+r(x+2,22,10,4,P,.9)).join("");
  else if(/faq|accordion/.test(t))s=[5,13,21].map(y=>r(6,y,44,6,L,.22)+r(45,y+2,3,2)).join("");
  else if(/tiles/.test(t))s=r(3,4,32,13,L,.45)+r(37,4,16,13,P,.85)+r(3,19,16,12,L,.2)+r(21,19,32,12,L,.2);
  else if(/stats|trust|counters/.test(t))s=[4,22,40].map(x=>r(x,11,12,7,L,.45)+r(x+1,20,10,2)).join("");
  else if(/steps|story/.test(t))s=[4,22,40].map((x,i)=>`<circle cx="${x+6}" cy="12" r="4" fill="${P}" opacity=".85"/>`+r(x,19,12,3)).join("");
  else if(/media|imagetext|letter|article|pro/.test(t))s=r(3,7,22,4)+r(3,14,18,3)+r(3,20,10,5,P,.9)+r(31,5,22,24,L,.22);
  else if(/benefits|features|seals|vs|compare|reviews|testimon/.test(t))s=[[3,5],[21,5],[39,5],[3,19],[21,19],[39,19]].map(([x,y])=>r(x,y,14,11,L,.2)+r(x+2,y+2,4,4,P,.8)).join("");
  else if(/sticky/.test(t))s=r(0,24,56,10,L,.2)+r(4,26,22,6)+r(30,26,22,6,P,.9);
  else if(/footer/.test(t))s=r(0,16,56,18,L,.3)+r(4,22,18,3)+r(36,22,16,3);
  else if(/cta|form|quiz|calc|coverage|leadmag|exit|thanks|cal/.test(t))s=r(6,6,44,22,L,.2)+r(10,10,24,4)+r(10,17,26,6,L,.35)+r(37,17,10,6,P,.9);
  else if(/countdown/.test(t))s=[6,19,32,45].map(x=>r(x-2,10,11,13,L,.3)).join("");
  else if(/_wa/.test(t))s=`<circle cx="44" cy="22" r="8" fill="#25D366" opacity=".9"/>`+r(4,8,30,5,L,.2);
  else s=r(6,8,30,5)+r(6,16,44,3,L,.2)+r(6,22,36,3,L,.2);
  return `<svg class="pal-th" viewBox="0 0 56 34" aria-hidden="true">${s}</svg>`;}
/* contenido de sector y canal al insertar */
function palPreset(s){const f=palGet("flt",{});const sec=f.sec,can=f.can;const def=LIB[s.type].def();
  if(sec&&V4_SECTORS[sec]){const S=V4_SECTORS[sec];const only=o=>{const r={};Object.keys(o||{}).forEach(k=>{if(k in def)r[k]=o[k];});return r;};
    if(/_hero$/.test(s.type))Object.assign(s.props,only(S.hero),"illus" in def?{illus:(typeof UC_ILL!=="undefined"&&UC_ILL[sec])||def.illus}:{});
    if(/_faq$/.test(s.type)&&S.faq)s.props.items=S.faq;
    if(s.type==="da_trust"&&S.trust)s.props.items=S.trust;
    if(s.type==="da_benefits"&&S.benefits)s.props.items=S.benefits;
    if(s.type==="da_plans"&&S.plans)s.props.plans=JSON.parse(JSON.stringify(S.plans));
    if(s.type==="db_compare"&&S.compare)Object.assign(s.props,S.compare);
    if(s.type==="dx_product"&&"illus" in def&&typeof UC_ILL!=="undefined"&&UC_ILL[sec])s.props.illus=UC_ILL[sec];}
  if(can&&"canal" in def)s.props.canal=can;}
(function(){const _a=addSection;addSection=function(type){const r=_a.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);
    if(s&&s.type===type){const before=JSON.stringify(s.props);palPreset(s);if(JSON.stringify(s.props)!==before){renderPreview();renderRight();}}
    const rec=palGet("rec",[]).filter(x=>x!==type);rec.unshift(type);palSet("rec",rec.slice(0,8));
    if(!document.getElementById("palSearch").value)palRefreshTop();return r;};})();

function palChip(t,fav){const b=LIB[t];const f=palGet("flt",{});const rec=f.can&&("canal" in (b._defc||(b._defc=b.def())));
  return `<div class="chip pal-c" draggable="true" data-add="${t}" title="${esc(b.label)}">${palThumb(t)}<span class="pal-l">${esc(b.label.replace(/^[ABC] · |^✚ /,"").replace(/\s*\([^)]*\)\s*$/,""))}<small>${palFam(t)==="·"?"clásico":palFam(t)==="✚"?"extra":"familia "+palFam(t)}${rec?" · canal "+(PAL_CANAL.find(c=>c[0]===f.can)||[])[1]:""}</small></span><button type="button" class="pal-star${fav?" on":""}" data-fav="${t}" title="${fav?"Quitar de favoritos":"Añadir a favoritos"}" aria-label="Favorito">${fav?"★":"☆"}</button></div>`;}
function palVisible(t,q){const b=LIB[t];if(!b||b.hidden)return false;if(b.brand&&b.brand!==state.settings.brand)return false;
  if(q&&!(b.label.toLowerCase().includes(q)||String(b.cat||"").toLowerCase().includes(q)||t.includes(q)))return false;
  const f=palGet("flt",{});if(f.fam&&f.fam!==palFam(t)&&!(f.fam==="A"&&palFam(t)==="✚"))return false;if(f.can==="wa"&&/_wa$/.test(t))return true;return true;}
function palTopHTML(){const fav=palGet("fav",[]).filter(t=>LIB[t]),rec=palGet("rec",[]).filter(t=>LIB[t]&&!fav.includes(t));let h="";
  if(fav.length)h+=`<div class="pal-top"><div class="pal-tt">★ Favoritos</div>${fav.map(t=>palChip(t,true)).join("")}</div>`;
  if(rec.length)h+=`<div class="pal-top"><div class="pal-tt">🕘 Recientes</div><div class="pal-recs">${rec.slice(0,6).map(t=>`<button type="button" class="pal-rec" data-add="${t}" draggable="true" title="${esc(LIB[t].label)}">${palThumb(t)}<span>${esc(LIB[t].label.replace(/^[ABC] · |^✚ /,"").slice(0,22))}</span></button>`).join("")}</div></div>`;
  return h;}
function palRefreshTop(){const el=document.getElementById("palTop");if(el){el.innerHTML=palTopHTML();palBind(el);}}
renderPalette=function(){
  const ps=document.getElementById("palSearch");let q=(ps&&ps.value||"").toLowerCase().trim();if(q.indexOf("@")>-1){q="";if(ps)ps.value="";}
  const f=palGet("flt",{}),open=palGet("open",{top:true,lead:true}),fav=palGet("fav",[]);
  const groups={};ORDER.forEach(t=>{if(!palVisible(t,q))return;const g=palGoal(t);(groups[g]=groups[g]||[]).push(t);});
  const famOrder={"A":0,"B":1,"C":2,"✚":3,"·":4};Object.values(groups).forEach(a=>a.sort((x,y)=>famOrder[palFam(x)]-famOrder[palFam(y)]));
  const fl=`<div class="pal-flt"><select id="palSec" title="Sector: el bloque entra con su copy"><option value="">Sector: todos</option>${Object.keys(V4_SECTORS).map(s=>`<option ${f.sec===s?"selected":""}>${s}</option>`).join("")}</select>
    <select id="palCan" title="Canal principal de los bloques que lo admiten">${PAL_CANAL.map(c=>`<option value="${c[0]}" ${f.can===c[0]?"selected":""}>${c[0]?"Canal: "+c[1]:"Canal: todos"}</option>`).join("")}</select>
    <select id="palFam" title="Familia de diseño"><option value="">Familia: todas</option><option value="A" ${f.fam==="A"?"selected":""}>A · Oferta directa</option><option value="B" ${f.fam==="B"?"selected":""}>B · Confianza</option><option value="C" ${f.fam==="C"?"selected":""}>C · Premium</option><option value="·" ${f.fam==="·"?"selected":""}>Clásicos</option></select></div>`;
  let h=fl+(q?"":`<div id="palTop">${palTopHTML()}</div>`);
  PAL_GOALS.forEach(([k,lab,desc])=>{const L=groups[k]||[];if(!L.length)return;const isOpen=q?true:!!open[k];
    h+=`<details class="pal-g" data-g="${k}" ${isOpen?"open":""}><summary><span>${lab}</span><b>${L.length}</b></summary><div class="pal-d">${desc}</div><div class="cat">${L.map(t=>palChip(t,fav.includes(t))).join("")}</div></details>`;});
  const p=document.getElementById("palette");p.innerHTML=h;if(!Object.keys(groups).length)p.insertAdjacentHTML("beforeend",`<div class="empty">Sin resultados</div>`);
  palBind(p);
  p.querySelectorAll("details.pal-g").forEach(d=>d.addEventListener("toggle",()=>{if(q)return;const o=palGet("open",{top:true,lead:true});o[d.dataset.g]=d.open;palSet("open",o);}));
  const sv=(id,k)=>{const el=document.getElementById(id);if(el)el.addEventListener("change",()=>{const o=palGet("flt",{});o[k]=el.value;palSet("flt",o);renderPalette();});};sv("palSec","sec");sv("palCan","can");sv("palFam","fam");
};
function palBind(root){
  root.querySelectorAll("[data-add]").forEach(c=>{if(c._pb)return;c._pb=1;
    c.addEventListener("dragstart",()=>{dragType=c.dataset.add;showDrop(true);palHide();});c.addEventListener("dragend",()=>showDrop(false));
    c.addEventListener("click",e=>{if(e.target.closest("[data-fav]"))return;palHide();addSection(c.dataset.add);});
    c.addEventListener("mouseenter",()=>palHover(c));c.addEventListener("mouseleave",()=>{clearTimeout(palHover._t);palHide();});});
  root.querySelectorAll("[data-fav]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();const t=b.dataset.fav;let fav=palGet("fav",[]);fav=fav.includes(t)?fav.filter(x=>x!==t):[t,...fav];palSet("fav",fav.slice(0,16));renderPalette();}));}
/* vista previa real al pasar el ratón */
const palCache={};
function palHover(c){clearTimeout(palHover._t);palHover._t=setTimeout(()=>{const t=c.dataset.add;if(!LIB[t])return;
  let pop=document.getElementById("palPop");if(!pop){pop=document.createElement("div");pop.id="palPop";pop.innerHTML=`<div class="pal-pop-h"></div><div class="pal-pop-f"><iframe title="Vista previa del bloque" sandbox="allow-same-origin" tabindex="-1"></iframe></div>`;document.body.appendChild(pop);}
  const key=t+"|"+state.settings.brand+"|"+ncLook()+"|"+JSON.stringify(palGet("flt",{}))+"|"+(CUSTOM.bp||"");
  if(!palCache[key]){const bak=state.sections,sel=state.selected;try{const s={id:"palpv",type:t,props:LIB[t].def(),style:{}};palPreset(s);state.sections=[s];state.selected=null;palCache[key]=buildDoc(true).replace(/<script[\s\S]*?<\/script>/gi,"").replace("</head>","<style>#ncCookies{display:none!important}html,body{overflow:hidden}.da-sticky,.db-sticky,.dc-sticky{position:static!important}[data-fx]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}</style></head>");}catch(e){palCache[key]="<p style='font:13px sans-serif;padding:20px'>Sin vista previa</p>";}finally{state.sections=bak;state.selected=sel;}}
  pop.querySelector(".pal-pop-h").textContent=LIB[t].label;const fr=pop.querySelector("iframe");if(fr.dataset.k!==key){fr.srcdoc=palCache[key];fr.dataset.k=key;}
  const r=c.getBoundingClientRect();pop.style.top=Math.max(8,Math.min(window.innerHeight-300,r.top-20))+"px";pop.style.left=(r.right+10)+"px";pop.classList.add("on");},260);}
function palHide(){const p=document.getElementById("palPop");if(p)p.classList.remove("on");}
