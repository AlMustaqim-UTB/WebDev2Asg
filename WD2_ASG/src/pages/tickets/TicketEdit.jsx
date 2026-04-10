import { useState, useEffect } from 'react';
import { useAuth } from '../../auth/useAuth';
import TicketForm from '../../components/tickets/TicketForm';

export default function TicketEdit({ ticketId, setPage }) {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { user } = useAuth();

  // Fetch the existing ticket data when the component loads
  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/ticket/${ticketId}`);
        if (!response.ok) throw new Error('Failed to fetch ticket data');
        const data = await response.json();
        setFormData({ title: data.title, description: data.description });
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    if (ticketId) {
      fetchTicket();
    }
  }, [ticketId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/ticket/${ticketId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Failed to update ticket');

      await response.json();
      setPage("dashboard"); // Go back to the dashboard after successful edit
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  if (loading && !formData.title) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Ticket</h2>
      <TicketForm
        formData={formData}
        handleChange={handleChange}
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
