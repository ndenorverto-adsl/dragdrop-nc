/* ---------- v6.0 · MARCA DESDE UNA WEB ----------
   Saca la marca de la web del cliente y la deja como «marca editable» (CUSTOM): color principal y de acento,
   texto, fondo suave, texto de los botones, radio de botón y tarjeta, tipografías y logo.
   · Con URL: la trae /api/fetch (versión desplegada y con sesión). Sin eso: pega el HTML de la página (Ctrl+U).
   · No lee el CSS a mano: pinta la página en un iframe aislado (sin scripts) y mide lo que el navegador calcula,
     así cuentan también las hojas de estilo enlazadas, las variables y las fuentes.
   · Antes de aplicar se ve todo y cada color se puede retocar. Nada se inventa: si algo no aparece, se dice. */
(function(){
const hex=c=>{const m=String(c||"").match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/i);if(!m)return null;if(m[4]!=null&&+m[4]<.5)return null;return "#"+[m[1],m[2],m[3]].map(x=>(+x).toString(16).padStart(2,"0")).join("");};
const rgb=h=>{const n=parseInt(h.slice(1),16);return [(n>>16)&255,(n>>8)&255,n&255];};
const lum=h=>{const c=rgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const hsl=h=>{let [r,g,b]=rgb(h).map(v=>v/255);const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let s=0,hh=0;if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);hh=mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4;hh*=60;}return [hh,s,l];};
const vivid=h=>{const [,s,l]=hsl(h);return s>.28&&l>.12&&l<.88;};
const hueD=(a,b)=>{const d=Math.abs(hsl(a)[0]-hsl(b)[0]);return Math.min(d,360-d);};
const GENERIC=/^(serif|sans-serif|monospace|system-ui|ui-sans-serif|ui-serif|-apple-system|blinkmacsystemfont|segoe ui|roboto|helvetica neue|helvetica|arial|apple color emoji|segoe ui emoji|inherit|initial)$/i;
const ICONF=/awesome|icomoon|icons?|glyph|material symbols|dashicons|eicons|feather/i;
function fam(ff){const L=String(ff||"").split(",").map(x=>x.trim().replace(/^["']|["']$/g,""));return L.find(x=>x&&!GENERIC.test(x)&&!ICONF.test(x))||"";}

async function getHTML(url){const tok=typeof ncPubToken==="function"?await ncPubToken():"";
  if(!tok)throw new Error("Para traer la web por URL hay que iniciar sesión. Pega el HTML de la página (en el navegador: Ctrl+U, copiar todo).");
  const r=await fetch("/api/fetch?url="+encodeURIComponent(url),{headers:{Authorization:"Bearer "+tok}});
  if(r.status===404)throw new Error("Traer por URL solo funciona en la versión desplegada en Vercel. Pega el HTML de la página.");
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||("Error "+r.status));return {html:j.text||"",base:j.finalUrl||url};}

/* pinta el HTML en un iframe aislado y mide */
function paint(html,base){return new Promise((res,rej)=>{const f=document.createElement("iframe");f.setAttribute("sandbox","allow-same-origin");f.setAttribute("aria-hidden","true");f.tabIndex=-1;
  f.style.cssText="position:fixed;left:-20000px;top:0;width:1280px;height:900px;border:0;visibility:hidden";
  const clean=String(html).replace(/<script[\s\S]*?<\/script>/gi,"").replace(/<base[^>]*>/gi,"");
  const b=base?`<base href="${esc(base)}">`:"";const doc=/<head[^>]*>/i.test(clean)?clean.replace(/<head([^>]*)>/i,`<head$1>${b}`):b+clean;
  let done=false;const fin=()=>{if(done)return;done=true;setTimeout(()=>{try{const d=f.contentDocument;(d.fonts&&d.fonts.ready?Promise.race([d.fonts.ready,new Promise(r=>setTimeout(r,1500))]):Promise.resolve()).then(()=>{try{res({f,d,w:f.contentWindow});}catch(e){rej(e);}});}catch(e){rej(e);}},350);};
  f.addEventListener("load",fin);setTimeout(fin,6000);document.body.appendChild(f);f.srcdoc=doc;});}

function analyse(d,w,base){const out={name:"",bp:"",ba:"",ink:"",soft:"",btntext:"",btnr:null,cardr:null,fhead:"",fbody:"",logo:"",notes:[]};
  const cs=e=>w.getComputedStyle(e);const visible=e=>{const r=e.getBoundingClientRect();const s=cs(e);return r.width>4&&r.height>4&&s.display!=="none"&&s.visibility!=="hidden"&&+s.opacity>.1;};
  const meta=n=>{const m=d.querySelector(`meta[property="${n}"],meta[name="${n}"]`);return m?String(m.getAttribute("content")||"").trim():"";};
  /* nombre */
  /* «Inicio | Marca» → «Marca»: se descartan las palabras de página y se prefiere la parte que coincide con el dominio */
  const host=(()=>{try{return new URL(base||d.baseURI).hostname.replace(/^www\./,"").split(".")[0].toLowerCase();}catch(e){return "";}})();
  const parts=(d.title||"").split(/\s[|\-–—·:]\s/).map(x=>x.trim()).filter(x=>x&&!/^(inicio|home|portada|bienvenid[oa]s?|p[aá]gina principal|welcome)$/i.test(x));
  const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ\s]/g,"");
  out.name=meta("og:site_name")||meta("application-name")||(host&&parts.find(p=>norm(p).includes(host)||host.includes(norm(p))))||parts[parts.length-1]||"";
  /* botones: color de fondo ponderado por área (los de arriba cuentan doble) */
  const votes={},txt={},rad=[];
  d.querySelectorAll("a,button,input[type=submit],[role=button],[class*=btn],[class*=button],[class*=cta]").forEach(e=>{if(!visible(e))return;const s=cs(e);const bg=hex(s.backgroundColor);if(!bg||!vivid(bg))return;
    const r=e.getBoundingClientRect();if(r.width>600||r.height>140)return;const wgt=r.width*r.height*(r.top<900?2:1);votes[bg]=(votes[bg]||0)+wgt;const tc=hex(s.color);if(tc)txt[bg+"|"+tc]=(txt[bg+"|"+tc]||0)+wgt;const br=parseFloat(s.borderTopLeftRadius);if(!isNaN(br))rad.push(Math.min(br,40));});
  /* resto de colores vivos: enlaces, iconos, bordes y fondos medianos */
  const other={};d.querySelectorAll("body *").forEach((e,i)=>{if(i>4000||!visible(e))return;const s=cs(e);const r=e.getBoundingClientRect();
    [[s.backgroundColor,Math.min(r.width*r.height,250000)/20],[s.color,(e.textContent||"").trim().length*4],[s.borderTopColor,parseFloat(s.borderTopWidth)>0?r.width:0]].forEach(([c,wg])=>{const h=hex(c);if(h&&vivid(h)&&wg>0)other[h]=(other[h]||0)+wg;});});
  const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  let theme="";const tm=d.querySelector('meta[name="theme-color"]');if(tm&&tm.content){const t=d.createElement("i");t.style.color=tm.content;d.body.appendChild(t);theme=hex(cs(t).color)||"";t.remove();}
  const B=top(votes),O=top(other);
  out.bp=B[0]||(theme&&vivid(theme)?theme:"")||O[0]||"";
  if(!B[0])out.notes.push(out.bp?"No hay botones de color: el principal sale de "+(theme&&out.bp===theme?"theme-color":"los colores más usados")+".":"No se ha encontrado ningún color de marca.");
  out.ba=[...B.slice(1),...O].find(c=>c!==out.bp&&hueD(c,out.bp)>28)||"";
  if(!out.ba&&out.bp)out.notes.push("Solo hay un color de marca: el acento queda igual que el principal (cámbialo si quieres).");
  /* texto de los botones */
  if(out.bp){const k=Object.entries(txt).filter(([kk])=>kk.startsWith(out.bp+"|")).sort((a,b)=>b[1]-a[1])[0];out.btntext=k?k[0].split("|")[1]:(lum(out.bp)>.45?"#111111":"#ffffff");}
  /* texto y fondo suave */
  const h1=[...d.querySelectorAll("h1,h2")].find(visible);const ink=hex(cs(h1||d.body).color)||hex(cs(d.body).color);out.ink=ink&&lum(ink)<.25?ink:"#0f172a";
  const soft={};d.querySelectorAll("section,div,header,footer,main,aside").forEach((e,i)=>{if(i>2500||!visible(e))return;const h=hex(cs(e).backgroundColor);if(!h)return;const L=lum(h);if(L>.82&&L<.985){const r=e.getBoundingClientRect();soft[h]=(soft[h]||0)+r.width*r.height;}});
  out.soft=top(soft)[0]||"";
  /* radios */
  if(rad.length){rad.sort((a,b)=>a-b);out.btnr=Math.round(rad[Math.floor(rad.length/2)]);}
  const cr=[];d.querySelectorAll("[class*=card],[class*=box],[class*=tile],article").forEach((e,i)=>{if(i>400||!visible(e))return;const v=parseFloat(cs(e).borderTopLeftRadius);if(!isNaN(v)&&v>0)cr.push(Math.min(v,32));});if(cr.length){cr.sort((a,b)=>a-b);out.cardr=Math.round(cr[Math.floor(cr.length/2)]);}
  /* tipografías: las que el navegador usa en titulares y en párrafos */
  out.fhead=fam(cs(h1||d.body).fontFamily);const p=[...d.querySelectorAll("p,li")].find(e=>visible(e)&&(e.textContent||"").trim().length>30);out.fbody=fam(cs(p||d.body).fontFamily)||out.fhead;
  const gf=[...d.querySelectorAll('link[href*="fonts.googleapis.com"]')].map(l=>decodeURIComponent(l.getAttribute("href")||"")).join(" ");
  const onGoogle=n=>n&&(gf.toLowerCase().includes("family="+n.toLowerCase().replace(/ /g,"+"))||gf.toLowerCase().includes("family="+n.toLowerCase())||(typeof FONTS!=="undefined"&&FONTS.includes(n)));
  ["fhead","fbody"].forEach(k=>{if(out[k]&&!onGoogle(out[k])){out.notes.push(`La tipografía «${out[k]}» no está en Google Fonts: se usa Inter. Súbela en Global → Tipografía si tienes el archivo.`);out[k+"Own"]=out[k];out[k]="Inter";}});
  if(!out.fhead)out.fhead="Inter";if(!out.fbody)out.fbody=out.fhead;
  /* logo: imagen o SVG de la cabecera que lleve «logo» o enlace a la portada */
  const hd=d.querySelector("header,[class*=header],nav,[role=banner]")||d.body;const abs=u=>{try{return new URL(u,base||d.baseURI).href;}catch(e){return u;}};
  const imgs=[...hd.querySelectorAll("img,svg")].filter(visible);
  const hint=e=>/logo|brand|marca/i.test([e.getAttribute("alt"),e.getAttribute("src"),e.getAttribute("class"),e.id,(e.closest("a")||{}).className,(e.closest("[class*=logo],[id*=logo]")?"logo":"")].join(" "));
  const home=e=>{const a=e.closest("a");return a&&/^(\/|\.\/|#|https?:\/\/[^/]+\/?$)/.test(a.getAttribute("href")||"");};
  const L=imgs.find(hint)||imgs.find(home)||null;
  if(L){if(L.tagName.toLowerCase()==="img"){const src=L.currentSrc||L.getAttribute("src");out.logo=src?abs(src):"";}
    else{const s=L.cloneNode(true);if(!s.getAttribute("xmlns"))s.setAttribute("xmlns","http://www.w3.org/2000/svg");const c=cs(L).color;s.querySelectorAll("*").forEach(n=>{if(n.getAttribute("fill")==="currentColor")n.setAttribute("fill",c);});if(s.getAttribute("fill")==="currentColor")s.setAttribute("fill",c);
      const str=new XMLSerializer().serializeToString(s);if(str.length<60000)out.logo="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(str);}}
  if(!out.logo){const ic=d.querySelector('link[rel="apple-touch-icon"],link[rel="icon"][type="image/svg+xml"]');if(ic){out.logo=abs(ic.getAttribute("href"));out.notes.push("No hay logo en la cabecera: se usa el icono de la web.");}else out.notes.push("No se ha encontrado el logo: súbelo a mano.");}
  return out;}

function ov(){let o=document.getElementById("nc6BrandOv");if(o)return o;o=document.createElement("div");o.id="nc6BrandOv";o.className="nc-ov nc6-ov";document.body.appendChild(o);
  o.addEventListener("click",e=>{if(e.target===o||e.target.closest("[data-bu=close]")){o.style.display="none";return;}const a=e.target.closest("[data-bu]");if(!a)return;if(a.dataset.bu==="go")run();if(a.dataset.bu==="apply")apply();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&o.style.display==="grid")o.style.display="none";});return o;}
let R=null;
function open(){const o=ov();R=null;o.innerHTML=`<div class="nc-ov-box nc6-brand" role="dialog" aria-modal="true" aria-labelledby="buT">
  <div class="nc-ov-head"><div><b id="buT">Marca desde una web</b><div class="help">Saca colores, tipografías, radios y logo de la web del cliente y crea la marca editable. Antes de aplicar puedes revisarlo todo.</div></div><button class="btn sm ghost" data-bu="close">Cerrar</button></div>
  <div class="fld"><label for="buUrl">URL de la web</label><input id="buUrl" placeholder="https://www.cliente.es" inputmode="url"></div>
  <details class="bu-paste"><summary>O pega el HTML de la página (si no tienes sesión o la web bloquea la descarga)</summary><textarea id="buHtml" rows="5" placeholder="&lt;!doctype html&gt;… (en la web: Ctrl+U, Ctrl+A, Ctrl+C)"></textarea><div class="help">Con el HTML pegado, pon también la URL para que carguen sus estilos e imágenes.</div></details>
  <div class="bu-go"><span class="help" id="buMsg" role="status"></span><button class="btn primary" data-bu="go">Analizar la web</button></div>
  <div id="buRes"></div></div>`;o.style.display="grid";setTimeout(()=>document.getElementById("buUrl").focus(),30);}
async function run(){const url=document.getElementById("buUrl").value.trim(),pasted=document.getElementById("buHtml").value.trim(),msg=document.getElementById("buMsg");
  const u=url&&!/^https?:\/\//i.test(url)?"https://"+url:url;
  if(!u&&!pasted){msg.textContent="Escribe la URL o pega el HTML.";return;}
  msg.textContent="Analizando…";let fr=null;
  try{const src=pasted?{html:pasted,base:u}:await getHTML(u);const P=await paint(src.html,src.base);fr=P.f;R=analyse(P.d,P.w,src.base);R.url=u;msg.textContent="";show();}
  catch(e){msg.textContent=e.message||String(e);}finally{if(fr)fr.remove();}}
function show(){const box=document.getElementById("buRes");if(!R){box.innerHTML="";return;}
  const C=(k,l)=>`<label class="bu-c"><input type="color" data-bk="${k}" value="${/^#[0-9a-f]{6}$/i.test(R[k]||"")?R[k]:"#cccccc"}"><span><b>${l}</b><small>${R[k]?esc(R[k]):"no encontrado"}</small></span></label>`;
  box.innerHTML=`<div class="bu-res">
    <div class="bu-prev" style="--p:${R.bp||"#555"};--a:${R.ba||R.bp||"#999"};--i:${R.ink};--s:${R.soft||"#f4f4f5"};--t:${R.btntext||"#fff"};--r:${R.btnr==null?10:R.btnr}px;--cr:${R.cardr==null?14:R.cardr}px">
      <div class="bu-top">${R.logo?`<img src="${esc(R.logo)}" alt="Logo detectado">`:`<b>${esc(R.name||"Logo")}</b>`}<span class="bu-btn">Llamadme</span></div>
      <div class="bu-card"><h3 style="font-family:'${esc(R.fhead)}',sans-serif">${esc(R.name||"Tu marca")}: así se vería</h3><p style="font-family:'${esc(R.fbody)}',sans-serif">Texto de ejemplo con la tipografía de párrafo y el color de texto de la marca.</p><span class="bu-btn">Quiero información</span> <span class="bu-tag">Acento</span></div></div>
    <div class="bu-data"><div class="fld"><label for="buName">Nombre</label><input id="buName" value="${esc(R.name)}"></div>
      <div class="bu-cs">${C("bp","Principal")}${C("ba","Acento")}${C("ink","Texto")}${C("soft","Fondo suave")}${C("btntext","Texto de botón")}</div>
      <div class="help">Tipografías: <b>${esc(R.fhead)}</b> (titulares) · <b>${esc(R.fbody)}</b> (texto)${R.fheadOwn||R.fbodyOwn?` · en la web: ${esc([R.fheadOwn,R.fbodyOwn].filter(Boolean).join(", "))}`:""} · radio de botón ${R.btnr==null?"—":R.btnr+" px"} · tarjeta ${R.cardr==null?"—":R.cardr+" px"}</div>
      ${R.notes.length?`<ul class="bu-notes">${R.notes.map(n=>`<li>${esc(n)}</li>`).join("")}</ul>`:""}
      <div class="fld inline"><label for="buLogoAll">Poner el logo en las cabeceras de esta landing</label><input type="checkbox" id="buLogoAll" ${R.logo?"checked":"disabled"}></div>
      <div class="bu-go"><button class="btn ghost" data-bu="close">Cancelar</button><button class="btn primary" data-bu="apply" ${R.bp?"":"disabled"}>Aplicar como marca editable</button></div></div></div>`;
  box.querySelectorAll("[data-bk]").forEach(i=>i.addEventListener("input",()=>{R[i.dataset.bk]=i.value;const pv=box.querySelector(".bu-prev");const m={bp:"--p",ba:"--a",ink:"--i",soft:"--s",btntext:"--t"}[i.dataset.bk];pv.style.setProperty(m,i.value);i.nextElementSibling.querySelector("small").textContent=i.value;}));
  /* que la vista previa use las fuentes detectadas */
  const fl=document.createElement("link");fl.rel="stylesheet";fl.href=fontsHref(R.fhead,R.fbody);document.head.appendChild(fl);}
function apply(){if(!R||!R.bp)return;commit();const nm=(document.getElementById("buName")||{}).value||R.name;
  Object.assign(CUSTOM,{bp:R.bp,ba:R.ba||R.bp,ink:R.ink||CUSTOM.ink,soft:R.soft||CUSTOM.soft,btntext:R.btntext||CUSTOM.btntext,fhead:R.fhead||"Inter",fbody:R.fbody||R.fhead||"Inter"});
  if(R.btnr!=null)CUSTOM.btnr=R.btnr;if(R.cardr!=null)CUSTOM.cardr=R.cardr;
  syncCustom();if(BRANDS.custom&&nm)BRANDS.custom.name=nm+" (web)";state.settings.brand="custom";state.settings.lookBrandFont=true;const bt=document.getElementById("brandTop");if(bt){bt.innerHTML=brandOptions("custom");bt.value="custom";}
  if(R.logo)window.nc6BrandLogo=R.logo;
  if(R.logo&&(document.getElementById("buLogoAll")||{}).checked){let n=0;state.sections.forEach(s=>{if(s.props&&"logoImg" in s.props){s.props.logoImg=R.logo;if(nm&&"logo" in s.props)s.props.logo=nm;n++;}});window.nc6BrandLogo=R.logo;}
  document.getElementById("nc6BrandOv").style.display="none";document.dispatchEvent(new CustomEvent("nc:brand",{detail:{brand:"custom"}}));renderPreview();renderRight();if(typeof renderGlobal==="function")renderGlobal();
  toast("Marca aplicada: "+(nm||"marca editable")+(R.notes.length?" · revisa los avisos en Global":""));}
/* un bloque nuevo con cabecera recibe el logo detectado */
(function(){const _a=addSection;addSection=function(type){const r=_a.apply(this,arguments);if(window.nc6BrandLogo&&state.settings.brand==="custom"){const s=state.sections.find(x=>x.id===state.selected);if(s&&s.props&&"logoImg" in s.props&&!s.props.logoImg){s.props.logoImg=window.nc6BrandLogo;renderPreview();}}return r;};})();
window.ncBrandFromUrl=open;
/* accesos: menú Más, panel Global (junto a la marca) y el brief */
document.addEventListener("DOMContentLoaded",()=>{const pop=document.querySelector('.tbm[data-menu="tools"] .tbm-pop');if(pop&&!document.getElementById("btnBrandUrl")){const b=document.createElement("button");b.className="btn";b.id="btnBrandUrl";b.title="Sacar colores, tipografías y logo de la web del cliente";b.addEventListener("click",open);pop.insertBefore(b,pop.querySelector(".tbm-sep"));if(typeof nc6Item==="function")nc6Item(b,"wand","Marca desde una web");else b.textContent="Marca desde una web";}});
if(typeof renderGlobal==="function"){const _g=renderGlobal;renderGlobal=function(){const r=_g.apply(this,arguments);const s=document.getElementById("gBrand");if(s&&!document.getElementById("gBrandUrl")){s.closest(".fld").insertAdjacentHTML("beforeend",`<button type="button" class="btn sm ghost bu-gl" id="gBrandUrl">Sacar la marca de una web…</button>`);document.getElementById("gBrandUrl").addEventListener("click",open);}return r;};}
})();
