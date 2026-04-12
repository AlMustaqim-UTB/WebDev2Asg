import { Navigate, useLocation } from "react-router-dom";
import userAuth from "./userAuth";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = userAuth();
  const location = useLocation();

  if (loading) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // User does not have the required role, redirect to dashboard or an unauthorized page
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;