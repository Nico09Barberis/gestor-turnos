import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // nombre del usuario
  email: { type: String, required: true, unique: true }, // email
  passwordHash: { type: String, required: true }, // contraseña encriptada
  role: { type: String, enum: ["client", "admin"], default: "client" } // rol del usuario
}, { timestamps: true });

export default mongoose.model("User", userSchema);
