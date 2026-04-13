import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailRow from "../../components/tickets/DetailRow";
import StatusBadge from "../../components/tickets/StatusBadge";
import PriorityBadge from "../../components/tickets/PriorityBadge";
import userAuth from "../../auth/userAuth";
import Navbar from "../../components/navigation/Navbar";

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
          throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`,
          );
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
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Ticket {ticket.key}
        </h1>
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6">
          <DetailRow label="Title">{ticket.title}</DetailRow>

          <DetailRow label="Category">{ticket.category}</DetailRow>

          {isTechnician && (
            <DetailRow label="Department">
              {ticket.created_by?.department || "N/A"}
            </DetailRow>
          )}

          {isTechnician && (
            <DetailRow label="Reported by">
              {ticket.created_by?.name || "Unknown"}
            </DetailRow>
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

          <DetailRow label="Assigned to">
            {ticket.assigned_to?.name || "Unassigned"}
          </DetailRow>

          <DetailRow label="Date created">
            {new Date(ticket.date_created).toLocaleDateString()}
          </DetailRow>

          {ticket.date_resolved && (
            <DetailRow label="Date resolved">
              {new Date(ticket.date_resolved).toLocaleDateString()}
            </DetailRow>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          {isTechnician && (
            <button
              onClick={() => navigate(`/tickets/${ticket._id}/edit`)}
              className="bg-[#6096ba] hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer"
            >
              Edit Ticket
            </button>
          )}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Remarks Section */}

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Remarks</h2>

          <textarea
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            className="w-full border rounded px-3 py-2 min-h-20"
            placeholder="Add a remark..."
          />

          {/* Add Remark button right aligned */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleAddRemark}
              className="mt-2 bg-[#274c77] hover:opacity-90 text-white px-4 py-2 rounded cursor-pointer"
            >
              Submit Remark
            </button>
          </div>
          <div className="space-y-4 mt-5">
            {ticket.remarks && ticket.remarks.length > 0 ? (
              ticket.remarks.map((remark) => (
                <div
                  key={remark._id}
                  className="border-l-4 border-[#6096ba] pl-3"
                >
                  <p className="text-sm">{remark.message}</p>
                  <p className="text-xs text-[#8b8c89] mt-1">
                    {remark.author?.name || "Unknown User"} (
                    {remark.author?.role}) ·{" "}
                    {new Date(remark.date).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No remarks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
