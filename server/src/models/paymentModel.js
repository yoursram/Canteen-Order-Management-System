const { query } = require('../config/db');

class PaymentModel {
  static async createPayment(connection, { order_id, amount, payment_method, transaction_id, payment_status }) {
    const [result] = await connection.query(
      `INSERT INTO payments (order_id, amount, payment_method, transaction_id, payment_status)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, amount, payment_method, transaction_id, payment_status]
    );
    return result.insertId;
  }

  static async findByOrderId(order_id) {
    const rows = await query('SELECT * FROM payments WHERE order_id = ?', [order_id]);
    return rows[0] || null;
  }
}

module.exports = PaymentModel;
