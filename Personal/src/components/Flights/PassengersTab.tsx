import { useState } from "react";
import { UserPlus, Trash2, Users, CheckCircle2 } from "lucide-react";

const PassengerDetailsTab = ({
  onNext,
  bookingData,
  setBookingData,
}: {
  onNext: () => void;
  bookingData: any;
  setBookingData: Function;
}) => {
  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
  });

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    };

    if (!passenger.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!passenger.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!passenger.age || Number(passenger.age) <= 0) {
      newErrors.age = "Valid age is required";
    }
    if (!passenger.gender) {
      newErrors.gender = "Please select gender";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const addPassenger = () => {
    if (!validateForm()) return;

    setBookingData({
      ...bookingData,
      passengers: [
        ...bookingData.passengers,
        {
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          age: Number(passenger.age),
          gender: passenger.gender.toLowerCase(),
        },
      ],
    });

    setPassenger({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    });

    setErrors({
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    });
  };

  const removePassenger = (index: number) => {
    setBookingData({
      ...bookingData,
      passengers: bookingData.passengers.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Add Passenger Form */}
      <div className="bg-linear-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-8 border border-blue-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Add Passenger</h2>
            <p className="text-sm text-gray-600">Enter passenger details below</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              First Name *
            </label>
            <input
              placeholder="e.g., John"
              className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white ${
                errors.firstName ? "border-red-400" : "border-gray-200"
              }`}
              value={passenger.firstName}
              onChange={(e) => {
                setPassenger({ ...passenger, firstName: e.target.value });
                setErrors({ ...errors, firstName: "" });
              }}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              placeholder="e.g., Doe"
              className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white ${
                errors.lastName ? "border-red-400" : "border-gray-200"
              }`}
              value={passenger.lastName}
              onChange={(e) => {
                setPassenger({ ...passenger, lastName: e.target.value });
                setErrors({ ...errors, lastName: "" });
              }}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Age *
            </label>
            <input
              type="number"
              placeholder="e.g., 25"
              className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none bg-white ${
                errors.age ? "border-red-400" : "border-gray-200"
              }`}
              value={passenger.age}
              onChange={(e) => {
                setPassenger({ ...passenger, age: e.target.value });
                setErrors({ ...errors, age: "" });
              }}
            />
            {errors.age && (
              <p className="text-red-500 text-xs mt-1">{errors.age}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Gender *
            </label>
            <select
              className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white ${
                errors.gender ? "border-red-400" : "border-gray-200"
              }`}
              value={passenger.gender}
              onChange={(e) => {
                setPassenger({ ...passenger, gender: e.target.value });
                setErrors({ ...errors, gender: "" });
              }}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
            )}
          </div>
        </div>

        <button
          onClick={addPassenger}
          className="w-full py-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
        >
          <UserPlus className="w-6 h-6" />
          Add Passenger
        </button>
      </div>

      {/* Passenger List */}
      {bookingData.passengers.length > 0 && (
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Passenger List
                </h3>
                <p className="text-sm text-gray-600">{bookingData.passengers.length} {bookingData.passengers.length === 1 ? 'passenger' : 'passengers'} added</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-sm font-bold text-green-700">Complete</span>
            </div>
          </div>

          <div className="space-y-4">
            {bookingData.passengers.map((p: any, idx: number) => (
              <div
                key={idx}
                className="group relative bg-linear-to-r from-gray-50 via-blue-50 to-indigo-50 rounded-2xl border-2 border-gray-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {idx + 1}
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-800">
                        {p.firstName} {p.lastName}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {p.age} years
                        </span>
                        <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold capitalize">
                          {p.gender}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removePassenger(idx)}
                    className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all hover:scale-110"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="relative">
        <button
          onClick={onNext}
          disabled={bookingData.passengers.length === 0}
          className={`w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 relative overflow-hidden ${
            bookingData.passengers.length === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 text-white hover:shadow-2xl hover:scale-[1.02] shadow-xl"
          }`}
        >
          <span className="relative z-10 flex items-center justify-center gap-3">
            Continue to Payment
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          {bookingData.passengers.length > 0 && (
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          )}
        </button>
        {bookingData.passengers.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-3">
            Please add at least one passenger to continue
          </p>
        )}
      </div>
    </div>
  );
};

export default PassengerDetailsTab;