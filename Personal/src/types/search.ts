import type { Airport } from "./airport";

import type { Station } from "./train";

export type TravelMode = "flight" | "train" | "bus";
export type SeatClass = "economy" | "business" | "firstClass";
export type TrainClass = "sleeper" | "ac3" | "ac2" | "ac1";


export interface SearchParams {
  from: string;
  to: string;
  departureDate: string;
  tripType: string;
  passengers: number;
  classType: SeatClass;
  trainClass: TrainClass;
}

export interface SearchCardProps {
  travelMode: TravelMode;
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
  selectedFromAirport: Airport | null;
  setSelectedFromAirport: (airport: Airport | null) => void;
  selectedToAirport: Airport | null;
  setSelectedToAirport: (airport: Airport | null) => void;
  selectedFromStation: Station | null;
  setSelectedFromStation: (station: Station | null) => void;
  selectedToStation: Station | null;
  setSelectedToStation: (station: Station | null) => void;
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  onSearch: () => void;
}