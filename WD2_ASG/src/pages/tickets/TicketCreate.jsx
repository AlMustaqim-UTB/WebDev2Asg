import { useState } from 'react';
import TicketForm from "../../components/tickets/TicketForm";

export default function TicketCreate({ setPage }) {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/ticket/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to create ticket');
      
      const data = await response.json();
      console.log('Ticket created:', data);
      setPage("dashboard");
    } catch (err) {
      setError(err.message);
      console.error('Error creating ticket:', err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>
      <TicketForm 
        formData={formData} 
        handleChange={handleChange} 
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </div>
  );
}
