// routes/users.js
import express from "express";
import { getBarbers } from "../controllers/usersController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/barbers", authMiddleware, adminMiddleware, getBarbers);

export default router;
