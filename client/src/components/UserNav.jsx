import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const UserNav = () => {
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
      <Link to="/home" className="text-xl font-bold text-blue-600">
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

      {/* Menú */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white shadow-md z-20 
           md:shadow-none md:static md:flex md:space-x-4 md:items-center md:w-auto md:ml-auto`}
      >
        <Link
          to="/home"
          className="block px-4 py-2 hover:text-blue-600 md:px-0"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/appointments/new"
          className="block px-4 py-2 hover:text-blue-600 md:px-0"
          onClick={() => setIsOpen(false)}
        >
          Agendar Turno
        </Link>
        <Link
          to="/appointments"
          className="block px-4 py-2 hover:text-blue-600 md:px-0"
          onClick={() => setIsOpen(false)}
        >
          Mis Turnos
        </Link>
        <Link
          to="/profile"
          className="block px-4 py-2 hover:text-blue-600 md:px-0"
          onClick={() => setIsOpen(false)}
        >
          Perfil
        </Link>

        {/* Nombre usuario */}
        {user && (
          <span className="block px-4 py-2 font-medium md:ml-4">
            Hola, {user.name}
          </span>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded md:w-auto md:ml-4 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Overlay en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default UserNav;
