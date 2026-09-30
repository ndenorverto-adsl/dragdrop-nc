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
/* Plantillas de cliente anteriores: se sustituyen por las nuevas (sección 3) */
Object.keys(TEMPLATES).filter(n=>/^Cliente · /.test(n)).forEach(n=>{delete TEMPLATES[n];delete TEMPLATE_BRAND[n];});

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

/* 2 · SECTOR × CANAL ----------------------------------------------------
   Copy de sector real y neutro; todo dato de negocio va como {{PLACEHOLDER}}. */
const V4_CANAL_TXT={form:"Formulario",call:"Llamada",wa:"WhatsApp"};
const V4_SECTORS={
  "Telco":{dir:"A",hero:{eyebrow:"Asesores disponibles ahora",headline:"Fibra y móvil",highlight:"sin permanencia",sub:"Todo lo que usas en casa y en el móvil, en una sola factura.",priceUnit:"€/mes",priceNote:"IVA incluido · precio final",checks:"Instalación gratis\nRouter incluido\nMantienes tu número"},
    trust:"{{VALORACION}}★|en Google\n{{CLIENTES}}|clientes\n{{PLAZO}}|instalación\n0 €|permanencia",
    plans:null,benefits:"⚡|Rápido|Instalación en {{PLAZO}}.\n💶|Precio claro|Precio final con IVA.\n🤝|Sin ataduras|Sin permanencia.\n📶|Cobertura|{{COBERTURA}}.",
    faq:"¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}\n¿Puedo mantener mi número?|{{RESPUESTA}}\n¿Qué incluye el precio?|{{RESPUESTA}}"},
  "Energía":{dir:"A",hero:{eyebrow:"Cambio sin cortes de luz",headline:"Tu luz",highlight:"a un precio claro",sub:"Te decimos cuánto vas a pagar antes de cambiarte. Nos encargamos del papeleo.",price:"{{PRECIO_KWH}}",priceUnit:"€/kWh",priceNote:"{{CONDICIONES_PRECIO}}",checks:"Sin permanencia\nSin obras ni técnico\nMantienes tu contador",cardTitle:"Calcula tu ahorro",cardSub:"Déjanos tu teléfono y te comparamos con tu factura actual.",cardBtn:"Quiero calcular mi ahorro"},
    trust:"{{VALORACION}}★|valoración\n{{CLIENTES}}|hogares\n0 €|permanencia\n24/7|atención",
    plans:[{name:"Tarifa fija",price:"{{PRECIO_1}}",unit:"€/kWh",feats:"Mismo precio todo el día\nSin permanencia\n{{CONDICION}}",tag:"",cta:"La quiero"},{name:"Tarifa por horas",price:"{{PRECIO_2}}",unit:"€/kWh",feats:"Más barata en horas valle\nApp de consumo\nSin permanencia",tag:"La más elegida",cta:"La quiero"},{name:"Luz + gas",price:"{{PRECIO_3}}",unit:"€/mes",feats:"Una sola factura\n{{DESCUENTO}}\nSin permanencia",tag:"",cta:"La quiero"}],
    benefits:"🔌|Sin cortes|El cambio no interrumpe el suministro.\n📄|Sin papeleo|Nos encargamos de todo.\n📱|Control|Consulta tu consumo cuando quieras.\n💬|Atención|Personas reales para ayudarte.",
    faq:"¿Me quedaré sin luz al cambiar?|{{RESPUESTA}}\n¿Tengo que cambiar el contador?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué necesito para cambiarme?|{{RESPUESTA}}"},
  "Alarmas":{dir:"B",hero:{kicker:"Alarma para tu hogar",headline:"La tranquilidad de saber que tu casa",italic:"está protegida",sub:"Un experto estudia tu vivienda y te propone la protección que de verdad necesitas. Sin compromiso.",question:"¿Dónde necesitas la alarma?",options:"🏠 Casa|🏢 Piso|🏪 Negocio|🏡 2ª vivienda",formTitle:"Tu estudio de seguridad gratuito"},
    compare:{title:"Qué incluye",head:"Incluido|Con nosotros|Alarma sin conexión",rows:"Aviso a emergencias|✓ Sí|✗ No\nCentral Receptora 24 h|✓ Sí|✗ No\nMantenimiento|✓ Incluido|Por tu cuenta"},
    faq:"¿Tiene coste el estudio de seguridad?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué pasa si salta la alarma?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}"},
  "Seguros":{dir:"B",hero:{kicker:"Seguros",headline:"Paga menos por tu seguro",italic:"sin perder coberturas",sub:"Comparamos tu póliza actual y te llamamos con una propuesta clara. Sin compromiso.",proof:"{{VALORACION}} ★★★★★|{{N_OPINIONES}} opiniones\n{{CLIENTES}}|asegurados\n{{AÑOS}}|de experiencia",question:"¿Qué quieres asegurar?",options:"🚗 Coche|🏍️ Moto|🏠 Hogar|❤️ Vida",formTitle:"Tu comparativa gratuita",formSub:"Dinos qué quieres asegurar y te llamamos con tu precio.",btn:"Quiero mi precio"},
    compare:{title:"Tu seguro, claro",head:"Concepto|Con nosotros|Sin asesor",rows:"Comparativa de pólizas|✓ Gratis|Por tu cuenta\nGestión de siniestros|✓ Te acompañamos|Solo\nRevisión anual del precio|✓ Incluida|✗ No"},
    faq:"¿Tiene coste la comparativa?|{{RESPUESTA}}\n¿Puedo cambiar de seguro antes de que venza?|{{RESPUESTA}}\n¿Qué coberturas incluye?|{{RESPUESTA}}\n¿Cómo doy un parte?|{{RESPUESTA}}"},
  "Salud":{dir:"B",hero:{kicker:"Seguro de salud",headline:"Médicos y especialistas",italic:"cuando los necesitas",sub:"Te ayudamos a elegir el seguro de salud que encaja contigo. Te llamamos sin compromiso.",proof:"{{N_MEDICOS}}|médicos y especialistas\n{{N_CENTROS}}|centros\n{{VALORACION}} ★★★★★|{{N_OPINIONES}} opiniones",question:"¿Para quién es el seguro?",options:"🙋 Solo para mí|👫 Pareja|👨‍👩‍👧 Familia|💼 Autónomo",formTitle:"Tu presupuesto personalizado",formSub:"Responde 1 pregunta y te llamamos con tu precio.",btn:"Quiero mi presupuesto"},
    compare:{title:"Qué incluye",head:"Cobertura|Seguro {{PLAN}}|Sanidad sin seguro",rows:"Especialistas sin volante|{{RESPUESTA}}|—\nPruebas diagnósticas|{{RESPUESTA}}|—\nCopagos|{{RESPUESTA}}|—"},
    faq:"¿Hay periodos de carencia?|{{RESPUESTA}}\n¿Tiene copagos?|{{RESPUESTA}}\n¿Necesito cuestionario de salud?|{{RESPUESTA}}\n¿Desde cuándo puedo usarlo?|{{RESPUESTA}}"},
  "Legal":{dir:"B",hero:{kicker:"Reclamaciones bancarias",headline:"Recupera lo que el banco",italic:"te cobró de más",sub:"Estudiamos tu caso gratis. {{MODELO_DE_HONORARIOS}}",proof:"{{PORC_CASOS_GANADOS}}|casos ganados\n{{IMPORTE_MEDIO}}|recuperados de media\n{{VALORACION}} ★★★★★|{{N_OPINIONES}} opiniones",question:"¿Qué quieres reclamar?",options:"Gastos de hipoteca|Tarjeta revolving|Cláusula suelo|Otro",formTitle:"Estudio gratuito de tu caso",formSub:"Dinos qué quieres reclamar y un abogado te llama.",btn:"Quiero que estudien mi caso"},
    compare:{title:"Lo que pagas",head:"Concepto|Con nosotros|Abogado tradicional",rows:"Estudio del caso|{{COSTE}}|{{COSTE}}\nPago por adelantado|{{COSTE}}|{{COSTE}}\nSi no ganamos|{{CONDICION}}|{{CONDICION}}"},
    faq:"¿Cuánto cuesta?|{{RESPUESTA}}\n¿Cuánto tarda una reclamación?|{{RESPUESTA}}\n¿Qué documentación necesito?|{{RESPUESTA}}\n¿Y si pierdo?|{{RESPUESTA}}"}
};
const V4_SEC_ILLUS={"Telco":"wifi","Energía":"bolt","Alarmas":"shield","Seguros":"umbrella","Salud":"heart","Legal":"scale","Agua":"water"};
function v4SectorSections(sec,canal,over){
  const S=V4_SECTORS[sec],o=over||{};const h=Object.assign({illus:V4_SEC_ILLUS[sec]||"spark"},S.hero,{canal},o.hero||{});

  if(S.dir==="A"){
    if(canal==="call"){h.eyebrow=h.eyebrow||"Atención inmediata";h.cardSub="Un asesor te atiende ahora y te confirma el precio final.";}
    if(canal==="wa")h.cardSub="Te respondemos por WhatsApp en minutos.";
    return [{type:"da_topbar"},{type:"da_nav",props:o.nav},{type:"da_hero",props:h},{type:"da_trust",props:{items:S.trust}},
      {type:"da_plans",props:S.plans?{plans:S.plans}:{}},{type:"da_benefits",props:{items:S.benefits}},{type:"da_faq",props:{items:S.faq}},
      {type:"da_cta",props:canal==="call"?{title:"¿Prefieres que te llamemos nosotros?"}:{}},{type:"da_footer",props:o.footer},{type:"da_sticky",props:{canal}}];}
  return [{type:"db_nav",props:o.nav},{type:"db_hero",props:h},{type:"db_seals"},{type:"db_steps"},{type:"db_compare",props:S.compare},
    {type:"db_reviews"},{type:"db_faq",props:{items:S.faq}},{type:"db_cta"},{type:"db_footer",props:o.footer},{type:"db_sticky",props:{canal}}];
}
Object.keys(V4_SECTORS).forEach(sec=>["form","call","wa"].forEach(canal=>{const S=V4_SECTORS[sec];
  v4Tpl(`${sec} · ${V4_CANAL_TXT[canal]}`,{group:"Sector",sector:sec,dir:S.dir,canal,desc:`${sec}: canal principal ${V4_CANAL_TXT[canal].toLowerCase()}, con callback siempre disponible.`},v4SectorSections(sec,canal));}));
v4Tpl("Energía · Premium",{group:"Sector",sector:"Energía",dir:"C",canal:"form",desc:"Energía con estética premium: hero oscuro, buscador y ventajas en bento."},[
  {type:"dc_nav"},{type:"dc_hero",props:{chip:"Nuevo",chipText:"{{NOMBRE_TARIFA}}",headline:"Paga la luz",gradient:"a lo que cuesta de verdad",sub:"Precio claro, sin permanencia y sin cortes al cambiarte. Te decimos cuánto vas a pagar antes de dar el paso.",btn:"Calcular mi ahorro",kpis:"{{PRECIO_KWH}}|€/kWh desde\n0 €|permanencia\n24/7|atención"}},
  {type:"dc_bento",props:{title:"Una tarifa que",gradient:"se explica sola",tiles:"Precio claro, sin sorpresas|{{DESCRIPCION_PRECIO}}|dark|{{PRECIO}}|{{NOTA_PRECIO}}\nControla desde la app|Consulta tu consumo cuando quieras.||\nCambio sin cortes|Nos encargamos del papeleo.||\nAtención 24/7|Personas de verdad, cuando lo necesites.|dark|"}},
  {type:"dc_faq",props:{items:V4_SECTORS["Energía"].faq}},{type:"dc_cta"},{type:"dc_footer"},{type:"dc_sticky"}]);

/* 3 · POR CLIENTE --------------------------------------------------------
   Marca del cliente + sector. Sin ofertas, precios ni teléfonos inventados. */
[["Jazztel","c_jazztel","Telco"],["MásMóvil","c_masmovil","Telco"],["Simyo","c_simyo","Telco"],["Yoigo","c_yoigo","Telco"],["Vodafone","c_vodafone","Telco"],["Lowi","c_lowi","Telco"],["Orange","c_orange","Telco"],["Finetwork","c_finetwork","Telco"],["MásAhorro","c_masahorro","Telco"],
 ["TotalEnergies","c_totalenergies","Energía"],["Prosegur","c_prosegur","Alarmas"],["ADT","c_adt","Alarmas"],["Segurma","c_segurma","Alarmas"],["Sicor","c_sicor","Alarmas"],["AlarmaFácil","c_alarmafacil","Alarmas"]]
 .forEach(([name,brand,sec])=>{const n="Cliente · "+name;TEMPLATE_BRAND[n]=brand;
   v4Tpl(n,{group:"Cliente",client:name,sector:sec,dir:V4_SECTORS[sec].dir,canal:"form",desc:`${name} con su marca cargada. Oferta, precios y teléfono como placeholders.`},v4SectorSections(sec,"form",{nav:{logo:name},footer:{company:"{{RAZON_SOCIAL_"+name.toUpperCase().replace(/[^A-Z]/g,"")+"}}"}}));});
TEMPLATE_BRAND["Cliente · SICOR Teleasistencia"]="c_teleasistencia";
v4Tpl("Cliente · SICOR Teleasistencia",{group:"Cliente",client:"SICOR Teleasistencia",sector:"Salud",dir:"B",canal:"call",desc:"Teleasistencia: el público mayor prefiere hablar; llamada como canal principal."},[
  {type:"db_nav",props:{logo:"SICOR Teleasistencia"}},{type:"db_hero",props:{canal:"call",kicker:"Teleasistencia",headline:"Que tus mayores estén acompañados",italic:"las 24 horas",sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",proof:"24 h|atención\n{{USUARIOS}}|personas atendidas\n{{AÑOS}}|de experiencia",question:"¿Para quién es?",options:"🙋 Para mí|👵 Para un familiar",formTitle:"Te informamos sin compromiso",formSub:"Dinos para quién es y te llamamos.",btn:"Quiero información"}},
  {type:"db_steps",props:{title:"Cómo funciona",items:"Pulsa el botón|En casa o fuera, cuando lo necesites.\nTe atendemos|Un profesional habla contigo al momento.\nMovilizamos ayuda|Avisamos a familiares o a emergencias."}},
  {type:"db_reviews"},{type:"db_faq",props:{items:"¿Cómo funciona el botón?|{{RESPUESTA}}\n¿Funciona fuera de casa?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}"}},{type:"db_cta"},{type:"db_footer",props:{company:"{{RAZON_SOCIAL}}"}},{type:"db_sticky",props:{canal:"call"}}]);
TEMPLATE_BRAND["Cliente · Tuawa"]="tuawa";
v4Tpl("Cliente · Tuawa",{group:"Cliente",client:"Tuawa",sector:"Agua",dir:"C",canal:"form",desc:"Filtración de agua en casa con estética premium."},[
  {type:"dc_nav",props:{logo:"Tuawa"}},{type:"dc_hero",props:{chip:"",chipText:"Agua filtrada en casa",headline:"Agua filtrada,",gradient:"sin garrafas",sub:"Directa del grifo, sin cargar botellas. Te contamos cómo funciona sin compromiso.",btn:"Quiero información",kpis:"{{DATO_1}}|{{ETIQUETA_1}}\n{{DATO_2}}|{{ETIQUETA_2}}\n{{DATO_3}}|{{ETIQUETA_3}}"}},
  {type:"dc_bento",props:{title:"Todo lo que",gradient:"ganas en casa",tiles:"Sin garrafas|Olvídate de cargar y almacenar botellas.|dark||\nDel grifo|Agua filtrada cuando la necesitas.||\nInstalación|{{DETALLE_INSTALACION}}||\nMantenimiento|{{DETALLE_MANTENIMIENTO}}|dark|"}},
  {type:"dc_faq",props:{items:"¿Cómo se instala?|{{RESPUESTA}}\n¿Cada cuánto se cambia el filtro?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}"}},{type:"dc_cta",props:{title:"Agua filtrada",gradient:"desde hoy"}},{type:"dc_footer",props:{company:"{{RAZON_SOCIAL}}"}},{type:"dc_sticky"}]);

/* Estilos "literales" → estilos visuales sin marca */
[["apple","Estilo · Minimal producto"],["movistar","Estilo · Telco bold azul"],["verizon","Estilo · Telco bold rojo"],["tmobile","Estilo · Telco bold magenta"],["mytraffic","Estilo · SaaS gradiente oscuro"],["abtasty","Estilo · SaaS claro"]]
 .forEach(([k,n])=>{if(BRANDS[k]){BRANDS[k].name=n;BRANDS[k].note="Estilo visual (tipografía, color y forma) sin marca de terceros.";}});
(function(){const g=BRAND_GROUPS.find(x=>/Referencia externa/.test(x[0]));if(g){g[0]="Estilos visuales";g[1]=g[1].filter(k=>k!=="o2");}})();

/* ---------- GALERÍA ---------- */
const tplGal={f:"Todas",dir:"",q:"",sec:"",canal:"",look:null,fam:""};
function tplSections(name){const t=TEMPLATES[name]||[];return t.map(ty=>{const type=(typeof ty==="string")?ty:ty.type;return LIB[type]?{id:"p"+Math.random().toString(36).slice(2,7),type,props:Object.assign(LIB[type].def(),(typeof ty==="object"&&ty.props)||{}),style:(typeof ty==="object"&&ty.style)||{}}:null;}).filter(Boolean);}
function tplPreviewDoc(name){ // renderiza la plantilla sin tocar la landing abierta
  const bak={s:state.sections,sel:state.selected,b:state.settings.brand,f:state.freeMode,lk:state.settings.look};
  try{state.sections=tplSections(name);state.selected=null;state.freeMode=false;if(tplGal.look)state.settings.look=tplGal.look;const bk=TEMPLATE_BRAND[name];if(bk&&BRANDS[bk])state.settings.brand=bk;
    return buildDoc(false).replace(/<script[\s\S]*?<\/script>/g,"").replace("<head>",'<head><base target="_blank"><style>html{overflow:hidden}body{pointer-events:none}.da-sticky,.db-sticky,.dc-sticky,#ncCookies{display:none!important}</style>');}
  finally{state.sections=bak.s;state.selected=bak.sel;state.settings.brand=bak.b;state.freeMode=bak.f;state.settings.look=bak.lk;}
}
function tplTags(m){return [m.group,m.fam,m.sector,m.client,m.dir&&m.dir!=="—"?"Dirección "+m.dir:"",m.canal?({form:"Formulario",call:"Llamada",wa:"WhatsApp"}[m.canal]):""].filter(Boolean);}
function openTplGallery(){
  let ov=document.getElementById("tplOverlay");
  if(!ov){ov=document.createElement("div");ov.id="tplOverlay";ov.className="nc-ov";document.body.appendChild(ov);
    ov.innerHTML=`<div class="nc-ov-box tpl-box"><div class="nc-ov-head"><b>Plantillas</b><span class="lbl" id="tplCount" style="margin-left:10px"></span><input class="txt" id="tplQ" placeholder="Buscar…" style="max-width:220px;margin-left:auto;margin-right:8px"><button class="btn sm ghost" data-tg="close">Cerrar</button></div>
      <div class="tpl-filters" id="tplF"></div><div class="tpl-looks" id="tplL"></div><div class="tpl-grid" id="tplGrid"></div></div>`;
    ov.addEventListener("click",e=>{const b=e.target.closest("[data-tg]");if(e.target===ov||(b&&b.dataset.tg==="close")){ov.style.display="none";return;}
      if(b&&b.dataset.tg==="f"){tplGal.f=b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="d"){tplGal.dir=tplGal.dir===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="s"){tplGal.sec=tplGal.sec===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="c"){tplGal.canal=tplGal.canal===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="lk"){tplGal.look=b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="fam"){tplGal.fam=tplGal.fam===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      const u=e.target.closest("[data-use]");if(u){ov.style.display="none";const prevS=state.sections,prevL=state.settings.look;if(tplGal.look)state.settings.look=tplGal.look;loadTemplate(u.dataset.use);if(state.sections===prevS)state.settings.look=prevL;else{renderPreview();if(typeof renderGlobal==="function")renderGlobal();}}});
    ov.querySelector("#tplQ").addEventListener("input",e=>{tplGal.q=e.target.value.toLowerCase();renderTplGallery();});}
  tplGal.look=ncLook();ov.style.display="grid";renderTplGallery();
}
function renderTplGallery(){
  const groups=["Todas","Arquetipo","Casos de uso","Sector","Cliente"],dirs=["A","B","C"],fams=["Conversión rápida","Cualificación","Contenido que vende","Confianza local"];
  document.getElementById("tplF").innerHTML=groups.map(g=>`<button class="chipf ${tplGal.f===g?'on':''}" data-tg="f" data-v="${g}">${g}</button>`).join("")+((tplGal.f==="Casos de uso"||tplGal.f==="Todas")?'<span class="br"></span>'+fams.map(x=>`<button class="chipf sm ${tplGal.fam===x?'on':''}" data-tg="fam" data-v="${x}">${x}</button>`).join(""):"")+'<span class="sep"></span>'+dirs.map(d=>`<button class="chipf ${tplGal.dir===d?'on':''}" data-tg="d" data-v="${d}">${{A:"A · Oferta directa",B:"B · Confianza",C:"C · Premium"}[d]}</button>`).join("")
    +'<span class="br"></span>'+[...new Set(Object.values(TEMPLATE_META).map(m=>m.sector).filter(Boolean))].map(x=>`<button class="chipf sm ${tplGal.sec===x?'on':''}" data-tg="s" data-v="${esc(x)}">${esc(x)}</button>`).join("")
    +'<span class="sep"></span>'+Object.entries(V4_CANAL_TXT).map(([k,v])=>`<button class="chipf sm ${tplGal.canal===k?'on':''}" data-tg="c" data-v="${k}">${v4Icon[k]} ${v}</button>`).join("");
  document.getElementById("tplL").innerHTML='<span class="lbl">Ver con estilo:</span>'+LOOK_ORDER.map(k=>`<button class="chipf sm ${tplGal.look===k?'on':''}" data-tg="lk" data-v="${k}">${esc(LOOKS[k].name)}</button>`).join("");
  const names=Object.keys(TEMPLATES).filter(n=>{const m=TEMPLATE_META[n]||{};return (tplGal.f==="Todas"||m.group===tplGal.f)&&(!tplGal.fam||m.fam===tplGal.fam)&&(!tplGal.dir||m.dir===tplGal.dir)&&(!tplGal.sec||m.sector===tplGal.sec)&&(!tplGal.canal||m.canal===tplGal.canal)&&(!tplGal.q||(n+" "+(m.desc||"")+" "+tplTags(m).join(" ")).toLowerCase().includes(tplGal.q));})
    .sort((a,b)=>{const g={Arquetipo:0,"Casos de uso":1,Sector:2,Cliente:3};return (g[TEMPLATE_META[a].group]??9)-(g[TEMPLATE_META[b].group]??9);});
  const grid=document.getElementById("tplGrid");document.getElementById("tplCount").textContent=names.length+" de "+Object.keys(TEMPLATES).length;
  grid.innerHTML=names.length?names.map(n=>{const m=TEMPLATE_META[n]||{};return `<div class="tpl-card ${m.legacy?'legacy':''}"><div class="tpl-thumb" data-thumb="${esc(n)}"><div class="empty">…</div></div>
    <div class="tpl-meta"><b>${esc(n)}</b><div class="tpl-tags">${tplTags(m).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}${m.legacy?'<span class="tag">anterior</span>':''}</div><p>${esc(m.desc||"")}</p><button class="btn sm primary" data-use="${esc(n)}">Usar plantilla</button></div></div>`;}).join(""):`<div class="empty">Sin plantillas con esos filtros.</div>`;
  const io=new IntersectionObserver(ents=>ents.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const n=en.target.dataset.thumb;
    const f=document.createElement("iframe");f.setAttribute("sandbox","");f.setAttribute("loading","lazy");f.setAttribute("title","Vista previa "+n);f.srcdoc=tplPreviewDoc(n);f.style.transform="scale("+(en.target.clientWidth/1280)+")";en.target.innerHTML="";en.target.appendChild(f);}),{root:grid,rootMargin:"200px"});
  grid.querySelectorAll("[data-thumb]").forEach(t=>io.observe(t));
}
