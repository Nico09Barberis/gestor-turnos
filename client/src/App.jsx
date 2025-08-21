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
            element={
              <ProtectedRoute allowedRole="client">
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/appointments/new" element={<AppointmentPage />} />{" "}
            {/*
            <Route path="/appointments" element={<AppointmentPage />} />{" "}
            <Route path="/profile" element={<ProfilePage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
