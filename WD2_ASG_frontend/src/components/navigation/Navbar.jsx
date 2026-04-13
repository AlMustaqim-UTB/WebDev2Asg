import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../../auth/userAuth";
import { Menu, User, X, LogOut } from "lucide-react";
import UserNav from "./UserNav";
import TechnicianNav from "./TechnicianNav";

export default function Navbar() {
  const { user, logout } = userAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

  const navLinks = user.role === "user" ? <UserNav /> : <TechnicianNav />;

  return (
    <nav className="bg-[#274c77] text-[#e7ecef] px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="bg-white rounded p-1">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-[#a3cef1] transition-colors cursor-pointer"
              >
                <User size={20} />
                {user.name}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-[#274c77] rounded shadow">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-[#ef4444] hover:text-white rounded cursor-pointer text-red-500 font-medium transition-colors"
                  >
                    <LogOut size={16} className="inline-block mr-1" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl hover:text-[#a3cef1] transition-colors cursor-pointer"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div
          className={`md:hidden overflow-hidden transition-all duration-300
          ${mobileOpen ? "max-h-96 mt-4" : "max-h-0"}
        `}
        >
          <div className="space-y-4">
            {navLinks}

            <div className="border-t border-[#6096ba] pt-3 space-y-2">
              <div className="flex items-center">
                <User size={20} className="inline-block mr-1" />
                <p className="font-medium text-[#e7ecef]">{user.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-left text-red-500 font-medium w-full hover:text-[#e7ecef] transition-colors cursor-pointer"
              >
                <LogOut size={20} className="inline-block mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}