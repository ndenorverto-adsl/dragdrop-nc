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
const NC_ILLUS=[["auto","Según el sector"],["wifi","Fibra y móvil"],["bolt","Energía"],["shield","Seguridad"],["umbrella","Seguros"],["heart","Salud"],["scale","Legal"],["water","Agua"],["home","Hogar"],["spark","Genérica"]];
const NC_ILLUS_ICO={wifi:"wifi",bolt:"zap",shield:"shield-check",umbrella:"umbrella",heart:"heart-pulse",scale:"scale",water:"droplets",home:"house",spark:"sparkles"};
/* Ilustración propia: composición abstracta con los colores de la marca + icono del sector */
function ncIllus(kind){const ic=NC_ILLUS_ICO[kind]||"sparkles";const uid="g"+Math.random().toString(36).slice(2,7);
  return `<svg class="nc-ill" viewBox="0 0 400 480" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración">
  <defs><linearGradient id="${uid}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="s1"/><stop offset="1" class="s2"/></linearGradient>
  <radialGradient id="${uid}b" cx=".7" cy=".25" r=".6"><stop offset="0" class="s3"/><stop offset="1" class="s3" stop-opacity="0"/></radialGradient></defs>
  <rect width="400" height="480" fill="url(#${uid}a)"/><rect width="400" height="480" fill="url(#${uid}b)"/>
  <g class="ring" fill="none"><circle cx="200" cy="228" r="170"/><circle cx="200" cy="228" r="122"/><circle cx="200" cy="228" r="74"/></g>
  <g class="card"><rect x="58" y="330" width="284" height="96" rx="18"/></g>
  <g class="ln"><rect x="82" y="354" width="120" height="12" rx="6"/><rect x="82" y="378" width="190" height="9" rx="4.5" opacity=".55"/><rect x="82" y="396" width="150" height="9" rx="4.5" opacity=".35"/></g>
  <circle class="pip" cx="306" cy="378" r="18"/>
  <circle class="dot" cx="70" cy="86" r="7"/><circle class="dot" cx="336" cy="120" r="5"/><circle class="dot" cx="330" cy="292" r="9" opacity=".6"/>
  <circle class="hub" cx="200" cy="228" r="54"/>
  <g transform="translate(170 198) scale(2.5)" class="ico" fill="none" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${NC_ICONS[ic]||""}</g></svg>`;}
/* Bloque visual del hero: foto (si hay) o ilustración, con adornos que el estilo activa o no */
function ncVisual(p,extra){const img=p.img?`<img src="${esc(p.img)}" alt="${esc(p.imgAlt||'')}" class="nc-vis-img" fetchpriority="high">`:ncIllus(p.illus&&p.illus!=="auto"?p.illus:"spark");
  const b=p.badge?v4C(p.badge):null;
  return `<div class="nc-vis-wrap"><div class="nc-vis">${img}</div><span class="nc-stk" aria-hidden="true">${ncIco("sparkles")}</span>${b&&b[0]?`<div class="nc-float">${ncIco("star")}<span><b>${esc(b[0])}</b>${b[1]?`<small>${esc(b[1])}</small>`:""}</span></div>`:""}${extra||""}</div>`;}

/* ===== ESTILOS DE DISEÑO ===== */
const LOOKS={
  base:{name:"Base",desc:"El diseño original de cada dirección (A/B/C).",best:"Cualquiera",sample:["#ffffff","var(--bp)","#312937"]},
  editorial:{name:"Editorial",desc:"Serif elegante, papel, reglas finas y foto en arco.",best:"Seguros, salud, legal",head:"Instrument Serif",body:"Inter",mono:"JetBrains Mono",hw:400,sample:["#F6F1E8","#1c1a17","#c2410c"]},
  swiss:{name:"Swiss grid",desc:"Rejilla recta, mayúsculas potentes y bloques de color planos.",best:"Telco, energía, ofertas",head:"Inter Tight",body:"Inter",hw:900,sample:["#ffffff","#0b0b0c","#2b50ff"]},
  brutal:{name:"Brutalista táctil",desc:"Bordes gruesos, sombras duras y pegatinas.",best:"Telco joven, promos",head:"Space Grotesk",body:"Space Grotesk",mono:"IBM Plex Mono",hw:700,sample:["#F3F0E7","#111111","#d4ff3f"]},
  organic:{name:"Suave orgánico",desc:"Formas blandas, manchas de color y tarjetas flotantes.",best:"Salud, agua, hogar",head:"Bricolage Grotesque",body:"DM Sans",hw:800,sample:["#FBFAF7","#10b981","#8b5cf6"]},
  aurora:{name:"Tech aurora",desc:"Página oscura con aurora de color, cristal y grano.",best:"Fibra premium, energía, lanzamientos",head:"Manrope",body:"Manrope",mono:"JetBrains Mono",hw:800,dark:true,sample:["#07070c","#7c5cff","#22d3ee"]},
  corporate:{name:"Corporativo premium",desc:"Tarjetas en capas, sombras suaves y sellos de confianza.",best:"Alarmas, seguros, grandes marcas",head:"Plus Jakarta Sans",body:"Plus Jakarta Sans",hw:800,sample:["#F4F7FB","#0b1f3a","#0ea5e9"]},
  retro:{name:"Retro cálido",desc:"Pills, sello de estrella, tramas de puntos y colores cálidos.",best:"Promociones, campañas estacionales",head:"Syne",body:"DM Sans",hw:800,sample:["#FFF4E6","#2b1a12","#ff5a1f"]},
  lux:{name:"Minimal lujo",desc:"Serif fina, foto a sangre en blanco y negro y mucho aire.",best:"Marcas premium, alto ticket",head:"Cormorant Garamond",body:"Inter",hw:300,hwBrand:500,sample:["#0e0e0e","#f7f6f3","#b89b5e"]}
};
const LOOK_ORDER=["base","editorial","swiss","brutal","organic","aurora","corporate","retro","lux"];
const NC_SERIF_LOOK=["Instrument Serif","Cormorant Garamond"];
function ncLook(){const k=state.settings.look;return LOOKS[k]?k:"base";}
function ncLookUsesFont(){return ncLook()!=="base"&&!state.settings.lookBrandFont;}
function ncLookFonts(){if(!ncLookUsesFont())return [];const L=LOOKS[ncLook()];return [L.head,L.body,L.mono].filter(Boolean);}
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
  return ":root{--ink0:var(--bink)}"+(`body.lk-${k}{--lk-hw:${hw}}`+css).replace(/&/g,"body.lk-"+k);
}
function ncBrandAccent(){const b=BRANDS[state.settings.brand]||{};const m=String(b.vars||"").match(/--ba:\s*([^;]+)/);return m?m[1].trim():"#C1FF33";}

/* Composición "foto protagonista" + ilustración: se incluye siempre que haya un bloque v4 (también en Base) */
function ncHxCSS(){return `
.nci{width:1.1em;height:1.1em;flex:0 0 auto;display:inline-block;vertical-align:-.16em}
.nc-hx .nc-hx-form{margin-top:26px;max-width:540px}
.nc-hx .nc-hx-form .da-inline .nc-legal,.nc-hx .nc-hx-form .da-inline .nc-legal-info{color:var(--bmuted)}
.nc-hx .nc-hx-alt{display:flex;flex-wrap:wrap;gap:10px 18px;align-items:center;margin-top:16px;font-size:14.5px}
.nc-hx .nc-hx-alt a{color:var(--bink);font-weight:600;text-decoration:none;display:inline-flex;gap:8px;align-items:center;border-bottom:1.5px solid color-mix(in srgb,var(--bp) 50%,transparent);padding-bottom:2px}
.nc-hx .nc-hx-big{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.nc-hx .nc-hx-or{font-size:13px;color:var(--bmuted);margin:16px 0 8px}
.nc-hx{overflow-x:clip}.nc-vis-wrap{position:relative;isolation:isolate}
.nc-vis{position:relative;overflow:hidden;aspect-ratio:4/5;max-height:600px;width:100%;border-radius:24px;background:var(--bsoft);box-shadow:0 30px 60px -30px color-mix(in srgb,var(--bink) 50%,transparent)}
.nc-vis>img,.nc-vis>.nc-ill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
.nc-ill .s1{stop-color:color-mix(in srgb,var(--bp) 22%,#fff)}.nc-ill .s2{stop-color:color-mix(in srgb,var(--bp) 70%,var(--bink))}.nc-ill .s3{stop-color:color-mix(in srgb,var(--ba) 70%,#fff)}
.nc-ill .ring circle{stroke:rgba(255,255,255,.35);stroke-width:1.5}.nc-ill .card rect{fill:rgba(255,255,255,.92)}.nc-ill .ln rect{fill:var(--bink);opacity:.8}
.nc-ill .pip{fill:var(--bp)}.nc-ill .dot{fill:#fff}.nc-ill .hub{fill:#fff}.nc-ill .ico{stroke:var(--bp)}
.nc-stk{display:none}
.nc-float{position:absolute;left:-22px;bottom:34px;z-index:2;display:flex;gap:10px;align-items:center;background:#fff;color:var(--bink);border-radius:16px;padding:12px 16px;box-shadow:0 18px 40px -12px color-mix(in srgb,var(--bink) 40%,transparent);max-width:78%}
.nc-float .nci{width:34px;height:34px;padding:8px;border-radius:11px;background:color-mix(in srgb,var(--bp) 12%,#fff);color:var(--bpt)}
.nc-float b{display:block;font:800 18px/1.1 var(--fhead)}.nc-float small{display:block;color:var(--bmuted);font-size:12.5px;line-height:1.3}
.db-hero.nc-hx .db-form{position:relative;z-index:2;margin:-120px 18px 0}
.dc-hero.nc-hx{text-align:left}.dc-hero.nc-hx .dc-h1,.dc-hero.nc-hx .dc-sub{margin-left:0}.dc-hero.nc-hx .dc-formbar{margin-left:0}.dc-hero.nc-hx .dc-alt{justify-content:flex-start}.dc-hero.nc-hx .dc-kpis{margin-left:0}.dc-hero.nc-hx .dc-h1{font-size:clamp(38px,5vw,70px)}
.nc-phone{width:300px;max-width:100%;aspect-ratio:9/19;margin:0 auto;border-radius:44px;padding:12px;background:linear-gradient(160deg,#2a2a3a,#111118);box-shadow:0 40px 90px color-mix(in srgb,var(--bp) 35%,transparent),inset 0 0 0 1px rgba(255,255,255,.14);transform:rotate(-4deg)}
.nc-phone .scr{height:100%;border-radius:34px;overflow:hidden;position:relative;background:linear-gradient(180deg,color-mix(in srgb,var(--bp) 18%,#101018),#0b0b14);padding:26px 18px;display:flex;flex-direction:column;gap:12px;color:#fff;text-align:left}
.nc-phone .scr>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.nc-phone .big{font:800 40px/1 var(--fhead);letter-spacing:-.04em;overflow-wrap:anywhere}.nc-phone .lb{font-size:12px;opacity:.6}
.nc-phone .ln{height:9px;border-radius:9px;background:rgba(255,255,255,.1)}
.nc-phone .bars{display:flex;gap:6px;align-items:flex-end;height:110px;margin-top:auto}.nc-phone .bars i{flex:1;border-radius:6px;background:linear-gradient(180deg,var(--bp),color-mix(in srgb,var(--ba) 40%,transparent))}
.nc-phone .tile{border-radius:14px;padding:11px 12px;display:flex;justify-content:space-between;gap:8px;font-size:12.5px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1)}.nc-phone .tile b{color:color-mix(in srgb,var(--ba) 70%,#fff);overflow-wrap:anywhere}
@media (prefers-reduced-motion:no-preference){.nc-float{animation:ncFl 6s ease-in-out infinite}@keyframes ncFl{50%{transform:translateY(-8px)}}
  .nc-hx .nc-hx-txt>*{animation:ncUp .7s cubic-bezier(.2,.7,.2,1) both}.nc-hx .nc-hx-txt>*:nth-child(2){animation-delay:.05s}.nc-hx .nc-hx-txt>*:nth-child(3){animation-delay:.1s}.nc-hx .nc-hx-txt>*:nth-child(n+4){animation-delay:.15s}
  .nc-vis-wrap{animation:ncUp .9s .1s cubic-bezier(.2,.7,.2,1) both}@keyframes ncUp{from{transform:translateY(16px)}}}
@media (max-width:991px){.nc-vis{aspect-ratio:4/3;max-height:340px}.nc-float{left:10px;bottom:-18px}
  .db-hero.nc-hx .nc-vis{aspect-ratio:auto;height:190px}.db-hero.nc-hx .db-form{margin:-60px 10px 0}
  .dc-hero.nc-hx .nc-phone-col{display:none}}
@media (max-width:575px){.nc-float{padding:9px 12px}.nc-float b{font-size:16px}}`;}

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
& .nc-vis{border-radius:999px 999px 0 0;box-shadow:none;aspect-ratio:4/5}& .nc-vis>img{filter:saturate(.85) contrast(1.02)}
& .nc-float{border-radius:0;box-shadow:none;border:1px solid var(--dline);background:var(--lkp)}& .nc-float .nci{background:none;color:var(--bpt);padding:0;width:26px;height:26px}
& .nc-float b{font-weight:var(--lk-hw);font-size:26px}
@media (max-width:991px){& .nc-vis{border-radius:200px 200px 0 0}}`,

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
& .nc-vis{border-radius:0;box-shadow:none;border:1px solid var(--bink)}& .nc-vis>img{filter:grayscale(1) contrast(1.1)}
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
& .nc-vis{border-radius:0;border:2px solid var(--bink);box-shadow:8px 8px 0 var(--bink);transform:rotate(1.2deg);aspect-ratio:1/1}
& .nc-stk{display:grid;place-items:center;position:absolute;z-index:3;top:-22px;right:-14px;width:96px;height:96px;border-radius:50%;background:var(--ba);color:${o.onBa};border:2px solid var(--bink);box-shadow:4px 4px 0 var(--bink);transform:rotate(12deg)}& .nc-stk .nci{width:40px;height:40px}
& .nc-float{border-radius:0;border:2px solid var(--bink);box-shadow:4px 4px 0 var(--bink)}& .nc-float .nci{border-radius:0;background:var(--ba);color:${o.onBa}}
@media (max-width:991px){& .nc-stk{width:70px;height:70px;right:6px;top:-14px}& .nc-stk .nci{width:30px;height:30px}}`,

organic:o=>`
&{--lkp:color-mix(in srgb,var(--bsoft) 30%,#FBFAF7);--dline:color-mix(in srgb,var(--bink) 8%,#fff);background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:#fff!important}
${lkS('nav')}{border-bottom:0}
${lkS('hero')}{position:relative;overflow:hidden}
${lkS('hero','::before')},${lkS('hero','::after')}{content:"";position:absolute;border-radius:50%;filter:blur(80px);opacity:.45;pointer-events:none;z-index:0}
${lkS('hero','::before')}{width:520px;height:520px;background:color-mix(in srgb,var(--bp) 45%,#fff);top:-180px;right:-120px}
${lkS('hero','::after')}{width:420px;height:420px;background:color-mix(in srgb,var(--ba) 55%,#fff);bottom:-200px;left:-120px}
${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:1.02}
${lkS('mark')}{background:linear-gradient(90deg,var(--bpt),color-mix(in srgb,var(--bpt) 45%,var(--ba)));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-style:normal;padding:0}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.025em}
${lkS('kick')}{background:#fff;border:0;border-radius:99px;padding:7px 14px;box-shadow:0 4px 14px color-mix(in srgb,var(--bink) 7%,transparent);font-size:13.5px;font-weight:600;letter-spacing:0;text-transform:none;color:var(--bink);display:inline-flex}
${lkS('btn')}{border-radius:99px!important}
& .da-btn.pri,& .da-go,& .da-call,& .db-chan{box-shadow:0 12px 24px -12px color-mix(in srgb,var(--bp) 70%,transparent)}
${lkS('card')}{border-radius:28px!important;border:0!important;box-shadow:0 20px 50px -20px color-mix(in srgb,var(--bink) 18%,transparent)!important}
& .da-plan.best{box-shadow:0 0 0 2px var(--bp),0 24px 50px -20px color-mix(in srgb,var(--bp) 45%,transparent)!important}
${lkS('input')}{border-radius:16px!important}
& .da-ben .ic{display:grid;place-items:center;width:52px;height:52px;border-radius:18px;background:color-mix(in srgb,var(--bp) 12%,#fff);color:var(--bpt);font-size:24px}
& .db-ctabox,& .dc-cta{border-radius:36px}& .dc-formbar{border-radius:28px}& .dc-lgrid{border-radius:24px}& .db-opt{border-radius:16px}& .db-quote{border-radius:0 20px 20px 0}
& .da-trust{background:#fff!important;border:0}
& .nc-vis{border-radius:46% 54% 42% 58% / 52% 44% 56% 48%;box-shadow:0 30px 60px -20px color-mix(in srgb,var(--bink) 30%,transparent);aspect-ratio:1/1.05}
& .nc-float{border-radius:18px}`,

aurora:o=>`
&{--lkdk:color-mix(in srgb,var(--bink) 16%,#07070C);--lkdk2:color-mix(in srgb,var(--bink) 12%,#0D0D16);--bink:#EEF0FF;--bmuted:#9AA0B8;--dline:rgba(255,255,255,.12);--bsoft:#12121C;--bpaper:var(--lkdk);--bpt:color-mix(in srgb,var(--bp) 55%,#fff);--dk:var(--lkdk);background:var(--lkdk);color:#EEF0FF}
& .dc{--dk:var(--lkdk)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .da-sec.soft,& .db-sec.soft,& .db-ctab,& .da-top,& .da-ctab,${'& .da-foot,& .db-foot,& .dc-foot'}{background:var(--lkdk)!important;color:#EEF0FF}
${lkS('nav')},& .dc-nav{background:color-mix(in srgb,var(--lkdk) 80%,transparent)!important;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--dline)}
& .da-hero,& .db-hero,& .dc-hero{position:relative;overflow:hidden;background:radial-gradient(40% 55% at 18% 20%,color-mix(in srgb,var(--bp) 42%,transparent),transparent 70%),radial-gradient(35% 45% at 85% 10%,color-mix(in srgb,var(--ba) 26%,transparent),transparent 70%),var(--lkdk)!important}
& .da-hero::after,& .db-hero::after,& .dc-hero::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.07;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
& .da-hero>.container,& .db-hero>.container{position:relative;z-index:1}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:1.02;color:#fff}
${lkS('mark')},& .dc-grad{background:linear-gradient(90deg,color-mix(in srgb,var(--bp) 40%,#fff),color-mix(in srgb,var(--bp) 80%,#fff) 45%,color-mix(in srgb,var(--ba) 75%,#fff));-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;font-style:normal;padding:0}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.03em;color:#fff}
${lkS('kick')},& .dc-chip{font:500 12px/1.2 var(--fmono,var(--fbody));letter-spacing:.06em;text-transform:uppercase;color:var(--bmuted);background:rgba(255,255,255,.05);border:1px solid var(--dline);border-radius:99px;padding:6px 12px;display:inline-flex}
${lkS('btn')}{border-radius:14px!important}
& .da-btn.sec{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.22);color:#EEF0FF}
& .da-go.alt,& .db-go,& .db-inline .db-go,& .dc-go{background:#EEF0FF!important;color:#07070C!important}
${lkS('card')}{border-radius:20px!important;background:rgba(255,255,255,.04)!important;border:1px solid var(--dline)!important;box-shadow:none!important;color:#EEF0FF;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}
& .da-card,& .db-form{background:linear-gradient(var(--lkdk2),var(--lkdk2)) padding-box,linear-gradient(135deg,var(--bp),color-mix(in srgb,var(--ba) 40%,transparent),rgba(255,255,255,.08)) border-box!important;border:1px solid transparent!important;box-shadow:0 40px 90px -40px color-mix(in srgb,var(--bp) 60%,transparent)!important}
& .dc-tile.d{background:linear-gradient(135deg,color-mix(in srgb,var(--bp) 22%,transparent),color-mix(in srgb,var(--ba) 10%,transparent))!important;border-color:color-mix(in srgb,var(--bp) 40%,transparent)!important}
& .form-control,& .form-select{background:rgba(255,255,255,.05)!important;border:1px solid rgba(255,255,255,.14)!important;color:#EEF0FF!important;border-radius:12px!important}& .form-control::placeholder{color:#8a90a8}
& .dc-formbar{background:var(--lkdk2);border:1px solid var(--dline)}& .dc-formbar .form-control{background:transparent!important;border:0!important}
& .db-opt{background:rgba(255,255,255,.04);color:#EEF0FF;border-color:var(--dline)}& .db-opt:hover,& .db-opt.on{background:color-mix(in srgb,var(--bp) 22%,transparent);color:#fff}
& .db-quote,& .nc-float{background:rgba(255,255,255,.06);color:#EEF0FF;border:1px solid var(--dline)}& .nc-float .nci{background:color-mix(in srgb,var(--bp) 25%,transparent);color:#fff}
& .db-compare .table{--bs-table-bg:transparent;--bs-table-color:#EEF0FF;--bs-border-color:rgba(255,255,255,.1)}& .db-compare th{background:rgba(255,255,255,.04)!important;color:var(--bmuted)}& .db-compare td.yes{color:#4ade80}
& .accordion{--bs-accordion-bg:transparent;--bs-accordion-color:#EEF0FF;--bs-accordion-border-color:rgba(255,255,255,.12);--bs-accordion-btn-color:#EEF0FF;--bs-accordion-active-bg:rgba(255,255,255,.05);--bs-accordion-active-color:#fff;--bs-accordion-btn-focus-box-shadow:none}
& .accordion-button::after{filter:invert(1) brightness(1.6)}
& .da-trust,& .db-seals,& .dc-logos{border-color:var(--dline)!important}& .dc-lgrid,& .dc-lgrid div{border-color:var(--dline)}
& .da-ctab,& .da-foot,& .db-foot,& .dc-foot,& .da-top{border-top:1px solid var(--dline)}
& .db-ctabox,& .dc-cta{background:radial-gradient(60% 90% at 20% 0%,color-mix(in srgb,var(--bp) 35%,transparent),transparent 70%),var(--lkdk2);border:1px solid var(--dline)}
& .db-inline .db-go{color:#07070C}
& .da-sticky{background:var(--lkdk2);border-top:1px solid var(--dline)}& .db-sticky{background:var(--lkdk2);border:1px solid var(--dline)}& .db-sticky a.pri{background:#EEF0FF;color:#07070C}
& .modal,& #ncCookies{--bink:var(--ink0,#312937);--bmuted:#6b6472}
& .nc-vis{border-radius:28px;box-shadow:0 40px 90px -30px color-mix(in srgb,var(--bp) 55%,transparent);border:1px solid var(--dline)}
& .nc-ill .s1{stop-color:color-mix(in srgb,var(--bp) 40%,#0b0b14)}& .nc-ill .s2{stop-color:#07070C}& .nc-ill .card rect{fill:rgba(255,255,255,.08)}& .nc-ill .ln rect{fill:#fff}& .nc-ill .hub{fill:rgba(255,255,255,.1)}& .nc-ill .ico{stroke:#fff}`,

corporate:o=>`
&{--lkp:color-mix(in srgb,var(--bsoft) 55%,#F4F7FB);--dline:color-mix(in srgb,var(--bink) 11%,#fff)}
${lkS('hero')}{background:linear-gradient(180deg,var(--lkp),#fff)!important}& .da-sec.soft,& .db-sec.soft{background:var(--lkp)!important}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.035em;line-height:1.07}
${lkS('mark')}{background:none;color:var(--bpt);font-style:normal;padding:0}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.025em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--dline);border-radius:99px;padding:6px 12px;font-size:13.5px;font-weight:600;letter-spacing:0;text-transform:none;color:var(--bink)}
& .db-kicker::before{content:"";width:8px;height:8px;border-radius:50%;background:#16a34a;box-shadow:0 0 0 4px rgba(22,163,74,.15)}
${lkS('btn')}{border-radius:12px!important}
& .da-btn.pri,& .da-go,& .da-call,& .db-chan{box-shadow:0 10px 22px -10px color-mix(in srgb,var(--bp) 75%,transparent)}
${lkS('card')}{border-radius:16px!important;border:1px solid var(--dline)!important;box-shadow:0 1px 2px color-mix(in srgb,var(--bink) 5%,transparent),0 8px 24px color-mix(in srgb,var(--bink) 7%,transparent),0 30px 60px -24px color-mix(in srgb,var(--bink) 22%,transparent)!important}
& .da-ben,& .da-plan,& .db-rev,& .dc-tile{transition:transform .2s,box-shadow .2s}& .da-ben:hover,& .da-plan:hover,& .db-rev:hover,& .dc-tile:hover{transform:translateY(-4px)}
${lkS('input')}{border-radius:12px!important;border:1.5px solid var(--dline)!important}
& .da-checks{display:grid;gap:10px;flex-direction:column}& .da-checks li{display:flex;align-items:center;gap:10px}
& .da-checks li:before{content:"";width:20px;height:20px;border-radius:50%;margin:0;flex:0 0 20px;background:#16a34a url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fff' stroke-width='3.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 6 9 17l-5-5'/%3E%3C/svg%3E") center/13px no-repeat}
& .da-ben .ic{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--bp) 14%,#fff),color-mix(in srgb,var(--bp) 5%,#fff));color:var(--bpt);font-size:22px}
& .db-ctabox,& .dc-cta{border-radius:20px}
& .nc-vis{border-radius:22px;box-shadow:0 40px 80px -30px color-mix(in srgb,var(--bink) 45%,transparent);aspect-ratio:5/6}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:-1;inset:26px -18px -18px 26px;border-radius:24px;background:repeating-linear-gradient(45deg,color-mix(in srgb,var(--bp) 18%,#fff) 0 2px,transparent 2px 10px)}
& .nc-float{left:-40px;bottom:40px}@media (max-width:991px){& .nc-vis-wrap::before{inset:14px -8px -8px 14px}& .nc-float{left:10px;bottom:-18px}}`,

retro:o=>`
&{--lkp:color-mix(in srgb,var(--ba) 7%,#FFF4E6);--dline:var(--bink);background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:color-mix(in srgb,var(--bp) 7%,var(--lkp))!important}
${lkS('nav')}{border-bottom:0}
${lkS('hero')}{position:relative;overflow:hidden}
${lkS('hero','::before')}{content:"";position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(color-mix(in srgb,var(--bp) 30%,transparent) 2px,transparent 2.5px);background-size:22px 22px;-webkit-mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 70%);mask-image:radial-gradient(ellipse at 70% 40%,#000 20%,transparent 70%);opacity:.7}
${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.05em;line-height:1}& .da-h1{font-size:clamp(38px,5.6vw,88px)}& .db-h1{font-size:clamp(34px,4.4vw,66px)}& .dc-hero.nc-hx .dc-h1{font-size:clamp(34px,4.4vw,64px)}
${lkS('mark')}{display:inline;background:var(--bp);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;border-radius:.6em;padding:0 .22em .04em;-webkit-box-decoration-break:clone;box-decoration-break:clone;font-style:normal;line-height:1.12}
${lkS('h2')},${lkS('h3')}{font-weight:var(--lk-hw);letter-spacing:-.035em}
${lkS('kick')}{display:inline-flex;border:2px solid var(--bink);border-radius:99px;background:transparent;padding:6px 14px;font-size:13.5px;font-weight:700;letter-spacing:0;text-transform:none;color:var(--bink)}
${lkS('btn')}{border-radius:99px!important;font-weight:700}& .da-btn.sec{border-width:2px}
${lkS('card')}{border-radius:32px!important;border:2px solid var(--bink)!important;box-shadow:none!important}
& .da-row-ben>div:nth-child(2) .da-ben,& .dc-tile.d{background:var(--bp)!important;color:var(--btntext,#fff);border-color:var(--bp)!important}& .da-row-ben>div:nth-child(2) .da-ben h3,& .da-row-ben>div:nth-child(2) .da-ben p,& .da-row-ben>div:nth-child(2) .da-ben .ic{color:inherit}
${lkS('input')}{border-radius:99px!important;border:2px solid var(--bink)!important;padding-left:20px!important}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:color-mix(in srgb,var(--lkp) 70%,transparent)}& .da-trust .it b{color:var(--lkp)}
& .db-ctabox,& .dc-cta{border-radius:40px}& .dc-formbar{border-radius:99px}& .db-opt{border-radius:99px;border:2px solid var(--bink)}& .db-quote{border-radius:24px;border:2px solid var(--bink)}
& .nc-vis{border-radius:999px;border:6px solid #fff;box-shadow:0 20px 40px color-mix(in srgb,var(--bink) 18%,transparent);aspect-ratio:3/4;transform:rotate(-2deg);max-width:440px;margin:0 auto}
& .nc-stk{display:grid;place-items:center;position:absolute;z-index:3;top:-10px;right:4%;width:120px;height:120px;color:var(--btntext,#fff);background:var(--bp);clip-path:polygon(50% 0,57% 16%,73% 8%,71% 26%,89% 28%,79% 43%,94% 53%,77% 59%,83% 76%,65% 73%,62% 91%,50% 78%,38% 91%,35% 73%,17% 76%,23% 59%,6% 53%,21% 43%,11% 28%,29% 26%,27% 8%,43% 16%)}& .nc-stk .nci{width:40px;height:40px}
@media (prefers-reduced-motion:no-preference){& .nc-stk{animation:ncSp 14s linear infinite}@keyframes ncSp{to{transform:rotate(360deg)}}}
& .nc-float{border-radius:99px;border:2px solid var(--bink);box-shadow:none}
@media (max-width:575px){& .da-h1,& .db-h1,& .dc-h1{font-size:clamp(28px,8.6vw,40px);overflow-wrap:anywhere}& .da-h2,& .db-h2,& .dc-h2{overflow-wrap:anywhere}}
@media (max-width:991px){& .nc-vis{aspect-ratio:1/1;max-width:300px}& .nc-stk{width:86px;height:86px;right:0}& .nc-stk .nci{width:30px;height:30px}}`,

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
& .nc-hx.nc-bg .nc-vis>img{filter:grayscale(1) contrast(1.05) brightness(.72)}& .nc-hx.nc-bg .nc-vis>.nc-ill{opacity:.35;filter:grayscale(.6)}
& .nc-hx.nc-bg .nc-bgvis::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,14,14,.35),#0E0E0E 96%),linear-gradient(90deg,color-mix(in srgb,var(--lkg) 25%,transparent),transparent 60%)}
& .nc-hx.nc-bg .nc-float{display:none}
@media (max-width:991px){& .nc-hx.nc-bg{min-height:0;padding-top:70px;padding-bottom:40px}}`
};

/* Vista previa: los {{PLACEHOLDER}} se ven como etiquetas (en el export siguen siendo texto y el checklist los avisa) */
const NC_PH_PREVIEW_CSS=`.nc-phc{display:inline;font:600 .78em/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:0;text-transform:none;font-style:normal;-webkit-text-fill-color:currentColor;background:repeating-linear-gradient(135deg,color-mix(in srgb,currentColor 9%,transparent) 0 6px,color-mix(in srgb,currentColor 4%,transparent) 6px 12px);outline:1px dashed color-mix(in srgb,currentColor 45%,transparent);outline-offset:-1px;border-radius:5px;padding:.08em .35em;white-space:nowrap;vertical-align:.08em}`;
function ncPhChips(html){return String(html).replace(/>([^<]+)</g,(m,t)=>t.indexOf("{{")<0?m:">"+t.replace(/\{\{[^{}<>]{1,40}\}\}/g,x=>`<span class="nc-phc" title="Dato pendiente: se rellena antes de publicar">${x.slice(2,-2).replace(/_/g," ").toLowerCase()}</span>`)+"<");}
