const { query } = require('../config/db');

class OrderModel {
  static async createOrder(connection, { user_id, pickup_location, subtotal, tax, total_amount, payment_method, payment_status, order_status }) {
    const [result] = await connection.query(
      `INSERT INTO orders (user_id, pickup_location, subtotal, tax, total_amount, payment_method, payment_status, order_status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_id, pickup_location, subtotal, tax, total_amount, payment_method, payment_status, order_status]
    );
    return result.insertId;
  }

  static async findById(id) {
    const rows = await query(
      `SELECT o.*, u.name as user_name, u.email as user_email, u.phone as user_phone, 
              u.student_id, u.department, u.year, u.section
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [id]
    );
    return rows[0] || null;
  }

  static async getOrdersByUserId(user_id) {
    return await query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [user_id]
    );
  }

  static async getAllOrders() {
    return await query(
      `SELECT o.*, u.name as user_name, u.student_id, u.department
       FROM orders o
       JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
  }

  static async updateOrderStatus(id, order_status) {
    await query('UPDATE orders SET order_status = ? WHERE id = ?', [order_status, id]);
    return true;
  }

  static async updatePaymentStatus(id, payment_status) {
    await query('UPDATE orders SET payment_status = ? WHERE id = ?', [payment_status, id]);
    return true;
  }
}

module.exports = OrderModel;
