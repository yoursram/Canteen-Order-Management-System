const CategoryModel = require('../models/categoryModel');
const { successResponse } = require('../utils/response');

const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.getAll();
    return successResponse(res, 200, 'Categories retrieved successfully', { categories });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const categoryId = await CategoryModel.create(name, description);
    const category = await CategoryModel.findById(categoryId);
    return successResponse(res, 201, 'Category created successfully', { category });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    await CategoryModel.update(req.params.id, name, description);
    const category = await CategoryModel.findById(req.params.id);
    return successResponse(res, 200, 'Category updated successfully', { category });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await CategoryModel.delete(req.params.id);
    return successResponse(res, 200, 'Category deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
