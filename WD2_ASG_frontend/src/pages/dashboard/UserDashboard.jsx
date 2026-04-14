import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";
import TicketCard from "../../components/tickets/TicketCard";

// API base URL
const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, ""); // Clean up the API URL to avoid double slashes or /api/api

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]); // Stores the tickets created by the logged-in user
  const [error, setError] = useState(""); // Stores any error message from API failures
  const [loading, setLoading] = useState(true); // Controls loading state while fetching tickets
  const navigate = useNavigate(); // Used to redirect user

  // Fetches user tickets
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setError("");
        setLoading(true);

        const response = await fetch(`${API}/api/tickets`, {
          credentials: "include",
        });

        const data = await response.json().catch(() => []); // Parse JSON safely

        // Throw an error if response failed
        if (!response.ok) {
          throw new Error(
            data?.msg || `HTTP error! status: ${response.status}`,
          );
        }

        // Update tickets state (array)
        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError(err.message || "Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle clicking a ticket (navigate to ticket detail page if clicked)
  const handleSelect = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const openCount = tickets.filter((t) => t.status === "Open").length;

  if (loading)
    return <div className="p-4 md:p-6 max-w-7xl mx-auto">Loading...</div>; // Loading UI while fetching data
  if (error)
    return (
      <div className="p-4 md:p-6 max-w-7xl mx-auto text-red-500">{error}</div> // Show error UI if something went wrong
    );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold">My Tickets</h1>

      {/* StatCard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open Tickets" value={openCount} />
      </div>

      {/* Ticket list */}
      <div>
        <div className="space-y-3 md:hidden">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onSelect={() => handleSelect(ticket._id)}
              role="user"
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
