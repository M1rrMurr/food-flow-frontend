import axios from "axios";
import useAuthStore from "@/stores/auth";

const apiClient = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore();
    if (!error.response) {
      authStore.errors.serverError = {
        message: "Szerverünk offline, nézz vissza később",
      };
      console.error("server might be offline");
    }
    if (error.response?.status >= 500) {
      authStore.errors.serverError = { message: "Szerver hiba" };
      console.error("server error", error);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
