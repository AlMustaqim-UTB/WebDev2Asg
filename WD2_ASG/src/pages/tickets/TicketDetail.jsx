import { useAuth } from "../../auth/useAuth";

export default function TicketDetail({ id, setPage }) {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Ticket #{id}</h1>

      <p>Role: {user.role}</p>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2"
        onClick={() => setPage("edit")}
      >
        Edit Ticket
      </button>
    </div>
  );
}
