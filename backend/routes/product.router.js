const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
} = require('../controllers/product.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validator = require('express-joi-validation').createValidator({});

const postProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
});

const putProductSchema = Joi.object({
  productId: Joi.string().required(),
  title: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  category: Joi.string().optional(),
});

const getProductsSchema = Joi.object({
  categoryId: Joi.string(),
});

router.post('/', authMiddleware, validator.body(postProductSchema), createProduct);
router.put('/', authMiddleware, validator.body(putProductSchema), updateProduct);
router.get('/:productId', getProduct);
router.get('/', validator.query(getProductsSchema), getProducts);

module.exports = router;
