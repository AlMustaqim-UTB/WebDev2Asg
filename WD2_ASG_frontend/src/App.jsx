import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TicketCreate from "./pages/tickets/TicketCreate";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketEdit from "./pages/tickets/TicketEdit";
import userAuth from "./auth/userAuth";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  const { user, loading } = userAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/new"
          element={
            <ProtectedRoute user={user}>
              <TicketCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id"
          element={
            <ProtectedRoute user={user}>
              <TicketDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets/:id/edit"
          element={
            <ProtectedRoute user={user}>
              <TicketEdit />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </div>
  );
}

export default App;
