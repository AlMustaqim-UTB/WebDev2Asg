export default function UserNav({ setPage }) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      <button
        onClick={() => setPage("dashboard")}
        className="w-full md:w-auto text-left hover:text-[#a3cef1] transition-colors"
      >
        Dashboard
      </button>

      <button
        onClick={() => setPage("create")}
        className="w-full md:w-auto text-left hover:text-[#a3cef1] transition-colors"
      >
        Create Ticket
      </button>
    </div>
  );
}
