import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;
