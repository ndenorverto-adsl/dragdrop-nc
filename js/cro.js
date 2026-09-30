/* ---------- PUNTUACIÓN CRO + IDEAS A/B (v4.1) ----------
   · ncCroRun(): mide la landing exportada en móvil (390×844) y escritorio (1440×900) dentro de iframes ocultos
     sin scripts, y la puntúa en 4 bloques: above the fold, datos pendientes, fricción y CTAs, confianza y técnica.
   · Panel "Ideas A/B" en los heros: 5 ángulos (beneficio, precio, urgencia, confianza, sencillez) por sector.
     Nada inventado: cifras, fechas y precios salen como {{PLACEHOLDER}}. */
const CRO_CATS=[["fold","Above the fold"],["data","Datos pendientes"],["fric","Fricción y CTAs"],["trust","Confianza y técnica"]];
const CRO_VP={m:[390,844],d:[1440,900]};
const CRO_PROOF=/^(db_reviews|dx_rating|da_trust|db_seals|dc_logos|dx_pro|dx_guarantee|dx_story)$/;

/* ---- utilidades de color ---- */
function croRGB(s){s=String(s||"");let m=s.match(/rgba?\(([^)]+)\)/);
  if(m){const p=m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);return {r:p[0],g:p[1],b:p[2],a:p[3]==null?1:p[3]};}
  m=s.match(/color\(srgb\s+([^)]+)\)/);if(m){const p=m[1].split(/[\s\/]+/).filter(Boolean).map(parseFloat);return {r:p[0]*255,g:p[1]*255,b:p[2]*255,a:p[3]==null?1:p[3]};}
  return null;}
function croLum(c){const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b);}
function croRatio(a,b){const x=croLum(a),y=croLum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
function croBg(el,win){ /* fondo efectivo; null si hay imagen/degradado (no medible) */
  for(let e=el;e&&e.nodeType===1;e=e.parentElement){const cs=win.getComputedStyle(e);
    if(cs.backgroundImage&&cs.backgroundImage!=="none"&&!/radial-gradient\([^)]*1\.?\d*px/.test(cs.backgroundImage))return null;
    const c=croRGB(cs.backgroundColor);if(c&&c.a>.9)return c;}
  return {r:255,g:255,b:255,a:1};}

/* ---- medición en un iframe oculto ---- */
function croMeasure(html,w,h){return new Promise(res=>{
  const f=document.createElement("iframe");f.setAttribute("sandbox","allow-same-origin");f.setAttribute("aria-hidden","true");f.tabIndex=-1;
  f.style.cssText=`position:fixed;left:-20000px;top:0;width:${w}px;height:${h}px;border:0;visibility:hidden`;
  let done=false;const fin=()=>{if(done)return;done=true;let r=null;try{r=croRead(f.contentDocument,f.contentWindow,h,w<700);}catch(e){r={err:String(e)};}f.remove();res(r);};
  f.onload=()=>{const d=f.contentDocument;const go=()=>setTimeout(fin,250);try{(d.fonts&&d.fonts.ready?Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve()).then(go);}catch(e){go();}};
  setTimeout(fin,6000);
  f.srcdoc=html;document.body.appendChild(f);});}
function croRead(d,win,vh,mob){
  const vis=e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return false;const cs=win.getComputedStyle(e);return cs.visibility!=="hidden"&&cs.display!=="none"&&+cs.opacity!==0;};
  const skip=e=>!!e.closest(".da-sticky,.db-sticky,.dc-sticky,#ncPop,#ncContact,#ncCookies,footer,.modal");
  const top=e=>e.getBoundingClientRect().top+win.scrollY;
  const h1=d.querySelector("h1");const h1t=h1?h1.textContent.replace(/\s+/g," ").trim():"";
  const ctaSel='form button,form [type=submit],.da-go,.db-go,.dc-go,.da-btn,.da-bigcall,.da-bigwa,.db-chan,.dc-pill,.dx-opt,.db-opt,a[href^="tel:"],a[href*="wa.me"],[data-act]';
  const ctas=[...d.querySelectorAll(ctaSel)].filter(e=>vis(e)&&!skip(e));
  const inNav=e=>!!e.closest("nav,.da-nav,.db-nav,.dc-nav,.da-top");
  const firstCta=ctas.filter(e=>!inNav(e)).map(e=>({e,t:top(e),b:top(e)+e.getBoundingClientRect().height})).sort((a,b)=>a.t-b.t)[0];
  const contactFold=[...d.querySelectorAll('input[type=tel],.db-opt,.dx-opt,a[href^="tel:"]')].filter(e=>vis(e)&&!skip(e)).some(e=>top(e)+20<vh);
  const form=[...d.querySelectorAll("form")].find(vis);
  const fields=form?[...form.querySelectorAll("input,select,textarea")].filter(e=>!/hidden|checkbox|radio|submit|button/.test(e.type||"")&&vis(e)).length:0;
  const texts=ctas.filter(e=>!inNav(e)&&/BUTTON|A/.test(e.tagName)).map(e=>e.textContent.replace(/\s+/g," ").trim()).filter(Boolean);
  const smallEl=mob?[...d.querySelectorAll("a,button,input,select,.db-opt,.dx-opt")].filter(e=>vis(e)&&!skip(e)&&!e.closest("p,label,small,.small,li,footer,.form-check,[class*='-foot']")&&e.type!=="checkbox"&&!/cookie/i.test(e.textContent+" "+e.className+" "+e.id)&&e.getBoundingClientRect().height<40):[];
  const small=smallEl.length,smallList=smallEl.slice(0,4).map(e=>"“"+((e.textContent||e.placeholder||e.getAttribute("aria-label")||e.tagName.toLowerCase()).replace(/\s+/g," ").trim().slice(0,28))+"” ("+Math.round(e.getBoundingClientRect().height)+" px)");
  const con=[];const push=(lbl,el,min)=>{if(!el||!vis(el))return;const cs=win.getComputedStyle(el),fg=croRGB(cs.color),bg=croBg(el,win);if(!fg||!bg)return;con.push({lbl,r:Math.round(croRatio(fg,bg)*10)/10,min});};
  push("Titular",h1,3);const hero=h1?h1.closest("section,header"):null;
  push("Subtítulo",hero&&hero.querySelector(".da-sub,.db-sub,.dc-sub,p"),4.5);
  if(firstCta&&firstCta.e.tagName!=="INPUT")push("Botón principal",firstCta.e,3);
  const noAlt=[...d.querySelectorAll("img")].filter(i=>!i.hasAttribute("alt")||(!i.alt.trim()&&!i.closest("[aria-hidden=true]")&&i.getAttribute("role")!=="presentation")).length;
  const docH=d.documentElement.scrollHeight;
  return {h1:!!h1,h1t,h1Fold:h1?top(h1)+h1.getBoundingClientRect().height*.5<vh:false,cta:!!firstCta,ctaFold:firstCta?firstCta.b<vh:false,ctaTop:firstCta?Math.round(firstCta.t):null,
    contactFold,fields,forms:d.querySelectorAll("form").length,ctaCount:texts.length,texts,small,smallList,con,noAlt,pages:Math.max(1,docH/vh),
    sticky:!!d.querySelector(".da-sticky,.db-sticky,.dc-sticky"),tel:!!d.querySelector('a[href^="tel:"]'),wa:!!d.querySelector('a[href*="wa.me"]')};}

/* ---- puntuación ---- */
function croFam(){const h=state.sections.find(s=>!s.hidden&&/^d[abc]_hero$/.test(s.type));if(h)return h.type.slice(0,2);const s=state.sections.find(s=>/^d[abc]_/.test(s.type));return s?s.type.slice(0,2):"da";}
function croHero(){return state.sections.find(s=>!s.hidden&&/^d[abc]_hero$/.test(s.type));}
function croChecks(m,d,html){
  const st=state.settings,aud=ncAudit(),has=fx=>aud.find(i=>i.fix===fx),out=[];const fam=croFam(),hero=croHero();
  const C=(cat,w,v,msg,det,fix)=>out.push({cat,w,v,msg,det:det||"",fix:fix||""}); /* v: 1 ok · .5 aviso · 0 falla · null n/a */
  const heroFix=hero?"sel:"+hero.id:"";
  /* ABOVE THE FOLD */
  if(!m.h1)C("fold",3,0,"No hay titular principal (H1).","Cada landing necesita un H1 claro con la propuesta de valor.",heroFix);
  else{C("fold",3,m.h1Fold&&d.h1Fold?1:m.h1Fold||d.h1Fold?.5:0,m.h1Fold?"El titular se ve sin hacer scroll en móvil.":"En móvil el titular queda por debajo del primer pantallazo.",m.h1Fold?"":"Quita la barra superior o reduce el tamaño del titular en Estilo → Móvil.",heroFix);
    const wds=m.h1t.split(" ").filter(Boolean).length;C("fold",2,wds<=12?1:wds<=18?.5:0,`El titular tiene ${wds} palabras.`,wds<=12?"Se lee de un vistazo.":"Por encima de 12 palabras cuesta leerlo en un anuncio de pago. Prueba una idea A/B más corta.","ab");}
  C("fold",3,m.ctaFold?1:0,m.ctaFold?"En móvil hay un botón de acción en el primer pantallazo.":"En móvil el primer botón queda fuera del primer pantallazo"+(m.ctaTop?` (a ${m.ctaTop} px)`:"")+".",m.ctaFold?"":"En el hero, Estilo → Móvil: pon el formulario primero u oculta la imagen.",heroFix);
  C("fold",2,d.ctaFold?1:0,d.ctaFold?"En escritorio el botón principal se ve sin scroll.":"En escritorio el botón principal queda por debajo del pantallazo.","",heroFix);
  C("fold",2,m.contactFold?1:.5,m.contactFold?"El formulario o el teléfono se ven al entrar desde el móvil.":"Al entrar desde el móvil no se ve ni el formulario ni el teléfono.","",heroFix);
  C("fold",2,m.sticky?1:.5,m.sticky?"Hay barra fija en móvil con los canales.":"No hay barra fija en móvil: el visitante pierde el CTA al hacer scroll.","",m.sticky?"":"add:"+fam+"_sticky");
  /* DATOS PENDIENTES */
  const e=has("gTel");C("data",3,e?(e.lvl==="error"?0:.5):1,e?e.m:"Teléfono configurado.","",e?"gTel":"");
  const w=has("gWa");C("data",2,w?(w.lvl==="error"?0:.5):(m.wa||d.wa?1:null),w?w.m:"WhatsApp configurado.","",w?"gWa":"");
  const ep=has("gEp");C("data",3,ep?(ep.lvl==="error"?0:.5):(m.forms?1:null),ep?ep.m:"Los formularios envían a tu endpoint.","",ep?"gEp":"");
  const phs=[...new Set((html.match(/\{\{[A-Z0-9_ÁÉÍÓÚÑ]+\}\}/g)||[]))].filter(p=>!/TELEFONO|WHATSAPP|ENDPOINT|URL_PRIVACIDAD|URL_COOKIES|TITULO_SEO|META_DESCRIPTION/.test(p));
  C("data",3,!phs.length?1:phs.length<=6?.5:0,phs.length?`${phs.length} dato(s) sin rellenar.`:"No quedan datos pendientes.",phs.slice(0,10).join(" · ")+(phs.length>10?" …":""));
  /* FRICCIÓN Y CTAs */
  C("fric",3,m.fields?(m.fields<=3?1:m.fields<=5?.5:0):null,m.fields?`El primer formulario pide ${m.fields} dato(s).`:"No hay formulario.",m.fields>3?"Para captar un callback basta con el teléfono (y como mucho nombre y código postal).":"");
  const dens=m.ctaCount/m.pages;C("fric",2,dens>=.6?1:dens>=.35?.5:0,`${m.ctaCount} botones de acción en ${Math.round(m.pages)} pantallas de móvil.`,dens<.6?"Añade un CTA intermedio (CTA final, calculadora o garantía) para que siempre haya uno a mano.":"");
  const gen=[...new Set(m.texts.filter(t=>/^(enviar|submit|click|clic aquí|pulsa aquí|más info(rmación)?|saber más|continuar|aceptar|ok)$/i.test(t)))];
  C("fric",2,gen.length?.5:1,gen.length?`Botones genéricos: ${gen.join(", ")}.`:"Los botones dicen lo que pasa al pulsarlos.",gen.length?"Cambia por el resultado: “Quiero que me llaméis”, “Ver mi precio”…":"");
  const dist=[...new Set(m.texts.map(t=>t.toLowerCase()))].filter(t=>!/^\+?\d[\d\s]{7,}$/.test(t)).length;
  C("fric",1,dist<=7?1:.5,dist<=7?"El mensaje de los botones es coherente.":`Hay ${dist} textos de botón distintos.`,dist>7?"Unifica el CTA principal en 1-2 textos para que el visitante sepa qué va a pasar.":"");
  C("fric",2,m.small<=1?1:m.small<=4?.5:0,m.small?`${m.small} elemento(s) táctiles miden menos de 40 px de alto en móvil.`:"Todos los botones son cómodos de pulsar en móvil.",m.small?m.smallList.join(" · ")+". Lo cómodo es 44-48 px.":"");
  const chans=[m.forms>0,m.tel||d.tel,m.wa||d.wa].filter(Boolean).length;
  C("fric",1,chans>=2?1:.5,chans>=2?`${chans} canales de contacto disponibles.`:"Solo hay un canal de contacto.",chans<2?"Añade la llamada o WhatsApp como plan B (Global → Contacto).":"");
  /* CONFIANZA Y TÉCNICA */
  const proof=state.sections.some(s=>!s.hidden&&CRO_PROOF.test(s.type))||!!(hero&&(hero.props.proof||hero.props.kpis||hero.props.quote));
  C("trust",3,proof?1:0,proof?"Hay prueba social o de confianza (opiniones, sellos, cifras, garantía).":"No hay prueba social ni elementos de confianza.",proof?"":"Añade opiniones reales, sellos o una garantía.",proof?"":"add:"+(fam==="da"?"dx_rating":"db_reviews"));
  const pv=has("gUrlPriv"),lo=has("gLegalOwner");C("trust",2,pv?0:lo?.5:(m.forms?1:null),pv?pv.m:lo?lo.m:"RGPD: casilla y enlace a la política de privacidad.","",pv?"gUrlPriv":lo?"gLegalOwner":"");
  const cons=[...m.con.map(x=>Object.assign({vp:"móvil"},x)),...d.con.map(x=>Object.assign({vp:"escritorio"},x))],bad=cons.filter(x=>x.r<x.min);
  C("trust",2,!cons.length?null:bad.length?0:1,!cons.length?"Contraste no medible (texto sobre foto o degradado).":bad.length?"Contraste bajo: "+[...new Set(bad.map(x=>`${x.lbl} ${x.r}:1 en ${x.vp}`))].join(" · "):"Contraste suficiente en titular, subtítulo y botón.",bad.length?"Mínimo 4,5:1 para texto y 3:1 para titulares y botones (WCAG AA).":"");
  const kb=Math.round(html.length/1024),b64=/src="data:image/.test(html);C("trust",2,kb>1500?0:(kb>500||b64)?.5:1,`El HTML pesa ${kb} KB${b64?" (con imágenes en Base64)":""}.`,kb>500||b64?"Sube las imágenes a la nube para que cargue rápido en móvil (LCP).":"");
  C("trust",1,m.noAlt?.5:1,m.noAlt?`${m.noAlt} imagen(es) sin texto alternativo.`:"Las imágenes tienen texto alternativo.","");
  const t=has("gTitle"),ds=has("gDesc");C("trust",1,t?0:ds?.5:1,t?t.m:ds?ds.m:"Título SEO y meta description completos.","",t?"gTitle":ds?"gDesc":"");
  const g=has("gGtm"),cn=has("gConsent");C("trust",2,g?(g.lvl==="error"?0:.5):cn?.5:1,g?g.m:cn?cn.m:"Medición con GTM y consentimiento.","",g?"gGtm":cn?"gConsent":"");
  return out;}
function croScore(checks){const cats={};CRO_CATS.forEach(([k])=>{const c=checks.filter(x=>x.cat===k&&x.v!=null),W=c.reduce((a,x)=>a+x.w,0);cats[k]=W?Math.round(100*c.reduce((a,x)=>a+x.w*x.v,0)/W):100;});
  const total=Math.round(CRO_CATS.reduce((a,[k])=>a+cats[k],0)/CRO_CATS.length);return {total,cats};}
let croLast=null;
async function ncCroRun(){
  const html=buildDoc(true);const clean=html.replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<noscript[\s\S]*?<\/noscript>/gi,"").replace("</head>","<style>#ncCookies{display:none!important}</style></head>");
  const [m,d]=await Promise.all([croMeasure(clean,...CRO_VP.m),croMeasure(clean,...CRO_VP.d)]);
  if(!m||!d||m.err||d.err)throw new Error((m&&m.err)||(d&&d.err)||"sin medida");
  const checks=croChecks(m,d,html);croLast={checks,score:croScore(checks),at:Date.now()};
  const b=document.getElementById("btnCro");if(b)b.innerHTML=`📈 CRO <b class="cro-pill ${croTone(croLast.score.total)}">${croLast.score.total}</b>`;
  return croLast;}
function croTone(n){return n>=80?"ok":n>=60?"mid":"bad";}
function ncOpenCro(){
  let ov=document.getElementById("croOverlay");
  if(!ov){ov=document.createElement("div");ov.id="croOverlay";ov.className="nc-ov";document.body.appendChild(ov);
    ov.addEventListener("click",e=>{const c=e.target.closest("[data-cro]"),f=e.target.closest("[data-crofix]");
      if(e.target===ov||(c&&c.dataset.cro==="close")){ov.style.display="none";return;}
      if(c&&c.dataset.cro==="again"){ncOpenCro();return;}
      if(f)croFix(f.dataset.crofix,ov);});}
  ov.innerHTML=`<div class="nc-ov-box cro-box"><div class="nc-ov-head"><b>Puntuación CRO</b><button class="btn sm ghost" data-cro="close">Cerrar</button></div><div class="empty">Midiendo la landing en móvil y escritorio…</div></div>`;
  ov.style.display="grid";
  if(!state.sections.filter(x=>!x.hidden).length){ov.querySelector(".empty").textContent="Añade secciones (o carga una plantilla) para medir la landing.";return;}
  ncCroRun().then(r=>{ov.innerHTML=croHTML(r);}).catch(err=>{ov.querySelector(".empty").textContent="No he podido medir la landing: "+err.message;});}
function croHTML(r){const {total,cats}=r.score,ic={1:"ok",.5:"warn",0:"error"};
  const lists=CRO_CATS.map(([k,l])=>{const items=r.checks.filter(x=>x.cat===k).sort((a,b)=>(a.v==null?2:a.v)-(b.v==null?2:b.v));
    return `<div class="cro-cat"><div class="cro-ch"><b>${l}</b><span class="cro-pill ${croTone(cats[k])}">${cats[k]}</span></div>
      ${items.map(x=>`<div class="ck-it ${x.v==null?"na":ic[x.v]}"><span class="ck-dot"></span><span class="ck-m">${esc(x.msg)}${x.det?`<small>${esc(x.det)}</small>`:""}</span>${x.fix&&x.v!==1?`<button class="btn sm" data-crofix="${esc(x.fix)}">${/^add:/.test(x.fix)?"Añadir":x.fix==="ab"?"Ideas A/B":"Corregir"}</button>`:""}</div>`).join("")}</div>`;}).join("");
  return `<div class="nc-ov-box cro-box"><div class="nc-ov-head"><b>Puntuación CRO</b><button class="btn sm" data-cro="again">Volver a medir</button><button class="btn sm ghost" data-cro="close">Cerrar</button></div>
    <div class="cro-top"><div class="cro-big ${croTone(total)}"><b>${total}</b><small>/100</small></div>
      <div class="cro-bars">${CRO_CATS.map(([k,l])=>`<div class="cro-bar"><span>${l}</span><i><em class="${croTone(cats[k])}" style="width:${cats[k]}%"></em></i><b>${cats[k]}</b></div>`).join("")}</div></div>
    <div class="help" style="margin:0 0 12px">Medido sobre el HTML exportado en móvil (390×844) y escritorio (1440×900). Es una guía para priorizar: la última palabra la tiene el test con tráfico real.</div>
    ${lists}</div>`;}
function croFix(fx,ov){ov.style.display="none";
  if(/^sel:/.test(fx)){select(fx.slice(4));return;}
  if(/^add:/.test(fx)){const t=fx.slice(4);if(!LIB[t])return;let i=null;
    if(!/_sticky$/.test(t)){const h=state.sections.findIndex(s=>/_hero$/.test(s.type));i=h>=0?h+1:null;}
    addSection(t,i);return;}
  if(fx==="ab"){const h=croHero();if(h){select(h.id);setTimeout(()=>{const p=document.getElementById("abPanel");if(p)p.scrollIntoView({block:"start",behavior:"smooth"});},80);}return;}
  setTab("global");const el=document.getElementById(fx);if(el){el.scrollIntoView({block:"center"});el.focus();el.classList.add("nc-flash");setTimeout(()=>el.classList.remove("nc-flash"),1600);}}

/* ---- IDEAS A/B de titular y botón ---- */
const AB_ANGLES=[["ben","Beneficio"],["pre","Precio"],["urg","Urgencia"],["con","Confianza"],["sim","Sencillez"]];
const AB_SECT={telco:"Telco",energia:"Energía",alarmas:"Alarmas",seguros:"Seguros",salud:"Salud",legal:"Legal",gen:"Genérico"};
const AB_IDEAS={ /* [titular, parte destacada, botón] */
  telco:{ben:["Internet rápido en casa","y el móvil en la misma factura","Quiero que me llaméis"],pre:["Fibra y móvil por","{{PRECIO}} €/mes","Ver mi precio final"],urg:["Instalación gratis","hasta el {{FECHA_FIN}}","Reservar mi instalación"],con:["{{CLIENTES}} hogares","ya se han cambiado","Hablar con un asesor"],sim:["Te cambiamos de compañía","sin que muevas un dedo","Llamadme y me lo explicáis"]},
  energia:{ben:["Paga la luz","sin sustos en la factura","Quiero pagar menos"],pre:["Tu luz a","{{PRECIO_KWH}} €/kWh","Calcular mi factura"],urg:["Condiciones de lanzamiento","hasta el {{FECHA_FIN}}","Aprovechar la oferta"],con:["{{CLIENTES}} hogares","ya confían en nosotros","Hablar con un asesor"],sim:["Cámbiate de luz","sin cortes ni papeleo","Me lo gestionáis vosotros"]},
  alarmas:{ben:["Tu casa protegida","también cuando no estás","Quiero mi estudio gratis"],pre:["Alarma con Central Receptora","desde {{PRECIO}} €/mes","Ver precio para mi casa"],urg:["{{PROMOCION}}","hasta el {{FECHA_FIN}}","Reservar mi estudio"],con:["{{CLIENTES}} hogares","ya están protegidos","Hablar con un experto"],sim:["Un experto estudia tu casa","y te dice qué necesitas","Que me llame un experto"]},
  seguros:{ben:["Tu seguro","revisado por un experto","Revisar mi seguro"],pre:["Seguro de {{TIPO_SEGURO}}","desde {{PRECIO}} €/mes","Ver mi precio"],urg:["¿Te vence el seguro","este mes?","Compararlo antes de que venza"],con:["{{N_OPINIONES}} clientes","nos valoran con {{VALORACION}}","Hablar con un asesor"],sim:["Comparamos tu póliza","y te llamamos con una propuesta","Quiero la comparativa"]},
  salud:{ben:["Tu seguro de salud","elegido con un experto","Quiero mi presupuesto"],pre:["Seguro de salud","desde {{PRECIO}} €/mes","Ver mi precio"],urg:["{{PROMOCION}}","si lo contratas antes del {{FECHA_FIN}}","Aprovechar la promoción"],con:["{{N_MEDICOS}} médicos","y {{N_CENTROS}} centros","Hablar con un asesor"],sim:["Te ayudamos a elegir","el seguro que encaja contigo","Que me llamen"]},
  legal:{ben:["Reclama tus gastos","con abogados especialistas","Estudiar mi caso"],pre:["Solo pagas","{{CONDICION_HONORARIOS}}","Ver cómo funciona"],urg:["Revisa tu caso","antes del {{FECHA_LIMITE}}","Revisar mi caso ahora"],con:["{{PORC_CASOS_GANADOS}} de casos","ganados","Hablar con un abogado"],sim:["Nos mandas tus papeles","y nosotros reclamamos","Empezar mi reclamación"]},
  gen:{ben:["{{BENEFICIO_PRINCIPAL}}","sin letra pequeña","Quiero que me llaméis"],pre:["{{PRODUCTO}}","desde {{PRECIO}}","Ver mi precio"],urg:["{{PROMOCION}}","hasta el {{FECHA_FIN}}","Aprovechar la oferta"],con:["{{CLIENTES}} clientes","ya confían en nosotros","Hablar con un asesor"],sim:["Te lo explicamos","en una llamada de 5 minutos","Llamadme"]}};
const AB_CANAL_BTN={call:["Llamar gratis ahora","Hablar con un asesor ya"],wa:["Escríbenos por WhatsApp","Resolver mis dudas por WhatsApp"]};
const AB_FIELDS={da_hero:["headline","highlight",["cardBtn","cta"]],db_hero:["headline","italic",["btn"]],dc_hero:["headline","gradient",["btn"]]};
function abSector(p){const il={wifi:"telco",bolt:"energia",shield:"alarmas",umbrella:"seguros",heart:"salud",scale:"legal"}[p.illus];if(p._abSec&&AB_IDEAS[p._abSec])return p._abSec;if(il)return il;
  const t=[p.eyebrow,p.kicker,p.headline,p.highlight,p.italic,p.gradient,p.sub].join(" ").toLowerCase();
  return /fibra|m[oó]vil|internet|gigas|router/.test(t)?"telco":/luz|kwh|energ|factura|solar|placas/.test(t)?"energia":/alarma|segurid|proteg/.test(t)?"alarmas":/salud|m[eé]dic|especialista/.test(t)?"salud":/abogad|banco|reclam|hipoteca/.test(t)?"legal":/seguro|p[oó]liza/.test(t)?"seguros":"gen";}
function abPanelHTML(s){const p=s.props,sec=abSector(p),F=AB_FIELDS[s.type],I=AB_IDEAS[sec],canal=p.canal||"form";
  const cur=`${esc(p[F[0]]||"")} <b>${esc(p[F[1]]||"")}</b>`;
  return `<div class="ab-panel" id="abPanel"><div class="paneltitle" style="padding:14px 0 4px">Ideas A/B de titular y botón</div>
    <div class="help" style="margin:0 0 8px">Cambia <b>una sola cosa</b> por test (titular <i>o</i> botón) para saber qué ha funcionado. Los datos van como {{PLACEHOLDER}}: rellénalos con datos reales del cliente.</div>
    <div class="fld inline"><label>Sector de las ideas</label><select id="abSec">${Object.entries(AB_SECT).map(([k,v])=>`<option value="${k}" ${k===sec?"selected":""}>${v}</option>`).join("")}</select></div>
    <div class="ab-cur"><small>Ahora (A)</small><div>${cur}</div><span class="ab-btn">${esc(p[F[2][0]]||"")}</span>${p._abOrig?`<button class="btn sm ghost" data-ab="undo">Volver al original</button>`:""}</div>
    ${AB_ANGLES.map(([k,l])=>{const x=I[k];const btn=canal!=="form"&&AB_CANAL_BTN[canal]&&(k==="sim"||k==="con")?AB_CANAL_BTN[canal][k==="sim"?0:1]:x[2];
      return `<div class="ab-card"><span class="ab-ang">${l}</span><div class="ab-h">${esc(x[0])} <b>${esc(x[1])}</b></div><span class="ab-btn">${esc(btn)}</span>
      <div class="ab-acts"><button class="btn sm" data-ab="h" data-abk="${k}">Usar titular</button><button class="btn sm" data-ab="b" data-abk="${k}" data-btn="${esc(btn)}">Usar botón</button><button class="btn sm primary" data-ab="all" data-abk="${k}" data-btn="${esc(btn)}">Usar los dos</button></div></div>`;}).join("")}</div>`;}
function abBind(cf,s){const p=s.props,F=AB_FIELDS[s.type];
  const sel=cf.querySelector("#abSec");if(sel)sel.addEventListener("change",()=>{p._abSec=sel.value;renderRight();});
  cf.querySelectorAll("[data-ab]").forEach(b=>b.addEventListener("click",()=>{const a=b.dataset.ab;commit();
    if(a==="undo"){Object.assign(p,p._abOrig);delete p._abOrig;}
    else{if(!p._abOrig){p._abOrig={};[F[0],F[1],...F[2]].forEach(f=>p._abOrig[f]=p[f]);}
      const x=AB_IDEAS[abSector(p)][b.dataset.abk];
      if(a==="h"||a==="all"){p[F[0]]=x[0];p[F[1]]=x[1];}
      if(a==="b"||a==="all")F[2].forEach(f=>{if(f==="cta"&&p.canal==="form")return;p[f]=b.dataset.btn;});}
    renderPreview();renderRight();toast(a==="undo"?"Titular y botón originales":"Variante aplicada: apunta la A antes de publicar la B");}));}
(function(){const rr=renderRight;renderRight=function(){rr.apply(this,arguments);const s=state.sections.find(x=>x.id===state.selected);
  if(!s||!AB_FIELDS[s.type])return;const cf=document.getElementById("contentFields");if(!cf||cf.querySelector("#abPanel"))return;
  cf.insertAdjacentHTML("beforeend",abPanelHTML(s));abBind(cf,s);};})();

document.getElementById("btnCro")&&document.getElementById("btnCro").addEventListener("click",ncOpenCro);
