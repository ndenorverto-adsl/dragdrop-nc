/* ---------- v6.0 · GENERAR DESDE BRIEF ----------
   Monta una landing completa a partir de un brief corto: sector, objetivo, enfoque de la oferta, producto, promesa,
   precio, ventajas, contacto, marca (o colores propios) y estilo.
   · La estructura sale de reglas de CRO (hero según objetivo y enfoque; prueba, ventajas, pasos, FAQ y cierre).
   · El copy parte del vertical (V5_DECK) y se sustituye por lo que escribes. Lo que no das (cifras, opiniones,
     plazos…) queda como {{PLACEHOLDER}}: nunca se inventan datos de negocio.
   · Se rellena con el mismo mecanismo que las plantillas (V5_MAP), así que cada bloque sale editable como siempre. */

const NC6_SECTORS=[["telco","Fibra y móvil"],["movil","Tarifa móvil"],["luz","Luz y gas"],["solar","Placas solares"],["alarma","Alarma para casa"],["alarmaneg","Alarma para negocio"],["hogar","Seguro de hogar"],["coche","Seguro de coche"],["salud","Seguro de salud"],["legal","Abogados"],["agua","Agua"],["reformas","Reformas"],["telea","Teleasistencia"],["empresas","Empresas (B2B)"]];
const NC6_GOALS=[["callback","Que deje su teléfono","Te llamamos: un campo y listo."],["call","Que llame ya","El teléfono manda en toda la página."],["wa","Que escriba por WhatsApp","Conversación directa."],["form","Que pida información","Formulario con más contexto."]];
const NC6_ANGLES=[["price","Precio","La oferta y su precio mandan."],["save","Ahorro","Cuánto deja de pagar."],["trust","Confianza","Seguridad, personas y garantías."],["urgency","Urgencia","Oferta con fecha límite."]];
const NC6_AUTO_LOOK={telco:"neobanco",movil:"neobanco",empresas:"neobanco",luz:"vitrina",solar:"vitrina",agua:"vitrina",reformas:"vitrina",alarma:"nocturno",alarmaneg:"nocturno",hogar:"editorial",coche:"vitrina",salud:"editorial",telea:"editorial",legal:"prensa"};

/* Hero según objetivo × enfoque */
function nc6Hero(goal,angle,D){const hasSav=!!D.sav;
  const M={callback:{price:"dx_hprice",save:hasSav?"dx_hcalc":"dx_hprice",trust:"dx_hcallback",urgency:"dx_hcoupon"},
    call:{price:"da_hero",save:hasSav?"dx_hcalc":"da_hero",trust:"dx_hfull",urgency:"dx_hcoupon"},
    wa:{price:"dx_hsplit",save:"dx_hchat",trust:"dx_hchat",urgency:"dx_hcoupon"},
    form:{price:"da_hero",save:hasSav?"dx_hsaver":"dx_hsteps",trust:"dx_hsteps",urgency:"dx_hcoupon"}};
  return (M[goal]||M.callback)[angle]||"da_hero";}
/* Secciones según objetivo, enfoque y longitud */
function nc6Recipe(b,D){const full=b.len!=="short",R=[];
  if(b.angle==="urgency")R.push("da_topbar");
  R.push("da_nav",nc6Hero(b.goal,b.angle,D),"dx_badges");
  R.push(full?"da_benefits":"dx_iconlist");
  /* tarifas solo si las das: un bloque de 3 precios vacíos no ayuda a convertir */
  if(D._plans&&D._plans.length>1)R.push("da_plans");
  if(full&&b.angle==="save"&&D.sav)R.push("dx_calc");
  R.push("dx_timeline");
  if(full&&b.angle==="trust")R.push("dx_spotlight","dx_objections");
  if(full&&b.angle!=="trust")R.push("dx_spotlight");
  R.push(full?"dx_faqsplit":"da_faq");
  R.push(b.goal==="call"?"dx_phoneband":b.goal==="wa"?"dx_ctaimg":"da_cta");
  R.push("da_footer","da_sticky");
  if(b.goal==="wa")R.push("dx_wa");
  return R.filter((t,i)=>LIB[t]&&R.indexOf(t)===i);}

function nc6BriefDeck(b){const D=JSON.parse(JSON.stringify(V5_DECK[b.v]||V5_DECK.telco));
  const L=s=>String(s||"").split("\n").map(x=>x.trim()).filter(Boolean);
  if(b.product)D.eb=b.product;
  if(b.headline){D.h=b.headline;D.hl=b.highlight||"";}
  if(b.sub)D.sub=b.sub;
  if(b.unit)D.u=b.unit;
  const ben=L(b.benefits);
  const cap=s=>{s=String(s||"").trim();return s?s.charAt(0).toUpperCase()+s.slice(1)+(/[.!?…]$/.test(s)?"":"."):"";};
  if(ben.length){const parts=ben.map(l=>{const m=l.match(/^(.+?)\s*(?:[:|—–]|\s-\s)\s*(.+)$/);return m?[m[1].trim(),cap(m[2])]:[l,""];});
    D.ck=parts.slice(0,3).map(p=>p[0]).join("\n");
    /* ventajas con explicación → bloque de ventajas (la rejilla se ajusta al número: 2, 3 o 4 columnas) */
    if(parts.some(p=>p[1])){const icons=v5Ben(D).map(c=>c[0]);D.ben=parts.slice(0,4).map((p,i)=>[icons[i]||"check",p[0],p[1]||""].join("|")).join("\n");D._benN=Math.min(4,parts.length);}}
  /* tarifas propias: «Nombre | precio | ventaja; ventaja» (una por línea, * al final = destacada) */
  D._plans=L(b.plans).map(l=>{const c=l.split("|").map(x=>x.trim());const star=/\*$/.test(c[0]);return {name:c[0].replace(/\*$/,"").trim(),price:c[1]||"",unit:b.unit||D.u||"€/mes",feats:(c[2]||"").split(";").map(x=>x.trim()).filter(Boolean).join("\n"),tag:star?"Recomendada":"",cta:"La quiero"};}).filter(p=>p.name);
  const CTA={callback:["Llamadme gratis","Quiero que me llaméis"],call:["Llamar ahora","Llamar ahora"],wa:["Escribir por WhatsApp","Escribir por WhatsApp"],form:["Quiero mi propuesta","Quiero mi propuesta"]}[b.goal];
  if(CTA){D.btn=CTA[0];D.cta=CTA[1];}
  if(b.cta){D.btn=b.cta;D.cta=b.cta;}
  return D;}

function nc6BriefBuild(b){const D=nc6BriefDeck(b);const canal=b.goal==="callback"?"form":b.goal;const M={canal,pi:0,v:b.v};
  const rep=s=>{let x=String(s);if(b.price)x=x.replace(/\{\{PRECIO\}\}/g,b.price);if(b.company)x=x.replace(/\{\{(MARCA|NOMBRE_EMPRESA)\}\}/g,b.company);if(b.endDate)x=x.replace(/\{\{FECHA_FIN(_OFERTA)?\}\}/g,b.endDate);if(b.offer)x=x.replace(/\{\{TEXTO_OFERTA\}\}/g,b.offer);return x;};
  const deep=o=>Array.isArray(o)?o.map(deep):o&&typeof o==="object"?Object.fromEntries(Object.entries(o).map(([k,v])=>[k,deep(v)])):typeof o==="string"?rep(o):o;
  return nc6Recipe(b,D).map(t=>{let base={};try{base=V5_MAP[t]?V5_MAP[t](D,M):{};}catch(e){base={};}
    const def=LIB[t].def();const props=Object.assign({},def);Object.keys(base).forEach(k=>{if(k in def)props[k]=base[k];});
    if("canal" in def)props.canal=canal;
    if(t==="dx_hcoupon"&&b.price)props.value=b.price+(b.unit?" "+b.unit:"");
    /* tarjeta de precio del hero: lo que has escrito manda sobre el relleno del sector */
    if(t==="dx_hprice"){if(String(b.benefits||"").trim())props.feats=D.ck;if(b.product)props.plan=b.product;props.tag=b.angle==="urgency"&&b.offer?b.offer:"";}
    if(t==="da_plans"&&D._plans&&D._plans.length){props.plans=D._plans;props.sub="";}
    if(b.company&&"logo" in def&&/^\{\{LOGO\}\}$/.test(props.logo||""))props.logo=b.company;
    if(b.logoImg&&"logoImg" in def)props.logoImg=b.logoImg;
    const sec={id:nid(),type:t,props:deep(props),style:{}};
    if(t==="da_benefits"&&D._benN&&D._benN<4)sec.layout={cols:String(D._benN)};
    if(t==="da_plans"&&D._plans&&D._plans.length<3)sec.layout={cols:String(D._plans.length)};
    return sec;});}

function nc6BriefOpen(){let ov=document.getElementById("nc6BriefOv");const st=state.settings;
  if(!ov){ov=document.createElement("div");ov.id="nc6BriefOv";ov.className="nc-ov nc6-ov";document.body.appendChild(ov);
    ov.addEventListener("click",e=>{if(e.target===ov||e.target.closest("[data-b6=close]")){ov.style.display="none";return;}
      const c=e.target.closest("[data-b6pick]");if(c){const g=c.closest("[data-b6grp]");g.querySelectorAll("[data-b6pick]").forEach(x=>{x.classList.toggle("on",x===c);x.setAttribute("aria-checked",x===c);});nc6BriefSync();return;}
      if(e.target.closest("[data-b6=brandurl]")&&window.ncBrandFromUrl){ncBrandFromUrl();return;}
      if(e.target.closest("[data-b6=go]"))nc6BriefGo();});
    /* marca sacada de una web → queda elegida en el brief (y su logo) */
    document.addEventListener("nc:brand",()=>{const s=document.getElementById("b6Brand");if(!s)return;s.innerHTML=brandOptions("custom");s.value="custom";const own=document.getElementById("b6Own");if(own)own.checked=false;
      const lg=document.getElementById("b6Logo");if(lg&&window.nc6BrandLogo&&/^https?:/.test(window.nc6BrandLogo)&&!lg.value)lg.value=window.nc6BrandLogo;nc6BriefSync();});
    ov.addEventListener("input",e=>{if(/^b6(Brand|Own|Plans)$/.test(e.target.id))nc6BriefSync();});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&ov.style.display==="grid")ov.style.display="none";});}
  const pick=(grp,L,cur)=>`<div class="b6-pick" data-b6grp="${grp}" role="radiogroup">${L.map(x=>`<button type="button" data-b6pick="${x[0]}" class="${x[0]===cur?"on":""}" role="radio" aria-checked="${x[0]===cur}"><b>${esc(x[1])}</b><small>${esc(x[2])}</small></button>`).join("")}</div>`;
  const looks=NC6_LOOK_PRO.filter(k=>LOOKS[k]);
  ov.innerHTML=`<div class="nc-ov-box nc6-brief" role="dialog" aria-modal="true" aria-labelledby="b6T">
    <div class="nc-ov-head"><div><b id="b6T">Generar landing desde brief</b><div class="help">Rellena lo que sepas. Lo que no pongas queda marcado como dato pendiente: nunca se inventan precios, cifras ni opiniones.</div></div><button class="btn sm ghost" data-b6="close">Cerrar</button></div>
    <div class="b6-grid">
      <section><h4>1 · Qué vendes</h4>
        <div class="row2"><div class="fld"><label for="b6V">Sector</label><select id="b6V">${NC6_SECTORS.map(s=>`<option value="${s[0]}">${esc(s[1])}</option>`).join("")}</select></div>
        <div class="fld"><label for="b6Product">Producto o servicio</label><input id="b6Product" placeholder="Fibra 1 Gb + móvil"></div></div>
        <div class="fld"><label for="b6Head">Promesa (titular)</label><input id="b6Head" placeholder="Fibra y móvil"><input id="b6Hl" class="b6-hl" placeholder="Parte destacada: en una sola factura"></div>
        <div class="fld"><label for="b6Sub">Subtítulo</label><textarea id="b6Sub" rows="2" placeholder="Una frase que explique la oferta y quite la duda principal."></textarea></div>
        <div class="row2"><div class="fld"><label for="b6Price">Precio</label><input id="b6Price" placeholder="29,90"></div><div class="fld"><label for="b6Unit">Unidad</label><input id="b6Unit" placeholder="€/mes"></div></div>
        <div class="fld"><label for="b6Ben">Ventajas (una por línea; «Título: explicación» si quieres texto)</label><textarea id="b6Ben" rows="3" placeholder="Sin permanencia: te vas cuando quieras&#10;Instalación gratis en 48 h&#10;Mantienes tu número"></textarea></div>
        <div class="fld"><label for="b6Plans">Tarifas (opcional, una por línea: Nombre | precio | ventaja; ventaja)</label><textarea id="b6Plans" rows="2" placeholder="Solo fibra | 25 | 600 Mb; Router incluido&#10;Fibra + móvil* | 29,90 | 1 Gb; 50 GB"></textarea><div class="help">Con 2 o más se añade la sección de tarifas. Un * marca la recomendada.</div></div>
      </section>
      <section><h4>2 · Qué quieres que haga</h4>
        ${pick("goal",NC6_GOALS,"callback")}
        <h4>3 · Con qué le convences</h4>
        ${pick("angle",NC6_ANGLES,"price")}
        <div class="row2 b6-urg"><div class="fld"><label for="b6Offer">Texto de la oferta</label><input id="b6Offer" placeholder="-50 % los 3 primeros meses"></div><div class="fld"><label for="b6End">Hasta</label><input id="b6End" placeholder="31 de diciembre"></div></div>
        <div class="row2"><div class="fld"><label for="b6Tel">Teléfono</label><input id="b6Tel" value="${esc(st.tel||"")}" placeholder="900 000 000" inputmode="tel"></div><div class="fld"><label for="b6Wa">WhatsApp</label><input id="b6Wa" value="${esc(st.wa||"")}" placeholder="34600000000" inputmode="tel"></div></div>
      </section>
      <section><h4>4 · Marca y diseño</h4>
        <div class="row2"><div class="fld"><label for="b6Brand">Marca</label><select id="b6Brand">${brandOptions(st.brand)}</select></div><div class="fld"><label for="b6Company">Nombre comercial</label><input id="b6Company" placeholder="Para {{MARCA}}"></div></div>
        <button type="button" class="btn sm ghost b6-bu" data-b6="brandurl">Sacar la marca de la web del cliente…</button>
        <div class="fld"><label for="b6Logo">Logo (URL de la imagen, opcional)</label><input id="b6Logo" placeholder="https://…/logo.svg" inputmode="url"></div>
        <div class="fld inline"><label for="b6Own">Usar colores propios</label><input type="checkbox" id="b6Own"></div>
        <div class="b6-own" hidden><div class="fld inline"><label>Color principal</label><input type="color" id="b6Bp" value="${esc(CUSTOM.bp)}"></div><div class="fld inline"><label>Color de acento</label><input type="color" id="b6Ba" value="${esc(CUSTOM.ba)}"></div>
          <div class="fld"><label for="b6Font">Tipografía</label><select id="b6Font">${FONTS.map(f=>`<option ${f===CUSTOM.fhead?"selected":""}>${esc(f)}</option>`).join("")}</select></div></div>
        <div class="row2"><div class="fld"><label for="b6Look">Estilo</label><select id="b6Look"><option value="">Automático según el sector</option>${looks.map(k=>`<option value="${k}">${esc(LOOKS[k].name)}</option>`).join("")}</select></div>
        <div class="fld"><label for="b6Len">Longitud</label><select id="b6Len"><option value="full">Completa (10-12 secciones)</option><option value="short">Corta (7-8 secciones)</option></select></div></div>
        <div class="b6-prev" id="b6Prev"></div>
      </section>
    </div>
    <div class="bx-go"><span class="help" id="b6Note"></span><button class="btn ghost" data-b6="close">Cancelar</button><button class="btn primary" data-b6="go">${nc6Ico("wand")}<span>Generar landing</span></button></div></div>`;
  ov.style.display="grid";["b6V","b6Len"].forEach(id=>document.getElementById(id).addEventListener("change",nc6BriefSync));
  nc6BriefSync();setTimeout(()=>{const f=document.getElementById("b6Product");if(f)f.focus();},30);}

function nc6BriefRead(){const v=id=>{const e=document.getElementById(id);return e?String(e.value||"").trim():"";};const ov=document.getElementById("nc6BriefOv");
  const pk=g=>{const b=ov.querySelector(`[data-b6grp=${g}] [data-b6pick].on`);return b?b.dataset.b6pick:"";};
  return {v:v("b6V"),product:v("b6Product"),headline:v("b6Head"),highlight:v("b6Hl"),sub:v("b6Sub"),price:v("b6Price"),unit:v("b6Unit"),benefits:(document.getElementById("b6Ben")||{}).value||"",plans:(document.getElementById("b6Plans")||{}).value||"",
    goal:pk("goal")||"callback",angle:pk("angle")||"price",offer:v("b6Offer"),endDate:v("b6End"),tel:v("b6Tel"),wa:v("b6Wa"),brand:v("b6Brand"),company:v("b6Company"),logoImg:/^(https?:\/\/\S+|data:image\/)/i.test(v("b6Logo"))?v("b6Logo"):(v("b6Brand")==="custom"&&window.nc6BrandLogo)||"",
    own:!!(document.getElementById("b6Own")||{}).checked,bp:v("b6Bp"),ba:v("b6Ba"),font:v("b6Font"),look:v("b6Look"),len:v("b6Len")||"full"};}
function nc6BriefSync(){const ov=document.getElementById("nc6BriefOv");if(!ov)return;const b=nc6BriefRead();
  ov.querySelector(".b6-own").hidden=!b.own;ov.querySelector(".b6-urg").hidden=b.angle!=="urgency";
  const D=V5_DECK[b.v]||{};const ph=(id,txt)=>{const e=document.getElementById(id);if(e)e.placeholder=txt;};
  ph("b6Product",D.eb||"");ph("b6Head",D.h||"");ph("b6Hl","Parte destacada: "+(D.hl||""));ph("b6Sub",D.sub||"");ph("b6Unit",D.u||"€/mes");
  const R=nc6Recipe(b,nc6BriefDeck(b));
  document.getElementById("b6Prev").innerHTML=`<div class="b6-ptt">Estructura (${R.length} secciones)</div><ol>${R.map(t=>`<li>${esc(palName(t))}</li>`).join("")}</ol>`;
  document.getElementById("b6Note").textContent=b.look?"":"Estilo automático: "+(LOOKS[NC6_AUTO_LOOK[b.v]]||LOOKS.base).name;}

function nc6BriefGo(){const b=nc6BriefRead();
  const busy=state.sections.some(s=>s.type!=="dx_build"&&!/(_nav|_footer|_sticky)$/.test(s.type))||state.sections.some(s=>s.type==="dx_build"&&JSON.stringify(s.props).length>400);
  if(busy&&!confirm("¿Reemplazar la landing actual por la generada?"))return;
  commit();const st=state.settings;
  if(b.own){CUSTOM.bp=b.bp||CUSTOM.bp;CUSTOM.ba=b.ba||CUSTOM.ba;if(b.font){CUSTOM.fhead=b.font;CUSTOM.fbody=b.font;}syncCustom();st.brand="custom";st.lookBrandFont=true;}
  else if(b.brand==="custom")st.lookBrandFont=true;
  else if(b.brand&&BRANDS[b.brand])st.brand=b.brand;
  const bt=document.getElementById("brandTop");if(bt)bt.value=st.brand;
  st.look=b.look||NC6_AUTO_LOOK[b.v]||"base";st.finish="limpio";
  if(b.tel)st.tel=b.tel;if(b.wa)st.wa=b.wa.replace(/[^0-9]/g,"");
  const D=nc6BriefDeck(b);st.title=[D.h,D.hl].filter(Boolean).join(" ")+(b.company?" | "+b.company:"");st.desc=D.sub||"";
  const ln=document.getElementById("landingName");if(ln&&!ln.value)ln.value=(b.company?b.company+" · ":"")+(b.product||D.eb||"Landing");
  state.sections=nc6BriefBuild(b);state.selected=state.sections[1]?state.sections[1].id:null;
  document.getElementById("nc6BriefOv").style.display="none";
  renderPalette();renderPreview();renderRight();if(typeof renderGlobal==="function")renderGlobal();
  const pend=(JSON.stringify(state.sections).match(/\{\{[A-Z0-9_ÁÉÍÓÚÑ]+\}\}/g)||[]).length;
  toast(`Landing generada · ${state.sections.length} secciones`+(pend?` · ${pend} datos pendientes`:""));}

document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("btnBrief");if(b)b.addEventListener("click",nc6BriefOpen);});
