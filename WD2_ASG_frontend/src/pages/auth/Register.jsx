import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAuth from "../../auth/userAuth";

export default function Register() {
  const { register } = userAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
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
    <div className="flex items-center justify-center min-h-screen bg-[#f2f2f2]">
      <form onSubmit={handleRegister} className="bg-white rounded shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input className="border p-2 w-full mb-3" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" className="border p-2 w-full mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="border p-2 w-full mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input className="border p-2 w-full mb-3" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
        <select className="border p-2 w-full mb-4" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="technician">Technician</option>
        </select>
        <button type="submit" className="bg-[#1f7a8c] text-white px-4 py-2 w-full mb-2">Register</button>
        <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link></p>
      </form>
    </div>
  );
}
