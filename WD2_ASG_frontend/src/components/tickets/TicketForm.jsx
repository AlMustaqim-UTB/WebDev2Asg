export default function TicketForm({ readonly }) {
  return (
    <>
      <input
        disabled={readonly}
        className="border p-2 w-full mb-2"
        placeholder="Title"
      />
      <textarea disabled={readonly} className="border p-2 w-full mb-2" />
    </>
  );
}
