import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { getMyAppointments, cancelAppointment } from "../services/appointment";

const MyAppointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // 👈 filtro actual

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (err) {
        setError("No se pudieron cargar los turnos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que querés cancelar este turno?")) return;
    try {
      await cancelAppointment(id);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === id ? { ...appt, status: "canceled" } : appt
        )
      ); // 👈 marcamos como cancelado en vez de borrarlo
    } catch (err) {
      setError("No se pudo eliminar el turno.");
      console.error(err);
    }
  };

  // 👇 filtramos según la opción elegida
  const filteredAppointments = appointments.filter((appt) => {
    if (filter === "all") return true;
    if (filter === "active") return appt.status !== "canceled";
    if (filter === "canceled") return appt.status === "canceled";
  });

  if (loading) return <p>Cargando turnos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        Mis turnos {user?.name && `de ${user.name}`}
      </h1>

      {/* Filtros */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Activos
        </button>
        <button
          onClick={() => setFilter("canceled")}
          className={`px-3 py-1 rounded ${
            filter === "canceled" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Cancelados
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <p>No se encontraron turnos para este filtro.</p>
      ) : (
        <ul className="space-y-4">
          {filteredAppointments.map((appt) => (
            <li
              key={appt._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <span className="font-semibold">Fecha:</span> {appt.date}
              </p>
              <p>
                <span className="font-semibold">Hora:</span> {appt.time}
              </p>
              <p>
                <span className="font-semibold">Barbero:</span>{" "}
                {appt.barberId?.name}
              </p>
              <p>
                <span className="font-semibold">Estado:</span>{" "}
                <span
                  className={
                    appt.status === "pending"
                      ? "text-yellow-600"
                      : appt.status === "completed"
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {appt.status}
                </span>
              </p>

              {/* Botón eliminar */}
              {appt.status === "pending" && (
                <button
                  onClick={() => handleDelete(appt._id)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancelar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAppointments;
