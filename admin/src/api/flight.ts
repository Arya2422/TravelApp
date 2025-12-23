import axiosInstance from "./axios";


export const createFlight = async (data: any) => {
  const res = await axiosInstance.post("/flight/create", data);
  return res.data;
};

export const getAllFlights = async () => {
  const res = await axiosInstance.get("/flight");
  return res.data;
};

export const deleteFlight = async (id: string) => {
  const res = await axiosInstance.delete(`/flight/${id}`);
  return res.data;
};
// Get flight by ID
export const getFlightById = async (id: string) => {
  const res = await axiosInstance.get(`/flights/${id}`);
  return res.data;
};
// Update flight by ID
export const updateFlight = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/flight/${id}`, data);
  return res.data;
};

// Search flights (frontend filters)
export const searchFlights = async (params: any) => {
  const res = await axiosInstance.get('/flights/search', { params });
  return res.data;
};