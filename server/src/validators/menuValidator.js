const { body, validationResult } = require('express-validator');
const { errorResponse } = require('../utils/response');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, 'Validation Error', errors.array());
  }
  next();
};

const menuValidation = [
  body('name').trim().notEmpty().withMessage('Food item name is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
  body('category_id').isInt().withMessage('Valid category ID is required'),
  body('preparation_time').optional().isInt({ gt: 0 }).withMessage('Preparation time must be positive'),
  handleValidationErrors
];

module.exports = {
  menuValidation
};
