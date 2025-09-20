import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Navigation2, Phone } from 'lucide-react';
import { Bus } from '../../types';
import { getStatusColor, simulateBusMovement } from '../../utils/mockData';
import Map from '../common/Map';

interface BusTrackingProps {
  bus: Bus;
  onBack: () => void;
}

const BusTracking: React.FC<BusTrackingProps> = ({ bus: initialBus, onBack }) => {
  const [bus, setBus] = useState<Bus>(initialBus);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Simulate bus movement if it's on the way
    let movementInterval: NodeJS.Timeout | undefined;
    if (bus.currentStatus === 'On the Way') {
      movementInterval = simulateBusMovement(bus, setBus);
    }

    return () => {
      clearInterval(timeInterval);
      if (movementInterval) clearInterval(movementInterval);
    };
  }, [bus]);

  const getMapMarkers = () => {
    const markers = [
      {
        position: bus.startLocation.coordinates as [number, number],
        popup: `Start: ${bus.startLocation.name}`,
        color: '#10B981'
      },
      {
        position: bus.endLocation.coordinates as [number, number],
        popup: `End: ${bus.endLocation.name}`,
        color: '#EF4444'
      }
    ];

    // Add current position marker if bus is moving
    if (bus.currentStatus === 'On the Way') {
      markers.push({
        position: bus.currentLocation,
        popup: `Bus ${bus.number} - Current Location`,
        color: '#3B82F6'
      });
    }

    // Add stop markers
    bus.stops.forEach((stop, index) => {
      if (stop.id !== bus.startLocation.id && stop.id !== bus.endLocation.id) {
        markers.push({
          position: stop.coordinates as [number, number],
          popup: `Stop: ${stop.name}`,
          color: '#8B5CF6'
        });
      }
    });

    return markers;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bus {bus.number}</h1>
              <p className="text-gray-600">{bus.startLocation.name} → {bus.endLocation.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bus Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bus.currentStatus)}`}>
                    {bus.currentStatus}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">ETA:</span>
                  <span className="font-medium text-gray-900">{bus.eta}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Driver:</span>
                  <span className="font-medium text-gray-900">{bus.driverName}</span>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Route Details</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Departure</p>
                    <p className="font-medium text-gray-900">{bus.startLocation.name}</p>
                    <p className="text-sm text-gray-500">{bus.startTime}</p>
                  </div>
                </div>

                <div className="border-l-2 border-gray-200 ml-2 pl-6 py-2">
                  {bus.stops.slice(1, -1).map((stop, index) => (
                    <div key={stop.id} className="flex items-start space-x-3 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium text-gray-900">{stop.name}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-red-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium text-gray-900">{bus.endLocation.name}</p>
                    <p className="text-sm text-gray-500">{bus.endTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Updates</h3>
              <div className="space-y-3">
                {bus.currentStatus === 'On the Way' && (
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <Navigation2 className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Bus is moving</p>
                      <p className="text-xs text-blue-600">
                        Last updated: {currentTime.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                )}
                
                {bus.currentStatus === 'Yet to Start' && (
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <Clock className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <p className="text-sm text-yellow-800 font-medium">Waiting to depart</p>
                      <p className="text-xs text-yellow-600">
                        Scheduled start: {bus.startTime}
                      </p>
                    </div>
                  </div>
                )}

                {bus.currentStatus === 'Reached' && (
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <p className="text-sm text-green-800 font-medium">Reached destination</p>
                      <p className="text-xs text-green-600">
                        Arrived at {bus.endLocation.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Live Map</h3>
              <Map
                center={bus.currentLocation}
                zoom={6}
                markers={getMapMarkers()}
                route={bus.route}
                className="h-96 lg:h-[600px] rounded-lg overflow-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusTracking;