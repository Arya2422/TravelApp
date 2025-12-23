import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import FlightBooking from "./pages/FlightBooking";
import Dashboard from "./pages/Dashboard";
import TravelBookingSystem from "./pages/Home";

const AppWrapper = () => {
  const location = useLocation();

  // routes where navbar should be hidden
  const hideNavbarRoutes = ["/dashboard"];

  // check if navbar should be hidden
  const hideNavbar = hideNavbarRoutes.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      
      <Routes>
        <Route path="/" element={<TravelBookingSystem />} />
         <Route path="/flight" element={<TravelBookingSystem mode="flight" />} />
        <Route path="/trains" element={<TravelBookingSystem mode="train" />} />
        <Route path="/buses" element={<TravelBookingSystem mode="bus" />} />
        <Route path="/book-flight/:flightId" element={<FlightBooking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
