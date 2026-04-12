import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../../auth/userAuth";

export default function Navbar() {
  const { user, logout } = userAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <Link to="/dashboard" className="hover:text-gray-300" onClick={() => setMobileOpen(false)}>
        Dashboard
      </Link>
      {/* Add other links here as needed, e.g., */}
      {/* <Link to="/tickets/new" className="hover:text-gray-300">Create Ticket</Link> */}
    </>
  );

  return (
    <nav className="bg-[#274c77] text-[#e7ecef] px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          HelpDesk
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks}
          {user && (
            <div className="flex items-center space-x-4">
              <span>{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col items-start space-y-4">
            {navLinks}
            <div className="border-t border-[#6096ba] pt-4 w-full space-y-2">
              {user && <p className="font-medium">{user.name}</p>}
              <button
                onClick={handleLogout}
                className="text-left text-red-400 font-medium w-full hover:text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
