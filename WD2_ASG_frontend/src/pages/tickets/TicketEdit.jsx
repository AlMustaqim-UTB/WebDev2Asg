import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userAuth from "../../auth/userAuth";
import Navbar from "../../components/navigation/Navbar";
import DetailRow from "../../components/tickets/DetailRow";
import StatusBadge from "../../components/tickets/StatusBadge";

export default function TicketEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = userAuth();
  const [ticket, setTicket] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [formData, setFormData] = useState({
    status: "",
    priority: "",
    assigned_to: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketAndTechnicians = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found.");

        // Fetch ticket details
        const ticketResponse = await fetch(`/api/tickets/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!ticketResponse.ok)
          throw new Error("Failed to fetch ticket details.");
        const ticketData = await ticketResponse.json();
        setTicket(ticketData);
        setFormData({
          status: ticketData.status,
          priority: ticketData.priority,
          assigned_to: ticketData.assigned_to?._id || "",
        });

        // Fetch technicians
        const techResponse = await fetch("/api/users/technicians", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!techResponse.ok) throw new Error("Failed to fetch technicians.");
        const techData = await techResponse.json();
        setTechnicians(techData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "technician") {
      fetchTicketAndTechnicians();
    } else {
      setError("You do not have permission to edit this ticket.");
      setLoading(false);
    }
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add confirmation dialog
    if (!window.confirm("Are you sure you want to save these changes?")) {
      return; // If user clicks 'Cancel', do nothing
    }

    try {
      const token = localStorage.getItem("token");
      const updateData = { ...formData };

      if (formData.status === "Resolved" && ticket.status !== "Resolved") {
        updateData.date_resolved = new Date().toISOString();
      }

      const response = await fetch(`/api/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update ticket.");
      }

      navigate(`/tickets/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!ticket) return <div>Ticket not found.</div>;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar />
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Edit Ticket {ticket.key}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6"
        >
          <DetailRow label="Title">{ticket.title}</DetailRow>
          <DetailRow label="Category">{ticket.category}</DetailRow>
          <DetailRow label="Department">
            {ticket.created_by?.department || "N/A"}
          </DetailRow>
          <DetailRow label="Reported by">
            {ticket.created_by?.name || "Unknown"}
          </DetailRow>
          <DetailRow label="Description">
            <span className="whitespace-pre-line">{ticket.description}</span>
          </DetailRow>

          <DetailRow htmlFor="status" label="Status">
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </DetailRow>

          <DetailRow htmlFor="priority" label="Priority">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </DetailRow>

          <DetailRow htmlFor="assigned_to" label="Assigned to">
            <select
              id="assigned_to"
              name="assigned_to"
              value={formData.assigned_to}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="">Unassigned</option>
              {technicians.map((tech) => (
                <option key={tech._id} value={tech._id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </DetailRow>
          <DetailRow label="Date created">
            {new Date(ticket.date_created).toLocaleDateString()}
          </DetailRow>
        </form>
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            type="submit"
            className="bg-[#096BAA] hover:opacity-90 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-50 cursor-pointer"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate(`/tickets/${id}`)}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full md:w-auto cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
