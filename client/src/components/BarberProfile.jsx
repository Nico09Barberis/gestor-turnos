import { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile, changeMyPassword } from "../services/barbers";

const BarberProfile = () => {
  const [barber, setBarber] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getMyProfile();
        setBarber({ name: data.name, email: data.email });
      } catch (err) {
        setError("Error al cargar perfil");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateMyProfile(barber);
      setMessage(res.message || "Perfil actualizado correctamente");
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar perfil");
      setMessage("");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await changeMyPassword(passwords);
      setMessage(res.message || "Contraseña cambiada correctamente");
      setError("");
      setPasswords({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar contraseña");
      setMessage("");
    }
  };

  if (loading) return <p className="text-center">Cargando perfil...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Formulario de datos */}
      <form onSubmit={handleUpdate} className="mb-6">
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
          Actualizar Perfil
        </button>
      </form>

      {/* Formulario de contraseña */}
      <form onSubmit={handleChangePassword}>
        <h2 className="text-xl font-semibold mb-2">Cambiar Contraseña</h2>

        <label className="block mb-1">Contraseña actual</label>
        <input
          type="password"
          value={passwords.currentPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, currentPassword: e.target.value })
          }
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <label className="block mb-1">Nueva contraseña</label>
        <input
          type="password"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default BarberProfile;
