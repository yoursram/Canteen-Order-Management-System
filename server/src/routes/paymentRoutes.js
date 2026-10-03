const express = require('express');
const router = express.Router();
const { getPaymentByOrderId } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.get('/order/:orderId', protect, getPaymentByOrderId);

module.exports = router;
