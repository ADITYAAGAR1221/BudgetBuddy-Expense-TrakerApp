import express from "express";
import authRoutes from './authRouths.js';
import accountRoutes from "./accountRoutes.js";
import transactionRoutes from "./transactionRoutes.js";
import userRoutes from "./userRoutes.js";
import categoryRoutes from "./categoryRoutes.js"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/transaction", transactionRoutes);
router.use("/category",categoryRoutes);

export default router;