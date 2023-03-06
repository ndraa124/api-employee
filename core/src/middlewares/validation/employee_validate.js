import joi from "joi";
import { _error } from "../../utils/status";

export function formValidation(req, res, next) {
  const schema = joi.object().keys({
    name: joi.string().max(50).required().label("name"),
    gender: joi.string().required().label("gender"),
    place_of_birth: joi.string().required().label("place of birth"),
    date_of_birth: joi.string().required().label("date of birth"),
    status: joi.string().required().label("married status"),
    address: joi.string().required().label("address"),
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
