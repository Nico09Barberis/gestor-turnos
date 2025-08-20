import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // cliente
  barberId: { type: mongoose.Schema.Types.ObjectId, ref: "Barber", required: true }, // peluquero
  date: { type: String, required: true }, // fecha en formato YYYY-MM-DD
  time: { type: String, required: true }, // hora en formato HH:mm
  status: { 
    type: String, 
    enum: ["pending", "completed", "canceled"], 
    default: "pending" 
  } // estado del turno
}, { timestamps: true });

export default mongoose.model("Appointment", appointmentSchema);
