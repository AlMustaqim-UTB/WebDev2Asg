import { useState } from "react";
import { useAuth } from "./auth/useAuth";

import Navbar from "./components/navigation/Navbar";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import TicketCreate from "./pages/tickets/TicketCreate";
import TicketDetail from "./pages/tickets/TicketDetail";
import TicketEdit from "./pages/tickets/TicketEdit";

function App() {
  const { user } = useAuth();
  const [page, setPage] = useState("login");
  const [ticketId, setTicketId] = useState(null);

  if (!user) {
    return page === "register" ? (
      <Register setPage={setPage} />
    ) : (
      <Login setPage={setPage} />
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <Navbar setPage={setPage} />
      {page === "dashboard" && (
        <Dashboard setPage={setPage} setTicketId={setTicketId} />
      )}
      {page === "create" && <TicketCreate setPage={setPage} />}
      {page === "detail" && <TicketDetail id={ticketId} setPage={setPage} />}
      {page === "edit" && <TicketEdit id={ticketId} setPage={setPage} />}
    </div>
  );
}

export default App;
