import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { AppError } from './errors.js';

export interface ErrorResponseBody {
  error: string;
  message: string;
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _req: Request,
  res: Response<ErrorResponseBody>,
  _next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.name,
      message: error.message
    });
    return;
  }

  res.status(500).json({
    error: 'InternalServerError',
    message: 'Internal server error'
  });
};
