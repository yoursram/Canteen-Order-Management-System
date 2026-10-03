const MenuModel = require('../models/menuModel');
const CategoryModel = require('../models/categoryModel');

class MenuService {
  static async getMenuItems(filters) {
    return await MenuModel.getAll(filters);
  }

  static async getMenuItemById(id) {
    const item = await MenuModel.findById(id);
    if (!item) {
      const error = new Error('Menu item not found');
      error.statusCode = 404;
      throw error;
    }
    return item;
  }

  static async createMenuItem(data) {
    const category = await CategoryModel.findById(data.category_id);
    if (!category) {
      const error = new Error('Invalid category ID');
      error.statusCode = 400;
      throw error;
    }

    const itemId = await MenuModel.create(data);
    return await MenuModel.findById(itemId);
  }

  static async updateMenuItem(id, data) {
    await this.getMenuItemById(id);
    await MenuModel.update(id, data);
    return await MenuModel.findById(id);
  }

  static async deleteMenuItem(id) {
    await this.getMenuItemById(id);
    await MenuModel.delete(id);
    return true;
  }
}

module.exports = MenuService;
