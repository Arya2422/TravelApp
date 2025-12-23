import { useParams } from "react-router-dom";
import { getFlightById } from "@/api/flight";
import { useEffect, useState } from "react";
import BookingTabs from "@/components/Flights/Booking";
import FlightInfoTab from "@/components/Flights/InfoTab";
import PassengerDetailsTab from "@/components/Flights/PassengersTab";
import ConfirmBookingTab from "@/components/Flights/FareSummaryTab";
import HotelsTab from "@/components/Flights/Hotels";
import { Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


const FlightBookingPage = () => {
  const { flightId } = useParams<{ flightId: string }>();
const navigate = useNavigate();
  const [flight, setFlight] = useState<any>(null);
  const [destination, setDestination] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState({
    travelClass: "economy",
    passengers: [],
    contactEmail: "",
    contactPhone: "",
  });

  useEffect(() => {
    if (!flightId) {
      setError("Invalid flight ID");
      setLoading(false);
      return;
    }

    const fetchFlightDetails = async () => {
      try {
        setLoading(true);
        const res = await getFlightById(flightId);
        setFlight(res.flight);
        setDestination(res.destination);
      } catch (err) {
        console.error(err);
        setError("Failed to load flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <Plane className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-700 font-semibold text-lg">Loading flight details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-red-50 to-pink-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!flight) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto mt-16">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <div className="inline-block p-3 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">Review flight details and confirm your reservation</p>
        </div> */}
<div className="flex items-center mb-6">
<button
  onClick={() => navigate(-1)}
  className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-xl hover:scale-105 transition-all border"
>
  <ArrowLeft className="w-5 h-5 text-gray-700" />
  <span className="font-semibold text-gray-700 hidden sm:inline">Back</span>
</button>
</div>

        {/* Tabs */}
        <div className="mb-8">
          <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {activeTab === 0 && <FlightInfoTab flight={flight} />}
          {activeTab === 1 && (
            <PassengerDetailsTab
              onNext={() => setActiveTab(2)}
              bookingData={bookingData}
              setBookingData={setBookingData}
            />
          )}
          {activeTab === 2 && (
            <ConfirmBookingTab
              flight={flight}
              bookingData={bookingData}
              flightId={flightId!}
            />
          )}
          {activeTab === 3 && <HotelsTab hotels={destination?.hotels} />}
        </div>
      </div>
    </div>
  );
};

export default FlightBookingPage;