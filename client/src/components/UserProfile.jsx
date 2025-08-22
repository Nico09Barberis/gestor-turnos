import { useEffect, useState, useRef } from "react";
import { getMyProfile, updateProfile, changePassword } from "../services/user";

const UserProfile = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [passwordError, setPasswordError] = useState(""); // error específico

  const currentPasswordRef = useRef(); // 👈 ref para enfocar el input

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getMyProfile();
        setUserData({ name: data.name, email: data.email });
      } catch (err) {
        setError("No se pudo cargar el perfil.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdateUserProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile(userData);
      setMessage(res.message);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar perfil");
      setMessage("");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError(""); // resetear error antes de intentar
    try {
      const res = await changePassword(passwords);
      setMessage(res.message);
      setPasswords({ currentPassword: "", newPassword: "" });
      setError("");
    } catch (err) {
      const msg = err.response?.data?.message || "Error al cambiar contraseña";
      // mensaje amigable si la contraseña actual es incorrecta
      if (msg.toLowerCase().includes("current password")) {
        setPasswordError("La contraseña actual no coincide. Por favor, intentá de nuevo.");
        setPasswords({ currentPassword: "", newPassword: "" }); // limpiar inputs
        currentPasswordRef.current.focus(); // volver el foco al input
      } else {
        setPasswordError(msg);
      }
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Mi Perfil</h1>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Formulario de datos */}
      <form onSubmit={handleUpdateUserProfile} className="mb-6">
        <label className="block mb-1">Nombre</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Actualizar Perfil
        </button>
      </form>

      {/* Formulario de cambio de contraseña */}
      <form onSubmit={handleChangePassword}>
        <label className="block mb-1">Contraseña Actual</label>
        <input
          type="password"
          ref={currentPasswordRef}
          value={passwords.currentPassword}
          onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
          className="w-full p-2 mb-1 border rounded"
        />
        {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>}

        <label className="block mb-1">Nueva Contraseña</label>
        <input
          type="password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          className="w-full p-2 mb-3 border rounded"
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

export default UserProfile;
