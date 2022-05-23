const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  updateUser,
  getUser,
  getUsers,
} = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validator = require('express-joi-validation').createValidator({});

const putUserSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().optional().optional(),
  email: Joi.string().min(6).optional().optional(),
  password: Joi.string().min(8).optional().optional(),
  role: Joi.string().valid('admin', 'user').optional(),
});

router.put('/', authMiddleware, validator.body(putUserSchema), updateUser);
router.get('/:userId', getUser);
router.get('/', getUsers);

module.exports = router;
