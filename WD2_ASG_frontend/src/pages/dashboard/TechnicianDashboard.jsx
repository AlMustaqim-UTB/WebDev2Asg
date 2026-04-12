import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import TicketCard from "../../components/tickets/TicketCard";
import TicketTable from "../../components/tickets/TicketTable";
import StatCard from "../../components/dashboard/StatCard";

export default function TechnicianDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        // Using the Vite proxy for cleaner API calls
        const response = await fetch('/api/tickets/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`HTTP ${response.status}: ${errorData.message || 'Unknown error'}`);
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  // Use react-router-dom for navigation
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
