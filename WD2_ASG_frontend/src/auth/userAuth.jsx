import { createContext, useContext, useEffect, useState } from "react";

// Create a context to hold authentication state across the application
const AuthContext = createContext(null);

// Determine the base API URL from environment variables, defaulting to localhost for development
const RAW_API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Cleaning up the URL
const API = RAW_API.replace(/\/+$/, "").replace(/\/api$/i, "");

export function AuthProvider({ children }) {
  // State to hold the authenticated user's data
  const [user, setUser] = useState(null);
  // State to manage the loading state while checking the initial authentication status
  const [loading, setLoading] = useState(true);

  // Function to check if the user is already logged in by verifying their session with the backend
  const refreshUser = async () => {
    try {
      const res = await fetch(`${API}/api/auth/me`, { credentials: "include" });
      if (!res.ok) return setUser(null); // Clear user if session is invalid
      const data = await res.json();
      setUser(data); // Set user data if valid session exists
    } catch {
      setUser(null); // Clear user on network or fetch error
    } finally {
      setLoading(false); // Ensure loading state is turned off regardless of success or failure
    }
  };

  // Run the refreshUser check once when the AuthProvider component mounts
  useEffect(() => {
    refreshUser();
  }, []);

  // Function to handle logging in
  const login = async (email, password) => {
    const res = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Ensure cookies/sessions are sent
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.msg || "Login failed");
    
    // Update user state upon successful login
    setUser(data);
  };

  // Function to handle logging out
  const logout = async () => {
    // Notify the backend to destroy the session/clear cookies
    await fetch(`${API}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => {}); // Silently fail if there's a network issue during logout
    
    // Clear local user state
    setUser(null);
  };

  // Provide the authentication state and functions to all child components
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to easily access the AuthContext inside other components
export const useAuth = () => useContext(AuthContext);
