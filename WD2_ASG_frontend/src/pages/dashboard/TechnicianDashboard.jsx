import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../../components/tickets/TicketCard";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";

// API base URL
const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, ""); // Clean up the API URL to avoid double slashes or /api/api

// Technician dashboard page

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState([]); // Stores tickets fetched from backend
  const [loading, setLoading] = useState(true); // Controls loading state while fetching data
  const [error, setError] = useState(null); // Stores any error message when fetchin fails
  const navigate = useNavigate(); // Used to redirect user

  // Fetch ticket data when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Call backend API to get all tickets
        const response = await fetch(`${API}/api/tickets/all`, {
          credentials: "include", // include auth cookies
        });

        const data = await response.json().catch(() => ({})); // Parse JSON response safely

        // Throw an error if response failed
        if (!response.ok) {
          throw new Error(
            `HTTP ${response.status}: ${data.msg || data.message || "Unknown error"}`,
          );
        }

        // Update tickets state (array)
        setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch error:", err); // Store error message if API call fails
        setError(err.message || "Failed to fetch tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Handle clicking a ticket (navigate to ticket detail page if clicked)
  const handleSelect = (id) => {
    navigate(`/tickets/${id}`);
  };

  if (loading) return <div className="p-4">Loading tickets...</div>; // Loading UI while fetching data
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>; // Show error UI if something went wrong

  // Count tickets by status (use for StatCard)
  const open = tickets.filter((t) => t.status === "Open").length;
  const inProgress = tickets.filter((t) => t.status === "In Progress").length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Heading */}
      <h1 className="text-xl md:text-2xl font-bold">Technician Dashboard</h1>

      {/* StatCard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tickets" value={tickets.length} />
        <StatCard label="Open" value={open} />
        <StatCard label="In Progress" value={inProgress} />
      </div>

      {/* Ticket list */}
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
