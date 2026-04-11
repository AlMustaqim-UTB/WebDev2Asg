import DetailRow from "../../components/tickets/DetailRow";

export default function TicketCreate({ setPage }) {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Page title */}
        <h1 className="text-xl md:text-2xl font-bold mb-6">Create Ticket</h1>

        {/* Form card */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 space-y-6">
          <DetailRow label="Title">
            <input
              type="text"
              placeholder="Enter ticket title"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096BAA]"
            />
          </DetailRow>

          <DetailRow label="Category">
            <select className="w-full border rounded px-3 py-2" defaultValue="">
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
              placeholder="Describe the problem in detail"
              className="w-full border rounded px-3 py-2 min-h-30 focus:outline-none focus:ring-2 focus:ring-[#096BAA]"
            />
          </DetailRow>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col md:flex-row gap-3">
          <button className="bg-[#096BAA] hover:opacity-90 text-white px-4 py-2 rounded w-full md:w-auto">
            Submit Ticket
          </button>

          <button
            onClick={() => setPage("dashboard")}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded w-full md:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
