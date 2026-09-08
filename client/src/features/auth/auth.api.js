import { apiRequest } from "../../services/apiClient";

export const authApi = {
  signup: payload => apiRequest("/auth/signup", { method: "POST", body: payload }),
  login: payload => apiRequest("/auth/login", { method: "POST", body: payload }),
  logout: () => apiRequest("/auth/logout", { method: "POST" }),
  logoutAll: () => apiRequest("/auth/logout-all", { method: "POST" }),
  me: () => apiRequest("/auth/me"),
  refresh: () => apiRequest("/auth/refresh", { method: "POST" })
};
