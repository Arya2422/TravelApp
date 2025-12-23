export interface Station {
  _id: string;
  stationCode: string;
  stationName: string;
  city: string;
}

export interface Train {
  _id: string;
  trainNumber: string;
  trainName: string;
  from: {
    stationCode: string;
    stationName: string;
  };
  to: {
    stationCode: string;
    stationName: string;
  };
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  trainType: "Express" | "Superfast" | "Passenger";
  classes: {
    sleeper?: { price: number; seatsAvailable: number };
    ac3?: { price: number; seatsAvailable: number };
    ac2?: { price: number; seatsAvailable: number };
    ac1?: { price: number; seatsAvailable: number };
  };
}
