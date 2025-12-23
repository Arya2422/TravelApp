import { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X, Plane, MapPin, Search } from 'lucide-react';
import { createFlight, deleteFlight, getAllFlights, updateFlight } from '@/api/flight';
import { createAirport, deleteAirport, getAllAirports, updateAirport } from '@/api/airport';

const FlightAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('airports');
  const [airports, setAirports] = useState<any[]>([]);
  const [flights, setFlights] = useState<any[]>([]);
  const [showAirportModal, setShowAirportModal] = useState(false);
  const [showFlightModal, setShowFlightModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  type Airport = {
    _id: string;
    name: string;
    city: string;
    code: string;
    country: string;
  };

  type Flight = {
    _id: string;
    flightNumber: string;
    airline: string;
    from: { airport: string };
    to: { airport: string };
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    duration: string;
    tripType: string;
    pricing: { economy: number; business: number; firstClass: number };
    totalSeats: { economy: number; business: number; firstClass: number };
    stops: number;
    freeMeal: boolean;
  };

  const [editingAirport, setEditingAirport] = useState<Airport | null>(null);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  // Airport Form State
  const [airportForm, setAirportForm] = useState({
    name: '',
    city: '',
    code: '',
    country: ''
  });

  // Flight Form State
  const [flightForm, setFlightForm] = useState({
    flightNumber: '',
    airline: '',
    from: { airport: '' },
    to: { airport: '' },
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    duration: '',
    tripType: 'one-way',
    pricing: { economy: 0, business: 0, firstClass: 0 },
    totalSeats: { economy: 0, business: 0, firstClass: 0 },
    stops: 0,
    freeMeal: false
  });

  useEffect(() => {
    loadAirports();
    loadFlights();
  }, []);

  const loadAirports = async () => {
    try {
      const data = await getAllAirports();
      setAirports(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading airports:', error);
    }
  };

  const loadFlights = async () => {
    try {
      const data = await getAllFlights();
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading flights:', error);
    }
  };

  const handleAirportSubmit = async () => {
    try {
      if (editingAirport) {
        await updateAirport(editingAirport._id, airportForm);
      } else {
        await createAirport(airportForm);
      }
      loadAirports();
      closeAirportModal();
    } catch (error) {
      console.error('Error saving airport:', error);
    }
  };

  const handleDeleteAirport = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this airport?')) {
      try {
        await deleteAirport(id);
        loadAirports();
      } catch (error) {
        console.error('Error deleting airport:', error);
      }
    }
  };

  const handleFlightSubmit = async () => {
    try {
      if (editingFlight) {
        await updateFlight(editingFlight._id, flightForm);
      } else {
        await createFlight(flightForm);
      }
      loadFlights();
      closeFlightModal();
    } catch (error) {
      console.error('Error saving flight:', error);
    }
  };

  const handleDeleteFlight = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      try {
        await deleteFlight(id);
        setFlights(flights.filter(f => f._id !== id));
      } catch (error) {
        console.error('Error deleting flight:', error);
      }
    }
  };

  const openAirportModal = (airport = null) => {
    if (airport) {
      setEditingAirport(airport);
      setAirportForm(airport);
    } else {
      setEditingAirport(null);
      setAirportForm({ name: '', city: '', code: '', country: '' });
    }
    setShowAirportModal(true);
  };

  const closeAirportModal = () => {
    setShowAirportModal(false);
    setEditingAirport(null);
    setAirportForm({ name: '', city: '', code: '', country: '' });
  };

  const openFlightModal = (flight = null) => {
    if (flight) {
      setEditingFlight(flight);
      setFlightForm(flight);
    } else {
      setEditingFlight(null);
      setFlightForm({
        flightNumber: '',
        airline: '',
        from: { airport: '' },
        to: { airport: '' },
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        duration: '',
        tripType: 'one-way',
        pricing: { economy: 0, business: 0, firstClass: 0 },
        totalSeats: { economy: 0, business: 0, firstClass: 0 },
        stops: 0,
        freeMeal: false
      });
    }
    setShowFlightModal(true);
  };

  const closeFlightModal = () => {
    setShowFlightModal(false);
    setEditingFlight(null);
  };

  const filteredAirports = airports.filter(airport =>
    airport.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    airport.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAirportName = (id: string) => {
    const airport = airports.find(a => a._id === id);
    return airport ? `${airport.name} (${airport.code})` : id;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Flights Dashboard</h1>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('airports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'airports'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="inline w-5 h-5 mr-2" />
              Airports
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'flights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Plane className="inline w-5 h-5 mr-2" />
              Flights
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'airports' && (
            <div>
              {/* Search and Add Button */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search airports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => openAirportModal()}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Airport
                </button>
              </div>

              {/* Airports Table */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Airport Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Country
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAirports.map((airport) => (
                      <tr key={airport._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {airport.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {airport.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {airport.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {airport.country}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openAirportModal(airport)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                          <button
                            onClick={() => handleDeleteAirport(airport._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'flights' && (
            <div>
              {/* Add Flight Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => openFlightModal()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Flight
                </button>
              </div>

              {/* Flights Grid */}
              <div className="grid grid-cols-1 gap-6">
                {flights.map((flight) => (
                  <div key={flight._id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Plane className="w-6 h-6 text-blue-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {flight.airline}
                            </h3>
                            <p className="text-sm text-gray-500">#{flight.flightNumber}</p>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="font-medium">{getAirportName(flight.from.airport)}</p>
                            <p className="text-sm text-gray-600">{flight.departureDate} at {flight.departureTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="font-medium">{getAirportName(flight.to.airport)}</p>
                            <p className="text-sm text-gray-600">{flight.arrivalDate} at {flight.arrivalTime}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-4 text-sm text-gray-600">
                          <span>Duration: {flight.duration}</span>
                          <span>Stops: {flight.stops}</span>
                          <span>Type: {flight.tripType}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openFlightModal(flight)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFlight(flight._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Airport Modal */}
      {showAirportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingAirport ? 'Edit Airport' : 'Add Airport'}
              </h2>
              <button onClick={closeAirportModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Airport Code *
                </label>
                <input
                  type="text"
                  required
                  value={airportForm.code}
                  onChange={(e) => setAirportForm({ ...airportForm, code: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., JFK"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Airport Name *
                </label>
                <input
                  type="text"
                  required
                  value={airportForm.name}
                  onChange={(e) => setAirportForm({ ...airportForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., John F. Kennedy International"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={airportForm.city}
                  onChange={(e) => setAirportForm({ ...airportForm, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  required
                  value={airportForm.country}
                  onChange={(e) => setAirportForm({ ...airportForm, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={closeAirportModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAirportSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingAirport ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flight Modal */}
      {showFlightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingFlight ? 'Edit Flight' : 'Add Flight'}
              </h2>
              <button onClick={closeFlightModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Flight Number *
                </label>
                <input
                  type="text"
                  required
                  value={flightForm.flightNumber}
                  onChange={(e) => setFlightForm({ ...flightForm, flightNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Airline *
                </label>
                <input
                  type="text"
                  required
                  value={flightForm.airline}
                  onChange={(e) => setFlightForm({ ...flightForm, airline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Airport *
                </label>
                <select
                  required
                  value={flightForm.from.airport}
                  onChange={(e) => setFlightForm({
                    ...flightForm,
                    from: { airport: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Airport</option>
                  {airports.map(airport => (
                    <option key={airport._id} value={airport._id}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Airport *
                </label>
                <select
                  required
                  value={flightForm.to.airport}
                  onChange={(e) => setFlightForm({
                    ...flightForm,
                    to: { airport: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Airport</option>
                  {airports.map(airport => (
                    <option key={airport._id} value={airport._id}>
                      {airport.name} ({airport.code})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date *
                </label>
             <input
  type="date"
  required
  value={flightForm.departureDate ? flightForm.departureDate.split('T')[0] : ''}
  onChange={(e) => setFlightForm({ ...flightForm, departureDate: e.target.value })}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Time *
                </label>
                <input
                  type="time"
                  required
                  value={flightForm.departureTime}
                  onChange={(e) => setFlightForm({ ...flightForm, departureTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Date *
                </label>
              <input
  type="date"
  required
  value={flightForm.arrivalDate ? flightForm.arrivalDate.split('T')[0] : ''}
  onChange={(e) => setFlightForm({ ...flightForm, arrivalDate: e.target.value })}
  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Time *
                </label>
                <input
                  type="time"
                  required
                  value={flightForm.arrivalTime}
                  onChange={(e) => setFlightForm({ ...flightForm, arrivalTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 2h 45m"
                  value={flightForm.duration}
                  onChange={(e) => setFlightForm({ ...flightForm, duration: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trip Type *
                </label>
                <select
                  value={flightForm.tripType}
                  onChange={(e) => setFlightForm({ ...flightForm, tripType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="one-way">One-Way</option>
                  <option value="round-trip">Round-Trip</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stops
                </label>
                <input
                  type="number"
                  min="0"
                  value={flightForm.stops}
                  onChange={(e) => setFlightForm({ ...flightForm, stops: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="freeMeal"
                  checked={flightForm.freeMeal}
                  onChange={(e) => setFlightForm({ ...flightForm, freeMeal: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="freeMeal" className="text-sm font-medium text-gray-700">
                  Free Meal
                </label>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Class Pricing & Availability</h3>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(flightForm.pricing).map(([classType, price]) => (
                <div key={classType} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 capitalize">
                    {classType === 'firstClass' ? 'First Class' : classType}
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Price</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setFlightForm({
                          ...flightForm,
                          pricing: {
                            ...flightForm.pricing,
                            [classType]: Number(e.target.value)
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Seats Available</label>
                      <input
                        type="number"
                        value={flightForm.totalSeats[classType as keyof typeof flightForm.totalSeats]}
                        onChange={(e) => setFlightForm({
                          ...flightForm,
                          totalSeats: {
                            ...flightForm.totalSeats,
                            [classType]: Number(e.target.value)
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={closeFlightModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleFlightSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingFlight ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightAdminDashboard;