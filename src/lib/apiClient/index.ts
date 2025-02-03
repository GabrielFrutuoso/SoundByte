import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_API_URL,
  withCredentials: true,
});