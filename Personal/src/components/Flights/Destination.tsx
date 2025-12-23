import { useState } from "react";
import { Hotel, MapPin, Utensils, Camera, Star, MapPinned } from "lucide-react";
import type { DestinationPlacesProps, TabType } from "@/types/destination";

// Add this type export for use in other files

const DestinationPlaces = ({ destination }: DestinationPlacesProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("hotels");

  const tabs = [
    { id: "hotels" as TabType, label: "Hotels", icon: Hotel, data: destination.hotels || [] },
    { id: "attractions" as TabType, label: "Attractions", icon: Camera, data: destination.attractions || [] },
    { id: "famous-places" as TabType, label: "Famous Places", icon: MapPinned, data: destination.famousPlaces || [] },
    { id: "restaurants" as TabType, label: "Restaurants", icon: Utensils, data: destination.restaurants || [] },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const renderRating = (rating?: number) => {
    if (!rating) return null;
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Explore {destination.city}
        </h2>
        <p className="text-gray-600">
          Discover the best places to stay, visit, and dine
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center border-b border-gray-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                isActive
                  ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              {tab.data.length > 0 && (
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                    isActive ? "bg-white text-blue-600" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.data.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTabData && activeTabData.data.length > 0 ? (
          activeTabData.data.map((place) => (
            <div
              key={place._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100 hover:border-blue-300"
            >
              {/* Image */}
              {place.images && place.images.length > 0 ? (
                <div className="relative h-48 bg-linear-to-br from-blue-100 to-indigo-100">
                  <img
                    src={place.images[0]}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {place.isPopular && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Popular
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-48 bg-linear-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <activeTabData.icon className="w-16 h-16 text-blue-300" />
                  {place.isPopular && (
                    <div className="absolute top-3 right-3 bg-linear-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      Popular
                    </div>
                  )}
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 line-clamp-1">
                    {place.name}
                  </h3>
                  {renderRating(place.rating)}
                </div>

                {place.priceRange && (
                  <div className="text-green-600 font-semibold mb-2">
                    {place.priceRange}
                  </div>
                )}

                {place.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {place.description}
                  </p>
                )}

                {place.address && (
                  <div className="flex items-start gap-2 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{place.address}</span>
                  </div>
                )}

                {/* View Details Button */}
                <button className="mt-4 w-full py-2 bg-linear-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-600 font-semibold rounded-lg transition-all border border-blue-200">
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : activeTabData ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <activeTabData.icon className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No {activeTabData.label} Found
            </h3>
            <p className="text-gray-500">
              We don't have information about {activeTabData.label.toLowerCase()} in {destination.city} yet.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DestinationPlaces;