const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validationError(codigo, mensagem) {
  return {
    data: null,
    error: { codigo, mensagem }
  };
}

function validateFields(req, res, next, requireBothFields) {
  const { nome, email } = req.body;

  if (requireBothFields && (nome === undefined || email === undefined)) {
    return res.status(400).json(
      validationError(
        'DADOS_OBRIGATORIOS',
        'Os campos nome e email são obrigatórios'
      )
    );
  }

  if (!requireBothFields && nome === undefined && email === undefined) {
    return res.status(400).json(
      validationError(
        'DADOS_OBRIGATORIOS',
        'Informe nome ou email para atualização'
      )
    );
  }

  if (nome !== undefined) {
    if (typeof nome !== 'string' || nome.trim().length < 2) {
      return res.status(400).json(
        validationError(
          'NOME_INVALIDO',
          'O nome deve possuir pelo menos 2 caracteres'
        )
      );
    }
  }

  if (email !== undefined) {
    if (typeof email !== 'string' || !emailPattern.test(email.trim())) {
      return res.status(400).json(
        validationError(
          'EMAIL_INVALIDO',
          'Informe um endereço de email válido'
        )
      );
    }
  }

  return next();
}

function validateCreateUser(req, res, next) {
  return validateFields(req, res, next, true);
}

function validateUpdateUser(req, res, next) {
  return validateFields(req, res, next, false);
}

module.exports = {
  validateCreateUser,
  validateUpdateUser
};
