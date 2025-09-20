import React, { useState } from 'react';
import Map from './Map';
import { Bus } from 'lucide-react';
import { RouteStop } from '../../types';


interface RouteProgressProps {
  stops: RouteStop[];
  currentStopIndex: number;
}


const RouteProgress: React.FC<RouteProgressProps> = ({ stops, currentStopIndex }) => {
  const [showMap, setShowMap] = useState(false);

  // Prepare map data from stops
  const routeCoords = stops.map(stop => stop.location.coordinates);
  const markers = stops.map((stop, idx) => ({
    position: stop.location.coordinates,
    popup: stop.location.name,
    color: idx === 0 ? '#10B981' : idx === stops.length - 1 ? '#EF4444' : '#8B5CF6',
  }));

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center w-full py-8">
        {stops.map((stop, idx) => (
          <React.Fragment key={stop.location.id}>
            <div className="flex flex-col items-center">
              {idx === currentStopIndex ? (
                <Bus className="h-8 w-8 text-blue-600 animate-bounce" />
              ) : (
                <div className={`h-8 w-8 rounded-full flex items-center justify-center border-2 ${idx < currentStopIndex ? 'border-blue-600 bg-blue-100' : 'border-gray-300 bg-white'}`}></div>
              )}
              <span className={`mt-2 text-sm ${idx === currentStopIndex ? 'font-bold text-blue-700' : 'text-gray-700'}`}>{stop.location.name}</span>
              <span className="text-xs text-gray-500 mt-1">{stop.arrivalTime}</span>
            </div>
            {idx < stops.length - 1 && (
              <div className={`flex-1 h-1 mx-2 ${idx < currentStopIndex ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
        onClick={() => setShowMap(v => !v)}
      >
        {showMap ? 'Hide Map' : 'Show Route Map'}
      </button>
      {showMap && (
        <div className="w-full max-w-2xl mt-4">
          <Map
            center={routeCoords[currentStopIndex] || routeCoords[0]}
            zoom={10}
            markers={markers}
            route={routeCoords}
            className="h-64 rounded-lg overflow-hidden"
          />
        </div>
      )}
    </div>
  );
};

export default RouteProgress;
