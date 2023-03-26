import express from "express";
import EmployeeRoutes from "../routes/api/v1/employee";
import UserRoutes from "../routes/api/v1/user";
import AuthRoutes from "../routes/api/v1/auth";

const router = express.Router();

router.use("/v1/employee", EmployeeRoutes);
router.use("/v1/user", UserRoutes);
router.use("/v1/auth", AuthRoutes);

export default router;
