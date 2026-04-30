import express from 'express';
import {
  getServiceRequests,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  getStats,
} from '../controllers/serviceRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/stats', getStats);
router.route('/').get(getServiceRequests).post(createServiceRequest);
router.route('/:id').put(updateServiceRequest).delete(deleteServiceRequest);

export default router;
