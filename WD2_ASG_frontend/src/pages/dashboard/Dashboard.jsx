import React from 'react';
import { useAuth } from "../../auth/userAuth"; 
import TechnicianDashboard from './TechnicianDashboard';
import UserDashboard from './UserDashboard';

export default function Dashboard() {
  // Correctly call the hook
  const { user } = useAuth(); 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user.role === 'technician' ? <TechnicianDashboard /> : <UserDashboard />}
    </div>
  );
}
