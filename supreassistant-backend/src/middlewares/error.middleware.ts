import { Request, Response, NextFunction } from 'express';
import { BaseError } from '../utils/errors';

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      error: error.message
    });
  }

  console.error('Unhandled error:', error);
  return res.status(500).json({
    error: 'Internal server error'
  });
}; 