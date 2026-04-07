export default function TechnicianDashboard({ setPage, setTicketId }) {
  const tickets = [
    { id: 1, title: "Server Down" },
    { id: 2, title: "Network Issue" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Technician Dashboard</h1>

      {tickets.map((t) => (
        <div
          key={t.id}
          className="border p-4 mb-2 cursor-pointer"
          onClick={() => {
            setTicketId(t.id);
            setPage("detail");
          }}
        >
          {t.title}
        </div>
      ))}
    </div>
  );
}
