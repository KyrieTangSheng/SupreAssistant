import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router({ mergeParams: true });
// router.use('/api/auth', authMiddleware); // don't need middleware for these auth routes

const authController = new AuthController();

// Public routes (no auth middleware needed)
router.post('/register', authController.register);
router.post('/login', authController.login);

// Optional: Additional auth-related routes TODO:
// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);
// router.post('/refresh-token', authController.refreshToken);

export default router; 