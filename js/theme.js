/* ---------- v4.9 · TEMA CLARO / OSCURO DE LA HERRAMIENTA ----------
   Solo cambia la interfaz del builder (paneles, barra, modales); la landing se ve siempre con su marca y su estilo.
   Botón de la barra superior: Oscuro → Claro → Automático (sigue al sistema). Se recuerda en este navegador. */
const NC_THEMES=[["dark","☾","Tema oscuro"],["light","☀","Tema claro"],["auto","◐","Tema automático (según el sistema)"]];
function ncTheme(){const t=document.documentElement.getAttribute("data-theme");return NC_THEMES.some(x=>x[0]===t)?t:"dark";}
function ncSetTheme(t){if(!NC_THEMES.some(x=>x[0]===t))t="dark";document.documentElement.setAttribute("data-theme",t);try{localStorage.setItem("nc_theme",t);}catch(e){}ncThemeBtn();}
function ncThemeBtn(){const b=document.getElementById("btnTheme");if(!b)return;const T=NC_THEMES.find(x=>x[0]===ncTheme());const nx=NC_THEMES[(NC_THEMES.indexOf(T)+1)%NC_THEMES.length];
  b.textContent=T[1];b.title=T[2]+" · clic: "+nx[2].toLowerCase();b.setAttribute("aria-label",T[2]+". Cambiar a "+nx[2].toLowerCase());}
(function(){const b=document.getElementById("btnTheme");if(b)b.addEventListener("click",()=>{const i=NC_THEMES.findIndex(x=>x[0]===ncTheme());ncSetTheme(NC_THEMES[(i+1)%NC_THEMES.length][0]);if(typeof toast==="function")toast(NC_THEMES.find(x=>x[0]===ncTheme())[2]);});ncThemeBtn();})();
