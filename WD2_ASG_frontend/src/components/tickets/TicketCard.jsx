import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function TicketCard({ ticket, onSelect, role }) {
  return (
    <div
      onClick={() => onSelect(ticket._id)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          {/* Ticket ID */}
          <span className="text-xs font-medium text-black">{ticket.key}</span>

          {/* Priority (left) + Status (right) */}
          <div className="flex items-center gap-2">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-base leading-snug">{ticket.title}</h3>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 mt-2">
        {/* ✅ Two-column aligned layout */}

        <div className="mt-2 space-y-2 text-sm">
          <div className="flex gap-2">
            <span className="w-24 text-[#8b8c89]">Category</span>
            <span>{ticket.category}</span>
          </div>

          {role === "technician" && (
            <>
              <div className="flex gap-2">
                <span className="w-24 text-[#8b8c89]">Department</span>
                <span>{ticket.created_by?.department || "N/A"}</span>
              </div>

              <div className="flex gap-2">
                <span className="w-24 text-[#8b8c89]">Assigned to</span>
                <span>{ticket.assigned_to?.name || "Unassigned"}</span>
              </div>
            </>
          )}

          <div className="flex gap-2">
            <span className="w-24 text-[#8b8c89]">Created</span>
            <span>{new Date(ticket.date_created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
