// controllers/usersController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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


// Obtener perfil del usuario logueado
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar datos del perfil (nombre, email)
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Cambiar contraseña
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Contraseña actual incorrecta" });

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

