export type TrainClass = {
  price?: number;
  seatsAvailable?: number;
};

export type Classes = {
  sleeper?: TrainClass;
  ac3?: TrainClass;
  ac2?: TrainClass;
  ac1?: TrainClass;
};

export type Train = {
  _id?: string;
  trainNumber: string;
  trainName: string;
  from: { stationCode: string; stationName: string };
  to: { stationCode: string; stationName: string };
  departureDate: string; // YYYY-MM-DD
  departureTime: string; // HH:mm
  arrivalDate: string;
  arrivalTime: string;
  trainType?: "Express" | "Superfast" | "Passenger";
  classes?: Classes;
  createdAt?: string;
  updatedAt?: string;
};
