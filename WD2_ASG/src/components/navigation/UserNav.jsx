export default function UserNav({ setPage }) {
  return (
    <>
      <button onClick={() => setPage("dashboard")}>Dashboard</button>
      <button onClick={() => setPage("create")}>Create Ticket</button>
    </>
  );
}
``;
