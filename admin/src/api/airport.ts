import axiosInstance from "./axios";

export const createAirport = async (data: {
  name: string;
  city: string;
  code: string;
  country: string;
}) => {
  const res = await axiosInstance.post("/airport/create", data);
  return res.data;
};

export const searchAirport = async (query: string) => {
  const res = await axiosInstance.get(`/airport/search?query=${query}`);
  return res.data;
};
export const getAllAirports = async (query?: string) => {
  const url = query ? `/airport/search?query=${encodeURIComponent(query)}` : '/airport';
  const res = await axiosInstance.get(url);
  return res.data;
};

export const updateAirport = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/airport/${id}`, data);
  return res.data;
};

// Delete airport by ID
export const deleteAirport = async (id: string) => {
  const res = await axiosInstance.delete(`/airport/${id}`);
  return res.data;
};