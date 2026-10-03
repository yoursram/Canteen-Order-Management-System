const { query } = require('../config/db');

class DashboardService {
  static async getDashboardStats() {
    const [[{ total_orders }]] = await query('SELECT COUNT(*) as total_orders FROM orders');
    const [[{ todays_orders }]] = await query('SELECT COUNT(*) as todays_orders FROM orders WHERE DATE(created_at) = CURRENT_DATE()');
    const [[{ total_revenue }]] = await query("SELECT COALESCE(SUM(total_amount), 0) as total_revenue FROM orders WHERE payment_status = 'PAID'");
    const [[{ pending_orders }]] = await query("SELECT COUNT(*) as pending_orders FROM orders WHERE order_status IN ('PENDING', 'CONFIRMED', 'PREPARING')");
    const [[{ completed_orders }]] = await query("SELECT COUNT(*) as completed_orders FROM orders WHERE order_status = 'COMPLETED'");
    const [[{ total_students }]] = await query("SELECT COUNT(*) as total_students FROM users WHERE role = 'CUSTOMER'");
    const [[{ available_menu_items }]] = await query('SELECT COUNT(*) as available_menu_items FROM menu_items WHERE is_available = 1');

    // Popular food items
    const popularItems = await query(`
      SELECT m.id, m.name, m.image_url, m.price, COUNT(oi.id) as order_count, SUM(oi.quantity) as total_quantity_sold
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      GROUP BY m.id
      ORDER BY total_quantity_sold DESC
      LIMIT 5
    `);

    // Sales by Category
    const salesByCategory = await query(`
      SELECT c.name as category_name, COUNT(oi.id) as total_items_sold, SUM(oi.subtotal) as category_revenue
      FROM order_items oi
      JOIN menu_items m ON oi.menu_item_id = m.id
      JOIN categories c ON m.category_id = c.id
      GROUP BY c.id
      ORDER BY category_revenue DESC
    `);

    // Status distribution
    const statusDistribution = await query(`
      SELECT order_status, COUNT(*) as count
      FROM orders
      GROUP BY order_status
    `);

    return {
      stats: {
        total_orders,
        todays_orders,
        total_revenue: parseFloat(total_revenue),
        pending_orders,
        completed_orders,
        total_students,
        available_menu_items
      },
      popularItems,
      salesByCategory,
      statusDistribution
    };
  }
}

module.exports = DashboardService;
