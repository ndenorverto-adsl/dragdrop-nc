/* NC Landing Builder · v5.1 · Importar un sistema de diseño de Claude
   Global → «Importar sistema de diseño». Acepta el .zip del sistema (tokens.json + fonts/ + assets/, con o sin la carpeta
   project/) o los archivos sueltos (tokens.json y, si quieres, fuentes .woff2 y logos). Lee los tokens del formato
   Design System de Claude (listas {name,value,usage}, temas, alias {token}) y, de respaldo, mapas tipo W3C/DTCG.
   Crea la marca editable: colores por papel (primario, acento, texto, secundario, fondo suave, líneas, texto de botón,
   oscuro de base), tipografías (Google Fonts si existe; si no, las fuentes del sistema embebidas), radios de botón y
   tarjeta, logo en cabeceras y pies y favicon. Antes de aplicar enseña qué token va a cada papel. Nada se inventa: si un
   papel no tiene token, se deriva de los que hay y se marca como «derivado». */
(function(){
const DS={};
/* ---------- utilidades ---------- */
const lc=s=>String(s||"").toLowerCase();
const hexOk=v=>/^#[0-9a-f]{6}$/i.test(v||"");
function dsToHex(v){if(!v)return "";v=String(v).trim();if(/^#[0-9a-f]{3}$/i.test(v))return "#"+v.slice(1).split("").map(c=>c+c).join("").toLowerCase();if(hexOk(v))return v.toLowerCase();
  try{const c=document.createElement("canvas");c.width=c.height=1;const x=c.getContext("2d");x.fillStyle="#ffffff";x.fillRect(0,0,1,1);x.fillStyle="#010203";x.fillStyle=v;
    if(x.fillStyle==="#010203"&&!/^#010203$/i.test(v))return "";x.fillRect(0,0,1,1);const d=x.getImageData(0,0,1,1).data;return "#"+[d[0],d[1],d[2]].map(n=>n.toString(16).padStart(2,"0")).join("");}catch(e){return "";}}
function dsLum(h){h=dsToHex(h);if(!h)return 1;const n=parseInt(h.slice(1),16),f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);};return .2126*f(n>>16&255)+.7152*f(n>>8&255)+.0722*f(n&255);}
function dsSat(h){h=dsToHex(h);if(!h)return 0;const n=parseInt(h.slice(1),16),r=(n>>16&255)/255,g=(n>>8&255)/255,b=(n&255)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b);return mx===0?0:(mx-mn)/mx;}
const dsCR=(a,b)=>{const x=dsLum(a),y=dsLum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);};
function dsPx(v){if(v==null)return NaN;if(typeof v==="number")return v;v=String(v).trim();const n=parseFloat(v);if(isNaN(n))return NaN;if(/rem$|em$/.test(v))return n*16;if(/%$/.test(v))return 999;return n;}
const dsFirstFamily=s=>String(s||"").split(",")[0].replace(/["']/g,"").trim();
function dsMix(a,b,t){return typeof ncMixHex==="function"?ncMixHex(a,b,t):a;}

/* ---------- lectura de tokens ---------- */
function dsFlattenMap(obj,pre,out){Object.keys(obj||{}).forEach(k=>{const v=obj[k];if(v&&typeof v==="object"&&("$value" in v||"value" in v)&&typeof (v.$value??v.value)!=="object")out.push({name:(pre?pre+"-":"")+k,value:v.$value??v.value});
  else if(v&&typeof v==="object")dsFlattenMap(v,(pre?pre+"-":"")+k,out);else if(typeof v==="string")out.push({name:(pre?pre+"-":"")+k,value:v});});return out;}
function dsList(fam){if(!fam)return [];if(Array.isArray(fam.tokens))return fam.tokens;if(Array.isArray(fam))return fam;return dsFlattenMap(fam,"",[]);}
function dsColors(T){const C=T.color||T.colors||{};const themes=(C.themes||[]).map(t=>t.id);const first=themes[0]||"light";const list=dsList(C);const by={};list.forEach(t=>by[t.name]=t);
  const raw=t=>{let v=t.value;if(v&&typeof v==="object")v=v[first]??v[Object.keys(v)[0]];return v;};
  const res=(name,d)=>{const t=by[name];if(!t||d>16)return "";let v=raw(t);const m=String(v||"").match(/^\{([^}]+)\}$/);if(m)return res(m[1].replace(/^color\./,"").replace(/\./g,"-"),d+1);return dsToHex(v);};
  return list.map(t=>({name:t.name,hex:res(t.name,0),usage:t.usage||"",alias:(String(raw(t)).match(/^\{([^}]+)\}$/)||[])[1]||""})).filter(t=>t.hex);}
function dsPick(cols,tests,used){for(const fn of tests){const c=cols.find(t=>!used.has(t.name)&&fn(lc(t.name),t));if(c)return c;}return null;}
function dsRoles(T){const cols=dsColors(T),used=new Set(),R={};const set=(k,c,how)=>{if(c){R[k]={hex:c.hex,from:c.name,how:how||"token"};used.add(c.name);}};
  const isOn=n=>/(^|[-_.])on[-_.]|foreground|contrast/.test(n);
  set("bp",dsPick(cols,[n=>/^(color[-_.])?(primary|brand|brand[-_.]primary|primary[-_.](500|base|default|main))$/.test(n),n=>/primary|brand/.test(n)&&!isOn(n)&&!/text|ink|bg|background|surface|border/.test(n),(n,t)=>dsSat(t.hex)>.45&&dsLum(t.hex)>.03&&dsLum(t.hex)<.6],used));
  set("btntext",dsPick(cols,[n=>/on[-_.]?(primary|brand)|primary[-_.](foreground|contrast|text)|button[-_.]text/.test(n)],new Set()));
  set("ink",dsPick(cols,[n=>/^(neutral[-_.])?(ink|text|foreground|fg)$/.test(n),n=>/(^|[-_.])(ink|text|foreground|fg|body|content)([-_.]|$)/.test(n)&&!isOn(n)&&!/muted|secondary|subtle|tertiary|disabled|inverse|light|placeholder/.test(n),(n,t)=>dsLum(t.hex)<.03&&!/border|line/.test(n)],used));
  set("muted",dsPick(cols,[n=>/muted|subtle|tertiary|caption|placeholder|text[-_.]?2|text[-_.]secondary|secondary[-_.]text/.test(n)&&!/bg|background|surface|border/.test(n),(n,t)=>/secondary/.test(n)&&dsSat(t.hex)<.25&&dsLum(t.hex)<.45],used));
  set("ba",dsPick(cols,[n=>/accent|highlight|brand[-_.]?(2|secondary)|tertiary/.test(n)&&!isOn(n),(n,t)=>/secondary/.test(n)&&dsSat(t.hex)>=.25,(n,t)=>dsSat(t.hex)>.45&&(!R.bp||t.hex!==R.bp.hex)&&!/success|error|danger|warning|info/.test(n)],used));
  set("soft",dsPick(cols,[n=>/soft|tint|subtle[-_.]?(bg|background)|(bg|background|surface)[-_.](subtle|soft|muted|alt|2|secondary|50|100)|neutral[-_.](50|100)/.test(n),(n,t)=>/bg|background|surface/.test(n)&&dsLum(t.hex)>.75&&dsLum(t.hex)<.98],used));
  set("line",dsPick(cols,[n=>/border|line|divider|stroke|outline|separator/.test(n)],used));
  const darkest=cols.filter(t=>!/border|line|divider/.test(lc(t.name))).sort((a,b)=>dsLum(a.hex)-dsLum(b.hex))[0];
  set("ink0",dsPick(cols,[n=>/inverse|dark|night|surface[-_.]inverse|neutral[-_.](900|950)/.test(n)&&!/text|on[-_.]/.test(n)],used));
  /* derivados */
  if(!R.bp&&cols[0])R.bp={hex:cols[0].hex,from:cols[0].name,how:"derivado"};if(!R.bp)R.bp={hex:"#2563eb",from:"—",how:"por defecto"};
  if(!R.ink)R.ink=darkest?{hex:darkest.hex,from:darkest.name,how:"derivado (el más oscuro)"}:{hex:"#0f172a",from:"—",how:"por defecto"};
  if(!R.ba)R.ba={hex:R.ink.hex,from:R.ink.from,how:"derivado (no hay acento de color: se usa el texto)"};
  if(!R.muted)R.muted={hex:dsMix(R.ink.hex,"#ffffff",.42),from:R.ink.from,how:"derivado (texto aclarado)"};
  if(!R.soft)R.soft={hex:dsMix(R.bp.hex,"#ffffff",.94),from:R.bp.from,how:"derivado (primario muy claro)"};
  if(!R.line)R.line={hex:dsMix(R.ink.hex,"#ffffff",.88),from:R.ink.from,how:"derivado"};
  if(!R.ink0)R.ink0=darkest&&dsLum(darkest.hex)<.05?{hex:darkest.hex,from:darkest.name,how:"derivado (el más oscuro)"}:{hex:R.ink.hex,from:R.ink.from,how:"derivado"};
  if(!R.btntext){const w=dsCR(R.bp.hex,"#ffffff")>=dsCR(R.bp.hex,R.ink.hex);R.btntext={hex:w?"#ffffff":R.ink.hex,from:w?"blanco":R.ink.from,how:"derivado (el de más contraste)"};}
  return {R,cols};}
function dsType(T){const ty=T.type||T.typography||{};const fam=ty.families||{};const groups=ty.groups||[];
  const stackOf=key=>fam[key]||fam[lc(key)]||key||"";
  const g=re=>groups.find(x=>re.test(lc(x.name)));let head="",body="";
  const gh=g(/t[ií]tul|head|display|title/),gb=g(/text|body|cuerpo|p[aá]rrafo/);
  if(gh)head=dsFirstFamily(stackOf(gh.family||((gh.styles||[])[0]||{}).family));
  if(gb)body=dsFirstFamily(stackOf(gb.family||((gb.styles||[])[0]||{}).family));
  const keys=Object.keys(fam);if(!head)head=dsFirstFamily(fam.display||fam.heading||fam.head||fam.serif||fam.sans||fam[keys[0]]||"");if(!body)body=dsFirstFamily(fam.body||fam.text||fam.sans||fam[keys[0]]||head);
  if(!head&&Array.isArray(ty.fonts)&&ty.fonts[0])head=ty.fonts[0].family;if(!body)body=head;
  return {head,body,fonts:Array.isArray(ty.fonts)?ty.fonts:[]};}
function dsRadius(T){const L=dsList(T.radius||T.radii||T.borderRadius);if(!L.length)return null;const P=L.map(t=>({n:lc(t.name),px:dsPx(t.value)})).filter(t=>!isNaN(t.px));
  const f=re=>P.find(t=>re.test(t.n));const btn=f(/button|btn|control|input|(^|[-_.])(sm|s|small)$/)||P.sort((a,b)=>a.px-b.px)[0];const card=f(/card|surface|container|(^|[-_.])(lg|l|large|md|m)$/)||btn;
  const cl=(v,max)=>v>=999||v>max?max:Math.round(v);return {btn:btn?cl(btn.px,40):null,card:card?cl(card.px,30):null,from:[btn&&btn.n,card&&card.n]};}

/* ---------- archivos ---------- */
const dsMime=n=>/\.svg$/i.test(n)?"image/svg+xml":/\.png$/i.test(n)?"image/png":/\.jpe?g$/i.test(n)?"image/jpeg":/\.webp$/i.test(n)?"image/webp":/\.woff2$/i.test(n)?"font/woff2":/\.woff$/i.test(n)?"font/woff":/\.ttf$/i.test(n)?"font/ttf":/\.otf$/i.test(n)?"font/otf":"application/octet-stream";
const dsB64=buf=>{let s="",b=new Uint8Array(buf);for(let i=0;i<b.length;i+=32768)s+=String.fromCharCode.apply(null,b.subarray(i,i+32768));return btoa(s);};
async function dsReadInputs(files){const F={tokens:null,readme:"",fonts:{},images:{},name:""};
  for(const f of files){
    if(/\.zip$/i.test(f.name)){if(!window.JSZip)throw new Error("No se pudo cargar el lector de .zip");const z=await JSZip.loadAsync(f);F.name=f.name.replace(/\.zip$/i,"");
      for(const p of Object.keys(z.files)){const e=z.files[p];if(e.dir||/(^|\/)(\.|__MACOSX|artifact-type\/)/.test(p))continue;const base=p.split("/").pop();
        if(/(^|\/)tokens\.json$/i.test(p)&&!F.tokens)F.tokens=JSON.parse(await e.async("string"));
        else if(/(^|\/)README\.md$/i.test(p)&&!/components\//.test(p)&&!F.readme)F.readme=await e.async("string");
        else if(/\.(woff2?|ttf|otf)$/i.test(p))F.fonts[base]="data:"+dsMime(base)+";base64,"+(await e.async("base64"));
        else if(/\.(svg|png|jpe?g|webp)$/i.test(p)&&/(^|\/)assets\//.test(p))F.images[p.replace(/^.*?assets\//,"")]="data:"+dsMime(base)+";base64,"+(await e.async("base64"));}}
    else if(/\.json$/i.test(f.name))F.tokens=JSON.parse(await f.text());
    else if(/\.md$/i.test(f.name))F.readme=await f.text();
    else if(/\.(woff2?|ttf|otf)$/i.test(f.name))F.fonts[f.name]="data:"+dsMime(f.name)+";base64,"+dsB64(await f.arrayBuffer());
    else if(/\.(svg|png|jpe?g|webp)$/i.test(f.name))F.images[f.name]="data:"+dsMime(f.name)+";base64,"+dsB64(await f.arrayBuffer());}
  if(!F.tokens)throw new Error("Falta tokens.json (o el .zip del sistema de diseño)");return F;}
function dsLogos(images){const L=Object.keys(images);const isFav=n=>/favicon|icon|isotip|symbol|simbolo|s[ií]mbolo|avatar|mark\b/i.test(n);
  const logos=L.filter(n=>/logo|wordmark|marca|brand/i.test(n)&&!isFav(n.split("/").pop()));const favs=L.filter(n=>isFav(n.split("/").pop()));
  return {logos:logos.length?logos:L.filter(n=>!isFav(n)).slice(0,3),fav:favs[0]||""};}
function dsImgLight(url){return new Promise(res=>{const im=new Image();im.onload=()=>{try{const c=document.createElement("canvas"),w=c.width=Math.min(200,im.naturalWidth||200),h=c.height=Math.max(1,Math.round(w*(im.naturalHeight||50)/(im.naturalWidth||200)));const x=c.getContext("2d");x.drawImage(im,0,0,w,h);
    const d=x.getImageData(0,0,w,h).data;let s=0,n=0;for(let i=0;i<d.length;i+=4){if(d[i+3]<128)continue;s+=(.2126*d[i]+.7152*d[i+1]+.0722*d[i+2])/255;n++;}res(n?s/n>.78:false);}catch(e){res(false);}};im.onerror=()=>res(false);im.src=url;});}

/* ---------- análisis ---------- */
async function dsAnalyze(F){const T=F.tokens,{R,cols}=dsRoles(T),ty=dsType(T),rad=dsRadius(T),lg=dsLogos(F.images);
  const inGoogle=n=>typeof FONTS!=="undefined"&&FONTS.some(f=>lc(f)===lc(n));
  const fontFiles=[];if(ty.fonts.length)ty.fonts.forEach(f=>{const b=String(f.file||"").split("/").pop();if(F.fonts[b])fontFiles.push({name:f.family,url:F.fonts[b],weight:String(f.weight||"100 900"),style:f.style||"normal"});});
  else Object.keys(F.fonts).forEach(b=>fontFiles.push({name:b.replace(/[-_](\d{3}|regular|bold|medium|semibold|light|italic).*$/i,"").replace(/\.(woff2?|ttf|otf)$/i,"").replace(/[-_]+/g," "),url:F.fonts[b],weight:(b.match(/(\d{3})/)||[])[1]||"100 900",style:/italic/i.test(b)?"italic":"normal"}));
  const logo=lg.logos[0]||"",logoUrl=logo?F.images[logo]:"",light=logoUrl?await dsImgLight(logoUrl):false;
  return {name:T.name||F.name||"Sistema de diseño",R,cols,ty,rad,inGoogle,fontFiles,logo,logoUrl,logoLight:light,logos:lg.logos,fav:lg.fav?F.images[lg.fav]:"",favName:lg.fav,F};}

/* ---------- aplicar ---------- */
const DS_ROLE=[["bp","Color primario (botones, enlaces, acentos)"],["ba","Color de acento"],["ink","Texto"],["muted","Texto secundario"],["btntext","Texto de los botones"],["soft","Fondo suave"],["line","Líneas y bordes"],["ink0","Color oscuro de base"]];
function dsApply(a,o){commit();const R=a.R;
  Object.assign(CUSTOM,{bp:R.bp.hex,ba:R.ba.hex,ink:R.ink.hex,muted:R.muted.hex,btntext:R.btntext.hex,soft:R.soft.hex,line:R.line.hex,ink0:R.ink0.hex,name:a.name,shape:true});
  if(a.rad){if(a.rad.btn!=null)CUSTOM.btnr=a.rad.btn;if(a.rad.card!=null)CUSTOM.cardr=a.rad.card;}
  const st=state.settings,files=(Array.isArray(st.fontFiles)?st.fontFiles:[]).filter(f=>!a.fontFiles.some(x=>x.name===f.name));
  const useFile=n=>!a.inGoogle(n)&&a.fontFiles.some(f=>lc(f.name)===lc(n));
  CUSTOM.fhead=a.inGoogle(a.ty.head)?FONTS.find(f=>lc(f)===lc(a.ty.head)):(CUSTOM.fhead||"Inter");CUSTOM.fbody=a.inGoogle(a.ty.body)?FONTS.find(f=>lc(f)===lc(a.ty.body)):(CUSTOM.fbody||"Inter");
  if(useFile(a.ty.head)||useFile(a.ty.body)){st.fontFiles=files.concat(a.fontFiles.filter(f=>useFile(f.name)));if(useFile(a.ty.head))st.fontHead=a.fontFiles.find(f=>lc(f.name)===lc(a.ty.head)).name;if(useFile(a.ty.body))st.fontBody=a.fontFiles.find(f=>lc(f.name)===lc(a.ty.body)).name;}
  else{["fontHead","fontBody"].forEach(k=>{if(st[k]&&!FONTS.includes(st[k])&&!files.some(f=>f.name===st[k]))st[k]="";});}
  if(o.logo&&a.logoUrl){st.dsLogo=a.logoUrl;st.dsLogoLight=a.logoLight;st.dsLogoName=a.name;state.sections.forEach(s=>dsLogoTo(s,true));}
  if(o.fav&&a.fav)st.favicon=a.fav;
  st.dsSource={name:a.name,at:new Date().toISOString().slice(0,10)};
  syncCustom();st.brand="custom";const bt=document.getElementById("brandTop");if(bt){if(typeof brandOptions==="function")bt.innerHTML=brandOptions("custom");bt.value="custom";}
  renderPreview();renderRight();if(typeof renderGlobal==="function")renderGlobal();toast("Marca «"+a.name+"» aplicada desde su sistema de diseño");}
function dsLogoTo(s,force){const st=state.settings;if(!st.dsLogo||!LIB[s.type])return;const d=LIB[s.type].def();if(!("logoImg" in d))return;
  if(force||!s.props.logoImg){s.props.logoImg=st.dsLogo;if("logo" in d&&(!s.props.logo||/\{\{/.test(s.props.logo)))s.props.logo=st.dsLogoName||s.props.logo;
    if(st.dsLogoLight&&/_nav$/.test(s.type)){s.style=Object.assign({},s.style,{bg:"ink"});}}}
/* los bloques nuevos con logo lo heredan */
const _as=addSection;addSection=function(){const before=new Set(state.sections.map(s=>s.id));const r=_as.apply(this,arguments);
  if(state.settings.dsLogo)state.sections.filter(s=>!before.has(s.id)).forEach(s=>{dsLogoTo(s,false);});if(state.settings.dsLogo)renderPreview();return r;};

/* ---------- interfaz ---------- */
function dsModal(a){let ov=document.getElementById("dsOv");if(!ov){ov=document.createElement("div");ov.id="dsOv";ov.className="nc-ov";document.body.appendChild(ov);}
  const sw=h=>`<i class="ds-sw" style="background:${h}"></i>`;const fk=n=>a.inGoogle(n)?"Google Fonts":a.fontFiles.some(f=>lc(f.name)===lc(n))?"archivo del sistema (se embebe)":"no disponible: se mantiene la actual";
  ov.innerHTML=`<div class="nc-ov-box ds-box"><div class="nc-ov-head"><b>Importar «${esc(a.name)}»</b><button class="btn sm ghost" data-ds="x">Cerrar</button></div>
   <p class="help" style="margin:0 0 10px">Así se va a crear la marca editable. Los papeles «derivado» no tienen token propio en el sistema.</p>
   <table class="ds-t"><tbody>${DS_ROLE.map(([k,l])=>{const r=a.R[k];return `<tr><td>${sw(r.hex)}</td><td><b>${esc(l)}</b><small>${esc(r.hex)} · ${esc(r.how==="token"?"token «"+r.from+"»":r.how)}</small></td><td><input type="color" data-dsc="${k}" value="${r.hex}" title="Cambiar"></td></tr>`;}).join("")}
   <tr><td></td><td><b>Tipografía</b><small>Títulos: ${esc(a.ty.head||"—")} (${esc(fk(a.ty.head))}) · Texto: ${esc(a.ty.body||"—")} (${esc(fk(a.ty.body))})</small></td><td></td></tr>
   <tr><td></td><td><b>Radios</b><small>${a.rad?`Botón ${a.rad.btn}px · Tarjeta ${a.rad.card}px`:"Sin tokens de radio: se mantienen los actuales"}</small></td><td></td></tr>
   <tr><td>${a.logoUrl?`<img src="${a.logoUrl}" alt="" class="ds-logo ${a.logoLight?"dk":""}">`:""}</td><td><b>Logo</b><small>${a.logoUrl?esc(a.logo)+(a.logoLight?" · es claro: las cabeceras se pondrán con fondo oscuro":""):"No hay logo en los archivos"}</small></td><td>${a.logoUrl?`<input type="checkbox" id="dsLogo" checked>`:""}</td></tr>
   ${a.fav?`<tr><td><img src="${a.fav}" alt="" class="ds-logo"></td><td><b>Favicon</b><small>${esc(a.favName)}</small></td><td><input type="checkbox" id="dsFav" checked></td></tr>`:""}
   </tbody></table>
   ${a.cols.length?`<details class="ds-all"><summary>Todos los colores del sistema (${a.cols.length})</summary><div>${a.cols.map(c=>`<span title="${esc(c.usage)}">${sw(c.hex)}${esc(c.name)}</span>`).join("")}</div></details>`:""}
   <div class="ds-act"><button class="btn sm ghost" data-ds="x">Cancelar</button><button class="btn sm primary" data-ds="ok">Crear marca y aplicar</button></div></div>`;
  ov.style.display="grid";ov.querySelectorAll("[data-dsc]").forEach(i=>i.addEventListener("input",()=>{a.R[i.dataset.dsc]={hex:i.value,from:"ajuste manual",how:"ajuste manual"};i.closest("tr").querySelector(".ds-sw").style.background=i.value;}));
  ov.onclick=e=>{const b=e.target.closest("[data-ds]");if(e.target===ov||(b&&b.dataset.ds==="x")){ov.style.display="none";return;}
    if(b&&b.dataset.ds==="ok"){const lg=document.getElementById("dsLogo"),fv=document.getElementById("dsFav");dsApply(a,{logo:lg?lg.checked:false,fav:fv?fv.checked:false});ov.style.display="none";}};}
async function dsRun(files){if(!files||!files.length)return;try{const F=await dsReadInputs([...files]);const a=await dsAnalyze(F);dsModal(a);}catch(e){toast("⚠ "+e.message);}}
DS.run=dsRun;DS.analyzeTokens=async T=>dsAnalyze({tokens:T,fonts:{},images:{},name:""});window.NC_DS=DS;
(function(){const css=document.createElement("style");css.textContent=`.ds-box{width:640px}.ds-t{width:100%;border-collapse:collapse}.ds-t td{padding:7px 6px;border-bottom:1px solid var(--line);vertical-align:middle}.ds-t td:first-child{width:52px}
 .ds-t b{display:block;font-size:13px}.ds-t small{display:block;color:var(--muted,#8a93a3);font-size:11.5px}.ds-sw{display:inline-block;width:30px;height:30px;border-radius:8px;border:1px solid var(--line);vertical-align:middle}
 .ds-t input[type=color]{width:34px;height:28px;padding:0;border:0;background:none}.ds-logo{max-width:46px;max-height:30px;display:block;border-radius:4px;padding:3px}.ds-logo.dk{background:#111}
 .ds-all{margin:10px 0;font-size:12px}.ds-all div{display:flex;flex-wrap:wrap;gap:6px 12px;margin-top:8px}.ds-all span{display:flex;align-items:center;gap:6px}.ds-all .ds-sw{width:16px;height:16px;border-radius:4px}
 .ds-act{display:flex;justify-content:flex-end;gap:8px;margin-top:14px}.ds-imp{border:1px dashed var(--line);border-radius:10px;padding:10px;margin:8px 0}.ds-imp.drag{border-color:var(--acc,#7c6cff);background:rgba(124,108,255,.08)}`;document.head.appendChild(css);})();
const _rg=renderGlobal;renderGlobal=function(){_rg.apply(this,arguments);const gf=document.getElementById("globalFields");if(!gf||gf.querySelector("#dsImp"))return;const sel=gf.querySelector("#gBrand");if(!sel)return;const src=state.settings.dsSource;
  sel.closest(".fld").insertAdjacentHTML("afterend",`<div class="ds-imp" id="dsImp"><button type="button" class="btn sm" id="dsBtn">⇣ Importar sistema de diseño</button><input type="file" id="dsFile" multiple accept=".zip,.json,.md,.woff2,.woff,.ttf,.otf,.svg,.png,.jpg,.jpeg,.webp" style="display:none">
    <div class="help">Suelta aquí el .zip del sistema de diseño de Claude (o su <code>tokens.json</code> con fuentes y logos). Crea la marca editable con sus colores, tipografías, radios y logo.${src&&state.settings.brand==="custom"?` <b>Marca actual: ${esc(src.name)} (importada el ${esc(src.at)}).</b>`:""}</div></div>`);
  const box=document.getElementById("dsImp"),fi=document.getElementById("dsFile");document.getElementById("dsBtn").addEventListener("click",()=>fi.click());fi.addEventListener("change",()=>{dsRun(fi.files);fi.value="";});
  ["dragenter","dragover"].forEach(ev=>box.addEventListener(ev,e=>{e.preventDefault();box.classList.add("drag");}));["dragleave","drop"].forEach(ev=>box.addEventListener(ev,e=>{e.preventDefault();box.classList.remove("drag");}));
  box.addEventListener("drop",e=>dsRun(e.dataTransfer.files));};
})();
