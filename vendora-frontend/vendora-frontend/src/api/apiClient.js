import axios from "axios";

// Single shared Axios instance. Base URL comes from environment variables only.
// No direct fetch() calls should be made inside components — always go through
// this instance (or a service in src/services that wraps it).
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token to every request, if present.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("vendora_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized response/error handling hook point.
// TODO: Backend integration — wire up refresh-token / 401 redirect logic
// once the auth API contract is confirmed. Never invent the endpoint shape.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
