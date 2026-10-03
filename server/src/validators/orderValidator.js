const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'Validation Error', errors.array());
  }
  next();
};

const createOrderValidation = [
  body('pickup_location').notEmpty().withMessage('Pickup location is required'),
  body('payment_method').isIn(['CASH', 'UPI', 'CARD']).withMessage('Valid payment method is required'),
  body('items').isArray({ min: 1 }).withMessage('Cart must contain at least one item'),
  body('items.*.menu_item_id').isInt().withMessage('Valid menu item ID required'),
  body('items.*.quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  handleValidationErrors
];

module.exports = {
  createOrderValidation
};
