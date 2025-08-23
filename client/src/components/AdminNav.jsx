import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const AdminNav = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/dashboard" className="text-xl font-bold text-blue-600">
        gestor-turnos
      </Link>

      {/* Botón menú hamburguesa (solo móvil) */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Menú en escritorio */}
      <div className="hidden md:flex md:space-x-4 md:items-center md:ml-auto">
        <Link to="/dashboard" className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/barber/new" className="hover:text-blue-600">
          Cargar barbero
        </Link>
        <Link to="/barber" className="hover:text-blue-600">
          listar Barberos
        </Link>
        <Link to="/barber/appointments" className="hover:text-blue-600">
          Ver mis turnos
        </Link>
        <Link to="/barber/profile" className="hover:text-blue-600">
          Perfil
        </Link>

        <button
          onClick={handleLogout}
          className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Sidebar móvil */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-20 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-4 flex flex-col space-y-4">
          {user && <span className="font-medium">Hola, {user.name}</span>}

          <Link
            to="/home"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/barbers/new"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Cargar Barbero
          </Link>
          <Link
            to="/barbers"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Listar Barberos
          </Link>
          <Link
            to="/appointments" className="hover:text-blue-600"
            >
            Ver mis turnos
          </Link>
          <Link
            to="/profile"
            className="hover:text-blue-600"
            onClick={() => setIsOpen(false)}
          >
            Perfil
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default AdminNav;
