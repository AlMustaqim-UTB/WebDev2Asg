import DetailRow from "../../components/tickets/DetailRow";
import StatusBadge from "../../components/tickets/StatusBadge";
import PriorityBadge from "../../components/tickets/PriorityBadge";
import { useAuth } from "../../auth/useAuth";

export default function TicketDetail({ id, setPage }) {
  const { user } = useAuth();

  // Mock ticket data (API later)
  const ticket = {
    id,
    title: "Login not working",
    category: "Authentication",
    department: "IT Support",
    description:
      "User cannot log in using correct credentials. The issue happens on both mobile and desktop.",
    status: "Resolved",
    priority: "High",
    reportedBy: "Ali",
    assignedTo: "Technician B",
    createdAt: "2024-04-05",
    resolvedAt: "2024-04-07",
    remarks: [
      {
        id: 1,
        author: "Technician B",
        message: "Checked logs, issue related to authentication service.",
        createdAt: "2024-04-06 10:30",
      },
    ],
  };

  const isUser = user.role === "user";
  const isTechnician = user.role === "technician";

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Page title */}
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Ticket #{ticket.id}
      </h1>

      {/* Ticket detail card */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6">
        <DetailRow label="Title">{ticket.title}</DetailRow>

        <DetailRow label="Category">{ticket.category}</DetailRow>

        {isTechnician && (
          <DetailRow label="Department">{ticket.department}</DetailRow>
        )}

        {isTechnician && (
          <DetailRow label="Reported by">{ticket.reportedBy}</DetailRow>
        )}

        <DetailRow label="Description">
          <span className="whitespace-pre-line">{ticket.description}</span>
        </DetailRow>

        <DetailRow label="Status">
          <StatusBadge status={ticket.status} />
        </DetailRow>

        <DetailRow label="Priority">
          <PriorityBadge priority={ticket.priority} />
        </DetailRow>

        <DetailRow label="Assigned to">{ticket.assignedTo}</DetailRow>

        {isTechnician && (
          <DetailRow label="Date created">{ticket.createdAt}</DetailRow>
        )}

        {isTechnician && ticket.resolvedAt && (
          <DetailRow label="Date resolved">{ticket.resolvedAt}</DetailRow>
        )}

        {/* ✅ Remarks are READ-ONLY here (input moved to TicketEdit) */}
        <DetailRow label="Remarks">
          <div className="space-y-3">
            {ticket.remarks.length === 0 && (
              <p className="text-sm text-gray-500">No remarks added.</p>
            )}

            {ticket.remarks.map((remark) => (
              <div key={remark.id} className="border-l-4 border-[#6096ba] pl-3">
                <p className="text-sm">{remark.message}</p>
                <p className="text-xs text-[#8b8c89] mt-1">
                  {remark.author} · {remark.createdAt}
                </p>
              </div>
            ))}
          </div>
        </DetailRow>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        {isUser && ticket.status === "Resolved" && (
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Close Ticket
          </button>
        )}

        <button
          onClick={() => setPage("edit")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit Ticket
        </button>

        <button
          onClick={() => setPage("dashboard")}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
