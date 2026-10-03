const OrderService = require('../services/orderService');
const { successResponse } = require('../utils/response');

const createOrder = async (req, res, next) => {
  try {
    const order = await OrderService.createOrder(req.user.id, req.body);
    return successResponse(res, 201, 'Order placed successfully', { order });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getUserOrders(req.user.id);
    return successResponse(res, 200, 'Orders retrieved successfully', { orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await OrderService.getOrderById(req.params.id, req.user.role === 'ADMIN' ? null : req.user.id);
    return successResponse(res, 200, 'Order details retrieved successfully', { order });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (req, res, next) => {
  try {
    const order = await OrderService.cancelOrder(req.params.id, req.user.id);
    return successResponse(res, 200, 'Order cancelled successfully', { order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
};
