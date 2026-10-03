const { query } = require('../config/db');

class UserModel {
  static async findByEmail(email) {
    const rows = await query('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);
    return rows[0] || null;
  }

  static async findById(id) {
    const rows = await query(
      'SELECT id, name, email, phone, student_id, department, year, section, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0] || null;
  }

  static async create(userData) {
    const {
      name,
      email,
      password,
      phone,
      student_id,
      department,
      year,
      section,
      role = 'CUSTOMER'
    } = userData;

    const result = await query(
      `INSERT INTO users (name, email, password, phone, student_id, department, year, section, role)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, password, phone, student_id || null, department || null, year || null, section || null, role]
    );

    return result.insertId;
  }

  static async getAllUsers() {
    return await query(
      'SELECT id, name, email, phone, student_id, department, year, section, role, created_at FROM users ORDER BY id DESC'
    );
  }
}

module.exports = UserModel;
