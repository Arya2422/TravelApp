// types/booking.ts

import type { Flight } from "@/api/booking";

export interface Passenger {
  firstName: string;
  lastName: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  passportNumber: string;
  nationality: string;
}


export interface PassengerBookingTabProps {
  flight: Flight | null;
  travelClass: "economy" | "business" | "firstClass";
  setTravelClass: (value: "economy" | "business" | "firstClass") => void;
  numberOfTravellers: number;
  setNumberOfTravellers: (value: number) => void;
  passengers: Passenger[];
  openModalForPassenger: (index: number) => void;
  openPassengerModalIndex: number | null;
  modalPassenger: Passenger | null;
  setModalPassenger: (passenger: Passenger | null) => void;
  closeModal: () => void;
  saveModalPassenger: () => void;
}
export interface PaymentDetails {
  method: "card" | "upi" | "netbanking" | "wallet" | "cash";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
}

export interface CancellationDetails {
  isCancelled: boolean;
  cancelledAt?: string;
  reason?: string;
  refundAmount?: number;
}

export interface FlightInfo {
  flightId: string; // ObjectId reference to Flight
  flightNumber: string;
  airline: string;

  from: {
    airport: string;
    city: string;
    country: string;
    time: string;
  };

  to: {
    airport: string;
    city: string;
    country: string;
    time: string;
  };
}

export interface Booking {
  _id?: string;

  userId: string; // ObjectId of User who booked

  flight: FlightInfo;

  passengers: Passenger[];

  seatType: "economy" | "premium" | "business" | "first-class";

  totalPrice: number;

  payment: PaymentDetails;

  cancellation: CancellationDetails;

  createdAt?: string;
  updatedAt?: string;
}
