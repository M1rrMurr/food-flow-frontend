import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost",
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("server might be offline");
    }
    if (error.response.status >= 500) {
      console.error("server error", error.response.data.errors);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
