import React from "react";
import {
  MapPin,
  Globe,
  Clock,
  Info,
  Building,
  Hotel,
  Star,
} from "lucide-react";

const nearbyHotels = [
  {
    id: 1,
    name: "Aero City Grand Hotel",
    distance: "1.2 km from airport",
    rating: 4.5,
    price: "₹5,200 / night",
  },
  {
    id: 2,
    name: "Skyline Airport Residency",
    distance: "2.0 km from airport",
    rating: 4.2,
    price: "₹4,100 / night",
  },
  {
    id: 3,
    name: "Hotel Runway View",
    distance: "2.8 km from airport",
    rating: 4.0,
    price: "₹3,600 / night",
  },
];

const Place: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-linear-to-br from-purple-500 to-pink-600 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Place Information
          </h2>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Destination */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-blue-50 to-indigo-50 border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">Destination</h3>
            </div>
            <p className="text-gray-700 font-medium">New Delhi, India</p>
            <p className="text-sm text-gray-500 mt-1">
              Indira Gandhi International Airport (DEL)
            </p>
          </div>

          {/* Time Zone */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-green-50 to-emerald-50 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Time Zone</h3>
            </div>
            <p className="text-gray-700 font-medium">GMT +5:30 (IST)</p>
            <p className="text-sm text-gray-500 mt-1">
              No daylight saving time
            </p>
          </div>

          {/* Airport Facilities */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Airport Facilities</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 mt-1">
              <li>• Free Wi-Fi</li>
              <li>• Lounges & Duty-Free</li>
              <li>• Food Courts & Cafés</li>
              <li>• Currency Exchange</li>
            </ul>
          </div>

          {/* Advisory */}
          <div className="p-6 rounded-2xl bg-linear-to-br from-yellow-50 to-orange-50 border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="w-5 h-5 text-yellow-600" />
              <h3 className="font-semibold text-gray-800">
                Travel Advisory
              </h3>
            </div>
            <p className="text-sm text-gray-700">
              Arrive <b>2 hours</b> early for domestic and <b>3 hours</b> early
              for international flights.
            </p>
          </div>
        </div>

        {/* ================= Nearby Hotels ================= */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <Hotel className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-gray-800">
              Nearby Hotels
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nearbyHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all bg-linear-to-br from-white to-gray-50"
              >
                <h4 className="font-bold text-gray-800 mb-1">
                  {hotel.name}
                </h4>
                <p className="text-sm text-gray-500 mb-2">
                  {hotel.distance}
                </p>

                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {hotel.rating}
                  </span>
                </div>

                <p className="font-semibold text-indigo-600">
                  {hotel.price}
                </p>

                <button className="mt-4 w-full py-2 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 p-5 rounded-2xl bg-gray-50 border border-gray-200 text-sm text-gray-600">
          🏨 Hotel prices and availability are indicative. Please confirm
          details on the hotel booking platform before reservation.
        </div>
      </div>
    </div>
  );
};

export default Place;
