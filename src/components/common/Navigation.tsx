import React from 'react';
import { Bus, User } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Bus className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">SmartCommute Lite</h1>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => onViewChange('guest')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView === 'guest' || currentView === 'bus-list' || currentView === 'bus-tracking'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bus className="h-4 w-4" />
              <span>Guest Access</span>
            </button>
            
            <button
              onClick={() => onViewChange('driver-login')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                currentView.startsWith('driver')
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Driver Login</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;