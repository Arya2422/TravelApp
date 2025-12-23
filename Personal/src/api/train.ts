// src/api/train.ts

import type { Station, Train } from "@/types/train";
import { API_BASE_URL } from "./config";

export const searchStations = async (query: string): Promise<Station[]> => {
  const q = encodeURIComponent(query);

  const res = await fetch(`${API_BASE_URL}/stations/search?q=${q}`);

  if (!res.ok) {
    throw new Error("Failed to search stations");
  }

  return res.json();
};

export const searchTrains = async (params: {
  from: string;
  to: string;
  departureDate: string;
}): Promise<Train[]> => {
  const url = `${API_BASE_URL}/trains/search-trains?from=${params.from}&to=${params.to}&departureDate=${params.departureDate}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to search trains");
  }

  const data = await res.json();
  return data.trains || data;
};


export const getTrainById = async (trainId: string): Promise<Train> => {
  const res = await fetch(`${API_BASE_URL}/trains/${trainId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch train details");
  }

  return res.json();
};



// // ----------------------------------------------------
// // ✏️ Create Train (Admin) – Optional
// // ----------------------------------------------------
// export const createTrain = async (trainData: any): Promise<Train> => {
//   const res = await fetch(`${API_BASE_URL}/trains`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(trainData),
//   });

//   if (!res.ok) {
//     throw new Error("Failed to create train");
//   }

//   return res.json();
// };
