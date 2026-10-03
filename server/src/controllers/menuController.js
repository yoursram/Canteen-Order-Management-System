const MenuService = require('../services/menuService');
const { successResponse } = require('../utils/response');

const getMenuItems = async (req, res, next) => {
  try {
    const { category, available, search } = req.query;
    const menuItems = await MenuService.getMenuItems({ category, available, search });
    return successResponse(res, 200, 'Menu items retrieved successfully', { menuItems });
  } catch (error) {
    next(error);
  }
};

const getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await MenuService.getMenuItemById(req.params.id);
    return successResponse(res, 200, 'Menu item retrieved successfully', { menuItem });
  } catch (error) {
    next(error);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuService.createMenuItem(req.body);
    return successResponse(res, 201, 'Menu item created successfully', { menuItem });
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuService.updateMenuItem(req.params.id, req.body);
    return successResponse(res, 200, 'Menu item updated successfully', { menuItem });
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    await MenuService.deleteMenuItem(req.params.id);
    return successResponse(res, 200, 'Menu item deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
