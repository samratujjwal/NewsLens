export function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get("User-Agent") || "Unknown";
  const ip = req.ip || req.connection.remoteAddress;

  req.startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - req.startTime;
    const status = res.statusCode;
    const statusEmoji = status >= 400 ? "❌" : status >= 300 ? "⚠️" : "✅";
  });

  next();
}
