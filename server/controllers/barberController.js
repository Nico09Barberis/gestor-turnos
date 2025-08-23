import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const createBarber = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // validar datos mínimos
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // verificar si ya existe
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // crear usuario con rol admin (barber)
    const barber = new User({
      name,
      email,
      passwordHash,
      role: "admin",
    });

    await barber.save();

    res.status(201).json({ message: "Barbero creado correctamente", barber });
  } catch (err) {
    res.status(500).json({ message: "Error al crear barbero", error: err.message });
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


// Obtener turnos del barbero logueado (con filtro opcional por fecha)
export const getBarberAppointments = async (req, res) => {
  try {
    const { date } = req.query; // ?date=YYYY-MM-DD
    const query = { barberId: req.user.id }; // barbero logueado

    if (date) {
      query.date = date;
    }

    const appointments = await Appointment.find(query)
      .populate("clientId", "name email") // trae info del cliente
      .sort("time");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ----------- PERFIL DEL BARBERO (se reutiliza el mismo controller) -----------

// Obtener perfil del barbero logueado
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar perfil del barbero
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();
    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cambiar contraseña del barbero
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    if (user.role !== "admin") {
      return res.status(403).json({ message: "No autorizado" });
    }

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