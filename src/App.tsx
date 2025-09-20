import { useState } from 'react';
import Navigation from './components/common/Navigation';
import DriverLogin from './components/driver/DriverLogin';
import RouteForm from './components/driver/RouteForm';
import DriverDashboard from './components/driver/DriverDashboard';
import GuestLanding from './components/guest/GuestLanding';
import BusList from './components/guest/BusList';
import BusTracking from './components/guest/BusTracking';
import { Driver, Bus, BusRoute } from './types';

type AppView = 
  | 'guest' 
  | 'bus-list' 
  | 'bus-tracking' 
  | 'driver-login' 
  | 'driver-route-form' 
  | 'driver-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('guest');
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);
  const [currentRoute, setCurrentRoute] = useState<BusRoute | null>(null);
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [searchParams, setSearchParams] = useState<{ from: string; to: string } | null>(null);

  const handleDriverLogin = (driver: Driver) => {
    setCurrentDriver(driver);
    // After login, require driver to enter route details
    setCurrentView('driver-route-form');
  };

  const handleDriverLogout = () => {
    setCurrentDriver(null);
    setCurrentRoute(null);
    setCurrentView('guest');
  };

  const handleRouteSubmit = (route: BusRoute) => {
    setCurrentRoute(route);
    setCurrentView('driver-dashboard');
  };

  const handleGuestSearch = (fromId: string, toId: string) => {
    setSearchParams({ from: fromId, to: toId });
    setCurrentView('bus-list');
  };

  const handleSelectBus = (bus: Bus) => {
    setSelectedBus(bus);
    setCurrentView('bus-tracking');
  };

  const handleBack = () => {
    if (currentView === 'bus-list') {
      setCurrentView('guest');
      setSearchParams(null);
    } else if (currentView === 'bus-tracking') {
      setCurrentView('bus-list');
      setSelectedBus(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'driver-login':
        return <DriverLogin onLogin={handleDriverLogin} />;
      
      case 'driver-route-form':
        return <RouteForm onSubmit={handleRouteSubmit} />;
      
      case 'driver-dashboard':
        return currentDriver ? (
          <DriverDashboard 
            driver={currentDriver} 
            route={currentRoute || undefined}
            onLogout={handleDriverLogout}
          />
        ) : null;
      
      case 'bus-list':
        return searchParams ? (
          <BusList
            fromCityId={searchParams.from}
            toCityId={searchParams.to}
            onBack={handleBack}
            onSelectBus={handleSelectBus}
          />
        ) : null;
      
      case 'bus-tracking':
        return selectedBus ? (
          <BusTracking
            bus={selectedBus}
            onBack={handleBack}
          />
        ) : null;
      
      default:
        return <GuestLanding onSearch={handleGuestSearch} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentView={currentView} 
        onViewChange={(view) => setCurrentView(view as AppView)} 
      />
      {renderCurrentView()}
    </div>
  );
}

export default App;