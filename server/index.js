import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import barberRoutes from "./routes/barbers.js";
import appointmentRoutes from "./routes/appointments.js";
import userRoutes from "./routes/users.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));


app.use("/api/auth", authRoutes);
app.use("/api/admin/barbers", barberRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);


// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
