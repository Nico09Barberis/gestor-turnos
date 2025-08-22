// /client/src/services/appointments.js
import API from "./api"; // 👈 este es tu axios con interceptor

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
