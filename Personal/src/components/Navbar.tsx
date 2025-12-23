import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AuthPanel from "./AuthPanel";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // ✅ Check for token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");

    if (token && userName) {
      setUser({ name: userName });
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // ✅ Handle successful login
  const handleLoginSuccess = (userData: { name: string }) => {
    setUser(userData);
    setShowAuth(false);
  };

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
          duration: 0.6,
        }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-lg shadow-lg rounded-full px-10 py-3 flex items-center justify-between gap-8 z-50 border border-gray-200 w-[90%] max-w-3xl"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <span className="text-lg font-semibold text-gray-800">Travelling is A Hobby</span>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6 relative">
          {/* ✅ If logged in, show profile dropdown */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
              >
                <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center rounded-full font-bold uppercase shadow-md">
                  {user.name[0]}
                </div>
                <span className="font-medium text-gray-800 hidden sm:block">{user.name}</span>
                <svg 
                  className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 bg-white border border-gray-200 shadow-xl rounded-xl py-2 w-48 text-sm overflow-hidden"
                  >
                    <div 
                      className="px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition" 
                      onClick={() => {
                        navigate("/dashboard");
                        setShowDropdown(false);
                      }}
                    >
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Manage your account</p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2.5 hover:bg-red-50 text-gray-700 hover:text-red-600 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-medium">Logout</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="text-gray-800 hover:text-gray-600 font-medium transition cursor-pointer"
            >
              Log in / Sign up
            </button>
          )}
        </div>
      </motion.nav>

      {/* Auth Panel */}
      <AuthPanel 
        show={showAuth} 
        onClose={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default Navbar;