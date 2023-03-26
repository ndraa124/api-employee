import bcrypt from "bcrypt";

import { createUser, getAllUsername, getUsername } from "../models/user_model";
import { _payloadLogin } from "../../../utils/helper";
import { _success, _error } from "../../../utils/status";

export async function register(req, res, _next) {
  const { username } = req.body;

  try {
    const checkUsername = await getAllUsername(username);

    if (checkUsername.length < 1) {
      await createUser(req.body)
        .then((result) => {
          if (result) {
            _success({
              code: 201,
              response: res,
              message: "success to register",
            });
          } else {
            _error({
              code: 400,
              response: res,
              message: "fail to register",
            });
          }
        })
        .catch((err) => {
          _error({
            code: 500,
            response: res,
            message: err,
          });
        });
    } else {
      _error({
        code: 400,
        response: res,
        message: "username has been used",
      });
    }
  } catch (err) {
    _error({
      code: 500,
      response: res,
      message: err,
    });
  }
}

export async function login(req, res, _next) {
  const { username, password } = req.body;

  try {
    const hasData = await getUsername(username);

    if (hasData) {
      const data = hasData.dataValues;
      const isMatch = bcrypt.compareSync(password, data.password);

      if (isMatch) {
        const payload = _payloadLogin(data);

        _success({
          code: 200,
          response: res,
          message: "login success",
          data: payload,
        });
      } else {
        _error({
          code: 400,
          response: res,
          message: "username or password is wrong",
        });
      }
    } else {
      _error({
        code: 400,
        response: res,
        message: "username or password is wrong",
      });
    }
  } catch (err) {
    _error({
      code: 500,
      response: res,
      message: err,
    });
  }
}
