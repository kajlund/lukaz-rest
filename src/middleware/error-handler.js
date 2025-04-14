import { Codes, Phrases } from "../status.js";
import log from "../logger.js";

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  const error = {
    success: false,
    status: Codes.INTERNAL_SERVER_ERROR,
    message: Phrases.INTERNAL_SERVER_ERROR,
  };

  if (!err.isAppError) {
    log.error(err);
  } else {
    error.message = err.message;
    error.status = err.code;
    error.detail = err.detail;
    error.errors = err.errors;
  }

  return res.status(error.status).json(error);
};
