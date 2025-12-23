import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import FlightBookingAPI, { type Booking } from "@/api/booking";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelModal, setCancelModal] = useState<{
    show: boolean;
    bookingId: string;
    reason: string;
  }>({ show: false, bookingId: "", reason: "" });

  // Get user data from state (in memory)
  const [userName] = useState("John Doe");
  const [userEmail] = useState("john.doe@example.com");

  // Fetch bookings on mount
  useEffect(() => {
    if (activeTab === "bookings") {
      fetchBookings();
    }
  }, [activeTab]);

const fetchBookings = async () => {
  setLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem("token") || "";
    const data = await FlightBookingAPI.getMyBookings(token);
    setBookings(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : "Failed to load bookings");
  } finally {
    setLoading(false);
  }
};


 const handleCancelBooking = async () => {
  if (!cancelModal.reason.trim()) return alert("Please provide a cancellation reason");

  try {
    const token = localStorage.getItem("token") || "";
    await FlightBookingAPI.cancelBooking(token, cancelModal.bookingId, cancelModal.reason);

    setBookings(bookings.map(b =>
      b._id === cancelModal.bookingId ? { ...b, status: "cancelled" } : b
    ));
    setCancelModal({ show: false, bookingId: "", reason: "" });
    alert("Booking cancelled successfully!");
  } catch (err) {
    alert(err instanceof Error ? err.message : "Failed to cancel booking");
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="hidden sm:inline">Back to Home</span>
        </button>
      </motion.header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          userName={userName}
          userEmail={userEmail}
          bookingsCount={bookings.length}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "personal" && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          defaultValue={userName}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          defaultValue={userEmail}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          defaultValue="+91 98765 43210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          defaultValue="1990-01-01"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">
                        Address
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="123 Main Street, Badlapur, Maharashtra, India"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      />
                    </div>

                    <button className="w-full md:w-auto px-8 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl">
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "bookings" && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="max-w-5xl">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
                  
                  {loading && (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                      {error}
                    </div>
                  )}

                  {!loading && !error && bookings.length > 0 && (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <motion.div
                          key={booking._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                        >
                          <div className="flex flex-col gap-4">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-gray-800 text-lg">
                                    {booking.flight.from.city} → {booking.flight.to.city}
                                  </h3>
                                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-1">
                                  {booking.flight.airline} • {booking.flight.flightNumber}
                                </p>
                                <p className="text-xs text-gray-400">
                                  Booking Ref: {booking.bookingReference}
                                </p>
                              </div>
                              <p className="text-2xl font-bold text-gray-800">
                                {formatPrice(booking.totalAmount)}
                              </p>
                            </div>

                            {/* Flight Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 border-t border-gray-100">
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Departure</p>
                                <p className="font-semibold text-gray-800">
                                  {formatDate(booking.flight.departureDate)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {booking.flight.departureTime}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Arrival</p>
                                <p className="font-semibold text-gray-800">
                                  {formatDate(booking.flight.arrivalDate)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {booking.flight.arrivalTime}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Travellers</p>
                                <p className="font-semibold text-gray-800">
                                  {booking.numberOfTravellers} {booking.numberOfTravellers > 1 ? "Passengers" : "Passenger"}
                                </p>
                                <p className="text-sm text-gray-600 capitalize">
                                  {booking.travelClass}
                                </p>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                              <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition text-sm">
                                View Details
                              </button>
                              {booking.status === "confirmed" && (
                                <button
                                  onClick={() => setCancelModal({
                                    show: true,
                                    bookingId: booking._id,
                                    reason: ""
                                  })}
                                  className="flex-1 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition text-sm"
                                >
                                  Cancel Booking
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {!loading && !error && bookings.length === 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-gray-500 text-lg">No bookings yet</p>
                      <p className="text-gray-400 text-sm mt-2">Start exploring and book your first trip!</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Cancel Booking Modal */}
      {cancelModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cancel Booking</h3>
            <p className="text-gray-600 mb-4">
              Please provide a reason for cancellation. You will receive an 80% refund.
            </p>
            <textarea
              value={cancelModal.reason}
              onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
              placeholder="Reason for cancellation..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setCancelModal({ show: false, bookingId: "", reason: "" })}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCancelBooking}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Confirm Cancellation
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;