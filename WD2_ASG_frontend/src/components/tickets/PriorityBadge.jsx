// This component displays a visual label (badge) for a ticket's priority
export default function PriorityBadge({ priority }) {
  const styles = {
    Low: "bg-gray-100 text-gray-700",
    Medium: "bg-blue-100 text-blue-700",
    High: "bg-orange-100 text-orange-700",
    Unassigned: "bg-gray-100 text-gray-700",
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
