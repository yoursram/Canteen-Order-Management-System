const PaymentModel = require('../models/paymentModel');
const OrderModel = require('../models/orderModel');

class PaymentService {
  static async getPaymentByOrderId(orderId) {
    return await PaymentModel.findByOrderId(orderId);
  }
}

module.exports = PaymentService;
