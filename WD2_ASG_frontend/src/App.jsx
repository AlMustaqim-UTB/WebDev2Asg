import { Routes, Route } from "react-router-dom";
// FIX: Use a named import for AuthProvider
import { AuthProvider } from "./auth/userAuth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TicketCreate from "./pages/tickets/TicketCreate";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketEdit from "./pages/tickets/TicketEdit";
import ProtectedRoute from "./auth/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    // This provider makes the auth context available to all child routes
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* FIX: Add the route for ticket details */}
        <Route path="/tickets/:id" element={<TicketDetail />} />

        <Route
          path="/tickets/:id/edit"
          element={
            <ProtectedRoute roles={['technician']}>
              <TicketEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-ticket"
          element={
            <ProtectedRoute roles={['technician']}>
              <TicketCreate />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} /> 
      </Routes>
    </AuthProvider>
  );
}

export default App;
