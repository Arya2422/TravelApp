// src/api/airportApi.ts
import { API_BASE_URL } from "./config";
import type { Airport } from "../types/airport";

export const searchAirports = async (query: string): Promise<Airport[]> => {
  const q = encodeURIComponent(query);
  const res = await fetch(`${API_BASE_URL}/airport/search?query=${q}`);
  if (!res.ok) {
    throw new Error("Failed to search airports");
  }
  const data: Airport[] = await res.json();
  return data;
};

// export const createAirport = async (payload: Partial<Airport>, token?: string): Promise<Airport> => {
//   const res = await fetch(`${API_BASE_URL}/airport/create`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     },
//     body: JSON.stringify(payload),
//   });
//   if (!res.ok) {
//     const body = await res.json().catch(() => ({}));
//     throw new Error(body?.error || "Failed to create airport");
//   }
//   return res.json();
// };
