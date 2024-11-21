import { Router } from 'express';
import { CompanionController } from '../controllers/companion.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();
const controller = new CompanionController();

// Apply auth middleware to all companion routes
router.use(authMiddleware);

// Chat endpoints
router.post('/chat', controller.chat);
router.get('/history', controller.getChatHistory);

// Companion management
router.patch('/settings', controller.updateCompanion);

export default router; 