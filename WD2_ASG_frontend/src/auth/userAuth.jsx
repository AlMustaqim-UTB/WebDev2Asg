import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function decodeUserFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload?.user || null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Use the proxy by making a relative request
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const raw = await res.text();
      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        return { success: false, msg: "Invalid server response." };
      }

      if (!res.ok) return { success: false, msg: data.message || "Login failed." };
      if (!data.token) return { success: false, msg: "Token not received from server." };

      const decodedUser = decodeUserFromToken(data.token);
      localStorage.setItem("token", data.token);
      if (decodedUser) {
        localStorage.setItem("user", JSON.stringify(decodedUser));
        setUser(decodedUser);
      }

      return { success: true };
    } catch {
      return { success: false, msg: "Cannot connect to the server. Please try again later." };
    }
  };

  const register = async (name, email, password, role, department) => {
    try {
      // Use the proxy by making a relative request
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, department }),
      });

      const raw = await res.text();
      let data = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        return { success: false, msg: "Invalid server response." };
      }

      if (!res.ok) return { success: false, msg: data.message || "Registration failed." };

      if (data.token) {
        const decodedUser = decodeUserFromToken(data.token);
        localStorage.setItem("token", data.token);
        if (decodedUser) {
          localStorage.setItem("user", JSON.stringify(decodedUser));
          setUser(decodedUser);
        }
      }

      return { success: true };
    } catch {
      return { success: false, msg: "Cannot connect to the server. Please try again later." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("userAuth must be used within <AuthProvider>");
  return ctx;
}

// keep this name as requested
export default function userAuth() {
  return useAuth();
}
