export default function TicketCard({ ticket, onSelect }) {
  return (
    <div
      onClick={() => onSelect(ticket.id)}
      className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer active:bg-gray-100"
    >
      {/* Title */}
      <h3 className="font-medium text-base">{ticket.title}</h3>

      {/* Category */}
      <p className="text-sm text-[#8b8c89] mt-1">{ticket.category}</p>

      {/* ✅ Department (technician mobile view only when available) */}
      {ticket.department && (
        <p className="text-sm text-[#8b8c89]">{ticket.department}</p>
      )}

      {/* Status + Priority */}
      <p className="mt-2 text-sm">
        {ticket.status} • {ticket.priority}
      </p>

      {/* Assigned to */}
      <p className="mt-1 text-sm text-[#8b8c89]">
        Assigned to: {ticket.assignedTo}
      </p>

      {/* Reported by (if present) */}
      {ticket.reportedBy && (
        <p className="text-sm text-[#8b8c89]">
          Reported by: {ticket.reportedBy}
        </p>
      )}

      {/* Date created */}
      <p className="text-xs text-[#8b8c89] mt-1">{ticket.createdAt}</p>
    </div>
  );
}
