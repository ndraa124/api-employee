import express from "express";
import {
  getAllData,
  getData,
  updateData,
  deleteData,
} from "../../../src/modules/master_modules/controllers/user";

import { formValidation } from "../../../src/middlewares/validation/user_validate";
import { authorization } from "../../../src/middlewares/auth";

const router = express.Router();

router.get("/", authorization, getAllData);
router.get("/:id", authorization, getData);
router.put("/:id", authorization, formValidation, updateData);
router.delete("/:id", authorization, deleteData);

export default router;
