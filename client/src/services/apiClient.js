import { store } from "../app/store";
import { apiStart, apiEnd } from "../features/ui/uiSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

export async function apiRequest(path, options = {}) {
  store.dispatch(apiStart());
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: options.method || "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });

    const payload = await response.json().catch(() => ({
      success: false,
      error: { code: "INVALID_RESPONSE", message: "Invalid server response." }
    }));

    if (!response.ok || payload.success === false) {
      const error = new Error(payload.error?.message || "Request failed");
      error.code = payload.error?.code;
      error.status = response.status;
      throw error;
    }
    return payload;
  } finally {
    store.dispatch(apiEnd());
  }
}
