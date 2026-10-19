/* ---------- CATÁLOGO DE PLANTILLAS v5 ----------
   ~100 plantillas distintas entre sí: cada una tiene su propia secuencia de secciones, su propio hero y su propio
   estilo (no se repite ninguna combinación hero + estilo). Agrupadas por objetivo de conversión.
   · V5_DECK: copy neutro por vertical (14). Lo que es dato de negocio (precios, plazos, cifras, opiniones, nombres,
     coberturas, condiciones) va siempre como {{PLACEHOLDER}}: se rellena con datos reales del cliente.
   · V5_MAP: cómo se rellena cada bloque a partir del copy del vertical.
   · v5(): registra la plantilla (meta para la galería + estilo sugerido). */

/* ===== 1 · COPY POR VERTICAL ===== */
const V5_DECK={
  telco:{s:"Telco",ph:"telco",il:"wifi",u:"€/mes",eb:"Fibra y móvil para casa",h:"Fibra y móvil",hl:"en una sola factura",
    sub:"Todo lo que usas en casa y en el móvil, con el precio final claro antes de contratar.",ck:"Mantienes tu número de móvil\nPrecio final antes de contratar\n{{VENTAJA_DE_LA_OFERTA}}",
    cta:"Quiero esta oferta",btn:"Llamadme gratis",ct:"Te llamamos gratis",cs:"Déjanos tu teléfono y un asesor te confirma el precio final.",opts:"Fibra|Fibra + móvil*|Solo móvil",
    q:"¿Qué necesitas?",qo:"Fibra|Fibra y móvil|Solo móvil|Para mi negocio",
    ben:"wifi|Conexión estable|Fibra {{VELOCIDAD}} con router {{CONDICION_ROUTER}}.\neuro|Precio claro|Te decimos el precio final antes de contratar.\nsmartphone|Mantienes tu número|La portabilidad la gestionamos nosotros.\nwrench|Instalación|Un técnico la deja funcionando en {{PLAZO_INSTALACION}}.",
    st:"Hoy|Nos dejas tu teléfono|Tardas menos de un minuto.\n{{PLAZO_LLAMADA}}|Te llamamos|Te explicamos las opciones y el precio final.\n{{PLAZO_INSTALACION}}|Instalación|Un técnico deja la fibra funcionando.\nDespués|Atención cercana|Un teléfono de contacto para lo que necesites.",
    faq:"¿Hay permanencia?|{{RESPUESTA}}\n¿Cuánto tarda la instalación?|{{RESPUESTA}}\n¿Puedo mantener mi número?|{{RESPUESTA}}\n¿Qué incluye el precio?|{{RESPUESTA}}",
    pl:"Solo fibra|Fibra {{VELOCIDAD_1}};Router incluido;{{CONDICION_1}}\nFibra + móvil|Fibra {{VELOCIDAD_2}};Móvil {{GB_2}};{{CONDICION_2}}\nFibra + 2 móviles|Fibra {{VELOCIDAD_3}};2 líneas {{GB_3}};{{CONDICION_3}}",
    prof:"user|Vivo solo/a|Navegar, series y el móvil de siempre.|0\nusers|Pareja o familia|Varios conectados a la vez y más de un móvil.|1\ntv|Gamer o teletrabajo|Necesitas estabilidad y buena subida.|2",
    no:"{{SERVICIO_NO_INCLUIDO_1}}\n{{SERVICIO_NO_INCLUIDO_2}}",
    quiz:"¿Cuántos sois en casa?|1 o 2,3 o 4,5 o más\n¿Para qué la usáis más?|Series y streaming,Juegos online,Teletrabajo,Lo básico\n¿Necesitáis también móvil?|Sí,1 línea,Varias líneas,No",
    wa:"Quiero saber el precio\n¿Hay cobertura en mi calle?\nPrefiero que me llaméis",art:{k:"Hogar conectado",h:"Lo que conviene revisar de tu tarifa de fibra antes de renovar",lead:"Muchas facturas suben sin que nadie lo note. Revisar velocidad, permanencia y lo que pagas por el móvil lleva cinco minutos y puede cambiar bastante la cuenta final."},
    sav:{l:"Lo que pagas ahora de fibra y móvil",min:20,max:150,v:60},tick:"Precio final claro\nMantienes tu número\nInstalación por técnicos\nAtención por teléfono"},
  movil:{s:"Móvil",ph:"telco",il:"spark",u:"€/mes",eb:"Tarifa móvil",h:"Tu móvil",hl:"sin letra pequeña",
    sub:"Gigas, llamadas y precio final claros desde el primer día. Te cambiamos sin que pierdas tu número.",ck:"Mantienes tu número\nGigas: {{GB}}\n{{CONDICION_PERMANENCIA}}",
    cta:"Quiero esta tarifa",btn:"Llamadme",ct:"¿Te llamamos?",cs:"Te decimos qué tarifa encaja con tu uso real.",opts:"1 línea*|2 líneas|Con fibra",
    q:"¿Cuántas líneas necesitas?",qo:"1 línea|2 líneas|3 o más|Con fibra",
    ben:"smartphone|Tu número de siempre|La portabilidad la gestionamos nosotros.\nglobe|Cobertura|{{COBERTURA}}.\neuro|Sin sorpresas|El precio que ves es el que pagas: {{CONDICIONES}}.\nheadphones|Atención|Personas reales para ayudarte.",
    st:"Hoy|Eliges tarifa|O nos dejas tu teléfono y te ayudamos.\n{{PLAZO_SIM}}|Recibes la SIM|En casa, sin desplazarte.\nEl día del cambio|Portabilidad|Tu número sigue funcionando.\nDespués|Controla tu consumo|Desde la app o por teléfono.",
    faq:"¿Pierdo mi número al cambiarme?|{{RESPUESTA}}\n¿Cuánto tarda la portabilidad?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué pasa si gasto todos los gigas?|{{RESPUESTA}}",
    pl:"Básica|{{GB_1}};Llamadas {{LLAMADAS_1}};{{CONDICION_1}}\nEstándar|{{GB_2}};Llamadas {{LLAMADAS_2}};{{CONDICION_2}}\nIlimitada|{{GB_3}};Llamadas {{LLAMADAS_3}};{{CONDICION_3}}",
    prof:"message-circle|Uso básico|WhatsApp, llamadas y poco más.|0\nheadphones|Uso diario|Redes, música y mapas a diario.|1\ntv|Sin límites|Vídeo, compartir datos y viajar.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Cuántos gigas gastas al mes?|Menos de 10,10 a 50,Más de 50,No lo sé\n¿Cuántas líneas?|1,2,3 o más\n¿Te interesa añadir fibra?|Sí,No,Ya la tengo",
    wa:"¿Qué tarifa me conviene?\nQuiero portar mi número\nPrefiero que me llaméis",art:{k:"Consumo",h:"Cuántos gigas necesitas de verdad (y cuántos estás pagando)",lead:"La mayoría de la gente paga una tarifa pensada para otro uso. Mirar tu consumo de los últimos tres meses es la forma más rápida de saber si te sobra o te falta."},
    sav:{l:"Lo que pagas ahora de móvil",min:5,max:80,v:25},tick:"Tu número de siempre\nGigas claros\nPrecio final\nSIM en casa"},
  luz:{s:"Energía",ph:"energia",il:"bolt",u:"€/kWh",eb:"Cambio sin cortes de luz",h:"Tu luz",hl:"a un precio claro",
    sub:"Te decimos cuánto vas a pagar antes de cambiarte. Nos encargamos del papeleo.",ck:"Sin obras ni técnico en casa\nMantienes tu contador\n{{CONDICION_PERMANENCIA}}",
    cta:"Calcular mi precio",btn:"Llamadme",ct:"Revisamos tu factura",cs:"Te llamamos y comparamos tu factura actual, sin compromiso.",opts:"Luz*|Gas|Luz + gas",
    q:"¿Qué quieres revisar?",qo:"Luz|Gas|Luz y gas|Para mi negocio",
    ben:"plug|Sin cortes|El cambio no interrumpe el suministro.\nfile-text|Sin papeleo|Nos encargamos de todo el trámite.\ntrending-up|Control|Consulta tu consumo cuando quieras.\nheadphones|Atención|Personas reales para ayudarte.",
    st:"Hoy|Nos envías tu factura|O nos dejas tu teléfono.\n{{PLAZO_LLAMADA}}|Te llamamos|Comparamos con lo que pagas ahora.\n{{PLAZO_CAMBIO}}|Gestionamos el cambio|Sin cortes y sin que tengas que hacer nada.\nDespués|Primera factura|Te ayudamos a entenderla.",
    faq:"¿Me quedaré sin luz al cambiar?|{{RESPUESTA}}\n¿Tengo que cambiar el contador?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué necesito para cambiarme?|{{RESPUESTA}}",
    pl:"Precio fijo|{{PRECIO_KWH_1}} €/kWh todo el día;{{CONDICION_1}}\nPor tramos|Más barata en horas valle;{{CONDICION_2}}\nLuz + gas|Una sola factura;{{CONDICION_3}}",
    prof:"house|Piso pequeño|Consumo bajo y poco en casa durante el día.|0\nusers|Familia|Lavadora, horno y consumo repartido.|1\nzap|Con gas|Calefacción o agua caliente con gas.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Qué quieres revisar?|Solo luz,Luz y gas,Solo gas\n¿Cuánto pagas al mes?|Menos de 50 €,50-100 €,Más de 100 €,No lo sé\n¿Cuándo usas más energía?|Por la mañana,Por la tarde,Por la noche,Todo el día",
    wa:"¿Cuánto ahorraría yo?\nTe mando mi factura\nPrefiero que me llaméis",art:{k:"Factura de la luz",h:"Tres líneas de tu factura de la luz que casi nadie revisa",lead:"La potencia contratada, el tipo de tarifa y los servicios añadidos explican buena parte de lo que pagas. Te contamos dónde mirar y qué preguntar antes de cambiarte."},
    sav:{l:"Tu factura de luz al mes",min:20,max:300,v:80},tick:"Sin cortes\nSin papeleo\nPrecio antes de cambiar\nAtención por teléfono"},
  solar:{s:"Solar",ph:"energia",il:"bolt",u:"€",eb:"Autoconsumo en tu casa",h:"Placas solares",hl:"instaladas por técnicos de tu zona",
    sub:"Te decimos cuánto producirías y cuánto ahorrarías antes de instalar nada. Estudio sin compromiso.",ck:"Estudio de tu tejado sin compromiso\nTramitamos {{AYUDAS_O_LICENCIAS}}\n{{GARANTIA_INSTALACION}}",
    cta:"Quiero mi estudio",btn:"Quiero mi estudio",ct:"Estudio gratuito",cs:"Te llamamos para conocer tu casa y tu consumo.",opts:"Casa unifamiliar*|Adosado|Negocio",
    q:"¿Dónde quieres instalar?",qo:"Casa unifamiliar|Adosado|Nave o negocio|Comunidad",
    ben:"sun|Produce tu energía|Consume la electricidad de tu propio tejado.\nclipboard-check|Estudio a medida|Calculamos la instalación según tu consumo real.\nfile-text|Trámites|Nos encargamos de {{TRAMITES}}.\nwrench|Instalación y mantenimiento|{{CONDICIONES_MANTENIMIENTO}}.",
    st:"Hoy|Nos dejas tu teléfono|Y nos cuentas cómo es tu casa.\n{{PLAZO_ESTUDIO}}|Estudio de tu tejado|Calculamos producción y ahorro estimado.\n{{PLAZO_INSTALACION}}|Instalación|Técnicos de tu zona, en {{DIAS_DE_OBRA}}.\nDespués|Seguimiento|Ves tu producción desde la app.",
    faq:"¿Cuánto cuesta una instalación?|{{RESPUESTA}}\n¿Hay ayudas o bonificaciones?|{{RESPUESTA}}\n¿Qué pasa con la energía que no consumo?|{{RESPUESTA}}\n¿Cuánto dura la obra?|{{RESPUESTA}}",
    pl:"Básica|{{N_PANELES_1}} paneles;{{POTENCIA_1}};{{CONDICION_1}}\nCon batería|{{N_PANELES_2}} paneles;Batería {{CAPACIDAD}};{{CONDICION_2}}\nNegocio|Estudio de cubierta;{{POTENCIA_3}};{{CONDICION_3}}",
    prof:"house|Casa con tejado propio|Consumo medio y tejado orientado al sol.|0\nzap|Quiero más autonomía|Guardar energía para la noche.|1\nbuilding-2|Negocio o nave|Mucho consumo en horario laboral.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Qué tipo de vivienda tienes?|Unifamiliar,Adosado,Nave o negocio\n¿Cuánto pagas de luz al mes?|Menos de 60 €,60-120 €,Más de 120 €\n¿El tejado es tuyo?|Sí,Es de la comunidad,No lo sé",
    wa:"¿Mi tejado sirve?\n¿Cuánto me costaría?\nPrefiero que me llaméis",art:{k:"Autoconsumo",h:"Antes de poner placas solares, haz estas cuatro preguntas",lead:"Orientación, sombras, consumo y trámites: lo que conviene saber antes de pedir presupuesto para que la instalación tenga sentido en tu caso."},
    sav:{l:"Tu factura de luz al mes",min:30,max:400,v:110},tick:"Estudio sin compromiso\nTécnicos de tu zona\nTrámites incluidos\nSeguimiento desde la app"},
  alarma:{s:"Alarmas",ph:"alarmas",il:"shield",u:"€/mes",eb:"Alarma para tu hogar",h:"La tranquilidad de saber",hl:"que tu casa está protegida",
    sub:"Un experto estudia tu casa y te propone lo que de verdad necesitas. Sin compromiso.",ck:"Estudio de seguridad sin compromiso\nConectada a Central Receptora\n{{CONDICION_INSTALACION}}",
    cta:"Quiero mi estudio",btn:"Quiero mi estudio",ct:"Estudio de seguridad",cs:"Te llamamos y te recomendamos la protección que encaja con tu casa.",opts:"Piso*|Casa|Negocio",
    q:"¿Dónde lo necesitas?",qo:"🏠 Casa|🏢 Piso|🏪 Negocio|🏡 2ª vivienda",
    ben:"shield-check|Conectada 24 h|Central Receptora que verifica cada aviso.\nsmartphone|Control desde el móvil|Arma, desarma y recibe avisos.\nimage|Cámaras|{{TIPO_DE_CAMARAS}}.\nwrench|Instalación profesional|{{CONDICION_INSTALACION}}.",
    st:"Hoy|Nos cuentas cómo es tu casa|Una pregunta y tu teléfono.\n{{PLAZO_LLAMADA}}|Estudio de seguridad|Te recomendamos la protección que encaja.\n{{PLAZO_INSTALACION}}|Instalación|Técnicos acreditados.\nDespués|Conectada 24 h|Recibes avisos en el móvil.",
    faq:"¿Tiene algún coste el estudio?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué pasa si salta la alarma?|{{RESPUESTA}}\n¿Funciona si se va la luz o internet?|{{RESPUESTA}}",
    pl:"Esencial|{{EQUIPOS_1}};Conexión a Central Receptora;{{CONDICION_1}}\nCon cámaras|{{EQUIPOS_2}};Cámaras {{TIPO_CAMARAS}};{{CONDICION_2}}\nTotal|{{EQUIPOS_3}};{{EXTRA_3}};{{CONDICION_3}}",
    prof:"building-2|Piso|Una entrada principal y pocas ventanas.|0\nhouse|Casa con jardín|Varios accesos y exterior.|1\nglobe|Fuera a menudo|Segunda vivienda o viajes largos.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Qué quieres proteger?|Piso,Casa,Negocio,Segunda vivienda\n¿Tienes alarma ahora?|Sí,No\n¿Cuándo la necesitas?|Cuanto antes,Este mes,Solo estoy mirando",
    wa:"Quiero un estudio de mi casa\n¿Cuánto cuesta al mes?\nPrefiero que me llaméis",art:{k:"Seguridad en casa",h:"Qué mirar al elegir alarma: lo que no te cuentan en el anuncio",lead:"Central Receptora, verificación de avisos, cámaras y permanencia: cuatro puntos que marcan la diferencia entre una alarma que te tranquiliza y una que solo hace ruido."},
    sav:null,tick:"Central Receptora 24 h\nControl desde el móvil\nInstalación profesional\nEstudio sin compromiso"},
  alarmaneg:{s:"Alarmas",ph:"alarmas",il:"shield",u:"€/mes",eb:"Alarma para negocios",h:"Tu negocio protegido",hl:"también cuando cierras",
    sub:"Un técnico estudia tu local y te propone la protección que tiene sentido para tu actividad.",ck:"Estudio del local sin compromiso\nConectada a Central Receptora\n{{VENTAJA_NEGOCIO}}",
    cta:"Pedir estudio del local",btn:"Pedir estudio",ct:"Estudio del local",cs:"Te llamamos para conocer tu negocio y su horario.",opts:"Tienda*|Oficina|Nave|Hostelería",
    q:"¿Qué tipo de negocio tienes?",qo:"🏪 Tienda|🏢 Oficina|🏭 Nave|☕ Hostelería",
    ben:"shield-check|Vigilancia 24 h|Central Receptora que verifica cada aviso.\nimage|Cámaras|Revisa tu local desde el móvil.\nlock|Accesos|{{CONTROL_DE_ACCESOS}}.\nbadge-check|Normativa|{{CERTIFICACION}}.",
    st:"Hoy|Nos cuentas tu negocio|Tipo de local y horario.\n{{PLAZO_VISITA}}|Visita técnica|Estudiamos accesos y puntos sensibles.\n{{PLAZO_INSTALACION}}|Instalación|Fuera de tu horario si lo necesitas.\nDespués|Conectada 24 h|Avisos en el móvil y en la central.",
    faq:"¿Instaláis fuera del horario comercial?|{{RESPUESTA}}\n¿Puedo ver las cámaras desde el móvil?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}\n¿Qué pasa si salta la alarma de noche?|{{RESPUESTA}}",
    pl:"Local pequeño|{{EQUIPOS_1}};Central Receptora;{{CONDICION_1}}\nTienda con cámaras|{{EQUIPOS_2}};Cámaras {{TIPO_CAMARAS}};{{CONDICION_2}}\nNave|{{EQUIPOS_3}};Perímetro exterior;{{CONDICION_3}}",
    prof:"store|Comercio|Escaparate y caja.|1\nbriefcase|Oficina|Equipos y documentación.|0\nbuilding-2|Nave|Mucho perímetro y mercancía.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Qué tipo de negocio es?|Tienda,Oficina,Nave,Hostelería\n¿Cuántos accesos tiene?|1,2-3,Más de 3\n¿Tienes alarma ahora?|Sí,No",
    wa:"Quiero una visita técnica\n¿Cuánto cuesta para mi local?\nPrefiero que me llaméis",art:{k:"Negocios",h:"Lo que debería tener la alarma de un comercio en 2026",lead:"Verificación de avisos, cámaras accesibles desde el móvil y control de quién entra y cuándo: lo básico para que la seguridad no dependa de la suerte."},
    sav:null,tick:"Central Receptora 24 h\nCámaras en el móvil\nVisita técnica\nInstalación fuera de horario"},
  hogar:{s:"Seguros",ph:"seguros",il:"umbrella",u:"€/año",eb:"Seguro de hogar",h:"Tu casa, tus cosas",hl:"bien cubiertas",
    sub:"Revisamos tu póliza y te proponemos coberturas que tengan sentido para tu casa. Sin compromiso.",ck:"Revisión de tu póliza actual\nCoberturas explicadas en claro\n{{VENTAJA_DE_LA_POLIZA}}",
    cta:"Revisar mi seguro",btn:"Llamadme",ct:"Revisamos tu seguro",cs:"Te llamamos y comparamos tu póliza actual.",opts:"Piso*|Casa|Alquiler",
    q:"¿Qué quieres asegurar?",qo:"🏢 Piso|🏠 Casa|🔑 Vivienda en alquiler|🏡 2ª vivienda",
    ben:"umbrella|Coberturas claras|Te explicamos qué cubre y qué no.\nwrench|Reparaciones|{{SERVICIO_REPARACIONES}}.\nphone|Asistencia|{{HORARIO_ASISTENCIA}}.\nfile-text|Sin papeleo|Nos encargamos del cambio de compañía.",
    st:"Hoy|Nos dejas tu teléfono|Y, si quieres, tu póliza actual.\n{{PLAZO_LLAMADA}}|Te llamamos|Revisamos coberturas y precio.\nSi te encaja|Cambio de póliza|Nos encargamos del trámite.\nDespués|Un gestor de referencia|Para partes y dudas.",
    faq:"¿Qué cubre exactamente?|{{RESPUESTA}}\n¿Puedo cambiar de seguro antes del vencimiento?|{{RESPUESTA}}\n¿Cómo doy un parte?|{{RESPUESTA}}\n¿Tiene franquicia?|{{RESPUESTA}}",
    pl:"Básico|{{COBERTURAS_1}};{{CONDICION_1}}\nCompleto|{{COBERTURAS_2}};{{CONDICION_2}}\nPremium|{{COBERTURAS_3}};{{CONDICION_3}}",
    prof:"lock|Vivo de alquiler|Proteger tus cosas y tu responsabilidad.|0\nhouse|Propietario|Continente, contenido y averías.|1\ngem|Casa con valor especial|Joyas, arte o equipos caros.|2",
    no:"{{EXCLUSION_1}}\n{{EXCLUSION_2}}",
    quiz:"¿Qué quieres asegurar?|Piso,Casa,Vivienda en alquiler\n¿Tienes seguro ahora?|Sí,No\n¿Cuándo vence?|Este mes,En 3 meses,Más adelante,No lo sé",
    wa:"Quiero revisar mi póliza\n¿Cuánto me costaría?\nPrefiero que me llaméis",art:{k:"Hogar",h:"Por qué tu seguro de hogar puede estar cubriendo menos de lo que crees",lead:"Infraseguro, franquicias y exclusiones: tres conceptos que explican por qué algunos partes se pagan a medias. Te contamos cómo revisarlo en tu póliza."},
    sav:{l:"Lo que pagas al año",min:80,max:900,v:300},tick:"Coberturas explicadas\nCambio sin papeleo\nGestor de referencia\nRevisión sin compromiso"},
  coche:{s:"Coche",ph:null,il:"umbrella",u:"€/año",eb:"Seguro de coche",h:"Tu seguro de coche",hl:"sin pagar de más",
    sub:"Comparamos tu póliza actual y te decimos qué cobertura encaja con tu coche y tu forma de conducir.",ck:"Comparamos tu póliza actual\nTe explicamos cada cobertura\n{{VENTAJA_DE_LA_POLIZA}}",
    cta:"Comparar mi seguro",btn:"Llamadme",ct:"Comparamos tu seguro",cs:"Ten a mano la matrícula y te damos el precio en la llamada.",opts:"Terceros|Terceros ampliado*|Todo riesgo",
    q:"¿Qué cobertura buscas?",qo:"Terceros|Terceros ampliado|Todo riesgo|No lo sé",
    ben:"car|Cobertura a tu medida|Terceros, ampliado o todo riesgo.\ntruck|Asistencia en carretera|{{CONDICION_ASISTENCIA}}.\nwrench|Talleres|{{RED_DE_TALLERES}}.\nphone|Partes por teléfono|Una persona te guía en el parte.",
    st:"Hoy|Nos dejas tu teléfono|Y la matrícula si la tienes a mano.\n{{PLAZO_LLAMADA}}|Te llamamos|Comparamos coberturas y precio.\nSi te encaja|Contratación|Tu póliza en vigor en {{PLAZO_ALTA}}.\nDespués|Asistencia|Un teléfono para partes y grúa.",
    faq:"¿Puedo cambiarme antes del vencimiento?|{{RESPUESTA}}\n¿Qué incluye la asistencia en carretera?|{{RESPUESTA}}\n¿Tiene franquicia?|{{RESPUESTA}}\n¿Puedo elegir taller?|{{RESPUESTA}}",
    pl:"Terceros|Responsabilidad civil;{{COBERTURA_1}};{{CONDICION_1}}\nTerceros ampliado|Lunas, robo e incendio;{{COBERTURA_2}};{{CONDICION_2}}\nTodo riesgo|Daños propios;{{FRANQUICIA_3}};{{CONDICION_3}}",
    prof:"car|Coche con años|Uso diario y valor bajo.|0\nmap|Muchos kilómetros|Viajes y carretera a menudo.|1\nsparkles|Coche nuevo|Quieres cubrir daños propios.|2",
    no:"{{EXCLUSION_1}}\n{{EXCLUSION_2}}",
    quiz:"¿Qué antigüedad tiene tu coche?|Menos de 3 años,3 a 8 años,Más de 8\n¿Cuántos km haces al año?|Menos de 10.000,10.000-20.000,Más de 20.000\n¿Qué cobertura tienes ahora?|Terceros,Ampliado,Todo riesgo,No lo sé",
    wa:"Quiero comparar mi seguro\nTengo la matrícula a mano\nPrefiero que me llaméis",art:{k:"Motor",h:"Terceros, ampliado o todo riesgo: cómo elegir sin pagar de más",lead:"La antigüedad del coche, los kilómetros que haces y dónde duerme pesan más que la marca de la aseguradora. Así puedes decidir qué cobertura tiene sentido."},
    sav:{l:"Lo que pagas al año",min:150,max:1500,v:450},tick:"Comparativa sin compromiso\nAsistencia en carretera\nPartes por teléfono\nCoberturas claras"},
  salud:{s:"Salud",ph:"salud",il:"heart",u:"€/mes",eb:"Seguro de salud",h:"Tu médico",hl:"cuando lo necesitas",
    sub:"Te explicamos las coberturas y los copagos con claridad y te ayudamos a elegir el seguro que encaja contigo.",ck:"Coberturas y copagos explicados\nCuadro médico en {{ZONA}}\n{{CARENCIAS}}",
    cta:"Quiero información",btn:"Llamadme",ct:"Te asesoramos",cs:"Te llamamos y te explicamos las opciones según tu edad y tu zona.",opts:"Solo yo*|Pareja|Familia",
    q:"¿Para quién es el seguro?",qo:"🙋 Para mí|👫 Pareja|👨‍👩‍👧 Familia|💼 Autónomo",
    ben:"heart-pulse|Especialistas|Acceso a especialistas {{CONDICION_ESPECIALISTAS}}.\ncalendar|Citas|{{TIEMPO_CITAS}}.\nsmartphone|Videoconsulta|{{CONDICION_VIDEOCONSULTA}}.\neuro|Copagos claros|Te decimos qué pagas en cada caso.",
    st:"Hoy|Nos dejas tu teléfono|Y nos dices para quién es.\n{{PLAZO_LLAMADA}}|Te asesoramos|Coberturas, copagos y cuadro médico.\nSi te encaja|Alta|{{PROCESO_ALTA}}.\nDespués|Tu tarjeta|Y acceso al cuadro médico.",
    faq:"¿Hay periodos de carencia?|{{RESPUESTA}}\n¿Qué es el copago?|{{RESPUESTA}}\n¿Puedo elegir médico?|{{RESPUESTA}}\n¿Hay límite de edad?|{{RESPUESTA}}",
    pl:"Con copago|{{COBERTURAS_1}};{{CONDICION_1}}\nSin copago|{{COBERTURAS_2}};{{CONDICION_2}}\nCompleto|{{COBERTURAS_3}};{{CONDICION_3}}",
    prof:"user|Uso puntual|Revisiones y algún especialista.|0\nheart|Familia con niños|Pediatría y urgencias.|1\nbriefcase|Autónomo|Rapidez y {{VENTAJA_FISCAL}}.|2",
    no:"{{EXCLUSION_1}}\n{{EXCLUSION_2}}",
    quiz:"¿Para quién es?|Para mí,Pareja,Familia,Autónomo\n¿Tienes seguro ahora?|Sí,No\n¿Qué te importa más?|Precio,Sin copagos,Cuadro médico amplio",
    wa:"¿Qué seguro me conviene?\n¿Hay carencias?\nPrefiero que me llaméis",art:{k:"Salud",h:"Copago, carencia y cuadro médico: lo que conviene entender antes de contratar",lead:"Tres conceptos que explican por qué dos seguros con precio parecido funcionan de forma muy distinta. Te lo contamos con ejemplos."},
    sav:null,tick:"Copagos claros\nCuadro médico en tu zona\nVideoconsulta\nAsesoramiento sin compromiso"},
  legal:{s:"Legal",ph:"legal",il:"scale",u:"",eb:"Estudio gratuito de tu caso",h:"¿Te han cobrado",hl:"lo que no debían?",
    sub:"Un abogado estudia tu caso sin coste y te dice si merece la pena reclamar. Sin compromiso.",ck:"Primera valoración sin coste\nAbogados colegiados\n{{CONDICION_HONORARIOS}}",
    cta:"Estudiar mi caso",btn:"Que me llamen",ct:"Estudio de tu caso",cs:"Te llama un abogado para valorar tu caso.",opts:"Banco*|Seguro|Herencia|Otro",
    q:"¿Sobre qué es tu caso?",qo:"🏦 Banco|📄 Seguro|🏠 Vivienda|⚖️ Otro",
    ben:"scale|Valoración sin coste|Te decimos si tu caso tiene recorrido.\nbriefcase|Abogados colegiados|{{COLEGIO_DE_ABOGADOS}}.\neuro|Honorarios claros|{{CONDICION_HONORARIOS}}.\nmessage-circle|Seguimiento|Te contamos cada paso del proceso.",
    st:"Hoy|Nos cuentas tu caso|Una pregunta y tu teléfono.\n{{PLAZO_LLAMADA}}|Valoración|Un abogado estudia la documentación.\nSi hay caso|Reclamación|Te explicamos plazos y costes antes de empezar.\nHasta el final|Resolución|Te informamos en cada paso.",
    faq:"¿Cuánto cuesta el estudio?|{{RESPUESTA}}\n¿Qué documentos necesito?|{{RESPUESTA}}\n¿Cuánto tarda una reclamación?|{{RESPUESTA}}\n¿Qué pasa si no se gana?|{{RESPUESTA}}",
    pl:"Valoración|Estudio de documentación;Respuesta en {{PLAZO_1}}\nReclamación extrajudicial|{{CONDICION_2}};{{HONORARIOS_2}}\nVía judicial|{{CONDICION_3}};{{HONORARIOS_3}}",
    prof:"euro|Cláusulas bancarias|Gastos, intereses o comisiones.|0\nfile-text|Seguros que no pagan|Partes rechazados o pagados a medias.|1\nhouse|Vivienda|Alquiler, comunidad o compraventa.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Sobre qué es tu caso?|Banco,Seguro,Vivienda,Otro\n¿Tienes la documentación?|Sí,Parte,No\n¿Has reclamado ya?|Sí,No",
    wa:"Quiero que estudiéis mi caso\nTengo la documentación\nPrefiero que me llaméis",art:{k:"Tus derechos",h:"Cómo saber si tienes derecho a reclamar a tu banco",lead:"Comisiones, intereses y gastos de hipoteca: algunos cobros pueden reclamarse. Te explicamos qué documentos revisar y cuándo merece la pena hacerlo."},
    sav:null,tick:"Valoración sin coste\nAbogados colegiados\nHonorarios claros\nSeguimiento del caso"},
  agua:{s:"Agua",ph:null,il:"water",u:"€/mes",eb:"Agua filtrada en casa",h:"Agua filtrada",hl:"directa del grifo",
    sub:"Sin cargar garrafas ni almacenar botellas. Te contamos cómo funciona y qué mantenimiento lleva.",ck:"Instalación por técnicos\nMantenimiento {{CONDICION_MANTENIMIENTO}}\n{{VENTAJA_DE_LA_OFERTA}}",
    cta:"Quiero información",btn:"Llamadme",ct:"Te informamos",cs:"Te llamamos y te explicamos el equipo y el mantenimiento.",opts:"Piso*|Casa|Oficina",
    q:"¿Dónde lo instalarías?",qo:"🏢 Piso|🏠 Casa|💼 Oficina|☕ Hostelería",
    ben:"droplets|Del grifo|Agua filtrada cuando la necesitas.\nleaf|Sin garrafas|Olvídate de cargar y almacenar botellas.\nwrench|Instalación|{{DETALLE_INSTALACION}}.\ntimer|Mantenimiento|{{DETALLE_MANTENIMIENTO}}.",
    st:"Hoy|Nos dejas tu teléfono|Y nos dices dónde lo instalarías.\n{{PLAZO_LLAMADA}}|Te informamos|Equipo, instalación y mantenimiento.\n{{PLAZO_INSTALACION}}|Instalación|Un técnico lo deja funcionando.\nCada {{PERIODO}}|Mantenimiento|Cambio de filtros.",
    faq:"¿Cómo se instala?|{{RESPUESTA}}\n¿Cada cuánto se cambia el filtro?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}\n¿Necesito obra?|{{RESPUESTA}}",
    pl:"Bajo fregadero|{{CARACTERISTICA_1}};{{CONDICION_1}}\nCon grifo propio|{{CARACTERISTICA_2}};{{CONDICION_2}}\nOficina|{{CARACTERISTICA_3}};{{CONDICION_3}}",
    prof:"user|Pocas personas|Para beber y cocinar.|0\nusers|Familia|Más consumo y grifo propio.|1\nbriefcase|Oficina|Varias personas a diario.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Dónde lo instalarías?|Piso,Casa,Oficina\n¿Cuántas personas sois?|1-2,3-4,5 o más\n¿Compras agua embotellada?|Sí,A veces,No",
    wa:"¿Cómo funciona?\n¿Cuánto cuesta el mantenimiento?\nPrefiero que me llaméis",art:{k:"En casa",h:"Agua del grifo filtrada: qué hace un filtro y qué no",lead:"Sabor, cal y cloro: te explicamos qué mejora un sistema de filtración doméstico, qué mantenimiento necesita y en qué casos tiene sentido."},
    sav:{l:"Lo que gastas en agua embotellada al mes",min:5,max:80,v:25},tick:"Sin garrafas\nInstalación por técnicos\nMantenimiento incluido\nDel grifo a tu vaso"},
  reformas:{s:"Reformas",ph:null,il:"spark",u:"€",eb:"Reformas con presupuesto cerrado",h:"Tu reforma",hl:"con un presupuesto claro",
    sub:"Visitamos tu casa, te damos un presupuesto detallado y un plazo de obra por escrito.",ck:"Visita y presupuesto sin compromiso\nPlazo de obra por escrito\n{{GARANTIA_OBRA}}",
    cta:"Pedir presupuesto",btn:"Pedir presupuesto",ct:"Presupuesto sin compromiso",cs:"Te llamamos para concretar una visita.",opts:"Baño*|Cocina|Integral",
    q:"¿Qué quieres reformar?",qo:"🛁 Baño|🍳 Cocina|🏠 Integral|🔧 Otra",
    ben:"clipboard-check|Presupuesto detallado|Partida a partida, sin sorpresas.\ncalendar|Plazo por escrito|{{PLAZO_OBRA}}.\nhammer|Equipo propio|{{EQUIPO}}.\nshield-check|Garantía|{{GARANTIA_OBRA}}.",
    st:"Hoy|Nos cuentas tu reforma|Y nos dejas tu teléfono.\n{{PLAZO_VISITA}}|Visita|Medimos y vemos lo que quieres.\n{{PLAZO_PRESUPUESTO}}|Presupuesto|Detallado y con plazo de obra.\nDurante la obra|Seguimiento|Un responsable de obra de referencia.",
    faq:"¿La visita tiene coste?|{{RESPUESTA}}\n¿Cuánto dura una reforma de baño?|{{RESPUESTA}}\n¿Os encargáis de la licencia?|{{RESPUESTA}}\n¿Cómo se paga?|{{RESPUESTA}}",
    pl:"Baño|{{ALCANCE_1}};Desde {{PRECIO_1}};{{PLAZO_1}}\nCocina|{{ALCANCE_2}};Desde {{PRECIO_2}};{{PLAZO_2}}\nIntegral|{{ALCANCE_3}};Presupuesto a medida;{{PLAZO_3}}",
    prof:"droplet|Solo el baño|Cambiar plato, azulejos o sanitarios.|0\nhouse-plus|Cocina|Muebles, encimera y electrodomésticos.|1\nhammer|Toda la casa|Distribución, instalaciones y acabados.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Qué quieres reformar?|Baño,Cocina,Toda la casa,Otra\n¿Cuándo quieres empezar?|Cuanto antes,En 1-3 meses,Más adelante\n¿Tienes ya algún presupuesto?|Sí,No",
    wa:"Quiero pedir una visita\nOs mando fotos\nPrefiero que me llaméis",art:{k:"Reformas",h:"Cómo leer un presupuesto de reforma (y qué pedir por escrito)",lead:"Partidas, calidades, plazos y forma de pago: lo que debería aparecer en cualquier presupuesto para evitar sorpresas a mitad de obra."},
    sav:null,tick:"Presupuesto detallado\nPlazo por escrito\nEquipo propio\nVisita sin compromiso"},
  telea:{s:"Teleasistencia",ph:"salud",il:"heart",u:"€/mes",eb:"Teleasistencia",h:"Que tus mayores estén acompañados",hl:"las 24 horas",
    sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",ck:"Atención las 24 horas\nEn casa y fuera de casa\n{{CONDICION_INSTALACION}}",
    cta:"Quiero información",btn:"Quiero información",ct:"Te informamos",cs:"Dinos para quién es y te llamamos.",opts:"Para mí|Para un familiar*",
    q:"¿Para quién es?",qo:"🙋 Para mí|👵 Para un familiar",
    ben:"hand-helping|Un botón|Pide ayuda en cualquier momento.\nheadphones|Te atendemos|Un profesional habla contigo al momento.\nusers|Avisamos a la familia|O a emergencias si hace falta.\nmap-pin|También fuera|{{SERVICIO_MOVIL}}.",
    st:"Pulsa el botón|En casa o fuera|Cuando lo necesites.\nAl momento|Te atendemos|Un profesional habla contigo.\nSi hace falta|Movilizamos ayuda|Familia, vecinos o emergencias.\nDespués|Seguimiento|Llamadas de control periódicas.",
    faq:"¿Cómo funciona el botón?|{{RESPUESTA}}\n¿Funciona fuera de casa?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}",
    pl:"En casa|Botón y terminal;{{CONDICION_1}}\nCasa y calle|Dispositivo con GPS;{{CONDICION_2}}\nCon detector de caídas|{{CARACTERISTICA_3}};{{CONDICION_3}}",
    prof:"house|Vive solo/a|Quiere seguir en su casa con tranquilidad.|0\nmap-pin|Sale a pasear|Necesita ayuda también fuera.|1\nheart-pulse|Riesgo de caídas|Detección automática.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Para quién es?|Para mí,Para un familiar\n¿Vive solo/a?|Sí,No\n¿Sale de casa a menudo?|Sí,Poco,No",
    wa:"Es para un familiar\n¿Cómo funciona?\nPrefiero que me llaméis",art:{k:"Mayores",h:"Cuándo plantearse la teleasistencia para un familiar mayor",lead:"Vivir solo, alguna caída o salir a pasear sin compañía: señales que conviene hablar en familia y qué opciones existen para que siga en casa con tranquilidad."},
    sav:null,tick:"Atención 24 h\nEn casa y fuera\nAvisamos a la familia\nSin compromiso"},
  empresas:{s:"Empresas",ph:"legal",il:"wifi",u:"€/mes + IVA",eb:"Fibra y telefonía para empresas",h:"Conectividad para tu empresa",hl:"con un gestor de referencia",
    sub:"Te decimos qué necesita tu empresa y cuánto cuesta antes de firmar nada.",ck:"Gestor de referencia\nEstudio de tus líneas actuales\n{{VENTAJA_EMPRESA}}",
    cta:"Hablar con un gestor",btn:"Que me llame un gestor",ct:"Habla con un gestor",cs:"Te llamamos en horario laboral para conocer tu empresa.",opts:"Fibra|Fibra + móviles*|Centralita",
    q:"¿Cuántas personas sois?",qo:"1-5|6-20|21-50|Más de 50",
    ben:"wifi|Fibra simétrica|{{VELOCIDAD}} y respaldo {{RESPALDO}}.\nphone|Centralita|{{TIPO_CENTRALITA}}.\nsmartphone|Líneas móviles|Para todo el equipo.\nhandshake|Gestor de referencia|Una persona que conoce tu cuenta.",
    st:"Hoy|Nos dejas tu teléfono|Y el tamaño de tu equipo.\n{{PLAZO_LLAMADA}}|Estudio|Revisamos tus líneas y facturas actuales.\nPropuesta|Por escrito|Con precio final y plazos.\n{{PLAZO_INSTALACION}}|Puesta en marcha|Sin cortar tu actividad.",
    faq:"¿Tenéis IP fija?|{{RESPUESTA}}\n¿Puedo mantener mis números?|{{RESPUESTA}}\n¿Qué pasa si se cae la fibra?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}",
    pl:"Fibra Empresa|{{VELOCIDAD_1}} simétricos;IP fija opcional;{{CONDICION_1}}\nOficina conectada|{{VELOCIDAD_2}} simétricos;Centralita {{N_EXTENSIONES}} extensiones;{{CONDICION_2}}\nEmpresa total|Fibra + respaldo;{{N_LINEAS}} líneas móviles;{{CONDICION_3}}",
    prof:"user|Autónomo|Una línea y fibra fiable.|0\nusers|Pyme|Centralita y varias líneas.|1\nbuilding-2|Varias sedes|Respaldo y gestión centralizada.|2",
    no:"{{NO_INCLUIDO_1}}\n{{NO_INCLUIDO_2}}",
    quiz:"¿Cuántas personas sois?|1-5,6-20,Más de 20\n¿Qué necesitas?|Solo fibra,Fibra + móviles,Centralita\n¿Tienes permanencia ahora?|Sí,No,No lo sé",
    wa:"Quiero hablar con un gestor\nTengo varias sedes\nPrefiero que me llaméis",art:{k:"Empresas",h:"Cinco preguntas para revisar la conectividad de tu empresa",lead:"Respaldo si cae la fibra, IP fija, centralita y líneas móviles: lo que conviene revisar antes de renovar contrato para no pagar de más ni quedarte corto."},
    sav:{l:"Lo que pagáis al mes en telecomunicaciones",min:50,max:2000,v:300},tick:"Gestor de referencia\nFibra simétrica\nCentralita\nPropuesta por escrito"}
};

/* ===== 2 · RELLENO DE CADA BLOQUE ===== */
const v5Lines=s=>String(s||"").split("\n").filter(Boolean);
const v5Img=(D,i)=>{const L=D.ph&&NC_PHOTO_BANK[D.ph];if(!L||!L.length)return {};const x=L[(i||0)%L.length];return {img:ncPhotoUrl(x[0],1600),imgAlt:x[1]};};
const v5Plans=(D,o)=>v5Lines(D.pl).map((l,i)=>{const c=l.split("|");return {name:c[0],price:`{{PRECIO_${i+1}}}`,unit:D.u||"€/mes",feats:(c[1]||"").split(";").join("\n"),tag:i===1?"{{ETIQUETA_DESTACADA}}":"",cta:(o&&o.cta)||"La quiero"};});
const v5PlanName=(D,i)=>(v5Lines(D.pl)[i]||"").split("|")[0];
const v5Ben=D=>v5Lines(D.ben).map(l=>l.split("|"));
const v5Steps=D=>v5Lines(D.st).map(l=>l.split("|"));
const V5_MAP={
  da_topbar:D=>({text:"{{TEXTO_OFERTA}} hasta el {{FECHA_FIN}}",bold:""}),
  da_nav:D=>({telLabel:"Llamada gratuita"}),db_nav:D=>({telLabel:"¿Hablamos? {{HORARIO}}"}),dc_nav:D=>({}),
  da_hero:(D,M)=>Object.assign({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,price:"{{PRECIO}}",priceUnit:D.u,priceNote:"{{NOTA_PRECIO}}",checks:D.ck,cta:D.cta,cardTitle:D.ct,cardSub:D.cs,cardBtn:D.btn,opts:D.opts,live:"Te llamamos en {{TIEMPO_RESPUESTA}} · {{HORARIO}}",illus:D.il},v5Img(D,M.pi)),
  db_hero:(D,M)=>Object.assign({canal:M.canal,kicker:D.eb,headline:D.h,italic:D.hl,sub:D.sub,proof:"{{VALORACION}}|{{N_OPINIONES}} opiniones en {{PLATAFORMA}}\n{{DATO_REAL_1}}|{{ETIQUETA_1}}\n{{AÑOS}}|de experiencia",quote:"{{TESTIMONIO_REAL}}",author:"{{NOMBRE}}, {{CIUDAD}}",formTitle:D.ct,formSub:D.cs,question:D.q,options:D.qo,btn:D.btn,illus:D.il},v5Img(D,M.pi)),
  dc_hero:(D,M)=>Object.assign({canal:M.canal,chip:"",chipText:D.eb,headline:D.h,gradient:D.hl,sub:D.sub,btn:D.btn,note:"Te llamamos en {{TIEMPO_RESPUESTA}}",kpis:"{{DATO_1}}|{{ETIQUETA_1}}\n{{DATO_2}}|{{ETIQUETA_2}}\n{{DATO_3}}|{{ETIQUETA_3}}",illus:D.il},v5Img(D,M.pi)),
  dx_product:(D,M)=>Object.assign({canal:M.canal,kicker:D.eb,headline:D.h+".",highlight:D.hl.charAt(0).toUpperCase()+D.hl.slice(1)+".",sub:D.sub,price:"{{PRECIO}}",priceUnit:D.u,priceNote:"{{NOTA_PRECIO}}",cta:D.btn,link:"Ver opciones",illus:D.il},v5Img(D,M.pi)),
  dx_promohero:(D,M)=>Object.assign({tag:D.eb,headline:D.h,highlight:D.hl,box1:v5PlanName(D,0),box2:v5PlanName(D,1),sub1:"{{DETALLE_1}}",sub2:"{{DETALLE_2}}",price:"{{PRECIO}}",unit:D.u,priceTag:"{{NOTA_PRECIO}}",cta:D.cta,extra:"",extraBtn:"",formTitle:D.ct,formSub:D.cs,opts:D.opts.replace(/\*/g,""),formBtn:D.btn,promoTag:"",promoText:""},v5Img(D,M.pi)),
  dx_hsplit:(D,M)=>Object.assign({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,checks:D.ck,cta:D.cta,price:D.u?"{{PRECIO}}":"",priceUnit:D.u,priceNote:"Desde",illus:D.il},v5Img(D,M.pi)),
  dx_hfull:(D,M)=>Object.assign({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,cta:D.cta,cardTitle:D.ct,cardSub:D.cs,btn:D.btn,opts:D.opts},v5Img(D,M.pi)),
  dx_hmin:(D,M)=>({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.cs,btn:D.btn,chips:v5Lines(D.ck).slice(0,3).join("\n")}),
  dx_hpicker:(D,M)=>({eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:"Marca una opción y te llamamos con el precio final.",checks:v5Lines(D.ck).slice(0,2).join("\n"),pickTitle:"¿Qué te interesa?",
    plans:v5Lines(D.pl).map((l,i)=>{const c=l.split("|");return `${c[0]}|${(c[1]||"").split(";")[0]}|{{PRECIO_${i+1}}}|${D.u}${i===1?"*":""}`;}).join("\n"),btn:"Quiero {opcion}"}),
  dx_heditorial:(D,M)=>Object.assign({canal:M.canal,kicker:D.art.k,headline:D.art.h,lead:D.art.lead,byline:"",cta:D.cta,ctaNote:"Te llamamos sin compromiso",caption:""},v5Img(D,M.pi)),
  dx_hvideo:(D,M)=>({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,video:"{{URL_VIDEO}}",vlabel:"Ver cómo funciona",cta:D.cta,checks:v5Lines(D.ck).slice(0,2).join("\n")}),
  dx_hsaver:(D,M)=>{const S=D.sav||{l:"Lo que pagas ahora al mes",min:20,max:300,v:80};return {eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:"Mueve la barra con lo que pagas ahora y te llamamos con una propuesta.",label:S.l,min:String(S.min),max:String(S.max),val:String(S.v),unit:"€",pct:"",btn:D.btn};},
  dx_hcoupon:(D,M)=>({canal:M.canal,eyebrow:"Oferta por tiempo limitado",value:"{{DESCUENTO}}",valueSub:"{{TEXTO_DESCUENTO}}",headline:D.h,highlight:D.hl,sub:D.sub,terms:"{{CONDICIONES_DE_LA_OFERTA}}",cd:"{{FECHA_FIN_OFERTA}}",cdLabel:"La oferta termina en",cta:D.cta}),
  dx_hchat:(D,M)=>({eyebrow:D.eb,headline:"Pregúntanos por WhatsApp",highlight:"",sub:D.sub,agent:"{{NOMBRE_EMPRESA}}",status:"responde en {{TIEMPO_RESPUESTA}}",msg:"Hola, ¿en qué te podemos ayudar con "+D.eb.toLowerCase()+"?",chips:D.wa,btn:"Abrir WhatsApp",checks:""}),
  dx_hbento:(D,M)=>Object.assign({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,cta:D.cta,price:D.u?"{{PRECIO}}":"",priceUnit:D.u,priceNote:"Desde",stats:"{{DATO_REAL}}|{{ETIQUETA_DATO}}",formTitle:D.ct,btn:D.btn},v5Img(D,M.pi)),
  dx_hposter:(D,M)=>({canal:M.canal,eyebrow:D.eb,headline:D.h,highlight:D.hl,sub:D.sub,cta:D.cta,ticker:D.tick}),
  da_trust:D=>({items:"{{VALORACION}}|en {{PLATAFORMA}}\n{{CLIENTES}}|clientes\n{{DATO_REAL}}|{{ETIQUETA_DATO}}\n{{AÑOS}}|de experiencia"}),
  da_plans:D=>({title:"Elige tu opción",sub:"Precios con todo incluido: {{NOTA_PRECIOS}}.",plans:v5Plans(D)}),
  da_benefits:D=>({title:"Por qué con nosotros",items:v5Ben(D).map(c=>c.join("|")).join("\n")}),
  da_faq:D=>({items:D.faq}),db_faq:D=>({items:D.faq}),dc_faq:D=>({items:D.faq}),
  dx_faqsplit:D=>({items:D.faq,cardSub:D.cs}),
  da_cta:D=>({title:D.ct,sub:D.cs,btn:D.btn}),db_cta:D=>({title:"Hablemos de tu caso, sin compromiso",sub:D.cs,btn:D.btn}),dc_cta:D=>({title:D.h,gradient:D.hl,btn:D.btn}),
  da_footer:D=>({company:"{{RAZON_SOCIAL}}",note:"{{NOTA_LEGAL}}"}),db_footer:D=>({company:"{{RAZON_SOCIAL}}",note:""}),dc_footer:D=>({company:"{{RAZON_SOCIAL}}"}),
  dx_footcols:D=>({about:"{{DESCRIPCION_CORTA_DE_LA_EMPRESA}}",cols:"Información|"+v5Ben(D).slice(0,3).map(c=>c[1]+">#").join(",")+"\nAyuda|Preguntas>#faq,Contacto>#form"}),
  da_sticky:(D,M)=>({canal:M.canal}),db_sticky:(D,M)=>({canal:M.canal}),dc_sticky:(D,M)=>({canal:M.canal}),
  db_seals:D=>({}),
  db_steps:D=>({title:"Así de sencillo",sub:"",items:v5Steps(D).map(c=>c[1]+"|"+c[2]).join("\n")}),
  db_compare:D=>({title:"Qué incluye",head:"|Con nosotros|Otras opciones",rows:v5Ben(D).map(c=>c[1]+"|✓|{{COMPARATIVA}}").join("\n")}),
  db_reviews:D=>({}),
  dc_bento:D=>({title:D.h,gradient:D.hl,sub:"",tiles:v5Ben(D).map((c,i)=>`${c[1]}|${c[2]}|${i%3===0?"dark":""}|${i===0&&D.u?"{{PRECIO}}":""}|${i===0&&D.u?D.u:""}`).join("\n")}),
  dc_logos:D=>({label:"Trabajamos con",items:"{{LOGO_1}}\n{{LOGO_2}}\n{{LOGO_3}}\n{{LOGO_4}}\n{{LOGO_5}}"}),
  dx_coverage:D=>({}),
  dx_calc:D=>({title:"¿Cuánto podrías ahorrar?",unit:"€/mes",pct:"{{PORCENTAJE_AHORRO}}",btn:D.btn}),
  dx_guarantee:D=>({}),dx_countdown:D=>({end:"",title:"La oferta termina en"}),dx_letter:D=>({}),dx_wa:D=>({}),
  dx_quiz:D=>({kicker:"Te ayudamos a elegir",title:"Encuentra la opción que encaja contigo",sub:"Responde 3 preguntas rápidas y te llamamos con una propuesta.",steps:D.quiz,btn:"Ver mi propuesta"}),
  dx_article:(D,M)=>Object.assign({label:"Contenido patrocinado",kicker:D.art.k,headline:D.art.h,standfirst:D.art.lead,ctaTitle:"¿Quieres saber qué te conviene a ti?",ctaBtn:D.cta},v5Img(D,M.pi)),
  dx_story:D=>({title:"De un problema a una solución",rows:"triangle-alert|El problema|{{DESCRIPCION_PROBLEMA}}\nlightbulb|Cómo lo resolvemos|"+v5Ben(D)[0][2]+"\ncircle-check|El resultado|{{RESULTADO_REAL}}"}),
  dx_leadmag:D=>({kicker:"Guía gratuita",title:"Guía: "+D.art.h.charAt(0).toLowerCase()+D.art.h.slice(1),cover:D.art.k,sub:"Te la enviamos por email al momento.",bullets:v5Ben(D).slice(0,3).map(c=>c[1]).join("\n")}),
  dx_area:D=>({}),dx_pro:D=>({}),dx_rating:D=>({}),dx_thanks:D=>({}),
  dx_media:(D,M)=>Object.assign({kicker:D.eb,title:v5Ben(D)[0][1],text:v5Ben(D)[0][2]+" "+v5Ben(D)[1][2],checks:v5Lines(D.ck).slice(0,3).join("\n"),btn:D.cta},v5Img(D,(M.pi||0)+1)),
  dx_text:D=>({title:D.art.h,text:D.art.lead}),
  dx_subnav:D=>({name:D.eb,links:"Opciones>#tarifas|Preguntas>#faq",btn:D.btn}),
  dx_tiles:D=>({title:"Lo esencial, de un vistazo.",items:v5Ben(D).map((c,i)=>`${["L","S","S","L"][i]}|${c[1]}|${c[2]}|${["dark","brand","light","light"][i]}`).join("\n")}),
  dx_stats:D=>({}),
  dx_finder:D=>({}),dx_bundle:D=>({}),
  dx_booking:D=>({title:"Elige cuándo te llamamos",btn:"Reservar mi llamada"}),
  dx_vtestis:D=>({}),
  dx_iconlist:D=>({title:"Todo lo que incluye",items:v5Ben(D).map(c=>c.join("|")).join("\n")}),
  dx_badges:D=>({items:"shield-check|{{GARANTIA}}\nclock|Atención {{HORARIO}}\nlock|Datos protegidos\nphone|Llamada sin compromiso"}),
  dx_callout:D=>({tone:"brand",icon:"info",title:"{{AVISO_IMPORTANTE}}",text:"{{DETALLE_DEL_AVISO}}"}),
  dx_table:D=>{const P=v5Lines(D.pl).map(l=>l.split("|")[0]);return {title:"Compara las opciones",head:"|"+P.join("|"),rows:"Precio|{{PRECIO_1}}|{{PRECIO_2}}|{{PRECIO_3}}\n"+v5Ben(D).slice(0,3).map((c,i)=>c[1]+"|"+["✓|✓|✓","{{VALOR}}|✓|✓","✗|{{VALOR}}|✓"][i]).join("\n"),hl:"2"};},
  dx_video:D=>({title:"Cómo funciona",video:"{{URL_VIDEO}}"}),
  dx_tabs:D=>({title:"Elige lo que necesitas",tabs:v5Lines(D.prof).map(l=>{const c=l.split("|");return {label:c[1],title:v5PlanName(D,+c[3]||0),text:c[2],bullets:(v5Lines(D.pl)[+c[3]||0]||"").split("|")[1].split(";").join("\n"),img:""};})}),
  dx_slider:D=>({title:"Cómo funciona",slides:v5Steps(D).map(c=>({img:"",title:c[1],text:c[2]}))}),
  dx_beforeafter:D=>({}),
  dx_modalinfo:D=>({text:"Precios y condiciones: {{NOTA_DE_PRECIO}}"}),
  dx_counters:D=>({}),dx_logos:D=>({}),dx_team:D=>({}),dx_gallery:D=>({}),
  dx_ctaimg:(D,M)=>Object.assign({title:D.ct,sub:D.cs,btn:D.btn},v5Img(D,(M.pi||0)+2)),
  dx_plantabs:D=>({}),dx_devices:D=>({}),dx_addons:D=>({}),
  dx_colortiles:D=>({title:"Por qué con nosotros",items:v5Ben(D).map((c,i)=>`${c[0]}|${c[1]}|${["accent","soft","ink","brand"][i]}`).join("\n")}),
  dx_covtabs:D=>({}),
  dx_infobar:D=>({left:"¿Tienes dudas? *Te llamamos*",leftHref:"#form",right:"",btn:D.btn,pillWa:"WhatsApp",pillCall:"Te llamamos"}),
  dx_exit:D=>({}),
  dx_form2:D=>({title:D.ct,sub:"Empieza por tu teléfono. Solo te pediremos un dato más.",btn2:D.btn}),
  dx_vs:D=>({us:"{{MARCA}}",rows:v5Ben(D).map(c=>c[1]+"|✓|{{COMPARATIVA}}").join("\n")}),
  dx_seals:D=>({}),
  dx_spotlight:D=>({}),
  dx_timeline:D=>({title:"Qué pasa después",items:D.st,btn:D.cta}),
  dx_phoneband:D=>({title:"¿Prefieres hablar con una persona?",hours:"{{HORARIO_DE_ATENCION}}",btn:D.btn}),
  dx_offerstrip:D=>({badge:"Oferta",text:"{{TEXTO_OFERTA}}",price:D.u?"{{PRECIO}}":"",priceUnit:D.u,btn:D.cta}),
  dx_ticker:D=>({items:D.tick}),
  dx_profiles:D=>({title:"¿Cuál se parece más a ti?",items:v5Lines(D.prof).map(l=>{const c=l.split("|"),i=+c[3]||0;return `${c[0]}|${c[1]}|${c[2]}|${v5PlanName(D,i)}|${D.u?`{{PRECIO_${i+1}}}`:""}`;}).join("\n"),unit:D.u}),
  dx_checklist:D=>({yes:v5Ben(D).map(c=>c[1]).join("\n"),no:D.no})
};

/* ===== 3 · REGISTRO ===== */
const V5_GROUPS=["Captación rápida","Llamada","WhatsApp","Oferta y urgencia","Tarifas y comparadores","Cualificación","Contenido que vende","Confianza y autoridad","Producto premium","Empresas (B2B)","Citas y servicio local","Páginas cortas"];
function v5(name,meta,secs){const D=V5_DECK[meta.v];const M={canal:meta.canal||"form",pi:meta.pi||0};
  const S=secs.map(e=>{const o=typeof e==="string"?{t:e}:e;const base=V5_MAP[o.t]?V5_MAP[o.t](D,M):{};
    const props=Object.assign({},base,o.p||{});if(LIB[o.t]){const d=LIB[o.t].def();if("canal" in d&&!(o.p&&o.p.canal))props.canal=M.canal;Object.keys(props).forEach(k=>{if(!(k in d))delete props[k];});}
    return o.s?{type:o.t,props,style:o.s}:{type:o.t,props};});
  v4Tpl(name,{group:meta.g,sector:D.s,canal:M.canal,look:meta.look,desc:meta.desc,v:meta.v},S);if(meta.look)TEMPLATE_LOOK[name]=meta.look;}

/* ===== 4 · CATÁLOGO =====
   Formato: v5(nombre,{g:grupo,v:vertical,canal,look,pi:foto,desc},[secciones]). Una sección es el tipo de bloque o
   {t:tipo,p:{props que cambian},s:{estilo}}. */
const _s=(t,p,s)=>({t,p,s});
const [G_RAP,G_CALL,G_WA,G_OFF,G_TAR,G_QUAL,G_CONT,G_TRUST,G_PREM,G_B2B,G_LOCAL,G_MICRO]=V5_GROUPS;

/* — Captación rápida — */
v5("Fibra · Oferta con formulario arriba",{g:G_RAP,v:"telco",look:"swiss",pi:0,desc:"Precio protagonista y formulario de un campo en el hero. Para tráfico que ya compara precio."},
  ["da_topbar","da_nav","da_hero","da_trust","da_benefits","da_plans","da_faq","da_cta","da_footer","da_sticky"]);
v5("Luz · Minimal de un campo",{g:G_RAP,v:"luz",look:"neobanco",desc:"Una promesa, un campo y nada más arriba. Fricción mínima para campañas de búsqueda."},
  ["dx_hmin","dx_badges","dx_iconlist","dx_timeline","da_faq","da_footer","da_sticky"]);
v5("Alarma · Foto a pantalla completa",{g:G_RAP,v:"alarma",look:"nocturno",pi:0,desc:"Foto emocional a sangre con la tarjeta de callback encima. Ideal para tráfico social."},
  ["da_nav","dx_hfull",_s("dx_ticker",{tone:"brand"}),"dx_colortiles","db_steps","db_reviews","dx_faqsplit","db_footer","db_sticky"]);
v5("Seguro hogar · Foto partida y dos pasos",{g:G_RAP,v:"hogar",look:"editorial",pi:1,desc:"Hero partido con foto a sangre y formulario en dos pasos (primero el teléfono)."},
  ["db_nav","dx_hsplit","dx_form2","dx_checklist","db_faq","db_footer","db_sticky"]);
v5("Móvil · Bento rápido",{g:G_RAP,v:"movil",look:"acido",pi:2,desc:"Mosaico con precio, dato y formulario a la vista. Muy escaneable en móvil."},
  ["dx_hbento","dx_profiles",_s("dx_offerstrip",{tone:"ink"}),"da_faq","dc_footer","dc_sticky"]);
v5("Agua · Cartel y formulario",{g:G_RAP,v:"agua",look:"riso",desc:"Titular gigante que se recuerda y CTA con imagen como cierre."},
  [_s("dx_hposter",{tone:"brand"}),"dx_media","dx_ctaimg","dc_faq","da_footer","dx_wa"]);
v5("Solar · Hero oscuro con buscador",{g:G_RAP,v:"solar",look:"plano",pi:0,desc:"Hero de producto con campo integrado y datos clave debajo."},
  ["dc_nav","dc_hero","dx_slider","dx_colortiles","dx_spotlight","dx_faqsplit","dc_footer","dc_sticky"]);
v5("Reformas · Foto partida y antes/después",{g:G_RAP,v:"reformas",look:"industrial",desc:"El resultado se ve antes de pedir presupuesto: comparador antes/después tras el hero."},
  ["da_nav","dx_hsplit","dx_beforeafter","db_steps","dx_spotlight","da_faq","dx_ctaimg","dx_footcols","da_sticky"]);
v5("Salud · Ficha de producto",{g:G_RAP,v:"salud",look:"vitrina",pi:0,desc:"Barra de producto fija, hero centrado y lo esencial en rejilla."},
  ["dx_subnav","dx_product","dx_tiles","dx_table","dx_faqsplit","dc_footer"]);

/* — Llamada — */
v5("Teleasistencia · Llama y te atendemos",{g:G_CALL,v:"telea",canal:"call",look:"postal",pi:2,desc:"Público mayor: la llamada manda. Teléfono grande y callback como plan B."},
  ["db_nav","db_hero",_s("dx_phoneband",{tone:"paper"}),"db_steps","dx_spotlight","db_faq","db_footer","db_sticky"]);
v5("Fibra · Click-to-call puro",{g:G_CALL,v:"telco",canal:"call",look:"senal",desc:"Todo empuja a llamar: botón con el número, banda de teléfono y barra móvil."},
  ["da_topbar","da_nav","dx_hmin","dx_badges","dx_profiles",_s("dx_phoneband",{tone:"brand"}),"da_footer","da_sticky"]);
v5("Seguro coche · Llamada con matrícula",{g:G_CALL,v:"coche",canal:"call",look:"ficha",desc:"Ten la matrícula a mano: precio en la llamada. Comparativa honesta como apoyo."},
  ["da_nav","dx_hsplit","dx_iconlist","db_compare","dx_faqsplit","da_cta","da_footer","da_sticky"]);
v5("Legal · Habla con un abogado",{g:G_CALL,v:"legal",canal:"call",look:"expediente",pi:3,desc:"Tono editorial y profesional que da la cara. La llamada resuelve dudas al momento."},
  ["db_nav","dx_heditorial","dx_pro","db_steps","dx_rating","db_faq",_s("dx_phoneband",{tone:"ink"}),"db_footer","db_sticky"]);
v5("Alarma · Cartel y teléfono",{g:G_CALL,v:"alarma",canal:"call",look:"cartel",desc:"Titular de cartel con el teléfono como primer botón y comparativa directa."},
  [_s("dx_hposter",{tone:"ink"}),"da_trust","dx_vs","dx_timeline","da_faq","da_cta","da_footer","da_sticky"]);
v5("Luz · Asesor al teléfono",{g:G_CALL,v:"luz",canal:"call",look:"prensa",pi:4,desc:"Hero con el número grande y calculadora para dar contexto antes de llamar."},
  ["da_nav","da_hero","dx_calc","da_benefits","dx_phoneband","da_faq","da_footer","da_sticky"]);
v5("Salud · Te llamamos hoy",{g:G_CALL,v:"salud",canal:"call",look:"azulejo",pi:1,desc:"Foto cercana a pantalla completa y tarjeta de llamada. Sellos y perfiles para decidir."},
  ["db_nav","dx_hfull","db_seals","dx_profiles","db_faq",_s("dx_phoneband",{tone:"brand"}),"db_footer","db_sticky"]);
v5("Reformas · Llámanos y vamos",{g:G_CALL,v:"reformas",canal:"call",look:"crudo",desc:"Vídeo de una obra real y galería. Para quien quiere hablar antes de pedir visita."},
  ["da_nav","dx_hvideo","dx_gallery","db_steps","da_faq","da_cta","dx_footcols","da_sticky"]);

/* — WhatsApp — */
v5("Fibra · Chat de WhatsApp",{g:G_WA,v:"telco",canal:"wa",look:"terminal",desc:"El hero es una conversación: respuestas rápidas que abren WhatsApp con el mensaje escrito."},
  ["da_nav","dx_hchat","dx_iconlist","da_plans","dx_faqsplit","da_footer","dx_wa"]);
v5("Reformas · Mándanos fotos por WhatsApp",{g:G_WA,v:"reformas",canal:"wa",look:"papel",desc:"Presupuesto orientativo por WhatsApp con fotos. Antes/después para inspirar."},
  ["dx_hchat","dx_beforeafter","dx_timeline","db_reviews","da_faq","da_footer","da_sticky"]);
v5("Agua · Cupón por WhatsApp",{g:G_WA,v:"agua",canal:"wa",look:"retro",desc:"Cupón con cuenta atrás y WhatsApp como canal principal."},
  ["da_topbar","da_nav","dx_hcoupon","dx_checklist","db_steps","dc_faq","da_footer","dx_wa"]);
v5("Móvil · Pregunta por WhatsApp",{g:G_WA,v:"movil",canal:"wa",look:"pixel",desc:"Chat en el hero, perfiles con tarifa recomendada y tabla para comparar."},
  ["dc_nav","dx_hchat","dx_profiles","dx_table","da_faq","dc_footer","dc_sticky"]);
v5("Legal · Cuéntanos tu caso por WhatsApp",{g:G_WA,v:"legal",canal:"wa",look:"ficha",desc:"Escribir cuesta menos que llamar a un abogado: chat, historia y quién lleva el caso."},
  ["db_nav","dx_hchat","dx_story","dx_pro","db_faq","db_footer","db_sticky"]);
v5("Solar · Envíanos tu factura",{g:G_WA,v:"solar",canal:"wa",look:"setentas",pi:2,desc:"Hero con WhatsApp como botón principal para enviar la factura y recibir el estudio."},
  ["da_nav","da_hero","dx_slider",_s("dx_ticker",{tone:"brand",size:"L"}),"dx_faqsplit","dx_footcols","dx_wa"]);
v5("Teleasistencia · WhatsApp para familias",{g:G_WA,v:"telea",canal:"wa",look:"cuaderno",desc:"Quien busca suele ser un hijo o hija: chat con preguntas típicas y perfiles."},
  ["dx_hchat","dx_profiles","dx_timeline","dx_spotlight","db_faq","db_footer","db_sticky"]);

/* — Oferta y urgencia — */
v5("Fibra · Cupón con cuenta atrás",{g:G_OFF,v:"telco",look:"ticket",desc:"La oferta en forma de cupón, franja de recordatorio y tarifas."},
  ["da_topbar","dx_hcoupon",_s("dx_offerstrip",{tone:"brand"}),"da_plans","dx_countdown","da_faq","da_footer","da_sticky"]);
v5("Móvil · Cartel de oferta",{g:G_OFF,v:"movil",look:"memphis",desc:"Cinta en movimiento, titular enorme y popup de salida para no perder al indeciso."},
  [_s("dx_ticker",{tone:"ink",size:"S"}),_s("dx_hposter",{tone:"brand"}),"da_plans","dx_vs","dx_exit","da_footer","da_sticky"]);
v5("Luz · Oferta con precio grande",{g:G_OFF,v:"luz",look:"bauhaus",pi:0,desc:"Precio en una etiqueta sobre la foto y condiciones en ventana para no saturar."},
  ["da_topbar","da_nav","dx_hsplit",_s("dx_offerstrip",{tone:"paper"}),"da_benefits","dx_modalinfo","da_faq","da_footer","da_sticky"]);
v5("Alarma · Promo con formulario lateral",{g:G_OFF,v:"alarma",look:"brutal",pi:1,desc:"Promoción con formulario lateral, mosaico de ventajas y barra fija de contacto."},
  ["da_nav","dx_promohero","dx_colortiles","dx_plantabs","da_faq","dx_footcols","dx_infobar"]);
v5("Agua · Último día",{g:G_OFF,v:"agua",look:"comic",desc:"Franja de oferta arriba, mosaico con precio y popup de salida."},
  [_s("dx_offerstrip",{tone:"brand"}),"dx_hbento","dx_countdown","dx_checklist","da_faq","dc_footer","dx_exit"]);
v5("Seguro coche · Descuento al cambiarte",{g:G_OFF,v:"coche",look:"setentas",desc:"Cupón con el descuento y tabla de coberturas para elegir rápido."},
  ["dc_nav","dx_hcoupon","dx_table","db_steps","dc_faq","dc_footer","dc_sticky"]);
v5("Solar · Oferta de temporada",{g:G_OFF,v:"solar",look:"tipografico",desc:"Cartel tipográfico y cifras reales de instalaciones para empujar la decisión."},
  [_s("dx_hposter",{tone:"paper"}),"dx_counters","dx_profiles","dx_timeline","dx_faqsplit","da_footer","da_sticky"]);
v5("Reformas · Precio cerrado este mes",{g:G_OFF,v:"reformas",look:"senal",desc:"Oferta con fecha límite y antes/después como prueba."},
  ["da_topbar","da_hero","dx_beforeafter","dx_countdown","da_benefits","da_faq","da_cta","da_footer","da_sticky"]);
v5("Fibra · Lanzamiento con comparador",{g:G_OFF,v:"telco",look:"pixel",desc:"Barra de producto fija, rejilla bento y comparador con filtros."},
  ["dx_subnav","dx_product","dx_tiles",_s("dx_offerstrip",{tone:"ink"}),"dx_finder","dc_faq","dc_footer","dc_sticky"]);

/* — Tarifas y comparadores — */
v5("Fibra · Comparador con filtros",{g:G_TAR,v:"telco",look:"plano",pi:3,desc:"Para quien ya sabe lo que busca: filtros y tabla justo después del hero."},
  ["da_nav","da_hero","dx_finder","dx_table","da_faq","da_footer","da_sticky"]);
v5("Móvil · Tarifas en pestañas",{g:G_TAR,v:"movil",look:"escaparate",pi:3,desc:"Tarifas por pestañas, dispositivos con cuota y extras, como una tienda online."},
  ["da_nav","dx_hsplit","dx_plantabs","dx_devices","dx_addons","da_faq","dx_footcols","dx_infobar"]);
v5("Luz · Elige tu tarifa en el hero",{g:G_TAR,v:"luz",look:"neobanco",desc:"Selector de tarifa en el propio hero: el botón cambia con la opción elegida."},
  ["dc_nav","dx_hpicker","dx_table","dx_checklist","dc_faq","dc_footer","dc_sticky"]);
v5("Fibra y móvil · Configura tu pack",{g:G_TAR,v:"telco",look:"vitrina",pi:1,desc:"El visitante monta su pack y ve el total en vivo antes de pedir la llamada."},
  ["dc_nav","dc_hero","dx_bundle","dx_vs","dc_faq","dc_cta","dc_footer","dc_sticky"]);
v5("Salud · Compara coberturas",{g:G_TAR,v:"salud",look:"plano",desc:"Selector de seguro, comparativa y pestañas por perfil."},
  ["db_nav","dx_hpicker","db_compare","dx_tabs","db_faq","db_footer","db_sticky"]);
v5("Seguro coche · Encuentra tu cobertura",{g:G_TAR,v:"coche",look:"swiss",desc:"Mosaico con precio y comparador con filtros de cobertura."},
  ["da_nav","dx_hbento","dx_finder","dx_checklist","da_faq","da_cta","da_footer","da_sticky"]);
v5("Agua · Elige tu equipo",{g:G_TAR,v:"agua",look:"azulejo",desc:"Tres equipos para elegir en el hero y un testimonio que lo respalda."},
  ["da_nav","dx_hpicker","dx_iconlist","dx_spotlight","da_faq","da_footer","da_sticky"]);
v5("Solar · ¿Con batería o sin batería?",{g:G_TAR,v:"solar",look:"industrial",desc:"Calculadora en el hero y tarifas con tabla para comparar instalaciones."},
  ["da_nav","dx_hsaver","da_plans","dx_table","dx_faqsplit","dx_footcols","da_sticky"]);
v5("Móvil · Tabla rápida",{g:G_TAR,v:"movil",look:"tipografico",desc:"Una sola tabla para comparar y lo que incluye cada tarifa. Página corta."},
  ["dx_hmin","dx_table","dx_checklist","da_faq","da_footer","da_sticky"]);

/* — Cualificación — */
v5("Alarma · Quiz de 3 preguntas",{g:G_QUAL,v:"alarma",look:"base",desc:"El quiz es el hero: 3 preguntas y el teléfono al final. Leads más cualificados."},
  ["db_nav","dx_quiz","db_seals","db_steps","db_reviews","db_faq","db_footer","db_sticky"]);
v5("Solar · Calcula tu ahorro",{g:G_QUAL,v:"solar",look:"bauhaus",desc:"Calculadora en el hero e historia de un caso real."},
  ["da_nav","dx_hsaver","dx_story","dx_timeline","da_faq","da_footer","da_sticky"]);
v5("Luz · Cuánto pagas ahora",{g:G_QUAL,v:"luz",look:"setentas",desc:"Barra de factura sin cifras inventadas: el ahorro real se confirma en la llamada."},
  ["dx_hsaver","dx_colortiles","dx_spotlight","dx_faqsplit","dc_footer","dc_sticky"]);
v5("Seguro hogar · Quiz de póliza",{g:G_QUAL,v:"hogar",look:"papel",desc:"Quiz para saber qué asegurar y cuándo vence la póliza actual."},
  ["da_nav","dx_quiz",_s("dx_callout",{tone:"brand",icon:"calendar",title:"¿Te vence la póliza pronto?",text:"Revísala antes de la renovación automática: {{AVISO_RENOVACION}}."}),"dx_checklist","db_reviews","da_faq","da_footer","da_sticky"]);
v5("Legal · ¿Tienes caso?",{g:G_QUAL,v:"legal",look:"prensa",pi:0,desc:"Hero con pregunta de cualificación y perfiles de caso."},
  ["db_nav","db_hero","dx_profiles","db_steps","dx_rating","db_faq","db_cta","db_footer","db_sticky"]);
v5("Fibra · Encuentra tu fibra",{g:G_QUAL,v:"telco",look:"cuaderno",desc:"Quiz de uso real y tarifas recomendadas debajo."},
  ["da_topbar","da_nav","dx_quiz","da_plans","da_trust","da_faq","da_footer","da_sticky"]);
v5("Salud · ¿Qué seguro te conviene?",{g:G_QUAL,v:"salud",look:"editorial",desc:"Quiz, pestañas por perfil y teléfono grande al final."},
  ["dx_quiz","dx_tabs","dx_spotlight","dx_phoneband","db_footer"]);
v5("Reformas · Elige tu reforma",{g:G_QUAL,v:"reformas",look:"crudo",desc:"Selector de tipo de reforma en el hero y galería de trabajos."},
  ["da_nav","dx_hpicker","dx_gallery","db_steps","da_faq","dx_footcols","da_sticky"]);
v5("Teleasistencia · ¿Para quién es?",{g:G_QUAL,v:"telea",look:"riso",pi:0,desc:"Formulario en dos pasos tras un hero cálido: primero para quién, luego el teléfono."},
  ["db_nav","dx_hsplit","dx_profiles","dx_form2","db_faq","db_footer","db_sticky"]);

/* — Contenido que vende — */
v5("Luz · Advertorial",{g:G_CONT,v:"luz",look:"revista",pi:4,desc:"Formato artículo para tráfico frío de redes: informa primero y vende después."},
  ["dx_article","dx_story","dx_rating","dx_ctaimg","db_footer"]);
v5("Alarma · Artículo y quiz",{g:G_CONT,v:"alarma",look:"prensa",pi:2,desc:"Artículo de periódico que desemboca en un quiz de cualificación."},
  ["dx_article","dx_quiz","db_reviews","db_footer","db_sticky"]);
v5("Seguro coche · Guía descargable",{g:G_CONT,v:"coche",look:"expediente",desc:"Guía gratuita a cambio del email (y teléfono opcional). Lead más frío, más barato."},
  ["db_nav","dx_leadmag","dx_iconlist","db_faq","db_footer"]);
v5("Solar · Historia de un cliente",{g:G_CONT,v:"solar",look:"editorial",pi:1,desc:"Hero editorial, historia problema-solución y antes/después."},
  ["db_nav","dx_heditorial","dx_story","dx_beforeafter","dx_spotlight","db_faq","db_cta","db_footer","db_sticky"]);
v5("Teleasistencia · Carta del equipo",{g:G_CONT,v:"telea",look:"revista",pi:3,desc:"Tono humano: artículo, nota firmada por el equipo y perfiles."},
  ["dx_heditorial","dx_letter","dx_profiles","db_faq","dx_phoneband","db_footer"]);
v5("Fibra · Vídeo explicativo",{g:G_CONT,v:"telco",look:"neobanco",desc:"Vídeo en el hero, rejilla de lo esencial y testimonios en vídeo."},
  ["dc_nav","dx_hvideo","dx_tiles","dx_vtestis","dc_faq","dc_cta","dc_footer","dc_sticky"]);
v5("Agua · Cómo funciona en vídeo",{g:G_CONT,v:"agua",look:"postal",desc:"Vídeo y carrusel de pasos para explicar el equipo sin tecnicismos."},
  ["da_nav","dx_hvideo","dx_slider","dx_checklist","da_faq","da_footer","dx_wa"]);
v5("Legal · Guía de reclamación",{g:G_CONT,v:"legal",look:"ficha",desc:"Guía descargable como hero, historia y quién lleva el caso."},
  ["dx_leadmag","dx_story","dx_pro","db_faq","db_footer","db_sticky"]);

/* — Confianza y autoridad — */
v5("Alarma · Confianza editorial",{g:G_TRUST,v:"alarma",look:"editorial",pi:3,desc:"Hero con prueba social y pregunta, sellos, pasos, comparativa honesta y opiniones."},
  ["db_nav","db_hero","db_seals","db_steps","db_compare","db_reviews","db_faq","db_cta","db_footer","db_sticky"]);
v5("Salud · Testimonio protagonista",{g:G_TRUST,v:"salud",look:"revista",pi:2,desc:"Un testimonio grande, valoraciones y el equipo que atiende."},
  ["db_nav","db_hero","dx_spotlight","dx_rating","dx_team","db_faq","db_footer","db_sticky"]);
v5("Legal · Quién lleva tu caso",{g:G_TRUST,v:"legal",look:"plano",pi:1,desc:"El profesional da la cara: ficha, cifras reales y opiniones."},
  ["db_nav","dx_hsplit","dx_pro","dx_counters","db_reviews","dx_faqsplit","db_footer","db_sticky"]);
v5("Teleasistencia · Equipo y garantías",{g:G_TRUST,v:"telea",look:"azulejo",pi:0,desc:"Quién atiende, garantías y banda de seguridad para un público prudente."},
  ["db_nav","db_hero","dx_team","dx_seals","dx_guarantee","db_faq","db_cta","db_footer","db_sticky"]);
v5("Reformas · Trabajos reales",{g:G_TRUST,v:"reformas",look:"expediente",desc:"Foto a pantalla completa, antes/después, galería y vídeos de clientes."},
  ["da_nav","dx_hfull","dx_beforeafter","dx_gallery","dx_vtestis","dx_guarantee","da_faq","dx_footcols","da_sticky"]);
v5("Seguro hogar · Valoraciones reales",{g:G_TRUST,v:"hogar",look:"base",desc:"Hero mínimo y toda la página dedicada a la prueba social verificable."},
  ["db_nav","dx_hmin","dx_rating","db_reviews","dx_seals","db_faq","db_footer","db_sticky"]);
v5("Luz · Cifras y garantías",{g:G_TRUST,v:"luz",look:"industrial",pi:2,desc:"Cifras reales con fuente, garantía e insignias de confianza."},
  ["da_nav","da_hero","dx_counters","dx_guarantee","dx_badges","da_faq","da_cta","da_footer","da_sticky"]);
v5("Fibra · Comparativa honesta",{g:G_TRUST,v:"telco",look:"ticket",pi:4,desc:"Nosotros frente a otras opciones, opiniones y garantía."},
  ["da_topbar","dx_hsplit","dx_vs","db_reviews","dx_guarantee","da_faq","da_footer","da_sticky"]);
v5("Seguro coche · Sellos y asistencia",{g:G_TRUST,v:"coche",look:"senal",desc:"Hero de confianza con pregunta e insignias de asistencia."},
  ["db_nav","db_hero","dx_badges","dx_iconlist","db_reviews","db_faq","db_footer","db_sticky"]);

/* — Producto premium — */
v5("Fibra · Premium oscuro",{g:G_PREM,v:"telco",look:"lux",pi:2,desc:"Estética de producto premium: hero oscuro, logos, bento y CTA final oscuro."},
  ["dc_nav","dc_hero","dc_logos","dc_bento","dx_vs","dc_faq","dc_cta","dc_footer","dc_sticky"]);
v5("Agua · Producto minimal",{g:G_PREM,v:"agua",look:"lux",desc:"Barra de producto, hero centrado, rejilla, vídeo y qué incluye."},
  ["dx_subnav","dx_product","dx_tiles","dx_video","dx_checklist","dc_faq","dc_footer"]);
v5("Solar · Producto con cifras",{g:G_PREM,v:"solar",look:"nocturno",pi:3,desc:"Producto premium con cifras animadas y carrusel de pasos."},
  ["dx_subnav","dx_product","dx_stats","dx_slider","dx_faqsplit","dc_cta","dc_footer","dc_sticky"]);
v5("Alarma · Bento premium",{g:G_PREM,v:"alarma",look:"vitrina",pi:2,desc:"Mosaico de producto en el hero y pestañas por tipo de vivienda."},
  ["dc_nav","dx_hbento","dx_tabs","dc_logos","dc_faq","dc_footer","dc_sticky"]);
v5("Móvil · Lanzamiento",{g:G_PREM,v:"movil",look:"tipografico",pi:4,desc:"Lanzamiento de tarifa: hero oscuro, cinta y perfiles."},
  ["dc_nav","dc_hero",_s("dx_ticker",{tone:"brand"}),"dx_tiles",_s("dx_spacer",{style:"wave",tone:"brand",size:"L"}),"dx_profiles","dc_cta","dc_footer"]);
v5("Salud · Premium a pantalla completa",{g:G_PREM,v:"salud",look:"lux",pi:3,desc:"Foto a sangre, bento y testimonio. Para seguros de gama alta."},
  ["dx_hfull","dc_bento","dx_spotlight","dc_faq","dc_cta","dc_footer","dc_sticky"]);
v5("Teleasistencia · Calidez premium",{g:G_PREM,v:"telea",look:"vitrina",pi:1,desc:"Foto partida, lista de lo que incluye y línea de tiempo del servicio."},
  ["dx_hsplit","dx_iconlist","dx_spotlight","dx_timeline","dc_faq","dc_footer","dc_sticky"]);
v5("Reformas · Portfolio",{g:G_PREM,v:"reformas",look:"crudo",desc:"Mosaico con el último trabajo, galería y antes/después."},
  ["dc_nav","dx_hbento","dx_gallery","dx_beforeafter","dx_spotlight","dc_cta","dc_footer","dc_sticky"]);

/* — Empresas (B2B) — */
v5("Empresas · Gestor de referencia",{g:G_B2B,v:"empresas",look:"swiss",pi:2,desc:"Foto partida, logos de clientes, lo que incluye y planes."},
  ["dc_nav","dx_hsplit","dx_logos","dx_iconlist","da_plans","dx_faqsplit","dx_footcols","da_sticky"]);
v5("Empresas · Comparador por tamaño",{g:G_B2B,v:"empresas",look:"neobanco",pi:1,desc:"Barra de producto, mosaico y comparador filtrable por tamaño de empresa."},
  ["dx_subnav","dx_hbento","dx_finder","dx_table","dc_faq","dc_footer"]);
v5("Empresas · Cuéntanos tu empresa",{g:G_B2B,v:"empresas",look:"ficha",desc:"Quiz B2B y reserva de llamada con un gestor en la franja que elijas."},
  ["da_nav","dx_quiz","dx_counters","dx_booking","da_faq","da_footer"]);
v5("Alarma negocio · Visita técnica",{g:G_B2B,v:"alarmaneg",look:"industrial",pi:2,desc:"Hero de confianza con tipo de negocio y línea de tiempo de la visita."},
  ["db_nav","db_hero","dx_iconlist","dx_timeline","db_reviews","db_faq","db_footer","db_sticky"]);
v5("Alarma negocio · Cámaras en el móvil",{g:G_B2B,v:"alarmaneg",look:"terminal",desc:"Vídeo del producto, pestañas por tipo de local y comparativa."},
  ["da_nav","dx_hvideo","dx_tabs","dx_vs","da_faq","da_cta","da_footer","da_sticky"]);
v5("Solar · Para naves y negocios",{g:G_B2B,v:"solar",look:"plano",pi:2,desc:"Foto a pantalla completa, cifras, caso real y reserva de llamada."},
  ["dc_nav","dx_hfull","dx_counters","dx_story","dx_booking","dc_faq","dc_footer"]);
v5("Empresas · Respaldo y centralita",{g:G_B2B,v:"empresas",look:"senal",pi:3,desc:"Hero oscuro con campo, mosaico de servicios y teléfono directo."},
  ["dc_nav","dc_hero","dx_colortiles","dx_vs",_s("dx_phoneband",{tone:"ink"}),"dc_footer","dc_sticky"]);
v5("Empresas · Propuesta por escrito",{g:G_B2B,v:"empresas",look:"editorial",desc:"Promesa mínima, logos, proceso y qué incluye la propuesta."},
  ["db_nav","dx_hmin","dx_text","dx_logos","dx_timeline","dx_checklist","db_faq","db_footer"]);

/* — Citas y servicio local — */
v5("Reformas · Pide visita",{g:G_LOCAL,v:"reformas",look:"papel",desc:"Foto partida, reserva de visita por día y franja, zona de servicio y galería."},
  ["da_nav","dx_hsplit","dx_booking","dx_area","dx_gallery","da_faq","da_footer","da_sticky"]);
v5("Solar · Instaladores de tu zona",{g:G_LOCAL,v:"solar",look:"postal",pi:3,desc:"Zona de servicio, mapa y equipo local."},
  ["da_nav","da_hero","dx_area","dx_map","dx_team","da_faq","da_footer","da_sticky"]);
v5("Salud · Pide cita",{g:G_LOCAL,v:"salud",look:"azulejo",desc:"Reserva de llamada, profesional y mapa de la consulta."},
  ["db_nav","dx_hmin","dx_booking","dx_pro","dx_map","db_faq","db_footer"]);
v5("Agua · Técnico en tu zona",{g:G_LOCAL,v:"agua",look:"cuaderno",desc:"Hero con precio, zonas atendidas y línea de tiempo de la instalación."},
  ["da_topbar","da_nav","da_hero","dx_area","dx_timeline","dx_spotlight","da_faq","da_footer","da_sticky"]);
v5("Legal · Despacho cercano",{g:G_LOCAL,v:"legal",look:"revista",pi:2,desc:"Foto partida, mapa del despacho, equipo y valoraciones."},
  ["db_nav","dx_hsplit","dx_map","dx_team","dx_rating","db_faq","db_footer","db_sticky"]);
v5("Teleasistencia · Instalación en casa",{g:G_LOCAL,v:"telea",look:"retro",pi:2,desc:"Reserva de la instalación y lista de lo que incluye."},
  ["da_nav","dx_hsplit","dx_booking","dx_iconlist","db_faq","da_footer","da_sticky"]);
v5("Alarma · Instalador local",{g:G_LOCAL,v:"alarma",look:"riso",pi:1,desc:"Zona de servicio, quién instala y qué incluye."},
  ["da_nav","da_hero","dx_area","dx_pro","dx_checklist","da_faq","da_footer","da_sticky"]);
v5("Seguro hogar · Agente de tu zona",{g:G_LOCAL,v:"hogar",look:"postal",pi:0,desc:"Foto a pantalla completa, tu agente y zona de atención."},
  ["db_nav","dx_hfull","dx_pro","dx_area","db_reviews","db_faq","db_footer","db_sticky"]);

/* — Páginas cortas — */
v5("Gracias · Con llamada",{g:G_MICRO,v:"telco",look:"base",desc:"Página de gracias: qué pasa ahora y botón para llamar sin esperar."},
  ["da_nav","dx_thanks","da_footer"]);
v5("Gracias · Con testimonio",{g:G_MICRO,v:"hogar",look:"editorial",desc:"Gracias con un testimonio para reforzar la decisión mientras espera la llamada."},
  ["db_nav","dx_thanks","dx_spotlight","db_footer"]);
v5("Micro · Solo formulario",{g:G_MICRO,v:"luz",look:"acido",desc:"Un campo y garantías. Para retargeting o tráfico muy caliente."},
  ["dx_hmin","dx_seals","da_footer"]);
v5("Micro · Un clic para llamar",{g:G_MICRO,v:"telea",canal:"call",look:"bauhaus",desc:"Cartel con el teléfono como botón principal e insignias."},
  [_s("dx_hposter",{tone:"paper",upper:"no"}),"dx_badges","dc_footer","da_sticky"]);
v5("Micro · Cupón",{g:G_MICRO,v:"movil",look:"comic",desc:"Solo el cupón y lo que incluye."},
  ["dx_hcoupon","dx_checklist","da_footer"]);
v5("Micro · Guía por email",{g:G_MICRO,v:"hogar",look:"tipografico",desc:"Guía descargable e insignias. Captación de email."},
  ["dx_leadmag","dx_badges","db_footer"]);
v5("Micro · Captura en dos pasos",{g:G_MICRO,v:"coche",look:"riso",desc:"Formulario en dos pasos como única sección."},
  ["dc_nav","dx_form2","dx_seals","dc_footer"]);
v5("Micro · Vídeo y llamada",{g:G_MICRO,v:"alarmaneg",canal:"call",look:"memphis",desc:"Vídeo corto y banda de teléfono."},
  ["dx_hvideo","dx_phoneband","da_footer"]);

/* ===== 5 · CLIENTES (marca propia) ===== */
TEMPLATE_BRAND["Cliente · SICOR Teleasistencia"]="c_teleasistencia";
v4Tpl("Cliente · SICOR Teleasistencia",{group:"Cliente",client:"SICOR Teleasistencia",sector:"Teleasistencia",canal:"call",desc:"Teleasistencia: el público mayor prefiere hablar; llamada como canal principal."},[
  {type:"db_nav",props:{logo:"SICOR Teleasistencia"}},{type:"db_hero",props:{canal:"call",kicker:"Teleasistencia",headline:"Que tus mayores estén acompañados",italic:"las 24 horas",sub:"Un botón para pedir ayuda en cualquier momento, en casa o fuera. Te lo explicamos sin compromiso.",proof:"24 h|atención\n{{USUARIOS}}|personas atendidas\n{{AÑOS}}|de experiencia",question:"¿Para quién es?",options:"🙋 Para mí|👵 Para un familiar",formTitle:"Te informamos sin compromiso",formSub:"Dinos para quién es y te llamamos.",btn:"Quiero información"}},
  {type:"db_steps",props:{title:"Cómo funciona",items:"Pulsa el botón|En casa o fuera, cuando lo necesites.\nTe atendemos|Un profesional habla contigo al momento.\nMovilizamos ayuda|Avisamos a familiares o a emergencias."}},
  {type:"db_reviews"},{type:"db_faq",props:{items:"¿Cómo funciona el botón?|{{RESPUESTA}}\n¿Funciona fuera de casa?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}\n¿Hay permanencia?|{{RESPUESTA}}"}},{type:"db_cta"},{type:"db_footer",props:{company:"{{RAZON_SOCIAL}}"}},{type:"db_sticky",props:{canal:"call"}}]);
TEMPLATE_BRAND["Cliente · Tuawa"]="tuawa";
v4Tpl("Cliente · Tuawa",{group:"Cliente",client:"Tuawa",sector:"Agua",canal:"form",desc:"Filtración de agua en casa con estética premium."},[
  {type:"dc_nav",props:{logo:"Tuawa"}},{type:"dc_hero",props:{chip:"",chipText:"Agua filtrada en casa",headline:"Agua filtrada,",gradient:"sin garrafas",sub:"Directa del grifo, sin cargar botellas. Te contamos cómo funciona sin compromiso.",btn:"Quiero información",kpis:"{{DATO_1}}|{{ETIQUETA_1}}\n{{DATO_2}}|{{ETIQUETA_2}}\n{{DATO_3}}|{{ETIQUETA_3}}"}},
  {type:"dc_bento",props:{title:"Todo lo que",gradient:"ganas en casa",tiles:"Sin garrafas|Olvídate de cargar y almacenar botellas.|dark||\nDel grifo|Agua filtrada cuando la necesitas.||\nInstalación|{{DETALLE_INSTALACION}}||\nMantenimiento|{{DETALLE_MANTENIMIENTO}}|dark|"}},
  {type:"dc_faq",props:{items:"¿Cómo se instala?|{{RESPUESTA}}\n¿Cada cuánto se cambia el filtro?|{{RESPUESTA}}\n¿Cuánto cuesta?|{{RESPUESTA}}"}},{type:"dc_cta",props:{title:"Agua filtrada",gradient:"desde hoy"}},{type:"dc_footer",props:{company:"{{RAZON_SOCIAL}}"}},{type:"dc_sticky"}]);

/* Plantilla con la que arranca el editor */
const NC_DEFAULT_TPL="Fibra · Oferta con formulario arriba";
