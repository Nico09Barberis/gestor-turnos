import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import API from "../services/api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 nuevo
  const navigate = useNavigate();

  // Al montar: validar token y cargar user
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      API.get("/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
        .then((res) => {
          setUser(res.data);
          setToken(storedToken);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
        })
        .finally(() => setLoading(false)); // 👈 liberamos loading
    } else {
      setLoading(false);
    }
  }, []);

  // Login
  const login = async (email, password) => {
    const res = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);
    setToken(res.data.token);

    // Redirigir según rol
    if (res.data.user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }

    return res.data.user;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Cargando...</div>; // 👈 placeholder para evitar parpadeo
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
