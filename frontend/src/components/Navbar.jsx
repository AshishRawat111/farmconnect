import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sprout, LogOut } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Marketplace", path: "/marketplace" },
  { label: "Weather", path: "/weather" },
  { label: "About", path: "/about Us" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // 🔐 check login (token based)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuth(!!token);
  }, []);

  // 🚪 logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      
      <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-white">
            FarmConnect
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-4 py-2 text-sm rounded-md transition ${
                location.pathname === l.path
                  ? "bg-green-500/20 text-green-400"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {!isAuth ? (
            <>
              {/* Login */}
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 text-sm rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition"
              >
                Login
              </button>

              {/* Signup */}
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-1.5 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 bg-black/30 backdrop-blur-lg border-t border-white/10">
          
          {navLinks.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className="block py-2 text-gray-300 hover:text-white transition"
            >
              {l.label}
            </Link>
          ))}

          {/* Mobile Buttons */}
          <div className="mt-4 flex gap-2">
            
            {!isAuth ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="flex-1 text-center py-2 rounded-lg border border-white/20 text-gray-300 hover:bg-white/10 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/signup");
                    setOpen(false);
                  }}
                  className="flex-1 text-center py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
                >
                  Start
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="w-full text-center py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;