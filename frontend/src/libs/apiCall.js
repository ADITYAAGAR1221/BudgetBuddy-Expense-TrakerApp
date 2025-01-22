import axios from "axios";

// Use the correct protocol
const API_URL = `http://localhost:5000/api-v1`;

const api = axios.create({
  baseURL: API_URL,
});

// Set Authorization token dynamically
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}
export const formatCurrency = (value) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (isNaN(value)) {
    return "Invalid input";
  }

  const numberValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: user?.currency || "USD",
    minimumFractionDigits: 2,
  }).format(numberValue);
};

// Add interceptors for debugging or handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;