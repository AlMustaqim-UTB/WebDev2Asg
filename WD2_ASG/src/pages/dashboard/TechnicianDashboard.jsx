import { useState, useEffect } from "react";

export default function TechnicianDashboard({ setPage, setTicketId }) {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // Make sure your vite.config.js is proxying /api to your backend server
        const response = await fetch("/api/ticket");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTickets();
  }, []); // Empty dependency array means this runs once on component mount

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Technician Dashboard</h1>

      {error && <div className="text-red-500">Error: {error}</div>}

      {tickets.length === 0 && !error && <div>No tickets found.</div>}

      {tickets.map((t) => (
        <div
          key={t._id} // Use MongoDB's _id as the key
          className="border p-4 mb-2 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setTicketId(t._id);
            setPage("detail");
          }}
        >
          <div className="font-bold">{t.title}</div>
          <div className="text-sm text-gray-600">Status: {t.status}</div>
        </div>
      ))}
    </div>
  );
}
