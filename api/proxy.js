// api/proxy.js
export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send("Missing URL");
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");

    res.setHeader("Content-Type", contentType || "application/octet-stream");
    response.body.pipe(res);
  } catch (error) {
    res.status(500).send("Error fetching the target URL.");
  }
}
