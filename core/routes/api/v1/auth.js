import express from "express";
import {
  register,
  login,
} from "../../../src/modules/master_modules/controllers/auth";

import {
  registerValidation,
  loginValidation,
} from "../../../src/middlewares/validation/auth_validate";

import { hashPassword } from "../../../src/middlewares/encrypt";

const router = express.Router();

router.post("/register", registerValidation, hashPassword, register);
router.post("/login", loginValidation, login);

export default router;
