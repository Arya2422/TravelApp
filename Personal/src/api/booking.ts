import { API_BASE_URL } from "./config";

export type Passenger = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "male" | "female" | "other";
  seatNumber: string;
};

export type BookingPayload = {
  flightId: string;
  travelClass: string;
  numberOfTravellers: number;
  specialFareType: string;
  passengers: Passenger[];
  contactEmail: string;
  contactPhone: string;
};

export type Discount = {
  code: string;
  type: "percent" | "flat";
  value: number;
};

export type AirportInfo = {
  code: string;
  city: string;
  country: string;
};

export type Flight = {
  _id: string;
  airline: string;
  flightNumber: string;
  from: Location;
  to: Location;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  duration: string;
  pricing: { economy: number; business?: number; firstClass?: number };
};


interface Location {
  city: string;
  airport: string;
  code: string;
}

export type Booking = {
  _id: string;
  bookingReference: string;
  flight: Flight;
  passengers: Passenger[];
  travelClass: string;
  numberOfTravellers: number;
  totalAmount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
};

class FlightBookingAPI {
  // Get flight details
  static async getFlight(flightId: string) {
    const res = await fetch(`${API_BASE_URL}/flight/${flightId}`);
    if (!res.ok) throw new Error("Failed to fetch flight");
    return res.json() as Promise<Flight>;
  }

  // Validate discount
  static async validateDiscount(code: string) {
    const res = await fetch(`${API_BASE_URL}/discount/${code}`);
    if (!res.ok) throw new Error("Invalid or expired code");
    return res.json() as Promise<Discount>;
  }

  // Create a new booking
  static async createBooking(payload: BookingPayload, token?: string) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE_URL}/booking/booking`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || "Booking failed");
    }

    return res.json();
  }

  // ✅ Get my bookings
  static async getMyBookings(token: string, page = 1, limit = 20): Promise<Booking[]> {
    const res = await fetch(`${API_BASE_URL}/booking/my-bookings?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || "Failed to fetch bookings");
    }

    return res.json();
  }

  // ✅ Cancel a booking
  static async cancelBooking(token: string, bookingId: string, reason: string) {
    const res = await fetch(`${API_BASE_URL}/booking/${bookingId}/cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ reason }),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || "Failed to cancel booking");
    }

    return res.json();
  }
}

export default FlightBookingAPI;
