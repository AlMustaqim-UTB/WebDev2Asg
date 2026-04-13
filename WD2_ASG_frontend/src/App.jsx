import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/userAuth";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/navigation/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TicketCreate from "./pages/tickets/TicketCreate";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketEdit from "./pages/tickets/TicketEdit";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route
          path="/tickets/new"
          element={
            <ProtectedRoute>
              <TicketCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute>
              <TicketCreate />
            </ProtectedRoute>
          }
        />
        <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
        <Route path="/edit-ticket/:id" element={<ProtectedRoute><TicketEdit /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
