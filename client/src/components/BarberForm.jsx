// components/admin/BarberCreate.jsx
import { useState } from "react";
import { createBarber } from "../services/barbers";

const BarberCreate = () => {
  const [barber, setBarber] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createBarber(barber);
      setMessage(res.message || "Barbero creado correctamente");
      setError("");
      setBarber({ name: "", email: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear barbero");
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Crear Barbero</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          value={barber.name}
          onChange={(e) => setBarber({ ...barber, name: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={barber.email}
          onChange={(e) => setBarber({ ...barber, email: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Crear Barbero
        </button>
      </form>
    </div>
  );
};

export default BarberCreate;
