// src/api/flight.ts
import { API_BASE_URL } from "./config";
import type { Flight } from "../types/flight";

export interface FlightSearchParams {
  from: string; // airport code
  to: string;   // airport code
  departureDate: string; // yyyy-mm-dd
  minPrice?: number;
  maxPrice?: number;
  airlines?: string;  // comma-separated
  stops?: string;     // comma-separated numbers
  freeMeal?: string;  // "true" or undefined
  timeSlot?: string;  // "before6", "morning", "afternoon", "after6"
}

export interface CityPlace {
  _id: string;
  city: string;
  name: string;
  type: "hotel" | "attraction" | "famous-place";
  description?: string;
  rating?: number;
  isPopular?: boolean;
  imageUrl?: string;
}

export interface DestinationInfo {
  city: string;
  hotels: CityPlace[];
  attractions: CityPlace[];
  famousPlaces: CityPlace[];
}

export interface FlightSearchResponse {
  flights: Flight[];
  destination: DestinationInfo;
}

export interface FlightDetailResponse {
  flight: Flight;
  destination: DestinationInfo;
}

export const searchFlights = async (params: FlightSearchParams): Promise<FlightSearchResponse> => {
  const queryParams: Record<string, string> = {
    from: params.from,
    to: params.to,
    departureDate: params.departureDate,
  };

  // Add optional filters
  if (params.minPrice !== undefined) queryParams.minPrice = String(params.minPrice);
  if (params.maxPrice !== undefined) queryParams.maxPrice = String(params.maxPrice);
  if (params.airlines) queryParams.airlines = params.airlines;
  if (params.stops) queryParams.stops = params.stops;
  if (params.freeMeal) queryParams.freeMeal = params.freeMeal;
  if (params.timeSlot) queryParams.timeSlot = params.timeSlot;

  const qs = new URLSearchParams(queryParams);
  const res = await fetch(`${API_BASE_URL}/flight/search?${qs.toString()}`);
  
  if (!res.ok) {
    throw new Error("Failed to search flights");
  }
  
  const data: FlightSearchResponse = await res.json();
  return data;
};

export const getFlightById = async (id: string): Promise<FlightDetailResponse> => {
  const res = await fetch(`${API_BASE_URL}/flight/${id}`);
  
  if (!res.ok) {
    throw new Error("Failed to fetch flight details");
  }
  
  const data: FlightDetailResponse = await res.json();
  return data;
};