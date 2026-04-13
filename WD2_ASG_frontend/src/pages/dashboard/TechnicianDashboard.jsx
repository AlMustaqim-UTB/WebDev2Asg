import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../../components/tickets/TicketCard";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";


//const API = ""; //API route for cloud hosting
const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, ""); // prevent /api/api

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${API}/api/tickets/all`, {
          credentials: "include",
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${data.msg || data.message || "Unknown error"}`
          );
        }

        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleSelect = (id) => {
    navigate(`/tickets/${id}`);
  };

  if (loading) return <div className="p-4">Loading tickets...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">Technician Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open" value={open} />
        <StatCard label="In Progress" value={inProgress} />
      </div>

      <div>
        <div className="space-y-3 md:hidden">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onSelect={handleSelect}
              role="technician"
            />
          ))}
        </div>

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
