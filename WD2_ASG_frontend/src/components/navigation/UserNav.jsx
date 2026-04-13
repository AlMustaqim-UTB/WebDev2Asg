import { NavLink } from "react-router-dom";

export default function UserNav({}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-start">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `w-full md:w-auto text-left transition-colors hover:text-[#a3cef1]
           ${isActive ? "font-bold" : "font-normal"}`
        }
      >
        Dashboard
      </NavLink>

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
