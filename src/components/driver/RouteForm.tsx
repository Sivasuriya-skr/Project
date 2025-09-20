import React, { useState } from 'react';
import { MapPin, Clock, Navigation, Save, Plus, Trash2 } from 'lucide-react';
import { mockLocations } from '../../utils/mockData';
import { BusRoute, RouteStop } from '../../types';

interface RouteFormProps {
  onSubmit: (route: BusRoute) => void;
}

const RouteForm: React.FC<RouteFormProps> = ({ onSubmit }) => {
  const [startLocation, setStartLocation] = useState<string>('');
  const [endLocation, setEndLocation] = useState<string>('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [stops, setStops] = useState<RouteStop[]>([]);
  const [newStopLocation, setNewStopLocation] = useState('');
  const [newStopArrival, setNewStopArrival] = useState('');
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);

  const handleAddStop = () => {
    if (!newStopLocation || !newStopArrival) return;
    const location = mockLocations.find(loc => loc.id === newStopLocation);
    if (!location) return;
    setStops([...stops, { location, arrivalTime: newStopArrival }]);
    setNewStopLocation('');
    setNewStopArrival('');
  };

  const handleRemoveStop = (idx: number) => {
    setStops(stops.filter((_, i) => i !== idx));
  };

  const handleGPSShare = () => {
    if (navigator.geolocation) {
      setGpsEnabled(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('GPS Error:', error);
          setGpsEnabled(false);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const startLoc = mockLocations.find(loc => loc.id === startLocation);
    const endLoc = mockLocations.find(loc => loc.id === endLocation);
    if (!startLoc || !endLoc) return;
    // Build stops: start, all user stops, end
    const allStops: RouteStop[] = [
      { location: startLoc, arrivalTime: startTime },
      ...stops,
      { location: endLoc, arrivalTime: endTime }
    ];
    const route: BusRoute = {
      id: Date.now().toString(),
      startLocation: startLoc,
      endLocation: endLoc,
      startTime,
      endTime,
      stops: allStops,
      route: allStops.map(s => s.location.coordinates)
    };
    onSubmit(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="bg-blue-600 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Navigation className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Create Bus Route</h2>
            <p className="text-gray-600 mt-2">Configure your route and schedule</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Starting Location
                </label>
                <select
                  id="startLocation"
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  required
                >
                  <option value="">Select starting city</option>
                  {mockLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Start Time
                </label>
                <input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Destination
                </label>
                <select
                  id="endLocation"
                  value={endLocation}
                  onChange={(e) => setEndLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  required
                >
                  <option value="">Select destination city</option>
                  {mockLocations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  End Time
                </label>
                <input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-3"
                  required
                />
              </div>
            </div>

            {/* Add intermediate stops */}
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold mb-2">Intermediate Stops</h4>
              <div className="flex flex-wrap gap-4 mb-4">
                <select
                  value={newStopLocation}
                  onChange={e => setNewStopLocation(e.target.value)}
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-2"
                >
                  <option value="">Select stop</option>
                  {mockLocations.filter(loc => loc.id !== startLocation && loc.id !== endLocation && !stops.some(s => s.location.id === loc.id)).map(loc => (
                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                  ))}
                </select>
                <input
                  type="time"
                  value={newStopArrival}
                  onChange={e => setNewStopArrival(e.target.value)}
                  className="border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-2 px-2"
                  placeholder="Arrival Time"
                />
                <button
                  type="button"
                  onClick={handleAddStop}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Stop
                </button>
              </div>
              {stops.length > 0 && (
                <ul className="space-y-2">
                  {stops.map((stop, idx) => (
                    <li key={stop.location.id} className="flex items-center justify-between bg-white rounded p-2 shadow-sm">
                      <span>{stop.location.name} <span className="text-xs text-gray-500">({stop.arrivalTime})</span></span>
                      <button type="button" onClick={() => handleRemoveStop(idx)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-gray-700">GPS Location Sharing</label>
                <button
                  type="button"
                  onClick={handleGPSShare}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    gpsEnabled
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  {gpsEnabled ? 'GPS Enabled' : 'Enable GPS'}
                </button>
              </div>
              {currentLocation && (
                <p className="text-sm text-gray-600">
                  Current Location: {currentLocation[0].toFixed(4)}, {currentLocation[1].toFixed(4)}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Create Route</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RouteForm;