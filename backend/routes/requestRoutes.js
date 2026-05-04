const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getAllRequests,
  updateStatus,
  assignWorker,
  addReview,
} = require('../controllers/requestController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createRequest)
  .get(protect, authorizeRoles('admin'), getAllRequests);

router.get('/my', protect, getUserRequests);

router.put('/:id/status', protect, authorizeRoles('admin'), updateStatus);
router.put('/:id/assign', protect, authorizeRoles('admin'), assignWorker);
router.put('/:id/review', protect, addReview);

module.exports = router;
