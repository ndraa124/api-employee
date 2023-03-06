import express from "express";
import EmployeeRoutes from "../routes/api/v1/employee";

const router = express.Router();

router.use("/v1/employee", EmployeeRoutes);

export default router;
