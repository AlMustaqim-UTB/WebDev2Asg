import { useAuth } from "../../auth/useAuth";

export default function Register({ setPage }) {
  const { login } = useAuth();

  const handleRegister = () => {
    // Fake register → auto login as user
    login("user");
    setPage("dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input className="border p-2 w-full mb-2" placeholder="Name" />
      <input className="border p-2 w-full mb-2" placeholder="Email" />
      <input
        className="border p-2 w-full mb-4"
        type="password"
        placeholder="Password"
      />

      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-4 py-2 w-full mb-2"
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
  );
}
