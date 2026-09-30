/* ---------- COLECCIÓN DE ESTILOS (v4.0) ----------
   22 plantillas que nacen con su estilo de diseño sugerido (meta.look): estructura pensada para la personalidad de cada estilo.
   En la galería, "Su estilo" las enseña con el suyo; cualquier otro chip de estilo las previsualiza con ese.
   Copy reutilizado de V4_SECTORS / UC_*. Precios, cifras, opiniones, nombres y ciudades: siempre {{PLACEHOLDER}}. */
function lkTpl(name,look,sec,dir,canal,desc,secs){v4Tpl(name,{group:"Estilos",look,sector:sec,dir,canal,desc},secs);}
const LT_S=V4_SECTORS,LTH=(sec,over)=>ucHero(sec,over),LTF=f=>FOOT(f),LTN=f=>NAV(f);
const LT_TELCO_Q="¿Cuántos sois en casa?|1 o 2,3 o 4,5 o más\n¿Para qué la usáis más?|Series y streaming,Juegos online,Teletrabajo,Lo básico\n¿Necesitáis también móvil?|Sí,No";
const LT_B2B={eyebrow:"Fibra para empresas",headline:"Fibra para tu negocio",highlight:"{{VELOCIDAD}} simétricos",sub:"Te decimos qué necesita tu empresa y cuánto cuesta antes de firmar nada.",price:"{{PRECIO}}",priceUnit:"€/mes + IVA",priceNote:"{{CONDICIONES}}",checks:"Instalación por técnicos\nIP fija opcional\nUn gestor para tu cuenta",cardTitle:"Te llama un gestor",cardSub:"Déjanos tu teléfono y te llamamos en horario de oficina.",cardBtn:"Que me llamen",illus:"wifi"};
const LT_MOV={eyebrow:"Tarifa móvil",headline:"Tu móvil",highlight:"sin letra pequeña",sub:"Gigas, llamadas y precio final claros desde el primer día.",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"IVA incluido",checks:"{{GB}} para navegar\nLlamadas {{LLAMADAS}}\nMantienes tu número",illus:"wifi"};

/* ===== EDITORIAL ===== */
lkTpl("Portada · Salud","revista","Salud","B","form","Revista: portada con titular a lo grande, historia en filas, cita destacada y profesional que atiende.",
  [LTN("db"),LTH("Salud"),{type:"dx_story",props:{title:"Así funciona tu seguro"}},{type:"db_reviews"},{type:"dx_pro",props:{kicker:"Quién te asesora"}},{type:"db_faq",props:{items:LT_S.Salud.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Reportaje · Seguros","revista","Seguros","B","form","Revista: advertorial etiquetado como contenido patrocinado + comparativa y valoraciones.",
  [LTN("db"),{type:"dx_article",props:{kicker:"Seguros"}},{type:"db_compare",props:LT_S.Seguros.compare},{type:"dx_rating"},{type:"db_faq",props:{items:LT_S.Seguros.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Estudio de caso · Legal","expediente","Legal","B","form","Expediente: el caso como un trámite claro. Pasos, lo que pagas, quién lo lleva y garantía.",
  [LTN("db"),LTH("Legal"),{type:"db_steps",props:{title:"Cómo tramitamos tu reclamación",items:"Nos cuentas tu caso|Revisamos tu documentación sin coste.\nPreparamos la reclamación|Un abogado estudia si es viable.\nTe informamos del resultado|Sabrás en qué punto está en todo momento."}},{type:"db_compare",props:LT_S.Legal.compare},{type:"dx_pro"},{type:"dx_guarantee"},{type:"db_faq",props:{items:LT_S.Legal.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Revisión de póliza · Seguros","expediente","Seguros","B","form","Expediente: el formulario es la página. Quiz de revisión de póliza, comparativa y pasos.",
  [LTN("db"),{type:"dx_quiz",props:{steps:UC_Q.Seguros,kicker:"Revisión gratuita",title:"Revisamos tu póliza y te decimos si pagas de más"}},{type:"db_compare",props:LT_S.Seguros.compare},{type:"db_steps"},{type:"db_faq",props:{items:LT_S.Seguros.faq}},LTF("db"),STK("db")]);

/* ===== GRÁFICO ===== */
lkTpl("Geometría · Telco","bauhaus","Telco","A","form","Bauhaus: oferta con formas de color, tarifas, ventajas y comprobador de cobertura.",
  [LTN("da"),LTH("Telco"),{type:"da_plans"},{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"dx_coverage"},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Geometría · Energía","bauhaus","Energía","A","form","Bauhaus: tarifa de luz con calculadora de ahorro justo después del hero.",
  [LTN("da"),LTH("Energía"),{type:"dx_calc",props:{unit:"€/mes"}},{type:"da_plans",props:{plans:LT_S["Energía"].plans}},{type:"da_benefits",props:{items:LT_S["Energía"].benefits}},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Cartel flash · Telco","cartel","Telco","A","form","Cartel: oferta con fecha de fin real, titular gigante sobre el color de la marca y cierre a lo grande.",
  [{type:"da_topbar"},{type:"dx_countdown"},LTN("da"),LTH("Telco"),{type:"da_trust",props:{items:LT_S.Telco.trust}},{type:"da_plans"},{type:"dx_guarantee"},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Cartel llamada · Energía","cartel","Energía","A","call","Cartel: todo empuja a llamar. Titular de cartel, dudas y barra fija de llamada.",
  [LTN("da"),LTH("Energía",{canal:"call",eyebrow:"Te atendemos ahora"}),{type:"da_trust",props:{items:LT_S["Energía"].trust}},{type:"da_benefits",props:{items:LT_S["Energía"].benefits}},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta",props:{variant:"big",title:"¿Lo vemos por teléfono?"}},LTF("da"),STK("da","call")]);
lkTpl("Rótulo · Alarmas","senal","Alarmas","B","form","Señalética: alarma explicada como un camino señalizado. Pasos, qué incluye, zona de servicio.",
  [LTN("db"),LTH("Alarmas"),{type:"db_steps"},{type:"db_compare",props:LT_S.Alarmas.compare},{type:"dx_area",props:{title:"Instalamos en tu zona"}},{type:"db_faq",props:{items:LT_S.Alarmas.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Rótulo · Placas solares","senal","Energía","A","form","Señalética: autoconsumo con instaladores de zona, pasos de la obra y calculadora.",
  [LTN("da"),LTH("Energía",UC_SOLAR),{type:"db_steps",props:{title:"De la visita a producir tu luz",items:"Estudio gratuito|Vemos tu tejado y tu consumo.\nInstalación|Técnicos de tu zona lo dejan funcionando.\nLegalización|Te ayudamos con permisos y ayudas disponibles."}},{type:"dx_calc",props:{title:"¿Cuánto ahorrarías con placas?",unit:"€/mes"}},{type:"dx_area"},{type:"da_faq"},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Plano · Placas solares","plano","Energía","B","form","Plano técnico: quiz de vivienda y consumo, pasos de instalación y estimación de ahorro.",
  [LTN("db"),{type:"dx_quiz",props:{steps:UC_Q.Solar,kicker:"Estudio solar gratis",title:"¿Te salen a cuenta las placas solares?"}},{type:"db_steps",props:{title:"Cómo lo hacemos",items:"Medimos|Tejado, orientación y consumo real.\nDiseñamos|Te proponemos la instalación que encaja.\nInstalamos|Y te enseñamos a seguir tu producción."}},{type:"dx_calc",props:{title:"Estimación de ahorro",unit:"€/mes"}},{type:"db_faq"},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Plano · Fibra","plano","Telco","A","form","Plano técnico: primero la cobertura, luego las tarifas en tabla y las especificaciones.",
  [LTN("da"),LTH("Telco",{layout:"std"}),{type:"dx_coverage"},{type:"da_plans",props:{variant:"table"}},{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta"},LTF("da"),STK("da")]);

/* ===== HECHO A MANO ===== */
lkTpl("Riso · Telco cercana","riso","Telco","A","wa","Risografía: marca cercana, WhatsApp como canal principal y opiniones en muro.",
  [LTN("da"),LTH("Telco",{canal:"wa"}),{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"db_reviews",props:{variant:"wall"}},{type:"dx_letter"},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"dx_wa"},LTF("da"),STK("da","wa")]);
lkTpl("Riso · Luz clara","riso","Energía","A","form","Risografía: tarifa de luz contada con cercanía, nota del equipo y garantía.",
  [LTN("da"),LTH("Energía"),{type:"da_plans",props:{plans:LT_S["Energía"].plans}},{type:"dx_letter"},{type:"dx_guarantee"},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Ticket · Tu factura","ticket","Telco","A","form","Ticket de caja: la tarifa desglosada como un tique, calculadora y garantía.",
  [LTN("da"),LTH("Telco"),{type:"da_plans"},{type:"dx_calc",props:{title:"¿Cuánto pagas ahora?",unit:"€/mes"}},{type:"dx_guarantee"},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Ticket · Compara tu luz","ticket","Energía","A","form","Ticket de caja: tarifas de luz en filas con precio final, dudas y CTA en dos columnas.",
  [{type:"da_topbar"},LTN("da"),LTH("Energía",{layout:"std"}),{type:"da_plans",props:{plans:LT_S["Energía"].plans,variant:"rows"}},{type:"da_trust",props:{items:LT_S["Energía"].trust}},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta",props:{variant:"split"}},LTF("da"),STK("da")]);

/* ===== CARÁCTER ===== */
lkTpl("Setentas · Placas solares","setentas","Energía","A","form","Años 70: sol, arcos y franjas cálidas para autoconsumo. Historia en filas y cierre grande.",
  [LTN("da"),LTH("Energía",UC_SOLAR),{type:"dx_calc",props:{title:"¿Cuánto ahorrarías con placas?",unit:"€/mes"}},{type:"db_steps"},{type:"dx_story"},{type:"da_faq"},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Setentas · Seguro de hogar","setentas","Seguros","B","form","Años 70: seguro de hogar cálido y cercano, pasos, opiniones en muro y dudas.",
  [LTN("db"),LTH("Seguros",{kicker:"Seguro de hogar",headline:"Tu casa, tus cosas",italic:"bien cubiertas",sub:"Revisamos tu póliza y te proponemos coberturas que tengan sentido para tu casa. Sin compromiso."}),{type:"db_steps"},{type:"db_reviews",props:{variant:"wall"}},{type:"db_faq",props:{items:LT_S.Seguros.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Viñeta · Tarifa móvil","comic","Telco","A","form","Cómic pop: tarifa móvil con explosión de precio, ventajas en viñetas y WhatsApp.",
  [{type:"da_topbar"},LTN("da"),LTH("Telco",LT_MOV),{type:"da_plans"},{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"dx_wa"},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Viñeta · Quiz de fibra","comic","Telco","B","form","Cómic pop: quiz divertido para recomendar la fibra que encaja con cada casa.",
  [LTN("db"),{type:"dx_quiz",props:{steps:LT_TELCO_Q,kicker:"En 20 segundos",title:"¿Qué fibra necesita tu casa?",btn:"Ver mi tarifa"}},{type:"da_plans"},{type:"db_reviews",props:{variant:"wall"}},{type:"db_faq",props:{items:LT_S.Telco.faq}},LTF("db"),STK("db")]);
lkTpl("Consola · Fibra empresas","terminal","Telco","A","form","Terminal: fibra para empresas con cobertura, tarifas en tabla y gestor asignado.",
  [LTN("da"),LTH("Telco",LT_B2B),{type:"dx_coverage"},{type:"da_plans",props:{variant:"table"}},{type:"dx_pro",props:{kicker:"Tu gestor"}},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Consola · Alarma con app","terminal","Alarmas","B","form","Terminal: alarma conectada contada en modo técnico. Multipaso, qué incluye y dudas.",
  [LTN("db"),LTH("Alarmas",{kicker:"Alarma conectada",headline:"Tu casa, vigilada",italic:"desde tu móvil",illus:"shield"}),{type:"db_compare",props:LT_S.Alarmas.compare},{type:"db_steps"},{type:"db_faq",props:{items:LT_S.Alarmas.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
