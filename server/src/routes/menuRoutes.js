const express = require('express');
const router = express.Router();
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { menuValidation } = require('../validators/menuValidator');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

// Admin-only endpoints
router.post('/', protect, authorize('ADMIN'), menuValidation, createMenuItem);
router.put('/:id', protect, authorize('ADMIN'), menuValidation, updateMenuItem);
router.delete('/:id', protect, authorize('ADMIN'), deleteMenuItem);

module.exports = router;
