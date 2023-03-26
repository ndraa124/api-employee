import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { _error } from "../utils/status";

dotenv.config();

export function authorization(req, res, next) {
  let token = req.headers.authorization;

  if (token) {
    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_AUTHENTICATE_KEY, (err, _data) => {
      if (err && err.name === "JsonWebTokenError") {
        _error({
          code: 400,
          response: res,
          message: err.message,
        });
      } else if (err && err.name === "TokenExpiredError") {
        _error({
          code: 401,
          response: res,
          message: err.message,
        });
      } else {
        next();
      }
    });
  } else {
    _error({
      code: 403,
      response: res,
      message: "you don't have permission to access!",
    });
  }
}
