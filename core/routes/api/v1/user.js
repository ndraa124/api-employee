import express from "express";
import {
  getAllData,
  createData,
  getData,
  updateData,
  deleteData,
} from "../../../src/modules/master_modules/controllers/user";

import { formValidation } from "../../../src/middlewares/validation/user_validate";

const router = express.Router();

router.get("/", getAllData);
router.post("/", formValidation, createData);
router.get("/:id", getData);
router.put("/:id", formValidation, updateData);
router.delete("/:id", deleteData);

export default router;
