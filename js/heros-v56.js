/* NC Landing Builder · v5.6 · Heros y bloques basados en el research de CRO (landings de referencia del sector)
   Heros
   · dx_hcallback  Callback de un campo + sellos dentro del hero (patrón Verisure / Octopus): solo el teléfono, microcopia
                   que quita miedo y la prueba de confianza junto al botón.
   · dx_hprice     Precio protagonista (patrón Lowi / Pepephone): céntimos en superíndice, condiciones del precio en una línea,
                   etiqueta de destacado y precio anterior tachado opcional (con aviso Omnibus en el panel).
   · dx_hintent    Selector de intención (patrón Holaluz / Reclamador): «¿Qué necesitas?» con 2-4 caminos, cada uno a su canal.
   · dx_hcalc      Calculadora con el resultado a la vista: lo que pagas ahora vs. el precio de la oferta, sin pedir datos antes.
   Bloques
   · dx_cmp3       Comparativa de hasta 3 tarifas con cabecera fija al hacer scroll (también en móvil, sin scroll lateral).
   · dx_objections Dudas antes de decidir: las 3-4 objeciones reales respondidas a la vista, junto al CTA.
   · dx_callhours  ¿Cuándo te llamamos?: franja preferida + teléfono, horario de atención y «Abierto ahora» (hora de Madrid).
   Ningún dato de negocio por defecto: precios, plazos, sellos, valoraciones y horarios como {{PLACEHOLDER}}. */
const NC_ICON_OK=n=>!!(typeof NC_ICONS!=="undefined"&&NC_ICONS[n]);
const h56Ico=n=>NC_ICON_OK(n)?ncIco(n):ncIconOrText(n||"check");
/* precio con céntimos en superíndice: 29,90 → 29 + ,90 · cualquier otra cosa (placeholder) tal cual */
function h56Price(v){const s=String(v||"").trim();const m=s.match(/^(\d{1,5})([.,]\d{1,2})$/);
  return m?`<span class="eu">${esc(m[1])}</span><span class="ce">${esc(m[2].replace(".",","))}</span>`:`<span class="eu">${esc(s)}</span>`;}
const h56Num=v=>{const n=parseFloat(String(v||"").replace(/\s/g,"").replace(",","."));return isNaN(n)?null:n;};
/* fila de sellos de confianza (icono|texto, una por línea) */
function h56Seals(s,cls){const L=v4L(s);if(!L.length)return "";
  return `<ul class="h56-seals ${cls||""}">${L.map(l=>{const c=v4C(l);const ic=c.length>1?c[0]:"badge-check",tx=c.length>1?c.slice(1).join(" · "):c[0];return `<li>${h56Ico(ic)}<span>${esc(tx)}</span></li>`;}).join("")}</ul>`;}
function h56Micro(s){const L=String(s||"").split("|").map(x=>x.trim()).filter(Boolean);return L.length?`<ul class="h56-micro">${L.map(x=>`<li>${ncIco("check")}<span>${esc(x)}</span></li>`).join("")}</ul>`:"";}
const H56_OLD={k:"old",l:"Precio anterior tachado (opcional) · ⚠ Debe ser el precio más bajo aplicado en los 30 días previos (Directiva Omnibus). Revísalo con legal."};

Object.assign(LIB,{
dx_hcallback:{label:"✚ Hero callback de un campo + sellos",ico:"☎✓",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"Déjanos tu teléfono",highlight:"y te llamamos gratis",sub:"Un asesor te explica las opciones y el precio final. Sin compromiso.",btn:"Llamadme gratis",
    micro:"Gratis|Sin compromiso|Te llamamos en {{TIEMPO_RESPUESTA}}",seals:"star|{{VALORACION}} en {{PLATAFORMA_OPINIONES}}\nshield-check|{{SELLO_O_CERTIFICACION}}\nusers|{{N_CLIENTES}} clientes",
    wa:"no",img:"",imgAlt:"",layout:"split"}),
  fields:hxF("eyebrow","headline","highlight","sub",{k:"btn",l:"Botón (en primera persona: «Llamadme gratis»)"},{k:"micro",l:"Microcopia bajo el campo (separada por |)"},
    {k:"seals",l:"Sellos de confianza (icono|texto, uno por línea · solo datos reales)",t:"ta"},{k:"wa",l:"Enlace a WhatsApp como alternativa",t:"select",opts:[["no","No"],["si","Sí"]]},
    {k:"layout",l:"Composición",t:"select",opts:[["split","Texto + foto (sin foto sale centrado)"],["center","Centrado"]]},"img","imgAlt"),
  render:p=>{const ctr=p.layout==="center"||!p.img;
    const form=`<div class="fm" id="form">${v4PhoneForm({btn:p.btn,btnCls:"da-go",cls:"da-inline"})}${h56Micro(p.micro)}</div>`;
    const alt=`<p class="alt">${esc(vt("orCallAt"))} ${v4Tel()}>${esc(telText())}</a>${p.wa==="si"?` · ${v4Wa()}>WhatsApp</a>`:""}</p>`;
    const txt=`${hxEye(p)}${hxH1(p)}${hxSub(p)}${form}${alt}${h56Seals(p.seals)}`;
    if(ctr)return `<header class="da da-hero hx hx-cb ctr"><div class="container"><div class="in">${txt}</div></div></header>`;
    return `<header class="da da-hero hx hx-cb"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${txt}</div>
      <div class="col-lg-6"><div class="ph">${p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||"")}" fetchpriority="high">`:`<div class="hx-mock">${ncVisual({vis:"mock",illus:"spark",headline:p.headline})}</div>`}</div></div></div></div></header>`;}},
dx_hprice:{label:"✚ Hero precio protagonista",ico:"€",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",act:"popup",eyebrow:"",headline:"Tu tarifa",highlight:"con el precio final claro",sub:"Lo que ves es lo que pagas. Te lo confirmamos antes de contratar.",checks:"",
    tag:"{{ETIQUETA_DESTACADA}}",plan:"{{NOMBRE_TARIFA}}",price:"{{PRECIO}}",unit:"€/mes",old:"",terms:"IVA incluido|{{PERMANENCIA}}|{{CONDICION_PRECIO}}",feats:"{{CARACTERISTICA_1}}\n{{CARACTERISTICA_2}}\n{{CARACTERISTICA_3}}",
    cta:"La quiero",fine:""}),
  fields:hxF("canal",{k:"act",l:"Al pulsar el botón (canal formulario)",t:"select",opts:V4_ACT},"eyebrow","headline","highlight","sub","checks",{k:"tag",l:"Etiqueta de la tarjeta (p. ej. «La más elegida» · solo si es verdad · vacío = sin)"},
    {k:"plan",l:"Nombre de la tarifa"},{k:"price",l:"Precio (29,90 → los céntimos salen pequeños)"},{k:"unit",l:"Unidad"},H56_OLD,
    {k:"terms",l:"Condiciones del precio en una línea (separadas por |) · muestra el precio final con impuestos"},{k:"feats",l:"Incluye (una por línea)",t:"ta"},{k:"cta",l:"Botón"},{k:"fine",l:"Letra pequeña (opcional)"}),
  render:p=>{const c=p.canal||"form";const T=String(p.terms||"").split("|").map(x=>x.trim()).filter(Boolean);
    const btn=c==="call"?`${v4Tel()} class="da-btn pri">${I_TEL()} ${esc(telText())}</a>`:c==="wa"?`${v4Wa()} class="da-btn pri wa">${I_WA()} ${esc(vt("waWrite"))}</a>`
      :`<a href="#form" data-cta="form"${v4ActA(p,{name:p.plan,price:p.price,unit:p.unit})} class="da-btn pri">${esc(p.cta||"La quiero")} ${I_GO()}</a>`;
    return `<header class="da da-hero hx hx-pz"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}</div>
      <div class="col-lg-6"><div class="da-card pc" id="tarifa">${p.tag?`<span class="tg">${esc(p.tag)}</span>`:""}${p.plan?`<h2>${esc(p.plan)}</h2>`:""}
        <div class="pp">${p.old?`<span class="od">Antes <s>${esc(p.old)} ${esc(p.unit||"")}</s></span>`:""}<b class="pv${String(p.price||"").trim().length>7?" lg":""}">${h56Price(p.price)}</b><span class="un">${esc(p.unit||"")}</span></div>
        ${T.length?`<p class="tm">${T.map(esc).join(" · ")}</p>`:""}${v4L(p.feats).length?v4Checks(p.feats,"da-checks"):""}
        <div class="bt">${btn}</div><p class="alt">${c==="call"?`<a href="#form" data-cta="form"${v4ActA(p,{name:p.plan,price:p.price,unit:p.unit})}>${esc(vt("orWeCall"))}</a>`:`${esc(vt("orCallAt"))} ${v4Tel()}>${esc(telText())}</a>`}</p>
        ${p.fine?`<p class="fn">${esc(p.fine)}</p>`:""}</div></div></div></div></header>`;}},
dx_hintent:{label:"✚ Hero ¿qué necesitas? (selector de intención)",ico:"⇶",cat:"Heros v5",raw:true,
  def:()=>({eyebrow:"",headline:"¿Qué necesitas?",highlight:"",sub:"Elige una opción y te llevamos directo a lo que buscas.",
    items:"sparkles|Quiero contratar|Te ayudamos a elegir y te damos el precio final.|form\nmove-horizontal|Quiero cambiarme|Te explicamos cómo hacerlo paso a paso.|form\nphone|Prefiero hablar ya|Te atendemos por teléfono.|call\nmessage-circle|Tengo una duda|Escríbenos por WhatsApp.|wa",
    act:"popup",foot:"",checks:""}),
  fields:hxF("eyebrow","headline","highlight","sub",{k:"items",l:"Opciones (icono|Título|Texto|acción: form, call, wa o una URL/#ancla · una por línea, 2-4)",t:"ta"},
    {k:"act",l:"Opciones «form»: al pulsar",t:"select",opts:[["popup","Abrir el popup (con la opción elegida)"],["scroll","Ir al formulario"]]},"checks",{k:"foot",l:"Texto bajo las opciones (opcional)"}),
  render:p=>{const L=v4L(p.items).slice(0,6);
    const card=l=>{const c=v4C(l);const ic=c[0]||"chevron-right",t=c[1]||"",d=c[2]||"",a=(c[3]||"form").trim();
      const inner=`<span class="ic">${h56Ico(ic)}</span><span class="tx"><b>${esc(t)}</b>${d?`<small>${esc(d)}</small>`:""}</span><span class="go" aria-hidden="true">${ncIco("chevron-right")}</span>`;
      if(a==="call")return `${v4Tel()} class="op" data-intent="${esc(t)}">${inner}</a>`;
      if(a==="wa")return `<a href="${esc(hxWaText(t))}" target="_blank" rel="noopener" data-cta="whatsapp" class="op" data-intent="${esc(t)}">${inner}</a>`;
      if(a!=="form")return `<a href="${esc(a)}" class="op" data-intent="${esc(t)}">${inner}</a>`;
      return `<a href="#form" data-cta="form" data-act="${p.act==="scroll"?"scroll":"popup"}" class="op" data-intent="${esc(t)}">${inner}</a>`;};
    return `<header class="da da-hero hx hx-in"><div class="container"><div class="hd">${hxEye(p)}${hxH1(p)}${hxSub(p)}</div>
      <nav class="ops n${L.length}" aria-label="${esc(p.headline||"Opciones")}">${L.map(card).join("")}</nav>${hxChecks(p)}${p.foot?`<p class="ft">${esc(p.foot)}</p>`:""}</div></header>`;}},
dx_hcalc:{label:"✚ Hero ¿cuánto ahorras? (resultado a la vista)",ico:"Σ",cat:"Heros v5",raw:true,
  def:()=>({canal:"form",act:"popup",eyebrow:"",headline:"¿Cuánto pagas ahora?",highlight:"",sub:"Mueve la barra con lo que pagas al mes y mira la diferencia. Sin dejar tus datos.",checks:"",
    label:"Lo que pagas ahora",min:"10",max:"150",val:"50",our:"{{PRECIO}}",ourLabel:"Con {{NOMBRE_TARIFA}}",unit:"€/mes",resLabel:"Te ahorrarías al año",
    neutral:"Rellena el precio de la oferta para mostrar el ahorro.",same:"Ya pagas un buen precio. Te llamamos y revisamos si te podemos mejorar algo.",
    note:"Cálculo orientativo: (lo que pagas − precio de la oferta) × 12. Te confirmamos el precio final antes de contratar.",cta:"Quiero mi precio"}),
  fields:hxF("canal",{k:"act",l:"Al pulsar el botón (canal formulario)",t:"select",opts:V4_ACT},"eyebrow","headline","highlight","sub","checks",{k:"label",l:"Texto de la barra"},{k:"min",l:"Mínimo"},{k:"max",l:"Máximo"},{k:"val",l:"Valor inicial"},
    {k:"our",l:"Precio de la oferta (número, p. ej. 29,90)"},{k:"ourLabel",l:"Texto del precio de la oferta"},{k:"unit",l:"Unidad"},{k:"resLabel",l:"Texto del ahorro"},{k:"neutral",l:"Texto si falta el precio"},{k:"same",l:"Texto si ya paga menos"},{k:"note",l:"Nota del cálculo"},{k:"cta",l:"Botón"}),
  render:p=>{const mn=parseInt(p.min,10)||0,mx=Math.max(mn+1,parseInt(p.max,10)||100),vl=Math.min(mx,Math.max(mn,parseInt(p.val,10)||mn)),our=h56Num(p.our);const ok=our!=null&&our>=0;
    const save=ok?Math.max(0,Math.round((vl-our)*12)):0;const c=p.canal||"form";const cid="cl"+Math.random().toString(36).slice(2,7);
    const btn=c==="call"?`${v4Tel()} class="da-btn pri">${I_TEL()} ${esc(telText())}</a>`:c==="wa"?`${v4Wa()} class="da-btn pri wa">${I_WA()} ${esc(vt("waWrite"))}</a>`
      :`<a href="#form" data-cta="form"${v4ActA(p,{name:p.ourLabel,price:p.our,unit:p.unit})} class="da-btn pri">${esc(p.cta)} ${I_GO()}</a>`;
    const top=Math.max(vl,our||0,1),pct=v=>Math.max(4,Math.min(100,Math.round(v/top*100)));
    return `<header class="da da-hero hx hx-cl"><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-6">${hxEye(p)}${hxH1(p)}${hxSub(p)}${hxChecks(p)}</div>
      <div class="col-lg-6"><div class="da-card cc" id="calc" data-h56calc${ok?` data-our="${our}"`:""} data-max="${mx}">
        <div class="lb"><label for="${cid}">${esc(p.label)}</label><span class="nv"><input type="number" inputmode="decimal" min="${mn}" max="${mx * 3}" step="1" value="${vl}" aria-label="${esc(p.label)} (${esc(p.unit)})" data-cl-num><small>${esc(p.unit)}</small></span></div>
        <input id="${cid}" type="range" min="${mn}" max="${mx}" step="1" value="${vl}" data-cl-rng>
        ${ok?`<div class="bars"><div class="br now"><span>Ahora</span><i style="width:${pct(vl)}%" data-cl-bnow></i><b data-cl-vnow>${vl} €</b></div><div class="br our"><span>${esc(p.ourLabel)}</span><i style="width:${pct(our)}%" data-cl-bour></i><b>${esc(String(p.our))} €</b></div></div>
        <div class="out" aria-live="polite"><small data-cl-lbl${save>0?"":" hidden"}>${esc(p.resLabel)}</small><b data-cl-out${save>0?"":" hidden"}>${save.toLocaleString("es-ES")} €</b><p data-cl-same${save>0?" hidden":""}>${esc(p.same)}</p></div>`
        :`<p class="nu">${esc(p.neutral)}</p>`}
        <div class="bt">${btn}</div>${ok&&p.note?`<p class="nt">${esc(p.note)}</p>`:""}<p class="alt">${hxAlt({canal:c==="call"?"call":"form",act:p.act})}</p></div></div></div></div></header>`;}},

/* ================= BLOQUES ================= */
dx_cmp3:{label:"✚ Comparativa de tarifas (hasta 3, cabecera fija)",ico:"▤",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"Compara y elige",sub:"Todas las tarifas con el precio final.",cols:"{{TARIFA_1}}|{{PRECIO_1}}|€/mes\n{{TARIFA_2}}|{{PRECIO_2}}|€/mes|*\n{{TARIFA_3}}|{{PRECIO_3}}|€/mes",
    tag:"{{ETIQUETA_DESTACADA}}",rows:"{{CARACTERISTICA_1}}|si|si|si\n{{CARACTERISTICA_2}}|{{DATO_1}}|{{DATO_2}}|{{DATO_3}}\n{{CARACTERISTICA_3}}|no|si|si\n{{CARACTERISTICA_4}}|no|no|si",btn:"La quiero",act:"popup",note:"{{NOTA_PRECIOS}}"}),
  fields:[...W_HEADF,{k:"cols",l:"Tarifas (Nombre|Precio|Unidad|* = destacada · máx. 3)",t:"ta"},{k:"tag",l:"Etiqueta de la destacada (vacío = sin)"},
    {k:"rows",l:"Filas (Característica|valor 1|valor 2|valor 3 · «si» = ✓, «no» = ✗, o texto)",t:"ta"},{k:"btn",l:"Botón de cada tarifa"},V4_ACTF,{k:"note",l:"Nota bajo la tabla"}],
  render:p=>{const C=v4L(p.cols).slice(0,3).map(l=>{const c=v4C(l);return {name:c[0]||"",price:c[1]||"",unit:c[2]||"",hl:(c[3]||"")==="*"};});const n=C.length||1;
    const val=v=>{const x=String(v||"").trim();return /^(si|sí|yes|✓)$/i.test(x)?`<span class="y" role="img" aria-label="Incluido">${ncIco("check")}</span>`:/^(no|✗|x|-)$/i.test(x)?`<span class="n" role="img" aria-label="No incluido">${ncIco("x")}</span>`:esc(x);};
    return `<section class="da da-sec sx sx-c3" style="--n:${n}"><div class="container">${wHead(p)}<div class="tw"><table><caption class="visually-hidden">${esc(p.title||"Comparativa de tarifas")}</caption>
      <thead><tr><td class="fn"></td>${C.map(c=>`<th scope="col" class="${c.hl?"hl":""}">${c.hl&&p.tag?`<span class="tg">${esc(p.tag)}</span>`:""}<span class="nm">${esc(c.name)}</span><span class="pr"><b>${esc(c.price)}</b><small>${esc(c.unit)}</small></span></th>`).join("")}</tr></thead>
      <tbody>${v4L(p.rows).map(l=>{const c=v4C(l);return `<tr><th scope="row" class="fn">${esc(c[0]||"")}</th>${C.map((x,i)=>`<td class="${x.hl?"hl":""}">${val(c[i+1])}</td>`).join("")}</tr>`;}).join("")}</tbody>
      ${p.btn?`<tfoot><tr><td class="fn"></td>${C.map(c=>`<td class="${c.hl?"hl":""}"><a href="#form" data-cta="form"${v4ActA(p,c)} class="da-btn ${c.hl?"pri":"sec"}">${esc(p.btn)}</a></td>`).join("")}</tr></tfoot>`:""}</table></div>
      ${p.note?`<p class="da-muted text-center small mt-3 mb-0">${esc(p.note)}</p>`:""}</div></section>`;}},
dx_objections:{label:"✚ Dudas antes de decidir (objeciones)",ico:"¿?",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"Lo que todo el mundo nos pregunta antes de decidir",sub:"",
    items:"¿Y si luego me sube el precio?|{{RESPUESTA}}\n¿Qué pasa con mi permanencia actual?|{{RESPUESTA}}\n¿Y si no me convence?|{{RESPUESTA}}\n¿La llamada me compromete a algo?|{{RESPUESTA}}",
    btn:"Llamadme y lo resolvemos",act:"global",tel:"si"}),
  fields:[...W_HEADF,{k:"items",l:"Dudas (Duda|Respuesta, una por línea · las 3-4 que más frenan la venta)",t:"ta"},{k:"btn",l:"Botón"},V4_ACTF,{k:"tel",l:"Mostrar el teléfono junto al botón",t:"select",opts:[["si","Sí"],["no","No"]]}],
  render:p=>`<section class="da da-sec sx sx-ob"><div class="container">${wHead(p)}<div class="gr">${v4L(p.items).map(l=>{const c=v4C(l);return `<div class="da-card it"><span class="q" aria-hidden="true">?</span><h3>${esc(c[0]||"")}</h3><p>${esc(c[1]||"")}</p></div>`;}).join("")}</div>
    ${p.btn?`<div class="da-btns justify-content-center mt-4"><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a>${p.tel==="no"?"":`${v4Tel()} class="da-btn sec">${I_TEL()} ${esc(telText())}</a>`}</div>`:""}</div></section>`},
dx_callhours:{label:"✚ ¿Cuándo te llamamos? (franja + horario)",ico:"🕘",cat:"Secciones v5",raw:true,
  def:()=>({kicker:"",title:"¿Cuándo prefieres que te llamemos?",sub:"Elige la franja que mejor te venga y te llamamos entonces.",slots:"Lo antes posible*|Por la mañana|Por la tarde",
    hours:"{{HORARIO_DE_ATENCION}}",sched:"",openTxt:"Estamos atendiendo ahora",closedTxt:"Ahora estamos fuera de horario: te llamamos en cuanto abramos.",btn:"Llamadme",tone:"auto"}),
  fields:[...W_HEADF,{k:"slots",l:"Franjas (separadas por | · * = marcada)"},{k:"hours",l:"Horario visible (texto)"},
    {k:"sched",l:"Horario para «Abierto ahora» (opcional · hora de Madrid · ej.: L-V 09:00-21:00; S 10:00-14:00)"},{k:"openTxt",l:"Texto si está abierto"},{k:"closedTxt",l:"Texto si está cerrado"},{k:"btn",l:"Botón"},{k:"tone",l:"Fondo",t:"select",opts:HX_TONE}],
  render:p=>{const S=String(p.slots||"").split("|").map(x=>x.trim()).filter(Boolean);const id="ch"+Math.random().toString(36).slice(2,7);
    return `<section class="da da-sec sx sx-ch tn-${p.tone||"auto"}"${p.sched?` data-sched="${esc(p.sched)}"`:""}><div class="container"><div class="row g-4 g-lg-5 align-items-center"><div class="col-lg-5">${wHead(p,false)}
      ${p.hours?`<p class="hr">${ncIco("clock")} <span>${esc(p.hours)}</span></p>`:""}${p.sched?`<p class="st" data-open="${esc(p.openTxt)}" data-closed="${esc(p.closedTxt)}" hidden><i></i><span></span></p>`:""}
      <p class="tl">${esc(vt("orCallAt"))} ${v4Tel()}>${esc(telText())}</a></p></div>
      <div class="col-lg-7"><div class="da-card" id="form"><form data-callback action="${v4Act()}" method="post"><fieldset class="sl"><legend>Franja preferida</legend><div class="ops">${S.map((s,i)=>{const on=/\*$/.test(s),v=s.replace(/\*$/,"").trim();return `<label><input type="radio" name="franja" value="${esc(v)}"${on||(!S.some(x=>/\*$/.test(x))&&!i)?" checked":""}><span>${esc(v)}</span></label>`;}).join("")}</div></fieldset>
        <label class="visually-hidden" for="${id}t">${esc(vt("phone"))}</label><input id="${id}t" required name="telefono" type="tel" class="form-control mb-2" placeholder="${esc(vt("phone"))}" autocomplete="tel"><button type="submit" class="da-go">${esc(p.btn)}</button></form></div></div></div></div></section>`;}}
});
(function(){const H=["dx_hcallback","dx_hprice","dx_hintent","dx_hcalc"],S=["dx_cmp3","dx_objections","dx_callhours"];
  let i=ORDER.indexOf("dx_hplans");i=i<0?ORDER.length:i+1;ORDER.splice(i,0,...H);let j=ORDER.indexOf("dx_phoneband");j=j<0?ORDER.length:j+1;ORDER.splice(j,0,...S);})();
const NC_H56=/^dx_(h(callback|price|intent|calc)|cmp3|objections|callhours)$/;
function ncH56CSS(){return `
/* comunes */
.h56-seals{list-style:none;padding:0;margin:22px 0 0;display:flex;flex-wrap:wrap;gap:10px 22px}.h56-seals li{display:flex;align-items:center;gap:8px;font-size:14px;font-weight:600;color:var(--bink)}.h56-seals .nci{color:var(--bpt,var(--bp));width:20px;height:20px;flex:0 0 auto}
.h56-micro{list-style:none;padding:0;margin:12px 0 0;display:flex;flex-wrap:wrap;gap:6px 16px;font-size:13.5px;color:var(--bmuted)}.h56-micro li{display:flex;align-items:center;gap:5px}.h56-micro .nci{width:15px;height:15px;color:var(--bpt,var(--bp))}
/* callback de un campo */
.hx-cb .fm{margin-top:24px;max-width:540px}.hx-cb .ph{border-radius:var(--cardr,20px);overflow:hidden;aspect-ratio:5/4;background:color-mix(in srgb,var(--bink) 5%,transparent)}.hx-cb .ph img{width:100%;height:100%;object-fit:cover;display:block}
.hx-cb.ctr .in{max-width:760px;margin:0 auto;text-align:center}.hx-cb.ctr .hx-sub{margin-left:auto;margin-right:auto}.hx-cb.ctr .fm{margin-left:auto;margin-right:auto}.hx-cb.ctr .h56-micro,.hx-cb.ctr .h56-seals{justify-content:center}.hx-cb.ctr .da-eyebrow{margin:0 auto}
.hx-cb .h56-seals{padding-top:18px;border-top:1px solid var(--dline)}
@media (max-width:991px){.hx-cb .ph{aspect-ratio:16/9}}
/* precio protagonista */
.hx-pz .pc{position:relative;padding:30px 28px;max-width:500px;margin-left:auto;border:2px solid var(--bp);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--bp) 55%,transparent)}
.hx-pz .tg{position:absolute;top:-14px;left:24px;background:var(--bp);color:var(--btntext,#fff);font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:999px}
.hx-pz .pc h2{font:700 20px/1.2 var(--fhead);color:var(--bink);margin:4px 0 8px}
.hx-pz .pp{display:flex;align-items:flex-start;gap:4px;flex-wrap:wrap;line-height:1}.hx-pz .pv{display:flex;align-items:flex-start;color:var(--bpt,var(--bp));font-family:var(--fdisp,var(--fhead));font-weight:800;letter-spacing:-.03em}
.hx-pz .pv{min-width:0;max-width:100%}.hx-pz .pv .eu{font-size:clamp(64px,8vw,104px);line-height:.9}.hx-pz .pv.lg .eu{font-size:clamp(28px,3.6vw,44px);line-height:1.05;overflow-wrap:anywhere}.hx-pz .pv .ce{font-size:clamp(26px,3vw,40px);margin-top:.18em}.hx-pz .un{align-self:flex-end;font-weight:700;color:var(--bink);margin:0 0 .5em 4px}
.hx-pz .od{flex-basis:100%;color:var(--bmuted);font-size:14px;margin-bottom:6px}.hx-pz .od s{font-weight:600}.hx-pz .tm{font-size:13.5px;font-weight:600;color:var(--bmuted);margin:10px 0 14px}
.hx-pz .da-checks{margin:0 0 18px}.hx-pz .bt .da-btn{width:100%;justify-content:center}.hx-pz .alt{text-align:center}.hx-pz .fn{font-size:12px;color:var(--bmuted);margin:12px 0 0}
@media (max-width:991px){.hx-pz .pc{margin:8px auto 0}}
/* selector de intención */
.hx-in .hd{text-align:center;max-width:760px;margin:0 auto 28px}.hx-in .hd .hx-sub{margin:0 auto}.hx-in .hd .da-eyebrow{margin:0 auto}
.hx-in .ops{display:grid;gap:12px;grid-template-columns:repeat(2,minmax(0,1fr));max-width:900px;margin:0 auto}.hx-in .ops.n3{grid-template-columns:repeat(3,minmax(0,1fr));max-width:1080px}.hx-in .ops.n2{max-width:760px}
.hx-in .op{display:flex;align-items:center;gap:14px;padding:18px 18px;border:2px solid var(--dline);border-radius:var(--cardr,16px);background:color-mix(in srgb,var(--bink) 4%,transparent);color:var(--bink);text-decoration:none;transition:border-color .15s,transform .15s,box-shadow .15s;min-height:84px}
.hx-in .op:hover,.hx-in .op:focus-visible{border-color:var(--bp);transform:translateY(-2px);box-shadow:0 16px 34px -22px color-mix(in srgb,var(--bp) 70%,transparent)}.hx-in .op:focus-visible{outline:3px solid color-mix(in srgb,var(--bp) 40%,transparent);outline-offset:2px}
.hx-in .ic{flex:0 0 46px;height:46px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--bp) 12%,transparent);color:var(--bpt,var(--bp));font-size:20px}.hx-in .ic .nci{width:22px;height:22px}
.hx-in .tx{flex:1;display:flex;flex-direction:column;gap:2px;min-width:0}.hx-in .tx b{font:700 17px/1.25 var(--fhead)}.hx-in .tx small{font-size:13.5px;color:var(--bmuted);line-height:1.35}.hx-in .go{color:var(--bmuted)}.hx-in .go .nci{width:18px;height:18px}
.hx-in .hx-checks{display:flex;flex-wrap:wrap;justify-content:center;gap:4px 22px;margin:22px auto 0}.hx-in .ft{text-align:center;font-size:13.5px;color:var(--bmuted);margin:14px 0 0}
@media (max-width:767px){.hx-in .ops,.hx-in .ops.n3{grid-template-columns:1fr}.hx-in .op{min-height:72px;padding:14px}}
/* calculadora con resultado */
.hx-cl .cc{padding:26px}.hx-cl .lb{display:flex;justify-content:space-between;align-items:center;gap:12px;font-weight:700;color:var(--bink);margin-bottom:10px}.hx-cl .lb>label{margin:0;font-weight:700}
.hx-cl .nv{display:flex;align-items:center;gap:6px}.hx-cl .nv input{width:92px;font:800 22px var(--fhead);text-align:right;border:1px solid var(--dline);border-radius:10px;padding:6px 10px;background:transparent;color:var(--bink)}.hx-cl .nv small{font-weight:600;color:var(--bmuted)}
.hx-cl input[type=range]{width:100%;accent-color:var(--bp);height:28px}
.hx-cl .bars{display:grid;gap:8px;margin:16px 0}.hx-cl .br{display:grid;grid-template-columns:minmax(0,150px) minmax(0,1fr) auto;align-items:center;gap:10px;font-size:13.5px;color:var(--bmuted)}.hx-cl .br span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hx-cl .br i{display:block;height:12px;border-radius:999px;background:color-mix(in srgb,var(--bink) 22%,transparent);transition:width .25s}.hx-cl .br.our i{background:var(--bp)}.hx-cl .br b{color:var(--bink);font-weight:700;min-width:58px;text-align:right}
.hx-cl .out{background:color-mix(in srgb,var(--bp) 9%,transparent);border-radius:14px;padding:14px 16px;margin-bottom:16px}.hx-cl .out small{display:block;color:var(--bmuted);font-weight:600}.hx-cl .out b{display:block;font:800 clamp(34px,4vw,46px)/1.05 var(--fdisp,var(--fhead));color:var(--bpt,var(--bp))}.hx-cl .out p{margin:6px 0 0;font-size:14px;color:var(--bink)}
.hx-cl .nu{color:var(--bmuted);margin:14px 0}.hx-cl .bt .da-btn{width:100%;justify-content:center}
@media (max-width:575px){.hx-cl .cc{padding:20px 18px}.hx-cl .lb{flex-wrap:wrap}.hx-cl .lb>label{flex:1 1 100%}.hx-cl .br{grid-template-columns:minmax(0,96px) minmax(0,1fr) auto}}
/* comparativa de 3 */
.sx-c3 .tw{max-width:100%}.sx-c3 table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}
.sx-c3 thead th,.sx-c3 thead td{position:sticky;top:0;z-index:2;background:var(--c3bg,#fff);padding:16px 10px 12px;border-bottom:2px solid var(--dline);vertical-align:bottom}
.sx-c3 thead th{text-align:center}.sx-c3 .nm{display:block;font:700 16px/1.2 var(--fhead);color:var(--bink)}.sx-c3 .pr{display:block;margin-top:4px}.sx-c3 .pr b{font:800 26px/1 var(--fdisp,var(--fhead));color:var(--bink)}.sx-c3 .pr small{font-size:12px;color:var(--bmuted);margin-left:3px}
.sx-c3 .tg{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:top;background:var(--bp);color:var(--btntext,#fff);font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;margin-bottom:6px}
.sx-c3 thead th.hl .pr b{color:var(--bpt,var(--bp))}.sx-c3 td.hl,.sx-c3 thead th.hl{background-image:linear-gradient(color-mix(in srgb,var(--bp) 7%,transparent),color-mix(in srgb,var(--bp) 7%,transparent))}
.sx-c3 tbody th,.sx-c3 tbody td{padding:13px 10px;border-bottom:1px solid var(--dline);font-size:15px;color:var(--bink)}.sx-c3 tbody td{text-align:center}.sx-c3 tbody th{font-weight:600;text-align:left}
.sx-c3 .y,.sx-c3 .n{display:inline-grid;place-items:center;width:26px;height:26px;border-radius:50%}.sx-c3 .y{background:color-mix(in srgb,#16a34a 15%,transparent);color:#15803d}.sx-c3 .n{background:color-mix(in srgb,var(--bink) 8%,transparent);color:var(--bmuted)}.sx-c3 .y .nci,.sx-c3 .n .nci{width:15px;height:15px}
.sx-c3 tfoot td{padding:16px 8px 4px;text-align:center}.sx-c3 tfoot .da-btn{width:100%;justify-content:center;padding-left:8px;padding-right:8px}
.sx-c3 .fn{width:34%}
@media (max-width:767px){.sx-c3 table,.sx-c3 thead,.sx-c3 tbody,.sx-c3 tfoot{display:block}.sx-c3 tr{display:grid;grid-template-columns:repeat(var(--n,3),minmax(0,1fr))}.sx-c3 thead,.sx-c3 thead tr{position:sticky;top:0;z-index:2}
 .sx-c3 thead .fn,.sx-c3 tfoot .fn{display:none}.sx-c3 tbody th.fn{grid-column:1/-1;width:auto;border-bottom:0;padding:12px 4px 0;font-size:13px;color:var(--bmuted);text-align:center}.sx-c3 tbody td{padding:6px 4px 12px}
 .sx-c3 thead th{padding:10px 4px;position:static}.sx-c3 .nm{font-size:13.5px;overflow-wrap:anywhere}.sx-c3 thead th{min-width:0}.sx-c3 .pr b{display:block;font-size:18px;overflow-wrap:anywhere}.sx-c3 .pr small{display:block;font-size:10.5px;margin:2px 0 0}.sx-c3 .tg{font-size:10px;padding:2px 7px}.sx-c3 thead{background:var(--c3bg,#fff)}.sx-c3 tfoot td{padding:12px 3px 0}.sx-c3 tfoot .da-btn{font-size:13px;padding:10px 6px;min-height:44px}}
/* objeciones */
.sx-ob .gr{display:grid;gap:14px;grid-template-columns:repeat(2,minmax(0,1fr))}.sx-ob .it{position:relative;padding:22px 22px 20px 70px}
.sx-ob .q{position:absolute;left:20px;top:20px;width:36px;height:36px;border-radius:50%;display:grid;place-items:center;background:var(--bp);color:var(--btntext,#fff);font:800 20px/1 var(--fhead)}
.sx-ob h3{font:700 18px/1.3 var(--fhead);color:var(--bink);margin:4px 0 6px}.sx-ob p{margin:0;color:var(--bmuted);font-size:15px;line-height:1.55}
@media (max-width:767px){.sx-ob .gr{grid-template-columns:1fr}.sx-ob .it{padding:18px 16px 16px 62px}.sx-ob .q{left:14px;top:16px}}
/* franja horaria */
.sx-ch .hr{display:flex;gap:8px;align-items:center;font-weight:600;color:var(--bink);margin:0 0 10px}.sx-ch .hr .nci{color:var(--bpt,var(--bp))}
.sx-ch .st{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600;padding:6px 12px;border-radius:999px;background:color-mix(in srgb,var(--bink) 6%,transparent);color:var(--bink);margin:0 0 12px}.sx-ch .st i{width:9px;height:9px;border-radius:50%;background:var(--bmuted)}.sx-ch .st.on i{background:#16a34a;box-shadow:0 0 0 4px color-mix(in srgb,#16a34a 25%,transparent)}
.sx-ch .tl{color:var(--bmuted);margin:0}.sx-ch .tl a{color:inherit;font-weight:700}
.sx-ch fieldset{border:0;margin:0 0 12px;padding:0}.sx-ch legend{font:700 15px var(--fhead);color:var(--bink);margin-bottom:8px;float:none;width:100%}
.sx-ch .ops{display:flex;flex-wrap:wrap;gap:8px}.sx-ch .ops label{cursor:pointer}.sx-ch .ops input{position:absolute;opacity:0;pointer-events:none}
.sx-ch .ops span{display:inline-flex;align-items:center;min-height:44px;padding:8px 16px;border:2px solid var(--dline);border-radius:999px;font-weight:600;font-size:14.5px;color:var(--bink)}
.sx-ch .ops input:checked+span{border-color:var(--bp);background:color-mix(in srgb,var(--bp) 12%,transparent)}.sx-ch .ops input:focus-visible+span{outline:3px solid color-mix(in srgb,var(--bp) 45%,transparent);outline-offset:2px}`;}
const NC_H56_JS=`(function(){var DL=function(o){try{(window.dataLayer=window.dataLayer||[]).push(o);}catch(e){}};
document.querySelectorAll('.hx-in .op').forEach(function(a){a.addEventListener('click',function(){var t=a.getAttribute('data-intent')||'';DL({event:'hero_intent',intencion:t});
  /* la intención viaja con el lead: campo oculto «intencion» en todos los formularios de callback (también el del popup) */
  document.querySelectorAll('form[data-callback]').forEach(function(f){var h=f.querySelector('input[name=intencion]');if(!h){h=document.createElement('input');h.type='hidden';h.name='intencion';f.appendChild(h);}h.value=t;});});});
/* cabecera fija de la comparativa: mismo fondo que la sección (los estilos pintan el fondo en distintos niveles) */
document.querySelectorAll('.sx-c3').forEach(function(s){var c='',e=s;while(e&&e.nodeType===1){var b=getComputedStyle(e).backgroundColor;if(b&&!/rgba\(0, 0, 0, 0\)|transparent/.test(b)){c=b;break;}e=e.parentElement;}if(c)s.style.setProperty('--c3bg',c);});
document.querySelectorAll('[data-h56calc]').forEach(function(c){var r=c.querySelector('[data-cl-rng]'),n=c.querySelector('[data-cl-num]'),our=parseFloat(c.getAttribute('data-our')),mx=parseFloat(c.getAttribute('data-max'))||100,used=false;
  var bn=c.querySelector('[data-cl-bnow]'),bo=c.querySelector('[data-cl-bour]'),vn=c.querySelector('[data-cl-vnow]'),out=c.querySelector('[data-cl-out]'),same=c.querySelector('[data-cl-same]'),lbl=c.querySelector('[data-cl-lbl]');
  function fmt(x){return Math.round(x).toLocaleString('es-ES')+' €';}
  function set(v,src){v=parseFloat(String(v).replace(',','.'));if(isNaN(v)||v<0)return;if(src!=='r'&&r)r.value=Math.min(v,parseFloat(r.max));if(src!=='n'&&n)n.value=Math.round(v);
    if(!isNaN(our)){var s=Math.max(0,(v-our)*12);var tp=Math.max(v,our,1);if(bn)bn.style.width=Math.max(4,v/tp*100)+'%';if(bo)bo.style.width=Math.max(4,our/tp*100)+'%';if(vn)vn.textContent=fmt(v);if(out){out.textContent=fmt(s);out.hidden=s<=0;}if(lbl)lbl.hidden=s<=0;if(same)same.hidden=s>0;}
    if(!used&&src!=='init'){used=true;DL({event:'calc_use',calculadora:'hero_ahorro'});}}
  if(r)r.addEventListener('input',function(){set(r.value,'r');});if(n)n.addEventListener('input',function(){set(n.value,'n');});
  if(r)set(r.value,'init');});
document.querySelectorAll('[data-sched]').forEach(function(s){var el=s.querySelector('.st');if(!el)return;
  var D={L:1,M:2,X:3,J:4,V:5,S:6,D:0},now,dw,mins;try{var f=new Intl.DateTimeFormat('es-ES',{timeZone:'Europe/Madrid',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()),g={};f.forEach(function(p){g[p.type]=p.value;});
    dw={lun:1,mar:2,'mié':3,mie:3,jue:4,vie:5,'sáb':6,sab:6,dom:0}[String(g.weekday).toLowerCase().replace('.','')];mins=(+g.hour%24)*60+(+g.minute);}catch(e){return;}
  if(dw==null)return;var open=false,ok=false;
  String(s.getAttribute('data-sched')).split(';').forEach(function(seg){var m=seg.trim().match(/^([LMXJVSD])(?:\\s*-\\s*([LMXJVSD]))?\\s+(\\d{1,2}):(\\d{2})\\s*-\\s*(\\d{1,2}):(\\d{2})$/i);if(!m)return;ok=true;
    var a=D[m[1].toUpperCase()],b=m[2]?D[m[2].toUpperCase()]:a,inDay;var ord=function(x){return x===0?7:x;};inDay=ord(dw)>=ord(a)&&ord(dw)<=ord(b);
    var t0=+m[3]*60+(+m[4]),t1=+m[5]*60+(+m[6]);if(inDay&&mins>=t0&&mins<t1)open=true;});
  if(!ok)return;el.hidden=false;el.classList.toggle('on',open);el.querySelector('span').textContent=el.getAttribute(open?'data-open':'data-closed');});
})();`;
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);if(!state.sections.some(s=>!(forExport&&s.hidden)&&NC_H56.test(s.type)))return h;
  return h.replace("</head>",`<style>${ncH56CSS()}</style></head>`).replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${NC_H56_JS}<\/script></body>`);};})();
