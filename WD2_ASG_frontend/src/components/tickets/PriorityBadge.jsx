export default function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Critical: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-sm rounded ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}
``;
