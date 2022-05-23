const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  registerUser,
  loginUser,
} = require('../controllers/user.controller');
const validator = require('express-joi-validation').createValidator({});

const registerUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('admin', 'user').default('user'),
});

const loginUserSchema = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().min(8).required(),
});
router.post('/register', validator.body(registerUserSchema), registerUser);
router.post('/login', validator.body(loginUserSchema), loginUser);

module.exports = router;
