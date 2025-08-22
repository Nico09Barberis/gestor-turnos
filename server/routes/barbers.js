import express from "express";
import { createBarber, getAllBarbers, deleteBarber, getMyProfile, updateProfile, changePassword } from "../controllers/barberController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllBarbers);
router.post("/", authMiddleware, adminMiddleware, createBarber);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBarber);

// Barbero: su propio perfil
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);
router.put("/me/change-password", authMiddleware, changePassword);

export default router;
