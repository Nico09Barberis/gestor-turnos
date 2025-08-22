// /client/src/services/appointments.js
import API from "./api"; // 👈 este es tu axios con interceptor


// Ajuste de fecha a formato UTC “puro”
const formatDateUTC = (date) => {
  const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return utcDate.toISOString().split("T")[0]; // yyyy-MM-dd
};

export const getAvailableTimes = async (barberId, date) => {
  if (!barberId || !date) return [];

  const formattedDate = formatDateUTC(date);

  try {
    const response = await API.get(`/appointments?barberId=${barberId}&date=${formattedDate}`);
    
    if (!response.data || !Array.isArray(response.data)) {
      console.warn("API returned empty or invalid data:", response.data);
      return [];
    }

    const bookedTimes = response.data.map((a) => a.time);

    // Generar horarios de 9:00 a 16:30 cada 30 min
    const times = [];
    for (let h = 9; h < 17; h++) {
      times.push(`${h.toString().padStart(2, "0")}:00`);
      times.push(`${h.toString().padStart(2, "0")}:30`);
    }

    // Filtrar los horarios ya reservados
    const freeTimes = times.filter((t) => !bookedTimes.includes(t));
    return freeTimes;

  } catch (err) {
    console.error("Error al obtener horarios:", err.response?.data || err);
    return [];
  }
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
