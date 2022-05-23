const CategoryModel = require('../db/models/category.model');

const createCategory = async (category) => {
  try {
    return await CategoryModel.create(category);
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateCategory = async (categoryId, data) => {
  try {
    return await CategoryModel.findByIdAndUpdate(
      categoryId,
      {
        $set: data,
      },
      { new: true }
    );
  } catch (e) {
    throw new Error(e.message);
  }
};

const getCategory = async (categoryId) => {
  console.log('db > getCategory')
  try {
    return await CategoryModel.findById(categoryId);
  } catch (e) {
    throw new Error(e.message);
  }
};

const getCategories = async (filter) => {
  try {
    return await CategoryModel.find(filter);
  } catch (e) {
    throw new Error(e.message);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getCategories,
};
