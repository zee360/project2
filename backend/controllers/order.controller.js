const orderService = require('../services/order.service');
const productsService = require('../services/product.service');

const createOrder = async (req, res) => {
  const data = req.body;
  try {
    const productIds = data.products.map(({ product }) => product);
    const products = await productsService.getProducts({
      _id: { $in: productIds },
    });
    const totalPrice = products.reduce((acc, product) => {
      const quantity = data.products.find(
        ({ product: productId }) => productId === product._id.toString()
      ).quantity;
      return acc + product.price * quantity;
    }, 0);

    data.totalPrice = totalPrice;

    const order = await orderService.createOrder(data);
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const updateOrder = async (req, res) => {
  console.log('updateOrder')
  const { orderId, ...data } = req.body;
  try {
    console.log(data)
    if ('products' in data) {
      const productIds = data.products.map(({ product }) => product);
      const products = await productsService.getProducts({
        _id: { $in: productIds },
      });
      const totalPrice = products.reduce((acc, product) => {
        const quantity = data.products.find(
          ({ product: productId }) => productId === product._id.toString()
        ).quantity;
        return acc + product.price * quantity;
      }, 0);
      data.totalPrice = totalPrice;
    }
    const order = await orderService.updateOrder(orderId, data);
    if (order) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.getOrder(orderId);
    if (order && order.isActive) {
      res.json(order);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders({ isActive: true });
    if (orders.length > 0) {
      res.json(orders);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
  getOrders,
};
