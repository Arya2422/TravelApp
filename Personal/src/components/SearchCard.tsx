import { useState } from "react";
import {
  Plane,
  Search,
  MapPin,
  X,
  ArrowRight,
  TrendingDown,
  Shield,
  Zap,
  Train,
} from "lucide-react";
import { searchAirports } from "@/api/airport";
import { searchStations } from "@/api/train";
import { debounce } from "@/api/utils/debounce";
import type { Airport } from "@/types/airport";
import type { Station } from "@/types/train";
import CustomDatePicker from "@/components/Date";
import { useNavigate, useLocation } from "react-router-dom";
import type { SearchCardProps, TrainClass } from "@/types/search";
import type { SeatClass } from "@/types/flight";



const SearchCard = ({
  travelMode,
  searchParams,
  setSearchParams,
//   selectedFromAirport,
  setSelectedFromAirport,
//   selectedToAirport,
  setSelectedToAirport,
//   selectedFromStation,
  setSelectedFromStation,
//   selectedToStation,
  setSelectedToStation,
  loading,
  error,
  setError,
  onSearch,
}: SearchCardProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [fromSuggestions, setFromSuggestions] = useState<Airport[]>([]);
  const [toSuggestions, setToSuggestions] = useState<Airport[]>([]);
  const [trainFromSuggestions, setTrainFromSuggestions] = useState<Station[]>([]);
  const [trainToSuggestions, setTrainToSuggestions] = useState<Station[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const handleAirportSearch = debounce(async (q: string, field: "from" | "to") => {
    try {
      if (!q || q.length < 2) {
        field === "from" ? setFromSuggestions([]) : setToSuggestions([]);
        return;
      }
      const results = await searchAirports(q);
      if (field === "from") {
        setFromSuggestions(results);
        setShowFromDropdown(true);
      } else {
        setToSuggestions(results);
        setShowToDropdown(true);
      }
    } catch (err) {
      console.error("Airport search error", err);
    }
  }, 300);

  const handleStationSearch = debounce(async (q: string, field: "from" | "to") => {
    try {
      if (!q || q.length < 2) {
        field === "from" ? setTrainFromSuggestions([]) : setTrainToSuggestions([]);
        return;
      }
      const results = await searchStations(q);
      if (field === "from") {
        setTrainFromSuggestions(results);
        setShowFromDropdown(true);
      } else {
        setTrainToSuggestions(results);
        setShowToDropdown(true);
      }
    } catch (err) {
      console.error("Station search error", err);
    }
  }, 300);

  const handleSearch = (field: string, value: string | number) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));

    if (field === "from" || field === "to") {
      if (travelMode === "flight") {
        handleAirportSearch(String(value), field as "from" | "to");
      } else {
        handleStationSearch(String(value), field as "from" | "to");
      }
    }
  };

  const selectAirport = (airport: Airport, field: "from" | "to") => {
    if (field === "from") {
      setSelectedFromAirport(airport);
      setSearchParams((prev) => ({ ...prev, from: `${airport.city} (${airport.code})` }));
      setShowFromDropdown(false);
    } else {
      setSelectedToAirport(airport);
      setSearchParams((prev) => ({ ...prev, to: `${airport.city} (${airport.code})` }));
      setShowToDropdown(false);
    }
  };

  const selectStation = (station: Station, field: "from" | "to") => {
    if (field === "from") {
      setSelectedFromStation(station);
      setSearchParams((prev) => ({ ...prev, from: `${station.city} (${station.stationCode})` }));
      setShowFromDropdown(false);
    } else {
      setSelectedToStation(station);
      setSearchParams((prev) => ({ ...prev, to: `${station.city} (${station.stationCode})` }));
      setShowToDropdown(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-6xl mx-auto backdrop-blur-lg mb-10">
      {/* Travel Mode Toggle */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={() => navigate("/flight")}
          className={`px-6 py-3 rounded-xl font-semibold ${
            location.pathname === "/flight"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          ✈️ Flights
        </button>

        <button
          onClick={() => navigate("/trains")}
          className={`px-6 py-3 rounded-xl font-semibold ${
            location.pathname === "/trains"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          🚆 Trains
        </button>

        <button
          onClick={() => navigate("/buses")}
          className={`px-6 py-3 rounded-xl font-semibold ${
            location.pathname === "/buses"
              ? "bg-gray-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          🚌 Buses
        </button>
      </div>

      {/* Trip Type Toggle (Only for flights) */}
      {travelMode === "flight" && (
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setSearchParams((p) => ({ ...p, tripType: "one-way" }))}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              searchParams.tripType === "one-way"
                ? "bg-gray-200 text-black shadow-lg scale-105"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            One Way
          </button>
          <button
            onClick={() => setSearchParams((p) => ({ ...p, tripType: "round-trip" }))}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              searchParams.tripType === "round-trip"
                ? " bg-gray-200 text-black shadow-lg scale-105"
                : "bg-gray-200 text-black hover:bg-gray-200"
            }`}
          >
            Round Trip
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-2xl text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="font-medium">{error}</span>
          </div>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Search Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* From */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            From {travelMode === "train" ? "Station" : ""}
          </label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-500 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              value={searchParams.from}
              onChange={(e) => handleSearch("from", e.target.value)}
              onFocus={() => searchParams.from && setShowFromDropdown(true)}
              placeholder={travelMode === "flight" ? "City or Airport" : "City or Station"}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-900 font-medium placeholder-gray-400"
            />
          </div>
          {showFromDropdown && (travelMode === "flight" ? fromSuggestions : trainFromSuggestions).length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-72 overflow-y-auto">
              {travelMode === "flight"
                ? fromSuggestions.map((airport) => (
                    <div
                      key={airport._id}
                      onClick={() => selectAirport(airport, "from")}
                      className="p-4 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {airport.city} ({airport.code})
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{airport.name}</div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {airport.country}
                          </div>
                        </div>
                        <Plane className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  ))
                : trainFromSuggestions.map((station) => (
                    <div
                      key={station._id}
                      onClick={() => selectStation(station, "from")}
                      className="p-4 hover:bg-linear-to-br hover:from-blue-50 hover:to-indigo-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {station.city} ({station.stationCode})
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{station.stationName}</div>
                        </div>
                        <Train className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        {/* To */}
        <div className="relative">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            To {travelMode === "train" ? "Station" : ""}
          </label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500 group-focus-within:text-purple-600 transition-colors" />
            <input
              type="text"
              value={searchParams.to}
              onChange={(e) => handleSearch("to", e.target.value)}
              onFocus={() => searchParams.to && setShowToDropdown(true)}
              placeholder={travelMode === "flight" ? "City or Airport" : "City or Station"}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-gray-900 font-medium placeholder-gray-400"
            />
          </div>
          {showToDropdown && (travelMode === "flight" ? toSuggestions : trainToSuggestions).length > 0 && (
            <div className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-72 overflow-y-auto">
              {travelMode === "flight"
                ? toSuggestions.map((airport) => (
                    <div
                      key={airport._id}
                      onClick={() => selectAirport(airport, "to")}
                      className="p-4 hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {airport.city} ({airport.code})
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{airport.name}</div>
                          <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {airport.country}
                          </div>
                        </div>
                        <Plane className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                      </div>
                    </div>
                  ))
                : trainToSuggestions.map((station) => (
                    <div
                      key={station._id}
                      onClick={() => selectStation(station, "to")}
                      className="p-4 hover:bg-linear-to-br hover:from-purple-50 hover:to-pink-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {station.city} ({station.stationCode})
                          </div>
                          <div className="text-sm text-gray-600 mt-1">{station.stationName}</div>
                        </div>
                        <Train className="w-5 h-5 text-gray-300 group-hover:text-purple-500 transition-colors" />
                      </div>
                    </div>
                  ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <div className="relative group">
            <CustomDatePicker
              label="Departure"
              value={searchParams.departureDate}
              onChange={(date) => handleSearch("departureDate", date)}
              minDate={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Class Type */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Class</label>
          <div className="relative">
            {travelMode === "flight" ? (
              <>
                <select
                  value={searchParams.classType}
                  onChange={(e) => handleSearch("classType", e.target.value as SeatClass)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-900 font-medium appearance-none bg-white cursor-pointer"
                >
                  <option value="economy">✈️ Economy</option>
                  <option value="business">💼 Business</option>
                  <option value="firstClass">👑 First Class</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <select
                  value={searchParams.trainClass}
                  onChange={(e) => handleSearch("trainClass", e.target.value as TrainClass)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-900 font-medium appearance-none bg-white cursor-pointer"
                >
                  <option value="sleeper">🛏️ Sleeper</option>
                  <option value="ac3">❄️ AC 3-Tier</option>
                  <option value="ac2">❄️ AC 2-Tier</option>
                  <option value="ac1">👑 AC 1st Class</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={onSearch}
        disabled={loading}
        className="w-full  bg-gray-500 text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            Searching {travelMode === "flight" ? "Flights" : "Trains"}...
          </>
        ) : (
          <>
            <Search className="w-6 h-6" />
            Search {travelMode === "flight" ? "Flights" : "Trains"}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secure Booking</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-500" />
          <span>Instant Confirmation</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-blue-500" />
          <span>Best Prices</span>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;