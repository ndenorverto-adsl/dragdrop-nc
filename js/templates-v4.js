/* ---------- PLANTILLAS v4 + GALERÍA ----------
   Catálogo por Arquetipo · Sector · Cliente (entrega 1: arquetipos).
   Las plantillas NO cambian la marca: se aplican sobre la marca activa (salvo las de cliente).
*/
const TEMPLATE_META={};
function v4Tpl(name,meta,sections){TEMPLATES[name]=sections;TEMPLATE_META[name]=meta;}

/* Fuera: plantillas literales de marcas ajenas y genéricas antiguas (los bloques siguen existiendo) */
["Apple (literal)","Movistar (literal)","T-Mobile (literal)","O2 (literal)","MyTraffic (literal)","AB Tasty (literal)",
 "Landing completa","Conversión (CRO)","Confianza (seguridad)","Captación · llamada","Captación · formulario arriba","Oferta / urgencia"]
 .forEach(n=>{delete TEMPLATES[n];delete TEMPLATE_BRAND[n];});
/* Las de cliente anteriores quedan como "versión anterior" hasta la entrega 2 */
Object.keys(TEMPLATES).forEach(n=>{if(!TEMPLATE_META[n])TEMPLATE_META[n]={group:"Cliente",client:n.replace(/^Cliente · /,""),dir:"—",legacy:true,desc:"Versión anterior (se rehace en la entrega 2)."};});

/* 1 · ARQUETIPOS */
v4Tpl("Oferta con precio",{group:"Arquetipo",dir:"A",canal:"form",desc:"Precio protagonista, formulario de un campo arriba y tarifas. Para tráfico que compara precio."},[
  {type:"da_topbar"},{type:"da_nav"},{type:"da_hero"},{type:"da_trust"},{type:"da_plans"},{type:"da_benefits"},{type:"da_faq"},{type:"da_cta"},{type:"da_footer"},{type:"da_sticky"}]);
v4Tpl("Click-to-call",{group:"Arquetipo",dir:"A",canal:"call",desc:"Todo empuja a la llamada: botón grande, teléfono en cabecera y barra móvil. Callback como plan B."},[
  {type:"da_nav"},{type:"da_hero",props:{canal:"call",eyebrow:"Atención inmediata",cta:"Llamar gratis",cardSub:"Un asesor te atiende ahora y te confirma el precio final."}},{type:"da_trust"},{type:"da_benefits",props:{title:"Por qué llamarnos"}},{type:"da_cta",props:{title:"¿Prefieres que te llamemos nosotros?"}},{type:"da_footer"},{type:"da_sticky",props:{canal:"call"}}]);
v4Tpl("Tarifas y comparador",{group:"Arquetipo",dir:"A",canal:"form",desc:"Las tarifas mandan: hero corto y tabla de planes arriba. Para quien ya sabe lo que busca."},[
  {type:"da_nav"},{type:"da_hero",props:{headline:"Compara y elige",highlight:"tu tarifa",sub:"Todas nuestras tarifas con precio final. Te ayudamos a elegir sin compromiso.",price:"",checks:"Precio final con IVA\nSin permanencia\nTe asesoramos gratis"}},{type:"da_plans"},{type:"da_trust"},{type:"da_faq"},{type:"da_footer"},{type:"da_sticky"}]);
v4Tpl("Confianza + multipaso",{group:"Arquetipo",dir:"B",canal:"form",desc:"Prueba social arriba y formulario de 2 pasos que cualifica. Para decisiones con más miedo o más ticket."},[
  {type:"db_nav"},{type:"db_hero"},{type:"db_seals"},{type:"db_steps"},{type:"db_compare"},{type:"db_reviews"},{type:"db_faq"},{type:"db_cta"},{type:"db_footer"},{type:"db_sticky"}]);
v4Tpl("Autoridad y prueba social",{group:"Arquetipo",dir:"B",canal:"form",desc:"Cifras de éxito, opiniones reales y modelo de precio transparente. Pensada para legal y servicios profesionales."},[
  {type:"db_nav"},{type:"db_hero",props:{kicker:"Reclamaciones bancarias",headline:"Recupera lo que el banco",italic:"te cobró de más",sub:"Estudiamos tu caso gratis. Si no recuperamos tu dinero, no pagas.",proof:"{{PORC_CASOS_GANADOS}}|casos ganados\n{{IMPORTE_MEDIO}}|recuperados de media\n{{VALORACION}} ★★★★★|{{N_OPINIONES}} opiniones",formTitle:"Estudio gratuito de tu caso",formSub:"Dinos qué quieres reclamar y un abogado te llama.",question:"¿Qué quieres reclamar?",options:"Gastos de hipoteca|Tarjeta revolving|Cláusula suelo|Otro",btn:"Quiero que estudien mi caso"}},
  {type:"db_reviews"},{type:"db_steps",props:{title:"Cómo trabajamos",sub:"Transparencia desde el primer día.",items:"Estudio gratuito|Revisamos tu documentación sin coste.\nReclamamos por ti|Nos encargamos de todo el proceso.\nCobras|Solo pagas si ganamos: {{HONORARIOS}}."}},
  {type:"db_compare",props:{title:"Lo que pagas",head:"Concepto|Con nosotros|Abogado tradicional",rows:"Estudio del caso|Gratis|{{COSTE}}\nPago por adelantado|0 €|{{COSTE}}\nSi perdemos|No pagas|Pagas igual"}},
  {type:"db_faq"},{type:"db_cta",props:{title:"Cuéntanos tu caso, sin compromiso"}},{type:"db_footer"},{type:"db_sticky"}]);
v4Tpl("Premium producto",{group:"Arquetipo",dir:"C",canal:"form",desc:"Hero oscuro con buscador, ventajas en bento y CTA final. Para lanzamientos y marcas aspiracionales."},[
  {type:"dc_nav"},{type:"dc_hero"},{type:"dc_logos"},{type:"dc_bento"},{type:"dc_faq"},{type:"dc_cta"},{type:"dc_footer"},{type:"dc_sticky"}]);

/* Estilos "literales" → estilos visuales sin marca */
[["apple","Estilo · Minimal producto"],["movistar","Estilo · Telco bold azul"],["verizon","Estilo · Telco bold rojo"],["tmobile","Estilo · Telco bold magenta"],["mytraffic","Estilo · SaaS gradiente oscuro"],["abtasty","Estilo · SaaS claro"]]
 .forEach(([k,n])=>{if(BRANDS[k]){BRANDS[k].name=n;BRANDS[k].note="Estilo visual (tipografía, color y forma) sin marca de terceros.";}});
(function(){const g=BRAND_GROUPS.find(x=>/Referencia externa/.test(x[0]));if(g){g[0]="Estilos visuales";g[1]=g[1].filter(k=>k!=="o2");}})();

/* ---------- GALERÍA ---------- */
const tplGal={f:"Todas",dir:"",q:""};
function tplSections(name){const t=TEMPLATES[name]||[];return t.map(ty=>{const type=(typeof ty==="string")?ty:ty.type;return LIB[type]?{id:"p"+Math.random().toString(36).slice(2,7),type,props:Object.assign(LIB[type].def(),(typeof ty==="object"&&ty.props)||{}),style:(typeof ty==="object"&&ty.style)||{}}:null;}).filter(Boolean);}
function tplPreviewDoc(name){ // renderiza la plantilla sin tocar la landing abierta
  const bak={s:state.sections,sel:state.selected,b:state.settings.brand,f:state.freeMode};
  try{state.sections=tplSections(name);state.selected=null;state.freeMode=false;const bk=TEMPLATE_BRAND[name];if(bk&&BRANDS[bk])state.settings.brand=bk;
    return buildDoc(false).replace(/<script[\s\S]*?<\/script>/g,"").replace("<head>",'<head><base target="_blank"><style>html{overflow:hidden}body{pointer-events:none}.da-sticky,.db-sticky,.dc-sticky,#ncCookies{display:none!important}</style>');}
  finally{state.sections=bak.s;state.selected=bak.sel;state.settings.brand=bak.b;state.freeMode=bak.f;}
}
function tplTags(m){return [m.group,m.sector,m.client,m.dir&&m.dir!=="—"?"Dirección "+m.dir:"",m.canal?({form:"Formulario",call:"Llamada",wa:"WhatsApp"}[m.canal]):""].filter(Boolean);}
function openTplGallery(){
  let ov=document.getElementById("tplOverlay");
  if(!ov){ov=document.createElement("div");ov.id="tplOverlay";ov.className="nc-ov";document.body.appendChild(ov);
    ov.innerHTML=`<div class="nc-ov-box tpl-box"><div class="nc-ov-head"><b>Plantillas</b><input class="txt" id="tplQ" placeholder="Buscar…" style="max-width:220px;margin-left:auto;margin-right:8px"><button class="btn sm ghost" data-tg="close">Cerrar</button></div>
      <div class="tpl-filters" id="tplF"></div><div class="tpl-grid" id="tplGrid"></div></div>`;
    ov.addEventListener("click",e=>{const b=e.target.closest("[data-tg]");if(e.target===ov||(b&&b.dataset.tg==="close")){ov.style.display="none";return;}
      if(b&&b.dataset.tg==="f"){tplGal.f=b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="d"){tplGal.dir=tplGal.dir===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      const u=e.target.closest("[data-use]");if(u){ov.style.display="none";loadTemplate(u.dataset.use);}});
    ov.querySelector("#tplQ").addEventListener("input",e=>{tplGal.q=e.target.value.toLowerCase();renderTplGallery();});}
  ov.style.display="grid";renderTplGallery();
}
function renderTplGallery(){
  const groups=["Todas","Arquetipo","Sector","Cliente"],dirs=["A","B","C"];
  document.getElementById("tplF").innerHTML=groups.map(g=>`<button class="chipf ${tplGal.f===g?'on':''}" data-tg="f" data-v="${g}">${g}</button>`).join("")+'<span class="sep"></span>'+dirs.map(d=>`<button class="chipf ${tplGal.dir===d?'on':''}" data-tg="d" data-v="${d}">${{A:"A · Oferta directa",B:"B · Confianza",C:"C · Premium"}[d]}</button>`).join("");
  const names=Object.keys(TEMPLATES).filter(n=>{const m=TEMPLATE_META[n]||{};return (tplGal.f==="Todas"||m.group===tplGal.f)&&(!tplGal.dir||m.dir===tplGal.dir)&&(!tplGal.q||(n+" "+(m.desc||"")+" "+tplTags(m).join(" ")).toLowerCase().includes(tplGal.q));})
    .sort((a,b)=>(TEMPLATE_META[a].legacy?1:0)-(TEMPLATE_META[b].legacy?1:0));
  const grid=document.getElementById("tplGrid");
  grid.innerHTML=names.length?names.map(n=>{const m=TEMPLATE_META[n]||{};return `<div class="tpl-card ${m.legacy?'legacy':''}"><div class="tpl-thumb" data-thumb="${esc(n)}"><div class="empty">…</div></div>
    <div class="tpl-meta"><b>${esc(n)}</b><div class="tpl-tags">${tplTags(m).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}${m.legacy?'<span class="tag">anterior</span>':''}</div><p>${esc(m.desc||"")}</p><button class="btn sm primary" data-use="${esc(n)}">Usar plantilla</button></div></div>`;}).join(""):`<div class="empty">Sin plantillas con esos filtros.</div>`;
  const io=new IntersectionObserver(ents=>ents.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const n=en.target.dataset.thumb;
    const f=document.createElement("iframe");f.setAttribute("sandbox","");f.setAttribute("loading","lazy");f.setAttribute("title","Vista previa "+n);f.srcdoc=tplPreviewDoc(n);f.style.transform="scale("+(en.target.clientWidth/1280)+")";en.target.innerHTML="";en.target.appendChild(f);}),{root:grid,rootMargin:"200px"});
  grid.querySelectorAll("[data-thumb]").forEach(t=>io.observe(t));
}
