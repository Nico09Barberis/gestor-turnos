// layouts/UserLayout.jsx
import UserNav from "../UserNav.jsx";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserNav />
      <main className="flex-1 p-4">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
};

export default UserLayout;
