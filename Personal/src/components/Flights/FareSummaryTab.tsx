import FlightBookingAPI from "@/api/booking";
import { useState } from "react";
import { CreditCard, Check, Loader2, X, Plane, Users, MapPin, DollarSign } from "lucide-react";

const ConfirmBookingTab = ({
  flight,
  bookingData,
  flightId,
}: {
  flight: any;
  bookingData: any;
  flightId: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookingReference, setBookingReference] = useState("");

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);

      const payload = {
        flightId,
        travelClass: bookingData.travelClass,
        numberOfTravellers: bookingData.passengers.length,
        specialFareType: "none",
        passengers: bookingData.passengers.map((p: any, idx: number) => ({
          firstName: p.firstName,
          lastName: p.lastName,
          age: p.age,
          gender: p.gender,
          seatNumber: `A${idx + 1}`,
        })),
        contactEmail: bookingData.contactEmail || "test@email.com",
        contactPhone: bookingData.contactPhone || "9999999999",
      };

      const token = localStorage.getItem("token") || undefined;
      const booking = await FlightBookingAPI.createBooking(payload, token);

      setBookingReference(booking.bookingReference);
      setShowModal(true);
    } catch (err: any) {
      alert(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const baseFare = flight.pricing.economy * bookingData.passengers.length;
  const taxes = baseFare * 0.18;
  const totalPrice = baseFare + taxes;

  return (
    <>
      <div className="space-y-6">
        {/* Hero Summary Card */}
        <div className="relative  rounded-3xl shadow-2xl p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-black/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-black">Final Review</h2>
                <p className="text-black/80">Confirm your booking details</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Plane className="w-5 h-5 text-black" />
                  <span className="text-black/80 text-sm font-medium">Flight</span>
                </div>
                <p className="text-black font-bold text-lg">{flight.airline}</p>
                <p className="text-black/90 text-sm">{flight.flightNumber}</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-black" />
                  <span className="text-black/80 text-sm font-medium">Passengers</span>
                </div>
                <p className="text-black font-bold text-lg">{bookingData.passengers.length}</p>
                <p className="text-black/90 text-sm">
                  {bookingData.passengers.length === 1 ? 'passenger' : 'passengers'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Details */}
     {/* ===== GRID AFTER FINAL REVIEW ===== */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">

  {/* Route Details */}
  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
        <MapPin className="w-5 h-5 text-blue-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">Route Information</h3>
    </div>

    <div className="flex items-center justify-between">
      <div>
        <p className="text-3xl font-bold">{flight.from.airport.code}</p>
        <p className="text-gray-600">{flight.from.airport.city}</p>
      </div>

      <Plane className="w-6 h-6 text-blue-600" />

      <div className="text-right">
        <p className="text-3xl font-bold">{flight.to.airport.code}</p>
        <p className="text-gray-600">{flight.to.airport.city}</p>
      </div>
    </div>
  </div>

  {/* Passenger Cards */}
  <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 md:col-span-1 lg:col-span-1">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-linear-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
        <Users className="w-5 h-5 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">Passengers</h3>
    </div>

    <div className="space-y-4">
      {bookingData.passengers.map((p: any, idx: number) => (
        <div
          key={idx}
          className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100"
        >
          <p className="font-bold">
            {p.firstName} {p.lastName}
          </p>
          <p className="text-sm text-gray-600">
            {p.age} yrs • {p.gender}
          </p>
        </div>
      ))}
    </div>
  </div>

  {/* Price Breakdown (Sticky on desktop) */}
  <div className="bg-linear-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-3xl shadow-xl p-8 border border-orange-100 lg:sticky lg:top-24">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-linear-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center">
        <DollarSign className="w-5 h-5 text-orange-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-800">Price Breakdown</h3>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between">
        <span>Base Fare</span>
        <span>₹{baseFare}</span>
      </div>
      <div className="flex justify-between">
        <span>Taxes (18%)</span>
        <span>₹{taxes}</span>
      </div>
      <div className="flex justify-between text-xl font-bold">
        <span>Total</span>
        <span className="text-orange-600">₹{totalPrice}</span>
      </div>
    </div>
  </div>

</div>


        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          disabled={loading}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:shadow-2xl hover:scale-[1.02] shadow-xl"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing Your Booking...</span>
            </>
          ) : (
            <>
              <Check className="w-6 h-6" />
              <span>Confirm & Pay ₹{totalPrice.toLocaleString()}</span>
            </>
          )}
        </button>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scaleIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-linear-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-green-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed! 🎉</h2>
              <p className="text-gray-600 mb-6">Your flight has been successfully booked</p>

              <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
                <p className="text-2xl font-bold text-blue-600 tracking-wider">{bookingReference}</p>
              </div>

              <div className="space-y-3 text-left mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Confirmation email sent to your inbox</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>E-ticket will be generated shortly</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Check your booking status anytime</span>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style> */}
    </>
  );
};

export default ConfirmBookingTab;