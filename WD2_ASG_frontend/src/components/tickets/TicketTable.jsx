import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

export default function TicketTable({ tickets, onSelect, role }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
            
            {/* Columns specific to technician view */}
            {role === 'technician' && (
              <>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
              </>
            )}

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr key={ticket._id} onClick={() => onSelect(ticket._id)} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.key}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.title}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={ticket.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <PriorityBadge priority={ticket.priority} />
              </td>

              {/* Data cells specific to technician view */}
              {role === 'technician' && (
                <>
                  {/* FIX: Access the nested department property from the 'created_by' user */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.created_by?.department || 'N/A'}
                  </td>
                  {/* FIX: Access the nested name property from the 'assigned_to' user */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {ticket.assigned_to?.name || 'Unassigned'}
                  </td>
                </>
              )}

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(ticket.date_created).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
