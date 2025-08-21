import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const UserNav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo o nombre de la app */}
      <Link to="/home" className="text-xl font-bold text-blue-600">
        gestor-turnos
      </Link>

      {/* Menú de navegación */}
      <div className="flex space-x-4 items-center">
        <Link to="/home" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/appointments/new" className="hover:text-blue-600">
          Agendar Turno
        </Link>
        <Link to="/appointments" className="hover:text-blue-600">
          Mis Turnos
        </Link>
        <Link to="/profile" className="hover:text-blue-600">
          Perfil
        </Link>

        {/* Nombre del usuario */}
        {user && <span className="ml-4 font-medium">Hola, {user.name}</span>}

        {/* Botón de logout */}
        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNav;
