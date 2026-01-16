import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Employee Management
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Sign in to continue
        </p>

        {/* Mock Inputs (UI only) */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          * Mock login – no credentials required
        </p>
      </div>
    </div>
  );
};

export default Login;
