export default function UserDashboard({ setPage, setTicketId }) {
  const tickets = [{ id: 1, title: "Login Issue" }];

  return tickets.map((t) => (
    <div
      key={t.id}
      onClick={() => {
        setTicketId(t.id);
        setPage("detail");
      }}
      className="p-4 border m-2 cursor-pointer"
    >
      {t.title}
    </div>
  ));
}
