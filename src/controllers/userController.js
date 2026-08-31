const {
  readUsers,
  saveUsers,
  generateUserId
} = require('../data/userRepository');

function parseUserId(rawId) {
  const userId = Number(rawId);
  return Number.isInteger(userId) && userId > 0 ? userId : null;
}

function listUsers(req, res, next) {
  try {
    const users = readUsers();
    return res.status(200).json({ data: users, error: null });
  } catch (error) {
    return next(error);
  }
}

function createUser(req, res, next) {
  try {
    const users = readUsers();
    const normalizedEmail = req.body.email.trim().toLowerCase();

    if (users.some((user) => user.email === normalizedEmail)) {
      return res.status(409).json({
        data: null,
        error: {
          codigo: 'EMAIL_DUPLICADO',
          mensagem: 'Já existe um usuário com esse email'
        }
      });
    }

    const newUser = {
      id: generateUserId(users),
      nome: req.body.nome.trim(),
      email: normalizedEmail
    };

    users.push(newUser);
    saveUsers(users);

    return res.status(201).json({ data: newUser, error: null });
  } catch (error) {
    return next(error);
  }
}

function getUserById(req, res, next) {
  try {
    const userId = parseUserId(req.params.id);

    if (!userId) {
      return res.status(400).json({
        data: null,
        error: { codigo: 'ID_INVALIDO', mensagem: 'O ID informado é inválido' }
      });
    }

    const user = readUsers().find((item) => item.id === userId);

    if (!user) {
      return res.status(404).json({
        data: null,
        error: { codigo: 'NAO_ENCONTRADO', mensagem: 'Usuário não encontrado' }
      });
    }

    return res.status(200).json({ data: user, error: null });
  } catch (error) {
    return next(error);
  }
}

function updateUser(req, res, next) {
  try {
    const userId = parseUserId(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (!userId) {
      return res.status(400).json({
        data: null,
        error: { codigo: 'ID_INVALIDO', mensagem: 'O ID informado é inválido' }
      });
    }

    if (userIndex === -1) {
      return res.status(404).json({
        data: null,
        error: { codigo: 'NAO_ENCONTRADO', mensagem: 'Usuário não encontrado' }
      });
    }

    let normalizedEmail;
    if (req.body.email !== undefined) {
      normalizedEmail = req.body.email.trim().toLowerCase();

      if (users.some((user) => user.id !== userId && user.email === normalizedEmail)) {
        return res.status(409).json({
          data: null,
          error: {
            codigo: 'EMAIL_DUPLICADO',
            mensagem: 'Já existe um usuário com esse email'
          }
        });
      }
    }

    users[userIndex] = {
      ...users[userIndex],
      ...(req.body.nome !== undefined && { nome: req.body.nome.trim() }),
      ...(req.body.email !== undefined && { email: normalizedEmail })
    };

    saveUsers(users);
    return res.status(200).json({ data: users[userIndex], error: null });
  } catch (error) {
    return next(error);
  }
}

function deleteUser(req, res, next) {
  try {
    const userId = parseUserId(req.params.id);
    const users = readUsers();
    const userIndex = users.findIndex((user) => user.id === userId);

    if (!userId) {
      return res.status(400).json({
        data: null,
        error: { codigo: 'ID_INVALIDO', mensagem: 'O ID informado é inválido' }
      });
    }

    if (userIndex === -1) {
      return res.status(404).json({
        data: null,
        error: { codigo: 'NAO_ENCONTRADO', mensagem: 'Usuário não encontrado' }
      });
    }

    users.splice(userIndex, 1);
    saveUsers(users);
    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
};
