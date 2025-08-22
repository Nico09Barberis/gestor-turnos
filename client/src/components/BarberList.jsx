// components/admin/BarberList.jsx
import { useEffect, useState } from "react";
import { getAllBarbers, deleteBarber } from "../services/barbers";

const BarberList = () => {
  const [barbers, setBarbers] = useState([]);
  const [error, setError] = useState("");

  const fetchBarbers = async () => {
    try {
      const data = await getAllBarbers();
      setBarbers(data);
      setError("");
    } catch (err) {
      setError("Error al obtener barberos");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que quieres eliminar este barbero?")) return;
    try {
      await deleteBarber(id);
      setBarbers(barbers.filter((b) => b._id !== id)); // actualizar listado
    } catch (err) {
      setError("Error al eliminar barbero");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Lista de Barberos</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {barbers.length === 0 ? (
        <p>No hay barberos registrados.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {barbers.map((barber) => (
            <li key={barber._id} className="flex items-center justify-between py-2">
              <span>{barber.name}</span>
              <button
                onClick={() => handleDelete(barber._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BarberList;
