import React, { useState } from 'react';
import { MapPin, Search, Bus } from 'lucide-react';
import { mockLocations } from '../../utils/mockData';

interface GuestLandingProps {
  onSearch: (from: string, to: string) => void;
}

const GuestLanding: React.FC<GuestLandingProps> = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity && toCity) {
      onSearch(fromCity, toCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-blue-600 p-4 rounded-full">
                <Bus className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your Bus in
              <span className="text-blue-600"> Real-Time</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Find and track buses between cities with live location updates, 
              arrival times, and route information - all without any registration required.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fromCity" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1 text-green-600" />
                      From City
                    </label>
                    <select
                      id="fromCity"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-4 text-lg"
                      required
                    >
                      <option value="">Select departure city</option>
                      {mockLocations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="toCity" className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1 text-red-600" />
                      To City
                    </label>
                    <select
                      id="toCity"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 py-4 text-lg"
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
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold flex items-center justify-center space-x-3 shadow-lg"
                >
                  <Search className="h-6 w-6" />
                  <span>Find Buses</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose SmartCommute?</h2>
            <p className="text-lg text-gray-600">Experience the future of public transportation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
              <p className="text-gray-600">Get live location updates and accurate arrival times for all buses</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Bus className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Routes</h3>
              <p className="text-gray-600">Choose from various bus routes connecting major cities</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Search</h3>
              <p className="text-gray-600">Find buses instantly without any registration or signup</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLanding;