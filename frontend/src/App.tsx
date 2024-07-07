import { Route, Routes } from "react-router-dom";
import "./App.css";
import { RegisterPage } from "./pages/auth/register";
import { LoginPage } from "./pages/auth/login";
import { DashboardPage } from "./pages/dashboard/dashboard";

function App() {
  const data = localStorage.getItem("jwt-token");

  return (
    <Routes>
      <Route path="/" element={data ? <DashboardPage /> : <LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
