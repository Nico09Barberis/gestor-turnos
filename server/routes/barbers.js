import express from "express";
import { createBarber, getBarbers, updateBarber, deleteBarber } from "../controllers/barberController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getBarbers);
router.post("/", authMiddleware, adminMiddleware, createBarber);
router.put("/:id", authMiddleware, adminMiddleware, updateBarber);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBarber);

export default router;
