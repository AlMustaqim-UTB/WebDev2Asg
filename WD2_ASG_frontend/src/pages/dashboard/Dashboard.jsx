import userAuth from "../../auth/userAuth";
import Navbar from "../../components/navigation/Navbar";
import TechnicianDashboard from "./TechnicianDashboard";
import UserDashboard from "./UserDashboard";

export default function Dashboard() {
  const { user } = userAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <main className="p-4">
        {user.role === "technician" ? (
          <TechnicianDashboard />
        ) : (
          <UserDashboard />
        )}
      </main>
    </div>
  );
}
