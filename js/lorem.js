/* ---------- LOREM IPSUM ---------- */
const LOREM_W="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat".split(" ");
function lipW(n){let o=[];for(let i=0;i<n;i++)o.push(LOREM_W[Math.floor(Math.random()*LOREM_W.length)]);return o.join(" ");}
function lipTitle(a,b){const n=a+Math.floor(Math.random()*(b-a+1));const s=lipW(n);return s.charAt(0).toUpperCase()+s.slice(1);}
function lipS(a,b){return lipTitle(a,b)+".";}
const LOREM_SKIP=new Set(["links","cols","legal","slots","logos","options","href","url","name","num","suf","pct","end","video","image","logoimg","bgimg","popupImg","focus","pos","overlay","pad","align","width","bg","divider","theme","icon","company","logo","price","priceNote","unit"]);
function isEmojiCell(c){return c.length<=3&&/[^\x00-\x7F]/.test(c);}
function loremLine(l){
  if(l.indexOf("|")>-1){return l.split("|").map(c=>{c=c.trim();if(!c)return c;if(isEmojiCell(c))return c;if(/\d/.test(c))return c;return lipTitle(2,4);}).join(" | ");}
  if(!l.trim())return l;
  const n=l.split(/\s+/).length;
  return n<=4?lipTitle(2,4):lipS(6,12);
}
function loremVal(v){if(!v||typeof v!=="string")return v;return v.indexOf("\n")>-1?v.split("\n").map(loremLine).join("\n"):loremLine(v);}
function fillLorem(){
  if(state.sections.length&&!confirm("¿Rellenar TODOS los textos con Lorem ipsum? (respeta emojis, precios e imágenes)"))return;
  commit();
  state.sections.forEach(s=>{(LIB[s.type].fields||[]).forEach(f=>{
    if(LOREM_SKIP.has(f.k)||f.t==="image"||f.t==="images"||f.t==="select"||f.t==="elements")return;
    if(f.t==="repeater"){arr(s.props[f.k]).forEach(it=>{(f.item||[]).forEach(sf=>{if(LOREM_SKIP.has(sf.k)||sf.t==="image"||sf.t==="select")return;if(typeof it[sf.k]==="string"&&it[sf.k])it[sf.k]=loremVal(it[sf.k]);});});return;}
    if(typeof s.props[f.k]==="string"&&s.props[f.k])s.props[f.k]=loremVal(s.props[f.k]);
  });});
  state.selected=null;renderPreview();renderRight();toast("Textos en Lorem ipsum ✓");
}
