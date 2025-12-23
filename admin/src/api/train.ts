export const createStation = async (data: any) => {
  const res = await axiosInstance.post("/stations", data);
  return res.data;
};

export const getAllStations = async () => {
  const res = await axiosInstance.get("/stations");
  return res.data;
};

export const getStationById = async (id: string) => {
  const res = await axiosInstance.get(`/stations/${id}`);
  return res.data;
};

export const updateStation = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/stations/${id}`, data);
  return res.data;
};

export const deleteStation = async (id: string) => {
  const res = await axiosInstance.delete(`/stations/${id}`);
  return res.data;
};

export const searchStations = async (query: string) => {
  const res = await axiosInstance.get(`/stations/search?q=${query}`);
  return res.data;
};

// === train.ts ===
import axiosInstance from "./axios";

export const createTrain = async (data: any) => {
  const res = await axiosInstance.post("/trains", data);
  return res.data;
};

export const getTrainById = async (id: string) => {
  const res = await axiosInstance.get(`/trains/${id}`);
  return res.data;
};

export const updateTrain = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/trains/${id}`, data);
  return res.data;
};

export const deleteTrain = async (id: string) => {
  const res = await axiosInstance.delete(`/trains/${id}`);
  return res.data;
};

export const searchTrains = async (params: {
  from: string;
  to: string;
  departureDate: string;
}) => {
  const res = await axiosInstance.get("/trains/search-trains", { params });
  return res.data;
};

// Get all trains (for admin)
export const getAllTrains = async () => {
  const res = await axiosInstance.get("/trains"); // calls GET /trains
  return res.data;
};
