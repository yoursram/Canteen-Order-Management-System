const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { pool } = require('../src/config/db');

const loadJSON = (filename) => {
  const filePath = path.join(__dirname, '../data', filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const seedDatabase = async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log('[SEED] Starting MySQL Database Seeding Process...');

    // 1. Execute schema.sql to ensure table structures exist
    const schemaPath = path.join(__dirname, '../../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('[SEED] Ensuring database schema and tables exist...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      for (const statement of statements) {
        await connection.query(statement);
      }
    }

    // Disable FK checks during insertion
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');

    // Clear existing data
    await connection.query('TRUNCATE TABLE payments');
    await connection.query('TRUNCATE TABLE order_items');
    await connection.query('TRUNCATE TABLE orders');
    await connection.query('TRUNCATE TABLE menu_items');
    await connection.query('TRUNCATE TABLE categories');
    await connection.query('TRUNCATE TABLE users');

    // 2. Seed Categories
    const categories = loadJSON('categories.json');
    console.log(`[SEED] Seeding ${categories.length} food categories...`);
    for (const cat of categories) {
      await connection.query(
        'INSERT INTO categories (id, name, description) VALUES (?, ?, ?)',
        [cat.id, cat.name, cat.description]
      );
    }

    // 3. Seed Users (Hash Passwords with bcrypt)
    const users = loadJSON('users.json');
    console.log(`[SEED] Seeding ${users.length} users with hashed passwords...`);
    const saltRounds = 10;
    for (const u of users) {
      const hashedPassword = await bcrypt.hash(u.password, saltRounds);
      await connection.query(
        `INSERT INTO users (id, name, email, password, phone, student_id, department, year, section, role)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          u.id,
          u.name,
          u.email,
          hashedPassword,
          u.phone,
          u.student_id || null,
          u.department || null,
          u.year || null,
          u.section || null,
          u.role
        ]
      );
    }

    // 4. Seed Menu Items
    const menuItems = loadJSON('menuItems.json');
    console.log(`[SEED] Seeding ${menuItems.length} menu items...`);
    for (const item of menuItems) {
      await connection.query(
        `INSERT INTO menu_items 
         (id, category_id, name, description, price, image_url, canteen_location, preparation_time, is_available)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.id,
          item.category_id,
          item.name,
          item.description,
          item.price,
          item.image_url,
          item.canteen_location,
          item.preparation_time,
          item.is_available
        ]
      );
    }

    // 5. Seed Orders & Order Items
    const orders = loadJSON('orders.json');
    console.log(`[SEED] Seeding ${orders.length} orders & line items...`);
    for (const ord of orders) {
      await connection.query(
        `INSERT INTO orders 
         (id, user_id, pickup_location, subtotal, tax, total_amount, payment_method, payment_status, order_status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          ord.id,
          ord.user_id,
          ord.pickup_location,
          ord.subtotal,
          ord.tax,
          ord.total_amount,
          ord.payment_method,
          ord.payment_status,
          ord.order_status,
          ord.created_at ? new Date(ord.created_at) : new Date()
        ]
      );

      if (ord.items && ord.items.length > 0) {
        for (const lineItem of ord.items) {
          await connection.query(
            `INSERT INTO order_items (order_id, menu_item_id, quantity, price, subtotal)
             VALUES (?, ?, ?, ?, ?)`,
            [ord.id, lineItem.menu_item_id, lineItem.quantity, lineItem.price, lineItem.subtotal]
          );
        }
      }
    }

    // 6. Seed Payments
    const payments = loadJSON('payments.json');
    console.log(`[SEED] Seeding ${payments.length} payment records...`);
    for (const p of payments) {
      await connection.query(
        `INSERT INTO payments (id, order_id, amount, payment_method, transaction_id, payment_status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          p.id,
          p.order_id,
          p.amount,
          p.payment_method,
          p.transaction_id,
          p.payment_status,
          p.created_at ? new Date(p.created_at) : new Date()
        ]
      );
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('[SEED SUCCESS] Database seeding completed successfully!');
  } catch (error) {
    console.error('[SEED ERROR] Seeding failed:', error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

seedDatabase();
