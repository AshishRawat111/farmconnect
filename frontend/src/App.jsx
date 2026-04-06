import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Weather from "./pages/Weather";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast"; // 👈 Added This

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 🍎 Apple Style Toaster Configuration */}
        <Toaster 
          position="top-center" 
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#0c0c0c',
              color: '#fff',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '14px',
              padding: '12px 24px',
              backdropFilter: 'blur(10px)'
            },
            success: {
              iconTheme: { primary: '#10b981', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="weather" element={<Weather />} />
          <Route path="about Us" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;