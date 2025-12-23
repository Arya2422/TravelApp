import { useEffect, useState } from "react";
import { Plane, Train } from "lucide-react";
import { searchFlights } from "@/api/flight";
import { searchTrains } from "@/api/train";
import type { Flight } from "@/types/flight";
import type { Airport } from "@/types/airport";
import type { Station, Train as TrainType } from "@/types/train";
import { useLocation,  } from "react-router-dom";    //useNavigate
import CheapestFares from "@/components/Flights/CheapFares";
import TrainSearch from "@/components/Train/TrainSearch";
import BusSearch from "@/components/Bus/BusSearch";
import AirlineName from "@/components/Flights/AirlineName";
import Questions from "@/components/Flights/Questions";
import WhyBook from "@/components/Flights/WhyBook";
import TrainResults from "@/components/Train/TrainResult";
import FlightResults from "@/components/Flights/FlightResults";
import SearchCard from "@/components/SearchCard";
import DestinationPlaces from "@/components/Flights/Destination";
import type { DestinationData } from "@/types/destination";

type TravelMode = "flight" | "train" | "bus";
type SeatClass = "economy" | "business" | "firstClass";
type TrainClass = "sleeper" | "ac3" | "ac2" | "ac1";
type TravelBookingProps = { mode?: TravelMode };

const TravelBookingSystem = ({ mode }: TravelBookingProps) => {
  const [travelMode, setTravelMode] = useState<TravelMode>(mode || "flight");
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    departureDate: "",
    tripType: "one-way",
    passengers: 1,
    classType: "economy" as SeatClass,
    trainClass: "sleeper" as TrainClass,
  });

  const location = useLocation();
  // const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/flight") setTravelMode("flight");
    if (location.pathname === "/trains") setTravelMode("train");
    if (location.pathname === "/buses") setTravelMode("bus");
  }, [location.pathname]);

  // Flight states
  const [selectedFromAirport, setSelectedFromAirport] = useState<Airport | null>(null);
  const [selectedToAirport, setSelectedToAirport] = useState<Airport | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
 const [destinationData, setDestinationData] = useState<DestinationData | null>(null);

  // Train states
  const [selectedFromStation, setSelectedFromStation] = useState<Station | null>(null);
  const [selectedToStation, setSelectedToStation] = useState<Station | null>(null);
  const [trains, setTrains] = useState<TrainType[]>([]);

  // Common states
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const performSearch = async () => {
     setError("");
  setHasSearched(true);

  if (travelMode === "flight") {
    if (!selectedFromAirport || !selectedToAirport || !searchParams.departureDate) {
      setError("Please select both airports and a departure date.");
      return;
    }
    
    console.log("Search params:", {
      from: selectedFromAirport.code,
      to: selectedToAirport.code,
      departureDate: searchParams.departureDate,
    });
    
    setLoading(true);
    try {
      const data = await searchFlights({
        from: selectedFromAirport.code,
        to: selectedToAirport.code,
        departureDate: searchParams.departureDate,
      });
      console.log("Flight response:", data);
      
      // Handle the response structure from your API
      if (data.flights) {
        setFlights(data.flights);
        setDestinationData(data.destination); // Store destination data
      } else if (Array.isArray(data)) {
        setFlights(data);
        setDestinationData(null);
      } else {
        setError("No flights available for this route and date.");
        setFlights([]);
        setDestinationData(null);
      }
    } catch (err: any) {
      setError(err?.message ?? "Error searching flights");
      console.error("Flight search error:", err);
    } finally {
      setLoading(false);
    }
  
    } else if (travelMode === "train") {
      if (!selectedFromStation || !selectedToStation || !searchParams.departureDate) {
        setError("Please select both stations and a departure date.");
        return;
      }
      setLoading(true);
      try {
        const data = await searchTrains({
          from: selectedFromStation.stationCode,
          to: selectedToStation.stationCode,
          departureDate: searchParams.departureDate,
        });
        console.log("Train search results:", data);
        setTrains(data);
      } catch (err: any) {
        setError(err?.message ?? "Error searching trains");
        console.error("Train search error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectFlight = (flightId: string) => {
    window.location.href = `/book-flight/${flightId}`;
  };

  const handleSelectTrain = (trainId: string) => {
    window.location.href = `/book-train/${trainId}`;
  };

  // Debug: Log flights state changes
  useEffect(() => {
    console.log("Flights state updated:", flights);
  }, [flights]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section with Search */}
      <div className="relative bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 opacity-10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-44">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
              Book Your Next Adventure
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Search and compare {travelMode === "flight" ? "flights" : "trains"} to get the best deals
            </p>
          </div>

          {/* Search Card Component */}
          <SearchCard
            travelMode={travelMode}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
            selectedFromAirport={selectedFromAirport}
            setSelectedFromAirport={setSelectedFromAirport}
            selectedToAirport={selectedToAirport}
            setSelectedToAirport={setSelectedToAirport}
            selectedFromStation={selectedFromStation}
            setSelectedFromStation={setSelectedFromStation}
            selectedToStation={selectedToStation}
            setSelectedToStation={setSelectedToStation}
            loading={loading}
            error={error}
            setError={setError}
            onSearch={performSearch}
          />
        </div>
      </div>

      {/* Flight Results */}
      {travelMode === "flight" && hasSearched && flights.length > 0 && (
        <>
        <FlightResults
          flights={flights}
          classType={searchParams.classType}
          onSelectFlight={handleSelectFlight}
        />
           {destinationData && (
    
      <DestinationPlaces destination={destinationData} />
           )}
           </>
      )}

      {/* Train Results */}
      {travelMode === "train" && hasSearched && trains.length > 0 && (
        <TrainResults
          trains={trains}
          trainClass={searchParams.trainClass}
          onSelectTrain={handleSelectTrain}
        />
      )}

      {/* ------------------ PRE-SEARCH COMPONENTS ------------------ */}
      {!hasSearched && (
        <>
          {travelMode === "flight" && (
            <div className="mt-10 space-y-6">
              <CheapestFares />
              <div className="mt-10 space-y-6">
                <AirlineName />
              </div>
              <div className="mt-10 space-y-6">
                <WhyBook />
              </div>
              <div className="mt-10 space-y-6">
                <Questions />
              </div>
            </div>
          )}

          {travelMode === "train" && (
            <div className="mt-10 space-y-6">
              <TrainSearch />
            </div>
          )}

          {travelMode === "bus" && (
            <div className="mt-10 space-y-6">
              <BusSearch />
            </div>
          )}
        </>
      )}

      {/* No Results */}
      {hasSearched &&
        !loading &&
        ((travelMode === "flight" && flights.length === 0) ||
          (travelMode === "train" && trains.length === 0)) && (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full mb-6">
                {travelMode === "flight" ? (
                  <Plane className="w-12 h-12 text-gray-400" />
                ) : (
                  <Train className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No {travelMode === "flight" ? "Flights" : "Trains"} Found
              </h3>
              <p className="text-gray-600 text-lg mb-6">
                We couldn't find any {travelMode === "flight" ? "flights" : "trains"} matching your search criteria
              </p>
              <button
                onClick={() => {
                  setHasSearched(false);
                  setSearchParams({
                    from: "",
                    to: "",
                    departureDate: "",
                    tripType: "one-way",
                    passengers: 1,
                    classType: "economy",
                    trainClass: "sleeper",
                  });
                  setFlights([]);
                  setTrains([]);
                  setSelectedFromAirport(null);
                  setSelectedToAirport(null);
                  setSelectedFromStation(null);
                  setSelectedToStation(null);
                }}
                className="px-8 py-3 bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
              >
                Try Different Search
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default TravelBookingSystem;