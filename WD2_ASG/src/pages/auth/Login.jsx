import { useState } from "react";
import { useAuth } from "../../auth/useAuth";

export default function Login({ setPage }) {
  const { login } = useAuth();
  const [role, setRole] = useState("user");

  const handleLogin = () => {
    login(role);
    setPage("dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <label className="block mb-2">Role</label>
      <select
        className="border p-2 w-full mb-4"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="user">User</option>
        <option value="technician">Technician</option>
      </select>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 w-full mb-2"
      >
        Login
      </button>

      <p className="text-sm text-center">
        Don’t have an account?{" "}
        <button
          className="text-blue-600 underline"
          onClick={() => setPage("register")}
        >
          Register
        </button>
      </p>
    </div>
  );
}
