// This component renders a table-based view of tickets. It is mainly used on the desktop dashboard page
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketTable({ tickets, onSelect, role }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table header */}
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Key
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            {/* Department column (only visible to technicians) */}
            {role === "technician" && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
              </>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Loop through ticket list */}
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              onClick={() => onSelect(ticket._id)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              {/* Ticket key */}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {ticket.key}
              </td>
              {/* Ticket title */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ticket.title}
              </td>
              {/* Ticket category */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ticket.category}
              </td>
              {role === "technician" && (
                <>
                  {/* Department (Only for technicians) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.created_by?.department || "N/A"}
                  </td>
                  {/* Assigned to (Only for technicians) */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.assigned_to?.name || "Unassigned"}
                  </td>
                </>
              )}
              {/* Ticket creation date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(ticket.date_created).toLocaleDateString()}
              </td>
              {/* Ticket priority badge */}
              <td className="px-6 py-4 whitespace-nowrap">
                <PriorityBadge priority={ticket.priority} />
              </td>
              {/* Ticket status badge */}
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
