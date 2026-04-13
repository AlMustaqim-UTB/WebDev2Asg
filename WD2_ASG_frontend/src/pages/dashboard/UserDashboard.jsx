import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";
import TicketCard from "../../components/tickets/TicketCard";

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await fetch("/api/tickets/mytickets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  const handleSelect = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const openCount = tickets.filter((t) => t.status === "Open").length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">My Tickets</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open Tickets" value={openCount} />
      </div>

      <div>
        <div className="space-y-3 md:hidden">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onSelect={() => handleSelect(ticket._id)}
              role={"user"}
            />
          ))}
        </div>

        <div className="hidden md:block">
          <TicketTable tickets={tickets} onSelect={handleSelect} role="user" />
        </div>
      </div>
    </div>
  );
}
