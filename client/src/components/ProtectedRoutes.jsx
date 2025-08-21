import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user } = useContext(AuthContext);

  // Si no hay usuario → a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no coincide → redirigimos según su rol
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "client") {
      return <Navigate to="/home" replace />;
    }
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  // Si todo está bien → renderizamos la ruta protegida
  return children;
};

export default ProtectedRoute;
