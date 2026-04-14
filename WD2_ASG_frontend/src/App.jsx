import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/userAuth"; // Auth context provider (wraps the entire app)
import ProtectedRoute from "./auth/ProtectedRoute"; // Route guard to protect authenticated / role-based pages
import Navbar from "./components/navigation/Navbar"; // Top navigation bar (shown on all pages)
// Authentication pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
// Main application pages
import TicketCreate from "./pages/tickets/TicketCreate";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketEdit from "./pages/tickets/TicketEdit";
import { Toaster } from "react-hot-toast"; // Toast container for global notifications

export default function App() {
  return (
    // Provides authentication state to the entire app
    <AuthProvider>
      {/* Global toast renderer (required for toast.success and toast.error) */}
      <Toaster position="top-right" />
      {/* Main navigation bar */}
      <Navbar />
      {/* Application routing */}
      <Routes>
        {/* Public routes (no authentication required) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard (protected route) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Create ticket (protected route) */}
        <Route
          path="/tickets/new"
          element={
            <ProtectedRoute>
              <TicketCreate />
            </ProtectedRoute>
          }
        />

        {/* Alternate create ticket route (protected) */}
        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute>
              <TicketCreate />
            </ProtectedRoute>
          }
        />

        {/* View ticket details (protected) */}
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute>
              <TicketDetail />
            </ProtectedRoute>
          }
        />

        {/* Edit ticket (protected, technician-only handled inside component) */}
        <Route
          path="/edit-ticket/:id"
          element={
            <ProtectedRoute>
              <TicketEdit />
            </ProtectedRoute>
          }
        />
        {/* Default route: redirect to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Catch-all route: redirect unknown paths */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}
