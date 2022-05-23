const OrderModel = require('../db/models/order.model');

const createOrder = async (order) => {
  try {
    return await OrderModel.create(order);
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateOrder = async (orderId, data) => {
  try {
    return await OrderModel.findByIdAndUpdate(
      orderId,
      {
        $set: data,
      },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getOrder = async (orderId) => {
  try {
    return await OrderModel.findById(orderId).populate('products.product').populate('products.product').populate('user');
  } catch (e) {
    throw new Error(e.message);
  }
};

const getOrders = async (filter) => {
  try {
    return await OrderModel.find(filter);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  getOrders,
};
