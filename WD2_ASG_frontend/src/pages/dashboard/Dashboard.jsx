import React from "react";
import { useAuth } from "../../auth/userAuth";
import TechnicianDashboard from "./TechnicianDashboard"; // Dashboard view for technicians
import UserDashboard from "./UserDashboard"; // Dashboard view for normal users

// This component acts as a role-based router for dashboard views

export default function Dashboard() {
  const { user } = useAuth(); // Retrieve authenticated user information from context

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Renders dashboard content based on user role */}
      {user.role === "technician" ? <TechnicianDashboard /> : <UserDashboard />}
    </div>
  );
}
