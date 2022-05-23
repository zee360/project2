const express = require('express');
const router = express.Router();
const Joi = require('joi');
const {
  createOrder,
  updateOrder,
  getOrder,
  getOrders,
} = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validator = require('express-joi-validation').createValidator({});


const postOrderSchema = Joi.object({
  user: Joi.string().required(),
  products: Joi.array().items(Joi.object({
    quantity: Joi.number().required(),
    product: Joi.string().required(),
  })).required(),
  status: Joi.string().valid('pending', 'paid', 'cancelled').default('pending'),
  shippingInfo: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
  }).required(),
});

const putOrderSchema = Joi.object({
  orderId: Joi.string().required(),
  user: Joi.string().optional(),
  products: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('pending', 'paid', 'cancelled').optional(),
  shippingInfo: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
  }).optional(),
});

const getOrdersSchema = Joi.object({
  user: Joi.string().optional(),
});

router.post('/', authMiddleware, validator.body(postOrderSchema), createOrder);
router.put('/', authMiddleware, validator.body(putOrderSchema), updateOrder);
router.get('/:orderId', authMiddleware, getOrder);
router.get('/', authMiddleware, validator.query(getOrdersSchema), getOrders);

module.exports = router;
