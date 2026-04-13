import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    department: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.msg || "Registration failed");

      // Keep auth context in sync immediately
      await login(formData.email, formData.password);

      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f2f2] p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-8 w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold">Register</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full"
            minLength={6}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Department</label>
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="user">User</option>
            <option value="technician">Technician</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#274c77] text-white px-4 py-2 w-full rounded hover:bg-[#6096ba] disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline hover:text-blue-800">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
