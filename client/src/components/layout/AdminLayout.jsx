// layouts/AdminLayout.jsx
import AdminNav from "../AdminNav.jsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminNav />
      <main className="flex-1">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
    </div>
  );
};

export default AdminLayout;
