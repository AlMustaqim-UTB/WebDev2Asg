import TicketForm from "../../components/tickets/TicketForm";

export default function TicketCreate({ setPage }) {
  return (
    <div className="p-6">
      <TicketForm />
      <button onClick={() => setPage("dashboard")}>Submit</button>
    </div>
  );
}
``;
