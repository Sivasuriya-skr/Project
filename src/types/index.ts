export interface Driver {
  id: string;
  username: string;
  name: string;
}

export interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
}

export interface Bus {
  id: string;
  number: string;
  driverId: string;
  driverName: string;
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  endTime: string;
  currentStatus: 'Yet to Start' | 'On the Way' | 'Reached';
  currentLocation: [number, number];
  route: [number, number][];
  stops: Location[];
  eta: string;
}

export interface RouteStop {
  location: Location;
  arrivalTime: string;
}

export interface BusRoute {
  id: string;
  startLocation: Location;
  endLocation: Location;
  startTime: string;
  endTime: string;
  stops: RouteStop[];
  route: [number, number][];
}