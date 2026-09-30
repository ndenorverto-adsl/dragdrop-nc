/* ---------- ESTILOS DE DISEÑO · TANDA 3 (v4.2) ----------
   Postal, Azulejo, Ficha técnica, Memphis, Industrial y Píxel. Mismo contrato que looks.js / looks-x.js:
   "&" = body.lk-<estilo>; colores de la marca (--bp, --ba, --bink); el estilo solo pone papel, letra y oficio. */
Object.assign(FONT_AXES,{"Young Serif":"wght@400","DM Serif Display":"ital@0;1","Libre Franklin":"wght@400;500;600;700;800;900","Righteous":"wght@400","Big Shoulders Stencil Display":"wght@600;700;800;900","Silkscreen":"wght@400;700","Space Grotesk":"wght@400;500;600;700"});
NC_SERIF_LOOK.push("Young Serif","DM Serif Display");
Object.assign(NC_EMOJI,{"🍽":"store","🏭":"building-2"});
Object.assign(LOOKS,{
  postal:{cat:"Hecho a mano",name:"Postal",desc:"Correo de toda la vida: sellos dentados, matasellos, franjas de correo aéreo y renglones.",best:"Marcas cercanas, seguros de hogar, local",head:"DM Serif Display",body:"DM Sans",mono:"IBM Plex Mono",hand:true,hw:400,hwBrand:700,mh:1.04,sample:["#F4EDE1","var(--bp)","#1d1d1b"]},
  azulejo:{cat:"Gráfico",name:"Azulejo",desc:"Mosaico mediterráneo con el color de la marca: celosías, cenefas y esquinas de baldosa.",best:"Energía, hogar, marcas locales",head:"Young Serif",body:"DM Sans",hw:400,hwBrand:700,mh:1.02,sample:["#FBF8F2","var(--bp)","#1d1d1b"]},
  ficha:{cat:"Editorial",name:"Ficha técnica",desc:"Etiqueta de producto: filetes gruesos y finos, tabla de valores y cifras enormes.",best:"Comparadores, tarifas, energía",head:"Libre Franklin",body:"Libre Franklin",mono:"IBM Plex Mono",hw:900,mh:.96,sample:["#ffffff","#111111","var(--bp)"]},
  memphis:{cat:"Carácter",name:"Memphis",desc:"Años 80: garabatos, confeti geométrico, zigzags y sombras de color.",best:"Promos, telco joven, campañas",head:"Righteous",body:"DM Sans",hw:400,hwBrand:800,mh:.98,sample:["#FFF7F0","var(--bp)","#111111"]},
  industrial:{cat:"Gráfico",name:"Industrial",desc:"Chapa, remaches, letra de plantilla (stencil) y cinta de peligro.",best:"Alarmas, seguridad, instalaciones",head:"Big Shoulders Stencil Display",body:"Barlow",mono:"IBM Plex Mono",hw:800,mh:1.1,sample:["#E4E3DF","#1b1c1e","var(--bp)"]},
  pixel:{cat:"Carácter",name:"Píxel",desc:"Videojuego de 8 bits: letra pixelada, bordes escalonados, barras de energía y monedas.",best:"Fibra gaming, telco joven, ocio",head:"Silkscreen",body:"Space Grotesk",mono:"Silkscreen",hw:700,hwBrand:800,mh:.8,sample:["#F2F0FF","var(--bp)","#1a1530"]}
});
["postal","azulejo","ficha","industrial","memphis","pixel"].forEach(k=>{const o={postal:"cuaderno",azulejo:"plano",ficha:"expediente",industrial:"plano",memphis:"comic",pixel:"terminal"}[k];const i=LOOK_ORDER.indexOf(o);LOOK_ORDER.splice(i+1,0,k);});
Object.assign(NC_VOICE_BY_LOOK,{postal:"cercano",memphis:"cercano",pixel:"cercano",azulejo:"cercano"});
Object.assign(V4_AUTO_VAR.trust,{ficha:"big",industrial:"ticker",memphis:"ticker",pixel:"ticker",postal:"big",azulejo:"big"});
Object.assign(V4_AUTO_VAR.ben,{ficha:"rows",postal:"num"});
Object.assign(V4_AUTO_VAR.plans,{ficha:"table",industrial:"table"});
Object.assign(V4_AUTO_VAR.rev,{postal:"wall",memphis:"wall",azulejo:"quote"});
Object.assign(V4_AUTO_VAR.faq,{ficha:"open",industrial:"open"});
Object.assign(V4_AUTO_VAR.cta,{memphis:"big",pixel:"big",industrial:"big",postal:"split",ficha:"split",azulejo:"split"});
Object.assign(V4_AUTO_VAR.steps,{postal:"timeline",industrial:"timeline",pixel:"timeline",azulejo:"timeline"});
Object.assign(V4_AUTO_VAR.foot,{ficha:"full",postal:"full",azulejo:"full"});

const LKY={
  /* celosía de baldosa en el color de la marca */
  tile:(c,s)=>`background-image:radial-gradient(circle at 50% 50%,transparent 0 30%,${c} 31% 34%,transparent 35%),conic-gradient(from 45deg at 50% 50%,${c} 0 25%,transparent 0 50%,${c} 0 75%,transparent 0),linear-gradient(${c},${c});background-size:${s}px ${s}px,${s/2}px ${s/2}px,0 0;background-position:0 0,${s/4}px ${s/4}px,0 0`,
  airmail:"repeating-linear-gradient(-45deg,var(--bp) 0 14px,#fff 14px 24px,var(--ba) 24px 38px,#fff 38px 48px)",
  hazard:"repeating-linear-gradient(-45deg,var(--ba) 0 14px,#1b1c1e 14px 28px)",
  stairs:(c,w)=>`box-shadow:${w}px 0 0 0 ${c},-${w}px 0 0 0 ${c},0 ${w}px 0 0 ${c},0 -${w}px 0 0 ${c}`,
  squiggle:c=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='120' height='24' viewBox='0 0 120 24'><path d='M0 12c10-10 20-10 30 0s20 10 30 0 20-10 30 0 20 10 30 0' fill='none' stroke='${c}' stroke-width='4' stroke-linecap='round'/></svg>`)}")`
};

Object.assign(LOOK_CSS,{
/* ===== POSTAL ===== */
postal:o=>`
&{--lkp:#F4EDE1;--lkw:#FFFCF6;--dline:color-mix(in srgb,var(--bink) 16%,#F4EDE1);--visr:2px;--mkr:2px;--mkb:0;--mksh:0 14px 26px -16px rgba(60,40,10,.45);--visbg:#EDE3D2;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background:var(--lkw)!important;background-image:repeating-linear-gradient(0deg,transparent 0 31px,color-mix(in srgb,var(--bp) 12%,transparent) 31px 32px)!important}
${lkS('nav')}{border-bottom:0;position:relative}${lkS('nav','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:7px;background:${LKY.airmail}}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.015em;line-height:1.02}& .da-h1,& .db-h1{font-size:clamp(42px,5.4vw,82px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:italic;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.01em}${lkS('h3')}{font-family:var(--fbody);font-weight:700;letter-spacing:-.01em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:10px;font:500 11.5px/1 var(--fmono,var(--fbody));letter-spacing:.14em;text-transform:uppercase;color:var(--bpt);background:none;border:1.5px solid currentColor;border-radius:99px;padding:7px 14px;transform:rotate(-3deg);box-shadow:inset 0 0 0 3px var(--lkp),inset 0 0 0 4.5px currentColor}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:4px!important;box-shadow:0 2px 0 rgba(0,0,0,.18)!important;font-weight:700}
& .da-btn.sec{background:var(--lkw);border-width:1.5px}
${lkS('card')}{border-radius:3px!important;border:0!important;box-shadow:var(--mksh)!important;background:var(--lkw)!important}
& .da-card,& .db-form{position:relative;border:10px solid transparent!important;border-image:${LKY.airmail} 12!important;padding:22px!important}
& .da-card::after,& .db-form::after{content:"";position:absolute;top:10px;right:12px;width:62px;height:74px;background:radial-gradient(circle at 0 50%,var(--lkw) 3px,transparent 3.5px) -3px 0/6px 8px repeat-y,radial-gradient(circle at 100% 50%,var(--lkw) 3px,transparent 3.5px) calc(100% + 3px) 0/6px 8px repeat-y,radial-gradient(circle at 50% 0,var(--lkw) 3px,transparent 3.5px) 0 -3px/8px 6px repeat-x,radial-gradient(circle at 50% 100%,var(--lkw) 3px,transparent 3.5px) 0 calc(100% + 3px)/8px 6px repeat-x,color-mix(in srgb,var(--bp) 80%,#fff);transform:rotate(4deg);opacity:.95;pointer-events:none}
& .da-card h2,& .db-form h2{padding-right:70px}
${lkS('input')}{border-radius:0!important;border:0!important;border-bottom:1.5px solid color-mix(in srgb,var(--ink0) 40%,transparent)!important;background:transparent;padding-left:2px!important;font-family:var(--fhand,var(--fbody));font-size:20px!important}
${lkS('num')}{font-family:var(--fhead);font-weight:400!important;letter-spacing:-.01em}
& .da-price{position:relative;padding-right:110px;width:fit-content}& .da-price::after{content:"";position:absolute;right:0;top:50%;width:96px;height:56px;transform:translateY(-50%) rotate(-8deg);border-radius:50%;border:2px solid color-mix(in srgb,var(--bp) 70%,transparent);background:repeating-linear-gradient(0deg,transparent 0 7px,color-mix(in srgb,var(--bp) 55%,transparent) 7px 9px) right/60% 60% no-repeat;opacity:.7}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:var(--bpt)}
& .da-trust{background:var(--lkw)!important;border-color:var(--dline)}& .da-trust .it b{font-family:var(--fhead);font-weight:400}
& .db-step .n{font:400 34px/1 var(--fhead);color:var(--bpt)}
& .db-rev{transform:rotate(-.8deg)}& .row>div:nth-child(even) .db-rev{transform:rotate(.8deg)}& .db-rev blockquote{font-family:var(--fhand,var(--fbody));font-size:22px;line-height:1.25}
${LKX.allR}{border-radius:4px!important}
& .nc-vis.is-photo{border:12px solid #fff;box-shadow:var(--mksh);transform:rotate(-2deg)}& .nc-vis.is-photo>img{filter:sepia(.18) saturate(.95)}& .nc-vis.is-mock::before{display:none}
& .nc-vis-wrap::after{content:"";position:absolute;z-index:3;right:-14px;top:-18px;width:120px;height:120px;border-radius:50%;border:2px solid color-mix(in srgb,var(--ink0) 45%,transparent);box-shadow:inset 0 0 0 8px transparent,inset 0 0 0 9.5px color-mix(in srgb,var(--ink0) 35%,transparent);transform:rotate(-14deg);pointer-events:none;background:repeating-linear-gradient(0deg,transparent 0 10px,color-mix(in srgb,var(--ink0) 30%,transparent) 10px 12px) 130% 50%/80% 50% no-repeat}
& .nc-float{border-radius:2px;box-shadow:var(--mksh);background:var(--lkw)}& .nc-float b{font-family:var(--fhead);font-weight:400}
@media (max-width:575px){& .da-price{padding-right:80px}& .da-price::after{width:70px;height:42px}& .nc-vis-wrap::after{width:84px;height:84px;right:0;top:-10px}}`,

/* ===== AZULEJO ===== */
azulejo:o=>`
&{--lkp:#FBF8F2;--lkt:color-mix(in srgb,var(--bp) 16%,transparent);--dline:color-mix(in srgb,var(--bp) 22%,#fff);--visr:28px 28px 28px 28px;--mkr:18px;--mkb:2px solid var(--bp);--mksh:none;--visbg:color-mix(in srgb,var(--bp) 10%,#fff);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}
& .da-sec.soft,& .db-sec.soft{background-color:#fff!important;${LKY.tile('var(--lkt)',64).replace(/;/g,'!important;')}!important}
${lkS('nav')}{border-bottom:0;position:relative}${lkS('nav','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:14px;background:radial-gradient(circle at 50% 100%,var(--bp) 5px,transparent 5.5px) 0 0/28px 14px repeat-x,linear-gradient(var(--bp),var(--bp)) 0 100%/100% 2px no-repeat}
${lkS('hero')}{position:relative}${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('hero','::before')}{content:"";position:absolute;right:0;top:0;width:34%;height:100%;${LKY.tile('color-mix(in srgb,var(--bp) 11%,transparent)',88)};-webkit-mask:linear-gradient(90deg,transparent,#000 60%);mask:linear-gradient(90deg,transparent,#000 60%);pointer-events:none}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.02em;line-height:1.04}& .da-h1,& .db-h1{font-size:clamp(40px,5.2vw,78px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 0 .04em;background-image:radial-gradient(circle,var(--bp) 2.2px,transparent 2.6px);background-size:11px 7px;background-repeat:repeat-x;background-position:0 100%;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.015em}${lkS('h3')}{font-family:var(--fbody);font-weight:700}
& .da-sec .da-h2::after,& .db-sec .db-h2::after,& .dc-sec .dc-h2::after{content:"";display:block;width:84px;height:14px;margin-top:14px;background:radial-gradient(circle at 7px 7px,var(--bp) 3.5px,transparent 4px) 0 0/14px 14px repeat-x,linear-gradient(45deg,transparent 42%,var(--bp) 43% 57%,transparent 58%) 7px 0/14px 14px repeat-x}
& .text-center .da-h2::after,& .text-center .db-h2::after{margin-left:auto;margin-right:auto}
${lkS('kick')}{display:inline-flex;align-items:center;gap:9px;font:600 12.5px/1 var(--fbody);letter-spacing:.08em;text-transform:uppercase;color:var(--bpt);background:none;border:0;padding:0}
${lkS('kick','::before')}{content:"";width:16px;height:16px;background:var(--bp);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);box-shadow:none}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:14px!important;box-shadow:none!important;font-weight:700}& .da-btn.sec{background:#fff;border-width:2px}
${lkS('card')}{border-radius:18px!important;box-shadow:none!important;border:2px solid var(--dline)!important;background:#fff!important}
& .da-card,& .db-form{border:2px solid var(--bp)!important;position:relative}
& .da-card::before,& .da-card::after,& .db-form::before,& .db-form::after{content:"";position:absolute;width:34px;height:34px;${LKY.tile('var(--bp)',34)};border-radius:6px;pointer-events:none}
& .da-card::before,& .db-form::before{top:-12px;left:-12px}& .da-card::after,& .db-form::after{bottom:-12px;right:-12px}
${lkS('input')}{border-radius:12px!important;border:2px solid var(--dline)!important;background:var(--lkp)}
${lkS('num')}{font-family:var(--fhead);font-weight:400!important;letter-spacing:-.02em;color:var(--bpt)}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:#fff;background:var(--bp);border-radius:12px;padding:8px;width:40px;height:40px}
& .da-trust{background:var(--bp)!important;border:0}& .da-trust .it{color:color-mix(in srgb,var(--btntext,#fff) 80%,transparent)}& .da-trust .it b{color:var(--btntext,#fff);font-family:var(--fhead);font-weight:400}
& .db-step .n{display:grid;place-items:center;width:46px;height:46px;background:var(--bp);color:var(--btntext,#fff);clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);font:400 18px/1 var(--fhead)}
${LKX.allR}{border-radius:14px!important}
& .nc-vis{border:2px solid var(--bp);box-shadow:none}& .nc-vis.is-mock::before{display:none}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:-1;inset:-18px -18px 18px 18px;border-radius:32px;${LKY.tile('color-mix(in srgb,var(--bp) 30%,transparent)',56)}}
& .nc-float{border-radius:14px;box-shadow:none;border:2px solid var(--bp)}& .nc-float .nci{border-radius:10px;background:var(--bp);color:var(--btntext,#fff)}
@media (max-width:767px){${lkS('hero','::before')}{display:none}& .nc-vis-wrap::before{inset:-10px -8px 10px 8px}}`,

/* ===== FICHA TÉCNICA ===== */
ficha:o=>`
&{--lkp:#fff;--dline:var(--bink);--visr:0;--mkr:0;--mkb:2px solid var(--ink0);--mksh:none;--visbg:#F2F2F0;--visdeco:transparent;background:#fff}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab,& .da-sec.soft,& .db-sec.soft{background:#fff!important}& .da-sec.soft,& .db-sec.soft{background:#F6F6F4!important}
${lkS('nav')}{border-bottom:8px solid var(--bink)}& .da-sec,& .db-sec,& .dc-sec{border-top:1px solid var(--bink)}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.045em;line-height:.94}& .da-h1,& .db-h1{font-size:clamp(42px,5.8vw,92px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.04em;line-height:.98;padding-bottom:10px;border-bottom:8px solid var(--bink)}
& .da-sec .text-center .da-h2,& .db-sec .text-center .db-h2{display:inline-block}
${lkS('h3')}{font-weight:900;letter-spacing:-.02em}
${lkS('kick')}{display:inline-flex;font:500 12px/1 var(--fmono);letter-spacing:.04em;text-transform:uppercase;color:var(--bink);background:none;border:1px solid var(--bink);border-radius:0;padding:6px 9px}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;box-shadow:none!important;font-weight:900;letter-spacing:-.01em}& .da-btn.sec{background:#fff;border-width:2px}
${lkS('card')}{border-radius:0!important;box-shadow:none!important;border:2px solid var(--bink)!important;background:#fff!important}
& .da-card,& .db-form{border-width:3px!important;padding:16px 18px 18px!important}
& .da-card h2,& .db-form h2{font-weight:900;letter-spacing:-.03em;font-size:26px;padding-bottom:6px;border-bottom:10px solid var(--bink);margin-bottom:10px}
& .da-plan h3{padding-bottom:6px;border-bottom:8px solid var(--bink)}& .da-plan li{border-bottom:1px solid var(--bink)!important;display:flex;justify-content:space-between;font-weight:600}
& .da-plan .pp{border-bottom:4px solid var(--bink);padding-bottom:8px}
${lkS('input')}{border-radius:0!important;border:2px solid var(--bink)!important;font-weight:600}
${lkS('num')}{font-weight:900!important;letter-spacing:-.05em}
& .da-price{border-top:8px solid var(--bink);border-bottom:2px solid var(--bink);padding:10px 0;max-width:560px}& .da-price .p{font-size:clamp(56px,6vw,96px)}
& .da-checks{display:grid;grid-template-columns:1fr;gap:0;max-width:560px}& .da-checks li{border-bottom:1px solid var(--bink);padding:7px 0;font-weight:600}& .da-checks li:before{color:var(--bpt)}
& .da-ben{border:0!important;border-top:4px solid var(--bink)!important;padding:14px 0 0!important}& .da-ben .ic{color:var(--bpt)}
& .da-trust{border-top:8px solid var(--bink)!important;border-bottom:1px solid var(--bink)!important}& .da-trust .row>div+div .it{border-left:1px solid var(--bink);padding-left:14px}& .da-trust .it b{font-size:clamp(28px,3vw,40px)}
& .db-step{border-top:8px solid var(--bink)!important}& .db-step .n{font:500 12px/1 var(--fmono)}
& .db-compare,& .dx-ptab{border:3px solid var(--bink)!important;border-radius:0!important}& .db-compare th,& .db-compare td{border-color:var(--bink)!important}
& .db-quote{border-left:8px solid var(--bink);background:#F6F6F4;border-radius:0}
${LKX.allR}{border-radius:0!important}
& .nc-vis{border:3px solid var(--bink);box-shadow:none}& .nc-vis.is-photo>img{filter:grayscale(1) contrast(1.12)}& .nc-vis.is-mock::before{display:none}& .mk-sheet{transform:none!important}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-18px;right:-10px;width:118px;height:118px;border:3px solid var(--bink);background:#fff;color:var(--ink0);padding:10px}& .nc-stk b{font:900 26px/1 var(--fhead);letter-spacing:-.04em;overflow-wrap:anywhere}& .nc-stk small{font:500 9.5px/1.2 var(--fmono);text-transform:uppercase;border-top:4px solid var(--bink);padding-top:4px;margin-top:4px}
& .nc-float{border-radius:0;box-shadow:none;border:3px solid var(--bink)}& .nc-float .nci{border-radius:0;background:none}
@media (max-width:991px){& .nc-stk{width:92px;height:92px;right:4px;top:-12px}& .nc-stk b{font-size:19px}}`,

/* ===== MEMPHIS ===== */
memphis:o=>`
&{--lkp:#FFF7F0;--lk2:color-mix(in srgb,var(--ba) 70%,#ffd23f);--lk3:color-mix(in srgb,var(--bp) 45%,#ff7eb6);--dline:var(--bink);--visr:26px;--mkr:20px;--mkb:3px solid var(--ink0);--mksh:8px 8px 0 var(--lk3);--visbg:color-mix(in srgb,var(--lk2) 45%,#fff);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}& .da-sec.soft,& .db-sec.soft{background-color:color-mix(in srgb,var(--lk2) 26%,#fff)!important}
${lkS('hero')}{position:relative;overflow:hidden}${lkS('hero','>.container')}{position:relative;z-index:1}
${lkS('hero','::before')}{content:"";position:absolute;inset:0;pointer-events:none;background:
 radial-gradient(circle,var(--bp) 7px,transparent 7.5px) 6% 18%/1px 1px no-repeat,
 linear-gradient(45deg,transparent 45%,var(--bink) 45% 55%,transparent 55%) 92% 12%/34px 34px no-repeat,
 radial-gradient(circle,transparent 11px,var(--lk3) 11.5px 16px,transparent 16.5px) 96% 78%/40px 40px no-repeat,
 conic-gradient(from 90deg at 50% 50%,var(--lk2) 0 25%,transparent 0) 4% 88%/40px 40px no-repeat,
 ${LKY.squiggle('#1d1d1b')} 48% 95%/120px 24px no-repeat;opacity:.9}
${lkS('h1')}{font-weight:var(--lk-hw);letter-spacing:-.01em;line-height:1.02}& .da-h1,& .db-h1{font-size:clamp(40px,5.4vw,84px)}
${lkS('mark')}{background:linear-gradient(transparent 55%,var(--lk2) 55% 92%,transparent 92%);color:inherit;-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .06em;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')}{font-weight:var(--lk-hw);letter-spacing:-.005em}${lkS('h3')}{font-family:var(--fbody);font-weight:800}
& .da-sec .da-h2::after,& .db-sec .db-h2::after,& .dc-sec .dc-h2::after{content:"";display:block;width:120px;height:24px;margin-top:10px;background:${LKY.squiggle('#1d1d1b')} 0 0/120px 24px no-repeat}
& .text-center .da-h2::after,& .text-center .db-h2::after{margin-left:auto;margin-right:auto}
${lkS('kick')}{display:inline-flex;font:800 13px/1 var(--fbody);letter-spacing:.02em;text-transform:uppercase;background:var(--lk3);color:#1d1d1b;border:3px solid var(--bink);border-radius:99px;padding:7px 14px;transform:rotate(-3deg)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:99px!important;border:3px solid var(--bink)!important;box-shadow:5px 5px 0 var(--lk2)!important;font-weight:800}
${lkS('btn',':hover')}{box-shadow:2px 2px 0 var(--lk2)!important;transform:translate(3px,3px)}& .da-btn.sec{background:#fff}
${lkS('card')}{border-radius:22px!important;border:3px solid var(--bink)!important;box-shadow:8px 8px 0 var(--lk3)!important;background:#fff!important}
& .row>div:nth-child(3n+2) .da-ben,& .row>div:nth-child(3n+2) .db-rev,& .row>div:nth-child(3n+2) .da-plan{box-shadow:8px 8px 0 var(--lk2)!important}& .row>div:nth-child(3n) .da-ben,& .row>div:nth-child(3n) .db-rev{box-shadow:8px 8px 0 var(--bp)!important}
${lkS('input')}{border-radius:16px!important;border:3px solid var(--bink)!important}
${lkS('num')}{font-family:var(--fhead);font-weight:400!important;letter-spacing:-.01em}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:#1d1d1b;background:var(--lk2);border:3px solid var(--bink);border-radius:50%;padding:7px}
& .da-trust{background:var(--bink)!important;border:0}& .da-trust .it{color:rgba(255,255,255,.72)}& .da-trust .it b{color:var(--lk2);font-family:var(--fhead);font-weight:400}
& .db-step .n{display:grid;place-items:center;width:50px;height:50px;border-radius:50%;background:var(--lk3);border:3px solid var(--bink);font:400 20px/1 var(--fhead);color:#1d1d1b}
${LKX.allR}{border-radius:20px!important}& .da-sticky .da-btn,& .db-sticky a{border-radius:99px!important}
& .nc-vis{border:3px solid var(--bink);box-shadow:var(--mksh)}& .nc-vis.is-mock::before{display:none}& .nc-vis.is-photo>img{filter:saturate(1.2) contrast(1.05)}
& .nc-vis-wrap::before{content:"";position:absolute;z-index:-1;left:-26px;bottom:-26px;width:46%;aspect-ratio:1;border-radius:50%;background:repeating-linear-gradient(45deg,var(--bink) 0 3px,transparent 3px 11px)}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-24px;right:-14px;width:126px;height:126px;background:var(--lk2);border:3px solid var(--bink);border-radius:50%;color:#1d1d1b;transform:rotate(-10deg);padding:14px;box-shadow:5px 5px 0 var(--bink)}& .nc-stk b{font:400 26px/1 var(--fhead);overflow-wrap:anywhere}& .nc-stk small{font:800 10px/1.1 var(--fbody);text-transform:uppercase}
& .nc-float{border-radius:18px;border:3px solid var(--bink);box-shadow:5px 5px 0 var(--lk2)}& .nc-float .nci{border-radius:50%;background:var(--lk3);color:#1d1d1b}
@media (max-width:991px){& .nc-stk{width:96px;height:96px;right:2px;top:-16px}& .nc-stk b{font-size:19px}}
@media (max-width:767px){${lkS('hero','::before')}{opacity:.45}}`,

/* ===== INDUSTRIAL ===== */
industrial:o=>`
&{--lkp:#E4E3DF;--lkm:linear-gradient(180deg,#f3f3f1,#d9d8d4);--dline:color-mix(in srgb,#1b1c1e 30%,#E4E3DF);--visr:4px;--mkr:4px;--mkb:2px solid #1b1c1e;--mksh:0 18px 30px -18px rgba(0,0,0,.55);--visbg:#cfcec9;--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}
${lkS('hero')},& .da-sec.soft,& .db-sec.soft{background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.025) 0 2px,transparent 2px 5px),linear-gradient(180deg,rgba(255,255,255,.35),rgba(0,0,0,.04))!important}
& .da-sec.soft,& .db-sec.soft{background-color:#D6D5D0!important}
${lkS('nav')}{border-bottom:0;position:relative}${lkS('nav','::after')}{content:"";position:absolute;left:0;right:0;bottom:0;height:10px;background:${LKY.hazard}}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:.01em;line-height:.9;color:#1b1c1e}& .da-h1,& .db-h1{font-size:clamp(50px,6.6vw,110px)}
${lkS('mark')}{background:none;color:var(--bpt);-webkit-text-fill-color:currentColor;font-style:normal;padding:0}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:.01em;line-height:.95}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(40px,4.8vw,70px)}
${lkS('h3')}{font-family:var(--fbody);font-weight:700;text-transform:uppercase;letter-spacing:.02em}
${lkS('kick')}{display:inline-flex;align-items:center;gap:8px;font:600 12px/1 var(--fmono);letter-spacing:.1em;text-transform:uppercase;color:#1b1c1e;background:var(--lkm);border:1px solid #1b1c1e;border-radius:3px;padding:8px 12px 8px 26px;position:relative;box-shadow:inset 0 1px 0 #fff}
${lkS('kick','::before')}{content:"";position:absolute;left:9px;top:50%;width:8px;height:8px;border-radius:50%;transform:translateY(-50%);background:radial-gradient(circle at 35% 35%,#fff,#8b8a86 60%,#4b4a47)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:4px!important;box-shadow:inset 0 -3px 0 rgba(0,0,0,.25),0 2px 0 #1b1c1e!important;font-family:var(--fbody);font-weight:800;text-transform:uppercase;letter-spacing:.05em}
& .da-btn.sec{background:var(--lkm);border:2px solid #1b1c1e;color:#1b1c1e}
${lkS('card')}{border-radius:4px!important;border:2px solid #1b1c1e!important;box-shadow:var(--mksh)!important;background:var(--lkm)!important;position:relative}
& .da-card,& .db-form,& .da-plan,& .da-ben,& .db-rev{background-image:radial-gradient(circle,#fff 0 1px,#77766f 1.5px 3px,transparent 3.5px),radial-gradient(circle,#fff 0 1px,#77766f 1.5px 3px,transparent 3.5px),radial-gradient(circle,#fff 0 1px,#77766f 1.5px 3px,transparent 3.5px),radial-gradient(circle,#fff 0 1px,#77766f 1.5px 3px,transparent 3.5px),linear-gradient(180deg,#f3f3f1,#d9d8d4)!important;background-size:8px 8px,8px 8px,8px 8px,8px 8px,100% 100%!important;background-position:8px 8px,calc(100% - 8px) 8px,8px calc(100% - 8px),calc(100% - 8px) calc(100% - 8px),0 0!important;background-repeat:no-repeat!important}
& .da-card,& .db-form{padding-top:34px!important;overflow:hidden}& .da-card::before,& .db-form::before{content:"";position:absolute;left:0;right:0;top:0;height:10px;background:${LKY.hazard}}
${lkS('input')}{border-radius:3px!important;border:2px solid #1b1c1e!important;background:#fff;font-weight:600}
${lkS('num')}{font-family:var(--fhead);font-weight:800!important;letter-spacing:.01em}& .da-price .p{font-size:clamp(60px,6.6vw,104px)}
& .da-checks li:before{color:var(--bpt)}& .da-ben .ic{color:#1b1c1e;background:var(--ba);border:2px solid #1b1c1e;border-radius:4px;padding:7px}
& .da-trust{background:#1b1c1e!important;border:0;position:relative}& .da-trust::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6px;background:${LKY.hazard}}& .da-trust .it{color:rgba(255,255,255,.7)}& .da-trust .it b{color:var(--ba);font-family:var(--fhead);font-size:30px;text-transform:uppercase}
& .db-step .n{font:800 56px/1 var(--fhead);color:var(--bpt)}
& .dx-bigt{text-transform:uppercase;letter-spacing:.01em;line-height:.92}
${LKX.allR}{border-radius:4px!important}
& .nc-vis{border:2px solid #1b1c1e;box-shadow:var(--mksh)}& .nc-vis.is-photo>img{filter:grayscale(.85) contrast(1.15)}& .nc-vis.is-mock::before{display:none}
& .nc-vis-wrap::after{content:"";position:absolute;z-index:3;left:12%;right:12%;bottom:-12px;height:24px;background:${LKY.hazard};border:2px solid #1b1c1e;transform:rotate(-2deg)}
& .nc-float{border-radius:4px;box-shadow:var(--mksh);border:2px solid #1b1c1e;background:var(--lkm)}& .nc-float .nci{border-radius:4px;background:var(--ba);color:${o.onBa}}
@media (max-width:575px){& .da-h1,& .db-h1{font-size:clamp(44px,12.5vw,62px)}& .da-h2,& .db-h2{font-size:clamp(34px,10vw,48px)}}`,

/* ===== PÍXEL ===== */
pixel:o=>`
&{--lkp:#F2F0FF;--lkd:#1a1530;--dline:var(--lkd);--visr:0;--mkr:0;--mkb:4px solid var(--lkd);--mksh:none;--visbg:color-mix(in srgb,var(--bp) 18%,#fff);--visdeco:transparent;background:var(--lkp)}
${lkS('hero')},${lkS('sec')},${lkS('nav')},& .db-ctab{background-color:var(--lkp)!important}
${lkS('hero')}{background-image:linear-gradient(color-mix(in srgb,var(--bp) 8%,transparent) 2px,transparent 2px),linear-gradient(90deg,color-mix(in srgb,var(--bp) 8%,transparent) 2px,transparent 2px)!important;background-size:24px 24px!important}
& .da-sec.soft,& .db-sec.soft{background-color:#fff!important}
${lkS('nav')}{border-bottom:4px solid var(--lkd)}
${lkS('h1')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:0;line-height:1.12;text-shadow:4px 4px 0 color-mix(in srgb,var(--bp) 35%,transparent)}& .da-h1,& .db-h1{font-size:clamp(28px,3.6vw,54px)}& .dc-h1{font-size:clamp(28px,3.8vw,56px)}
${lkS('mark')}{background:var(--bp);color:var(--btntext,#fff);-webkit-text-fill-color:currentColor;font-style:normal;padding:0 .18em;text-shadow:none;-webkit-box-decoration-break:clone;box-decoration-break:clone}
${lkS('h2')}{font-weight:var(--lk-hw);text-transform:uppercase;letter-spacing:0;line-height:1.15}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(24px,2.8vw,40px)}
${lkS('h3')}{font-family:var(--fbody);font-weight:700}
& .da-card h2,& .db-form h2{font-size:18px;text-transform:uppercase}
${lkS('kick')}{display:inline-flex;align-items:center;gap:8px;font:400 12px/1 var(--fhead);letter-spacing:.02em;text-transform:uppercase;color:#fff;background:var(--lkd);border:0;border-radius:0;padding:8px 10px;${LKY.stairs('var(--lkd)',3)}}
${lkS('kick','::before')}{content:"";width:8px;height:8px;background:var(--ba);box-shadow:0 0 0 2px var(--lkd)}& .da-eyebrow .dot{display:none}
${lkS('btn')}{border-radius:0!important;border:0!important;box-shadow:4px 0 0 0 var(--lkd),-4px 0 0 0 var(--lkd),0 4px 0 0 var(--lkd),0 -4px 0 0 var(--lkd),inset -4px -4px 0 0 color-mix(in srgb,#000 25%,transparent)!important;font-family:var(--fhead);font-weight:400;text-transform:uppercase;font-size:14px;letter-spacing:.02em;margin:4px}
${lkS('btn',':active')}{box-shadow:4px 0 0 0 var(--lkd),-4px 0 0 0 var(--lkd),0 4px 0 0 var(--lkd),0 -4px 0 0 var(--lkd),inset 4px 4px 0 0 color-mix(in srgb,#000 25%,transparent)!important}
& .da-btn.sec{background:#fff;color:var(--lkd)}
${lkS('card')}{border-radius:0!important;border:0!important;box-shadow:4px 0 0 0 var(--lkd),-4px 0 0 0 var(--lkd),0 4px 0 0 var(--lkd),0 -4px 0 0 var(--lkd),8px 8px 0 0 color-mix(in srgb,var(--bp) 40%,transparent)!important;background:#fff!important;margin:4px}
${lkS('input')}{border-radius:0!important;border:0!important;box-shadow:inset 0 0 0 3px var(--lkd)!important;background:#fff;font-family:var(--fbody)}
${lkS('num')}{font-family:var(--fhead);font-weight:700!important;letter-spacing:0}& .da-price .p{font-size:clamp(34px,4vw,56px)}& .da-plan .pp{font-size:28px}
& .da-price{position:relative;padding-bottom:18px}& .da-price::after{content:"";position:absolute;left:0;bottom:0;width:min(260px,70%);height:10px;background:linear-gradient(90deg,var(--ba) 0 72%,transparent 72%),repeating-linear-gradient(90deg,var(--lkd) 0 2px,transparent 2px 26px);box-shadow:0 0 0 3px var(--lkd)}
& .da-checks li:before{content:"";display:inline-block;width:10px;height:10px;background:var(--ba);box-shadow:0 0 0 2px var(--lkd);margin-right:8px;vertical-align:1px}
& .da-ben .ic{color:#fff;background:var(--bp);padding:8px;box-shadow:0 0 0 3px var(--lkd)}
& .da-trust{background:var(--lkd)!important;border:0}& .da-trust .it{color:rgba(255,255,255,.72)}& .da-trust .it b{color:var(--ba);font-family:var(--fhead);font-weight:400;font-size:18px}
& .db-step .n{display:grid;place-items:center;width:42px;height:42px;background:var(--ba);color:${o.onBa};font:400 16px/1 var(--fhead);box-shadow:0 0 0 3px var(--lkd)}
${LKX.allR}{border-radius:0!important}
& .nc-vis{box-shadow:6px 0 0 0 var(--lkd),-6px 0 0 0 var(--lkd),0 6px 0 0 var(--lkd),0 -6px 0 0 var(--lkd);margin:6px;width:calc(100% - 12px);image-rendering:pixelated}& .nc-vis.is-mock::before{display:none}& .nc-vis.is-photo>img{filter:contrast(1.1) saturate(1.2)}
& .nc-stk{display:grid;place-content:center;text-align:center;position:absolute;z-index:3;top:-22px;right:-10px;width:112px;height:112px;background:var(--ba);color:${o.onBa};padding:10px;box-shadow:4px 0 0 0 var(--lkd),-4px 0 0 0 var(--lkd),0 4px 0 0 var(--lkd),0 -4px 0 0 var(--lkd),8px 8px 0 0 var(--lkd)}& .nc-stk b{font:700 18px/1.1 var(--fhead);overflow-wrap:anywhere}& .nc-stk small{font:400 9px/1.2 var(--fhead);text-transform:uppercase}
& .nc-float{border-radius:0;box-shadow:4px 0 0 0 var(--lkd),-4px 0 0 0 var(--lkd),0 4px 0 0 var(--lkd),0 -4px 0 0 var(--lkd)}& .nc-float .nci{border-radius:0;background:var(--ba);color:${o.onBa}}& .nc-float b{font-family:var(--fhead);font-weight:400;font-size:14px}
& .nc-ann .t{font-family:var(--fhead)!important;font-size:13px!important;text-transform:uppercase}
& .dx-bigt{font-size:clamp(28px,3.8vw,56px);text-transform:uppercase;letter-spacing:0;line-height:1.15}
@media (max-width:767px){& .da-h1,& .db-h1{font-size:clamp(24px,7vw,30px)}& .da-h2,& .db-h2,& .dc-h2{font-size:clamp(20px,6vw,26px)}& .nc-stk{width:88px;height:88px;right:6px;top:-14px}& .nc-stk b{font-size:14px}}`
});
["postal","azulejo","ficha","memphis","industrial","pixel"].forEach(k=>{const f=LOOK_CSS[k];LOOK_CSS[k]=o=>f(o)+`
& .dc-tile.d{background:var(--dk)!important;color:#fff;-webkit-mask:none;mask:none;background-image:none!important}& .dc-tile.d h3,& .dc-tile.d p,& .dc-tile.d .big{color:inherit}
& .dc-kpi{background:var(--gl)!important;border:1px solid var(--gb)!important;box-shadow:none!important;transform:none!important;-webkit-mask:none;mask:none;filter:none;background-image:none!important}`;});
