// E2E de la Fase 2: autoguardado, atajos, ocultar, copiar/pegar, versiones, JSON, Mis landings.
// Uso: node e2e-workspace.js <carpeta_app>
const { open } = require('./harness');
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'out'); fs.mkdirSync(OUT, { recursive: true });
let fails = 0; const ok = (c, m) => { console.log((c ? 'ok  ' : 'FAIL') + ' ' + m); if (!c) fails++; };
const FAKE = fs.readFileSync(path.join(__dirname, 'fake-supabase.js'), 'utf8');
(async () => {
  const app = await open(path.resolve(process.argv[2]), { fake: FAKE, wait: 1500 }); const p = app.page;
  const ev = f => p.evaluate(f);
  const count = () => ev(() => state.sections.length);
  ok(await ev(() => ws.user === 'equipo@nc.test'), 'sesión detectada');
  // Guardar con Ctrl+S
  await p.locator('#landingName').fill('Landing test');
  await p.locator('#palSearch').click(); await p.keyboard.press('Escape');
  await p.keyboard.press('Control+s'); await p.waitForTimeout(300);
  ok(await ev(() => __db.landings.length === 1 && __db.landing_versions.length === 1), 'Ctrl+S (aun con foco en un campo) guarda y crea versión');
  ok(await ev(() => ws.status === 'saved'), 'estado "Guardado" (' + await p.locator('#saveChip').textContent() + ')');
  // Cambio → sin guardar → autosave no crea versión
  await ev(() => addSection('faq')); await p.waitForTimeout(1000);
  ok(await ev(() => ws.status === 'dirty'), 'tras un cambio: "Sin guardar"');
  await ev(() => saveLanding({ auto: true })); await p.waitForTimeout(200);
  ok(await ev(() => __db.landing_versions.length === 1 && __db.landings[0].data.sections.length === state.sections.length && ws.status === 'saved'), 'autoguardado actualiza la landing sin crear versión');
  // Versiones + restaurar
  const n1 = await count();
  await ev(() => addSection('stats')); await ev(() => saveLanding()); await p.waitForTimeout(200);
  ok(await ev(() => __db.landing_versions.length === 2), 'segundo guardado manual → 2 versiones');
  await p.locator('#btnMine').click(); await p.waitForTimeout(300);
  await p.locator('[data-ver]').first().click(); await p.waitForTimeout(300);
  ok(await p.locator('#verList [data-m=restore]').count() === 2, 'modal de versiones lista 2');
  await p.locator('#verList [data-m=restore]').last().click(); await p.waitForTimeout(300);
  ok(await count() === n1 - 1, 'restaurar versión antigua (' + await count() + ' secciones)');
  // Poda a 30
  await ev(async () => { for (let i = 0; i < 33; i++) { addSection('faq'); await saveLanding(); } }); await p.waitForTimeout(300);
  ok(await ev(() => __db.landing_versions.length <= 30), 'se conservan máx. 30 versiones (' + await ev(() => __db.landing_versions.length) + ')');
  // XSS + buscador
  await ev(() => __db.landings.push({ id: 'evil', nombre: '<img src=x onerror="window.__xss=1">Cliente Z', marca: 'nc', data: { sections: [] }, updated_at: new Date().toISOString() }));
  await p.locator('#btnMine').click(); await p.waitForTimeout(400);
  ok(await ev(() => !window.__xss) && (await p.locator('#mineList').textContent()).includes('<img'), 'nombres escapados (sin XSS)');
  await p.locator('#mineSearch').fill('cliente z'); await p.waitForTimeout(100);
  ok(await p.locator('#mineList [data-load]').count() === 1, 'buscador filtra por nombre');
  await p.locator('#mineSearch').fill('zzzz');
  ok((await p.locator('#mineList').textContent()).includes('Sin resultados'), 'sin resultados');
  await p.locator('#mineClose').click();
  // Ocultar sección → no se exporta
  const hid = await ev(() => { const s = state.sections[1]; rowAction(s.id, 'hide'); return s.id; });
  ok(await ev(id => !buildDoc(true).includes('data-sec="' + id + '"') && buildDoc(false).includes('nc-hid'), hid), 'sección oculta: visible en preview, fuera del export');
  // Atajos en el documento principal
  await p.locator('#outline .oitem').first().click(); let c0 = await count();
  await p.locator('#outline').click({ position: { x: 5, y: 5 } }).catch(() => {});
  await p.keyboard.press('Control+d'); ok(await count() === c0 + 1, 'Ctrl+D duplica');
  await p.keyboard.press('Control+c'); await p.keyboard.press('Control+v'); ok(await count() === c0 + 2, 'Ctrl+C / Ctrl+V pega la sección');
  await p.keyboard.press('Delete'); ok(await count() === c0 + 1, 'Supr elimina');
  await p.keyboard.press('Control+z'); ok(await count() === c0 + 2, 'Ctrl+Z deshace');
  // Atajo con el foco dentro del preview (iframe)
  const fr = p.frameLocator('#pv'); c0 = await count();
  await fr.locator('[data-sec]').nth(2).click({ position: { x: 20, y: 20 } }); await p.waitForTimeout(300);
  await fr.locator('body').press('Control+d'); await p.waitForTimeout(300);
  ok(await count() === c0 + 1, 'Ctrl+D con el foco en el preview');
  // Nueva landing no arrastra datos de contacto
  await ev(() => { state.settings.tel = '600111222'; state.settings.gtm = 'GTM-AAAA111'; newLanding(); });
  ok(await ev(() => !state.settings.tel && !state.settings.gtm && !state.sections.length && cloud.id === null), 'Nueva landing reinicia teléfono/GTM');
  // Borrador local + recuperación tras recargar
  await ev(() => { loadTemplate('Oferta / urgencia'); }); await p.waitForTimeout(1200);
  const nDraft = await count();
  await p.reload(); await p.waitForTimeout(1500);
  ok(await p.locator('#wsOverlay [data-m=restore]').isVisible(), 'al recargar ofrece recuperar el borrador');
  await ev(() => wsOnChange()); // el intervalo no debe pisar el borrador mientras decides
  await p.locator('#wsOverlay [data-m=restore]').click(); await p.waitForTimeout(300);
  ok(await count() === nDraft, 'borrador recuperado (' + nDraft + ' secciones)');
  // Exportar / importar .json
  await p.locator('#btnMine').click(); await p.waitForTimeout(200);
  const [dl] = await Promise.all([p.waitForEvent('download'), p.locator('#mineJsonOut').click()]);
  const jf = path.join(OUT, 'proyecto.nc.json'); await dl.saveAs(jf);
  await ev(() => { state.sections = []; renderPreview(); });
  await p.locator('#mineJsonFile').setInputFiles(jf); await p.waitForTimeout(400);
  ok(await count() === nDraft && await ev(() => cloud.id === null), 'importar .json carga el proyecto como landing nueva');
  // Sin tabla de versiones (migración no ejecutada)
  await ev(() => { delete __db.landing_versions; }); await ev(() => saveLanding()); await p.waitForTimeout(300);
  ok(await ev(() => ws.noVersions === true && ws.status === 'saved'), 'sin migración: guarda igual y avisa');
  await p.screenshot({ path: path.join(OUT, 'ws-editor.png') });
  ok(!app.errors.length, 'sin errores JS ' + app.errors.join(' | '));
  await app.close();
  console.log(fails ? fails + ' FALLOS' : 'TODO OK'); process.exit(fails ? 1 : 0);
})();
