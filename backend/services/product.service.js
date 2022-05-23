const ProductModel = require('../db/models/product.model');

const createProduct = async (product) => {
  try {
    return await ProductModel.create(product);
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateProduct = async (productId, data) => {
  try {
    return await ProductModel.findByIdAndUpdate(
      productId,
      {
        $set: data,
      },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getProduct = async (productId) => {
  try {
    return await ProductModel.findById(productId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getProducts = async (filter = {}) => {
  console.log('DB', 'getProducts')
  try {
    return await ProductModel.find(filter).populate('category');
  } catch (e) {
    console.log(e)
    throw new Error(e.message);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
};
