const express = require('express');
const {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const {
  validateCreateUser,
  validateUpdateUser
} = require('../middlewares/validateUser');

const router = express.Router();

router.get('/', listUsers);
router.post('/', validateCreateUser, createUser);
router.get('/:id', getUserById);
router.patch('/:id', validateUpdateUser, updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
