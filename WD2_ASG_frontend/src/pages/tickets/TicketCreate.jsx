import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DetailRow from "../../components/tickets/DetailRow";
import toast from "react-hot-toast";

// API base URL
const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, ""); // Clean up the API URL to avoid double slashes or /api/api

export default function TicketCreate({ setPage }) {
  const navigate = useNavigate();

  // Stores form input values
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });

  // Stores validation or server error messages
  const [error, setError] = useState(null);

  // Prevents double submission
  const [submitting, setSubmitting] = useState(false);

  const { title, category, description } = formData;

  // Handles input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Navigation
  const goDashboard = () => {
    if (typeof setPage === "function") setPage("dashboard");
    else navigate("/dashboard");
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Client-side validation
    if (!title || !category || !description) {
      setError("All fields are required.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      // API call to create ticket
      const res = await fetch(`${API}/api/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      // Response handling
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.msg || "Failed to create ticket");

      toast.success("Ticket created successfully");

      setTimeout(() => {
        goDashboard();
      }, 1000);

      goDashboard();
    } catch (err) {
      setError(err.message || "Failed to create ticket");
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-xl md:text-2xl font-bold mb-6">Create Ticket</h1>

        {/* Create ticket form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6"
        >
          <DetailRow label="Title">
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              placeholder="Enter ticket title"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096BAA]"
            />
          </DetailRow>

          <DetailRow label="Category">
            <select
              name="category"
              value={category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 cursor-pointer"
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Authentication">Authentication</option>
              <option value="Network">Network</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Other">Other</option>
            </select>
          </DetailRow>

          <DetailRow label="Description">
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              placeholder="Describe the problem in detail"
              className="w-full border rounded px-3 py-2 min-h-30 focus:outline-none focus:ring-2 focus:ring-[#096BAA]"
            />
          </DetailRow>
        </form>

        {/* Error message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}

        <div className="mt-6 flex flex-col md:flex-row gap-3">
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[#096BAA] hover:opacity-90 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Submitting..." : "Submit Ticket"}
          </button>

          {/* Cancel button */}
          <button
            onClick={goDashboard}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full md:w-auto cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
