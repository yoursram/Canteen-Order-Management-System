const PaymentService = require('../services/paymentService');
const { successResponse } = require('../utils/response');

const getPaymentByOrderId = async (req, res, next) => {
  try {
    const payment = await PaymentService.getPaymentByOrderId(req.params.orderId);
    return successResponse(res, 200, 'Payment details retrieved', { payment });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPaymentByOrderId
};
