import React, { useState } from 'react';
import { MapPin, Clock, Navigation, LogOut } from 'lucide-react';
import { Driver, BusRoute } from '../../types';
import RouteProgress from '../common/RouteProgress';

interface DriverDashboardProps {
  driver: Driver & { number?: string };
  route?: BusRoute;
  onLogout: () => void;
}

const DriverDashboard: React.FC<DriverDashboardProps> = ({ driver, route, onLogout }) => {
  // Helper to format time in 12-hour format
  const formatTime12 = (time: string) => {
    if (!time) return '';
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${minute} ${ampm}`;
  };

  const [currentStopIndex, setCurrentStopIndex] = useState(0);

  if (!route) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Navigation className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No Route Assigned</h3>
          <p className="text-gray-600">Please contact admin to assign a bus route.</p>
        </div>
      </div>
    );
  }

  // Build displayBus from route and driver
  const displayBus = {
    id: 'temp',
    number: driver.number || 'SC000',
    driverId: driver.id,
    driverName: driver.name,
    startLocation: route.startLocation,
    endLocation: route.endLocation,
    startTime: route.startTime,
    endTime: route.endTime,
    currentStatus: 'Yet to Start' as const,
    currentLocation: route.startLocation.coordinates,
    route: route.route,
    stops: route.stops,
    eta: route.endTime
  };

  const handleNextStop = () => {
    if (currentStopIndex < displayBus.stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Welcome back, {driver.name}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Navigation className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bus Number</p>
                <p className="text-xl font-bold text-gray-900">{displayBus.number}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Stop</p>
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
                  {displayBus.stops[currentStopIndex].location.name}
                  <span className="ml-2 text-xs text-yellow-200">({displayBus.stops[currentStopIndex].arrivalTime})</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ETA</p>
                <p className="text-xl font-bold text-gray-900">{formatTime12(displayBus.eta)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Progress Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Route Progress</h3>
          <RouteProgress stops={displayBus.stops} currentStopIndex={currentStopIndex} />
          <div className="flex justify-center mt-4">
            <button
              onClick={handleNextStop}
              disabled={currentStopIndex >= displayBus.stops.length - 1}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Next Stop
            </button>
          </div>
        </div>

        {/* Route Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Route Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">From:</span>
              <span className="font-medium">{displayBus.startLocation.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">To:</span>
              <span className="font-medium">{displayBus.endLocation.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">Start Time:</span>
              <span className="font-medium">{formatTime12(displayBus.startTime)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">End Time:</span>
              <span className="font-medium">{formatTime12(displayBus.endTime)}</span>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">All Stops & Arrival Times</h4>
            <ul className="divide-y divide-gray-200">
              {displayBus.stops.map((stop) => (
                <li key={stop.location.id} className="flex justify-between items-center py-2">
                  <span>{stop.location.name}</span>
                  <span className="text-xs text-gray-500">{formatTime12(stop.arrivalTime)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;