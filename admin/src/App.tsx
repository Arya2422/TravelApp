import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthPanel from "@/components/AuthPanel";
// import CreateAirport from "./pages/createairport";
import CreateFlight from "./pages/createflight";
import Home from "./pages/Home";
import ProtectedRoute from "./components/route/protectedroute";
import CreateTrain from "./pages/createtrain";

const App = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) setUserName(storedUser);
  }, []);

  const handleLoginSuccess = (user: { name: string }) => {
    setUserName(user.name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <h1 className="text-xl font-bold text-blue-600">Travel App</h1>

          <div className="flex items-center gap-6">
            <a href="/" className="hover:text-blue-600">Home</a>


            {/* Protected Pages */}
            {userName && (
              <>
                {/* <a href="/create-airport" className="hover:text-blue-600">
                  Create Airport
                </a> */}
                <a href="/create-flight" className="hover:text-blue-600">
                  Create Flight
                </a>
                <a href="/create-train" className="hover:text-blue-600">
               Create Train
                </a>
              </>
            )}

            {!userName ? (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Login / Sign Up
              </button>
            ) : (
              <>
                <span className="text-gray-700 font-medium">Hi, {userName}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/booking" element={<BookingPage />} /> */}

          {/* Protected */}
          {/* <Route
            path="/create-airport"
            element={
              <ProtectedRoute>
               <CreateAirport />
              </ProtectedRoute>
            }
          /> */}

          <Route
            path="/create-flight"
            element={
              <ProtectedRoute>
                <CreateFlight />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-train"
            element={
              <ProtectedRoute>
                <CreateTrain />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Auth Modal */}
        <AuthPanel
          show={authOpen}
          onClose={() => setAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </Router>
  );
};

export default App;
