const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const data = req.body;
  try {
    const product = await categoryService.createCategory(data);
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

const updateCategory = async (req, res) => {
  const { categoryId, ...data } = req.body;
  try {
    const category = await categoryService.updateCategory(categoryId, data);
    if (category) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getCategory = async (req, res) => {
  console.log(req.params)
  const { categoryId } = req.params;
  try {
    const category = await categoryService.getCategory(categoryId);
    if (category && category.isActive) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
  }
};

const getCategories = async (req, res) => {
  try {
    const products = await categoryService.getCategories({ isActive: true });
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
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
};
