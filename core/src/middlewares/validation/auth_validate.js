import joi from "joi";
import { _error } from "../../utils/status";

export function registerValidation(req, res, next) {
  const schema = joi.object().keys({
    username: joi.string().max(25).required().label("username"),
    password: joi.string().max(50).required().label("password"),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    escapeHtml: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const message = error.details.map((i) => i.message);

    _error({
      code: 400,
      response: res,
      message: "invalid request",
      details: message,
    });
  } else {
    req.body = value;
    next();
  }
}

export function loginValidation(req, res, next) {
  const schema = joi.object().keys({
    username: joi.string().required().label("username"),
    password: joi.string().required().label("password"),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
    escapeHtml: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    const message = error.details.map((i) => i.message);

    _error({
      code: 400,
      response: res,
      message: "invalid request",
      details: message,
    });
  } else {
    req.body = value;
    next();
  }
}
