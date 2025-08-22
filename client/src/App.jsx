import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/authProvider.jsx";

import ProtectedRoute from "./components/ProtectedRoutes.jsx";

//Pages Publics
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";

//Pages Barber
import Dashboard from "./pages/Barbers/Dashboard";

//Pages Clients
import UserLayout from "./components/layout/UserLayout.jsx";
import Home from "./pages/Users/Home";
import AppointmentPage from "./pages/Users/AppoitmentsPage.jsx";
import AppointmentsListPage from "./pages/Users/AppointmentsListPage.jsx";
import ProfilePage from "./pages/Users/ProfilePage.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import BarberCreatePage from "./pages/Barbers/BarberCreatePage.jsx";
import BarberListPage from "./pages/Barbers/BarberListPage.jsx";
import BarberProfilePage from "./pages/Barbers/BarberProfilePage.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* ======== PÚBLICAS ========= */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* ======== BARBERO ========= */}
        <Route
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/barbers/new" element={<BarberCreatePage />} />
            <Route path="/barbers" element={<BarberListPage />} />
            <Route path="/profile" element={<BarberProfilePage />} /> 
          </Route>

          {/* ======== CLIENTE ========= */}
          <Route
            element={
              <ProtectedRoute allowedRole="client">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/appointments/new" element={<AppointmentPage />} />{" "}
            <Route path="/appointments" element={<AppointmentsListPage />} />{" "}
            <Route path="/profile" element={<ProfilePage />} /> 
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
