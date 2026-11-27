/* ---------- v6.1 · LIENZO A TAMAÑO REAL CON ZOOM ----------
   Antes el escritorio se pintaba a 1100 px como máximo (menos que un portátil real) y no había zoom.
   Ahora cada dispositivo se pinta a su ancho real —móvil 390, tablet 768, escritorio 1280 o 1440— y el lienzo se
   ajusta al espacio con zoom («Ajustar»), o al zoom que elijas (50-150 %). Lo que ves es lo que verá el visitante.
   Control abajo a la derecha del lienzo; atajos Ctrl + rueda, Ctrl + 0 (ajustar) y Ctrl + +/− con el foco fuera de un campo. */
(function(){
const DEV={mobile:390,tablet:768,desktop:1280,wide:1440};const STEPS=[.33,.5,.67,.75,.9,1,1.1,1.25,1.5];
const Z={mode:"fit",z:1};try{const s=JSON.parse(localStorage.getItem("nc_zoom")||"null");if(s&&s.mode)Object.assign(Z,s);}catch(e){}
window.ncZoom=1;
function box(){let b=document.getElementById("zoomBox");const fw=document.getElementById("frameWrap");if(!b&&fw){b=document.createElement("div");b.id="zoomBox";fw.parentNode.insertBefore(b,fw);b.appendChild(fw);}return b;}
function apply(){const fw=document.getElementById("frameWrap"),b=box(),st=document.querySelector(".center .stage"),f=document.getElementById("pv");if(!fw||!b||!st||!f)return;
  const W=state.device==="desktop"?(state.deskW||DEV.desktop):(DEV[state.device]||DEV.desktop);const availW=Math.max(200,st.clientWidth-40);const hint=document.querySelector(".center .hint");
  const availH=Math.max(240,(st.parentElement.clientHeight||window.innerHeight-60)-(hint?hint.offsetHeight+12:0)-40);
  const z=Z.mode==="fit"?Math.min(1,availW/W):Z.z;window.ncZoom=z;
  fw.style.width=W+"px";fw.style.maxWidth="none";fw.style.transform=z===1?"":`scale(${z})`;fw.style.transformOrigin="0 0";
  f.style.height=Math.round(availH/z)+"px";b.style.width=Math.round(W*z)+"px";b.style.height=Math.round(availH)+"px";
  const lab=document.getElementById("zmVal");if(lab)lab.textContent=Math.round(z*100)+" %";const fit=document.getElementById("zmFit");if(fit)fit.classList.toggle("on",Z.mode==="fit");
  document.querySelectorAll("#devSeg [data-dev]").forEach(x=>x.classList.toggle("on",x.dataset.dev===state.device));
  const wd=document.getElementById("zmW");if(wd)wd.value=String(W);
  if(window.NC_EP&&NC_EP.sel&&!apply._in){apply._in=1;window.dispatchEvent(new Event("resize"));apply._in=0;}}
function save(){try{localStorage.setItem("nc_zoom",JSON.stringify(Z));}catch(e){}}
function step(d){const cur=window.ncZoom||1;let i=STEPS.findIndex(s=>s>=cur-.001);if(i<0)i=STEPS.length-1;i=Math.max(0,Math.min(STEPS.length-1,d>0?(STEPS[i]>cur+.001?i:i+1):(STEPS[i]<cur-.001?i:i-1)));Z.mode="manual";Z.z=STEPS[i];save();apply();}
setDevice=function(d){state.device=d;apply();};
function ui(){const c=document.querySelector(".col.center");if(!c||document.getElementById("zmBar"))return;
  c.insertAdjacentHTML("beforeend",`<div class="zm-bar" id="zmBar" role="group" aria-label="Zoom del lienzo">
    <select id="zmW" title="Ancho del escritorio" aria-label="Ancho"><option value="390">Móvil 390</option><option value="768">Tablet 768</option><option value="1280">Escritorio 1280</option><option value="1440">Escritorio 1440</option></select>
    <button type="button" data-zm="-" title="Alejar (Ctrl −)" aria-label="Alejar">−</button><span id="zmVal" aria-live="polite">100 %</span><button type="button" data-zm="+" title="Acercar (Ctrl +)" aria-label="Acercar">+</button>
    <button type="button" id="zmFit" data-zm="fit" title="Ajustar al espacio (Ctrl 0)">Ajustar</button><button type="button" data-zm="1" title="Tamaño real">100 %</button></div>`);
  document.getElementById("zmBar").addEventListener("click",e=>{const b=e.target.closest("[data-zm]");if(!b)return;const a=b.dataset.zm;
    if(a==="+")step(1);else if(a==="-")step(-1);else if(a==="fit"){Z.mode="fit";save();apply();}else if(a==="1"){Z.mode="manual";Z.z=1;save();apply();}});
  document.getElementById("zmW").addEventListener("change",e=>{const v=+e.target.value;if(v>=1280)state.deskW=v;setDevice(v===390?"mobile":v===768?"tablet":"desktop");});}
document.addEventListener("keydown",e=>{if(!(e.ctrlKey||e.metaKey)||e.target.closest("input,textarea,select,[contenteditable]"))return;
  if(e.key==="0"){e.preventDefault();Z.mode="fit";save();apply();}else if(e.key==="+"||e.key==="="){e.preventDefault();step(1);}else if(e.key==="-"){e.preventDefault();step(-1);}});
document.addEventListener("wheel",e=>{if(!(e.ctrlKey||e.metaKey)||!e.target.closest(".col.center"))return;e.preventDefault();step(e.deltaY<0?1:-1);},{passive:false});
window.addEventListener("resize",()=>{if(Z.mode==="fit"&&!apply._in)apply();});
document.addEventListener("DOMContentLoaded",()=>{ui();apply();setTimeout(apply,300);});
window.ncZoomApply=apply;
})();
