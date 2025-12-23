import type { Discount } from "@/api/booking";

export interface PaymentSummaryTabProps {
  discountCode: string;
  setDiscountCode: (value: string) => void;
  discountData: Discount | null;
  discountLoading: boolean;
  applyDiscount: () => void;
  baseFare: number;
  discount: number;
  taxes: number;
  totalAmount: number;
  bookingLoading: boolean;
  step2Done: boolean;
  handleBooking: () => void;
}