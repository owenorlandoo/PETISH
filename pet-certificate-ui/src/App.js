import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import UserDashboard from "./pages/UserDashboard";
import ShelterDashboard from "./pages/ShelterDashboard";
import VetDashboard from "./pages/VetDashboard";       // ← Tambahkan ini
import OwnerDashboard from "./pages/OwnerDashboard";   // ← Tambahkan ini


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        src="/Petish_Logo.png"
        <Route path="/shelter" element={<ShelterDashboard />} />
        <Route path="/vet" element={<VetDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/user" element={<UserDashboard />} />
        {/* dll */}
      </Routes>
    </Router>
  );
}

export default App;

