const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { pool } = require('../src/config/db');

const clearDatabase = async () => {
  const connection = await pool.getConnection();
  try {
    console.log('[CLEAR] Disabling foreign key checks and clearing database tables...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    await connection.query('TRUNCATE TABLE payments');
    await connection.query('TRUNCATE TABLE order_items');
    await connection.query('TRUNCATE TABLE orders');
    await connection.query('TRUNCATE TABLE menu_items');
    await connection.query('TRUNCATE TABLE categories');
    await connection.query('TRUNCATE TABLE users');

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('[CLEAR SUCCESS] All tables successfully cleared.');
  } catch (error) {
    console.error('[CLEAR ERROR]', error);
  } finally {
    connection.release();
    process.exit();
  }
};

clearDatabase();
