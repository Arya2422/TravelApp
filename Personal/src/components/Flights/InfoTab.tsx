import { Clock, MapPin, Calendar, Plane, Utensils, Wifi, Star } from "lucide-react";

const FlightInfoTab = ({ flight }: { flight: any }) => {
  return (
    <div className="space-y-6">

      <div className="relative rounded-3xl shadow-2xl p-8 overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <div className="text-black">
              <p className="font-bold text-lg">{flight.airline}</p>
              <p className="text-xs opacity-90">Flight {flight.flightNumber}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-black/80" />
                <p className="text-black/80 text-sm font-medium">FROM</p>
              </div>
              <h3 className="text-4xl font-bold text-black mb-1">{flight.from.airport.code}</h3>
              <p className="text-black/90 text-lg">{flight.from.airport.city}</p>
              <p className="text-black/60 text-sm mt-1">{flight.from.airport.name}</p>
            </div>

            <div className="shrink-0 px-6">
              <div className="relative flex flex-col items-center">
                <div className="w-32 h-0.5 bg-black/30 mb-2"></div>
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg">
                  <Plane className="w-6 h-6 text-white transform rotate-90" />
                </div>
                <div className="w-32 h-0.5 bg-black/30 mt-2"></div>
              </div>
            </div>

            <div className="flex-1 text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <p className="text-black/80 text-sm font-medium">TO</p>
                <MapPin className="w-5 h-5 text-black/80" />
              </div>
              <h3 className="text-4xl font-bold text-black mb-1">{flight.to.airport.code}</h3>
              <p className="text-black/90 text-lg">{flight.to.airport.city}</p>
              <p className="text-black/60 text-sm mt-1">{flight.to.airport.name}</p>
            </div>
          </div>
        </div>
      </div>

      
      <div className="grid md:grid-cols-3 gap-6">
   
        <div className=" rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-900 uppercase font-semibold tracking-wide">Departure</p>
              <p className="text-sm text-gray-900">{flight.from.airport.code}</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-2">{flight.departureTime}</p>
          <p className="text-gray-600 font-medium">
            {new Date(flight.departureDate).toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
        <div className=" rounded-2xl shadow-lg p-6 text-black hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-2xl font-bold mb-2">{flight.duration}</p>
            {flight.stops === 0 ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-semibold">Non-stop</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                <span className="text-sm font-semibold">{flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}</span>
              </div>
            )}
          </div>
        </div>

     
        <div className=" rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-black/20 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-900 uppercase font-semibold tracking-wide">Arrival</p>
              <p className="text-sm text-gray-900">{flight.to.airport.code}</p>
            </div>
          </div>
          <p className="text-4xl font-bold text-gray-800 mb-2">{flight.arrivalTime}</p>
          <p className="text-gray-600 font-medium">
            {new Date(flight.arrivalDate).toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {flight.freeMeal && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-xl">
                <Utensils className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Free Meal</span>
              </div>
            )}
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl">
              <Wifi className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Wi-Fi Available</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
              <Star className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">Rated 4.5/5</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-bold">{flight.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoTab;