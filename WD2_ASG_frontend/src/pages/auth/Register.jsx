import { useAuth } from "../../auth/useAuth";

export default function Register({ setPage }) {
  const { login } = useAuth();

  const handleRegister = () => {
    // Fake register → auto login as user
    login("user");
    setPage("dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f2f2]">
      <div className=" bg-white rounded shadow content-center p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Register</h1>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Name"
        />
        <label className="block mb-2">Department</label>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Department"
        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="border p-2 w-full mb-4"
          placeholder="Email"
        />
        <label className="block mb-2">Password</label>
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
        />

        <button
          onClick={handleRegister}
          className="bg-[#022b3a] text-white px-4 py-2 w-full mb-2"
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
