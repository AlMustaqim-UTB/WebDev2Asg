import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailRow from "../../components/tickets/DetailRow";
import StatusBadge from "../../components/tickets/StatusBadge";
import PriorityBadge from "../../components/tickets/PriorityBadge";
import userAuth from "../../auth/userAuth";

export default function TicketDetail() {
  const { user } = userAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRemark, setNewRemark] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`/api/tickets/id/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTicket();
  }, [id]);

  const handleAddRemark = async () => {
    if (!newRemark.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/tickets/${ticket._id}/remarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newRemark }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add remark");
      }

      const addedRemark = await response.json();
      setTicket((prev) => ({
        ...prev,
        remarks: [...(prev.remarks || []), addedRemark],
      }));
      setNewRemark("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading ticket details...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!ticket) return <div>Ticket not found</div>;

  const isTechnician = user.role === "technician";

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Ticket #{ticket.key}</h1>
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6">
        <DetailRow label="Title">{ticket.title}</DetailRow>

        <DetailRow label="Category">{ticket.category}</DetailRow>

        {isTechnician && (
          <DetailRow label="Department">{ticket.created_by?.department || "N/A"}</DetailRow>
        )}

        {isTechnician && (
          <DetailRow label="Reported by">{ticket.created_by?.name || "Unknown"}</DetailRow>
        )}

        <DetailRow label="Description">
          <span className="whitespace-pre-line">{ticket.description}</span>
        </DetailRow>

        <DetailRow label="Status">
          <StatusBadge status={ticket.status} />
        </DetailRow>

        <DetailRow label="Priority">
          <PriorityBadge priority={ticket.priority} />
        </DetailRow>

        <DetailRow label="Assigned to">{ticket.assigned_to?.name || "Unassigned"}</DetailRow>

        <DetailRow label="Date created">{new Date(ticket.date_created).toLocaleDateString()}</DetailRow>

        {ticket.date_resolved && (
          <DetailRow label="Date resolved">{new Date(ticket.date_resolved).toLocaleDateString()}</DetailRow>
        )}
      </div>

      {/* Remarks Section */}
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Remarks</h2>
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-4">
          {ticket.remarks && ticket.remarks.length > 0 ? (
            ticket.remarks.map((remark) => (
              <div key={remark._id} className="border-b pb-4 last:border-b-0">
                <p className="text-gray-800">{remark.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  - {remark.author?.name || "Unknown User"} ({remark.author?.role}) on {new Date(remark.date).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No remarks yet.</p>
          )}
        </div>
      </div>

      {/* Add Remark Form */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-2">Add a Remark</h3>
        <textarea
          value={newRemark}
          onChange={(e) => setNewRemark(e.target.value)}
          className="w-full p-2 border rounded-md"
          rows="3"
          placeholder="Type your comment here..."
        ></textarea>
        <button
          onClick={handleAddRemark}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Submit Remark
        </button>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <button
          disabled={!isTechnician}
          onClick={() => navigate(`/tickets/${ticket._id}/edit`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Edit Ticket
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
