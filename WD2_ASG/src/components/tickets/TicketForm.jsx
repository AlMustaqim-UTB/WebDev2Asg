import { useState } from 'react';

export default function TicketForm({ readonly, formData, handleChange }) {
  return (
    <>
      <input
        disabled={readonly}
        className="border p-2 w-full mb-2"
        placeholder="Title"
        name="title"
        value={formData?.title || ''}
        onChange={handleChange}
      />
      <textarea 
        disabled={readonly} 
        className="border p-2 w-full mb-2"
        name="description"
        value={formData?.description || ''}
        onChange={handleChange}
        placeholder="Description"
      />
    </>
  );
}
