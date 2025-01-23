const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error.';
  const errorDetails = err.details || null;

  res.status(statusCode).json({
    success: false,
    msg: message,
    ...(errorDetails && { details: errorDetails }),
  });
};

export default errorHandler;
