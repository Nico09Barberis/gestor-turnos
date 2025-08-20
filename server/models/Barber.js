import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true } // nombre del peluquero
}, { timestamps: true });

export default mongoose.model("Barber", barberSchema);
