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

/* ===== TANDA 3 (v4.2): Postal, Azulejo, Ficha técnica, Memphis, Industrial y Píxel ===== */
const LT_HOGAR={kicker:"Seguro de hogar",headline:"Tu casa, tus cosas",italic:"bien cubiertas",sub:"Revisamos tu póliza y te proponemos coberturas que tengan sentido para tu casa. Sin compromiso."};
const LT_TELEA={kicker:"Teleasistencia",headline:"Que tus mayores estén acompañados",italic:"las 24 horas",sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",question:"¿Para quién es?",options:"🙋 Para mí|👵 Para un familiar",formTitle:"Te informamos sin compromiso",formSub:"Dinos para quién es y te llamamos."};
const LT_GAMER={eyebrow:"Fibra para jugar",headline:"Tu fibra para jugar",highlight:"con {{LATENCIA}} ms de ping",sub:"Velocidad simétrica y router preparado para jugar online, ver streaming y teletrabajar a la vez.",price:"{{PRECIO}}",priceUnit:"€/mes",priceNote:"IVA incluido",checks:"{{VELOCIDAD}} simétricos\nRouter wifi {{WIFI}}\nSin permanencia",illus:"wifi"};
const LT_GAMER_Q="¿Qué usáis más en casa?|Juegos online,Streaming,Teletrabajo,Un poco de todo\n¿Cuántos dispositivos a la vez?|1-3,4-6,7 o más\n¿Qué te importa más?|El ping,La velocidad,El precio";
const LT_NEG={kicker:"Alarma para negocios",headline:"Tu negocio protegido",italic:"también cuando cierras",sub:"Un técnico estudia tu local y te propone la protección que necesitas. Sin compromiso.",question:"¿Qué tipo de negocio es?",options:"🏪 Tienda|🍽 Restaurante|🏢 Oficina|🏭 Nave"};
const LT_NAVE={eyebrow:"Autoconsumo para empresas",headline:"Placas solares",highlight:"para tu nave o negocio",sub:"Estudiamos tu consumo y te decimos cuánto producirías antes de invertir.",price:"",checks:"Estudio técnico gratuito\nInstalación llave en mano\nTe ayudamos con las ayudas disponibles",cardTitle:"Tu estudio para empresas",cardSub:"Déjanos tu teléfono y te llama un técnico.",cardBtn:"Quiero mi estudio",illus:"bolt"};

lkTpl("Carta · Seguro de hogar","postal","Seguros","B","form","Postal: seguro de hogar con nota del equipo firmada, pasos y opiniones en muro.",
  [LTN("db"),LTH("Seguros",LT_HOGAR),{type:"dx_letter"},{type:"db_steps"},{type:"db_reviews",props:{variant:"wall"}},{type:"db_faq",props:{items:LT_S.Seguros.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Carta · Teleasistencia","postal","Salud","B","call","Postal: teleasistencia para familias, cercana y con la llamada como canal principal.",
  [LTN("db"),LTH("Salud",Object.assign({canal:"call"},LT_TELEA)),{type:"db_steps",props:{title:"Cómo funciona",items:"Pulsa el botón|En casa o fuera, cuando lo necesites.\nTe atendemos|Un profesional habla contigo al momento.\nMovilizamos ayuda|Avisamos a familiares o a emergencias."}},{type:"dx_letter"},{type:"db_reviews"},{type:"db_faq",props:{items:LT_S.Salud.faq}},LTF("db"),STK("db","call")]);
lkTpl("Mosaico · Placas solares","azulejo","Energía","A","form","Azulejo: autoconsumo con instaladores de zona, calculadora y pasos de la obra.",
  [LTN("da"),LTH("Energía",UC_SOLAR),{type:"dx_area"},{type:"dx_calc",props:{title:"¿Cuánto ahorrarías con placas?",unit:"€/mes"}},{type:"db_steps"},{type:"da_faq"},{type:"da_cta",props:{variant:"split"}},LTF("da"),STK("da")]);
lkTpl("Mosaico · Luz de tu zona","azulejo","Energía","A","form","Azulejo: comercializadora cercana con zona de servicio, tarifas y ventajas.",
  [LTN("da"),LTH("Energía"),{type:"dx_area",props:{title:"Te atendemos en tu zona"}},{type:"da_plans",props:{plans:LT_S["Energía"].plans}},{type:"da_benefits",props:{items:LT_S["Energía"].benefits}},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Ficha · Compara tarifas","ficha","Telco","A","form","Ficha técnica: tarifas en tabla con cifras grandes, ventajas en filas y calculadora.",
  [LTN("da"),LTH("Telco",{layout:"std"}),{type:"da_plans",props:{variant:"table"}},{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"dx_calc",props:{title:"¿Cuánto pagas ahora?",unit:"€/mes"}},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta",props:{variant:"split"}},LTF("da"),STK("da")]);
lkTpl("Ficha · Tarifa de luz","ficha","Energía","A","form","Ficha técnica: la tarifa de luz como etiqueta de producto, con garantía y dudas.",
  [LTN("da"),LTH("Energía"),{type:"da_trust",props:{items:LT_S["Energía"].trust}},{type:"da_plans",props:{plans:LT_S["Energía"].plans}},{type:"dx_guarantee"},{type:"da_faq",props:{items:LT_S["Energía"].faq}},{type:"da_cta"},LTF("da"),STK("da")]);
lkTpl("Memphis · Tarifa móvil","memphis","Telco","A","wa","Memphis: tarifa móvil desenfadada con WhatsApp, opiniones en muro y cierre grande.",
  [LTN("da"),LTH("Telco",Object.assign({canal:"wa"},LT_MOV)),{type:"da_plans"},{type:"db_reviews",props:{variant:"wall"}},{type:"dx_wa"},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da","wa")]);
lkTpl("Memphis · Oferta flash","memphis","Telco","A","form","Memphis: oferta con fecha de fin real y cuenta atrás, tarifas y garantía.",
  [{type:"da_topbar"},{type:"dx_countdown"},LTN("da"),LTH("Telco"),{type:"da_trust",props:{items:LT_S.Telco.trust}},{type:"da_plans"},{type:"dx_guarantee"},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Taller · Alarma para negocios","industrial","Alarmas","B","form","Industrial: alarma para locales y naves, con qué incluye, pasos y zona de servicio.",
  [LTN("db"),LTH("Alarmas",LT_NEG),{type:"db_compare",props:LT_S.Alarmas.compare},{type:"db_steps"},{type:"dx_area",props:{title:"Instalamos en tu zona"}},{type:"db_faq",props:{items:LT_S.Alarmas.faq}},{type:"db_cta"},LTF("db"),STK("db")]);
lkTpl("Taller · Autoconsumo empresas","industrial","Energía","A","form","Industrial: placas solares para naves y negocios con calculadora y técnico que atiende.",
  [LTN("da"),LTH("Energía",LT_NAVE),{type:"dx_calc",props:{title:"¿Cuánto paga tu negocio de luz?",unit:"€/mes"}},{type:"db_steps",props:{title:"Así lo hacemos",items:"Visita técnica|Medimos cubierta y consumo.\nProyecto|Te proponemos la instalación y el ahorro estimado.\nInstalación|Y legalización con la distribuidora."}},{type:"dx_pro",props:{kicker:"Quién lleva tu proyecto"}},{type:"da_faq"},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Píxel · Fibra para jugar","pixel","Telco","A","form","Píxel: fibra para gamers con ping y velocidad como protagonistas, cobertura y tarifas.",
  [LTN("da"),LTH("Telco",LT_GAMER),{type:"dx_coverage"},{type:"da_plans"},{type:"da_benefits",props:{items:LT_S.Telco.benefits}},{type:"da_faq",props:{items:LT_S.Telco.faq}},{type:"da_cta",props:{variant:"big"}},LTF("da"),STK("da")]);
lkTpl("Píxel · Quiz gamer","pixel","Telco","B","form","Píxel: quiz de 3 preguntas para recomendar la fibra según cómo se juega en casa.",
  [LTN("db"),{type:"dx_quiz",props:{steps:LT_GAMER_Q,kicker:"Nivel 1 de 3",title:"¿Qué fibra necesita tu partida?",btn:"Ver mi tarifa"}},{type:"da_plans"},{type:"db_reviews",props:{variant:"wall"}},{type:"db_faq",props:{items:LT_S.Telco.faq}},LTF("db"),STK("db")]);
