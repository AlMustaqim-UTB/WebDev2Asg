import { NavLink } from "react-router-dom";

// Navigation component is only show for normal users
export default function UserNav({}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      {/* Dashboard link/button */}
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `w-full md:w-auto text-left transition-colors hover:text-[#a3cef1]
           ${isActive ? "font-bold" : "font-normal"}`
        }
      >
        Dashboard
      </NavLink>

      {/* Create new ticket link/button */}
      <NavLink
        to="/tickets/new"
        className={({ isActive }) =>
          `w-full md:w-auto text-left transition-colors hover:text-[#a3cef1]
           ${isActive ? "font-bold" : "font-normal"}`
        }
      >
        Create Ticket
      </NavLink>
    </div>
  );
}
