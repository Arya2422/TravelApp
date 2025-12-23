import  { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, X, Train, MapPin, Search } from 'lucide-react';
import { createStation, createTrain, deleteStation, deleteTrain, getAllStations, getAllTrains, updateStation, updateTrain } from '@/api/train';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stations');
  const [stations, setStations] = useState<any[]>([]);
  const [trains, setTrains] = useState<any[]>([]);
  const [showStationModal, setShowStationModal] = useState(false);
  const [showTrainModal, setShowTrainModal] = useState(false);
  type Station = {
    _id: string;
    stationCode: string;
    stationName: string;
    city: string;
    state: string;
  };
  const [editingStation, setEditingStation] = useState<Station | null>(null);

  type Train = {
    _id: string;
    trainNumber: string;
    trainName: string;
    from: { stationCode: string; stationName: string };
    to: { stationCode: string; stationName: string };
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    trainType: string;
    classes: {
      sleeper: { price: number; seatsAvailable: number };
      ac3: { price: number; seatsAvailable: number };
      ac2: { price: number; seatsAvailable: number };
      ac1: { price: number; seatsAvailable: number };
    };
  };

  const [editingTrain, setEditingTrain] = useState<Train | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Station Form State
  const [stationForm, setStationForm] = useState({
    stationCode: '',
    stationName: '',
    city: '',
    state: ''
  });

  // Train Form State
  const [trainForm, setTrainForm] = useState({
    trainNumber: '',
    trainName: '',
    from: { stationCode: '', stationName: '' },
    to: { stationCode: '', stationName: '' },
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    trainType: 'Express',
    classes: {
      sleeper: { price: 0, seatsAvailable: 0 },
      ac3: { price: 0, seatsAvailable: 0 },
      ac2: { price: 0, seatsAvailable: 0 },
      ac1: { price: 0, seatsAvailable: 0 }
    }
  });

useEffect(() => {
  loadStations();
  loadTrains();
}, []);

const loadStations = async () => {
  try {
    const data = await getAllStations();
    setStations(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error loading stations:', error);
  }
};
const loadTrains = async () => {
  try {
    const data = await getAllTrains(); // call the new API function
    setTrains(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error loading trains:', error);
  }
};

const handleStationSubmit = async () => {
  try {
    if (editingStation) {
      await updateStation(editingStation._id, stationForm);
    } else {
      await createStation(stationForm);
    }
    loadStations();
    closeStationModal();
  } catch (error) {
    console.error('Error saving station:', error);
  }
};


const handleDeleteStation = async (id: string) => {
  if (window.confirm('Are you sure you want to delete this station?')) {
    try {
      await deleteStation(id);
      loadStations();
    } catch (error) {
      console.error('Error deleting station:', error);
    }
  }
};

const handleTrainSubmit = async () => {
  try {
    if (editingTrain) {
      await updateTrain(editingTrain._id, trainForm);
    } else {
      await createTrain(trainForm);
    }
    loadTrains();
    closeTrainModal();
  } catch (error) {
    console.error('Error saving train:', error);
  }
};

 const handleDeleteTrain = async (id: string) => {
  if (window.confirm('Are you sure you want to delete this train?')) {
    try {
      await deleteTrain(id);
      setTrains(trains.filter(t => t._id !== id));
    } catch (error) {
      console.error('Error deleting train:', error);
    }
  }
};


  const openStationModal = (station = null) => {
    if (station) {
      setEditingStation(station);
      setStationForm(station);
    } else {
      setEditingStation(null);
      setStationForm({ stationCode: '', stationName: '', city: '', state: '' });
    }
    setShowStationModal(true);
  };

  const closeStationModal = () => {
    setShowStationModal(false);
    setEditingStation(null);
    setStationForm({ stationCode: '', stationName: '', city: '', state: '' });
  };

  const openTrainModal = (train = null) => {
    if (train) {
      setEditingTrain(train);
      setTrainForm(train);
    } else {
      setEditingTrain(null);
      setTrainForm({
        trainNumber: '',
        trainName: '',
        from: { stationCode: '', stationName: '' },
        to: { stationCode: '', stationName: '' },
        departureDate: '',
        departureTime: '',
        arrivalDate: '',
        arrivalTime: '',
        trainType: 'Express',
        classes: {
          sleeper: { price: 0, seatsAvailable: 0 },
          ac3: { price: 0, seatsAvailable: 0 },
          ac2: { price: 0, seatsAvailable: 0 },
          ac1: { price: 0, seatsAvailable: 0 }
        }
      });
    }
    setShowTrainModal(true);
  };

  const closeTrainModal = () => {
    setShowTrainModal(false);
    setEditingTrain(null);
  };

  const filteredStations = stations.filter(station =>
    station.stationName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.stationCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Trains Dashboard </h1>
         
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('stations')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stations'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MapPin className="inline w-5 h-5 mr-2" />
              Stations
            </button>
            <button
              onClick={() => setActiveTab('trains')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'trains'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Train className="inline w-5 h-5 mr-2" />
              Trains
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === 'stations' && (
            <div>
              {/* Search and Add Button */}
              <div className="flex justify-between items-center mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => openStationModal()}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Station
                </button>
              </div>

              {/* Stations Table */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Station Code
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Station Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStations.map((station) => (
                      <tr key={station._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {station.stationCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {station.stationName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {station.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {station.state}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openStationModal(station)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <Edit className="w-4 h-4 inline" />
                          </button>
                          <button
                            onClick={() => handleDeleteStation(station._id)}
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

          {activeTab === 'trains' && (
            <div>
              {/* Add Train Button */}
              <div className="flex justify-end mb-6">
                <button
                  onClick={() => openTrainModal()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Train
                </button>
              </div>

              {/* Trains Grid */}
              <div className="grid grid-cols-1 gap-6">
                {trains.map((train) => (
                  <div key={train._id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <Train className="w-6 h-6 text-blue-600 mr-3" />
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {train.trainName}
                            </h3>
                            <p className="text-sm text-gray-500">#{train.trainNumber}</p>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">From</p>
                            <p className="font-medium">{train.from.stationName} ({train.from.stationCode})</p>
                            <p className="text-sm text-gray-600">{train.departureDate} at {train.departureTime}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">To</p>
                            <p className="font-medium">{train.to.stationName} ({train.to.stationCode})</p>
                            <p className="text-sm text-gray-600">{train.arrivalDate} at {train.arrivalTime}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openTrainModal(train)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTrain(train._id)}
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

      {/* Station Modal */}
      {showStationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingStation ? 'Edit Station' : 'Add Station'}
              </h2>
              <button onClick={closeStationModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Station Code *
                </label>
                <input
                  type="text"
                  required
                  value={stationForm.stationCode}
                  onChange={(e) => setStationForm({ ...stationForm, stationCode: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Station Name *
                </label>
                <input
                  type="text"
                  required
                  value={stationForm.stationName}
                  onChange={(e) => setStationForm({ ...stationForm, stationName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={stationForm.city}
                  onChange={(e) => setStationForm({ ...stationForm, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={stationForm.state}
                  onChange={(e) => setStationForm({ ...stationForm, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex space-x-3">
              <button
                onClick={closeStationModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStationSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingStation ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Train Modal */}
      {showTrainModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full p-6 my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingTrain ? 'Edit Train' : 'Add Train'}
              </h2>
              <button onClick={closeTrainModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Train Number *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.trainNumber}
                  onChange={(e) => setTrainForm({ ...trainForm, trainNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Train Name *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.trainName}
                  onChange={(e) => setTrainForm({ ...trainForm, trainName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Station Code *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.from.stationCode}
                  onChange={(e) => setTrainForm({
                    ...trainForm,
                    from: { ...trainForm.from, stationCode: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Station Name *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.from.stationName}
                  onChange={(e) => setTrainForm({
                    ...trainForm,
                    from: { ...trainForm.from, stationName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Station Code *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.to.stationCode}
                  onChange={(e) => setTrainForm({
                    ...trainForm,
                    to: { ...trainForm.to, stationCode: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To Station Name *
                </label>
                <input
                  type="text"
                  required
                  value={trainForm.to.stationName}
                  onChange={(e) => setTrainForm({
                    ...trainForm,
                    to: { ...trainForm.to, stationName: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date *
                </label>
                <input
                  type="date"
                  required
                  value={trainForm.departureDate}
                  onChange={(e) => setTrainForm({ ...trainForm, departureDate: e.target.value })}
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
                  value={trainForm.departureTime}
                  onChange={(e) => setTrainForm({ ...trainForm, departureTime: e.target.value })}
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
                  value={trainForm.arrivalDate}
                  onChange={(e) => setTrainForm({ ...trainForm, arrivalDate: e.target.value })}
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
                  value={trainForm.arrivalTime}
                  onChange={(e) => setTrainForm({ ...trainForm, arrivalTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Train Type *
                </label>
                <select
                  value={trainForm.trainType}
                  onChange={(e) => setTrainForm({ ...trainForm, trainType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Express">Express</option>
                  <option value="Superfast">Superfast</option>
                  <option value="Passenger">Passenger</option>
                </select>
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-4">Class Pricing & Availability</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(trainForm.classes).map(([classType, classData]) => (
                <div key={classType} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3 capitalize">
                    {classType === 'ac1' ? 'AC 1-Tier' : 
                     classType === 'ac2' ? 'AC 2-Tier' : 
                     classType === 'ac3' ? 'AC 3-Tier' : 'Sleeper'}
                  </h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Price</label>
                      <input
                        type="number"
                        value={classData.price}
                        onChange={(e) => setTrainForm({
                          ...trainForm,
                          classes: {
                            ...trainForm.classes,
                            [classType]: { ...classData, price: Number(e.target.value) }
                          }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Seats Available</label>
                      <input
                        type="number"
                        value={classData.seatsAvailable}
                        onChange={(e) => setTrainForm({
                          ...trainForm,
                          classes: {
                            ...trainForm.classes,
                            [classType]: { ...classData, seatsAvailable: Number(e.target.value) }
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
                onClick={closeTrainModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleTrainSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {editingTrain ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;