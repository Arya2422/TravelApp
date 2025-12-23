import { MapPin, Star } from "lucide-react";

const HotelsTab = ({ hotels = [] }: { hotels: any[] }) => {
  if (!hotels.length) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-4xl">🏨</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No Hotels Available</h3>
        <p className="text-gray-500">Hotels information for this destination will be available soon</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Recommended Hotels</h2>
        <p className="text-gray-600">Find the perfect place to stay at your destination</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer hover:scale-[1.02]"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
              {hotel.rating && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-lg">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-gray-800">{hotel.rating}</span>
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-1">
                {hotel.name}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="text-sm">{hotel.city}</span>
              </div>

              <button className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelsTab;