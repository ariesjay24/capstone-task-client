import axios from "axios";

export const httpClient = (options = {}) => {
  const authToken = localStorage.getItem("token");
  const http = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${authToken}`,
      ...options.headers,
    },
  });

  return http;
};
