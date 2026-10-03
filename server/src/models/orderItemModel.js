const { query } = require('../config/db');

class OrderItemModel {
  static async createOrderItem(connection, { order_id, menu_item_id, quantity, price, subtotal }) {
    await connection.query(
      `INSERT INTO order_items (order_id, menu_item_id, quantity, price, subtotal)
       VALUES (?, ?, ?, ?, ?)`,
      [order_id, menu_item_id, quantity, price, subtotal]
    );
  }

  static async getItemsByOrderId(order_id) {
    return await query(
      `SELECT oi.*, m.name as menu_item_name, m.image_url, m.preparation_time
       FROM order_items oi
       JOIN menu_items m ON oi.menu_item_id = m.id
       WHERE oi.order_id = ?`,
      [order_id]
    );
  }
}

module.exports = OrderItemModel;
