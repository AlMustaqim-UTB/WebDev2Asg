export default function DetailRow({ label, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="md:col-span-3 text-gray-900">{children}</div>
    </div>
  );
}
