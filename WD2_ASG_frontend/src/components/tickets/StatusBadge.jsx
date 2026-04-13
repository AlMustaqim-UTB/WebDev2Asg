export default function StatusBadge({ status }) {
  const styles = {
    Open: "bg-red-100 text-red-700",
    "In Progress": "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded ${styles[status]}`}
    >
      {status}
    </span>
  );
}
