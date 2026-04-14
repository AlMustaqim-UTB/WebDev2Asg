// This component displays a summary view of a single ticket. It is mainly used for mobile dashboard page where it is displayed in vertical order
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

export default function TicketCard({ ticket, onSelect, role }) {
  return (
    // Entire card is clickable
    <div
      onClick={() => onSelect(ticket._id)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 rounded-t-lg border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          {/* Ticket key */}
          <span className="text-xs font-medium text-black">{ticket.key}</span>

          {/* Priority and status badges */}
          <div className="flex items-center gap-2">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        {/* Title title */}
        <h3 className="font-semibold text-base leading-snug">{ticket.title}</h3>
      </div>

      {/* Body */}
      <div className="px-4 pb-4 mt-2">
        <div className="mt-2 space-y-2 text-sm">
          {/* Ticket category */}
          <div className="flex gap-2">
            <span className="w-24 text-[#8b8c89]">Category</span>
            <span>{ticket.category}</span>
          </div>

          {/* Technician-only fields */}
          {role === "technician" && (
            <>
              {/* Ticket department */}
              <div className="flex gap-2">
                <span className="w-24 text-[#8b8c89]">Department</span>
                <span>{ticket.created_by?.department || "N/A"}</span>
              </div>

              {/* Ticket assigned to */}
              <div className="flex gap-2">
                <span className="w-24 text-[#8b8c89]">Assigned to</span>
                <span>{ticket.assigned_to?.name || "Unassigned"}</span>
              </div>
            </>
          )}

          {/* Ticket creation date */}
          <div className="flex gap-2">
            <span className="w-24 text-[#8b8c89]">Created</span>
            <span>{new Date(ticket.date_created).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
