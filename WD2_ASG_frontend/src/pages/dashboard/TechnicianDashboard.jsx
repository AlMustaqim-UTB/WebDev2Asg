import TicketCard from "../../components/tickets/TicketCard";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";

export default function TechnicianDashboard({ setPage, setTicketId }) {
  const tickets = [
    {
      id: 101,
      title: "Server down",
      category: "Infrastructure",
      department: "IT Support",
      status: "Open",
      priority: "Critical",
      assignedTo: "Technician A",
      reportedBy: "Ali",
      createdAt: "2024-04-06",
    },
    {
      id: 102,
      title: "VPN not working",
      category: "Network",
      department: "Networking",
      status: "In Progress",
      priority: "High",
      assignedTo: "Technician B",
      reportedBy: "Sarah",
      createdAt: "2024-04-05",
    },
    {
      id: 103,
      title: "Email sync issue",
      category: "Software",
      department: "IT Support",
      status: "Closed",
      priority: "Low",
      assignedTo: "Technician C",
      reportedBy: "John",
      createdAt: "2024-04-03",
    },
  ];

  const handleSelect = (id) => {
    setTicketId(id);
    setPage("detail");
  };

  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold">Technician Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open" value={open} />
        <StatCard label="In Progress" value={inProgress} />
      </div>

      {/* Ticket List */}
      <div>
        {/* Mobile */}
        <div className="space-y-3 md:hidden">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Desktop */}

        <div className="hidden md:block">
          <TicketTable
            tickets={tickets}
            onSelect={handleSelect}
            role="technician"
          />
        </div>
      </div>
    </div>
  );
}
