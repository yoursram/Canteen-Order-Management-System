const { getConnection } = require('../config/db');
const OrderModel = require('../models/orderModel');
const OrderItemModel = require('../models/orderItemModel');
const PaymentModel = require('../models/paymentModel');
const MenuModel = require('../models/menuModel');
const ORDER_STATUS = require('../constants/orderStatus');
const { PAYMENT_STATUS } = require('../constants/paymentStatus');

class OrderService {
  /**
   * Atomic Order Creation with MySQL Transaction
   */
  static async createOrder(userId, { pickup_location, payment_method, items }) {
    const connection = await getConnection();

    try {
      await connection.beginTransaction();

      let calculatedSubtotal = 0;
      const verifiedLineItems = [];

      // Fetch actual prices from MySQL and check availability
      for (const item of items) {
        const menuItem = await MenuModel.findById(item.menu_item_id);

        if (!menuItem) {
          throw new Error(`Menu item with ID ${item.menu_item_id} not found`);
        }

        if (!menuItem.is_available) {
          throw new Error(`Item '${menuItem.name}' is currently unavailable`);
        }

        const price = parseFloat(menuItem.price);
        const itemSubtotal = price * item.quantity;
        calculatedSubtotal += itemSubtotal;

        verifiedLineItems.push({
          menu_item_id: menuItem.id,
          quantity: item.quantity,
          price,
          subtotal: itemSubtotal
        });
      }

      // Backend Tax calculation (5% GST for canteen)
      const tax = parseFloat((calculatedSubtotal * 0.05).toFixed(2));
      const total_amount = parseFloat((calculatedSubtotal + tax).toFixed(2));

      const isDigitalPayment = payment_method === 'UPI' || payment_method === 'CARD';
      const initialPaymentStatus = isDigitalPayment ? PAYMENT_STATUS.PAID : PAYMENT_STATUS.PENDING;
      const initialOrderStatus = ORDER_STATUS.PENDING;

      // 1. Create master order
      const orderId = await OrderModel.createOrder(connection, {
        user_id: userId,
        pickup_location,
        subtotal: calculatedSubtotal,
        tax,
        total_amount,
        payment_method,
        payment_status: initialPaymentStatus,
        order_status: initialOrderStatus
      });

      // 2. Create order line items
      for (const lineItem of verifiedLineItems) {
        await OrderItemModel.createOrderItem(connection, {
          order_id: orderId,
          ...lineItem
        });
      }

      // 3. Create payment record
      const transactionId = isDigitalPayment ? `TXN-DEMO-${Date.now().toString().slice(-6)}` : null;
      await PaymentModel.createPayment(connection, {
        order_id: orderId,
        amount: total_amount,
        payment_method,
        transaction_id: transactionId,
        payment_status: initialPaymentStatus
      });

      await connection.commit();

      // Return complete created order
      return await this.getOrderById(orderId, userId);
    } catch (error) {
      await connection.rollback();
      error.statusCode = error.statusCode || 400;
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getOrderById(orderId, userId = null) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    if (userId && order.user_id !== userId) {
      const error = new Error('Not authorized to view this order');
      error.statusCode = 403;
      throw error;
    }

    const items = await OrderItemModel.getItemsByOrderId(orderId);
    const payment = await PaymentModel.findByOrderId(orderId);

    return {
      ...order,
      items,
      payment
    };
  }

  static async getUserOrders(userId) {
    const orders = await OrderModel.getOrdersByUserId(userId);
    const detailedOrders = await Promise.all(
      orders.map(async (ord) => {
        const items = await OrderItemModel.getItemsByOrderId(ord.id);
        return { ...ord, items };
      })
    );
    return detailedOrders;
  }

  static async cancelOrder(orderId, userId) {
    const order = await this.getOrderById(orderId, userId);

    if (order.order_status !== ORDER_STATUS.PENDING && order.order_status !== ORDER_STATUS.CONFIRMED) {
      const error = new Error(`Order cannot be cancelled in '${order.order_status}' status`);
      error.statusCode = 400;
      throw error;
    }

    await OrderModel.updateOrderStatus(orderId, ORDER_STATUS.CANCELLED);
    return await this.getOrderById(orderId, userId);
  }

  static async getAllOrdersAdmin() {
    const orders = await OrderModel.getAllOrders();
    return await Promise.all(
      orders.map(async (ord) => {
        const items = await OrderItemModel.getItemsByOrderId(ord.id);
        const payment = await PaymentModel.findByOrderId(ord.id);
        return { ...ord, items, payment };
      })
    );
  }

  static async updateOrderStatusAdmin(orderId, orderStatus) {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      const error = new Error('Order not found');
      error.statusCode = 404;
      throw error;
    }

    await OrderModel.updateOrderStatus(orderId, orderStatus);

    if (orderStatus === ORDER_STATUS.COMPLETED && order.payment_method === 'CASH') {
      await OrderModel.updatePaymentStatus(orderId, PAYMENT_STATUS.PAID);
    }

    return await this.getOrderById(orderId);
  }
}

module.exports = OrderService;
