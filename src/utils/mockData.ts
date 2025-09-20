import { Driver, Location, Bus } from '../types';

export const mockLocations: Location[] = [
  // Major Districts
  { id: '1', name: 'Chennai', coordinates: [13.0827, 80.2707] },
  { id: '2', name: 'Coimbatore', coordinates: [11.0168, 76.9558] },
  { id: '3', name: 'Madurai', coordinates: [9.9252, 78.1198] },
  { id: '4', name: 'Tiruchirappalli', coordinates: [10.7905, 78.7047] },
  { id: '5', name: 'Salem', coordinates: [11.6643, 78.1460] },
  { id: '6', name: 'Tirunelveli', coordinates: [8.7139, 77.7567] },
  { id: '7', name: 'Vellore', coordinates: [12.9165, 79.1325] },
  { id: '8', name: 'Erode', coordinates: [11.3410, 77.7172] },
  { id: '9', name: 'Tiruppur', coordinates: [11.1085, 77.3411] },
  { id: '10', name: 'Thoothukudi', coordinates: [8.7642, 78.1348] },
  { id: '11', name: 'Dindigul', coordinates: [10.3673, 77.9803] },
  { id: '12', name: 'Thanjavur', coordinates: [10.7870, 79.1378] },
  { id: '13', name: 'Kanchipuram', coordinates: [12.8342, 79.7036] },
  { id: '14', name: 'Cuddalore', coordinates: [11.7447, 79.7689] },
  { id: '15', name: 'Karur', coordinates: [10.9601, 78.0766] },
  { id: '16', name: 'Ramanathapuram', coordinates: [9.3639, 78.8437] },
  { id: '17', name: 'Virudhunagar', coordinates: [9.5810, 77.9624] },
  { id: '18', name: 'Sivaganga', coordinates: [9.8433, 78.4809] },
  { id: '19', name: 'Nagapattinam', coordinates: [10.7667, 79.8420] },
  { id: '20', name: 'Namakkal', coordinates: [11.2189, 78.1677] },
  { id: '21', name: 'Dharmapuri', coordinates: [12.1211, 78.1583] },
  { id: '22', name: 'Krishnagiri', coordinates: [12.5186, 78.2137] },
  { id: '23', name: 'Ariyalur', coordinates: [11.1401, 79.0782] },
  { id: '24', name: 'Perambalur', coordinates: [11.2342, 78.8802] },
  { id: '25', name: 'Pudukkottai', coordinates: [10.3833, 78.8200] },
  { id: '26', name: 'Theni', coordinates: [10.0104, 77.4977] },
  { id: '27', name: 'Nilgiris', coordinates: [11.4064, 76.6932] },
  { id: '28', name: 'Kanyakumari', coordinates: [8.0883, 77.5385] },
  
  // Sub-districts and Important Towns
  { id: '29', name: 'Ambur', coordinates: [12.7916, 78.7167] },
  { id: '30', name: 'Hosur', coordinates: [12.7409, 77.8253] },
  { id: '31', name: 'Gudiyatham', coordinates: [12.9429, 78.8735] },
  { id: '32', name: 'Vaniyambadi', coordinates: [12.6819, 78.6201] },
  { id: '33', name: 'Arakkonam', coordinates: [13.0839, 79.6708] },
  { id: '34', name: 'Chengalpattu', coordinates: [12.6819, 79.9864] },
  { id: '35', name: 'Tambaram', coordinates: [12.9249, 80.1000] },
  { id: '36', name: 'Avadi', coordinates: [13.1147, 80.0982] },
  { id: '37', name: 'Tiruvallur', coordinates: [13.1439, 79.9094] },
  { id: '38', name: 'Poonamallee', coordinates: [13.0475, 80.0969] },
  { id: '39', name: 'Pollachi', coordinates: [10.6581, 77.0084] },
  { id: '40', name: 'Udumalaipettai', coordinates: [10.5908, 77.2448] },
  { id: '41', name: 'Mettupalayam', coordinates: [11.2989, 76.9439] },
  { id: '42', name: 'Gobichettipalayam', coordinates: [11.4552, 77.4364] },
  { id: '43', name: 'Bhavani', coordinates: [11.4481, 77.6814] },
  { id: '44', name: 'Sathyamangalam', coordinates: [11.5051, 77.2378] },
  { id: '45', name: 'Anthiyur', coordinates: [11.5751, 77.5951] },
  { id: '46', name: 'Avinashi', coordinates: [11.1925, 77.2686] },
  { id: '47', name: 'Palladam', coordinates: [11.1553, 77.2864] },
  { id: '48', name: 'Kangeyam', coordinates: [11.0078, 77.5614] },
  { id: '49', name: 'Dharapuram', coordinates: [10.7381, 77.5314] },
  { id: '50', name: 'Oddanchatram', coordinates: [10.4889, 77.7553] },
  { id: '51', name: 'Palani', coordinates: [10.4500, 77.5197] },
  { id: '52', name: 'Kodaikanal', coordinates: [10.2381, 77.4892] },
  { id: '53', name: 'Batlagundu', coordinates: [10.1500, 77.7667] },
  { id: '54', name: 'Nilakottai', coordinates: [10.1667, 77.8500] },
  { id: '55', name: 'Natham', coordinates: [10.2333, 78.2333] },
  { id: '56', name: 'Vedasandur', coordinates: [10.5314, 77.9497] },
  { id: '57', name: 'Sholavandan', coordinates: [10.1167, 77.8667] },
  { id: '58', name: 'Usilampatti', coordinates: [9.9667, 77.7833] },
  { id: '59', name: 'Andipatti', coordinates: [10.0167, 77.6167] },
  { id: '60', name: 'Periyakulam', coordinates: [10.1167, 77.5500] },
  { id: '61', name: 'Bodinayakanur', coordinates: [10.0167, 77.3500] },
  { id: '62', name: 'Cumbum', coordinates: [9.7333, 77.2833] },
  { id: '63', name: 'Uthamapalayam', coordinates: [9.8167, 77.3167] },
  { id: '64', name: 'Andipatti', coordinates: [9.9667, 77.6167] },
  { id: '65', name: 'Sankarankovil', coordinates: [9.1667, 77.5500] },
  { id: '66', name: 'Tenkasi', coordinates: [8.9667, 77.3167] },
  { id: '67', name: 'Shencottai', coordinates: [8.9833, 77.2333] },
  { id: '68', name: 'Ambasamudram', coordinates: [8.7167, 77.4500] },
  { id: '69', name: 'Kallidaikurichi', coordinates: [8.6833, 77.3667] },
  { id: '70', name: 'Radhapuram', coordinates: [8.4500, 77.3667] },
  { id: '71', name: 'Tiruchendur', coordinates: [8.4833, 78.1167] },
  { id: '72', name: 'Srivaikuntam', coordinates: [8.6333, 77.9167] },
  { id: '73', name: 'Ottapidaram', coordinates: [8.6000, 78.0833] },
  { id: '74', name: 'Kovilpatti', coordinates: [9.1667, 77.8667] },
  { id: '75', name: 'Kayathar', coordinates: [9.2333, 77.7833] },
  { id: '76', name: 'Srivilliputhur', coordinates: [9.5167, 77.6333] },
  { id: '77', name: 'Watrap', coordinates: [9.6167, 77.6500] },
  { id: '78', name: 'Rajapalayam', coordinates: [9.4500, 77.5500] },
  { id: '79', name: 'Srivilliputtur', coordinates: [9.5167, 77.6333] },
  { id: '80', name: 'Aruppukkottai', coordinates: [9.5167, 78.1000] }
];

export const mockDrivers: Driver[] = [
  { id: '1', username: 'driver1', name: 'Rajesh Kumar' },
  { id: '2', username: 'driver2', name: 'Amit Singh' },
  { id: '3', username: 'driver3', name: 'Priya Sharma' },
  { id: '4', username: 'driver4', name: 'Murugan S' },
  { id: '5', username: 'driver5', name: 'Lakshmi R' },
  { id: '6', username: 'driver6', name: 'Karthik M' },
];

export const generateMockBuses = (): Bus[] => [
  {
    id: '1',
    number: 'TN01AB1234',
    driverId: '1',
    driverName: 'Rajesh Kumar',
    startLocation: mockLocations[0], // Chennai
    endLocation: mockLocations[1], // Coimbatore
    startTime: '08:00',
    endTime: '14:00',
    currentStatus: 'On the Way',
    currentLocation: [12.0, 78.5],
    route: [
      [13.0827, 80.2707], // Chennai
      [12.0, 78.5], // Current position
      [11.5, 77.8],
      [11.0168, 76.9558] // Coimbatore
    ],
    stops: [mockLocations[0], mockLocations[4], mockLocations[1]], // Chennai -> Salem -> Coimbatore
    eta: '14:30'
  },
  {
    id: '2',
    number: 'TN02CD5678',
    driverId: '2',
    driverName: 'Amit Singh',
    startLocation: mockLocations[2], // Madurai
    endLocation: mockLocations[0], // Chennai
    startTime: '09:00',
    endTime: '17:00',
    currentStatus: 'Yet to Start',
    currentLocation: [9.9252, 78.1198],
    route: [
      [9.9252, 78.1198], // Madurai
      [10.7905, 78.7047], // Tiruchirappalli
      [11.7447, 79.7689], // Cuddalore
      [13.0827, 80.2707] // Chennai
    ],
    stops: [mockLocations[2], mockLocations[3], mockLocations[13], mockLocations[0]], // Madurai -> Trichy -> Cuddalore -> Chennai
    eta: '17:00'
  },
  {
    id: '3',
    number: 'TN03EF9012',
    driverId: '3',
    driverName: 'Priya Sharma',
    startLocation: mockLocations[5], // Tirunelveli
    endLocation: mockLocations[27], // Kanyakumari
    startTime: '07:00',
    endTime: '09:30',
    currentStatus: 'Reached',
    currentLocation: [8.0883, 77.5385],
    route: [
      [8.7139, 77.7567], // Tirunelveli
      [8.4833, 78.1167], // Tiruchendur
      [8.0883, 77.5385] // Kanyakumari
    ],
    stops: [mockLocations[5], mockLocations[71], mockLocations[27]], // Tirunelveli -> Tiruchendur -> Kanyakumari
    eta: 'Completed'
  },
  {
    id: '4',
    number: 'TN04GH3456',
    driverId: '4',
    driverName: 'Murugan S',
    startLocation: mockLocations[6], // Vellore
    endLocation: mockLocations[4], // Salem
    startTime: '10:00',
    endTime: '13:00',
    currentStatus: 'On the Way',
    currentLocation: [12.0, 78.5],
    route: [
      [12.9165, 79.1325], // Vellore
      [12.0, 78.5], // Current position
      [11.6643, 78.1460] // Salem
    ],
    stops: [mockLocations[6], mockLocations[4]], // Vellore -> Salem
    eta: '13:15'
  },
  {
    id: '5',
    number: 'TN05IJ7890',
    driverId: '5',
    driverName: 'Lakshmi R',
    startLocation: mockLocations[8], // Tiruppur
    endLocation: mockLocations[2], // Madurai
    startTime: '06:30',
    endTime: '11:00',
    currentStatus: 'Yet to Start',
    currentLocation: [11.1085, 77.3411],
    route: [
      [11.1085, 77.3411], // Tiruppur
      [10.7381, 77.5314], // Dharapuram
      [10.4500, 77.5197], // Palani
      [9.9252, 78.1198] // Madurai
    ],
    stops: [mockLocations[8], mockLocations[48], mockLocations[51], mockLocations[2]], // Tiruppur -> Dharapuram -> Palani -> Madurai
    eta: '11:00'
  },
  {
    id: '6',
    number: 'TN06KL2345',
    driverId: '6',
    driverName: 'Karthik M',
    startLocation: mockLocations[11], // Thanjavur
    endLocation: mockLocations[9], // Thoothukudi
    startTime: '08:30',
    endTime: '15:30',
    currentStatus: 'On the Way',
    currentLocation: [9.5, 78.5],
    route: [
      [10.7870, 79.1378], // Thanjavur
      [9.5, 78.5], // Current position
      [8.7642, 78.1348] // Thoothukudi
    ],
    stops: [mockLocations[11], mockLocations[9]], // Thanjavur -> Thoothukudi
    eta: '15:45'
  }
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'On the Way':
      return 'text-green-600 bg-green-50';
    case 'Yet to Start':
      return 'text-yellow-600 bg-yellow-50';
    case 'Reached':
      return 'text-red-600 bg-red-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export const simulateBusMovement = (bus: Bus, onUpdate: (updatedBus: Bus) => void) => {
  if (bus.currentStatus !== 'On the Way') return;

  const interval = setInterval(() => {
    const route = bus.route;
    const currentIndex = route.findIndex(
      ([lat, lng]) => 
        Math.abs(lat - bus.currentLocation[0]) < 0.1 && 
        Math.abs(lng - bus.currentLocation[1]) < 0.1
    );

    if (currentIndex < route.length - 1) {
      const nextPoint = route[currentIndex + 1];
      const updatedBus = {
        ...bus,
        currentLocation: nextPoint as [number, number]
      };

      if (currentIndex === route.length - 2) {
        updatedBus.currentStatus = 'Reached';
        updatedBus.eta = 'Completed';
        clearInterval(interval);
      }

      onUpdate(updatedBus);
    } else {
      clearInterval(interval);
    }
  }, 5000); // Update every 5 seconds

  return interval;
};