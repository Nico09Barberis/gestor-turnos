import Appointment from "../models/Appointment.js";

// Crear turno
export const createAppointment = async (req, res) => {
  try {
    const { barberId, date, time } = req.body;

    // verificar que no exista turno pendiente para ese barber en ese horario
    const exists = await Appointment.findOne({ barberId, date, time, status: "pending" });
    if (exists) return res.status(400).json({ message: "Slot not available" });

    const appointment = new Appointment({
      clientId: req.user.id,
      barberId,
      date,
      time,
      status: "pending",
    });
    await appointment.save();

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Ver mis turnos (client)
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ clientId: req.user.id }).populate("barberId", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ver todos los turnos (admin)
export const getAllAppointments = async (req, res) => {
  try {
    const query = {};

    // Filtrar por fecha si viene en query
    if (req.query.date) query.date = req.query.date;

    // Si el usuario es barbero, que solo vea sus turnos
    if (req.user.role === "admin") {
      query.barberId = req.user.id;
    }

    const appointments = await Appointment.find(query)
      .populate("clientId", "name email")
      .populate("barberId", "name");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Cambiar estado (admin)
export const updateStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancelar turno (client)
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOneAndUpdate(
      { _id: req.params.id, clientId: req.user.id },
      { status: "canceled" },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
