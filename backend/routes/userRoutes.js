import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Notice how we pass `protect` as the second argument before the controller.
// This forms the middleware chain!
router.get('/profile', protect, getUserProfile);

export default router;