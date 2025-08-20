import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      // Redirección según rol
      if (user.role === "client") {
        navigate("/home");
      } else if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/"); // fallback
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <form
      className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
      <label className="block mb-2">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <label className="block mb-2">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default LoginForm;
