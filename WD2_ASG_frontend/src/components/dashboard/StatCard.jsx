// UI design for the stat card component at the dashboard (Total tickets, open tickets, etc.)
export default function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
