const { query } = require('../config/db');

class MenuModel {
  static async getAll({ category, available, search }) {
    let sql = `
      SELECT m.*, c.name as category_name 
      FROM menu_items m
      LEFT JOIN categories c ON m.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      sql += ' AND (c.name = ? OR m.category_id = ?)';
      params.push(category, category);
    }

    if (available !== undefined && available !== null) {
      sql += ' AND m.is_available = ?';
      params.push(available === 'true' || available === true ? 1 : 0);
    }

    if (search) {
      sql += ' AND (m.name LIKE ? OR m.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY m.category_id ASC, m.name ASC';

    return await query(sql, params);
  }

  static async findById(id) {
    const rows = await query(
      `SELECT m.*, c.name as category_name 
       FROM menu_items m 
       LEFT JOIN categories c ON m.category_id = c.id 
       WHERE m.id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async create(itemData) {
    const {
      category_id,
      name,
      description,
      price,
      image_url,
      canteen_location = 'Main Canteen',
      preparation_time = 15,
      is_available = true
    } = itemData;

    const result = await query(
      `INSERT INTO menu_items (category_id, name, description, price, image_url, canteen_location, preparation_time, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [category_id, name, description, price, image_url, canteen_location, preparation_time, is_available ? 1 : 0]
    );
    return result.insertId;
  }

  static async update(id, itemData) {
    const {
      category_id,
      name,
      description,
      price,
      image_url,
      canteen_location,
      preparation_time,
      is_available
    } = itemData;

    await query(
      `UPDATE menu_items 
       SET category_id = ?, name = ?, description = ?, price = ?, image_url = ?, canteen_location = ?, preparation_time = ?, is_available = ?
       WHERE id = ?`,
      [category_id, name, description, price, image_url, canteen_location, preparation_time, is_available ? 1 : 0, id]
    );
    return true;
  }

  static async delete(id) {
    await query('DELETE FROM menu_items WHERE id = ?', [id]);
    return true;
  }
}

module.exports = MenuModel;
