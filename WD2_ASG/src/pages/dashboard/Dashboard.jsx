import { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import TechnicianDashboard from './TechnicianDashboard';
import UserDashboard from './UserDashboard';
import TicketCreate from '../tickets/TicketCreate';
import TicketEdit from '../tickets/TicketEdit';
import TicketDetail from '../tickets/TicketDetail';

export default function Dashboard() {
  const { user } = useAuth();
  const [page, setPage] = useState('dashboard');
  const [ticketId, setTicketId] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'create':
        return <TicketCreate setPage={setPage} />;
      case 'edit':
        // Ensure ticketId is passed as a prop here
        return <TicketEdit setPage={setPage} ticketId={ticketId} />;
      case 'detail':
        return <TicketDetail setPage={setPage} ticketId={ticketId} />;
      case 'dashboard':
      default:
        if (user?.role === 'technician') {
          return <TechnicianDashboard setPage={setPage} setTicketId={setTicketId} />;
        }
        return <UserDashboard setPage={setPage} setTicketId={setTicketId} />;
    }
  };

  return <div>{renderPage()}</div>;
}
