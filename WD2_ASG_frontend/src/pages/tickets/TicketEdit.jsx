import { useState } from "react";
import { useAuth } from "../../auth/useAuth";
import DetailRow from "../../components/tickets/DetailRow";

export default function TicketEdit({ id, setPage }) {
  const { user } = useAuth();

  const isUser = user.role === "user";
  const isTechnician = user.role === "technician";

  // Mock ticket state (API later)
  const [ticket, setTicket] = useState({
    id,
    title: "Login not working",
    category: "Authentication",
    department: "IT Support",
    description: "User cannot log in using correct credentials.",
    status: "Resolved",
    priority: "High",
    assignedTo: "Technician B",
    resolvedAt: "",
    remarks: [],
  });

  const [newRemark, setNewRemark] = useState("");

  const handleChange = (field, value) => {
    setTicket((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddRemark = () => {
    if (!newRemark.trim()) return;

    setTicket((prev) => ({
      ...prev,
      remarks: [
        ...prev.remarks,
        {
          id: Date.now(),
          author: user.name,
          message: newRemark,
          createdAt: new Date().toLocaleString(),
        },
      ],
    }));

    setNewRemark("");
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Edit Ticket #{ticket.id}
      </h1>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6">
        <DetailRow label="Title">{ticket.title}</DetailRow>

        <DetailRow label="Category">
          {isTechnician ? (
            <select
              className="w-full border rounded px-3 py-2"
              value={ticket.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              <option>Authentication</option>
              <option>Network</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Other</option>
            </select>
          ) : (
            ticket.category
          )}
        </DetailRow>

        {isTechnician && (
          <DetailRow label="Department">
            <input
              className="w-full border rounded px-3 py-2"
              value={ticket.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </DetailRow>
        )}

        <DetailRow label="Description">{ticket.description}</DetailRow>

        <DetailRow label="Status">
          {isTechnician || isUser ? (
            <select
              className="w-full border rounded px-3 py-2"
              value={ticket.status}
              onChange={(e) => {
                const value = e.target.value;
                handleChange("status", value);
                if (value === "Resolved") {
                  handleChange("resolvedAt", new Date().toLocaleDateString());
                }
              }}
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
              {isUser && <option>Closed</option>}
            </select>
          ) : (
            ticket.status
          )}
        </DetailRow>

        <DetailRow label="Priority">
          {isTechnician ? (
            <select
              className="w-full border rounded px-3 py-2"
              value={ticket.priority}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          ) : (
            ticket.priority
          )}
        </DetailRow>

        {isTechnician && (
          <DetailRow label="Assigned to">
            <input
              className="w-full border rounded px-3 py-2"
              value={ticket.assignedTo}
              onChange={(e) => handleChange("assignedTo", e.target.value)}
            />
          </DetailRow>
        )}

        {isTechnician && (
          <DetailRow label="Technician Remarks">
            <div className="space-y-3">
              <textarea
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                className="w-full border rounded px-3 py-2 min-h-[80px]"
                placeholder="Add internal remark"
              />

              <button
                onClick={handleAddRemark}
                className="bg-[#274c77] text-white px-3 py-2 rounded"
              >
                Add Remark
              </button>

              {ticket.remarks.map((r) => (
                <div key={r.id} className="border-l-4 border-[#6096ba] pl-3">
                  <p className="text-sm">{r.message}</p>
                  <p className="text-xs text-[#8b8c89]">
                    {r.author} · {r.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </DetailRow>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>

        <button
          onClick={() => setPage("detail")}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
