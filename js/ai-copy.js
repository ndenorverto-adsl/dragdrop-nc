/* ---------- v6.1 · ASISTENTE DE TEXTOS CON IA ----------
   Botón ✨ junto a cada texto del panel Contenido (titulares, subtítulos, etiquetas, botones…): variantes para test A/B,
   más corto, más directo, centrado en el beneficio, urgencia honesta, tono cercano o profesional, texto de botón y
   corregir. Lo hace /api/ai con Claude (clave en Vercel, solo con sesión). Nunca inventa precios ni cifras y conserva los
   {{MARCADORES}}. Cada propuesta se aplica con un clic (se puede deshacer) o se copia. */
(function(){
const SKIP=/(img|image|url|href|video|logo|icon|color|colour|end|date|min|max|val|unit|pct|delay|price|old|cd$|^id$|name$|tel|wa$|email|endpoint|code|html|css|js|svg|opts|options|steps|items|plans|rows|cols|tabs|slides|chips|faq|ben|feats|terms|stats|proof|kpis|tick|ticker|quiz)/i;
const ACT=[["variants","Variantes A/B"],["shorter","Más corto"],["direct","Más directo"],["benefit","Beneficio"],["urgency","Urgencia"],["warm","Cercano"],["pro","Profesional"],["fix","Corregir"]];
const ACT_BTN=[["cta","Textos de botón"],["shorter","Más corto"],["urgency","Urgencia"],["fix","Corregir"]];
let POP=null;
function ok(inp){const k=inp.dataset.fk||"";if(!k||SKIP.test(k))return false;if(inp.type&&!/^(text|search|)$/.test(inp.type))return false;const v=inp.value||"";if(/\||\n/.test(v))return false;return v.trim().length>=2&&v.length<=400;}
function isBtn(k){return /(btn|cta|button|boton)/i.test(k);}
function ctx(){const st=state.settings;const s=state.sections;const tx=[];s.forEach(x=>{const p=x.props||{};["eyebrow","headline","highlight","title","sub","kicker"].forEach(k=>{if(typeof p[k]==="string"&&p[k].trim()&&!/\{\{/.test(p[k]))tx.push(p[k].trim());});});
  const flt=(typeof palGet==="function"?palGet("flt",{}):{})||{};const hero=s.find(x=>x.props&&(x.props.eyebrow||x.props.headline));
  return {sector:flt.sec||"",brand:(BRANDS[st.brand]||{}).name||"",product:hero?[hero.props.eyebrow,hero.props.headline,hero.props.highlight].filter(Boolean).join(" · "):"",page:tx.slice(0,12).join(" / ")};}
function label(inp){const l=inp.closest(".fld");const t=l&&l.querySelector("label");return t?[...t.childNodes].filter(n=>!(n.classList&&n.classList.contains("ai-b"))).map(n=>n.textContent).join("").trim():inp.dataset.fk;}
function close(){if(POP){POP.remove();POP=null;}}
async function call(action,inp){const tok=typeof ncPubToken==="function"?await ncPubToken():"";
  if(!tok)throw new Error("Inicia sesión en el builder para usar el asistente de textos.");
  const r=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+tok},body:JSON.stringify({action,text:inp.value,field:label(inp),context:ctx()})});
  if(r.status===404)throw new Error("El asistente funciona en la versión publicada en Vercel (con ANTHROPIC_API_KEY configurada).");
  const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||("Error "+r.status));return j.variants||[];}
function open(inp,btn){close();const btnF=isBtn(inp.dataset.fk);const A=btnF?ACT_BTN:ACT;
  POP=document.createElement("div");POP.className="ai-pop";POP.setAttribute("role","dialog");POP.setAttribute("aria-label","Asistente de textos");
  POP.innerHTML=`<div class="ai-h"><b>✨ ${esc(label(inp))}</b><button type="button" class="mini" data-ai="x" aria-label="Cerrar">✕</button></div>
    <div class="ai-acts">${A.map(([k,t])=>`<button type="button" class="chipf sm" data-ai-act="${k}">${t}</button>`).join("")}</div>
    <div class="ai-out" aria-live="polite"><div class="help">Elige qué quieres. Nunca inventa precios, plazos ni cifras y respeta los {{DATOS}} pendientes.</div></div>`;
  document.body.appendChild(POP);const r=btn.getBoundingClientRect();const below=window.innerHeight-r.bottom>380;POP.style.top=(below?r.bottom+6:Math.max(8,r.top-386))+"px";POP.style.left=Math.max(8,Math.min(r.right-340,window.innerWidth-348))+"px";
  POP.addEventListener("click",async e=>{if(e.target.closest("[data-ai=x]")){close();return;}
    const use=e.target.closest("[data-ai-use]");if(use){const v=use.dataset.aiUse;inp.value=v;inp.dispatchEvent(new Event("input",{bubbles:true}));commit();toast("Texto aplicado · Ctrl+Z para deshacer");close();return;}
    const cp=e.target.closest("[data-ai-copy]");if(cp){try{await navigator.clipboard.writeText(cp.dataset.aiCopy);toast("Copiado");}catch(_){}return;}
    const a=e.target.closest("[data-ai-act]");if(!a)return;POP.querySelectorAll("[data-ai-act]").forEach(x=>x.classList.toggle("on",x===a));
    const out=POP.querySelector(".ai-out");out.innerHTML=`<div class="ai-load"><span class="ai-spin"></span>Escribiendo propuestas…</div>`;
    try{const V=await call(a.dataset.aiAct,inp);if(!POP)return;
      out.innerHTML=V.length?V.map(v=>`<div class="ai-v"><p>${esc(v.text)}</p>${v.why?`<small>${esc(v.why)}</small>`:""}<span><button type="button" class="btn sm primary" data-ai-use="${esc(v.text)}">Usar</button><button type="button" class="btn sm ghost" data-ai-copy="${esc(v.text)}">Copiar</button></span></div>`).join("")+`<div class="help">Propuestas generadas con IA: revísalas antes de publicar.</div>`:`<div class="help">Sin propuestas. Prueba otra opción.</div>`;}
    catch(err){if(POP)out.innerHTML=`<div class="ai-err">${esc(err.message||String(err))}</div>`;}});}
function decorate(){const cf=document.getElementById("contentFields");if(!cf)return;
  cf.querySelectorAll("input[data-fk],textarea[data-fk]").forEach(inp=>{const f=inp.closest(".fld");if(!f||f.querySelector(".ai-b")||!ok(inp))return;const l=f.querySelector("label");if(!l)return;
    const b=document.createElement("button");b.type="button";b.className="ai-b";b.title="Mejorar este texto con IA";b.setAttribute("aria-label","Mejorar «"+l.textContent.trim()+"» con IA");b.textContent="✨";
    b.addEventListener("click",e=>{e.preventDefault();open(inp,b);});l.appendChild(b);});}
const _rr=renderRight;renderRight=function(){const r=_rr.apply(this,arguments);try{decorate();}catch(e){}return r;};
document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
document.addEventListener("mousedown",e=>{if(POP&&!POP.contains(e.target)&&!e.target.closest(".ai-b"))close();});
window.ncAiDecorate=decorate;
})();
