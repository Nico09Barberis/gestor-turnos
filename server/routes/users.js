// routes/users.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getBarbers } from "../controllers/userController.js";

const router = express.Router();
router.get("/barbers", authMiddleware, getBarbers);

export default router;
