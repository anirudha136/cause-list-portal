import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import PublicDashboard from "./components/PublicDashboard";
import Login from "./components/Login";
import OfficerDashboard from "./components/OfficerDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/officer" element={<OfficerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
