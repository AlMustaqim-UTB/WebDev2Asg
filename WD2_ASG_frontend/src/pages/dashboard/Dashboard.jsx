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
    <div className="min-h-screen bg-[#f2f2f2]">
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
