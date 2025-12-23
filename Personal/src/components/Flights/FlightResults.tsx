import { Clock, MapPin, Wifi, Utensils, Coffee } from "lucide-react";
import type { Flight } from "@/types/flight";
import AirlineLogo from "./Airlinelogo";

type SeatClass = "economy" | "business" | "firstClass";

interface FlightResultsProps {
  flights: Flight[];
  classType: SeatClass;
  onSelectFlight: (flightId: string) => void;
}

const FlightResults = ({ flights, classType, onSelectFlight }: FlightResultsProps) => {
  const calculateFlightPrice = (flight: Flight) => {
    return flight.pricing?.[classType] ?? flight.pricing?.economy ?? 0;
  };

  const getFlightAvailableSeats = (flight: Flight) => {
    return flight.availableSeats?.[classType] ?? flight.availableSeats?.economy ?? 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Flights</h2>
          <p className="text-gray-600">
            Found {flights.length} flight{flights.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {flights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8 border-2 border-gray-100 hover:border-blue-200 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              {/* Airline */}
              <div className="flex items-center gap-4">
                <AirlineLogo airline={flight.airline} />
                <div>
                  <div className="font-bold text-gray-900 text-lg">{flight.airline}</div>
                  <div className="text-sm text-gray-500 font-medium">
                    {flight.flightNumber}
                  </div>
                </div>
              </div>

              {/* Departure */}
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {flight.departureTime}
                </div>
                <div className="text-base font-semibold text-gray-700">
                  {flight.from.airport.city}
                </div>
                <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-blue-50 rounded-full">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">
                    {flight.from.airport.code}
                  </span>
                </div>
              </div>

              {/* Duration */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-sm font-bold text-gray-700">
                  {flight.duration}
                </div>
                <div className="text-xs text-gray-500">Direct Flight</div>
              </div>

              {/* Arrival */}
              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {flight.arrivalTime}
                </div>
                <div className="text-base font-semibold text-gray-700">
                  {flight.to.airport.city}
                </div>
                <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-purple-50 rounded-full">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700">
                    {flight.to.airport.code}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-center lg:text-right">
                <div className="inline-flex items-baseline gap-1 mb-2">
                  <span className="text-xl text-gray-600">₹</span>
                  <span className="text-4xl font-bold bg-linear-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    {calculateFlightPrice(flight).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600">
                    {getFlightAvailableSeats(flight)} seats left
                  </span>
                </div>

                <button
                  onClick={() => onSelectFlight(flight._id)}
                  className="w-full lg:w-auto px-8 py-3 bg-linear-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Select Flight
                </button>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6 pt-6 border-t-2 border-gray-100 flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Wifi className="w-4 h-4 text-blue-600" />
                Free WiFi
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Utensils className="w-4 h-4 text-green-600" />
                Meals
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Coffee className="w-4 h-4 text-orange-600" />
                Beverages
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
