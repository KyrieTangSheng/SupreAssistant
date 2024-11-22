import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';
import { AuthenticationError } from '../utils/errors';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecret) as { userId: string };
    
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    next(new AuthenticationError('Invalid token'));
  }
}; 