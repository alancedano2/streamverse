// Archivo: api/proxy.js (para usar en Vercel)

export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl || !targetUrl.startsWith("http://")) {
    return res.status(400).json({ error: "Parámetro 'url' inválido o faltante." });
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener el recurso." });
    }

    res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/vnd.apple.mpegurl");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");

    const data = await response.text();
    res.status(200).send(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Error interno del servidor." });
  }
}
