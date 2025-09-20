import React, { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Clock, Eye, Users } from 'lucide-react';
import { generateMockBuses, getStatusColor, simulateBusMovement } from '../../utils/mockData';
import { Bus } from '../../types';

interface BusListProps {
  fromCityId: string;
  toCityId: string;
  onBack: () => void;
  onSelectBus: (bus: Bus) => void;
}

const BusList: React.FC<BusListProps> = ({ fromCityId, toCityId, onBack, onSelectBus }) => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [filteredBuses, setFilteredBuses] = useState<Bus[]>([]);

  useEffect(() => {
    const allBuses = generateMockBuses();
    setBuses(allBuses);

    // Filter buses based on route
    const filtered = allBuses.filter(bus => 
      bus.startLocation.id === fromCityId && bus.endLocation.id === toCityId
    );
    setFilteredBuses(filtered);

    // Start simulation for moving buses
    const intervals: NodeJS.Timeout[] = [];
    
    filtered.forEach(bus => {
      if (bus.currentStatus === 'On the Way') {
        const interval = simulateBusMovement(bus, (updatedBus) => {
          setBuses(prevBuses => 
            prevBuses.map(b => b.id === updatedBus.id ? updatedBus : b)
          );
          setFilteredBuses(prevFiltered =>
            prevFiltered.map(b => b.id === updatedBus.id ? updatedBus : b)
          );
        });
        if (interval) intervals.push(interval);
      }
    });

    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [fromCityId, toCityId]);

  const fromCityName = filteredBuses[0]?.startLocation.name || 'Unknown';
  const toCityName = filteredBuses[0]?.endLocation.name || 'Unknown';

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
              <h1 className="text-2xl font-bold text-gray-900">Available Buses</h1>
              <p className="text-gray-600">{fromCityName} → {toCityName}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredBuses.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Buses Available</h3>
            <p className="text-gray-600 mb-6">
              No buses are currently running on this route. Please try a different route or check back later.
            </p>
            <button
              onClick={onBack}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Search Another Route
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-gray-600">
              Found {filteredBuses.length} bus{filteredBuses.length !== 1 ? 'es' : ''} on this route
            </p>
            
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Bus {bus.number}
                        </h3>
                        <p className="text-gray-600">Driver: {bus.driverName}</p>
                      </div>
                      
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bus.currentStatus)}`}>
                        {bus.currentStatus}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-green-600" />
                        <div>
                          <p className="text-sm">From</p>
                          <p className="font-medium text-gray-900">{bus.startLocation.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-red-600" />
                        <div>
                          <p className="text-sm">To</p>
                          <p className="font-medium text-gray-900">{bus.endLocation.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <div>
                          <p className="text-sm">Start Time</p>
                          <p className="font-medium text-gray-900">{bus.startTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <div>
                          <p className="text-sm">ETA</p>
                          <p className="font-medium text-gray-900">{bus.eta}</p>
                        </div>
                      </div>
                    </div>

                    {bus.currentStatus === 'On the Way' && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">
                          🚌 This bus is currently on the move! Track its live location.
                        </p>
                      </div>
                    )}

                    {bus.currentStatus === 'Yet to Start' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                        <p className="text-yellow-800 text-sm">
                          ⏰ Bus will start at {bus.startTime}. Get ready!
                        </p>
                      </div>
                    )}

                    {bus.currentStatus === 'Reached' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-green-800 text-sm">
                          ✅ Bus has reached its destination.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="lg:ml-6 mt-4 lg:mt-0">
                    <button
                      onClick={() => onSelectBus(bus)}
                      className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                      <Eye className="h-5 w-5" />
                      <span>Track Bus</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BusList;