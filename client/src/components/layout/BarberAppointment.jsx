import { useEffect, useState } from "react";
import { getBarberAppoitn } from "../../services/appointment";

function BarberAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getBarberAppoitn();
        console.log("Turnos recibidos:", data);
        setAppointments(data);
      } catch (err) {
        console.error("Error en fetchAppointments:", err);
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
