export function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_ERROR",
      message: status === 500 ? "Something went wrong." : err.message,
    },
  });
}
