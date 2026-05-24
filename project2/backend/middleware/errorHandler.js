const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server error';
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    error: message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
