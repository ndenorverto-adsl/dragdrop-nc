/* ---------- ANIMACIONES Y EFECTOS (v4.4) ----------
   Global → "Animaciones y efectos": intensidad (Desactivadas / Sutil / Media / Llamativa) + 4 grupos activables:
     1. Entrada al hacer scroll (por sección, con escalonado de tarjetas)   2. Destacar textos, precios y cifras
     3. Llamar la atención al CTA                                         4. Fondo y movimiento (parallax, flotar, inclinación 3D)
   Reglas: respeta "reducir movimiento" del sistema, el contenido nunca queda oculto si falla el JS (clase fx-js),
   el hero no se anima con opacidad (no retrasa el LCP) y los efectos de ratón solo van en dispositivos con puntero fino.
   Contadores: solo cifras numéricas reales escritas en el texto; los {{PLACEHOLDER}} no se animan. */
Object.assign(state.settings,{fxLevel:"off",fxReveal:true,fxRevealType:"auto",fxHighlight:true,fxCta:true,fxBg:true});
Object.keys(state.settings).forEach(k=>{if(!(k in SETTINGS_DEFAULT))SETTINGS_DEFAULT[k]=JSON.parse(JSON.stringify(state.settings[k]));});
const FX_LEVELS=[["off","Desactivadas"],["sutil","Sutil"],["media","Media"],["llamativa","Llamativa"]];
const FX_TYPES=[["auto","Automática (según el estilo)"],["up","Subir"],["fade","Fundido"],["zoom","Zoom"],["left","Desde la izquierda"],["right","Desde la derecha"],["curtain","Cortina"],["blur","Enfoque"],["none","Sin animación"]];
const FX_BY_LOOK={swiss:"curtain",cartel:"curtain",senal:"left",plano:"curtain",ficha:"curtain",brutal:"zoom",comic:"zoom",memphis:"zoom",pixel:"up",lux:"blur",revista:"fade",editorial:"fade",prensa:"fade",expediente:"fade",terminal:"fade"};
function fxType(){const t=state.settings.fxRevealType||"auto";return t==="auto"?(FX_BY_LOOK[ncLook()]||"up"):t;}
function fxOn(){return state.settings.fxLevel&&state.settings.fxLevel!=="off";}
/* Campo de estilo por bloque */
V4_STYLE_FIELDS.push({k:"_fx",l:"Animación",t:"head"},{k:"fx",l:"Animación de entrada",t:"select",opts:[["auto","Del ajuste global"],...FX_TYPES.slice(1)]});
V4_STYLE_DEF.fx="auto";
/* Palabras que rotan en el titular del hero */
["da_hero","db_hero","dc_hero"].forEach(t=>{const L=LIB[t];if(!L||L.fields.some(f=>f.k==="rotate"))return;const i=L.fields.findIndex(f=>/highlight|italic|gradient/.test(f.k));L.fields.splice(i+1,0,{k:"rotate",l:"Palabras que rotan en la parte destacada (una por línea, opcional)",t:"ta"});});

function fxCSS(){const L=state.settings.fxLevel,d={sutil:14,media:26,llamativa:44}[L]||20,dur={sutil:.5,media:.7,llamativa:.85}[L]||.6,stag={sutil:.05,media:.08,llamativa:.11}[L]||.07;
return `
:root{--fxd:${d}px;--fxt:${dur}s;--fxs:${stag}s;--fxe:cubic-bezier(.2,.7,.2,1)}
html.fx-js,html.fx-js body{overflow-x:clip}
@media (prefers-reduced-motion:no-preference){
html.fx-js [data-fx]:not([data-fx=none]):not(.fx-in):not(.fx-hero){opacity:0}
html.fx-js [data-fx=up]:not(.fx-in):not(.fx-hero){transform:translateY(var(--fxd))}
html.fx-js [data-fx=zoom]:not(.fx-in):not(.fx-hero){transform:scale(.94)}
html.fx-js [data-fx=left]:not(.fx-in):not(.fx-hero){transform:translateX(calc(var(--fxd)*-1.4))}
html.fx-js [data-fx=right]:not(.fx-in):not(.fx-hero){transform:translateX(calc(var(--fxd)*1.4))}
html.fx-js [data-fx=blur]:not(.fx-in):not(.fx-hero){filter:blur(10px)}
html.fx-js [data-fx=curtain]:not(.fx-hero){opacity:1}html.fx-js [data-fx=curtain]:not(.fx-in):not(.fx-hero)>*{clip-path:inset(0 0 100% 0)}html.fx-js [data-fx=curtain]>*{transition:clip-path calc(var(--fxt)*1.3) var(--fxe)}
html.fx-js [data-fx]{transition:opacity var(--fxt) var(--fxe),transform var(--fxt) var(--fxe),filter var(--fxt) var(--fxe),clip-path calc(var(--fxt)*1.3) var(--fxe)}
html.fx-js [data-fx=curtain].fx-in>*{clip-path:inset(0 0 0 0)}
/* tarjetas escalonadas */
html.fx-js .fx-card{transition:opacity var(--fxt) var(--fxe),transform var(--fxt) var(--fxe);transition-delay:calc(var(--fxi,0)*var(--fxs))}
html.fx-js [data-fx]:not(.fx-in) .fx-card{opacity:0;transform:translateY(calc(var(--fxd)*.8))}
/* hero: solo movimiento, sin opacidad (no retrasa el LCP) */
html.fx-js .fx-hero .fx-hi{animation:fxHero var(--fxt) var(--fxe) both;animation-delay:calc(var(--fxi,0)*var(--fxs)*1.4)}
@keyframes fxHero{from{transform:translateY(calc(var(--fxd)*.6))}}
/* 2 · destacar */
.fx-hl mark,.fx-hl .db-h1 em,.fx-hl .dc-grad{text-decoration-line:underline;text-decoration-color:var(--ba);text-decoration-skip-ink:none;text-underline-offset:.08em;text-decoration-thickness:0;transition:text-decoration-thickness .9s .35s var(--fxe)}
.fx-hl.fx-in mark,.fx-hl.fx-in .db-h1 em,.fx-hl.fx-in .dc-grad,.fx-hl.fx-hero mark,.fx-hl.fx-hero .db-h1 em,.fx-hl.fx-hero .dc-grad{text-decoration-thickness:.1em}
body.lk-brutal .fx-hl mark,body.lk-comic .fx-hl mark,body.lk-pixel .fx-hl mark,body.lk-cartel .fx-hl mark,body.lk-plano .fx-hl mark{text-decoration-line:none}
.fx-rot{display:inline-block;transition:opacity .35s,transform .35s var(--fxe)}.fx-rot.out{opacity:0;transform:translateY(-.35em)}.fx-rot.pre{opacity:0;transform:translateY(.35em);transition:none}
.fx-count{font-variant-numeric:tabular-nums}
.fx-pop{animation:fxPop .6s var(--fxe) both}@keyframes fxPop{0%{transform:scale(.9)}60%{transform:scale(1.04)}100%{transform:none}}
/* 3 · CTA */
.fx-cta{position:relative;overflow:hidden;isolation:isolate}.dx-opt.fx-cta,.db-opt.fx-cta{overflow:visible}
.fx-cta>.fx-sh{position:absolute;inset:-2px;z-index:1;pointer-events:none;background:linear-gradient(105deg,transparent 35%,rgba(255,255,255,.45) 50%,transparent 65%);transform:translateX(-120%)}
.fx-cta:hover>.fx-sh,.fx-cta.fx-shine>.fx-sh{transition:transform .9s var(--fxe);transform:translateX(120%)}
.fx-cta:active{transform:scale(.97)!important}
.fx-pulse{animation:fxPulse 1.6s var(--fxe) 1}
@keyframes fxPulse{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--bp) 55%,transparent)}100%{box-shadow:0 0 0 18px transparent}}
.fx-cta svg.nci,.fx-cta .nci{transition:transform .25s var(--fxe)}.fx-cta:hover svg.nci{transform:translateX(4px)}
.fx-nudge svg.nci{animation:fxNudge 1s var(--fxe) 2}@keyframes fxNudge{50%{transform:translateX(5px)}}
.fx-shake{animation:fxShake .45s cubic-bezier(.36,.07,.19,.97) both}@keyframes fxShake{10%,90%{transform:translateX(-1px)}20%,80%{transform:translateX(3px)}30%,50%,70%{transform:translateX(-5px)}40%,60%{transform:translateX(5px)}}
/* 4 · fondo y movimiento */
.fx-float .nc-float{animation:fxFloat 5s ease-in-out infinite}@keyframes fxFloat{50%{translate:0 -8px}}
.fx-float .nc-stk{animation:fxWob 6s ease-in-out infinite}@keyframes fxWob{50%{rotate:4deg}}
.fx-par .nc-vis>img{will-change:transform;transform:translateY(var(--fxp,0)) scale(1.08)}
@media (hover:hover) and (pointer:fine){.fx-tilt{transition:transform .2s ease-out;transform-style:preserve-3d}}
}
@media (prefers-reduced-motion:reduce){.fx-cta>.fx-sh{display:none}}`;}

const FX_JS=`(function(){var D=document,W=window,B=D.body,C={};try{C=JSON.parse(B.getAttribute('data-fxc')||'{}');}catch(e){}
var RM=W.matchMedia&&W.matchMedia('(prefers-reduced-motion: reduce)').matches,FINE=W.matchMedia&&W.matchMedia('(hover:hover) and (pointer:fine)').matches;
if(RM){D.documentElement.classList.remove('fx-js');}
var secs=[].slice.call(D.querySelectorAll('[data-sec]'));
var CARDS='.da-card,.da-plan,.da-ben,.db-rev,.db-step,.dc-tile,.dc-kpi,.dx-opt,.dx-cities li,.db-seals .col,.dx-seals .it,.dx-vs .r,.da-trust .it,.accordion-item,.dx-ptab .col,.dx-prows .r';
secs.forEach(function(s,i){var hero=s.hasAttribute('data-fxh');
 if(!C.reveal||hero||RM||s.getAttribute('data-fx')==='none'){s.removeAttribute('data-fx');}
 if(hero&&!RM&&C.reveal){s.setAttribute('data-fx','up');s.classList.add('fx-hero');var hi=s.querySelectorAll('.da-eyebrow,.db-kicker,.dc-chip,h1,.da-sub,.db-sub,.dc-sub,.da-price,.da-card,.db-form,.nc-vis-wrap,.da-btns,.dc-formbar');for(var k=0;k<hi.length;k++){hi[k].classList.add('fx-hi');hi[k].style.setProperty('--fxi',k);}}
 if(C.hl)s.classList.add('fx-hl');
 if(C.reveal&&!hero&&s.hasAttribute('data-fx')){var cs=s.querySelectorAll(CARDS);for(var j=0;j<cs.length;j++){cs[j].classList.add('fx-card');cs[j].style.setProperty('--fxi',j%8);}}});
function inView(el){if(el.classList.contains('fx-in'))return;el.classList.add('fx-in');if(C.hl)counters(el);}
if('IntersectionObserver' in W){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){inView(e.target);io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px',threshold:.08});secs.forEach(function(s){io.observe(s);});}
else secs.forEach(inView);
setTimeout(function(){secs.forEach(function(s){var r=s.getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)inView(s);});},60);
/* contadores: "24 h", "1.200", "98 %", "4,8" */
function counters(root){if(RM)return;root.querySelectorAll('.da-trust .it b,.db-proof b,.dc-kpi b,.dc-tile .big,.dx-rt b,.nc-float b').forEach(function(b){if(b.__c||b.children.length)return;var t=b.textContent.trim();var m=t.match(/^(\\D{0,3}?)(\\d{1,3}(?:[.\\s]\\d{3})*|\\d+)(,\\d+)?(\\D{0,12})$/);if(!m||/\\{\\{/.test(t))return;
  var ip=m[2].replace(/[.\\s]/g,''),dec=m[3]?m[3].slice(1):'',val=parseFloat(ip+(dec?'.'+dec:''));if(!(val>0))return;b.__c=1;b.classList.add('fx-count');var sep=/[.\\s]/.test(m[2])?(m[2].match(/[.\\s]/)[0]):'';
  var dur=C.lvl==='sutil'?700:1100,t0=null;function fmt(v){var s=dec?v.toFixed(dec.length).replace('.',','):String(Math.round(v));if(sep){var p=s.split(',');p[0]=p[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g,sep);s=p.join(',');}return m[1]+s+m[4];}
  function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-k,3);b.textContent=fmt(val*e);if(k<1)requestAnimationFrame(step);else{b.textContent=t;if(C.lvl!=='sutil')b.classList.add('fx-pop');}}
  b.textContent=fmt(0);requestAnimationFrame(step);});}
/* palabras que rotan */
if(!RM)D.querySelectorAll('[data-rot]').forEach(function(mk){var w;try{w=JSON.parse(mk.getAttribute('data-rot'));}catch(e){return;}if(!w||w.length<2)return;var i=0;mk.innerHTML='<span class="fx-rot"></span>';var sp=mk.firstChild;sp.textContent=w[0];
 setInterval(function(){sp.classList.add('out');setTimeout(function(){i=(i+1)%w.length;sp.textContent=w[i];sp.classList.remove('out');sp.classList.add('pre');void sp.offsetWidth;sp.classList.remove('pre');},330);},C.lvl==='llamativa'?2200:2800);});
/* CTA */
if(C.cta){var main=[].slice.call(D.querySelectorAll('.da-card .da-go,.db-form .db-go,.db-opt,.dc-go,.da-hero .da-btn.pri,.dx-f2 .da-go,.da-ctab .da-go,.db-ctabox .db-go,.dx-bigform .da-go,.da-plan.best .da-btn,.da-sticky .da-btn.pri,.db-sticky a.pri,.dc-sticky .dc-pill'));
 main.forEach(function(b){b.classList.add('fx-cta');if(!b.querySelector('.fx-sh')){var sh=D.createElement('span');sh.className='fx-sh';sh.setAttribute('aria-hidden','true');b.appendChild(sh);}});
 if(!RM&&C.lvl!=='sutil'){var every=C.lvl==='llamativa'?5000:8000,last=Date.now();['scroll','pointerdown','keydown'].forEach(function(ev){W.addEventListener(ev,function(){last=Date.now();},{passive:true});});
  setInterval(function(){if(D.hidden||Date.now()-last<3000)return;var vis=main.filter(function(b){var r=b.getBoundingClientRect();return r.width&&r.top>0&&r.bottom<innerHeight;})[0];if(!vis)return;vis.classList.remove('fx-pulse','fx-shine','fx-nudge');void vis.offsetWidth;vis.classList.add('fx-pulse','fx-shine');if(C.lvl==='llamativa')vis.classList.add('fx-nudge');setTimeout(function(){vis.classList.remove('fx-shine');},1000);},every);}
 D.addEventListener('invalid',function(e){var f=e.target.form;if(!f||f.__sh)return;f.__sh=1;var box=f.closest('.da-card,.db-form,.dx-f2,.db-ctabox,.dx-exit .box')||f;if(!RM){box.classList.remove('fx-shake');void box.offsetWidth;box.classList.add('fx-shake');}setTimeout(function(){f.__sh=0;},600);},true);}
/* fondo y movimiento */
if(C.bg&&!RM){B.classList.add('fx-float');
 if(FINE&&C.lvl!=='sutil'){var pics=[].slice.call(D.querySelectorAll('.nc-hx .nc-vis.is-photo'));if(pics.length){B.classList.add('fx-par');var tick=false;function par(){tick=false;pics.forEach(function(p){var r=p.getBoundingClientRect();var c=(r.top+r.height/2-innerHeight/2)/innerHeight;p.style.setProperty('--fxp',(c*-24).toFixed(1)+'px');});}W.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(par);}},{passive:true});par();}}
 if(FINE&&C.lvl==='llamativa'){D.querySelectorAll('.da-plan,.da-ben,.db-rev,.dc-tile').forEach(function(c){c.classList.add('fx-tilt');c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(900px) rotateX('+(-y*5).toFixed(2)+'deg) rotateY('+(x*6).toFixed(2)+'deg)';});c.addEventListener('pointerleave',function(){c.style.transform='';});});}}
})();`;

function fxCfg(){const st=state.settings;return {lvl:st.fxLevel,reveal:st.fxReveal!==false,hl:st.fxHighlight!==false,cta:st.fxCta!==false,bg:st.fxBg!==false};}
/* Inyección: atributo por sección, palabras rotativas, CSS y JS (en la vista previa solo al pulsar "Reproducir") */
(function(){const _bd=buildDoc;buildDoc=function(forExport){let h=_bd.apply(this,arguments);if(!fxOn())return h;
  const play=!!forExport||!!window.ncFxPlay,st=state.settings,def=fxType();
  let heroSeen=false;
  state.sections.forEach((s,idx)=>{let t=(s.style&&s.style.fx&&s.style.fx!=="auto")?s.style.fx:def;
    if(/(_nav|_topbar|_sticky|^dx_wa|^dx_exit|^dx_countdown)$/.test(s.type)||/^(dx_wa|dx_exit|dx_countdown)$/.test(s.type))t="none";
    if(!heroSeen&&/(_hero$|^dx_quiz$|^dx_article$)/.test(s.type)){heroSeen=true;t="none";}const isHero=t==="none"&&/(_hero$|^dx_quiz$|^dx_article$)/.test(s.type);h=h.replace(`<div data-sec="${s.id}" `,`<div data-sec="${s.id}" data-fx="${t}"${isHero?' data-fxh="1"':''} `);
    const rot=s.props&&s.props.rotate&&/^d[abc]_hero$/.test(s.type)?String(s.props.rotate).split("\n").map(x=>x.trim()).filter(Boolean).slice(0,8):[];
    if(rot.length&&st.fxHighlight!==false){const first=(s.props.highlight||s.props.italic||s.props.gradient||"").trim();const words=[first,...rot.filter(w=>w!==first)].filter(Boolean);
      const i=h.indexOf(`data-sec="${s.id}"`);if(i>-1){const j=h.slice(i).search(/<(mark|em|span class="dc-grad")[^>]*>/);if(j>-1){const at=i+j;h=h.slice(0,at)+h.slice(at).replace(/^<(mark|em|span class="dc-grad")([^>]*)>/,(m,tag,rest)=>`<${tag}${rest} data-rot="${esc(JSON.stringify(words))}">`);}}}});
  h=h.replace("</head>",`<style>${fxCSS()}</style></head>`);
  if(!play)return h;
  h=h.replace(/<head>/i,`<head><script>document.documentElement.classList.add('fx-js')<\/script>`);
  h=h.replace(/<body /,`<body data-fxc="${esc(JSON.stringify(fxCfg()))}" `);
  return h.replace(/<\/body>(?![\s\S]*<\/body>)/,`<script>${FX_JS}<\/script></body>`);};})();

/* Panel Global */
(function(){const _rg=renderGlobal;renderGlobal=function(){_rg.apply(this,arguments);const gf=document.getElementById("globalFields");if(!gf||gf.querySelector("#gFx"))return;const st=state.settings,on=fxOn();
  const old=document.getElementById("gMotion");if(old){const f=old.closest(".fld");if(f)f.querySelector("label").textContent="Micro-interacciones (bloques clásicos)";}
  const html=`<div id="gFx"><div class="paneltitle" style="padding:10px 0 4px">Animaciones y efectos</div>
  <div class="fld"><label>Intensidad</label><div class="seg nc-fxseg">${FX_LEVELS.map(([k,l])=>`<button type="button" data-fxl="${k}" class="${(st.fxLevel||'off')===k?'on':''}">${l}</button>`).join("")}</div></div>
  ${on?`<div class="fld"><label>Entrada de las secciones</label><select id="gFxType">${FX_TYPES.slice(0,-1).map(([k,l])=>`<option value="${k}" ${(st.fxRevealType||'auto')===k?'selected':''}>${l}${k==='auto'?' · ahora: '+(FX_TYPES.find(t=>t[0]===(FX_BY_LOOK[ncLook()]||'up'))||[])[1]:''}</option>`).join("")}</select><div class="help">Cada bloque puede cambiarla en Estilo → Animación.</div></div>
  ${[["gFxRev","fxReveal","Entrada al hacer scroll","Secciones y tarjetas aparecen escalonadas; el hero solo se mueve, sin retrasar la carga."],["gFxHl","fxHighlight","Destacar textos, precios y cifras","Subrayado que se dibuja, cifras que cuentan hasta su valor y palabras que rotan en el titular (Contenido del hero)."],["gFxCta","fxCta","Llamar la atención al CTA","Reflejo al pasar el ratón, efecto al pulsar, latido cada pocos segundos si nadie hace nada y sacudida si falta un dato."],["gFxBg","fxBg","Fondo y movimiento","Tarjetas flotantes y sellos que se mecen; parallax en la foto del hero e inclinación 3D en tarjetas (escritorio)."]].map(([id,k,l,h])=>`<div class="fld inline"><label>${l}</label><input type="checkbox" id="${id}" ${st[k]!==false?'checked':''}></div><div class="help" style="margin:-4px 0 8px">${h}</div>`).join("")}
  <button type="button" class="btn sm" id="gFxPlay" style="width:100%">▶ Reproducir animaciones en la vista previa</button>
  <div class="help" style="margin:6px 0 8px">Mientras editas la vista previa no se anima (para que no salte en cada cambio). Siempre se respeta “reducir movimiento” del sistema.</div>`:''}</div>`;
  const anchor=gf.querySelector("#gGrowth");if(anchor)anchor.insertAdjacentHTML("beforebegin",html);else gf.insertAdjacentHTML("beforeend",html);
  gf.querySelectorAll("[data-fxl]").forEach(b=>b.addEventListener("click",()=>{commit();state.settings.fxLevel=b.dataset.fxl;renderPreview();renderGlobal();if(b.dataset.fxl!=="off")fxPlay();}));
  const t=document.getElementById("gFxType");if(t)t.addEventListener("change",()=>{commit();state.settings.fxRevealType=t.value;fxPlay();});
  [["gFxRev","fxReveal"],["gFxHl","fxHighlight"],["gFxCta","fxCta"],["gFxBg","fxBg"]].forEach(([id,k])=>{const el=document.getElementById(id);if(el)el.addEventListener("change",()=>{commit();state.settings[k]=el.checked;fxPlay();});});
  const p=document.getElementById("gFxPlay");if(p)p.addEventListener("click",fxPlay);};})();
function fxPlay(){window.ncFxPlay=true;try{renderPreview();}finally{window.ncFxPlay=false;}}

/* Puntuación CRO: aviso suave si la intensidad es llamativa */
(function(){if(typeof croChecks!=="function")return;const _cc=croChecks;croChecks=function(){const out=_cc.apply(this,arguments),st=state.settings;
  if(fxOn())out.push({cat:"trust",w:1,v:st.fxLevel==="llamativa"?.5:1,msg:st.fxLevel==="llamativa"?"Animaciones llamativas: revisa que no distraigan del formulario en móvil.":"Animaciones "+st.fxLevel+": respetan “reducir movimiento” y no retrasan la carga del hero.",det:"",fix:""});return out;};})();
