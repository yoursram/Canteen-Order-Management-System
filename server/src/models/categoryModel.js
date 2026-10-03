const { query } = require('../config/db');

class CategoryModel {
  static async getAll() {
    return await query('SELECT * FROM categories ORDER BY id ASC');
  }

  static async findById(id) {
    const rows = await query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0] || null;
  }

  static async create(name, description) {
    const result = await query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description]
    );
    return result.insertId;
  }

  static async update(id, name, description) {
    await query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description, id]
    );
    return true;
  }

  static async delete(id) {
    await query('DELETE FROM categories WHERE id = ?', [id]);
    return true;
  }
}

module.exports = CategoryModel;
