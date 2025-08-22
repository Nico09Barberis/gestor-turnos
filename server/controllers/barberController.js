import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const createBarber = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email ya registrado" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newBarber = await User.create({
      name,
      email,
      passwordHash,
      role: "admin", // 👈 importante
    });

    res.status(201).json({ message: "Barbero creado correctamente", barber: newBarber });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getAllBarbers = async (req, res) => {
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



export const updateBarber = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const barber = await User.findById(req.params.id);
    if (!barber) return res.status(404).json({ message: "Barbero no encontrado" });

    if (name) barber.name = name;
    if (email) barber.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      barber.passwordHash = await bcrypt.hash(password, salt);
    }

    await barber.save();
    res.json({ message: "Barbero actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBarber = async (req, res) => {
  try {
    const barber = await User.findByIdAndDelete(req.params.id);
    if (!barber) return res.status(404).json({ message: "Barbero no encontrado" });

    res.json({ message: "Barbero eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

