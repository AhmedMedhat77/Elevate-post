import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_BASE_URL_DEV || "https://jsonplaceholder.typicode.com"
  : import.meta.env.VITE_BASE_URL_PROD || "https://jsonplaceholder.typicode.com";

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

// Helper function to logout user and redirect to login
const logoutUser = () => {
  console.error("Max retry attempts reached, logging out user");
  // Clear all auth data
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("isAuthenticated");

  // Redirect to login page if not already there
  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// Function to refresh the token
const refreshToken = async () => {
  try {
    const refreshTokenValue = window.localStorage.getItem("refreshToken");

    if (!refreshTokenValue) {
      logoutUser();
      throw new Error("No refresh token available");
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken: refreshTokenValue,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;

    // Update tokens in localStorage
    window.localStorage.setItem("token", accessToken);
    if (newRefreshToken) {
      window.localStorage.setItem("refreshToken", newRefreshToken);
    }

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Add a request interceptor to dynamically add the token
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = window.localStorage.getItem("token");

      // If a token exists, attach it to the Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }

    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors and retry with new token
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Initialize retry count if not exists
      if (!originalRequest._retryCount) {
        originalRequest._retryCount = 0;
      }

      // Check if we've already retried 3 times
      if (originalRequest._retryCount >= 3) {
        logoutUser();
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      originalRequest._retryCount += 1;

      try {
        const newToken = await refreshToken();

        // Update the authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error(
          `Token refresh failed (attempt ${originalRequest._retryCount}/3):`,
          refreshError
        );

        // If this was the last attempt, logout the user
        if (originalRequest._retryCount >= 3) {
          logoutUser();
        }

        return Promise.reject(refreshError);
      }
    }

    // Handle other errors globally
    if (error.response && error.response.status === 403) {
      logoutUser();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
