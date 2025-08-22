import express from "express";
import { createAppointment, getAppointmentsByBarberAndDate, getMyAppointments, getAllAppointments, updateStatus, cancelAppointment } from "../controllers/appointmentController.js";
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createAppointment);
router.get("/my", authMiddleware, getMyAppointments);
router.get("/all", authMiddleware, adminMiddleware, getAllAppointments);
router.get("/barber", authMiddleware, getAppointmentsByBarberAndDate);
router.put("/:id/status", authMiddleware, adminMiddleware, updateStatus);
router.delete("/:id", authMiddleware, cancelAppointment);

export default router;
