import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DetailRow from "../../components/tickets/DetailRow";
import StatusBadge from "../../components/tickets/StatusBadge";
import PriorityBadge from "../../components/tickets/PriorityBadge";
import { useAuth } from "../../auth/userAuth";
import toast from "react-hot-toast";

const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, "");

export default function TicketDetail() {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newRemark, setNewRemark] = useState("");

  useEffect(() => {
    if (id === "new") {
      navigate("/create-ticket", { replace: true });
      return;
    }

    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API}/api/tickets/id/${id}`, {
          credentials: "include",
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(
            data.msg ||
              data.message ||
              `HTTP error! status: ${response.status}`,
          );
        }

        setTicket(data);
      } catch (err) {
        setError(err.message || "Failed to fetch ticket");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTicket();
  }, [id, navigate]);

  const handleAddRemark = async () => {
    if (!newRemark.trim() || !ticket?._id) return;

    try {
      setError(null);

      const response = await fetch(`${API}/api/tickets/${ticket._id}/remarks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message: newRemark.trim() }),
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.msg || data.message || "Failed to add remark");
      }

      const refresh = await fetch(`${API}/api/tickets/id/${ticket._id}`, {
        credentials: "include",
      });
      const refreshed = await refresh.json().catch(() => ({}));
      if (refresh.ok) setTicket(refreshed);

      setNewRemark("");

      toast.success("Remark added successfully");
    } catch (err) {
      setError(err.message || "Failed to add remark");
      toast.error(msg);
      setError(msg);
    }
  };

  if (loading) return <div>Loading ticket details...</div>;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
  if (!ticket) return <div>Ticket not found</div>;

  const isTechnician = user?.role === "technician";
  const ticketKey =
    ticket.key || (ticket._id ? `#${String(ticket._id).slice(-6)}` : "N/A");
  const createdDate = ticket.date_created || ticket.createdAt;
  const resolvedDate = ticket.date_resolved || ticket.resolvedAt;

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Ticket {ticketKey}
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
            {createdDate ? new Date(createdDate).toLocaleDateString() : "N/A"}
          </DetailRow>

          {resolvedDate && (
            <DetailRow label="Date resolved">
              {new Date(resolvedDate).toLocaleDateString()}
            </DetailRow>
          )}
        </div>

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          {isTechnician && (
            <button
              onClick={() => navigate(`/edit-ticket/${ticket._id}`)}
              className="bg-[#274c77] hover:opacity-90 text-white px-4 py-2 rounded cursor-pointer"
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

        <div className="mt-6 bg-white rounded-lg shadow-sm p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Remarks</h2>

          <textarea
            value={newRemark}
            onChange={(e) => setNewRemark(e.target.value)}
            className="w-full border rounded px-3 py-2 min-h-20"
            placeholder="Add a remark..."
          />

          <div className="flex flex-col md:flex-row gap-3">
            <button
              onClick={handleAddRemark}
              className="mt-2 bg-[#6096ba] hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer "
            >
              Submit Remark
            </button>
          </div>
          <div className="space-y-4 mt-5">
            {ticket.remarks && ticket.remarks.length > 0 ? (
              ticket.remarks.map((remark) => {
                const remarkDate = remark.date || remark.createdAt;
                return (
                  <div
                    key={remark._id}
                    className="border-l-4 border-[#6096ba] pl-3"
                  >
                    <p className="text-sm">{remark.message}</p>
                    <p className="text-xs text-[#8b8c89] mt-1">
                      {remark.author?.name || "Unknown User"} (
                      {remark.author?.role || "user"}) ·{" "}
                      {remarkDate
                        ? new Date(remarkDate).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500">No remarks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
