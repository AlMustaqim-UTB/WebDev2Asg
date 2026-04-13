import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../../auth/userAuth";

export default function Register() {
  const { register } = userAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const result = await register(name, email, password, role, department);
    if (result.success) navigate("/login");
    else setError(result.msg);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen bg-[#f2f2f2]">
      <div className=" bg-white rounded shadow content-center w-full max-w-md">
        <h1 className="text-lg text-[#e7ecef] align-middle p-4">
          <img src="logo.png" alt="Logo" />
        </h1>
      </div>
      <form
        onSubmit={handleRegister}
        className="bg-white rounded shadow content-center p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="block mb-2">Department</label>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Enter Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className="block mb-2">Role</label>
        <select
          className="border p-2 w-full mb-4 cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select role
          </option>
          <option value="user">User</option>
          <option value="technician">Technician</option>
        </select>
        <button
          type="submit"
          className="bg-[#6096ba] text-white px-4 py-2 w-full mb-2 cursor-pointer hover:bg-[#4a7c9c] transition-colors"
        >
          Register
        </button>
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
