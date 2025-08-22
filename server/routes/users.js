// routes/users.js
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getBarbers, getMyProfile, updateProfile, changePassword } from "../controllers/userController.js";

const router = express.Router();
router.get("/barbers", authMiddleware, getBarbers);
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);
router.put("/me/password", authMiddleware, changePassword);

export default router;
