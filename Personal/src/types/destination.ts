
export interface Place {
  _id: string;
  name: string;
  description?: string;
  rating?: number;
  priceRange?: string;
  address?: string;
  images?: string[];
  isPopular?: boolean;
}

export interface DestinationData {
  city: string;
  hotels?: Place[];
  attractions?: Place[];
  famousPlaces?: Place[];
  restaurants?: Place[];
}

export interface DestinationPlacesProps {
  destination: DestinationData;
}

export type TabType = "hotels" | "attractions" | "famous-places" | "restaurants";
