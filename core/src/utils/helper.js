import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export function _marriedStatus(value) {
  if (value == 0) {
    return "Married";
  } else {
    return "Single";
  }
}

export function _genderStatus(value) {
  if (value == 0) {
    return "Male";
  } else {
    return "Female";
  }
}

export function _payloadLogin(data) {
  let payLoad;

  payLoad = {
    id: data.id,
    username: data.username,
  };

  const token = jwt.sign(payLoad, process.env.JWT_AUTHENTICATE_KEY, {
    expiresIn: "7d",
  });

  return (payLoad = { ...payLoad, token });
}
