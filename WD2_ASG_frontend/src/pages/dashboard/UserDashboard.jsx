import TicketCard from "../../components/tickets/TicketCard";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";

export default function UserDashboard({ setPage, setTicketId }) {
  const tickets = [
    {
      id: 1,
      title: "Login not working",
      category: "Authentication",
      status: "Open",
      priority: "High",
      assignedTo: "Tech A",
      reportedBy: "Ali",
      createdAt: "2024-04-05",
    },
    {
      id: 2,
      title: "Email issue",
      category: "Software",
      status: "Closed",
      priority: "Low",
      assignedTo: "Tech B",
      reportedBy: "Ali",
      createdAt: "2024-04-03",
    },
  ];

  const handleSelect = (id) => {
    setTicketId(id);
    setPage("detail");
  };

  const openCount = tickets.filter((t) => t.status === "Open").length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-xl md:text-2xl font-bold">My Tickets</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open Tickets" value={openCount} />
      </div>

      {/* Ticket List */}
      <div>
        {/* Mobile: Cards */}
        <div className="space-y-3 md:hidden">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="hidden md:block">
          <TicketTable tickets={tickets} onSelect={handleSelect} role="user" />
        </div>
      </div>
    </div>
  );
}
