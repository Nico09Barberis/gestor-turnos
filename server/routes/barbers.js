import express from "express";
import { createBarber, getAllBarbers, updateBarber, deleteBarber } from "../controllers/barberController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllBarbers);
router.post("/", authMiddleware, adminMiddleware, createBarber);
router.put("/:id", authMiddleware, adminMiddleware, updateBarber);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBarber);

export default router;
