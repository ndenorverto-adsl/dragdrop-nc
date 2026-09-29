// Genera el HTML exportado para todas las plantillas, todos los bloques y todas las marcas.
// Uso: node snapshot.js <carpeta_app> <salida.json>
const { open } = require('./harness');
(async () => {
  const [root, out] = process.argv.slice(2);
  const app = await open(require('path').resolve(root));
  const snap = await app.page.evaluate(() => {
    const r = {};
    const reset = () => { state.sections = []; state.selected = null; state.settings.brand = 'nc'; };
    Object.keys(TEMPLATES).forEach(n => { reset(); loadTemplate(n); r['tpl:' + n] = buildDoc(true); });
    Object.keys(LIB).filter(t => t !== 'imported').forEach(t => {
      reset(); if (LIB[t].brand) state.settings.brand = LIB[t].brand;
      state.sections = [{ id: 'x1', type: t, props: LIB[t].def(), style: {} }]; r['blk:' + t] = buildDoc(true);
    });
    Object.keys(BRANDS).forEach(b => { reset(); state.settings.brand = b; state.sections = TEMPLATES['Landing completa'].map((t, i) => ({ id: 'b' + i, type: t, props: LIB[t].def(), style: {} })); r['brand:' + b] = buildDoc(true); });
    r['editor:preview'] = buildDoc(false);
    return r;
  });
  require('fs').writeFileSync(out, JSON.stringify(snap, null, 1));
  console.log('claves:', Object.keys(snap).length, '| errores:', app.errors.length ? '\n' + app.errors.join('\n') : 0);
  await app.close();
})();
