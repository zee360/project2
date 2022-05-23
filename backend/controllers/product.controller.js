const productService = require('../services/product.service');

const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const product = await productService.createProduct(data);
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const updateProduct = async (req, res) => {
  const { productId, ...data } = req.body;
  try {
    const product = await productService.updateProduct(productId, data);
    if (product) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await productService.getProduct(productId);
    if (product && product.isActive) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getProducts = async (req, res) => {
  try {
    const filter = {
      isActive: true,
    }
    if(req.query.categoryId) {
      filter.category = req.query.categoryId
    }
    const products = await productService.getProducts(filter);
    if (products.length > 0) {
      res.json(products);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
};
