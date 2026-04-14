import { useState } from "react"; // React hook
import { Link, useNavigate } from "react-router-dom"; // React router helpers
import { useAuth } from "../../auth/userAuth"; // Auth context hook
import toast from "react-hot-toast"; // Popups/notifications for user feedback

// API base URL
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Register Page - Responsible for user account registration

export default function Register() {
  const navigate = useNavigate(); // Used to redirect user
  const { login } = useAuth(); // Access login function from authentication context (used for auto-login)

  // Form state for registration inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    department: "",
  });
  const [error, setError] = useState(""); // Add error state
  const [submitting, setSubmitting] = useState(false); // Submission state

  // Updates form state dynamically based on input name
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Handles user registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // Sends registration request to backend
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({})); // Parses response safely

      if (!res.ok) throw new Error(data.msg || "Registration failed"); // Handles failed response

      await login(formData.email, formData.password); // Automatically log in user after successful registration

      toast.success("Account created successfully!"); // Success feedback using toast popup

      // Delay navigation briefly then redirect user to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      toast.error(err.message || "Registration failed"); // Error feedback using toast popup
      setError(err.message || "Registration failed"); // Set error message to display to the user
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-[#f2f2f2]">
      {/* Logo */}
      <div className=" bg-white rounded shadow content-center w-full max-w-md">
        <h1 className="text-lg text-[#e7ecef] align-middle p-4">
          <img src="logo.png" alt="Logo" />
        </h1>
      </div>

      {/* Registration Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow content-center p-8 w-full max-w-md"
      >
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {/* Error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Name input */}
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
            required
          />
        </div>

        {/* Department input */}
        <div>
          <label className="block mb-2">Department</label>
          <input
            type="text"
            name="department"
            placeholder="Enter Email"
            value={formData.department}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
            required
          />
        </div>

        {/* Email input */}
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
            required
          />
        </div>

        {/* Password input */}
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
            minLength={6}
            required
          />
        </div>

        {/* Role dropdown selection input */}
        <div>
          <label className="block mb-2">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 w-full mb-4 cursor-pointer"
          >
            <option value="user">User</option>
            <option value="technician">Technician</option>
          </select>
        </div>

        {/* Register button */}
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#6096ba] text-white px-4 py-2 w-full mb-2 cursor-pointer hover:bg-[#4a7c9c] transition-colors disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>

        {/* Navigation link to login page */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
