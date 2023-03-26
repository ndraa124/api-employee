import bcrypt from "bcrypt";
import { _error } from "../utils/status";

export function hashPassword(req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (!err) {
      req.body.password = hash;
      next();
    } else {
      _error({
        response: res,
        message: err,
      });
    }
  });
}
