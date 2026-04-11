export default function TicketTable({ tickets, onSelect, role }) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b">
          <th className="text-left p-2">ID</th>
          <th className="text-left p-2">Title</th>
          <th className="text-left p-2">Category</th>

          {role === "technician" && (
            <th className="text-left p-2">Department</th>
          )}

          <th className="text-left p-2">Status</th>
          <th className="text-left p-2">Priority</th>
          <th className="text-left p-2">Assigned To</th>
          <th className="text-left p-2">Date Created</th>
          <th className="text-left p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="border-b hover:bg-[#e7ecef]">
            <td className="p-2">{ticket.id}</td>
            <td className="p-2">{ticket.title}</td>
            <td className="p-2">{ticket.category}</td>

            {role === "technician" && (
              <td className="p-2">{ticket.department}</td>
            )}

            <td className="p-2">{ticket.status}</td>
            <td className="p-2">{ticket.priority}</td>
            <td className="p-2">{ticket.assignedTo}</td>
            <td className="p-2 text-sm text-[#8b8c89]">{ticket.createdAt}</td>
            <td className="p-2">
              <button
                onClick={() => onSelect(ticket.id)}
                className="text-blue-600 underline"
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
