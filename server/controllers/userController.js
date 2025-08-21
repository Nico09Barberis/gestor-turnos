// controllers/usersController.js
import User from "../models/User.js";

export const getBarbers = async (req, res) => {
  try {
    // Log del usuario que hace la petición
    console.log("Headers recibidos:", req.headers);
    console.log("Usuario que accede a /barbers:", req.user);

    // Traer solo usuarios con rol 'admin' (barberos)
    const barbers = await User.find({ role: "admin" }).select("_id name");

    res.json(barbers); // devolver lista de barberos
  } catch (error) {
    console.error("Error al obtener barberos:", error);
    res.status(500).json({ message: error.message });
  }
};
