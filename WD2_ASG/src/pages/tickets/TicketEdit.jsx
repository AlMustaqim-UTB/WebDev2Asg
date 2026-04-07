import { useAuth } from "../../auth/useAuth";
import TicketForm from "../../components/tickets/TicketForm";

export default function TicketEdit() {
  const { user } = useAuth();
  return <TicketForm readonly={user.role === "user"} />;
}
``;
