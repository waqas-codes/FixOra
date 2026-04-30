import express from 'express';
import { getAllServices, createService, updateService, deleteService } from '../controllers/serviceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAllServices)
  .post(protect, adminOnly, createService);

router.route('/:id')
  .put(protect, adminOnly, updateService)
  .delete(protect, adminOnly, deleteService);

export default router;
