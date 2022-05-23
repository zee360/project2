const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
} = require('../controllers/category.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validator = require('express-joi-validation').createValidator({});

const postCategorySchema = Joi.object({
  title: Joi.string().required(),
});

const putCategorySchema = Joi.object({
  categoryId: Joi.string().required(),
  title: Joi.string().optional(),
});


router.post('/', authMiddleware, validator.body(postCategorySchema), createCategory);
router.put('/', authMiddleware, validator.body(putCategorySchema), updateCategory);
router.get('/:categoryId', getCategory);
router.get('/', getCategories);

module.exports = router;
