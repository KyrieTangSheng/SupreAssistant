export class BaseError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class DatabaseError extends BaseError {
  constructor(message: string) {
    super(message, 500);
  }
}

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
} 

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(message, 400);
  }
}