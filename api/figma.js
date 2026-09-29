// /api/figma — proxy a la API de Figma (evita CORS y no expone el token en la URL).
// GET /api/figma?kind=svg&fileKey=KEY&nodeId=1:2   cabecera: x-figma-token
// Si no se envía token, usa la variable de entorno FIGMA_TOKEN de Vercel (opcional).
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const send = (code, body) => res.status(code).json(body);
  if (req.method !== 'GET') return send(405, { error: 'Método no permitido' });

  const { kind = 'svg', fileKey = '', nodeId = '' } = req.query || {};
  const token = String(req.headers['x-figma-token'] || process.env.FIGMA_TOKEN || '').trim();
  if (!token) return send(401, { error: 'Falta el token de Figma' });
  if (!/^[A-Za-z0-9]{10,64}$/.test(fileKey)) return send(400, { error: 'fileKey no válido' });
  if (!/^\d+[:-]\d+$/.test(nodeId)) return send(400, { error: 'nodeId no válido (formato 123:456)' });
  if (!['svg', 'png'].includes(kind)) return send(400, { error: 'kind debe ser svg o png' });

  const id = nodeId.replace('-', ':');
  try {
    const api = await fetch(
      `https://api.figma.com/v1/images/${fileKey}?ids=${encodeURIComponent(id)}&format=${kind}` +
        (kind === 'svg' ? '&svg_include_id=false&svg_simplify_stroke=true' : '&scale=2'),
      { headers: { 'X-Figma-Token': token } }
    );
    const j = await api.json().catch(() => ({}));
    if (!api.ok || j.err) return send(api.status === 200 ? 502 : api.status, { error: j.err || j.message || 'Error de Figma (' + api.status + ')' });
    const url = j.images && j.images[id];
    if (!url) return send(404, { error: 'Figma no devolvió imagen para ese nodo' });
    if (kind === 'png') return send(200, { url });

    const host = new URL(url).hostname;
    if (!/(^|\.)(amazonaws\.com|figma\.com)$/.test(host)) return send(502, { error: 'Origen de imagen inesperado' });
    const svg = await (await fetch(url)).text();
    if (!svg.includes('<svg')) return send(502, { error: 'Respuesta SVG vacía' });
    return send(200, { svg });
  } catch (e) {
    return send(500, { error: 'No se pudo conectar con Figma: ' + e.message });
  }
};
