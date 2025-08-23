import { useEffect, useState } from "react";
import { getMyAppointments } from "../services/appointments";

const BarberAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [date, setDate] = useState("");

  const fetchAppointments = async () => {
    try {
      const data = await getMyAppointments(date);
      setAppointments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [date]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Mis Turnos</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4"
      />

      {appointments.length === 0 ? (
        <p>No hay turnos</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((appt) => (
            <li key={appt._id} className="p-3 border rounded">
              <p>
                <strong>Paciente:</strong>{" "}
                {appt.patient ? appt.patient.name : "Disponible"}
              </p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(appt.date).toLocaleString()}
              </p>
              <p>
                <strong>Estado:</strong> {appt.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarberAppointments;
