function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    data: null,
    error: {
      codigo: 'ERRO_INTERNO',
      mensagem: 'Ocorreu um erro interno no servidor'
    }
  });
}

module.exports = errorHandler;
