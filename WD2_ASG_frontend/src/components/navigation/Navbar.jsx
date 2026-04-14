import { useEffect, useRef, useState } from "react"; // React hooks
import { Link, useLocation, useNavigate } from "react-router-dom"; // React router helpers
import { Menu, X, User, LogOut } from "lucide-react"; // Icons for menu, user, X button, and logout
import { useAuth } from "../../auth/userAuth"; // Auth context hook
import TechnicianNav from "./TechnicianNav"; // Technician navbar component
import UserNav from "./UserNav"; // User navbar component

export default function Navbar() {
  const { user, logout } = useAuth(); // Get the logged-in user and logout function from auth context
  const navigate = useNavigate(); // React router helpers
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false); // State for mobile menu toggle
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for desktop user dropdown
  const dropdownRef = useRef(null); // Ref used to detect clicks outside the dropdown

  // Check if the current page is Login or Register
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Handle logout action: logs the user out, closes menus, redirects to login page
  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  // Closes the user dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // No navbar in login/register page or when user is not
  if (isAuthPage || !user) return null;

  // Render navigation links based on user role
  const renderNavLinks = () =>
    user.role === "technician" ? <TechnicianNav /> : <UserNav />;

  return (
    <nav className="bg-[#274c77] text-[#e7ecef] px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo in the navbar */}
        <Link to="/dashboard" className="bg-white rounded p-1">
          <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
        </Link>

        {/* Desktop menu / navigation (hidden on mobile view / small screens) */}
        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}

          {/* Desktop user dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-1 hover:text-[#a3cef1] transition-colors cursor-pointer"
              >
                <User size={20} />
                {user.name}
              </button>
              {/* Dropdown menu */}
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

        {/* Mobile menu button (with hamburger icon) */}
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
            {renderNavLinks()}

            {/* Mobile user logout */}
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
