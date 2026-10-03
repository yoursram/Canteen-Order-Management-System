const OrderService = require('../services/orderService');
const DashboardService = require('../services/dashboardService');
const { successResponse } = require('../utils/response');

const getDashboardStats = async (req, res, next) => {
  try {
    const data = await DashboardService.getDashboardStats();
    return successResponse(res, 200, 'Dashboard statistics retrieved successfully', data);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderService.getAllOrdersAdmin();
    return successResponse(res, 200, 'All orders retrieved successfully', { orders });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const { order_status } = req.body;
    const order = await OrderService.updateOrderStatusAdmin(req.params.id, order_status);
    return successResponse(res, 200, `Order status updated to '${order_status}'`, { order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus
};
