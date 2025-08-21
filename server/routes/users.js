// routes/users.js
import express from "express";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";
import { getBarbers } from "../controllers/userController.js";

const router = express.Router();
router.get("/barbers", authMiddleware, adminMiddleware, getBarbers);

export default router;
