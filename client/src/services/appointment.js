// /client/src/services/appointments.js
import API from "./api"; // 👈 este es tu axios con interceptor

import { format } from "date-fns";

export const getAvailableTimes = async (barberId, date) => {
  const formattedDate = format(date, "yyyy-MM-dd");
  const res = await API.get(`/appointments/barber?barberId=${barberId}&date=${formattedDate}`);
  const bookedTimes = res.data.map((a) => a.time);

  const times = [];
  for (let h = 9; h < 17; h++) {
    times.push(`${h.toString().padStart(2, "0")}:00`);
    times.push(`${h.toString().padStart(2, "0")}:30`);
  }

  return times.filter((t) => !bookedTimes.includes(t));
};


// Obtener mis turnos
export const getMyAppointments = async () => {
  const res = await API.get("/appointments/my");
  return res.data;
};

// Cancelar un turno
export const cancelAppointment = async (id) => {
  const res = await API.delete(`/appointments/${id}`);
  return res.data;
};
