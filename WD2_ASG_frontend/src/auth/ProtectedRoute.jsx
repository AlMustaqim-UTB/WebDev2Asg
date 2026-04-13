import { Navigate } from "react-router-dom";
import { useAuth } from "./userAuth"; // Import the useAuth hook

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Use the hook instead of calling AuthContext()

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while checking the cookie
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirect if not authenticated
  }

  return children;
}