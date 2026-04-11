import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../auth/useAuth";
import UserNav from "./UserNav";
import TechnicianNav from "./TechnicianNav";

export default function Navbar({ setPage }) {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks =
    user.role === "user" ? (
      <UserNav
        setPage={(p) => {
          setPage(p);
          setMobileOpen(false);
        }}
      />
    ) : (
      <TechnicianNav
        setPage={(p) => {
          setPage(p);
          setMobileOpen(false);
        }}
      />
    );

  return (
    <nav className="bg-[#274c77] text-[#e7ecef] px-4 py-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        {/* App name */}
        <h1 className="text-lg font-bold">TicketFlow</h1>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks}

          {/* User dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-[#a3cef1] transition-colors"
            >
              {user.name}
              <span className="text-xs opacity-70">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-[#e7ecef] text-[#274c77] rounded shadow">
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 hover:bg-[#a3cef1] rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-2xl hover:text-[#a3cef1] transition-colors"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300
          ${mobileOpen ? "max-h-96 mt-4" : "max-h-0"}
        `}
      >
        <div className="space-y-4">
          {navLinks}

          <div className="border-t border-[#6096ba] pt-3 space-y-2">
            <p className="text-sm text-[#8b8c89]">Signed in as</p>
            <p className="font-medium">{user.name}</p>
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="text-left text-red-400 font-medium w-full hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
