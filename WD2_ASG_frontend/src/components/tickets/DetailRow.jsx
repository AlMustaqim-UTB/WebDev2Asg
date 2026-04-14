// A reusable layout component used to display a label on the left side and content on the right side
export default function DetailRow({ label, children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
      {/* Label */}
      <div className="text-sm font-medium text-gray-500">{label}</div>
      {/* Children */}
      <div className="md:col-span-3 text-gray-900">{children}</div>
    </div>
  );
}
