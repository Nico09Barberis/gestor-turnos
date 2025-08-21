import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/authProvider.jsx";

import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import Home from "./pages/Users/Home"; // Cliente
import Dashboard from "./pages/Barbers/Dashboard"; // Barbero
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import AppointmentPage from "./pages/Users/AppoitmentsPage.jsx";
import UserLayout from "./components/layout/UserLayout.jsx";

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
            path="/dashboard"
            element={
              <ProtectedRoute allowedRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ======== CLIENTE ========= */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRole="client">
                <UserLayout>
                  <Home />
                  <AppointmentPage />
                </UserLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
