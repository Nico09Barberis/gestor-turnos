import { useEffect, useState } from "react";
import { getBarberAppointments } from "../../services/appointment.js";

function BarberAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getBarberAppointments(); // o getBarberAppointments("2025-08-25")
        setAppointments(data);
      } catch (err) {
        console.error("Error al obtener turnos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Turnos agendados</h2>
      {appointments.length === 0 ? (
        <p>No hay turnos agendados</p>
      ) : (
        <ul>
          {appointments.map((t) => (
            <li key={t._id}>
              <strong>Cliente:</strong> {t.clientId?.name} <br />
              <strong>Fecha:</strong> {t.date} <br />
              <strong>Hora:</strong> {t.time} <br />
              <strong>Estado:</strong> {t.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BarberAppointments;
