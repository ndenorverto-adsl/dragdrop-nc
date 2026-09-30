/* ---------- PLANTILLAS POR CASO DE USO (v3.9) ----------
   4 familias: Conversión rápida · Cualificación · Contenido que vende · Confianza local.
   Reutilizan el copy por sector de V4_SECTORS. Cifras, precios, opiniones y nombres: siempre {{PLACEHOLDER}}. */
const UC_ILL={"Telco":"wifi","Energía":"bolt","Alarmas":"shield","Seguros":"umbrella","Salud":"heart","Legal":"scale"};
const UC_Q={
  Alarmas:"¿Qué quieres proteger?|Casa,Piso,Negocio,Segunda vivienda\n¿Tienes alarma ahora?|Sí,No\n¿Cuándo la necesitas?|Cuanto antes,Este mes,Solo estoy mirando",
  Seguros:"¿Qué seguro buscas?|Hogar,Coche,Vida,Salud\n¿Tienes seguro ahora?|Sí,No\n¿Cuándo vence el actual?|Este mes,En unos meses,No lo sé",
  Salud:"¿Para quién es el seguro?|Solo para mí,En pareja,Familia,Autónomo\n¿Tienes seguro de salud ahora?|Sí,No\n¿Qué es lo más importante para ti?|Especialistas,Precio,Dental,Centros cerca",
  Solar:"¿Dónde vives?|Casa unifamiliar,Adosado,Piso,Negocio\n¿Cuánto pagas de luz al mes?|Menos de 60 €,60-100 €,100-150 €,Más de 150 €\n¿Eres el propietario?|Sí,No",
  Legal:"¿Qué quieres reclamar?|Gastos de hipoteca,Tarjeta revolving,Cláusula suelo,Otro\n¿Cuándo lo firmaste?|Antes de 2010,Entre 2010 y 2019,Desde 2020\n¿Has reclamado ya?|Sí,No"};
function ucHero(sec,over){const S=V4_SECTORS[sec];return {type:S.dir==="A"?"da_hero":"db_hero",props:Object.assign({illus:UC_ILL[sec]||"spark"},S.hero,over||{})};}
function ucF(sec){return V4_SECTORS[sec].dir==="A"?"da":"db";}
function ucTpl(name,fam,sec,canal,desc,secs){v4Tpl(name,{group:"Casos de uso",fam,sector:sec,dir:V4_SECTORS[sec]?V4_SECTORS[sec].dir:"—",canal,desc},secs);}
const NAV=f=>({type:f+"_nav"}),FOOT=(f,p)=>({type:f+"_footer",props:p}),STK=(f,c)=>({type:f+"_sticky",props:{canal:c||"form"}});
const UC_SOLAR={eyebrow:"Autoconsumo en tu casa",headline:"Placas solares",highlight:"instaladas por técnicos de tu zona",sub:"Te decimos cuánto producirías y cuánto ahorrarías antes de dar el paso. Sin compromiso.",price:"",checks:"Estudio gratuito\nInstalación llave en mano\nTe ayudamos con las ayudas disponibles",cardTitle:"Tu estudio solar gratis",cardSub:"Déjanos tu teléfono y te llamamos con una propuesta para tu tejado.",cardBtn:"Quiero mi estudio"};

/* ===== CONVERSIÓN RÁPIDA ===== */
["Telco","Energía"].forEach(sec=>ucTpl(`Una pantalla · ${sec}`,"Conversión rápida",sec,"form",`${sec}: todo en la primera pantalla (oferta, formulario y confianza). Para tráfico de marca o remarketing.`,
  [NAV("da"),ucHero(sec,{layout:"std"}),{type:"da_trust",props:{items:V4_SECTORS[sec].trust}},FOOT("da"),STK("da")]));
ucTpl("Una pantalla · Alarmas","Conversión rápida","Alarmas","form","Alarmas: hero con multipaso y nada más. Mínima distracción.",[NAV("db"),ucHero("Alarmas"),FOOT("db"),STK("db")]);
ucTpl("Solo llamada · Telco","Conversión rápida","Telco","call","Telco: todo empuja a llamar. Teléfono en cabecera, hero y barra fija; callback como plan B.",
  [NAV("da"),ucHero("Telco",{canal:"call",eyebrow:"Te atendemos ahora"}),{type:"da_trust",props:{variant:"ticker",items:V4_SECTORS.Telco.trust}},{type:"da_faq",props:{items:V4_SECTORS.Telco.faq}},FOOT("da"),STK("da","call")]);
ucTpl("Solo llamada · Seguros","Conversión rápida","Seguros","call","Seguros: llamada directa con un asesor, valoración y dudas resueltas.",
  [NAV("db"),ucHero("Seguros",{canal:"call"}),{type:"dx_rating"},{type:"db_steps"},{type:"db_faq",props:{items:V4_SECTORS.Seguros.faq}},FOOT("db"),STK("db","call")]);
ucTpl("Solo llamada · Teleasistencia","Conversión rápida","Salud","call","Teleasistencia: público mayor y familiares que prefieren hablar.",
  [NAV("db"),ucHero("Salud",{canal:"call",kicker:"Teleasistencia",headline:"Que tus mayores estén acompañados",italic:"las 24 horas",sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",question:"¿Para quién es?",options:"Para mí,Para un familiar",formTitle:"Te informamos sin compromiso",formSub:"Dinos para quién es y te llamamos."}),
   {type:"db_steps",props:{title:"Cómo funciona",items:"Pulsa el botón|En casa o fuera, cuando lo necesites.\nTe atendemos|Un profesional habla contigo al momento.\nMovilizamos ayuda|Avisamos a familiares o a emergencias."}},{type:"db_reviews"},FOOT("db"),STK("db","call")]);
[["Telco",null],["Energía",V4_SECTORS["Energía"].plans]].forEach(([sec,plans])=>ucTpl(`Oferta flash · ${sec}`,"Conversión rápida",sec,"form",`${sec}: oferta con fecha de fin real, cuenta atrás, tarifas y garantía. Estilo sugerido: Brutalista o Retro.`,
  [{type:"da_topbar"},{type:"dx_countdown"},NAV("da"),ucHero(sec),{type:"da_plans",props:plans?{plans}:{}},{type:"dx_guarantee"},{type:"da_faq",props:{items:V4_SECTORS[sec].faq}},{type:"da_cta",props:{variant:"big"}},FOOT("da"),STK("da")]));
ucTpl("Gracias · Llamada","Conversión rápida","Telco","call","Página de gracias tras el formulario: qué pasa ahora, llamar ya o WhatsApp. Lanza el evento thank_you_view.",[NAV("da"),{type:"dx_thanks"},FOOT("da")]);
ucTpl("Gracias · WhatsApp","Conversión rápida","Alarmas","wa","Página de gracias con WhatsApp como canal principal.",[NAV("db"),{type:"dx_thanks",props:{title:"¡Recibido! Te escribimos en breve",sub:"Te escribiremos por WhatsApp al número que nos has dejado en {{TIEMPO_RESPUESTA}}.",callTxt:"¿Prefieres hablar ya? Llámanos",waTxt:"Abrir WhatsApp ahora"}},FOOT("db")]);

/* ===== CUALIFICACIÓN ===== */
[["Alarmas","Alarmas"],["Seguros","Seguros"],["Salud","Salud"],["Energía","Solar"]].forEach(([sec,q])=>ucTpl(`Quiz · ${q==="Solar"?"Placas solares":sec}`,"Cualificación",sec,"form",`Quiz de ${v4L(UC_Q[q]).length} preguntas antes del teléfono: cualifica el lead y sube la tasa de contacto.`,
  [NAV("db"),{type:"dx_quiz",props:{steps:UC_Q[q],kicker:q==="Solar"?"Estudio solar gratis":"Estudio gratuito",title:q==="Solar"?"¿Te salen a cuenta las placas solares?":"Encuentra la opción que encaja contigo"}},{type:"db_seals"},{type:"db_steps"},{type:"db_reviews"},{type:"db_faq",props:{items:V4_SECTORS[sec].faq}},FOOT("db"),STK("db")]));
[["Telco",null],["Energía",V4_SECTORS["Energía"].plans]].forEach(([sec,plans])=>ucTpl(`Comparador · ${sec}`,"Cualificación",sec,"form",`${sec}: tarifas en tabla comparativa arriba, cobertura y dudas. Estilo sugerido: Swiss o Prensa.`,
  [NAV("da"),ucHero(sec,{headline:"Compara y elige",highlight:"tu tarifa",price:"",layout:"std",checks:"Precio final con IVA\nSin permanencia\nTe asesoramos gratis"}),{type:"da_plans",props:Object.assign({variant:"table"},plans?{plans}:{})},{type:"dx_coverage"},{type:"da_faq",props:{items:V4_SECTORS[sec].faq}},{type:"da_cta"},FOOT("da"),STK("da")]));
["Energía","Telco"].forEach(sec=>ucTpl(`Calculadora · ${sec}`,"Cualificación",sec,"form",`${sec}: el visitante calcula su ahorro con el % real del cliente y pide la llamada.`,
  [NAV("da"),ucHero(sec),{type:"dx_calc",props:{unit:"€/mes"}},{type:"da_benefits",props:{items:V4_SECTORS[sec].benefits}},{type:"da_faq",props:{items:V4_SECTORS[sec].faq}},{type:"da_cta"},FOOT("da"),STK("da")]));
ucTpl("Cobertura · Telco","Cualificación","Telco","form","Telco: comprobador de cobertura por código postal justo después del hero.",
  [NAV("da"),ucHero("Telco"),{type:"dx_coverage"},{type:"da_plans"},{type:"da_benefits",props:{items:V4_SECTORS.Telco.benefits}},{type:"da_faq",props:{items:V4_SECTORS.Telco.faq}},FOOT("da"),STK("da")]);
ucTpl("Cobertura · Alarmas","Cualificación","Alarmas","form","Alarmas: ¿llegamos a tu zona? Código postal + zona de servicio + opiniones.",
  [NAV("db"),ucHero("Alarmas"),{type:"dx_coverage",props:{title:"¿Llegamos a tu zona?",sub:"Escribe tu código postal y tu teléfono. Te confirmamos si instalamos en tu dirección y cuándo.",btn:"Comprobar mi zona"}},{type:"dx_area"},{type:"db_reviews"},{type:"db_faq",props:{items:V4_SECTORS.Alarmas.faq}},FOOT("db"),STK("db")]);

/* ===== CONTENIDO QUE VENDE ===== */
ucTpl("Advertorial · Energía","Contenido que vende","Energía","form","Artículo patrocinado (etiquetado como publicidad) que explica el ahorro y lleva a la calculadora. Estilo sugerido: Prensa.",
  [NAV("da"),{type:"dx_article",props:{kicker:"Energía"}},{type:"dx_calc"},{type:"da_cta",props:{variant:"split"}},FOOT("da"),STK("da")]);
ucTpl("Advertorial · Legal","Contenido que vende","Legal","form","Artículo sobre reclamaciones bancarias + quiz de 3 preguntas. Estilo sugerido: Prensa o Editorial.",
  [NAV("db"),{type:"dx_article",props:{kicker:"Tus derechos",ctaTitle:"¿Puedes reclamar tú también?",ctaBtn:"Comprobarlo gratis"}},{type:"dx_quiz",props:{steps:UC_Q.Legal,kicker:"Estudio gratuito",title:"Comprueba si puedes reclamar"}},FOOT("db"),STK("db")]);
ucTpl("Advertorial · Alarmas","Contenido que vende","Alarmas","form","Artículo de seguridad en el hogar con quiz y opiniones.",
  [NAV("db"),{type:"dx_article",props:{kicker:"Seguridad en casa",ctaTitle:"¿Qué protección necesita tu casa?",ctaBtn:"Hacer el test"}},{type:"dx_quiz",props:{steps:UC_Q.Alarmas}},{type:"db_reviews"},FOOT("db"),STK("db")]);
ucTpl("Historia larga · Seguros","Contenido que vende","Seguros","form","Landing larga: problema, solución, cómo funciona, comparativa, quién te atiende y opiniones.",
  [NAV("db"),ucHero("Seguros"),{type:"dx_story"},{type:"db_steps"},{type:"db_compare",props:V4_SECTORS.Seguros.compare},{type:"dx_pro",props:{kicker:"Tu asesor",points:"{{AÑOS}} años de experiencia\nCompara entre {{N_ASEGURADORAS}} aseguradoras\nTe acompaña si tienes un siniestro"}},{type:"db_reviews"},{type:"db_faq",props:{items:V4_SECTORS.Seguros.faq}},{type:"db_cta"},FOOT("db"),STK("db")]);
ucTpl("Historia larga · Legal","Contenido que vende","Legal","form","Landing larga para despacho: el caso, el abogado, lo que pagas y opiniones.",
  [NAV("db"),ucHero("Legal"),{type:"dx_story"},{type:"dx_pro"},{type:"db_compare",props:V4_SECTORS.Legal.compare},{type:"dx_rating"},{type:"db_faq",props:{items:V4_SECTORS.Legal.faq}},{type:"db_cta"},FOOT("db"),STK("db")]);
ucTpl("Guía · Energía","Contenido que vende","Energía","form","Lead magnet: guía descargable a cambio del email (y teléfono opcional). Estilo sugerido: Cuaderno.",
  [NAV("da"),{type:"dx_leadmag"},{type:"da_benefits",props:{items:V4_SECTORS["Energía"].benefits}},{type:"dx_letter"},FOOT("da")]);
ucTpl("Guía · Seguros","Contenido que vende","Seguros","form","Guía descargable para captar leads en fase de investigación.",[NAV("db"),{type:"dx_leadmag"},{type:"db_steps"},{type:"db_faq",props:{items:V4_SECTORS.Seguros.faq}},FOOT("db")]);

/* ===== CONFIANZA LOCAL ===== */
ucTpl("Instalador local · Alarmas","Confianza local","Alarmas","call","Alarmas con técnicos de tu zona: zona de servicio, valoración, garantía. Estilo sugerido: Papel y sello.",
  [NAV("db"),ucHero("Alarmas"),{type:"dx_area"},{type:"dx_rating"},{type:"db_steps"},{type:"db_reviews"},{type:"dx_guarantee"},{type:"db_faq",props:{items:V4_SECTORS.Alarmas.faq}},{type:"db_cta"},FOOT("db"),STK("db","call")]);
ucTpl("Instalador local · Placas solares","Confianza local","Energía","form","Placas solares con instaladores de tu zona, calculadora y garantía.",
  [NAV("da"),ucHero("Energía",UC_SOLAR),{type:"dx_area",props:{title:"Instaladores en tu provincia"}},{type:"dx_calc",props:{title:"¿Cuánto ahorrarías con placas?",sub:"Pon lo que pagas de luz al mes y te enseñamos una estimación."}},{type:"dx_story"},{type:"db_reviews"},{type:"dx_guarantee"},{type:"da_faq",props:{items:"¿Cuánto cuesta una instalación?|{{RESPUESTA}}\n¿Hay ayudas o subvenciones?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}\n¿Qué mantenimiento necesitan?|{{RESPUESTA}}"}},FOOT("da"),STK("da")]);
ucTpl("Profesional · Abogado","Confianza local","Legal","form","Despacho: quién lleva tu caso primero, colegiación y opiniones. Estilo sugerido: Editorial.",
  [NAV("db"),ucHero("Legal"),{type:"dx_pro"},{type:"dx_rating"},{type:"db_steps"},{type:"db_reviews"},{type:"db_faq",props:{items:V4_SECTORS.Legal.faq}},{type:"db_cta"},FOOT("db"),STK("db")]);
ucTpl("Profesional · Clínica","Confianza local","Salud","form","Clínica o centro médico: el profesional, los centros y opiniones.",
  [NAV("db"),ucHero("Salud",{kicker:"{{ESPECIALIDAD}}",headline:"Tu primera consulta",italic:"cuando te venga bien",sub:"Pide cita y te llamamos para buscar el hueco que mejor te encaje.",question:"¿Qué necesitas?",options:"Primera consulta,Revisión,Segunda opinión,Otro",formTitle:"Pide tu cita",btn:"Quiero mi cita"}),{type:"dx_pro",props:{kicker:"Te atiende"}},{type:"dx_area",props:{title:"Nuestros centros",cardTitle:"Pide cita por teléfono"}},{type:"db_reviews"},{type:"db_faq",props:{items:V4_SECTORS.Salud.faq}},FOOT("db"),STK("db")]);
ucTpl("Reseñas primero · Telco","Confianza local","Telco","form","Telco para públicos desconfiados: valoración y opiniones reales antes que la oferta.",
  [NAV("da"),ucHero("Telco",{eyebrow:"{{VALORACION}}★ en {{PLATAFORMA}}"}),{type:"dx_rating"},{type:"db_reviews",props:{variant:"wall"}},{type:"da_plans"},{type:"da_faq",props:{items:V4_SECTORS.Telco.faq}},FOOT("da"),STK("da")]);
ucTpl("Reseñas primero · Alarmas","Confianza local","Alarmas","form","Alarmas: la opinión de otros clientes abre la página.",
  [NAV("db"),{type:"dx_rating"},ucHero("Alarmas"),{type:"db_reviews",props:{variant:"quote"}},{type:"dx_guarantee"},{type:"db_faq",props:{items:V4_SECTORS.Alarmas.faq}},FOOT("db"),STK("db")]);
