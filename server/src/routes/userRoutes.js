const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, authorize('ADMIN'), getAllUsers);

module.exports = router;
