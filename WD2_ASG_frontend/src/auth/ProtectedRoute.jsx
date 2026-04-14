import { Navigate } from "react-router-dom";
import { useAuth } from "./userAuth"; // Import the useAuth hook

/**
 * A wrapper component that protects routes requiring authentication.
 * It checks the user's authentication status and either renders the requested
 * component or redirects to the login page.
 */
export default function ProtectedRoute({ children }) {
  // Retrieve the current user and the loading state from the auth context
  const { user, loading } = useAuth(); 

  // Display a loading indicator while the authentication state is being resolved
  if (loading) {
    return <div>Loading...</div>; 
  }

  // If the user is not authenticated, redirect them to the login page
  // The 'replace' prop replaces the current entry in the history stack to "/login"
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected child components
  return children;
}