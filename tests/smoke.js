// Smoke test de UI: interacciones reales en el editor. Uso: node smoke.js <carpeta_app>
const { open } = require('./harness');
(async () => {
  const app = await open(require('path').resolve(process.argv[2]));
  const p = app.page; const log = [];
  const step = async (name, fn) => { try { await fn(); log.push('ok  ' + name); } catch (e) { log.push('ERR ' + name + ': ' + e.message.split('\n')[0]); } };
  await step('paleta visible', async () => { if (await p.locator('#palette .chip').count() < 20) throw new Error('pocos bloques'); });
  await step('añadir bloque', () => p.evaluate(() => addSection('faq')));
  await step('seleccionar desde estructura', async () => { await p.locator('#outline .oitem').first().click(); });
  await step('pestaña estilo', () => p.locator('[data-tab="style"]').click());
  await step('pestaña global', () => p.locator('[data-tab="global"]').click());
  await step('dispositivo móvil', () => p.locator('[data-dev="mobile"]').click());
  await step('duplicar/borrar', () => p.evaluate(() => { const id = state.sections[0].id; rowAction(id, 'dup'); rowAction(state.sections[0].id, 'del'); }));
  await step('undo/redo', () => p.evaluate(() => { undo(); redo(); }));
  await step('plantilla desde select', async () => { const v = await p.locator('#tplSel option').nth(3).getAttribute('value'); await p.selectOption('#tplSel', v); });
  await step('cambio de marca', async () => { const v = await p.locator('#brandTop option').nth(5).getAttribute('value'); await p.selectOption('#brandTop', v); });
  await step('importar HTML', () => p.evaluate(() => importFromText('<section><h1>Hola</h1><p>Texto</p></section><section><h2>Otra</h2></section>')));
  await step('exportar ZIP', async () => { await p.evaluate(()=>{state.settings.tel='600111222';}); const [d] = await Promise.all([p.waitForEvent('download', { timeout: 5000 }), p.evaluate(()=>exportZip())]); log.push('    zip: ' + d.suggestedFilename()); });
  await p.waitForTimeout(500);
  console.log(log.join('\n')); console.log('errores JS:', app.errors.length ? '\n' + app.errors.join('\n') : 0);
  await app.close();
})();
