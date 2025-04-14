import { Codes, Phrases } from "./status.js";

export class AppError extends Error {
  constructor(message = Phrases.INTERNAL_SERVER_ERROR, code = Codes.INTERNAL_SERVER_ERROR, detail = "") {
    super(message);
    this.name = this.constructor.name;
    this.isAppError = true;
    this.code = code;
    this.detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UnauthorizedError extends AppError {
  constructor(detail = "") {
    super(Phrases.UNAUTHORIZED, Codes.UNAUTHORIZED, detail);
  }
}

export class BadRequestError extends AppError {
  constructor(errors = null) {
    super(Phrases.BAD_REQUEST, Codes.BAD_REQUEST, errors);
  }
}

export class NotFoundError extends AppError {
  constructor(detail = "") {
    super(Phrases.NOT_FOUND, Codes.NOT_FOUND, detail);
  }
}

export class InternalServerError extends AppError {
  constructor(detail = "") {
    super(Phrases.INTERNAL_SERVER_ERROR, Codes.INTERNAL_SERVER_ERROR, detail);
  }
}
