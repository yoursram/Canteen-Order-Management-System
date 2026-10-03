const express = require('express');
const router = express.Router();
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder
} = require('../controllers/orderController');
const { createOrderValidation } = require('../validators/orderValidator');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // All order routes require login

router.post('/', createOrderValidation, createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);
router.put('/:id/cancel', cancelOrder);

module.exports = router;
