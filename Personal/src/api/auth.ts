import axios from "axios";
import { API_BASE_URL } from "./config";


export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data;
};
