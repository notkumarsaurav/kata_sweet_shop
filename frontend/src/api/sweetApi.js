import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Add response interceptor to handle success and error cases
// On success, it automatically extracts the `data` from the response.
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || "Request failed");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message);
    }
  }
);

// All functions now use the 'api' instance and are much cleaner.
// The interceptor handles extracting the '.data' property on success.

export const getSweets = async () => {
  return api.get("/sweets");
};

export const getSweetById = async (id) => {
  return api.get(`/sweets/${id}`);
};

export const addSweet = async (sweetData) => {
  return api.post("/sweets", sweetData);
};

export const updateSweet = async (id, sweetData) => {
  return api.put(`/sweets/${id}`, sweetData);
};

export const deleteSweet = async (id) => {
  return api.delete(`/sweets/${id}`);
};

export const purchaseSweet = async (id, quantity) => {
  return api.post(`/sweets/${id}/purchase`, { quantity });
};

export const restockSweet = async (id, quantity) => {
  return api.post(`/sweets/${id}/restock`, { quantity });
};

export const searchSweets = async (params) => {
  return api.get("/sweets/search", { params });
};