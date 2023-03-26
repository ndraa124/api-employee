import Logger from "./logger";
import dotenv from "dotenv";
dotenv.config();

export function _success(status) {
  status.response.status(status.code).send({
    success: true,
    message: status.message,
    data: status.data,
    totalPages: status.totalPages,
  });
}

export function _error(status) {
  let code, message;
  if (status.message !== undefined) {
    code = status.code;
    message = status.message;
  } else {
    code = 400;
    message = "Invalid request";
  }

  if (process.env.NODE_ENV !== "production") {
    Logger.error(message);
  }

  status.response.status(code).send({
    success: false,
    message: message,
    errors: status.details,
  });
}
