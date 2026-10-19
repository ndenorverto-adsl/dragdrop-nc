/* ---------- DATOS DE SECTOR + GALERÍA DE PLANTILLAS ----------
   · V4_SECTORS y compañía: copy por sector (lo usan el panel de bloques y el catálogo de plantillas).
   · Galería: filtros, vista previa y "Usar plantilla". El catálogo está en templates-v5.js.
   Las plantillas no cambian la marca (salvo las de cliente). Datos de negocio: siempre {{PLACEHOLDER}}. */
const TEMPLATE_META={};
function v4Tpl(name,meta,sections){TEMPLATES[name]=sections;TEMPLATE_META[name]=meta;}

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
const UC_ILL={"Telco":"wifi","Energía":"bolt","Alarmas":"shield","Seguros":"umbrella","Salud":"heart","Legal":"scale","Agua":"water","Reformas":"spark","Coche":"umbrella","Teleasistencia":"heart","Empresas":"wifi"};
/* Sectores añadidos (copy del panel de bloques) */
Object.assign(V4_SECTORS,{
  "Agua":{dir:"A",hero:{eyebrow:"Análisis de agua gratuito",headline:"Agua de calidad",highlight:"directa del grifo",sub:"Analizamos el agua de tu casa y te proponemos el equipo que de verdad necesitas. Sin compromiso.",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"{{CONDICIONES}}",checks:"Análisis gratis en casa\nInstalación incluida\nMantenimiento {{MANTENIMIENTO}}",cardTitle:"Pide tu análisis gratuito",cardSub:"Déjanos tu teléfono y te llamamos para concertar la visita.",cardBtn:"Quiero el análisis"},
    trust:"{{VALORACION}}★|valoración\n{{CLIENTES}}|hogares\n{{PLAZO}}|instalación\n{{GARANTIA}}|garantía",
    plans:[{name:"Ósmosis inversa",price:"{{PRECIO_1}}",unit:"€/mes",feats:"Agua filtrada en la cocina\nInstalación incluida\nMantenimiento {{MANTENIMIENTO}}",tag:"",cta:"Lo quiero"},{name:"Descalcificador",price:"{{PRECIO_2}}",unit:"€/mes",feats:"Menos cal en toda la casa\nCuida tus electrodomésticos\nInstalación incluida",tag:"",cta:"Lo quiero"},{name:"Pack completo",price:"{{PRECIO_3}}",unit:"€/mes",feats:"Ósmosis + descalcificador\nMantenimiento incluido\nAnálisis anual",tag:"La más elegida",cta:"Lo quiero"}],
    benefits:"💧|Agua más rica|Sin olor ni sabor a cloro.\n🧴|Adiós a la cal|En grifos, mamparas y electrodomésticos.\n♻️|Menos plástico|Deja de comprar garrafas.\n🛠️|Mantenimiento|Nos ocupamos de filtros y revisiones.",
    faq:"¿Qué incluye el análisis del agua?|{{RESPUESTA}}\n¿Cada cuánto se cambian los filtros?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}"},
  "Reformas":{dir:"B",hero:{kicker:"Reformas con precio cerrado",headline:"Tu reforma, con presupuesto cerrado",italic:"y fecha de entrega",sub:"Visitamos tu casa, te damos un presupuesto detallado por partidas y una fecha de entrega por escrito.",question:"¿Qué quieres reformar?",options:"🛁 Baño|🍳 Cocina|🏠 Integral|🪟 Ventanas",formTitle:"Presupuesto sin compromiso"},
    compare:{title:"Qué incluye tu presupuesto",head:"Concepto|Con nosotros|Sin empresa",rows:"Presupuesto por partidas|✓ Por escrito|A veces\nFecha de entrega|✓ En contrato|✗ No\nGestión de licencias|✓ Incluida|Por tu cuenta\nGarantía de la obra|{{GARANTIA}}|{{GARANTIA_OTROS}}"},
    faq:"¿La visita tiene coste?|{{RESPUESTA}}\n¿Cuánto tarda una reforma de baño?|{{RESPUESTA}}\n¿Os encargáis de la licencia?|{{RESPUESTA}}\n¿Cómo se paga?|{{RESPUESTA}}"},
  "Coche":{dir:"A",hero:{eyebrow:"Seguro de coche",headline:"Tu seguro de coche",highlight:"pagando menos",sub:"Comparamos coberturas y precio con tu póliza actual en una sola llamada. Tú decides.",price:"{{PRECIO}}",priceUnit:"€/año",priceNote:"{{CONDICIONES}}",checks:"Asistencia en carretera\nTe llamamos en minutos\nSin papeleo",cardTitle:"Calcula tu precio",cardSub:"Déjanos tu teléfono y te llamamos con tu propuesta.",cardBtn:"Quiero mi precio"},
    trust:"{{VALORACION}}★|valoración\n{{CLIENTES}}|conductores\n{{AHORRO_MEDIO}}|ahorro medio\n24 h|asistencia",
    plans:[{name:"A terceros",price:"{{PRECIO_1}}",unit:"€/año",feats:"Responsabilidad civil\nAsistencia en carretera\nDefensa jurídica",tag:"",cta:"Lo quiero"},{name:"Terceros ampliado",price:"{{PRECIO_2}}",unit:"€/año",feats:"Todo lo de terceros\nLunas, robo e incendio\nVehículo de sustitución {{CONDICION}}",tag:"La más elegida",cta:"Lo quiero"},{name:"Todo riesgo con franquicia",price:"{{PRECIO_3}}",unit:"€/año",feats:"Daños propios\nFranquicia de {{FRANQUICIA}}\nTaller a elegir {{CONDICION}}",tag:"",cta:"Lo quiero"}],
    benefits:"🚗|Asistencia 24 h|Grúa {{CONDICIONES_GRUA}}.\n📞|Parte por teléfono|Te acompañamos en el siniestro.\n💶|Precio claro|Sin sorpresas en la renovación.\n🔧|Talleres|{{RED_TALLERES}}.",
    faq:"¿Puedo cambiar de seguro antes de que venza?|{{RESPUESTA}}\n¿Qué necesito para calcular el precio?|{{RESPUESTA}}\n¿Cómo doy un parte?|{{RESPUESTA}}\n¿Puedo fraccionar el pago?|{{RESPUESTA}}"},
  "Teleasistencia":{dir:"B",hero:{kicker:"Teleasistencia",headline:"Que tus mayores estén acompañados",italic:"las 24 horas",sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",question:"¿Para quién es?",options:"🙋 Para mí|👵 Para un familiar",formTitle:"Te llamamos y te lo explicamos"},
    compare:{title:"Qué incluye",head:"Servicio|Teleasistencia|Sin servicio",rows:"Botón de ayuda 24 h|✓ Sí|✗ No\nAviso a la familia|✓ Inmediato|✗ No\nDetector de caídas|{{CONDICION}}|✗ No\nLlamadas de seguimiento|✓ Incluidas|✗ No"},
    faq:"¿Funciona fuera de casa?|{{RESPUESTA}}\n¿Qué pasa si pulso el botón sin querer?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}"},
  "Empresas":{dir:"A",hero:{eyebrow:"Para empresas y autónomos",headline:"Fibra y telefonía",highlight:"para tu negocio",sub:"Te decimos qué necesita tu empresa y cuánto cuesta antes de firmar nada.",price:"{{PRECIO}}",priceUnit:"€/mes + IVA",priceNote:"{{CONDICIONES}}",checks:"IP fija opcional\nCentralita en la nube\nUn gestor para tu cuenta",cardTitle:"Te llama un gestor",cardSub:"Déjanos tu teléfono y te llamamos en horario de oficina.",cardBtn:"Que me llamen"},
    trust:"{{EMPRESAS}}|empresas\n{{SLA}}|disponibilidad\n{{TIEMPO_RESPUESTA}}|respuesta\n1|gestor dedicado",
    plans:null,benefits:"🏢|Gestor dedicado|Un interlocutor para todo.\n📶|Respaldo 4G/5G|Si cae la fibra, sigues conectado.\n☎️|Centralita virtual|Extensiones, colas y horarios.\n🧾|Una factura|Fibra, móviles y centralita juntos.",
    faq:"¿Hay permanencia?|{{RESPUESTA}}\n¿Puedo mantener mis números?|{{RESPUESTA}}\n¿Qué pasa si cae la fibra?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}"}
});
/* ---------- GALERÍA ---------- */
const tplGal={f:"Todas",q:"",sec:"",canal:"",look:null};
function tplSections(name){const t=TEMPLATES[name]||[];return t.map(ty=>{const type=(typeof ty==="string")?ty:ty.type;return LIB[type]?{id:"p"+Math.random().toString(36).slice(2,7),type,props:Object.assign(LIB[type].def(),(typeof ty==="object"&&ty.props)||{}),style:(typeof ty==="object"&&ty.style)||{}}:null;}).filter(Boolean);}
function tplPreviewDoc(name){ // renderiza la plantilla sin tocar la landing abierta
  const bak={s:state.sections,sel:state.selected,b:state.settings.brand,f:state.freeMode,lk:state.settings.look};
  try{state.sections=tplSections(name);state.selected=null;state.freeMode=false;const lk=tplLookFor(name);if(lk)state.settings.look=lk;const bk=TEMPLATE_BRAND[name];if(bk&&BRANDS[bk])state.settings.brand=bk;
    return buildDoc(false).replace(/<script[\s\S]*?<\/script>/g,"").replace("<head>",'<head><base target="_blank"><style>html{overflow:hidden}body{pointer-events:none}.da-sticky,.db-sticky,.dc-sticky,#ncCookies{display:none!important}</style>');}
  finally{state.sections=bak.s;state.selected=bak.sel;state.settings.brand=bak.b;state.freeMode=bak.f;state.settings.look=bak.lk;}
}
function tplLookFor(name){const g=tplGal.look;if(g==="__tpl"){const m=TEMPLATE_META[name]||{};return m.look&&LOOKS[m.look]?m.look:null;}return g||null;}
function tplTags(m){return [m.group,m.look&&LOOKS[m.look]?"Estilo "+LOOKS[m.look].name:"",m.sector,m.client,m.canal?V4_CANAL_TXT[m.canal]:""].filter(Boolean);}
function openTplGallery(){
  let ov=document.getElementById("tplOverlay");
  if(!ov){ov=document.createElement("div");ov.id="tplOverlay";ov.className="nc-ov";document.body.appendChild(ov);
    ov.innerHTML=`<div class="nc-ov-box tpl-box"><div class="nc-ov-head"><b>Plantillas</b><span class="lbl" id="tplCount" style="margin-left:10px"></span><input class="txt" id="tplQ" placeholder="Buscar…" style="max-width:220px;margin-left:auto;margin-right:8px"><button class="btn sm ghost" data-tg="close">Cerrar</button></div>
      <div class="tpl-filters" id="tplF"></div><div class="tpl-looks" id="tplL"></div><div class="tpl-grid" id="tplGrid"></div></div>`;
    ov.addEventListener("click",e=>{const b=e.target.closest("[data-tg]");if(e.target===ov||(b&&b.dataset.tg==="close")){ov.style.display="none";return;}
      if(b&&b.dataset.tg==="f"){tplGal.f=b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="s"){tplGal.sec=tplGal.sec===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="c"){tplGal.canal=tplGal.canal===b.dataset.v?"":b.dataset.v;renderTplGallery();}
      if(b&&b.dataset.tg==="lk"){tplGal.look=b.dataset.v;renderTplGallery();}
      const u=e.target.closest("[data-use]");if(u){ov.style.display="none";const prevS=state.sections,prevL=state.settings.look;const lk=tplLookFor(u.dataset.use);if(lk)state.settings.look=lk;loadTemplate(u.dataset.use);if(state.sections===prevS)state.settings.look=prevL;else{renderPreview();if(typeof renderGlobal==="function")renderGlobal();}}});
    ov.querySelector("#tplQ").addEventListener("input",e=>{tplGal.q=e.target.value.toLowerCase();renderTplGallery();});}
  tplGal.look="__tpl";ov.style.display="grid";renderTplGallery();
}
function tplGroups(){const G=["Todas"].concat(typeof V5_GROUPS!=="undefined"?V5_GROUPS:[]);Object.values(TEMPLATE_META).forEach(m=>{if(m.group&&G.indexOf(m.group)<0)G.push(m.group);});return G;}
function renderTplGallery(){
  const groups=tplGroups(),cnt=g=>g==="Todas"?Object.keys(TEMPLATES).length:Object.values(TEMPLATE_META).filter(m=>m.group===g).length;
  document.getElementById("tplF").innerHTML=groups.map(g=>`<button class="chipf ${tplGal.f===g?'on':''}" data-tg="f" data-v="${esc(g)}">${esc(g)} <small>${cnt(g)}</small></button>`).join("")
    +'<span class="br"></span>'+[...new Set(Object.values(TEMPLATE_META).map(m=>m.sector).filter(Boolean))].sort().map(x=>`<button class="chipf sm ${tplGal.sec===x?'on':''}" data-tg="s" data-v="${esc(x)}">${esc(x)}</button>`).join("")
    +'<span class="sep"></span>'+Object.entries(V4_CANAL_TXT).map(([k,v])=>`<button class="chipf sm ${tplGal.canal===k?'on':''}" data-tg="c" data-v="${k}">${v4Icon[k]} ${v}</button>`).join("");
  document.getElementById("tplL").innerHTML='<span class="lbl">Ver con estilo:</span>'+`<button class="chipf sm ${tplGal.look==="__tpl"?'on':''}" data-tg="lk" data-v="__tpl" title="Cada plantilla con su estilo sugerido (o el tuyo actual si no tiene)">Su estilo</button>`+LOOK_ORDER.map(k=>`<button class="chipf sm ${tplGal.look===k?'on':''}" data-tg="lk" data-v="${k}">${esc(LOOKS[k].name)}</button>`).join("");
  const names=Object.keys(TEMPLATES).filter(n=>{const m=TEMPLATE_META[n]||{};return (tplGal.f==="Todas"||m.group===tplGal.f)&&(!tplGal.sec||m.sector===tplGal.sec)&&(!tplGal.canal||m.canal===tplGal.canal)&&(!tplGal.q||(n+" "+(m.desc||"")+" "+tplTags(m).join(" ")).toLowerCase().includes(tplGal.q));})
    .sort((a,b)=>{const ia=groups.indexOf(TEMPLATE_META[a].group),ib=groups.indexOf(TEMPLATE_META[b].group);return (ia<0?99:ia)-(ib<0?99:ib);});
  const grid=document.getElementById("tplGrid");document.getElementById("tplCount").textContent=names.length+" de "+Object.keys(TEMPLATES).length;
  grid.innerHTML=names.length?names.map(n=>{const m=TEMPLATE_META[n]||{};return `<div class="tpl-card"><div class="tpl-thumb" data-thumb="${esc(n)}"><div class="empty">…</div></div>
    <div class="tpl-meta"><b>${esc(n)}</b><div class="tpl-tags">${tplTags(m).map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div><p>${esc(m.desc||"")}</p><button class="btn sm primary" data-use="${esc(n)}">Usar plantilla</button></div></div>`;}).join(""):`<div class="empty">Sin plantillas con esos filtros.</div>`;
  const io=new IntersectionObserver(ents=>ents.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const n=en.target.dataset.thumb;
    const f=document.createElement("iframe");f.setAttribute("sandbox","");f.setAttribute("loading","lazy");f.setAttribute("title","Vista previa "+n);f.srcdoc=tplPreviewDoc(n);f.style.transform="scale("+(en.target.clientWidth/1280)+")";en.target.innerHTML="";en.target.appendChild(f);}),{root:grid,rootMargin:"200px"});
  grid.querySelectorAll("[data-thumb]").forEach(t=>io.observe(t));
}
