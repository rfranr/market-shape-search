export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'BadRequestError';
  }
}

export class NotImplementedError extends AppError {
  constructor(message: string) {
    super(message, 501);
    this.name = 'NotImplementedError';
  }
}
