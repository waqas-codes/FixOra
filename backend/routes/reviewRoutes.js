import express from 'express';
import {
  createReview,
  getReviews,
  checkReviewStatus,
} from '../controllers/reviewController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getReviews)
  .post(createReview);

router.get('/check/:requestId', checkReviewStatus);

export default router;
