import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { validateRegistration, validateLogin } from '../utils/validation.util';

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validationError = validateRegistration(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const response = await authService.register(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validationError = validateLogin(req.body);
      if (validationError) {
        return res.status(400).json({ error: validationError });
      }

      const response = await authService.login(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
} 