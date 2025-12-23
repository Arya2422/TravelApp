import { Clock, MapPin, Train } from "lucide-react";
import type { Train as TrainType } from "@/types/train";

type TrainClass = "sleeper" | "ac3" | "ac2" | "ac1";

interface TrainResultsProps {
  trains: TrainType[];
  trainClass: TrainClass;
  onSelectTrain: (trainId: string) => void;
}

const TrainResults = ({ trains, trainClass, onSelectTrain }: TrainResultsProps) => {
  const calculateTrainPrice = (train: TrainType) => {
    return train.classes?.[trainClass]?.price ?? 0;
  };

  const getTrainAvailableSeats = (train: TrainType) => {
    return train.classes?.[trainClass]?.seatsAvailable ?? 0;
  };

  const calculateDuration = (depDate: string, depTime: string, arrDate: string, arrTime: string) => {
    const depDateTime = new Date(`${depDate} ${depTime}`);
    const arrDateTime = new Date(`${arrDate} ${arrTime}`);
    const diff = arrDateTime.getTime() - depDateTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Trains</h2>
          <p className="text-gray-600">
            Found {trains.length} train{trains.length !== 1 ? "s" : ""} for your search
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-100">
          <Train className="w-5 h-5 text-blue-600" />
          <span className="font-bold text-gray-900">{trains.length}</span>
          <span className="text-gray-600">Results</span>
        </div>
      </div>

      <div className="space-y-6">
        {trains.map((train) => (
          <div
            key={train._id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all p-6 sm:p-8 border-2 border-gray-100 hover:border-blue-200 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Train className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{train.trainName}</div>
                  <div className="text-sm text-gray-500 font-medium">{train.trainNumber}</div>
                  <div className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-orange-50 rounded-full">
                    <span className="text-xs font-bold text-orange-700">{train.trainType}</span>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 mb-1">{train.departureTime}</div>
                <div className="text-base font-semibold text-gray-700">{train.from.stationName}</div>
                <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-blue-50 rounded-full">
                  <MapPin className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-bold text-blue-700">{train.from.stationCode}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{train.departureDate}</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="h-0.5 bg-linear-to-r from-transparent to-orange-200 w-16"></div>
                  <div className="p-2 bg-linear-to-br from-orange-100 to-red-100 rounded-full">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="h-0.5 bg-linear-to-l from-transparent to-orange-200 w-16"></div>
                </div>
                <div className="text-sm font-bold text-gray-700">
                  {calculateDuration(train.departureDate, train.departureTime, train.arrivalDate, train.arrivalTime)}
                </div>
                <div className="text-xs text-gray-500 mt-1">Direct Train</div>
              </div>

              <div className="text-center lg:text-right">
                <div className="text-3xl font-bold text-gray-900 mb-1">{train.arrivalTime}</div>
                <div className="text-base font-semibold text-gray-700">{train.to.stationName}</div>
                <div className="inline-flex items-center gap-1 mt-1 px-3 py-1 bg-purple-50 rounded-full">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  <span className="text-xs font-bold text-purple-700">{train.to.stationCode}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">{train.arrivalDate}</div>
              </div>

              <div className="text-center lg:text-right">
                <div className="inline-flex items-baseline gap-1 mb-2">
                  <span className="text-xl text-gray-600">₹</span>
                  <span className="text-4xl font-bold bg-linear-to-br from-orange-600 to-red-600 bg-clip-text text-transparent">
                    {calculateTrainPrice(train).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-center lg:justify-end gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-green-600">
                    {getTrainAvailableSeats(train)} seats left
                  </span>
                </div>
                <button
                  onClick={() => onSelectTrain(train._id)}
                  className="w-full lg:w-auto px-8 py-3 bg-linear-to-br from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Select Train
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t-2 border-gray-100">
              <div className="text-sm font-bold text-gray-700 mb-3">Available Classes:</div>
              <div className="flex flex-wrap gap-3">
                {train.classes.sleeper && (
                  <div className="px-4 py-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="text-xs text-gray-600">Sleeper</div>
                    <div className="text-sm font-bold text-gray-900">₹{train.classes.sleeper.price}</div>
                    <div className="text-xs text-green-600">{train.classes.sleeper.seatsAvailable} seats</div>
                  </div>
                )}
                {train.classes.ac3 && (
                  <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-xs text-gray-600">AC 3-Tier</div>
                    <div className="text-sm font-bold text-gray-900">₹{train.classes.ac3.price}</div>
                    <div className="text-xs text-green-600">{train.classes.ac3.seatsAvailable} seats</div>
                  </div>
                )}
                {train.classes.ac2 && (
                  <div className="px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-xs text-gray-600">AC 2-Tier</div>
                    <div className="text-sm font-bold text-gray-900">₹{train.classes.ac2.price}</div>
                    <div className="text-xs text-green-600">{train.classes.ac2.seatsAvailable} seats</div>
                  </div>
                )}
                {train.classes.ac1 && (
                  <div className="px-4 py-2 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="text-xs text-gray-600">AC 1st Class</div>
                    <div className="text-sm font-bold text-gray-900">₹{train.classes.ac1.price}</div>
                    <div className="text-xs text-green-600">{train.classes.ac1.seatsAvailable} seats</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainResults;