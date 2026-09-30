/* Iconos: Lucide (ISC) · https://lucide.dev · inline SVG, sin dependencias */
const NC_ICONS={"phone":"<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\"/>","message-circle":"<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\"/>","mail":"<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"/> <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/>","clock":"<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"M12 6v6l4 2\"/>","timer":"<line x1=\"10\" x2=\"14\" y1=\"2\" y2=\"2\"/> <line x1=\"12\" x2=\"15\" y1=\"14\" y2=\"11\"/> <circle cx=\"12\" cy=\"14\" r=\"8\"/>","check":"<path d=\"M20 6 9 17l-5-5\"/>","star":"<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\"/>","lock":"<rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/> <path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/>","shield-check":"<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\"/> <path d=\"m9 12 2 2 4-4\"/>","arrow-right":"<path d=\"M5 12h14\"/> <path d=\"m12 5 7 7-7 7\"/>","arrow-left":"<path d=\"m12 19-7-7 7-7\"/> <path d=\"M19 12H5\"/>","zap":"<path d=\"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z\"/>","euro":"<path d=\"M4 10h12\"/> <path d=\"M4 14h9\"/> <path d=\"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2\"/>","handshake":"<path d=\"m11 17 2 2a1 1 0 1 0 3-3\"/> <path d=\"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4\"/> <path d=\"m21 3 1 11h-2\"/> <path d=\"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3\"/> <path d=\"M3 4h8\"/>","wrench":"<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z\"/>","house":"<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/> <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/>","building-2":"<path d=\"M10 12h4\"/> <path d=\"M10 8h4\"/> <path d=\"M14 21v-3a2 2 0 0 0-4 0v3\"/> <path d=\"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2\"/> <path d=\"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16\"/>","store":"<path d=\"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5\"/> <path d=\"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244\"/> <path d=\"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05\"/>","house-plus":"<path d=\"M12.35 21H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 .71-1.53l7-6a2 2 0 0 1 2.58 0l7 6A2 2 0 0 1 21 10v2.35\"/> <path d=\"M14.8 12.4A1 1 0 0 0 14 12h-4a1 1 0 0 0-1 1v8\"/> <path d=\"M15 18h6\"/> <path d=\"M18 15v6\"/>","wifi":"<path d=\"M12 20h.01\"/> <path d=\"M2 8.82a15 15 0 0 1 20 0\"/> <path d=\"M5 12.859a10 10 0 0 1 14 0\"/> <path d=\"M8.5 16.429a5 5 0 0 1 7 0\"/>","heart-pulse":"<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"/> <path d=\"M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27\"/>","scale":"<path d=\"M12 3v18\"/> <path d=\"m19 8 3 8a5 5 0 0 1-6 0zV7\"/> <path d=\"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1\"/> <path d=\"m5 8 3 8a5 5 0 0 1-6 0zV7\"/> <path d=\"M7 21h10\"/>","smartphone":"<rect width=\"14\" height=\"20\" x=\"5\" y=\"2\" rx=\"2\" ry=\"2\"/> <path d=\"M12 18h.01\"/>","sparkles":"<path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"/> <path d=\"M20 2v4\"/> <path d=\"M22 4h-4\"/> <circle cx=\"4\" cy=\"20\" r=\"2\"/>","badge-check":"<path d=\"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z\"/> <path d=\"m16 9-5.5 5.5L8 12\"/>","calendar":"<path d=\"M8 2v3\"/> <path d=\"M16 2v3\"/> <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/> <path d=\"M3 9h18\"/>","plug":"<path d=\"M12 22v-5\"/> <path d=\"M15 8V2\"/> <path d=\"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z\"/> <path d=\"M9 8V2\"/>","file-text":"<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/> <path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/> <path d=\"M10 9H8\"/> <path d=\"M16 13H8\"/> <path d=\"M16 17H8\"/>","car":"<path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\"/> <circle cx=\"7\" cy=\"17\" r=\"2\"/> <path d=\"M9 17h6\"/> <circle cx=\"17\" cy=\"17\" r=\"2\"/>","bike":"<circle cx=\"18.5\" cy=\"17.5\" r=\"3.5\"/> <circle cx=\"5.5\" cy=\"17.5\" r=\"3.5\"/> <circle cx=\"15\" cy=\"5\" r=\"1\"/> <path d=\"M12 17.5V14l-3-3 4-3 2 3h2\"/>","heart":"<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"/>","users":"<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/> <path d=\"M16 3.128a4 4 0 0 1 0 7.744\"/> <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/> <circle cx=\"9\" cy=\"7\" r=\"4\"/>","user":"<path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"/> <circle cx=\"12\" cy=\"7\" r=\"4\"/>","briefcase":"<path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/> <rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\"/>","umbrella":"<path d=\"M12 13v7a2 2 0 0 0 4 0\"/> <path d=\"M12 2v2\"/> <path d=\"M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z\"/>","droplets":"<path d=\"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z\"/> <path d=\"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97\"/>","x":"<path d=\"M18 6 6 18\"/> <path d=\"m6 6 12 12\"/>","quote":"<path d=\"M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/> <path d=\"M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z\"/>","gem":"<path d=\"M10.5 3 8 9l4 13 4-13-2.5-6\"/> <path d=\"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z\"/> <path d=\"M2 9h20\"/>","circle-check":"<circle cx=\"12\" cy=\"12\" r=\"10\"/> <path d=\"m16 9-5.5 5.5L8 12\"/>","headphones":"<path d=\"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3\"/>","rocket":"<path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5\"/> <path d=\"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09\"/> <path d=\"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z\"/> <path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05\"/>","gift":"<path d=\"M12 7v14\"/> <path d=\"M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8\"/> <path d=\"M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5\"/> <rect x=\"3\" y=\"7\" width=\"18\" height=\"4\" rx=\"1\"/>","piggy-bank":"<path d=\"M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z\"/> <path d=\"M16 10h.01\"/> <path d=\"M2 8v1a2 2 0 0 0 2 2h1\"/>","lightbulb":"<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/> <path d=\"M9 18h6\"/> <path d=\"M10 22h4\"/>","tv":"<path d=\"m17 2-5 5-5-5\"/> <rect width=\"20\" height=\"15\" x=\"2\" y=\"7\" rx=\"2\"/>","router":"<rect width=\"20\" height=\"8\" x=\"2\" y=\"14\" rx=\"2\"/> <path d=\"M6.01 18H6\"/> <path d=\"M10.01 18H10\"/> <path d=\"M15 10v4\"/> <path d=\"M17.84 7.17a4 4 0 0 0-5.66 0\"/> <path d=\"M20.66 4.34a8 8 0 0 0-11.31 0\"/>","hand-heart":"<path d=\"M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16\"/> <path d=\"m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95\"/> <path d=\"m2 15 6 6\"/> <path d=\"m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91\"/>","map-pin":"<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/> <circle cx=\"12\" cy=\"10\" r=\"3\"/>","hand-helping":"<path d=\"M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14\"/> <path d=\"m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9\"/> <path d=\"m2 13 6 6\"/>","chevron-right":"<path d=\"m9 18 6-6-6-6\"/>","leaf":"<path d=\"M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20\"/> <path d=\"M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13\"/>","sun":"<circle cx=\"12\" cy=\"12\" r=\"4\"/> <path d=\"M12 2v2\"/> <path d=\"M12 20v2\"/> <path d=\"m4.93 4.93 1.41 1.41\"/> <path d=\"m17.66 17.66 1.41 1.41\"/> <path d=\"M2 12h2\"/> <path d=\"M20 12h2\"/> <path d=\"m6.34 17.66-1.41 1.41\"/> <path d=\"m19.07 4.93-1.41 1.41\"/>"};
/* ---------- ICONOS · FOTOS · ESTILOS DE DISEÑO ----------
   · Iconos SVG en línea (Lucide, licencia ISC) en lugar de emojis.
   · Fotos libres (Unsplash, licencia Unsplash) + ilustración SVG propia cuando no hay foto.
   · Estilos de diseño: capa global que cambia tipografía, formas, profundidad y fondos de
     las familias A/B/C sin tocar los colores de la marca.
*/
function ncIco(n,cls){const b=NC_ICONS[n];if(!b)return "";return `<svg class="nci${cls?' '+cls:''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${b}</svg>`;}
/* emoji → icono (compatibilidad con textos que ya traen emojis) */
const NC_EMOJI={"⚡":"zap","💶":"euro","💰":"piggy-bank","🤝":"handshake","🛠":"wrench","🔧":"wrench","🏠":"house","🏡":"house-plus","🏢":"building-2","🏪":"store","📞":"phone","☎":"phone","💬":"message-circle","✉":"mail","📧":"mail","🔒":"lock","🛡":"shield-check","✅":"circle-check","✓":"check","⭐":"star","📶":"wifi","📱":"smartphone","💡":"lightbulb","❤":"heart","⚖":"scale","🕐":"clock","⏱":"timer","🚀":"rocket","🎁":"gift","🔌":"plug","📄":"file-text","🚗":"car","🏍":"bike","👫":"users","👨":"user","👩":"user","👧":"user","👵":"hand-heart","🙋":"user","💼":"briefcase","📺":"tv","💧":"droplets","☀":"sun","🌱":"leaf","📅":"calendar","🎧":"headphones","📍":"map-pin"};
function ncSplitEmoji(s){s=String(s||"");const m=s.match(/^\s*([←-⯿☀-➿]|[\uD83C-\uDBFF][\uDC00-\uDFFF])[️‍]*\s*/);
  if(!m)return {ico:"",text:s};const ico=NC_EMOJI[m[1]]||"";return ico?{ico,text:s.slice(m[0].length)}:{ico:"",text:s};}
/* icono para un campo "icono": nombre de Lucide o emoji; si no se reconoce, se muestra el texto tal cual */
function ncIconOrText(v,cls){v=String(v||"").trim();if(NC_ICONS[v])return ncIco(v,cls);const e=ncSplitEmoji(v);if(e.ico&&!e.text)return ncIco(e.ico,cls);return esc(v);}
/* ✓ / ✗ al principio de una celda o línea */
function ncMark(s){s=String(s||"");const m=s.match(/^\s*(✓|✔|✗|✕|×)\s*/);if(!m)return esc(s);return (/[✓✔]/.test(m[1])?ncIco("check","ok"):ncIco("x","no"))+esc(s.slice(m[0].length));}

/* Fotos libres (Unsplash License: uso comercial gratuito, sin atribución obligatoria) */
const NC_PHOTOS=["photo-1758876023053-3aa541a0935b","photo-1758273705867-c7d3d0eac839","photo-1646807006787-84f8e2b8aa26","photo-1758598304346-1b01479f681a","photo-1556566370-56b798c0d15a"];
function ncPhotoUrl(id,w){return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w||1400}&q=70`;}
const NC_ILLUS=[["auto","Según el sector"],["wifi","Router y tarifa (telco)"],["bolt","Factura de luz (energía)"],["shield","App de alarma (seguridad)"],["umbrella","Póliza (seguros)"],["heart","Tarjeta y cita (salud)"],["scale","Expediente (legal)"],["water","Agua filtrada"],["spark","Tipográfico (precio o titular)"]];
const NC_VIS=[["auto","Automático (foto si hay; si no, mockup)"],["mock","Mockup del producto"],["photo","Foto"],["type","Solo tipografía"],["none","Sin imagen"]];
const NC_FX=[["natural","Natural"],["duo","Duotono con el color de la marca"],["bw","Blanco y negro"],["warm","Cálido"]];
/* Mockups de producto dibujados en HTML/CSS con los datos de la propia landing (nada inventado: sin datos → etiqueta genérica o hueco) */
function ncMock(kind,p){const ck=v4L(p.checks||"").slice(0,3),pr=p.price||"",un=p.priceUnit||"";
  const opts=v4C(p.options||"").filter(Boolean).slice(0,4).map(o=>ncSplitEmoji(o).text||o);
  const li=a=>a.map(c=>`<li>${ncIco("check")}<span>${esc(c)}</span></li>`).join("");
  const bars=[42,36,30,28,30,38,52,70,82,74,60,48,40,38,44,58,76,92,100,88,72,60,52,46].map((h,i)=>`<i style="height:${h}%" class="${h<45?'lo':h>80?'hi':''}"></i>`).join("");
  switch(kind){
    case "wifi":return `<div class="mk mk-tel"><div class="mk-sheet"><span class="mk-lbl">Tu tarifa</span>${pr?`<b class="mk-price">${esc(pr)}<small>${esc(un)}</small></b>`:""}<ul class="mk-list">${li(ck)}</ul></div>
      <div class="mk-router" aria-hidden="true"><span class="ant a"></span><span class="ant b"></span><span class="body"><span class="led on"></span><span class="led on"></span><span class="led"></span><span class="led on"></span></span></div><span class="mk-wave" aria-hidden="true">${ncIco("wifi")}</span></div>`;
    case "bolt":return `<div class="mk mk-bill"><div class="mk-sheet mk-paper"><div class="mk-head"><b>Factura de luz</b>${ncIco("zap")}</div>
      ${pr?`<div class="mk-big"><span>Precio</span><b>${esc(pr)}</b><small>${esc(un)}</small></div>`:""}<div class="mk-chart" aria-hidden="true">${bars}</div><div class="mk-axis"><span>0 h</span><span>12 h</span><span>24 h</span></div><ul class="mk-list">${li(ck)}</ul></div></div>`;
    case "shield":return `<div class="mk mk-app"><div class="mk-phone"><div class="mk-scr"><div class="mk-status"><span class="dot"></span>Sistema armado</div><div class="mk-shield">${ncIco("shield-check")}</div>
      <div class="mk-seg"><span class="on">Total</span><span>Parcial</span><span>Desarmar</span></div><ul class="mk-zones">${(opts.length?opts:["Entrada","Salón","Ventanas"]).slice(0,3).map(z=>`<li>${ncIco("house")}<span>${esc(z)}</span><i>OK</i></li>`).join("")}</ul></div></div></div>`;
    case "umbrella":return `<div class="mk mk-doc"><div class="mk-sheet mk-paper"><div class="mk-head"><b>Tu póliza</b>${ncIco("umbrella")}</div><div class="mk-field"><span>Tomador</span><i></i></div><div class="mk-field"><span>Vigencia</span><i></i></div>
      <div class="mk-sub">${opts.length?"Tipo":"Coberturas"}</div><ul class="mk-list">${li(opts.length?opts.slice(0,3):ck)}</ul><span class="mk-seal">${ncIco("badge-check")}</span></div></div>`;
    case "heart":return `<div class="mk mk-health"><div class="mk-card"><span class="chip"></span><b>Tarjeta sanitaria</b><span class="num">•••• •••• •••• 0000</span><span class="nm">NOMBRE APELLIDO</span></div>
      <div class="mk-bub">${ncIco("calendar")}<span><b>Cita confirmada</b><small>Especialista</small></span></div></div>`;
    case "scale":return `<div class="mk mk-doc mk-legal"><div class="mk-sheet mk-paper"><div class="mk-head"><b>Expediente</b>${ncIco("scale")}</div><span class="mk-stamp">En estudio</span>
      <ol class="mk-tl"><li class="ok">Recepción del caso</li><li class="ok">Estudio gratuito</li><li class="now">Reclamación</li><li>Resolución</li></ol></div></div>`;
    case "water":return `<div class="mk mk-water"><div class="mk-glass"><i class="lvl"></i><i class="shine"></i></div><div class="mk-sheet mk-mini">${ncIco("droplets")}<span><b>Agua filtrada</b><small>Directa del grifo</small></span></div></div>`;
    default:return ncTypeVis(p);}
}
function ncTypeVis(p){const pr=p.price||"",t=p.highlight||p.italic||p.gradient||p.headline||"";
  return `<div class="mk mk-type">${pr?`<b>${esc(pr)}</b><small>${esc(p.priceUnit||"")}</small>`:`<b class="w">${esc(t)}</b>`}</div>`;}
/* Bloque visual del hero: foto, mockup o composición tipográfica + adornos que activa cada estilo */
function ncVisual(p){const v=p.vis||"auto";if(v==="none")return "";
  const kind=p.illus&&p.illus!=="auto"?p.illus:(p.sector||"spark");let inner,cls;
  if((v==="auto"||v==="photo")&&p.img){inner=`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||'')}" class="nc-vis-img" fetchpriority="high">`;cls="is-photo nc-fx-"+(p.photoFx||"natural");}
  else if(v==="type"){inner=ncTypeVis(p);cls="is-mock is-type";}
  else{inner=ncMock(kind,p);cls="is-mock"+(kind==="spark"?" is-type":"");}
  const b=p.badge?v4C(p.badge):null;
  const stk=p.price&&!/is-type/.test(cls)?`<span class="nc-stk"><b>${esc(p.price)}</b><small>${esc(p.priceUnit||"")}</small></span>`:"";
  return `<div class="nc-vis-wrap"><div class="nc-vis ${cls}">${inner}</div>${stk}${b&&b[0]?`<div class="nc-float">${ncIco("star")}<span><b>${esc(b[0])}</b>${b[1]?`<small>${esc(b[1])}</small>`:""}</span></div>`:""}</div>`;}

/* ===== ESTILOS DE DISEÑO ===== */
const LOOKS={
  base:{name:"Base",desc:"El diseño original de cada dirección (A/B/C).",best:"Cualquiera",sample:["#ffffff","var(--bp)","#312937"]},
  editorial:{name:"Editorial",desc:"Serif elegante, papel, reglas finas y foto en arco.",best:"Seguros, salud, legal",head:"Instrument Serif",body:"Inter",mono:"JetBrains Mono",hw:400,sample:["#F6F1E8","#1c1a17","#c2410c"]},
  swiss:{name:"Swiss grid",desc:"Rejilla recta, mayúsculas potentes y bloques de color planos.",best:"Telco, energía, ofertas",head:"Inter Tight",body:"Inter",hw:900,sample:["#ffffff","#0b0b0c","#2b50ff"]},
  brutal:{name:"Brutalista táctil",desc:"Bordes gruesos, sombras duras y pegatinas.",best:"Telco joven, promos",head:"Space Grotesk",body:"Space Grotesk",mono:"IBM Plex Mono",hw:700,sample:["#F3F0E7","#111111","#d4ff3f"]},
  cuaderno:{name:"Cuaderno anotado",desc:"Libreta con renglones, rotulador, cinta adhesiva y notas a mano.",best:"Telco, hogar, marcas cercanas",head:"Bricolage Grotesque",body:"DM Sans",hand:true,hw:800,sample:["#FBF8F1","#3b82f6","#fff38a"]},
  prensa:{name:"Prensa",desc:"Periódico: serif de titular, filetes, capitular y cupón recortable.",best:"Energía, seguros, legal, noticias de oferta",head:"Newsreader",body:"Newsreader",mono:"Inter Tight",hw:700,sample:["#F3F0E8","#111111","#b91c1c"]},
  papel:{name:"Papel y sello",desc:"Collage de papel: etiquetas, ticket troquelado, sello de tinta y bordes rasgados.",best:"Promociones, salud, agua, local",head:"Archivo",body:"Archivo",mono:"IBM Plex Mono",hand:true,hw:800,sample:["#ECE2D0","#FBF7EF","#c2410c"]},
  retro:{name:"Retro cálido",desc:"Pills, sello de estrella, tramas de puntos y colores cálidos.",best:"Promociones, campañas estacionales",head:"Syne",body:"DM Sans",hw:800,sample:["#FFF4E6","#2b1a12","#ff5a1f"]},
  lux:{name:"Minimal lujo",desc:"Serif fina, foto a sangre en blanco y negro y mucho aire.",best:"Marcas premium, alto ticket",head:"Cormorant Garamond",body:"Inter",hw:300,hwBrand:500,sample:["#0e0e0e","#f7f6f3","#b89b5e"]}
};
const LOOK_ORDER=["base","editorial","prensa","swiss","brutal","cuaderno","papel","retro","lux"];
const LOOK_ALIAS={aurora:"lux",organic:"cuaderno",corporate:"prensa"}; /* estilos retirados en v3.6 */
const NC_SERIF_LOOK=["Instrument Serif","Cormorant Garamond","Newsreader"];
function ncLook(){let k=state.settings.look;if(LOOK_ALIAS[k])k=LOOK_ALIAS[k];return LOOKS[k]?k:"base";}
function ncLookUsesFont(){return ncLook()!=="base"&&!state.settings.lookBrandFont;}
function ncLookFonts(){const L=LOOKS[ncLook()],hand=(state.settings.hand!==false&&state.settings.annot!==false)||L.hand?["Caveat"]:[];if(!ncLookUsesFont())return hand;return [L.head,L.body,L.mono,...hand].filter(Boolean);}
function ncLookFontVars(){if(!ncLookUsesFont())return "";const L=LOOKS[ncLook()];const q=n=>`'${n}',${NC_SERIF_LOOK.includes(n)?'Georgia,serif':'system-ui,sans-serif'}`;
  return `:root{--fhead:${q(L.head)};--fbody:${q(L.body)};${L.mono?`--fmono:'${L.mono}',ui-monospace,monospace;`:''}}`;}
/* ¿Qué composición usa un hero? "auto" = foto protagonista en cualquier estilo que no sea Base */
function ncHeroLayout(p){const l=p.layout||"auto";return l==="auto"?(ncLook()==="base"?"std":"photo"):l;}

/* Grupos de selectores comunes a las tres familias */
const LKG={
  hero:".da-hero,.db-hero",h1:".da-h1,.db-h1,.dc-h1",h2:".da-h2,.db-h2,.dc-h2,.da-ctab h2,.db-ctabox h2",
  h3:".da-plan h3,.da-ben h3,.db-step h3,.dc-tile h3,.da-card h2,.db-form h2",
  mark:".da-h1 mark,.db-h1 em",
  btn:".da-btn,.da-call,.da-go,.da-bigcall,.da-bigwa,.db-go,.db-chan,.dc-pill,.dc-go",
  card:".da-card,.da-plan,.da-ben,.db-form,.db-rev,.db-compare,.dc-tile,.dc-kpi",
  input:".da .form-control,.db .form-control",
  kick:".da-eyebrow,.db-kicker",
  sec:".da-sec,.db-sec,.dc-sec,.da-trust,.db-seals,.dc-logos",
  nav:".da-nav,.db-nav",
  num:".da-price .p,.da-plan .pp,.dc-tile .big,.dc-kpi b,.da-trust .it b,.db-proof b"
};
function lkS(g,suf){return (LKG[g]||g).split(",").map(s=>"& "+s.trim()+(suf||"")).join(",");}

function ncLookCSS(){
  const k=ncLook();if(k==="base")return "";
  const L=LOOKS[k],own=ncLookUsesFont();
  const hw=own?L.hw:(L.hwBrand||(L.hw<500?600:L.hw>800?800:L.hw));
  const onBa=ncLum(ncBrandAccent())>.5?"var(--bink)":"#fff";
  const css=(LOOK_CSS[k]||(()=>""))({hw,own,onBa});
  const mh={editorial:1.1,swiss:.96,retro:.84,lux:1.12,prensa:1.06}[k]||1;
  return ":root{--ink0:var(--bink)}"+(`body.lk-${k}{--lk-hw:${hw};--lkmh:${own?mh:1}}`+css).replace(/&/g,"body.lk-"+k);
}
function ncBrandAccent(){const b=BRANDS[state.settings.brand]||{};const m=String(b.vars||"").match(/--ba:\s*([^;]+)/);return m?m[1].trim():"#C1FF33";}

/* Composición "foto protagonista" + ilustración: se incluye siempre que haya un bloque v4 (también en Base) */
function ncHxCSS(){return `
:root{--ink0:var(--bink)}
.nci{width:1.1em;height:1.1em;flex:0 0 auto;display:inline-block;vertical-align:-.16em}
.nc-hx{overflow-x:clip}
.nc-hx .nc-hx-form{margin-top:26px;max-width:540px}
.nc-hx .nc-hx-form .da-inline .nc-legal,.nc-hx .nc-hx-form .da-inline .nc-legal-info{color:var(--bmuted)}
.nc-hx .nc-hx-alt{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;margin-top:16px;font-size:14.5px}
.nc-hx .nc-hx-alt a{color:var(--bink);font-weight:600;text-decoration:none;display:inline-flex;gap:8px;align-items:center;border-bottom:1.5px solid color-mix(in srgb,var(--bp) 50%,transparent);padding-bottom:2px}
.nc-hx .nc-hx-big{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.nc-hx .nc-hx-or{font-size:13px;color:var(--bmuted);margin:16px 0 8px}
/* ---- visual ---- */
.nc-vis-wrap{position:relative;isolation:isolate}
.nc-vis{position:relative;overflow:hidden;aspect-ratio:4/5;max-height:600px;width:100%;border-radius:var(--visr,20px);container-type:inline-size;background:var(--visbg,color-mix(in srgb,var(--bp) 9%,var(--bsoft)))}
.nc-vis.is-photo{box-shadow:0 30px 60px -34px color-mix(in srgb,var(--ink0) 55%,transparent)}
.nc-vis>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.nc-fx-duo>img,.nc-fx-bw>img{filter:grayscale(1) contrast(1.08)}
.nc-fx-duo::after{content:"";position:absolute;inset:0;background:var(--bp);mix-blend-mode:color;opacity:.9;pointer-events:none}
.nc-fx-warm>img{filter:sepia(.28) saturate(1.1) contrast(1.02)}
.nc-vis.is-mock::before{content:"";position:absolute;width:78%;aspect-ratio:1;border-radius:50%;right:-18%;top:-14%;background:var(--visdeco,color-mix(in srgb,var(--bp) 22%,transparent))}
.nc-vis.is-mock{display:grid;place-items:center}
/* ---- mockups (escalan con el ancho del contenedor) ---- */
.mk{position:relative;z-index:1;font-size:clamp(10px,3.6cqw,16px);color:var(--mktx,var(--ink0));font-family:var(--fbody);width:78%;text-align:left}
.mk b{font-family:var(--fhead)}
.mk-sheet{background:var(--mkbg,#fff);border:var(--mkb,1px solid color-mix(in srgb,var(--ink0) 10%,transparent));border-radius:var(--mkr,16px);box-shadow:var(--mksh,0 24px 50px -24px color-mix(in srgb,var(--ink0) 45%,transparent));padding:1.4em 1.4em 1.2em}
.mk-lbl{display:block;font-size:.72em;letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-bottom:.4em}
.mk-price{display:block;font-size:3.1em;line-height:1;letter-spacing:-.04em;font-weight:800;overflow-wrap:anywhere}.mk-price small{font-size:.32em;letter-spacing:0;margin-left:.2em;font-weight:600;opacity:.7}
.mk-list{list-style:none;padding:0;margin:1em 0 0;display:grid;gap:.55em;font-size:.92em}.mk-list li{display:flex;gap:.6em;align-items:flex-start}.mk-list .nci{color:var(--bpt,var(--bp));margin-top:.1em}
.mk-tel{padding-bottom:3.6em}.mk-tel .mk-sheet{width:78%;transform:rotate(-2deg)}
.mk-router{position:absolute;right:-4%;bottom:0;width:58%}.mk-router .body{display:flex;gap:.55em;align-items:center;justify-content:center;height:3.4em;border-radius:.8em;background:var(--mkdev,#1d1d22);box-shadow:0 18px 30px -14px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.12)}
.mk-router .led{width:.5em;height:.5em;border-radius:50%;background:#44474f}.mk-router .led.on{background:var(--ba);box-shadow:0 0 .6em var(--ba)}
.mk-router .ant{position:absolute;bottom:3em;width:.45em;height:3.4em;border-radius:.3em;background:var(--mkdev,#1d1d22)}.mk-router .ant.a{left:14%;transform:rotate(-10deg)}.mk-router .ant.b{right:14%;transform:rotate(10deg)}
.mk-wave{position:absolute;right:12%;bottom:6.4em;font-size:2.4em;color:var(--bp)}
.mk-paper{position:relative}.mk-head{display:flex;justify-content:space-between;align-items:center;gap:1em;padding-bottom:.8em;margin-bottom:.9em;border-bottom:1px dashed color-mix(in srgb,var(--ink0) 22%,transparent)}.mk-head b{font-size:1.05em}.mk-head .nci{color:var(--bp);font-size:1.3em}
.mk-big{display:flex;align-items:baseline;gap:.5em;flex-wrap:wrap}.mk-big span{font-size:.8em;opacity:.65}.mk-big b{font-size:2.3em;letter-spacing:-.03em;line-height:1;overflow-wrap:anywhere}.mk-big small{opacity:.7}
.mk-chart{display:flex;align-items:flex-end;gap:2.5%;height:5.5em;margin-top:1em}.mk-chart i{flex:1;border-radius:.2em .2em 0 0;background:color-mix(in srgb,var(--ink0) 16%,transparent)}.mk-chart i.lo{background:var(--bp)}.mk-chart i.hi{background:color-mix(in srgb,var(--ink0) 32%,transparent)}
.mk-axis{display:flex;justify-content:space-between;font-size:.66em;opacity:.55;margin-top:.35em;font-family:var(--fmono,var(--fbody))}
.mk-bill .mk-sheet{transform:rotate(1.5deg)}
.mk-app{width:58%}.mk-phone{background:var(--mkdev,#15151a);border-radius:2.2em;padding:.55em;box-shadow:0 30px 60px -24px rgba(0,0,0,.55)}
.mk-scr{background:var(--mkbg,#fff);border-radius:1.75em;padding:1.4em 1em 1.1em;display:flex;flex-direction:column;align-items:center;gap:.9em}
.mk-status{display:inline-flex;gap:.5em;align-items:center;font-size:.8em;font-weight:600;background:color-mix(in srgb,#16a34a 12%,transparent);color:#15803d;border-radius:99px;padding:.35em .8em}.mk-status .dot{width:.55em;height:.55em;border-radius:50%;background:#16a34a}
.mk-shield{font-size:3.4em;color:var(--bp);line-height:1}
.mk-seg{display:flex;width:100%;background:color-mix(in srgb,var(--ink0) 7%,transparent);border-radius:.8em;padding:.25em;font-size:.72em;font-weight:600}.mk-seg span{flex:1;text-align:center;padding:.5em 0;border-radius:.6em;opacity:.7}.mk-seg .on{background:var(--mkbg,#fff);opacity:1;box-shadow:0 2px 6px rgba(0,0,0,.08)}
.mk-zones{list-style:none;padding:0;margin:0;width:100%;display:grid;gap:.4em;font-size:.8em}.mk-zones li{display:flex;align-items:center;gap:.6em;padding:.55em .6em;border-radius:.7em;background:color-mix(in srgb,var(--ink0) 4%,transparent)}.mk-zones li span{flex:1}.mk-zones i{font-style:normal;font-size:.85em;color:#15803d;font-weight:700}.mk-zones .nci{color:var(--bp)}
.mk-field{display:flex;align-items:center;gap:.8em;font-size:.8em;margin:.55em 0}.mk-field span{width:5.5em;opacity:.6}.mk-field i{flex:1;height:.55em;border-radius:.3em;background:color-mix(in srgb,var(--ink0) 9%,transparent)}
.mk-sub{font-size:.72em;letter-spacing:.12em;text-transform:uppercase;opacity:.6;margin-top:1.1em}
.mk-seal{position:absolute;right:-.7em;bottom:-.7em;width:3.2em;height:3.2em;border-radius:50%;display:grid;place-items:center;background:var(--bp);color:var(--btntext,#fff);font-size:1.1em;box-shadow:0 10px 20px -8px color-mix(in srgb,var(--bp) 70%,transparent)}
.mk-doc .mk-sheet{transform:rotate(-1.5deg)}
.mk-stamp{position:absolute;right:1.2em;top:3.4em;border:2px solid var(--bp);color:var(--bp);font:800 .78em/1 var(--fhead);letter-spacing:.14em;text-transform:uppercase;padding:.45em .7em;border-radius:.3em;transform:rotate(8deg);opacity:.85}
.mk-tl{list-style:none;padding:0;margin:3em 0 0;display:grid;gap:.8em;font-size:.86em;counter-reset:t}.mk-tl li{display:flex;gap:.7em;align-items:center;opacity:.55}.mk-tl li::before{content:"";width:.8em;height:.8em;border-radius:50%;border:2px solid currentColor;flex:0 0 auto}.mk-tl li.ok,.mk-tl li.now{opacity:1}.mk-tl li.ok::before{background:var(--bp);border-color:var(--bp)}.mk-tl li.now{font-weight:700}.mk-tl li.now::before{border-color:var(--bp);box-shadow:0 0 0 .25em color-mix(in srgb,var(--bp) 25%,transparent)}
.mk-health{padding-bottom:4em}.mk-card{aspect-ratio:1.6;border-radius:var(--mkr,16px);padding:1.2em 1.3em;display:flex;flex-direction:column;gap:.3em;justify-content:flex-end;color:var(--btntext,#fff);background:linear-gradient(135deg,var(--bp),color-mix(in srgb,var(--bp) 55%,var(--ink0)));box-shadow:0 24px 44px -20px color-mix(in srgb,var(--bp) 70%,transparent);position:relative;transform:rotate(-3deg)}
.mk-card .chip{position:absolute;left:1.3em;top:1.3em;width:2.4em;height:1.8em;border-radius:.35em;background:linear-gradient(135deg,#e9d7a0,#b99a4c)}.mk-card b{position:absolute;right:1.3em;top:1.25em;font-size:.82em;opacity:.9}
.mk-card .num{font-family:var(--fmono,ui-monospace,monospace);letter-spacing:.08em;font-size:.95em}.mk-card .nm{font-size:.7em;letter-spacing:.14em;opacity:.8}
.mk-bub{position:absolute;right:-6%;bottom:0;display:flex;gap:.7em;align-items:center;background:var(--mkbg,#fff);border:var(--mkb,1px solid color-mix(in srgb,var(--ink0) 10%,transparent));border-radius:var(--mkr,16px);padding:.8em 1em;box-shadow:var(--mksh,0 20px 40px -20px color-mix(in srgb,var(--ink0) 45%,transparent));font-size:.9em}
.mk-bub .nci{font-size:1.6em;color:var(--bp)}.mk-bub b{display:block}.mk-bub small{opacity:.6}
.mk-water{width:70%;display:flex;flex-direction:column;align-items:center}.mk-glass{width:48%;aspect-ratio:.72;border:3px solid color-mix(in srgb,var(--ink0) 18%,transparent);border-top-width:0;border-radius:0 0 1.2em 1.2em;position:relative;overflow:hidden;background:rgba(255,255,255,.35)}
.mk-glass .lvl{position:absolute;left:0;right:0;bottom:0;height:68%;background:linear-gradient(180deg,color-mix(in srgb,var(--bp) 35%,#fff),color-mix(in srgb,var(--bp) 65%,#fff))}.mk-glass .shine{position:absolute;left:14%;top:10%;bottom:10%;width:10%;border-radius:1em;background:rgba(255,255,255,.55)}
.mk-mini{display:flex;gap:.8em;align-items:center;margin-top:-1.4em;padding:.9em 1.1em}.mk-mini .nci{font-size:1.7em;color:var(--bp)}.mk-mini b{display:block}.mk-mini small{opacity:.6}
.mk-type{width:86%;text-align:left;color:var(--mktx,var(--ink0))}.mk-type b{display:block;font-size:6.2em;line-height:.9;letter-spacing:-.05em;font-weight:var(--lk-hw,800);overflow-wrap:anywhere}.mk-type b.w{font-size:3.6em;line-height:.98}.mk-type small{display:block;font-size:1.3em;margin-top:.4em;opacity:.7}
.nc-vis.is-type{background:var(--visbg-t,var(--bp))}.nc-vis.is-type .mk-type{color:var(--btntext,#fff)}.nc-vis.is-type::before{background:color-mix(in srgb,#fff 14%,transparent)}
/* ---- sello de precio (lo activan Brutalista y Retro) y sello flotante ---- */
.nc-stk{display:none}
.nc-float{position:absolute;left:-22px;bottom:34px;z-index:2;display:flex;gap:10px;align-items:center;background:#fff;color:var(--ink0);border-radius:16px;padding:12px 16px;box-shadow:0 18px 40px -12px color-mix(in srgb,var(--ink0) 40%,transparent);max-width:78%}
.nc-float .nci{width:34px;height:34px;padding:8px;border-radius:11px;background:color-mix(in srgb,var(--bp) 12%,#fff);color:var(--bp)}
.nc-float b{display:block;font:800 18px/1.1 var(--fhead)}.nc-float small{display:block;color:#6b6472;font-size:12.5px;line-height:1.3}
.db-hero.nc-hx .nc-vis{aspect-ratio:16/11;max-height:330px}.db-hero.nc-hx .db-form{position:relative;z-index:2;margin:-84px 18px 0}
.dc-hero.nc-hx{text-align:left}.dc-hero.nc-hx .dc-h1,.dc-hero.nc-hx .dc-sub{margin-left:0}.dc-hero.nc-hx .dc-formbar{margin-left:0}.dc-hero.nc-hx .dc-alt{justify-content:flex-start}.dc-hero.nc-hx .dc-kpis{margin-left:0}.dc-hero.nc-hx .dc-h1{font-size:clamp(38px,5vw,70px)}
.nc-phone{width:300px;max-width:100%;aspect-ratio:9/19;margin:0 auto;border-radius:44px;padding:12px;background:linear-gradient(160deg,#2a2a3a,#111118);box-shadow:0 40px 90px color-mix(in srgb,var(--bp) 35%,transparent),inset 0 0 0 1px rgba(255,255,255,.14);transform:rotate(-4deg)}
.nc-phone .scr{height:100%;border-radius:34px;overflow:hidden;position:relative;background:linear-gradient(180deg,color-mix(in srgb,var(--bp) 18%,#101018),#0b0b14);padding:26px 18px;display:flex;flex-direction:column;gap:12px;color:#fff;text-align:left}
.nc-phone .scr>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.nc-phone .big{font:800 40px/1 var(--fhead);letter-spacing:-.04em;overflow-wrap:anywhere}.nc-phone .lb{font-size:12px;opacity:.6}
.nc-phone .ln{height:9px;border-radius:9px;background:rgba(255,255,255,.1)}
.nc-phone .bars{display:flex;gap:6px;align-items:flex-end;height:110px;margin-top:auto}.nc-phone .bars i{flex:1;border-radius:6px;background:linear-gradient(180deg,var(--bp),color-mix(in srgb,var(--ba) 40%,transparent))}
.nc-phone .tile{border-radius:14px;padding:11px 12px;display:flex;justify-content:space-between;gap:8px;font-size:12.5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}.nc-phone .tile b{color:color-mix(in srgb,var(--ba) 70%,#fff);overflow-wrap:anywhere}
@media (prefers-reduced-motion:no-preference){.nc-vis-wrap{animation:ncUp .9s .1s cubic-bezier(.2,.7,.2,1) both}@keyframes ncUp{from{transform:translateY(16px)}}}
@media (max-width:991px){.nc-vis{aspect-ratio:4/3;max-height:360px}.nc-float{left:10px;bottom:-18px}
  .db-hero.nc-hx .db-form{margin:0}.dc-hero.nc-hx .nc-phone-col{display:none}}
@media (max-width:575px){.nc-float{padding:9px 12px}.nc-float b{font-size:16px}.nc-vis{aspect-ratio:1/1;max-height:none}}`;}

/* CSS de cada estilo. "&" = body.lk-<estilo>. Los colores salen siempre de la marca (--bp, --ba, --bink). */
const LOOK_CSS={
editorial:o=>`
&{--lkp:color-mix(in srgb,var(--bsoft) 22%,#F6F1E8);--dline:color-mix(in srgb,var(--bink) 16%,#F6F1E8);background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab,& .dc-sec{background:var(--lkp)!important}
& .da-sec.soft,& .db-sec.soft{background:color-mix(in srgb,var(--bink) 4%,var(--lkp))!important}
& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--dline)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.02em;line-height:1}
& .da-h1,& .db-h1{font-size:clamp(42px,5.8vw,82px)}
${lkS('mark')}{background:none;color:var(--bpt);font-style:italic;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.01em;line-height:1.04}& .da-h2,& .db-h2{font-size:clamp(32px,4vw,52px)}
${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.01em}& .da-ben h3,& .db-step h3,& .dc-tile h3{font-size:26px}
${lkS('kick')}{font:500 11.5px/1.2 var(--fmono,var(--fbody));letter-spacing:.1em;text-transform:uppercase;color:var(--bmuted);background:none;border:0;padding:0;border-radius:0;display:inline-flex;gap:14px;align-items:center}
${lkS('kick','::before')}{content:"";width:36px;height:1px;background:var(--bink);display:inline-block}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important}
& .da-btn.sec{background:transparent;border-width:1px}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:1px solid var(--dline)}
& .da-card,& .db-form{background:color-mix(in srgb,#fff 55%,var(--lkp));border-color:var(--bink)}
${lkS('input')}{border-radius:0!important;border:1px solid var(--bink)!important;background:transparent}
${lkS('num')}{font-weight:var(--lk-hw)!important;letter-spacing:-.02em}
& .da-price{border-top:1px solid var(--dline);border-bottom:1px solid var(--dline);padding:14px 0;max-width:540px}
& .da-checks li:before{color:var(--bpt)}
& .da-ben{background:transparent;border:0;border-top:1px solid var(--bink);border-radius:0;padding:22px 4px 0}& .da-ben .ic{color:var(--bpt)}
& .da-trust{border-color:var(--dline)}& .da-plan.best{border-color:var(--bink);border-width:2px}& .da-plan .tag{border-radius:0}
& .db-ctabox,& .dc-cta,& .dc-formbar,& .dc-lgrid{border-radius:0}& .db-quote{background:transparent;border-radius:0}& .db-rev{background:transparent}
& .dc-chip{border-radius:0}& .da-sticky .da-btn,& .db-sticky,& .db-sticky a,& .dc-sticky{border-radius:0!important}
&{--visr:999px 999px 0 0;--mkr:0;--mkb:1px solid var(--ink0);--mksh:none;--visbg:color-mix(in srgb,var(--ink0) 6%,var(--lkp));--visdeco:transparent}& .nc-vis{box-shadow:none;aspect-ratio:4/5}& .nc-vis.is-photo>img{filter:saturate(.85) contrast(1.02)}& .nc-vis.is-mock::before{border:1px solid color-mix(in srgb,var(--ink0) 25%,transparent);background:none;width:120%;right:-10%;top:18%}& .mk-sheet{background:#FFFDF8}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--dline);background:var(--lkp)}& .nc-float .nci{background:none;color:var(--bpt);padding:0;width:26px;height:26px}
& .nc-float b{font-weight:var(--lk-hw);font-size:26px}
@media (max-width:991px){&{--visr:200px 200px 0 0}}`,

swiss:o=>`
&{--dline:color-mix(in srgb,var(--bink) 16%,#fff)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .da-sec.soft,& .db-sec.soft,& .db-ctab{background:#fff!important}
& .da-sec,& .db-sec,& .dc-sec,& .da-trust,& .db-seals{border-top:1px solid var(--bink)}${lkS('nav')}{border-bottom:1px solid var(--bink)}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.05em;line-height:.9}
& .da-h1{font-size:clamp(40px,6.2vw,96px)}& .db-h1{font-size:clamp(34px,4.4vw,68px)}& .dc-h1{font-size:clamp(38px,6vw,90px)}& .dc-hero.nc-hx .dc-h1{font-size:clamp(34px,4.6vw,68px)}
${lkS('mark')}{background:none;color:var(--bpt);font-style:normal;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:-.04em;line-height:.95}
${lkS('h3')}{font-weight:800;text-transform:uppercase;letter-spacing:-.03em}
${lkS('kick')}{background:var(--bink);color:#fff;border:0;border-radius:0;padding:6px 10px;font:700 12px/1.2 var(--fhead);letter-spacing:.08em;text-transform:uppercase;display:inline-flex}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-family:var(--fhead);font-weight:800}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:1px solid var(--bink)}
${lkS('input')}{border-radius:0!important;border:1px solid var(--bink)!important}
${lkS('num')}{font-weight:900;letter-spacing:-.05em}
& .da-price{display:inline-flex;background:var(--bp);color:var(--btntext,#fff);padding:18px 22px;gap:4px 16px}& .da-price .p,& .da-price .u,& .da-price .u b{color:inherit}& .da-price .u{opacity:.9}
& .da-checks li{border:1px solid var(--bink);padding:6px 11px;font-weight:600}& .da-checks li:before{color:var(--bpt)}
& .da-trust .it b{font-size:26px}& .da-ben{border-color:var(--bink)}& .da-ben .ic{color:var(--bpt)}& .da-plan.best{border:2px solid var(--bp)}& .da-plan .tag{border-radius:0}
& .db-step{border-top:3px solid var(--bink)}& .db-step .n{font-weight:900}
& .db-ctabox,& .dc-cta,& .dc-formbar,& .dc-lgrid,& .dc-chip,& .db-quote,& .db-opt{border-radius:0}& .da-sticky .da-btn,& .db-sticky,& .db-sticky a,& .dc-sticky{border-radius:0!important}
&{--visr:0;--mkr:0;--mkb:1px solid var(--ink0);--mksh:none;--visbg:#fff}& .nc-vis{box-shadow:none;border:1px solid var(--bink);background-image:linear-gradient(color-mix(in srgb,var(--ink0) 7%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--ink0) 7%,transparent) 1px,transparent 1px);background-size:40px 40px}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.1)}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:1;left:-1px;top:-1px;width:34%;aspect-ratio:1;background:var(--bp);mix-blend-mode:multiply}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--bink)}& .nc-float .nci{border-radius:0}`,

brutal:o=>`
&{--dline:var(--bink);--lkp:#F3F0E7;--lkdots:radial-gradient(color-mix(in srgb,var(--bink) 13%,transparent) 1px,transparent 1.2px)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important;background-image:var(--lkdots)!important;background-size:18px 18px!important}
& .da-sec.soft,& .db-sec.soft{background-color:color-mix(in srgb,var(--ba) 16%,var(--lkp))!important}
${lkS('nav')}{border-bottom:2px solid var(--bink)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.04em;line-height:.95}& .da-h1,& .db-h1{font-size:clamp(40px,6vw,88px)}
${lkS('mark')}{background:var(--ba);color:${o.onBa};font-style:normal;padding:0 .12em;border:2px solid var(--bink);box-shadow:4px 4px 0 var(--bink);display:inline-block;transform:rotate(-1.5deg);line-height:1.05}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.03em}
${lkS('kick')}{font:500 12px/1.2 var(--fmono,var(--fbody));text-transform:uppercase;letter-spacing:.06em;background:#fff;color:var(--bink);border:2px solid var(--bink);box-shadow:3px 3px 0 var(--bink);border-radius:0;padding:5px 10px;display:inline-flex}
${lkS('btn')}{border-radius:0!important;border:2px solid var(--bink)!important;box-shadow:4px 4px 0 var(--bink)!important;transition:transform .12s,box-shadow .12s}
${lkS('btn',':hover')}{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--bink)!important;filter:none}
& .da-btn.sec{background:#fff}
${lkS('card')}{border-radius:0!important;border:2px solid var(--bink)!important;box-shadow:6px 6px 0 var(--bink)!important}
${lkS('input')}{border-radius:0!important;border:2px solid var(--bink)!important}
& .da-row-ben>div:nth-child(3n+1) .da-ben{background:color-mix(in srgb,var(--bp) 22%,#fff)}& .da-row-ben>div:nth-child(3n+2) .da-ben{background:color-mix(in srgb,var(--ba) 45%,#fff)}& .da-row-ben>div:nth-child(3n) .da-ben{background:color-mix(in srgb,var(--bp) 9%,#fff)}
& .da-trust{background:var(--bink)!important;background-image:none!important;border:0}& .da-trust .it{color:rgba(255,255,255,.7)}& .da-trust .it b{color:color-mix(in srgb,var(--ba) 75%,#fff)}
& .da-plan.best{box-shadow:8px 8px 0 var(--bp)!important}& .da-plan .tag{border-radius:0;border:2px solid var(--bink)}
& .db-ctabox,& .dc-cta{border-radius:0;box-shadow:8px 8px 0 var(--bp)}& .dc-formbar,& .dc-lgrid,& .dc-chip,& .db-quote{border-radius:0}& .db-opt{border-radius:0;border:2px solid var(--bink)}
& .da-sticky .da-btn,& .db-sticky a,& .dc-sticky a{border-radius:0!important}& .db-sticky,& .dc-sticky{border-radius:0;border:2px solid var(--bink)}
&{--visr:0;--mkr:0;--mkb:2px solid var(--ink0);--mksh:5px 5px 0 var(--ink0);--visbg:color-mix(in srgb,var(--ba) 30%,#fff)}& .nc-vis{border:2px solid var(--bink);box-shadow:8px 8px 0 var(--bink);transform:rotate(1.2deg);aspect-ratio:1/1}& .nc-vis.is-mock::before{border-radius:0;background:color-mix(in srgb,var(--bp) 25%,transparent);width:60%;right:-10%;top:-10%;transform:rotate(12deg)}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-22px;right:-14px;width:120px;height:120px;border-radius:50%;background:var(--ba);color:${o.onBa};border:2px solid var(--bink);box-shadow:4px 4px 0 var(--bink);transform:rotate(12deg);padding:10px}& .nc-stk b{font:700 24px/1 var(--fhead);letter-spacing:-.03em;overflow-wrap:anywhere}& .nc-stk small{font:500 11px/1.2 var(--fmono,var(--fbody))}
& .nc-float{border-radius:0;border:2px solid var(--bink);box-shadow:4px 4px 0 var(--bink)}& .nc-float .nci{border-radius:0;background:var(--ba);color:${o.onBa}}
@media (max-width:991px){& .nc-stk{width:92px;height:92px;right:6px;top:-14px}& .nc-stk b{font-size:18px}}`,

cuaderno:o=>`
&{--lkp:#FBF8F1;--dline:color-mix(in srgb,var(--bink) 14%,#FBF8F1);--visr:4px;--mkr:6px;--mkb:1px solid color-mix(in srgb,var(--ink0) 16%,transparent);--mksh:0 2px 0 rgba(0,0,0,.04),0 16px 30px -18px rgba(0,0,0,.35);--visbg:#fff;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}
${lkS('hero')}{background-image:repeating-linear-gradient(180deg,transparent 0 31px,color-mix(in srgb,#3b82f6 13%,transparent) 31px 32px)!important;position:relative}
${lkS('hero','::before')}{content:"";position:absolute;top:0;bottom:0;left:max(8px,calc((100% - 1320px)/2 - 14px));width:2px;background:color-mix(in srgb,#e11d48 32%,transparent);pointer-events:none}
${lkS('hero','>.container')}{position:relative;z-index:1}
& .da-sec.soft,& .db-sec.soft{background-color:#fff!important;background-image:linear-gradient(color-mix(in srgb,var(--ink0) 5%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--ink0) 5%,transparent) 1px,transparent 1px)!important;background-size:24px 24px!important}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.03em;line-height:1.03}
${lkS('mark')}{color:inherit;-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .12em;border-radius:.3em .5em .4em .6em;background:linear-gradient(172deg,transparent 24%,color-mix(in srgb,var(--ba) 60%,#fff38a) 26% 88%,transparent 90%);-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.02em}
${lkS('kick')}{font:700 25px/1 var(--fhand,var(--fbody));letter-spacing:0;text-transform:none;color:var(--bpt);background:none;border:0;padding:0;display:inline-flex;transform:rotate(-2deg);transform-origin:left}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:12px!important;box-shadow:0 3px 0 color-mix(in srgb,var(--bp) 55%,#000)!important;transition:transform .1s,box-shadow .1s}
${lkS('btn',':active')}{transform:translateY(2px);box-shadow:0 1px 0 color-mix(in srgb,var(--bp) 55%,#000)!important}
& .da-btn.sec{box-shadow:0 3px 0 var(--bink)!important;border-width:2px}& .da-btn.pri.wa,& .db-chan.wa{box-shadow:0 3px 0 #0a7a3a!important}
${lkS('card')}{border-radius:6px!important;border:1px solid color-mix(in srgb,var(--ink0) 13%,transparent)!important;box-shadow:0 2px 0 rgba(0,0,0,.04),0 18px 34px -22px rgba(0,0,0,.4)!important}
& .da-card,& .db-form,& .db-rev{position:relative}
& .da-card::before,& .db-form::before,& .db-rev::before{content:"";position:absolute;z-index:3;top:-12px;left:50%;width:96px;height:24px;transform:translateX(-50%) rotate(-3deg);background:color-mix(in srgb,var(--ba) 42%,rgba(255,255,255,.55));opacity:.9;clip-path:${NC_SVG.tape}}
& .row>div:nth-child(odd) .da-ben,& .row>div:nth-child(odd) .db-rev{transform:rotate(-.7deg)}& .row>div:nth-child(even) .da-ben,& .row>div:nth-child(even) .db-rev{transform:rotate(.7deg)}
${lkS('input')}{border-radius:8px!important;border:1.5px solid color-mix(in srgb,var(--ink0) 28%,transparent)!important;background:#fff}
& .da-trust .it b,& .db-proof b,& .dc-kpi b{font-family:var(--fhand,var(--fhead))!important;font-size:32px!important;font-weight:700!important;color:var(--bpt);letter-spacing:0}
& .db-step .n{font:700 30px var(--fhand,var(--fhead));color:var(--bpt)}
& .db-ctabox,& .dc-cta{border-radius:10px}
& .nc-vis.is-photo{border:12px solid #fff;border-bottom-width:46px;box-shadow:0 20px 40px -20px rgba(0,0,0,.45);transform:rotate(-2deg);border-radius:2px}
& .nc-vis-wrap:has(.is-photo)::after{content:"";position:absolute;z-index:3;top:-14px;left:50%;width:120px;height:28px;transform:translateX(-50%) rotate(2deg);background:color-mix(in srgb,var(--ba) 40%,rgba(255,255,255,.55));opacity:.9;clip-path:${NC_SVG.tape}}
& .nc-vis.is-mock{background:transparent}& .nc-vis.is-mock::before{display:none}
& .nc-float{border-radius:2px;background:#FFF38A;color:#3b3a30;box-shadow:0 10px 20px -10px rgba(0,0,0,.35);transform:rotate(-3deg)}& .nc-float b{font-family:var(--fhand,var(--fhead));font-size:26px}& .nc-float .nci{background:none;color:#3b3a30}`,

prensa:o=>`
&{--lkp:#F3F0E8;--dline:color-mix(in srgb,var(--bink) 22%,#F3F0E8);--visr:0;--mkr:0;--mkb:1px solid var(--ink0);--mksh:none;--visbg:#E9E4D8;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .da-sec.soft,& .db-sec.soft,& .db-ctab{background:var(--lkp)!important}
${lkS('nav')}{border-bottom:0!important;box-shadow:inset 0 -1px 0 var(--bink),inset 0 -4px 0 var(--lkp),inset 0 -5px 0 var(--bink)}
& .da-sec,& .db-sec,& .dc-sec{border-top:3px solid var(--bink)}& .da-trust,& .db-seals{border-top:1px solid var(--bink)!important;border-bottom:1px solid var(--bink)!important}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.02em;line-height:.98}& .da-h1,& .db-h1{font-size:clamp(40px,5.2vw,78px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:italic;font-weight:500;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.015em}${lkS('h3')}{font-weight:700}
${lkS('kick')}{display:block;width:fit-content;min-width:130px;font:700 11.5px/1 var(--fmono,var(--fbody));letter-spacing:.16em;text-transform:uppercase;color:var(--bink);background:none;border:0;border-top:3px solid var(--bink);border-radius:0;padding:9px 0 0}& .da-eyebrow .dot{display:none}
@media (min-width:768px){& .da-sub,& .db-sub{display:flow-root}& .da-sub::first-letter,& .db-sub::first-letter{float:left;font:700 3.1em/.8 var(--fhead);margin:.08em .05em 0 0;color:var(--bpt)}}& .da-trust-big .it b{font-size:clamp(28px,3vw,40px)}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-family:var(--fmono,var(--fbody));text-transform:uppercase;letter-spacing:.08em;font-size:14px;font-weight:700}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:1px solid var(--bink)!important;background:#FBF9F4!important}
& .da-card,& .db-form{border:2px dashed var(--bink)!important;position:relative}
& .da-card::before,& .db-form::before{content:"✂";position:absolute;top:-15px;left:22px;background:var(--lkp);padding:0 6px;font-size:20px;line-height:1;color:var(--bink)}
${lkS('input')}{border-radius:0!important;border:1px solid var(--bink)!important;background:#fff}
${lkS('num')}{font-family:var(--fhead);font-weight:700!important;letter-spacing:-.02em}
& .da-trust .row>div+div .it{border-left:1px solid var(--dline);padding-left:16px}& .da-ben-num>div+div .nb{border-left:1px solid var(--dline);padding-left:18px}
& .db-quote{background:none;border-left:0;border-top:1px solid var(--bink);border-bottom:1px solid var(--bink);border-radius:0;font:italic 500 19px/1.4 var(--fhead);padding:14px 0}
& .db-rev{background:none!important;border:0!important;border-top:1px solid var(--bink)!important;padding:18px 0!important}& .db-rev blockquote{font:italic 500 19px/1.45 var(--fhead)}
& .db-ctabox,& .dc-cta,& .dc-formbar,& .dc-lgrid,& .db-opt,& .dc-chip,& .da-plan .tag{border-radius:0}& .da-sticky .da-btn,& .db-sticky,& .db-sticky a,& .dc-sticky{border-radius:0!important}
& .nc-vis{border:1px solid var(--bink)}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.25) brightness(1.05)}
& .nc-vis.is-photo::after{content:"";position:absolute;inset:0;background-image:radial-gradient(rgba(0,0,0,.4) 1px,transparent 1.5px);background-size:4px 4px;mix-blend-mode:multiply;pointer-events:none}
& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important;background:#FBF9F4}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--bink);background:var(--lkp)}& .nc-float .nci{border-radius:0;background:none}`,

papel:o=>`
&{--lkp:#ECE2D0;--lkw:#FBF7EF;--dline:color-mix(in srgb,var(--bink) 15%,#FBF7EF);--visr:3px;--mkr:3px;--mkb:0;--mksh:0 1px 0 rgba(0,0,0,.05),0 14px 26px -14px rgba(60,40,10,.5);--visbg:#E3D6C1;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('nav')},& .db-ctab,& .da-sec.soft,& .db-sec.soft{background-color:var(--lkp)!important;background-image:${NC_SVG.fibers}!important}
& .da-sec:not(.soft),& .db-sec:not(.soft),& .dc-sec,& .da-trust:not(.da-tick),& .db-seals,& .dc-logos{background:var(--lkw)!important;background-image:none!important}
& .da-sec,& .db-sec,& .dc-sec,& .da-trust,& .db-seals{clip-path:${NC_SVG.torn};margin-top:-9px;position:relative}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:1;font-stretch:88%}
${lkS('mark')}{background:linear-gradient(-1.2deg,transparent 4%,var(--bp) 5% 95%,transparent 96%);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .18em .05em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.025em}
${lkS('kick')}{display:inline-flex;align-items:center;font:600 12px/1 var(--fmono,var(--fbody));letter-spacing:.1em;text-transform:uppercase;background:#fff;color:var(--ink0);border:0;border-radius:2px;padding:8px 12px 8px 24px;position:relative;transform:rotate(-2deg);box-shadow:0 6px 12px -8px rgba(0,0,0,.5)}
${lkS('kick','::before')}{content:"";position:absolute;left:9px;top:50%;width:7px;height:7px;border-radius:50%;background:var(--lkp);transform:translateY(-50%);box-shadow:inset 0 1px 2px rgba(0,0,0,.45)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:3px!important;box-shadow:0 2px 0 rgba(0,0,0,.2)!important;font-weight:700}
${lkS('card')}{border-radius:3px!important;border:0!important;box-shadow:var(--mksh)!important;background:#fff!important}
& .da-card,& .db-form{position:relative;transform:rotate(.5deg)}
& .da-card::after,& .db-form::after{content:"";position:absolute;top:-10px;right:30px;width:84px;height:22px;transform:rotate(4deg);background:rgba(255,255,255,.6);box-shadow:0 1px 2px rgba(0,0,0,.08);clip-path:${NC_SVG.tape}}
${lkS('input')}{border-radius:2px!important;border:1px solid color-mix(in srgb,var(--ink0) 25%,transparent)!important;background:#fff}
& .da-hero .da-price{background:#fff;padding:12px 26px 12px 30px;border-radius:4px;box-shadow:var(--mksh);-webkit-mask:radial-gradient(circle 9px at 0 50%,#0000 97%,#000) left/51% 100% no-repeat,radial-gradient(circle 9px at 100% 50%,#0000 97%,#000) right/51% 100% no-repeat;mask:radial-gradient(circle 9px at 0 50%,#0000 97%,#000) left/51% 100% no-repeat,radial-gradient(circle 9px at 100% 50%,#0000 97%,#000) right/51% 100% no-repeat;width:fit-content;max-width:100%}
& .row>div:nth-child(odd) .da-ben{transform:rotate(-.6deg)}& .row>div:nth-child(even) .da-ben{transform:rotate(.6deg)}
& .db-ctabox,& .dc-cta{border-radius:4px}
& .nc-vis.is-photo{border:10px solid #fff;box-shadow:var(--mksh);transform:rotate(1.5deg)}
& .nc-vis-wrap:has(.is-photo)::before,& .nc-vis-wrap:has(.is-photo)::after{content:"";position:absolute;z-index:3;width:96px;height:24px;background:rgba(255,255,255,.62);box-shadow:0 1px 2px rgba(0,0,0,.1);clip-path:${NC_SVG.tape}}& .nc-vis-wrap:has(.is-photo)::before{top:-6px;left:-22px;transform:rotate(-38deg)}& .nc-vis-wrap:has(.is-photo)::after{bottom:-6px;right:-22px;transform:rotate(-38deg)}& .nc-vis.is-mock{background:transparent}
& .nc-vis.is-mock::before{display:none}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:4;top:-26px;right:-12px;width:132px;height:132px;border-radius:50%;border:4px double var(--bp);color:var(--bp);background:transparent;transform:rotate(-14deg);mix-blend-mode:multiply;opacity:.92;padding:12px}& .nc-stk b{font:800 22px/1 var(--fhead);letter-spacing:-.02em;overflow-wrap:anywhere}& .nc-stk small{font:600 10px/1.2 var(--fmono,var(--fbody));text-transform:uppercase;letter-spacing:.1em}
& .nc-float{border-radius:2px;box-shadow:var(--mksh)}
@media (max-width:991px){& .nc-stk{width:100px;height:100px;right:0;top:-18px}& .nc-stk b{font-size:17px}}`,

retro:o=>`
&{--lkp:color-mix(in srgb,var(--ba) 7%,#FFF4E6);--dline:var(--bink);background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:color-mix(in srgb,var(--bp) 7%,var(--lkp))!important}
${lkS('nav')}{border-bottom:0}
${lkS('hero')}{position:relative;overflow:hidden}
${lkS('hero','::before')}{content:"";position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(color-mix(in srgb,var(--bp) 30%,transparent) 2px,transparent 2.5px);background-size:22px 22px;-webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 70%);mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 70%);opacity:.7}
${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.05em;line-height:1}& .da-h1{font-size:clamp(32px,3.6vw,54px)}& .db-h1{font-size:clamp(30px,3.4vw,50px)!important}& .mk-price,& .mk-big b{font-family:var(--fbody);font-weight:700}& .db-h1{font-size:clamp(34px,4.4vw,66px)}& .dc-hero.nc-hx .dc-h1{font-size:clamp(34px,4.4vw,64px)}
${lkS('mark')}{display:inline;background:var(--bp);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;border-radius:.6em;padding:0 .22em .04em;-webkit-box-decoration-break:clone;box-decoration-break:clone;font-style:normal;line-height:1.12}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.035em}
${lkS('kick')}{display:inline-flex;border:2px solid var(--bink);border-radius:99px;background:transparent;padding:6px 14px;font-size:13.5px;font-weight:700;letter-spacing:0;text-transform:none;color:var(--bink)}
${lkS('btn')}{border-radius:99px!important;font-weight:700}& .da-btn.sec{border-width:2px}
${lkS('card')}{border-radius:32px!important;border:2px solid var(--bink)!important;box-shadow:none!important}
& .da-row-ben>div:nth-child(2) .da-ben,& .dc-tile.d{background:var(--bp)!important;color:var(--btntext,#fff);border-color:var(--bp)!important}& .da-row-ben>div:nth-child(2) .da-ben h3,& .da-row-ben>div:nth-child(2) .da-ben p,& .da-row-ben>div:nth-child(2) .da-ben .ic{color:inherit}
${lkS('input')}{border-radius:99px!important;border:2px solid var(--bink)!important;padding-left:20px!important}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:color-mix(in srgb,var(--lkp) 70%,transparent)}& .da-trust .it b{color:var(--lkp)}
& .db-ctabox,& .dc-cta{border-radius:40px}& .dc-formbar{border-radius:99px}& .db-opt{border-radius:99px;border:2px solid var(--bink)}& .db-quote{border-radius:24px;border:2px solid var(--bink)}
& .nc-vis{border-radius:999px;border:6px solid #fff;box-shadow:0 20px 40px color-mix(in srgb,var(--bink) 18%,transparent);aspect-ratio:3/4;transform:rotate(-2deg);max-width:440px;margin:0 auto}& .nc-stk b{font:800 22px/1 var(--fhead);letter-spacing:-.04em;overflow-wrap:anywhere}& .nc-stk small{font:700 10px/1.2 var(--fbody);text-transform:uppercase}
&{--visr:999px;--mkr:24px;--mkb:2px solid var(--ink0);--mksh:none;--visbg:color-mix(in srgb,var(--bp) 14%,var(--lkp));--visdeco:transparent}& .nc-vis.is-mock{border-radius:32px;transform:rotate(-1.5deg)}& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-18px;right:2%;width:136px;height:136px;padding:22px;color:var(--btntext,#fff);background:var(--bp);clip-path:polygon(50% 0,57% 16%,73% 8%,71% 26%,89% 28%,79% 43%,94% 53%,77% 59%,83% 76%,65% 73%,62% 91%,50% 78%,38% 91%,35% 73%,17% 76%,23% 59%,6% 53%,21% 43%,11% 28%,29% 26%,27% 8%,43% 16%)}
& .nc-float{border-radius:99px;border:2px solid var(--bink);box-shadow:none}
@media (max-width:575px){& .da-h1,& .db-h1,& .dc-h1{font-size:clamp(28px,8.6vw,40px);overflow-wrap:anywhere}& .da-h2,& .db-h2,& .dc-h2{overflow-wrap:anywhere}}
@media (max-width:991px){& .nc-vis.is-photo{aspect-ratio:1/1;max-width:300px}& .nc-stk{width:104px;height:104px;right:0;padding:16px}& .nc-stk b{font-size:17px}}`,

lux:o=>`
&{--lkp:#F7F6F3;--dline:#D9D6CF;--lkg:color-mix(in srgb,var(--ba) 35%,#B89B5E);background:var(--lkp)}
${lkS('sec')},& .db-ctab,& .da-sec.soft,& .db-sec.soft{background:var(--lkp)!important}
& .da-sec,& .db-sec,& .dc-sec{padding-top:100px;padding-bottom:100px}
& .da-top,& .da-nav,& .db-nav,& .da-hero,& .db-hero{background:#0E0E0E!important;--bink:#F7F6F3;--bmuted:#BDB9B0;--dline:rgba(255,255,255,.2);--bpt:#E8DCC0;color:#F7F6F3;border-color:rgba(255,255,255,.12)!important}
& .da-card,& .db-form,& .da-hero .nc-float,& .db-hero .nc-float{--bink:var(--ink0,#312937);--bmuted:#6b6472;--dline:#e4e1da;--bpt:var(--bp);color:var(--bink)}
& .da-logo,& .db-logo,& .dc-logo{font-weight:500;letter-spacing:.3em;text-transform:uppercase}& .da-logo i,& .db-logo i,& .dc-logo i{display:none}
& .da-call{background:transparent;border:1px solid rgba(255,255,255,.4);border-radius:0;color:#F7F6F3}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.01em;line-height:.98}& .da-h1,& .db-h1{font-size:clamp(46px,6.6vw,104px)}& .dc-h1{font-weight:var(--lk-hw)}
${lkS('mark')},& .dc-grad{background:none;color:#E8DCC0;-webkit-text-fill-color:#E8DCC0;font-style:italic;padding:0}& .dc-sec .dc-grad{color:var(--bpt);-webkit-text-fill-color:var(--bpt)}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.005em}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(34px,4.4vw,62px)}& .da-ben h3,& .db-step h3,& .dc-tile h3{font-size:28px}
${lkS('kick')},& .dc-chip{font-size:12px;font-weight:500;letter-spacing:.3em;text-transform:uppercase;color:var(--lkg);background:none;border:0;padding:0;border-radius:0;display:inline-flex}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;letter-spacing:.14em;text-transform:uppercase;font-weight:500;font-size:13px}
& .da-hero .da-btn.sec{background:transparent;color:#F7F6F3;border:1px solid rgba(255,255,255,.4)}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:1px solid var(--dline)}
${lkS('input')}{border-radius:0!important}
${lkS('num')}{font-family:var(--fhead);font-weight:var(--lk-hw)!important;letter-spacing:-.01em}
& .da-price{border-top:1px solid rgba(255,255,255,.25);padding-top:16px;max-width:540px}
& .da-checks li{color:var(--bmuted);font-weight:400}& .da-checks li:before{color:var(--lkg)}
& .da-ben{background:transparent;border:0;border-top:1px solid var(--bink);border-radius:0;padding:24px 0 0}& .da-ben .ic{color:var(--lkg)}
& .da-trust{background:var(--lkp)!important;border-color:var(--dline)}& .da-trust .it b{font-size:34px}
& .db-ctabox,& .dc-cta,& .dc-formbar,& .dc-lgrid,& .db-quote,& .db-opt{border-radius:0}& .db-quote{background:transparent;border-left-color:var(--lkg)}
& .da-sticky .da-btn,& .db-sticky,& .db-sticky a,& .dc-sticky{border-radius:0!important}
& .nc-hx.nc-bg{position:relative;overflow:hidden;padding-top:120px;padding-bottom:90px;min-height:78vh;display:flex;align-items:flex-end}
& .nc-hx.nc-bg>.container{position:relative;z-index:1}
& .nc-hx.nc-bg .nc-bgvis{position:absolute;inset:0;z-index:0}& .nc-hx.nc-bg .nc-bgvis .nc-vis-wrap,& .nc-hx.nc-bg .nc-bgvis .nc-vis{position:absolute;inset:0;max-height:none;aspect-ratio:auto;border-radius:0;box-shadow:none;animation:none}
& .nc-hx.nc-bg .nc-vis>img{filter:grayscale(1) contrast(1.05) brightness(.72)}&{--visr:0;--mkr:0;--mkb:1px solid #D9D6CF;--mksh:none;--visbg:#1a1a1a;--visdeco:transparent}& .nc-vis.is-mock::before{border:1px solid rgba(255,255,255,.14);background:none}
& .nc-hx.nc-bg .nc-bgvis::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,14,14,.35),#0E0E0E 96%),linear-gradient(90deg,color-mix(in srgb,var(--lkg) 25%,transparent),transparent 60%)}
& .nc-hx.nc-bg .nc-float{display:none}
@media (max-width:991px){& .nc-hx.nc-bg{min-height:0;padding-top:70px;padding-bottom:40px}}`
};

/* Vista previa: los {{PLACEHOLDER}} se ven como etiquetas (en el export siguen siendo texto y el checklist los avisa) */
const NC_PH_PREVIEW_CSS=`.nc-phc{display:inline;font:600 .78em/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0;text-transform:none;font-style:normal;-webkit-text-fill-color:currentColor;background:repeating-linear-gradient(135deg,color-mix(in srgb,currentColor 9%,transparent) 0 6px,color-mix(in srgb,currentColor 4%,transparent) 6px 12px);outline:1px dashed color-mix(in srgb,currentColor 45%,transparent);outline-offset:-1px;border-radius:5px;padding:.08em .35em;white-space:nowrap;vertical-align:.08em}`;
function ncPhChips(html){return String(html).replace(/>([^<]+)</g,(m,t)=>t.indexOf("{{")<0?m:">"+t.replace(/\{\{[^{}<>]{1,40}\}\}/g,x=>`<span class="nc-phc" title="Dato pendiente: se rellena antes de publicar">${x.slice(2,-2).replace(/_/g," ").toLowerCase()}</span>`)+"<");}

/* ===== MÓVIL: sistema base para las familias A/B/C =====
   --mh = escala de titulares en móvil · --msp = escala de espaciado en móvil (global y por bloque) */
function ncMobileCSS(){return `
@media (max-width:767px){
 .da .container,.db .container,.dc .container{padding-left:20px;padding-right:20px}
 .da-top{font-size:12px;line-height:1.3;padding:7px 14px}
 .da-nav,.db-nav,.dc-nav{padding-top:10px;padding-bottom:10px}
 .da-call{padding:8px 12px;font-size:14px}.db-navtel{font-size:14.5px}
 .da-h1,.db-h1{font-size:calc(var(--mh,1)*var(--lkmh,1)*clamp(30px,8.4vw,37px))!important;line-height:1.06!important;margin:12px 0 12px!important}
 .dc-h1{font-size:calc(var(--mh,1)*var(--lkmh,1)*clamp(32px,9.2vw,42px))!important;line-height:1.04!important}
 .da-h2,.db-h2,.dc-h2,.da-ctab h2,.db-ctabox h2{font-size:calc(var(--mh,1)*var(--lkmh,1)*clamp(25px,7vw,31px))!important;line-height:1.1!important}
 .da-sub,.db-sub,.dc-sub{font-size:16px;line-height:1.5}
 .da-hero,.db-hero{padding:calc(var(--msp,1)*22px) 0 calc(var(--msp,1)*32px)!important}
 .dc-hero{padding:calc(var(--msp,1)*40px) 0 calc(var(--msp,1)*52px)!important}
 .da-sec,.db-sec,.dc-sec{padding-top:calc(var(--msp,1)*52px)!important;padding-bottom:calc(var(--msp,1)*52px)!important}
 .da-sec .mb-5,.db-sec .mb-5,.dc-sec .mb-5{margin-bottom:24px!important}.dc-bento{margin-top:28px}
 .da-trust,.db-seals{padding:14px 0}
 .da .form-control,.db .form-control,.dc .form-control{min-height:52px;font-size:16px}
 .da-btn,.da-go,.db-go,.db-chan,.dc-go,.dc-pill.lg{min-height:52px}
 .da-btns{flex-direction:column;align-items:stretch}.da-btns .da-btn{justify-content:center}
 .da .da-inline,.db .db-inline{flex-direction:column;align-items:stretch}.da .da-inline .form-control,.db .db-inline .form-control{flex:0 0 auto;width:100%}.da .da-inline .da-go,.db .db-inline .db-go{width:100%}
 .dc .dc-formbar{flex-direction:column}.dc .dc-formbar .form-control{flex:0 0 auto}.dc .dc-formbar .dc-go{width:100%}
 .da-card{padding:20px}.da-card h2{font-size:20px}.db-form{padding:22px}.db-form h2{font-size:21px}
 .da-price{margin:14px 0 4px}.da-checks{gap:6px 14px;font-size:14px;margin-top:12px}
 .da-ctab{padding:calc(var(--msp,1)*42px) 0}.db-ctab{padding-bottom:calc(var(--msp,1)*48px)}.db-ctabox{padding:26px 20px;border-radius:18px}
 .db-proof{gap:16px 22px;margin-top:20px}.db-proof b{font-size:20px}.db-quote{margin-top:20px}
 .dc-kpis{margin-top:34px}
 .accordion-button{padding:16px 18px;font-size:15.5px}
 /* formulario primero: el hero se reordena sin tocar el HTML */
 .da-hero.nc-mo-form:not(.nc-hx) .row,.db-hero.nc-mo-form .row{margin-left:0;margin-right:0}
 .da-hero.nc-mo-form:not(.nc-hx) .row>[class*=col-],.db-hero.nc-mo-form .row>[class*=col-]{display:contents}
 .da-hero.nc-mo-form:not(.nc-hx) .row>[class*=col-]>*,.db-hero.nc-mo-form .row>[class*=col-]>*{flex:0 0 100%;max-width:100%;min-width:0}
 .da-hero.nc-mo-form:not(.nc-hx) .row>[class*=col-]>.da-eyebrow{flex:0 0 auto}
 .da-hero.nc-mo-form .da-eyebrow,.db-hero.nc-mo-form .db-kicker{order:1}.da-hero.nc-mo-form .da-h1,.db-hero.nc-mo-form .db-h1{order:2}
 .da-hero.nc-mo-form .da-sub,.db-hero.nc-mo-form .db-sub{order:3}.da-hero.nc-mo-form .da-price{order:4}.da-hero.nc-mo-form .da-old{order:5}
 .da-hero.nc-mo-form .da-card,.da-hero.nc-mo-form .nc-hx-form,.db-hero.nc-mo-form .db-form{order:6;margin-top:18px}
 .da-hero.nc-mo-form .nc-hx-alt{order:7}.da-hero.nc-mo-form .da-checks,.db-hero.nc-mo-form .db-proof{order:8}.db-hero.nc-mo-form .db-quote{order:9}
 .da-hero.nc-mo-form .da-btns{order:9}.da-hero.nc-mo-form .da-btns .da-btn.pri[href="#form"]{display:none}
 .da-hero.nc-mo-form .da-img,.da-hero.nc-mo-form .nc-vis-wrap,.db-hero.nc-mo-form .nc-vis-wrap{order:10;margin-top:22px}
 .nc-hx .nc-hx-txt{display:flex;flex-direction:column;align-items:stretch}.nc-hx .nc-hx-txt>.da-eyebrow,.nc-hx .nc-hx-txt>.dc-chip{align-self:flex-start}
 .nc-hx .nc-hx-form{margin-top:18px}
 .nc-mo-visual .nc-vis-wrap{order:-1}.da-hero.nc-hx.nc-mo-visual .row>.col-lg-6:last-child{order:-1}
 .nc-mv-hide .nc-vis-wrap,.nc-mv-hide .da-img{display:none!important}
 .d-contents-m{display:contents}
 /* listas: carrusel, lista o cuadrícula */
 .row.nc-m-rail{justify-content:flex-start!important;flex-wrap:nowrap;overflow-x:auto;overscroll-behavior-x:contain;scroll-snap-type:x mandatory;scrollbar-width:none;margin-left:-20px;margin-right:-20px;padding:6px 8px 18px 20px;--bs-gutter-x:12px;scroll-padding-left:20px}
 .row.nc-m-rail::-webkit-scrollbar{display:none}
 .row.nc-m-rail>*{flex:0 0 84%;max-width:84%;scroll-snap-align:start}.row.nc-m-rail>*:last-child{padding-right:20px;flex-basis:calc(84% + 14px);max-width:calc(84% + 14px)}
 .row.nc-m-list>*{flex:0 0 100%;max-width:100%}.row.nc-m-grid>*{flex:0 0 50%;max-width:50%}
 .nc-m-list .da-ben{display:grid;grid-template-columns:auto 1fr;column-gap:14px;align-items:start;padding:16px 18px}.nc-m-list .da-ben .ic{grid-row:1/3;font-size:22px;margin-top:1px}.nc-m-list .da-ben h3{margin:0 0 2px;font-size:16.5px}
 .nc-m-list .db-step{padding-top:14px}.nc-m-list .db-step h3{font-size:19px}
 .nc-m-rail .da-plan,.nc-m-rail .db-rev{height:100%}
 .da-trust .nc-m-rail>*{flex-basis:46%;max-width:46%}
 /* comparativa: cada fila pasa a ser una tarjeta con etiquetas */
 .db-compare{border-radius:14px}.db-compare thead{display:none}.db-compare table,.db-compare tbody,.db-compare tr,.db-compare td{display:block;width:100%}
 .db-compare tr{padding:12px 16px;border-bottom:1px solid var(--dline)}.db-compare tr:last-child{border-bottom:0}
 .db-compare td{border:0!important;padding:3px 0!important;display:flex;gap:10px;justify-content:space-between;font-size:14.5px}
 .db-compare td:first-child{font-weight:700;font-size:15.5px;padding-bottom:6px!important}.db-compare td:not(:first-child)::before{content:attr(data-l);color:var(--bmuted);font-weight:500}
 /* barra fija */
 body.stk-scroll .da-sticky,body.stk-scroll .db-sticky,body.stk-scroll .dc-sticky{transform:translateY(140%);transition:transform .3s cubic-bezier(.2,.7,.2,1)}
 body.stk-scroll .nc-stk-on{transform:none!important}
 body.stk-float .da-sticky{left:12px;right:12px;bottom:12px;border-radius:16px;border:1px solid var(--dline);box-shadow:0 14px 34px rgba(0,0,0,.18)}
 body.stk-single .da-sticky .da-btn.sec,body.stk-single .db-sticky a:not(.pri),body.stk-single .dc-sticky .dc-pill.g{display:none}
}`;}
/* Envoltorio de sección para los bloques v4 (fondo, espaciado y ajustes de móvil por bloque) */
const V4_STYLE_FIELDS=[
  {k:"bg",l:"Fondo",t:"select",opts:[["auto","Automático (del estilo)"],["white","Blanco"],["soft","Suave"],["tint","Tinte de marca"],["ink","Oscuro"],["brand","Color de marca"]]},
  {k:"pad",l:"Espaciado vertical (escritorio)",t:"select",opts:[["auto","Automático"],["S","Compacto"],["M","Normal"],["L","Amplio"],["XL","Extra"]]},
  {k:"align",l:"Alineación de titulares",t:"select",opts:[["auto","Automática"],["left","Izquierda"],["center","Centro"]]},
  {k:"_m",l:"Móvil",t:"head"},
  {k:"mOrder",l:"Orden en móvil",t:"select",opts:[["form","Formulario arriba"],["text","Como en escritorio"],["visual","Imagen arriba"]],when:s=>/_hero$/.test(s._type)},
  {k:"mVis",l:"Imagen en móvil",t:"select",opts:[["show","Mostrar"],["hide","Ocultar"]],when:s=>/_hero$/.test(s._type)},
  {k:"mLayout",l:"Composición en móvil",t:"select",opts:[["auto","Automática"],["rail","Carrusel deslizable"],["list","Lista"],["grid","Cuadrícula 2 columnas"]],when:s=>/^(da_plans|da_benefits|da_trust|db_steps|db_reviews)$/.test(s._type)},
  {k:"mTitle",l:"Tamaño de titulares en móvil",t:"select",opts:[["auto","Del ajuste global"],["S","Pequeño"],["M","Normal"],["L","Grande"]]},
  {k:"mPad",l:"Espaciado en móvil",t:"select",opts:[["auto","Del ajuste global"],["S","Compacto"],["M","Normal"],["L","Amplio"]]},
  {k:"mAlign",l:"Alineación en móvil",t:"select",opts:[["auto","Automática"],["left","Izquierda"],["center","Centro"]]}
];
const V4_STYLE_DEF={bg:"auto",pad:"auto",align:"auto",mOrder:"form",mVis:"show",mLayout:"auto",mTitle:"auto",mPad:"auto",mAlign:"auto"};
function v4Style(s){return Object.assign({},V4_STYLE_DEF,s.style||{});}
function v4Wrap(s,html){const t=v4Style(s),c=[];
  if(t.bg!=="auto")c.push("nc-bg-"+t.bg);if(t.pad!=="auto")c.push("nc-pad-"+t.pad);if(t.align!=="auto")c.push("nc-al-"+t.align);
  if(t.mTitle!=="auto")c.push("nc-mt-"+t.mTitle);if(t.mPad!=="auto")c.push("nc-mp-"+t.mPad);if(t.mAlign!=="auto")c.push("nc-ma-"+t.mAlign);
  return c.length?`<div class="nc-s ${c.join(" ")}">${html}</div>`:html;}
function ncSecCSS(){return `
html body .nc-s.nc-bg-white>*{background:#fff!important}
html body .nc-s.nc-bg-soft>*{background:var(--bsoft)!important;background-image:none!important}
html body .nc-s.nc-bg-tint>*{background:color-mix(in srgb,var(--bp) 8%,#fff)!important;background-image:none!important}
html body .nc-s.nc-bg-ink>*{background:var(--ink0)!important;background-image:none!important;--bink:#fff;--bmuted:rgba(255,255,255,.72);--dline:rgba(255,255,255,.16);--bpt:color-mix(in srgb,var(--bp) 55%,#fff);color:#fff}
html body .nc-s.nc-bg-brand>*{background:var(--bp)!important;background-image:none!important;--bink:var(--btntext,#fff);--bmuted:color-mix(in srgb,var(--btntext,#fff) 80%,transparent);--dline:color-mix(in srgb,var(--btntext,#fff) 25%,transparent);--bpt:var(--btntext,#fff);color:var(--btntext,#fff)}
html body .nc-s.nc-bg-ink .da-card,html body .nc-s.nc-bg-ink .db-form,html body .nc-s.nc-bg-ink .da-plan,html body .nc-s.nc-bg-ink .da-ben,html body .nc-s.nc-bg-ink .db-rev,html body .nc-s.nc-bg-ink .db-compare,
html body .nc-s.nc-bg-brand .da-card,html body .nc-s.nc-bg-brand .db-form,html body .nc-s.nc-bg-brand .da-plan,html body .nc-s.nc-bg-brand .da-ben,html body .nc-s.nc-bg-brand .db-rev,html body .nc-s.nc-bg-brand .db-compare{--bink:var(--ink0);--bmuted:#6b6472;--dline:#e6e3ee;--bpt:var(--bp);color:var(--ink0)}
html body .nc-s.nc-pad-S>*{padding-top:32px!important;padding-bottom:32px!important}html body .nc-s.nc-pad-M>*{padding-top:64px!important;padding-bottom:64px!important}
html body .nc-s.nc-pad-L>*{padding-top:100px!important;padding-bottom:100px!important}html body .nc-s.nc-pad-XL>*{padding-top:140px!important;padding-bottom:140px!important}
.nc-s.nc-al-center h2,.nc-s.nc-al-center h1,.nc-s.nc-al-center .da-muted,.nc-s.nc-al-center .db-muted,.nc-s.nc-al-center .dc-lead{text-align:center!important;margin-left:auto;margin-right:auto}
.nc-s.nc-al-left h2,.nc-s.nc-al-left h1,.nc-s.nc-al-left .da-muted,.nc-s.nc-al-left .db-muted,.nc-s.nc-al-left .dc-lead{text-align:left!important;margin-left:0}
.nc-s.nc-al-left .text-center{text-align:left!important}
@media (max-width:767px){.nc-s.nc-mt-S{--mh:.88}.nc-s.nc-mt-M{--mh:1}.nc-s.nc-mt-L{--mh:1.14}.nc-s.nc-mp-S{--msp:.7}.nc-s.nc-mp-M{--msp:1}.nc-s.nc-mp-L{--msp:1.3}
 html body .nc-s.nc-mp-S>*,html body .nc-s.nc-mp-M>*,html body .nc-s.nc-mp-L>*{padding-top:calc(var(--msp)*52px)!important;padding-bottom:calc(var(--msp)*52px)!important}
 .nc-s.nc-ma-center h1,.nc-s.nc-ma-center h2,.nc-s.nc-ma-center p,.nc-s.nc-ma-center .text-start{text-align:center!important}.nc-s.nc-ma-center .da-eyebrow,.nc-s.nc-ma-center .db-kicker{align-self:center}
 .nc-s.nc-ma-left h1,.nc-s.nc-ma-left h2,.nc-s.nc-ma-left p,.nc-s.nc-ma-left .text-center{text-align:left!important}}`;}
/* Ajustes globales de móvil (Global → Móvil) */
function ncMobileVars(){const st=state.settings;const mh={S:.9,M:1,L:1.12}[st.mTitle]||1,ms={S:.75,M:1,L:1.25}[st.mSpace]||1;return `:root{--mh:${mh};--msp:${ms}}`;}
function ncBodyMobileClasses(){const st=state.settings;return (st.stickyShow==="always"?"":" stk-scroll")+(st.stickyStyle==="float"?" stk-float":st.stickyStyle==="single"?" stk-single":"");}
const NC_STICKY_JS=`(function(){var st=document.querySelectorAll('.da-sticky,.db-sticky,.dc-sticky');if(!st.length||!document.body.classList.contains('stk-scroll'))return;var f=document.getElementById('form');function set(v){for(var i=0;i<st.length;i++)st[i].classList.toggle('nc-stk-on',v);}if(!f||!('IntersectionObserver' in window)){set(true);return;}new IntersectionObserver(function(e){set(!e[0].isIntersecting&&e[0].boundingClientRect.top<window.innerHeight*3);}).observe(f);})();`;

/* ===== TOQUES PERSONALES (todos los estilos) =====
   Anotaciones a mano · letra manuscrita · papel y texturas · composición editorial · voz de los textos */
const NC_SVG=(()=>{const u=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
  let torn="polygon(0 9px";for(let i=1;i<=50;i++){torn+=`,${i*2}% ${[3,8,5,10,4,7,2,9,6,4][i%10]}px`;}torn+=",100% 100%,0 100%)";
  return {
    marker:u(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 40' preserveAspectRatio='none'><path d='M4 11C46 5 122 3 197 8L194 34C128 39 60 37 6 32Z'/></svg>`),
    tape:"polygon(3% 0,97% 0,100% 20%,97% 40%,100% 60%,97% 80%,100% 100%,3% 100%,0 80%,3% 60%,0 40%,3% 20%)",
    torn,
    fibers:u(`<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 .35 0 0 0 0 .25 0 0 0 0 .1 0 0 0 .22 0'/></filter><rect width='100%' height='100%' filter='url(#f)'/></svg>`),
    grain:u(`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`),
    check:u(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'><path d='M3.5 12.5c2 1.2 3.7 3.2 5 5.6C11.6 11 16 6.2 21 3.8'/></svg>`),
    arrow:`<svg class="arr" viewBox="0 0 80 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8c20-4 44 4 54 22 4 7 5 14 4 22"/><path d="M52 44l12 10 5-15"/></svg>`,
    circle:`<svg class="nc-circ" viewBox="0 0 200 80" preserveAspectRatio="none" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path vector-effect="non-scaling-stroke" d="M28 16C62 3 150 2 186 20c16 9 10 32-18 43-40 15-118 14-150 1C2 57 1 38 18 26 44 9 96 4 132 8"/></svg>`
  };})();
/* Voz de los textos: solo cambia textos por defecto (los que no has tocado) y el microcopy fijo */
const NC_VOICE={
  neutral:{callFree:"Llamar gratis",weCall:"Te llamamos",orWeCall:"o te llamamos nosotros",orPhone:"o déjanos tu teléfono y te llamamos",preferCall:"Prefiero llamar",waWrite:"Escríbenos por WhatsApp",waOpen:"Abrir WhatsApp",orCallAt:"o llama gratis al",back:"← Cambiar respuesta",old:"precio habitual",oneQ:"Solo 1 pregunta",callNow:"Llama gratis",phone:"Tu teléfono"},
  cercano:{callFree:"Llámanos, es gratis",weCall:"Mejor llamadme",orWeCall:"¿Prefieres que te llamemos?",orPhone:"¿Mejor te llamamos? Déjanos tu número",preferCall:"Prefiero hablar ya",waWrite:"Háblanos por WhatsApp",waOpen:"Abrir WhatsApp",orCallAt:"o llámanos gratis al",back:"← Cambiar mi respuesta",old:"antes",oneQ:"¡Es solo 1 pregunta!",callNow:"Llámanos gratis",phone:"Tu número de teléfono"}
};
const NC_VOICE_PROPS={cercano:{
  da_hero:{cta:"La quiero",cardTitle:"¿Te llamamos? Es gratis",cardSub:"Déjanos tu número y te contamos el precio final, sin compromiso.",cardBtn:"Quiero que me llaméis"},
  da_cta:{title:"¿Lo hablamos? Te llamamos gratis",sub:"Te contamos el precio final en una llamada corta.",btn:"Llamadme ya"},
  da_sticky:{form:"Que me llamen"},db_sticky:{form:"Mi estudio gratis"},dc_sticky:{form:"Que me llamen"},
  db_hero:{btn:"Quiero mi estudio",safe:"Tu número solo se usa para llamarte. Cero spam.",formSub:"Una pregunta y te llamamos con una propuesta pensada para ti."},
  db_cta:{title:"Cuéntanos tu caso, sin compromiso",sub:"Te llamamos cuando mejor te venga.",btn:"Llamadme"},
  dc_hero:{btn:"Calcular mi ahorro",note:"Te llamamos en minutos, sin rollos"},dc_cta:{btn:"Quiero que me llaméis"}
}};
const NC_VOICE_BY_LOOK={brutal:"cercano",retro:"cercano",cuaderno:"cercano",papel:"cercano"};
function ncVoiceKey(){const v=state.settings.voice||"estilo";return v==="estilo"?(NC_VOICE_BY_LOOK[ncLook()]||"neutral"):(NC_VOICE[v]?v:"neutral");}
function vt(k){return (NC_VOICE[ncVoiceKey()]||NC_VOICE.neutral)[k]||NC_VOICE.neutral[k]||"";}
const _ncDefCache={};
function ncVoiceProps(type,props){const set=(NC_VOICE_PROPS[ncVoiceKey()]||{})[type];if(!set)return props;
  const def=_ncDefCache[type]||(_ncDefCache[type]=LIB[type].def());const out=Object.assign({},props);
  Object.keys(set).forEach(k=>{if(out[k]===def[k])out[k]=set[k];});return out;}
/* Anotación a mano con flecha (decorativa: repite un texto que ya está en la página) */
function ncAnn(text,cls){return text?`<span class="nc-ann ${cls||''}" aria-hidden="true"><span class="t">${esc(text)}</span>${NC_SVG.arrow}</span>`:"";}
function ncTouchOn(k){const t=state.settings;return {ann:t.annot!==false,hand:t.hand!==false,tex:t.texture||"grain",ed:t.editorial!==false}[k];}
function ncTouchClasses(){const c=[];if(ncTouchOn("ann"))c.push("nc-annot");if(ncTouchOn("hand"))c.push("nc-handf");const tx=ncTouchOn("tex");if(tx&&tx!=="none")c.push("nc-tx-"+tx);if(ncTouchOn("ed"))c.push("nc-ed");return c.length?" "+c.join(" "):"";}
function ncTouchCSS(){return `
:root{--fhand:${(ncTouchOn("hand")||/^(cuaderno|papel)$/.test(ncLook()))?"'Caveat',":""}var(--fbody)}
.nc-ann,.nc-circ{display:none}
body.nc-annot .nc-ann{display:inline-flex;position:absolute;z-index:5;align-items:flex-start;gap:4px;color:var(--bpt);pointer-events:none;white-space:nowrap}
.nc-ann .t{font:600 15px/1.1 var(--fbody);font-style:italic;transform:rotate(-4deg)}body.nc-handf .nc-ann .t{font:700 25px/1 var(--fhand);font-style:normal}
.nc-ann .arr{width:58px;height:46px;flex:0 0 auto;margin-top:8px}
.nc-ann-card{top:-50px;right:18px}.db-form{position:relative}.nc-ann-in{top:-46px;right:6px}body.nc-annot .nc-ann-form{position:static;display:flex;width:fit-content;margin:0 0 6px auto}.nc-ann .arr{transform:scaleX(-1) rotate(10deg)}.nc-ann{flex-direction:row-reverse}
body.nc-annot .da-price .p{position:relative;width:fit-content}
body.nc-annot .nc-circ{display:block;position:absolute;left:-16px;right:-22px;top:-12px;bottom:-14px;width:calc(100% + 38px);height:calc(100% + 26px);color:var(--bpt);pointer-events:none}
body.nc-annot .da-checks li:before,body.nc-annot .da-plan li:before{content:"";display:inline-block;width:1.05em;height:1.05em;vertical-align:-.15em;margin-right:7px;background:#16a34a;-webkit-mask:${NC_SVG.check} center/contain no-repeat;mask:${NC_SVG.check} center/contain no-repeat}
body.nc-annot .da-plan.best .tag{font:700 20px/1 var(--fhand);background:none;color:var(--bpt);padding:0;top:-30px;transform:rotate(-4deg);letter-spacing:0;text-transform:none}
body:not(.nc-handf).nc-annot .da-plan.best .tag{font:italic 600 14px/1 var(--fbody)}
body.nc-annot .da-plan.best .tag::after{content:"";display:inline-block;width:26px;height:20px;margin-left:4px;vertical-align:-10px;background:currentColor;-webkit-mask:url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round'><path d='M2 4c10 0 18 5 22 15'/><path d='M17 16l7 5 3-8'/></svg>")}") center/contain no-repeat;mask:url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 24' fill='none' stroke='black' stroke-width='2.4' stroke-linecap='round'><path d='M2 4c10 0 18 5 22 15'/><path d='M17 16l7 5 3-8'/></svg>")}") center/contain no-repeat}
body.nc-annot.nc-handf .dc-note{font-family:var(--fhand);font-size:21px;letter-spacing:0}
body.nc-annot .db-rev blockquote{position:relative}
body.nc-tx-grain::after,body.nc-tx-paper::after{content:"";position:fixed;inset:0;z-index:2000;pointer-events:none;background-image:${NC_SVG.grain};opacity:.05;mix-blend-mode:multiply}
body.nc-tx-paper::after{opacity:.1;background-color:rgba(190,160,110,.06)}
body.nc-ed{counter-reset:ncs}
body.nc-ed .da-sec .da-h2,body.nc-ed .db-sec .db-h2,body.nc-ed .dc-sec .dc-h2{counter-increment:ncs;text-align:left!important;margin-left:0!important}
body.nc-ed .da-sec .da-h2::before,body.nc-ed .db-sec .db-h2::before,body.nc-ed .dc-sec .dc-h2::before{content:counter(ncs,decimal-leading-zero);display:block;width:52px;margin-bottom:14px;padding-top:10px;border-top:2px solid currentColor;font:600 13px/1 var(--fmono,var(--fbody));letter-spacing:.1em;color:var(--bpt);-webkit-text-fill-color:currentColor}
body.nc-ed .da-sec .text-center,body.nc-ed .dc-sec .text-center{text-align:left!important}
body.nc-ed .da-sec .text-center.mb-5{display:grid;grid-template-columns:1.1fr 1fr;gap:10px 56px;align-items:end}body.nc-ed .da-sec .text-center.mb-5 p{margin:0 0 6px;max-width:420px;justify-self:end}
body.nc-ed .dc-sec .dc-lead{margin-left:0}body.nc-ed .da-faq,body.nc-ed .db-faq,body.nc-ed .dc-faq{margin-left:0}
body.nc-ed .da-sec>.container[style*="max-width:780px"],body.nc-ed .db-sec>.container[style*="max-width:780px"],body.nc-ed .dc-sec>.container[style*="max-width:780px"]{max-width:1140px!important;display:grid;grid-template-columns:.8fr 1.2fr;gap:0 56px;align-items:start}

@media (max-width:767px){body.nc-annot .nc-ann{position:static;display:flex;margin:14px 0 -6px;align-self:flex-start;order:5}body.nc-annot .nc-ann-in{margin:0 0 10px}.nc-ann .arr{width:40px;height:32px;transform:rotate(18deg)!important}body.nc-handf .nc-ann .t{font-size:22px}
 body.nc-ed .da-sec .text-center.mb-5{display:block}body.nc-ed .da-sec .text-center.mb-5 p{margin-top:8px}
 body.nc-ed .da-sec>.container[style*="max-width:780px"],body.nc-ed .db-sec>.container[style*="max-width:780px"],body.nc-ed .dc-sec>.container[style*="max-width:780px"]{display:block}}`;}
