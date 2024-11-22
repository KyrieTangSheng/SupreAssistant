import jwt from 'jsonwebtoken';
import { config } from '../config/env.config';

export const generateToken = (payload: { userId: string }): string => {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn
  });
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, config.jwtSecret) as { userId: string };
}; 