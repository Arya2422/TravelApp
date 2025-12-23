// src/types/flight.ts

import type { Airport } from "./airport";


export type SeatClass = "economy" | "business" | "firstClass";

export interface Pricing {
  economy: number;
  business?: number;
  firstClass?: number;
  [key: string]: number | undefined;
}

export interface Seats {
  economy?: number;
  business?: number;
  firstClass?: number;
  [key: string]: number | undefined;
}

export interface FlightEndpointAirportRef {
  // shape returned by backend when populated
  airport: Airport;
}

export type SearchParams = {
  from: string;
  to: string;
  departureDate: string;
  tripType: "one-way" | "round-trip";
  passengers: number;
  classType: SeatClass;
};

export interface Flight {
  _id: string;
  flightNumber: string;
  airline: string;
  from: FlightEndpointAirportRef;
  to: FlightEndpointAirportRef;
  departureDate: string; // ISO date string
  departureTime: string;
  arrivalDate?: string;
  arrivalTime: string;
  duration?: string;
  tripType?: "one-way" | "round-trip";
  pricing: Pricing;
  specialFares?: {
    student?: number;
    seniorCitizen?: number;
    armedForces?: number;
    [key: string]: number | undefined;
  };
  totalSeats?: Seats;
  availableSeats: Seats;
  status?: string;
  aircraft?: string;
  baggage?: {
    checkIn?: string;
    cabin?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}



export interface FlightResultsProps {
  flights: Flight[];
  classType: SeatClass;
  onSelectFlight: (flightId: string) => void;
}
