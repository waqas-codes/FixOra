import express from 'express';
import {
  getWorkers,
  createWorker,
  updateWorker,
  deleteWorker,
} from '../controllers/workerController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect, adminOnly);

router.route('/').get(getWorkers).post(createWorker);
router.route('/:id').put(updateWorker).delete(deleteWorker);

export default router;
