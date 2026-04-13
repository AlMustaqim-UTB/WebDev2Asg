import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/userAuth";
import toast from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Add error state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      await login(formData.email, formData.password);
      toast.success("Logged in successfully!");

      // Redirect on successful login
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      const msg = error.message || "Login failed";
      toast.error(msg);
      setError(error.message); // Set error message to display to the user
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-[#f2f2f2]">
      <div className=" bg-white rounded shadow content-center w-full max-w-md">
        <h1 className="text-lg text-[#e7ecef] align-middle p-4">
          <img src="logo.png" alt="Logo" />
        </h1>
      </div>
      <form
        onSubmit={handleLogin}
        className=" bg-white rounded shadow content-center p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Enter email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="bg-[#274c77] text-white px-4 py-2 w-full mb-2 cursor-pointer hover:bg-[#6096ba] transition-colors"
        >
          Login
        </button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
