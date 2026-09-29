# Changelog

## v3.1 — 2026-09-29 · Fase 2 (UX del editor)
- Autoguardado: borrador local continuo con recuperación al abrir + sincronización en la nube a los 15 s si la landing ya existe. Indicador de estado y aviso al cerrar con cambios sin subir.
- Historial de versiones en Supabase (`landing_versions`, máx. 30 por landing) con restaurar. Requiere `supabase-migration-v3.1.sql`; sin ella todo sigue funcionando y avisa.
- Atajos: Ctrl+S, Ctrl+D, Ctrl+C/V de secciones entre landings, Supr, Alt+↑/↓, H, Esc, ? (también con el foco dentro del preview).
- Ocultar sección sin borrarla (se ve atenuada en el preview y no se exporta).
- Exportar / importar el proyecto como `.nc.json`.
- Mis landings: buscador, filtro por marca, fecha relativa, marca la abierta y acceso a versiones.
- Seguridad: los nombres de landing se escapan (antes permitían inyectar HTML).
- “Nueva landing” ya no arrastra teléfono, endpoint ni GTM del cliente anterior.
- Corrección: lo que se guarda es una copia congelada del estado en el momento de pulsar Guardar.
- Tests: `tests/e2e-workspace.js` con un Supabase simulado.

## v3.0 — 2026-09-29 · Fase 0 + Fase 1

### Fase 0 · Cimientos
- `index.html` (235 KB) separado en `css/app.css` + 12 archivos en `js/`. Sin build. Verificado: el HTML exportado es idéntico en 127 casos (20 plantillas, 73 bloques, 33 marcas).
- Nuevo `api/figma.js`: el importador de Figma llamaba a un proxy que no existía.
- `vercel.json` con cabeceras de seguridad; `.gitignore`; `.vercelignore`.
- La plantilla “Cliente · Prosegur (real)” se oculta si falta `plantillas/prosegur.html`.
- Tests en `tests/` (smoke del editor, E2E de la landing exportada, validación HTML).

### Fase 1 · Calidad del export
- Formularios: atribución UTM + click IDs, casilla RGPD enlazada (también en las casillas que ya traían los bloques, que antes no se enviaban por no tener `name`), primera capa informativa, honeypot, teléfono español con espacios/+34, autocomplete, `aria-label`, “Enviando…”, error real y URL de gracias opcional.
- El multipaso ahora envía las respuestas en `respuestas_quiz` (antes solo iban al dataLayer).
- Consent Mode v2 con banner Aceptar / Rechazar / Configurar y enlace “Configurar cookies”. Antes GTM cargaba sin consentimiento y “Rechazar” solo ocultaba el banner.
- Eventos: `click_to_call`, `whatsapp_click`, `form_start`, `generate_lead` (con `user_data` y `delivery`), `form_error`, `consent_update`.
- SEO: robots, canonical real (se elimina el placeholder `{{URL_CANONICA}}`), Open Graph/Twitter, favicon, theme-color, FAQPage, contador de caracteres en título y description.
- Rendimiento: imágenes del hero y del navbar sin lazy-load, `fetchpriority="high"` + preload del hero, `decoding="async"`.
- Checklist pre-export y nuevo botón `HTML ↓` (archivo único para FTP).
- Correcciones: `id="form"` duplicado cuando hay dos formularios, `title` en el iframe de GTM, los ajustes de una landing ya no se mezclan con los de la anterior al abrirla desde “Mis landings”.
