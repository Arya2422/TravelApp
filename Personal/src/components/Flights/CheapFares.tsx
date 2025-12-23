import { useState, useRef, useEffect } from "react";
import {
  TrendingDown,
  MapPin,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fares, type FareCardProps } from "@/types/Fare";

const FareCard = ({ image, city, state, date, price }: FareCardProps) => {
  return (
    <div className="group w-[340px] shrink-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-300 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={city}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 right-4">
          <Badge className="bg-linear-to-r from-green-500 to-emerald-500 border-0 shadow-xl px-3 py-1.5 text-white font-semibold">
            <TrendingDown className="w-3.5 h-3.5 mr-1.5" />
            Best Deal
          </Badge>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
          {city}
        </h3>

        <div className="flex items-center gap-1.5 text-gray-600 mb-4">
          <MapPin className="w-4 h-4 text-blue-500" />
          <p className="text-sm font-medium">{state}</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-5 bg-gray-50 rounded-lg px-3 py-2">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="font-medium">{date}</span>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div>
            <p className="text-3xl font-bold text-gray-900">₹{price}</p>
            <p className="text-xs text-gray-500 font-medium">
              onwards per person
            </p>
          </div>

          <button className="bg-white text-black px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl flex items-center gap-2">
            Book Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const cities = [
  { label: "New Delhi", icon: "🏙️" },
  { label: "Mumbai", icon: "🌊" },
  { label: "Bangalore", icon: "🌳" },
  { label: "Chennai", icon: "🏖️" },
];

const CheapestFares = () => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-linear-to-b from-blue-50/30 to-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Cheapest Fares From
          </h2>
          <p className="text-gray-600 text-lg">
            Grab the best deals on flights today ✈️
          </p>
        </div>

        {/* Custom Select */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="border-2 border-gray-200 rounded-2xl px-5 py-3.5 shadow-md hover:border-blue-400 transition-all font-semibold text-gray-700 bg-white flex items-center gap-2"
          >
            {selectedCity.icon} {selectedCity.label}
            <ArrowRight
              className={`w-4 h-4 transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          </button>

          {open && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-white border border-gray-200 shadow-2xl z-50 overflow-hidden">
              {cities.map((city) => (
                <button
                  key={city.label}
                  onClick={() => {
                    setSelectedCity(city);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-blue-50 font-semibold text-gray-700 transition"
                >
                  {city.icon} {city.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Cards */}
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory">
        {fares.map((fare, index) => (
          <div key={index} className="snap-start">
            <FareCard {...fare} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheapestFares;
