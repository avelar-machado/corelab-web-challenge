const errorHandler = (err, req, res, next) => {
  console.error("Erro capturado:", err.stack || err.message);

  res.status(err.status || 500).json({
    message: err.message || "Erro interno no servidor",
  });
};

export default errorHandler;
