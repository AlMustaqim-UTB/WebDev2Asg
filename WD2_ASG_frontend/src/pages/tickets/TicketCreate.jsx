import { useState } from "react";
import DetailRow from "../../components/tickets/DetailRow";
import Navbar from "../../components/navigation/Navbar";

export default function TicketCreate({ setPage }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { title, category, description } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category || !description) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token"); // Get token from storage
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.msg || "Failed to create ticket");
      }

      // On successful creation, navigate back to the dashboard
      setPage("dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar />
      <div className="p-4 md:p-6 max-w-4xl mx-auto">
        {/* Page title */}
        <h1 className="text-xl md:text-2xl font-bold mb-6">Create Ticket</h1>

        {/* Form card */}
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

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Actions */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-[#096BAA] hover:opacity-90 text-white px-4 py-2 rounded w-full md:w-auto disabled:opacity-50 cursor-pointer"
          >
            {submitting ? "Submitting..." : "Submit Ticket"}
          </button>

          <button
            onClick={() => setPage("dashboard")}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full md:w-auto cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
