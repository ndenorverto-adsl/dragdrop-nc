/* ---------- v4.5 · CONVERSIÓN FIEL A BLOQUES NATIVOS ----------
   Renderiza el HTML importado en un iframe oculto (1280 px, sin scripts) y lee el DOM ya pintado:
   visibilidad real, tamaños, colores y fuentes calculadas. Con eso detecta navegación, barra superior,
   hero (titular, precio, cuenta atrás, formulario con opciones), tarifas, ventajas, bloques de imagen+texto,
   FAQ, CTA y footer, y los convierte en bloques da_/dx_ con los textos, imágenes y colores reales.
   Descarta modales, cookies, textos legales y widgets flotantes (se sustituyen por los nativos medibles).
   Nada se inventa: lo que no aparece en la página queda como {{PLACEHOLDER}}. */

/* ===== Bloques nuevos (sirven también para plantillas) ===== */
Object.assign(LIB,{
dx_media:{label:"✚ Imagen + texto (bloque promo)",ico:"◨",cat:"Extras CRO",raw:true,
  def:()=>({kicker:"",title:"{{TITULO}}",text:"{{TEXTO}}",checks:"",btn:"Me interesa",act:"popup",img:"",imgAlt:"",side:"right",frame:"round"}),
  fields:[{k:"kicker",l:"Etiqueta (opcional)"},{k:"title",l:"Título"},{k:"text",l:"Texto (un párrafo por línea)",t:"ta"},{k:"checks",l:"Ventajas (una por línea, opcional)",t:"ta"},{k:"btn",l:"Botón (vacío = sin botón)"},V4_ACTF,{k:"img",l:"Imagen",t:"photo"},{k:"imgAlt",l:"Texto alternativo"},{k:"illus",l:"Sin foto: mockup",t:"select",opts:[["","Hueco para imagen"],...NC_ILLUS.filter(o=>o[0]!=="auto")]},{k:"side",l:"Imagen a la",t:"select",opts:[["right","Derecha"],["left","Izquierda"]]},{k:"frame",l:"Marco de la imagen",t:"select",opts:[["round","Esquinas redondeadas"],["none","Sin marco"],["card","Tarjeta con sombra"]]}],
  render:p=>`<section class="da da-sec dx-media"><div class="container"><div class="row g-4 g-lg-5 align-items-center${p.side==="left"?" flex-lg-row-reverse":""}">
    <div class="col-lg-6">${p.kicker?`<span class="da-eyebrow">${esc(p.kicker)}</span>`:""}<h2 class="da-h2 mt-2">${esc(p.title)}</h2>${v4L(p.text).map(t=>`<p class="da-muted">${esc(t)}</p>`).join("")}
      ${p.checks?v4Checks(p.checks,"da-checks"):""}${p.btn?`<div class="da-btns"><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a></div>`:""}</div>
    <div class="col-lg-6">${p.img?`<img src="${p.img}" alt="${esc(p.imgAlt||"")}" class="dx-media-img fr-${p.frame||"round"}" loading="lazy">`:p.illus?`<div class="dx-media-vis">${ncVisual({vis:"mock",illus:p.illus})}</div>`:`<div class="dx-media-ph">{{IMAGEN}}</div>`}</div></div></div></section>`},
dx_text:{label:"✚ Texto (título + párrafos)",ico:"¶",cat:"Extras CRO",raw:true,
  def:()=>({kicker:"",title:"{{TITULO}}",text:"{{TEXTO}}",btn:"",act:"popup",align:"center"}),
  fields:[{k:"kicker",l:"Etiqueta (opcional)"},{k:"title",l:"Título"},{k:"text",l:"Texto (un párrafo por línea)",t:"ta"},{k:"btn",l:"Botón (vacío = sin botón)"},V4_ACTF,{k:"align",l:"Alineación",t:"select",opts:[["center","Centrado"],["left","Izquierda"]]}],
  render:p=>`<section class="da da-sec dx-text"><div class="container" style="max-width:820px">${p.align==="left"?"":`<div class="text-center">`}${p.kicker?`<span class="da-eyebrow">${esc(p.kicker)}</span>`:""}${p.title?`<h2 class="da-h2 mt-2 mb-3">${esc(p.title)}</h2>`:""}${v4L(p.text).map(t=>`<p class="da-muted">${esc(t)}</p>`).join("")}${p.btn?`<div class="da-btns${p.align==="left"?"":" justify-content-center"}"><a href="#form" data-cta="form"${v4ActA(p)} class="da-btn pri">${esc(p.btn)} ${I_GO()}</a></div>`:""}${p.align==="left"?"":`</div>`}</div></section>`}
});
(function(){const X=["dx_media","dx_text"];let i=ORDER.indexOf("dx_letter");if(i<0)i=ORDER.length;else i++;ORDER.splice(i,0,...X);})();
function ncImpCSS(){if(!state.sections.some(s=>!s.hidden&&/^dx_(media|text)$/.test(s.type)))return "";return `
.dx-media-img{display:block;width:100%;height:auto;max-height:520px;object-fit:cover}.dx-media-img.fr-round{border-radius:var(--cardr,20px)}.dx-media-img.fr-card{border-radius:var(--cardr,20px);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--ink0,#111) 55%,transparent)}.dx-media-img.fr-none{object-fit:contain}
.dx-media-vis .nc-vis{max-width:540px;margin:0 auto}.dx-media-ph{aspect-ratio:4/3;border-radius:20px;background:color-mix(in srgb,var(--bp) 10%,#fff);display:grid;place-items:center;color:var(--bmuted);font-weight:700}
.dx-media .da-btns,.dx-text .da-btns{margin-top:22px}.dx-text p{font-size:17px}`;}
(function(){const _bd=buildDoc;buildDoc=function(){let h=_bd.apply(this,arguments);const c=ncImpCSS();return c?h.replace("</head>",`<style>${c}</style></head>`):h;};})();

/* ===== Utilidades de lectura ===== */
const NC_PRICE_DEC=/(\d{1,4})\s*[,.'’´`]\s*(\d{2})\s*€/;
const NC_PRICE_INT=/(\d{1,4})\s*€/;
const NC_PRICE_PH=/(\{\{PRECIO[_A-Z0-9]*\}\})/;
function ncRgb(s){const m=String(s||"").match(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:[ ,/]+([\d.]+))?/);if(!m)return null;return {r:+m[1],g:+m[2],b:+m[3],a:m[4]===undefined?1:+m[4]};}
function ncHex(c){return "#"+[c.r,c.g,c.b].map(v=>Math.round(v).toString(16).padStart(2,"0")).join("");}
function ncHsl(c){const r=c.r/255,g=c.g/255,b=c.b/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;h*=60;}return {h,s,l};}
function ncCDist(a,b){return Math.abs(a.r-b.r)+Math.abs(a.g-b.g)+Math.abs(a.b-b.b);}
/* Fuentes: nombre CSS → Google Font disponible o equivalente libre */
const NC_FONT_EQUIV=[
  [/druk.*(wide|text)|ultra ?wide|extended|expanded/i,"Archivo Black"],[/druk|knockout|tungsten|compacta|bebas|impact|league gothic|trade gothic.*cond/i,"Anton"],
  [/sf ?pro|-apple-system|blinkmacsystemfont|helvetica|neue haas|akzidenz|graphik|s[öo]hne|suisse|aktiv|arial|segoe/i,"Inter"],
  [/gotham|proxima|brandon|metropolis|museo sans/i,"Montserrat"],[/avenir|nunito/i,"Nunito Sans"],[/futura|century gothic|twentieth/i,"Jost"],
  [/circular|gt walsheim|apercu|cera/i,"DM Sans"],[/gilroy|sofia pro|tt norms|euclid/i,"Plus Jakarta Sans"],[/aeonik|eina|larsseit|basis grotesque/i,"Manrope"],
  [/calibre|founders/i,"Inter Tight"],[/din|bahnschrift/i,"Barlow"],[/garamond|caslon|baskerville/i,"Cormorant Garamond"],[/georgia|times|tiempos|lyon|publico/i,"Newsreader"],
  [/roboto/i,"Roboto"],[/open ?sans/i,"Open Sans"],[/lato/i,"Lato"],[/montserrat/i,"Montserrat"],[/poppins/i,"Poppins"],[/raleway/i,"Raleway"]];
function ncFontResolve(ff){const fams=String(ff||"").split(",").map(x=>x.trim().replace(/^["']|["']$/g,"")).filter(Boolean);
  for(const raw of fams){if(/^(sans-serif|serif|monospace|system-ui|ui-sans-serif|inherit|initial|var\()/i.test(raw))continue;
    const n=raw.replace(/[-_]+/g," ").replace(/\s+/g," ").trim();
    const hit=FONTS.find(f=>f.toLowerCase()===n.toLowerCase());if(hit)return {src:raw,font:hit,how:"igual"};
    for(const [re,f] of NC_FONT_EQUIV)if(re.test(n))return {src:raw,font:f,how:"equivalente libre"};
    return {src:raw,font:"Inter",how:"no reconocida → Inter"};}
  return {src:fams[0]||"—",font:"Inter",how:"genérica → Inter"};}

async function ncAnalyzeHTML(html){
  const ifr=document.createElement("iframe");ifr.setAttribute("sandbox","allow-same-origin");ifr.setAttribute("aria-hidden","true");
  ifr.style.cssText="position:fixed;left:-30000px;top:0;width:1280px;height:900px;border:0;pointer-events:none";
  ifr.srcdoc=String(html).replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<noscript[\s\S]*?<\/noscript>/gi,"").replace(/\son[a-z]+="[^"]*"/gi,"");
  document.body.appendChild(ifr);
  await new Promise(r=>{ifr.onload=()=>r();setTimeout(r,9000);});
  await new Promise(r=>setTimeout(r,350));
  try{return ncAnalyzeDoc(ifr.contentDocument,ifr.contentWindow);}finally{ifr.remove();}
}

function ncAnalyzeDoc(D,W){
  const vw=W.innerWidth||1280,CS=e=>W.getComputedStyle(e),R=e=>e.getBoundingClientRect();
  const vis=e=>{if(!e||!e.getClientRects||!e.getClientRects().length)return false;const c=CS(e);return c.visibility!=="hidden"&&+c.opacity>.02;};
  const T=e=>(e&&e.textContent||"").replace(/\s+/g," ").trim();
  const rep=[];const out={secs:[],brand:{},tel:"",telText:"",wa:"",report:rep,fonts:{}};
  /* --- 1. datos de contacto reales --- */
  const telA=[...D.querySelectorAll('a[href^="tel:"]')].map(a=>a.getAttribute("href").replace(/^tel:/i,"").replace(/[^\d+]/g,"")).filter(x=>x.replace(/\D/g,"").length>=9);
  const cnt=a=>{const m={};a.forEach(x=>m[x]=(m[x]||0)+1);return Object.entries(m).sort((x,y)=>y[1]-x[1]).map(x=>x[0]);};
  const telTxt=(T(D.body).match(/(?:\+34\s?)?[6789]\d{1,2}(?:[\s.]?\d{2,3}){3}/g)||[]).map(x=>x.trim());
  if(telA.length){out.tel=cnt(telA)[0];const pretty=telTxt.find(x=>x.replace(/\D/g,"").endsWith(out.tel.replace(/\D/g,"").slice(-9)));out.telText=pretty||out.tel;}
  else if(telTxt.length){out.telText=cnt(telTxt)[0];out.tel=out.telText.replace(/[^\d+]/g,"");}
  const waA=[...D.querySelectorAll('a[href*="wa.me"],a[href*="whatsapp.com/send"],a[href*="api.whatsapp"]')].map(a=>{const h=a.getAttribute("href");const m=h.match(/wa\.me\/(\d+)/)||h.match(/phone=(\d+)/);return m?m[1]:"";}).filter(Boolean);
  if(waA.length)out.wa=cnt(waA)[0];
  /* --- 2. fuera lo que no es contenido --- */
  const hasWaWidget=/whatsapp/i.test([...D.querySelectorAll("body *")].filter(e=>{const c=CS(e);return c.position==="fixed";}).map(T).join(" "));
  D.querySelectorAll('script,style:not(head style),noscript,template,iframe,.modal,[role="dialog"],[aria-modal="true"],.modal-backdrop,[class*="cookie" i],[id*="cookie" i],[class*="consent" i],[id*="consent" i],[id*="cmp" i],[class*="gdpr" i]').forEach(e=>{if(e!==D.body&&e!==D.documentElement)e.remove();});
  D.querySelectorAll(".offcanvas").forEach(e=>{if(!e.closest("header,nav,.navbar"))e.remove();});
  /* --- 3. navegación --- */
  let nav=null;[...D.querySelectorAll("header,nav,[class*=navbar],[class*=header]")].filter(vis).forEach(e=>{if(nav)return;const r=R(e);if(r.top<140&&r.height<220&&r.width>vw*.6)nav=e;});
  if(nav){let p=nav;while(p.parentElement&&p.parentElement!==D.body&&R(p.parentElement).height<240&&!/^(MAIN)$/.test(p.parentElement.tagName))p=p.parentElement;nav=p;}
  /* --- 4. candidatos a sección --- */
  const SKIP=/^(SCRIPT|STYLE|LINK|META|NOSCRIPT|TEMPLATE|BR|HR|svg)$/i,SEM=/^(SECTION|FOOTER|ARTICLE|ASIDE|FORM)$/;
  const wide=e=>{const r=R(e);return r.width>=vw*.8&&r.height>=20;};
  const ownText=e=>[...e.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim());
  const cands=[],widgets=[];
  (function walk(el){for(const c of [...el.children]){if(SKIP.test(c.tagName))continue;
    if(nav&&c===nav){cands.push({el:c,kind:"nav"});continue;}
    if(nav&&c.contains(nav)){walk(c);continue;}
    if(!vis(c))continue;const pos=CS(c).position;if(pos==="fixed"){widgets.push(c);continue;}
    const kids=[...c.children].filter(k=>!SKIP.test(k.tagName)&&vis(k)&&CS(k).position!=="fixed");
    const sem=SEM.test(c.tagName);
    if(c.tagName==="MAIN"||(!sem&&!ownText(c)&&((kids.length>=2&&kids.every(wide))||(kids.length===1&&wide(kids[0])&&kids[0].querySelector("section,footer")))))walk(c);
    else if(sem||wide(c))cands.push({el:c});
    else if(c.children.length)walk(c);}})(D.body);
  /* --- 5. lectura de texto visible --- */
  function leaves(root){const res=[];const w=D.createTreeWalker(root,4);let n;while((n=w.nextNode())){const t=n.nodeValue.replace(/\s+/g," ").trim();if(!t)continue;const el=n.parentElement;if(!el||!vis(el))continue;
      const tt=CS(el).textTransform==="uppercase"?t.toUpperCase():t;const last=res[res.length-1];if(last&&last.el===el)last.t+=" "+tt;else res.push({el,t:tt});}return res;}
  const isInline=e=>/^(inline|inline-block|contents|inline-flex)$/.test(CS(e).display);
  const blk=e=>{let p=e;while(p.parentElement&&isInline(p)&&!/^(H[1-6]|P|LI|BUTTON|A|LABEL)$/.test(p.tagName))p=p.parentElement;return p;};
  const fs=e=>parseFloat(CS(e).fontSize)||16;
  const isBtn=e=>!!e.closest("button,.btn,[class*=btn],a[role=button],input[type=submit]");
  const bgOf=e=>{const c=ncRgb(CS(e).backgroundColor);return c&&c.a>.5?c:null;};
  const pillOf=e=>{let p=e;for(let i=0;i<3&&p;i++,p=p.parentElement){const c=bgOf(p);const rr=parseFloat(CS(p).borderTopLeftRadius)||0;if(c&&rr>=8&&R(p).height<70&&!isBtn(p))return p;}return null;};
  function vtext(el,ex){return leaves(el).filter(l=>!(ex||[]).some(x=>x.contains(l.el))).map(l=>l.t).join(" ").replace(/\s+([,.;:!?€%])/g,"$1").replace(/\s+/g," ").trim();}
  function deepest(root,re){let best=null;root.querySelectorAll("*").forEach(e=>{if(!vis(e))return;const t=vtext(e);if(re.test(t)&&t.length<90){if(!best||best.contains(e))best=e;}});return best;}
  function priceOf(root){let el=deepest(root,NC_PRICE_DEC),dec=!!el,phm=false;if(!el)el=deepest(root,NC_PRICE_INT);if(!el){el=deepest(root,NC_PRICE_PH);phm=!!el;}if(!el)return null;
    const t=vtext(el);const m=t.match(dec?NC_PRICE_DEC:phm?NC_PRICE_PH:NC_PRICE_INT);const price=dec?m[1]+","+m[2]:m[1];
    const rest=t.slice(t.indexOf(m[0])+m[0].length);const per=/\/\s*mes|al mes|mensual/i.test(t)?"€/mes":/\/\s*a[ñn]o|anual/i.test(t)?"€/año":/\/\s*d[ií]a/i.test(t)?"€/día":"€";
    let note=rest.replace(/\/\s*(mes|a[ñn]o|d[ií]a)/i,"").replace(/al mes|mensual/i,"").trim();
    const par=el.parentElement;let wrap=el;if(par&&par!==root){const extra=vtext(par,[el]);if(extra&&extra.length<=32&&!/\d/.test(extra)&&!par.querySelector("button,a.btn,input")){note=(note?note+" · ":"")+extra;wrap=par;}}
    note=note.replace(/\biva\b/gi,"IVA").replace(/^[·\s]+|[·\s]+$/g,"");
    return {el,price,unit:per,note,wrap};}
  const headish=(e,base)=>/^H[1-6]$/.test(e.tagName)||fs(e)>=Math.max(22,base*1.35)&&+CS(e).fontWeight>=500;
  function titleOf(root,ex){const L=leaves(root).filter(l=>!(ex||[]).some(x=>x.contains(l.el))&&/[a-záéíóúñ]{3}/i.test(l.t)&&!isBtn(l.el));let best=null,bs=0;
    L.forEach(l=>{const b=blk(l.el);const s=fs(l.el)*(/^H[1-3]$/.test(b.tagName)?1.15:1);if(headish(b,16)&&s>bs+.5){bs=s;best=b;}});return best;}
  function linesOf(root,ex){const res=[];const exd=e=>ex.some(x=>x===e||x.contains(e));
    const sig=e=>e.tagName+"."+((e.className&&typeof e.className==="string")?e.className.trim().split(/\s+/)[0]:"");
    (function rec(e){if(exd(e)||!vis(e))return;const t=vtext(e,ex);if(!t)return;const inner=ex.some(x=>e.contains(x)&&x!==e);
      if(t.length<=72&&!inner){const kids=[...e.children].filter(k=>vis(k)&&vtext(k,ex));
        if(kids.length>=2&&kids.every(k=>sig(k)===sig(kids[0]))&&kids.every(k=>vtext(k,ex).length<=60)){kids.forEach(k=>res.push(vtext(k,ex)));return;}
        res.push(t);return;}
      if(!e.children.length){res.push(t);return;}
      [...e.children].forEach(rec);})(root);
    return [...new Set(res)].filter(x=>x.length>1);}
  function imgsOf(root,minW){return [...root.querySelectorAll("img")].filter(i=>vis(i)&&R(i).width>=(minW||0)).map(i=>({el:i,src:i.currentSrc||i.getAttribute("src")||"",w:R(i).width,h:R(i).height,alt:i.getAttribute("alt")||""})).filter(x=>x.src&&!/^data:image\/gif;base64,R0lGOD/.test(x.src));}
  function bgImgOf(e){const b=CS(e).backgroundImage;if(!b||b==="none")return "";const u=b.match(/url\(["']?([^"')]+)["']?\)/);if(u&&!/linear-gradient|radial-gradient/.test(b.split("url(")[0]))return u[1];
    if(/gradient\(/.test(b))return b;return u?u[1]:"";}
  function btnOf(root,ex){const B=[...root.querySelectorAll("button,a,input[type=submit]")].filter(b=>vis(b)&&!(ex||[]).some(x=>x.contains(b)));
    const sc=b=>{const c=bgOf(b);return (c?2:0)+(/btn|button|cta/i.test(b.className||"")?1:0);};
    const L=B.map(b=>({b,t:(b.tagName==="INPUT"?b.value:vtext(b)).trim(),s:sc(b)})).filter(x=>x.t&&x.t.length<=40&&x.s>0).sort((a,b)=>b.s-a.s);
    if(!L.length)return null;const x=L[0];const act=x.b.getAttribute("data-bs-toggle")==="modal"||/modal|popup/i.test(x.b.className)?"popup":/^tel:/i.test(x.b.getAttribute("href")||"")?"call":/wa\.me|whatsapp/i.test(x.b.getAttribute("href")||"")?"wa":"popup";
    return {el:x.b,t:x.t,act};}
  function formBox(sec){const inp=[...sec.querySelectorAll('input[type=tel],input[name*=tel i],input[placeholder*="teléfono" i],input[placeholder*="telefono" i],input[placeholder*="móvil" i]')].find(vis);if(!inp)return null;
    const sw=R(sec).width;let p=inp;while(p.parentElement&&p.parentElement!==sec&&R(p.parentElement).width<=sw*.6)p=p.parentElement;return {box:p,inp};}
  function formInfo(fb){const ex=[];const L=leaves(fb.box).filter(l=>!l.el.closest("label,button,a,.form-floating")&&l.t.length<=90&&!/consentimiento|privacidad|rgpd|protecci[oó]n de datos/i.test(l.t));
    const blocks=[];L.forEach(l=>{const b=blk(l.el);const t=vtext(b);if(t&&t.length<=90&&!blocks.some(x=>x.t===t))blocks.push({b,t});});
    const opts=[...fb.box.querySelectorAll('input[type=checkbox],input[type=radio]')].map(i=>{const lb=i.id?fb.box.querySelector('label[for="'+i.id+'"]'):i.closest("label");const t=lb?T(lb):"";return t&&t.length<=24&&vis(lb)?t+(i.checked?"*":""):"";}).filter(Boolean);
    const b=btnOf(fb.box);return {title:(blocks[0]||{}).t||"",sub:(blocks[1]||{}).t||"",btn:b?b.t:"",opts:[...new Set(opts)].join("|")};}
  function groupOf(sec){let best=null;sec.querySelectorAll("*").forEach(p=>{if(!vis(p))return;const kids=[...p.children].filter(k=>vis(k)&&(vtext(k).length>2||k.querySelector("img,svg")));if(kids.length<2)return;
      const sig=k=>k.tagName+"."+String(k.className||"").split(/\s+/).filter(c=>!/^(is-|active|show|col-|order-|mb-|mt-|me-|ms-)/.test(c)).slice(0,1).join("");
      const s0=sig(kids[0]);const same=kids.filter(k=>sig(k)===s0);if(same.length<2||same.length<kids.length*.6)return;
      const lens=same.map(k=>vtext(k).length||1);if(Math.max(...lens)/Math.min(...lens)>4)return;
      const score=same.length*Math.min(200,lens.reduce((a,b)=>a+b,0)/same.length);
      const deep=best&&best.p.contains(p);if(!best||score>best.score*1.1||(deep&&score>=best.score*.6&&same.length>=best.items.length))best={p,items:same,score};});
    return best;}
  const legal=/aviso legal|pol[ií]tica de privacidad|cookies|©|\bS\.?L\.?U?\b|\bS\.?A\.?\b|todos los derechos/i;
  /* --- 6. fusionar candidatos que solo tienen un título con el siguiente --- */
  for(let i=0;i<cands.length-1;i++){const c=cands[i];if(c.kind)continue;const L=leaves(c.el);const txt=L.map(l=>l.t).join(" ");
    if(L.length&&L.length<=3&&txt.length<=200&&!c.el.querySelector("img,input,button")&&L.some(l=>headish(blk(l.el),16))&&i>0){cands[i+1].pre=c.el;cands.splice(i,1);i--;}}
  /* --- 7. clasificar y extraer --- */
  let heroDone=false;const secs=out.secs;const titles=[];
  const secStyle=(e)=>{let el=e;const st={};let bi=bgImgOf(el),bc=bgOf(el);
      if(!bi&&!bc){const k=[...el.children].filter(vis);if(k.length===1&&wide(k[0])){bi=bgImgOf(k[0]);bc=bgOf(k[0]);}}
      if(bi){st.bg="image";st.bgImg=bi;if(bc)st.bgColor=ncHex(bc);const pos=CS(el).backgroundPosition||"";st.bgPos=/right|100%/.test(pos)?"right":"cover";return st;}
      if(bc){const h=ncHex(bc);if(h==="#ffffff")st.bg="white";else{st.bg="color";st.bgColor=h;}}return st;};
  const push=(type,props,style,src)=>secs.push({type,props,style:style||{},src});
  cands.forEach((c,idx)=>{const el=c.el;const L=leaves(el);const txt=L.map(l=>l.t).join(" ");const st=secStyle(el);
    if(c.kind==="nav"){let im=imgsOf(el,50).sort((a,b)=>(/logo/i.test(b.alt+b.el.className)?1:0)-(/logo/i.test(a.alt+a.el.className)?1:0))[0];
      if(!im){const lg=[...el.querySelectorAll('[class*=logo i],[id*=logo i],a[href="/"]')].find(e=>vis(e)&&/url\(/.test(CS(e).backgroundImage));if(lg){const u=bgImgOf(lg);if(u&&!/gradient/.test(u))im={el:lg,src:u,alt:lg.getAttribute("aria-label")||"",w:R(lg).width,h:R(lg).height};}}
      const links=[...el.querySelectorAll("a")].filter(a=>vis(a)&&!/^tel:/i.test(a.getAttribute("href")||"")&&!a.querySelector("img")).map(a=>vtext(a)).filter(t=>t&&t.length<=24&&!/\d{6,}/.test(t.replace(/\s/g,""))&&!/llam/i.test(t));
      const telL=[...el.querySelectorAll('a[href^="tel:"],[class*=tel]')].filter(vis).map(a=>vtext(a).replace(/[\d\s+]{7,}/g,"").trim()).find(t=>t&&t.length<=30)||(/llam[ae] gratis/i.test(txt)?"Llama gratis":"");
      let pre="";if(im){const lr=R(im.el);{const pl=L.find(l=>{const r=R(l.el);return r.right<=lr.left+4&&l.t.length<=30&&!/\d{6}/.test(l.t);});pre=pl?vtext(blk(pl.el)).slice(0,40):"";}}
      push("da_nav",{logo:im&&im.alt&&!/^(logo|inicio|home)$/i.test(im.alt)?im.alt:"Logo",logoImg:im?im.src:"",telLabel:telL||"Llamada gratuita",pre,links:[...new Set(links)].slice(0,6).join("|")},{},el);rep.push("Navegación: logo"+(im?" (imagen)":"")+(links.length?" · "+links.length+" enlaces":""));return;}
    const isFoot=el.tagName==="FOOTER"||(idx===cands.length-1&&legal.test(txt));
    if(isFoot){const fb=formBox(el);if(fb){const fi=formInfo(fb);push("da_cta",{title:fi.title||"Te llamamos gratis",sub:fi.sub||"",btn:fi.btn||"Llamadme"},{},el);rep.push("Formulario del footer → CTA final con formulario");}
      const im=imgsOf(el,50)[0];const co=(L.map(l=>l.t).find(t=>/\bS\.?L\.?U?\b|\bS\.?A\.?U?\b|distribuidor|©/i.test(t)&&t.length<=120)||"").replace(/^©\s*/,"");
      push("da_footer",{company:co||"{{RAZON_SOCIAL}}",note:"",logoImg:im?im.src:"",showTel:out.tel?"1":""},{},el);rep.push("Footer: "+(co||"razón social no encontrada → {{RAZON_SOCIAL}}"));return;}
    /* barra superior */
    if(idx<=1&&!heroDone&&R(el).height<=90&&txt.length<=170&&!el.querySelector("img[width],input,h1,h2")){
      const parts=L.map(l=>({t:l.t,b:+CS(l.el).fontWeight>=700||l.el.closest("b,strong")||/[¡!]/.test(l.t),btn:!!pillOf(l.el)||isBtn(l.el)}));
      const btn=(parts.find(p=>p.btn)||{}).t||"";const rest=parts.filter(p=>p.t!==btn);const bold=rest.filter(p=>p.b&&/[¡!]|gratis|ahora|hoy/i.test(p.t)).map(p=>p.t).join(" ");
      const text=rest.map(p=>p.t).join(" ").replace(bold,"").replace(/\s+/g," ").trim();
      const act=/llam/i.test(txt)?"call":"";push("da_topbar",{text:text||txt,bold,btn,act,ico:""},st,el);rep.push("Barra superior");return;}
    /* hero */
    const fb=formBox(el);const pr=priceOf(el);const h1=el.querySelector("h1");const maxF=Math.max(0,...L.map(l=>fs(l.el)));
    if(!heroDone&&(h1&&vis(h1)||(idx<=2&&maxF>=36)||(idx<=2&&fb))){heroDone=true;
      const ex=[];if(fb)ex.push(fb.box);
      const tms=[...el.querySelectorAll('[id*=timer i],[class*=countdown i],[class*=timer i],[data-countdown]')].filter(vis);
      const tm=tms.filter(t=>!tms.some(o=>o!==t&&t.contains(o)))[0]||null;
      let tmBox=tm;while(tmBox&&tmBox.parentElement&&tmBox.parentElement!==el&&!tmBox.parentElement.querySelector("button,a.btn,h1,h2,h3")&&T(tmBox.parentElement).length<80)tmBox=tmBox.parentElement;if(tmBox)ex.push(tmBox);
      const hb=titleOf(el,ex.concat(pr?[pr.wrap]:[]));let headline="",hl="";
      if(hb){const HL=leaves(hb);if(HL.length>=2){const a=CS(HL[0].el),b=CS(HL[HL.length-1].el);if(a.color!==b.color||a.fontFamily!==b.fontFamily){hl=HL[HL.length-1].t;headline=HL.slice(0,-1).map(x=>x.t).join(" ");}}
        if(!headline){headline=vtext(hb);hl="";}ex.push(hb);out.fonts.disp=CS(HL[0]?HL[0].el:hb).fontFamily;}
      if(pr)ex.push(pr.wrap);
      const pill=L.map(l=>pillOf(l.el)).find(p=>p&&!ex.some(x=>x.contains(p))&&vtext(p).length<=36);if(pill)ex.push(pill);
      const cta=btnOf(el,ex);if(cta)ex.push(cta.el);
      el.querySelectorAll("a,button").forEach(b=>{if(vis(b)&&!ex.includes(b)&&!ex.some(x=>x.contains(b)))ex.push(b);});
      const lines=linesOf(el,ex);const sub=lines.filter(x=>x.length>60).slice(0,1).join(" ");const checks=lines.filter(x=>x.length<=60&&!/^\d+$/.test(x)).slice(0,4);
      const big=imgsOf(el,220).filter(i=>!ex.some(x=>x.contains(i.el))).sort((a,b)=>b.w*b.h-a.w*a.h)[0];
      const fi=fb?formInfo(fb):null;
      let cdLabel="";if(tmBox){cdLabel=(T(tmBox).replace(/\d+/g," ").replace(/\b(d[ií]as?|horas?|minutos?|segundos?|mins?|segs?|hrs?)\b/gi," ").replace(/\s+/g," ").trim()).slice(0,40);}
      const props={canal:fb?"form":out.tel?"call":"form",eyebrow:pill?vtext(pill):"",headline:headline||"{{TITULAR}}",highlight:hl,sub,price:pr?pr.price:"",priceUnit:pr?pr.unit:"€/mes",priceNote:pr?pr.note:"",oldPrice:"",
        checks:checks.join("\n"),cta:cta?cta.t:"Quiero esta oferta",act:cta?cta.act:"popup",cardTitle:fi?fi.title||"Te llamamos gratis":"Te llamamos gratis",cardSub:fi?fi.sub:"",cardBtn:fi?fi.btn||"Llamadme":"Llamadme gratis",opts:fi?fi.opts:"",
        live:"",cd:tmBox?"{{FECHA_FIN_OFERTA}}":"",cdLabel:tmBox?(cdLabel||"La oferta termina en"):"",img:big?big.src:"",imgAlt:big?big.alt:"",layout:big?"photo":"std",illus:"auto",badge:""};
      push("da_hero",props,st,el);rep.push("Hero: «"+(headline+" "+hl).trim()+"»"+(pr?" · "+pr.price+" "+pr.unit:"")+(fi?" · formulario"+(fi.opts?" con opciones "+fi.opts.replace(/\*/g,""):""):"")+(tmBox?" · cuenta atrás (pon la fecha real)":""));return;}
    /* FAQ */
    const acc=[...el.querySelectorAll(".accordion-item,details,[class*=faq-item],[class*=faq__item]")];
    const qh=L.filter(l=>/\?\s*$/.test(l.t)&&l.t.length<=160);
    const title=(c.pre&&titleOf(c.pre))||titleOf(el);if(title)titles.push(title);const ttl=title?vtext(title):(c.pre?vtext(c.pre):"");
    const trig=[...el.querySelectorAll('[data-bs-toggle="collapse"],[data-toggle="collapse"],[aria-controls],summary')].filter(t=>vis(t)&&T(t).length>3&&T(t).length<=200);
    if(acc.length>=2||qh.length>=3||trig.length>=2){let items=[];
      if(trig.length>=2)items=trig.map(t=>{const id=(t.getAttribute("data-bs-target")||t.getAttribute("data-target")||(/^#/.test(t.getAttribute("href")||"")?t.getAttribute("href"):"")||("#"+(t.getAttribute("aria-controls")||""))).replace(/^#/,"");
          let tg=id?D.getElementById(id):null;if(!tg&&t.tagName==="SUMMARY")tg=t.parentElement;let an="";
          if(tg){const cl=tg.cloneNode(true);cl.querySelectorAll("summary,button,a.btn,.btn").forEach(x=>x.remove());an=T(cl);}
          return T(t)+"|"+(an||"{{RESPUESTA}}");});
      else if(acc.length>=2)items=acc.map(a=>{const q=a.querySelector("summary,.accordion-button,.accordion-header,[data-bs-toggle],h3,h4,button");const qt=T(q);let an=T(a.querySelector(".accordion-body,.accordion-collapse,[class*=answer],[class*=body]"))||T(a).replace(qt,"").trim();return qt?qt+"|"+(an||"{{RESPUESTA}}"):"";}).filter(Boolean);
      else items=qh.map(l=>{const b=blk(l.el);let n=b.nextElementSibling;return l.t+"|"+(n?T(n):"{{RESPUESTA}}");});
      push("da_faq",{title:ttl||"Preguntas frecuentes",items:items.map(x=>x.replace(/\n/g," ")).join("\n")},st,el);rep.push("FAQ: "+items.length+" preguntas con sus respuestas");return;}
    /* tabla comparativa */
    const tb=[...el.querySelectorAll("table")].find(vis);
    if(tb){const rows=[...tb.querySelectorAll("tr")].map(tr=>[...tr.children].map(td=>T(td))).filter(r=>r.some(Boolean));const hd=tb.querySelector("thead tr")?rows.shift():rows.shift();
      push("db_compare",{title:ttl||"Qué incluye",head:(hd||[]).join("|"),rows:rows.map(r=>r.join("|")).join("\n")},st,el);rep.push("Tabla comparativa: "+rows.length+" filas");return;}
    /* grupos: tarifas, opiniones, pasos, cifras o ventajas */
    const g=groupOf(el);
    if(g){const withPrice=g.items.filter(k=>priceOf(k));
      if(withPrice.length>=2){const sub=c.pre?"":(()=>{const p=L.map(l=>blk(l.el)).find(b=>!g.p.contains(b)&&b!==title&&vtext(b).length>20);return p?vtext(p):"";})();
        const plans=withPrice.map(k=>{const p=priceOf(k);const ex=[p.wrap];const pl=[...k.querySelectorAll("*")].map(e=>pillOf(e)).find(x=>x&&!x.contains(p.el)&&vtext(x).length<=26);if(pl)ex.push(pl);
          const b=btnOf(k,ex);if(b)ex.push(b.el);const hd=[...k.querySelectorAll("h2,h3,h4,h5")].find(h=>vis(h)&&!ex.some(x=>x.contains(h)));if(hd)ex.push(hd);
          const feats=linesOf(k,ex);const name=hd?vtext(hd):feats.map(f=>f.replace(/^([A-ZÁÉÍÓÚÑ]{3,}\s+)+/,"").split(/[¡(]/)[0].trim()).filter(Boolean).slice(0,3).join(" + ");
          const im=imgsOf(k,40)[0];
          return {name:name||"Tarifa",price:p.price,unit:p.unit,feats:feats.join("\n"),tag:pl?vtext(pl):"",hl:pl&&/ofert|m[aá]s (vendid|elegid|popular)|recomend|top|mejor/i.test(vtext(pl))?"si":pl?"no":"",img:im?im.src:"",cta:b?b.t:"La quiero",_cr:parseFloat(CS(k).borderTopLeftRadius)||0};});
        out.cardr=out.cardr||Math.max(...plans.map(x=>x._cr));plans.forEach(x=>delete x._cr);
        push("da_plans",{act:"popup",allPri:"1",title:ttl||"Elige tu tarifa",sub,plans},st,el);rep.push("Tarifas: "+plans.length+" ("+plans.map(x=>x.price+" "+x.unit).join(" · ")+")");return;}
      const iL=g.items.map(k=>leaves(k).map(l=>l.t));
      if(g.items.length>=3&&R(el).height<260&&iL.every(a=>a.join(" ").length<=44)&&!ttl){
        const items=iL.map(a=>a[0]+"|"+a.slice(1).join(" "));push("da_trust",{items:items.join("\n")},st,el);rep.push("Barra de cifras: "+items.length);return;}
      if(g.items.some(k=>/★|⭐/.test(vtext(k))||k.querySelector("blockquote,q,[class*=review i],[class*=testimon i]"))){
        const items=iL.map(a=>{const q=[...a].sort((x,y)=>y.length-x.length)[0]||"";const rest=a.filter(x=>x!==q&&!/^[★⭐\s]+$/.test(x));return [q.replace(/^[“"«]|[”"»]$/g,""),rest[0]||"",rest[1]||""].join("|");});
        push("db_reviews",{title:ttl||"Opiniones",source:"",items:items.join("\n")},st,el);rep.push("Opiniones: "+items.length+" (textos reales de la página)");return;}
      if(g.items.length>=2&&iL.every(a=>a.length>=2&&/^(paso\s*)?0?[1-9][.)º]?$/i.test(a[0]))){
        const items=iL.map(a=>a.slice(1,2).concat([a.slice(2).join(" ")]).join("|"));push("db_steps",{title:ttl||"Cómo funciona",sub:"",items:items.join("\n")},st,el);rep.push("Pasos: "+items.length);return;}
      const shortItems=g.items.filter(k=>vtext(k).length<=240);
      if(g.items.length>=3&&shortItems.length>=g.items.length*.8){const icons=[];let anyIco=false;
        const items=g.items.map(k=>{const im=imgsOf(k,8).find(i=>i.w<=160);icons.push(im?im.src:"");if(im)anyIco=true;
          const hd=titleOf(k)||[...k.querySelectorAll("h3,h4,h5,strong,b")].find(vis);const ht=hd?vtext(hd):"";const rest=vtext(k,hd?[hd]:[]);
          return (ht?"|"+ht+"|"+rest:"|"+rest+"|").replace(/\n/g," ");});
        push("da_benefits",{variant:"cards",title:ttl||"Ventajas",items:items.join("\n"),icons:anyIco?icons:[]},st,el);rep.push("Ventajas: "+items.length+(anyIco?" con sus iconos":""));return;}}
    /* formulario suelto */
    if(fb){const fi=formInfo(fb);push("da_cta",{title:ttl||fi.title||"Te llamamos gratis",sub:fi.sub||"",btn:fi.btn||"Llamadme"},st,el);rep.push("Formulario → CTA con formulario");return;}
    /* imagen + texto */
    const big=imgsOf(el,200).sort((a,b)=>b.w*b.h-a.w*a.h)[0];
    const b=btnOf(el);const ex=[];if(title)ex.push(title);if(b)ex.push(b.el);
    const paras=linesOf(el,ex.concat(big?[big.el]:[])).filter(x=>x.length>2);
    if(big&&(ttl||paras.length)){const tr=title?R(title):null;const side=tr&&R(big.el).left<tr.left?"left":"right";
      push("dx_media",{kicker:"",title:ttl,text:paras.filter(x=>x.length>30).join("\n")||paras.join(" "),checks:paras.filter(x=>x.length<=30).slice(0,4).join("\n"),btn:b?b.t:"",act:b?b.act:"popup",img:big.src,imgAlt:big.alt,side,frame:"round"},st,el);rep.push("Imagen + texto: «"+(ttl||"sin título")+"»");return;}
    if(ttl||paras.length){push("dx_text",{kicker:"",title:ttl,text:paras.join("\n"),btn:b?b.t:"",act:b?b.act:"popup",align:"center"},st,el);rep.push("Texto: «"+(ttl||paras[0]||"").slice(0,40)+"»");return;}
    if(big){push("dx_media",{title:"",text:"",btn:"",img:big.src,imgAlt:big.alt,side:"right",frame:"none"},st,el);rep.push("Imagen");}
  });
  /* --- 8. widgets flotantes → nativos --- */
  out.hasWa=hasWaWidget||!!out.wa;out.widgets=widgets.length;
  /* --- 9. marca: colores, formas y fuentes calculadas --- */
  const bt={};D.querySelectorAll("button,a,input[type=submit],.btn").forEach(e=>{if(!vis(e))return;const c=bgOf(e);if(!c)return;const h=ncHsl(c);if(h.l>.94||(h.s<.12&&h.l>.2&&h.l<.85))return;
    const k=ncHex(c);const o=bt[k]||(bt[k]={c,n:0,col:CS(e).color,r:parseFloat(CS(e).borderTopLeftRadius)||0,h:R(e).height});o.n++;});
  const bl=Object.values(bt).sort((a,b)=>b.n-a.n);const bp=bl[0];
  const ba=bl.find(x=>bp&&x!==bp&&ncCDist(x.c,bp.c)>120);
  const heads=[...D.querySelectorAll("h1,h2,h3")].filter(vis);let ink=null;heads.forEach(h=>{const c=ncRgb(CS(h).color);if(c&&!ink&&ncHsl(c).l<.35)ink=c;});
  let soft=null,sa=0;secs.forEach(s=>{if(s.style.bg==="color"){const c=ncRgb("rgb("+parseInt(s.style.bgColor.slice(1,3),16)+","+parseInt(s.style.bgColor.slice(3,5),16)+","+parseInt(s.style.bgColor.slice(5,7),16)+")");const h=ncHsl(c);const a=R(s.src).width*R(s.src).height;if(h.l>.78&&a>sa){soft=s.style.bgColor;sa=a;}}});
  const pf=[...D.querySelectorAll("p,li")].filter(e=>vis(e)&&T(e).length>20);const famCount={};pf.forEach(p=>{const f=CS(p).fontFamily;famCount[f]=(famCount[f]||0)+T(p).length;});
  const bodyFam=Object.entries(famCount).sort((a,b)=>b[1]-a[1]).map(x=>x[0])[0]||CS(D.body).fontFamily;
  const h2s=titles.length?titles:[...D.querySelectorAll("h2,h3")].filter(e=>vis(e)&&!e.closest("header,nav,footer")&&T(e).length>6);const hf={};h2s.forEach(h=>{const f=CS((leaves(h)[0]||{el:h}).el).fontFamily;hf[f]=(hf[f]||0)+fs(h);});
  const headFam=Object.entries(hf).sort((a,b)=>b[1]-a[1]).map(x=>x[0])[0]||bodyFam;
  const fH=ncFontResolve(headFam),fB=ncFontResolve(bodyFam),fD=out.fonts.disp?ncFontResolve(out.fonts.disp):null;
  out.brand={bp:bp?ncHex(bp.c):"#2563EB",btntext:bp&&ncRgb(bp.col)?ncHex(ncRgb(bp.col)):"#ffffff",ba:ba?ncHex(ba.c):(bp?ncHex(bp.c):"#10B981"),ink:ink?ncHex(ink):"#1d1d1f",soft:soft||"",
    btnr:bp?(bp.r>=bp.h/2-1?999:Math.round(bp.r)):10,cardr:Math.round(out.cardr||16),fhead:fH.font,fbody:fB.font,fdisp:fD&&fD.font!==fH.font?fD.font:""};
  out.fonts={head:fH,body:fB,disp:fD};
  return out;
}

/* ===== Aplicar el análisis al estado ===== */
function ncApplyAnalysis(a,srcName){
  commit();state.settings.importCSS="";
  const B=a.brand;Object.assign(CUSTOM,{bp:B.bp,ba:B.ba,ink:B.ink,soft:B.soft||ncMixHex(B.bp,"#ffffff",.9),btnr:Math.min(B.btnr,40),cardr:Math.min(B.cardr,30),fhead:B.fhead,fbody:B.fbody,btntext:B.btntext,shape:true,name:srcName?("Importada · "+srcName):"Importada"});
  if(typeof syncCustom==="function")syncCustom();state.settings.brand="custom";const bt=document.getElementById("brandTop");if(bt)bt.value="custom";
  state.settings.look="base";state.settings.fontDisp=B.fdisp||"";state.settings.annot=false;state.settings.hand=false;state.settings.editorial=false;state.settings.texture="none";
  if(a.tel&&(!state.settings.tel||/\{\{/.test(state.settings.tel)))state.settings.tel=a.telText||a.tel;
  if(a.wa&&(!state.settings.wa||/\{\{/.test(state.settings.wa)))state.settings.wa=a.wa;
  const list=a.secs.map(s=>{const props=Object.assign(LIB[s.type].def(),s.props);return {id:nid(),type:s.type,props,style:s.style||{}};});
  /* mapear fondos a los tokens de la marca cuando coinciden */
  list.forEach(s=>{const t=s.style;if(t.bg==="color"&&t.bgColor){if(ncHexDist(t.bgColor,B.bp)<24){t.bg="brand";delete t.bgColor;}else if(CUSTOM.soft&&ncHexDist(t.bgColor,CUSTOM.soft)<18){t.bg="soft";delete t.bgColor;}}});
  if(a.hasWa)list.push({id:nid(),type:"dx_wa",props:LIB.dx_wa.def(),style:{}});
  if(list.some(s=>s.type==="da_hero"))list.push({id:nid(),type:"da_sticky",props:Object.assign(LIB.da_sticky.def(),{canal:"form"}),style:{}});
  state.sections=list;state.selected=null;
  const ov=document.getElementById("importOverlay");if(ov)ov.style.display="none";
  renderPalette();renderGlobal&&renderGlobal();renderPreview();renderRight();
  ncImportReport(a,list.length);
}
function ncMixHex(a,b,t){const x=ncRgb("rgb("+[1,3,5].map(i=>parseInt(a.slice(i,i+2),16)).join(",")+")"),y=ncRgb("rgb("+[1,3,5].map(i=>parseInt(b.slice(i,i+2),16)).join(",")+")");return ncHex({r:x.r+(y.r-x.r)*t,g:x.g+(y.g-x.g)*t,b:x.b+(y.b-x.b)*t});}
function ncHexDist(a,b){if(!a||!b)return 999;const p=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));const x=p(a),y=p(b);return Math.abs(x[0]-y[0])+Math.abs(x[1]-y[1])+Math.abs(x[2]-y[2]);}
function ncImportReport(a,n){let o=document.getElementById("ncImpRep");if(!o){o=document.createElement("div");o.id="ncImpRep";o.className="nc-imprep";document.body.appendChild(o);}
  const B=a.brand,F=a.fonts;const sw=c=>c?`<i style="background:${c}"></i>`:"";
  const fl=f=>f?`<b>${esc(f.font)}</b> <span>(${esc(f.src)} · ${esc(f.how)})</span>`:"—";
  o.innerHTML=`<div class="nc-imprep-box"><div class="d-flex" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><b>Convertido a ${n} bloques editables</b><button class="btn sm ghost" id="ncImpRepX">Cerrar</button></div>
   <div class="nc-imprep-sw">${sw(B.bp)}<span>Principal ${B.bp}</span>${sw(B.ba)}<span>Acento ${B.ba}</span>${sw(B.ink)}<span>Texto ${B.ink}</span>${B.soft?sw(B.soft)+`<span>Suave ${B.soft}</span>`:""}</div>
   <div class="nc-imprep-f">Titulares: ${fl(F.head)}<br>Texto: ${fl(F.body)}${F.disp&&B.fdisp?`<br>Titular del hero y precios: ${fl(F.disp)}`:""}</div>
   ${a.telText?`<div class="nc-imprep-f">Teléfono detectado: <b>${esc(a.telText)}</b> → aplicado en Global (cámbialo si usáis número de tracking).</div>`:""}
   <ul>${a.report.map(r=>`<li>${esc(r)}</li>`).join("")}${a.hasWa?"<li>Botón flotante de WhatsApp → bloque nativo medible</li>":""}<li>Modales, cookies y textos legales descartados (el builder añade los suyos con tus endpoints).</li></ul>
   <div class="help">La marca queda como «Marca propia» (editable en Global) y todo funciona con cualquier estilo, tipografía y animación. Revisa los {{PLACEHOLDER}} antes de exportar.</div></div>`;
  o.style.display="grid";o.querySelector("#ncImpRepX").onclick=()=>{o.style.display="none";};o.onclick=e=>{if(e.target===o)o.style.display="none";};}

/* ===== Botón «Convertir a bloques» (sustituye al traductor antiguo) ===== */
doTranslate=async function(){const txt=(document.getElementById("importText").value||"").trim();if(!txt){toast("Pega o sube el HTML primero");return;}
  const info=document.getElementById("importInfo");if(info)info.textContent="Analizando la página…";
  try{const a=await ncAnalyzeHTML(txt);if(!a.secs.length){toast("No encontré secciones reconocibles");if(info)info.textContent="";return;}
    const name=(document.getElementById("zipInfo")||{}).dataset?(document.getElementById("zipInfo").dataset.src||""):"";
    ncApplyAnalysis(a,name);if(info)info.textContent="";toast("Convertido a "+state.sections.length+" bloques nativos");}
  catch(e){console.error(e);if(info)info.textContent="";toast("No pude convertir la página: "+(e.message||e));}};
(function(){const _z=zipImport;zipImport=async function(file){try{const z=document.getElementById("zipInfo");if(z&&file&&file.name)z.dataset.src=file.name.replace(/\.zip$/i,"").replace(/^snapshot-/,"").replace(/-(?=[a-z]{2,3}$)/,".");}catch(e){}return _z.apply(this,arguments);};})();
document.addEventListener("DOMContentLoaded",()=>{const b=document.getElementById("translateDo");if(b)b.textContent="Convertir a bloques editables (recomendado)";});
