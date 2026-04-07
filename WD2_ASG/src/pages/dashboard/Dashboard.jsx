import { useAuth } from "../../auth/useAuth";
import UserDashboard from "./UserDashboard";
import TechnicianDashboard from "./TechnicianDashboard";

export default function Dashboard(props) {
  const { user } = useAuth();
  return user.role === "user" ? (
    <UserDashboard {...props} />
  ) : (
    <TechnicianDashboard {...props} />
  );
}
