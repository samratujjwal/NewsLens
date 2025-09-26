export function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal server error";
  let details = null;

  if (error.name === "ValidationError") {
    status = 400;
    message = "Validation error";
    details = error.message;
  } else if (error.name === "UnauthorizedError") {
    status = 401;
    message = "Unauthorized access";
  } else if (error.code === "ECONNREFUSED") {
    status = 503;
    message = "Service temporarily unavailable";
  } else if (error.response?.status) {
    status = error.response.status;
    message = error.message;
  }

  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
    ...(process.env.NODE_ENV === "development" && {
      details,
      stack: error.stack,
    }),
  });
}
