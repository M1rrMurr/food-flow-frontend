import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import apiClient from "@/services/apiClient";
import { computed } from "vue";
import router from "@/router";

const useAuthStore = defineStore("auth", () => {
  const user = ref({});
  const accessToken = ref("");
  const isLoading = ref(false);
  const errors = ref({ login: {}, register: {}, serverError: {} });
  const localLanguage = navigator.language;

  const isAuthenticated = computed(() => accessToken.value && user.value);

  const fetchUser = async function () {
    try {
      const res = await axios.get("http://localhost/api/user", {
        headers: { Authorization: `Bearer ${accessToken.value}` },
      });
      console.log(res);
      user.value = res.data;
    } catch (err) {
      console.error(err);
    } finally {
      console.log("user fetching has ended");
    }
  };

  const login = async function (credentials) {
    if (isAuthenticated.value) {
      return;
    }
    try {
      isLoading.value = true;
      apiClient.defaults.headers.common["Accept-Language"] = localLanguage;
      const res = await apiClient.post("/api/login", credentials);

      user.value = res.data.user;
      accessToken.value = res.data.token;

      router.push("/");

      console.log(res.data);
    } catch (error) {
      if (error.response?.status === 422) {
        console.log(error.response);
        errors.value.login = error.response.data.errors;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async function () {
    if (!isAuthenticated.value) {
      return;
    }
    try {
      isLoading.value = true;
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken.value}`;
      const res = await apiClient.post("/api/logout");
      user.value = { user: {} };
      accessToken.value = "";
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const register = async function (credentials) {
    if (isAuthenticated.value) {
      return;
    }

    try {
      isLoading.value = true;
      errors.value.register = {};
      await apiClient.get("/sanctum/csrf-cookie");
      const res = await apiClient.post("/api/register", credentials);
      user.value = res.data.user;
      accessToken.value = res.data.token;

      router.push("/");

      console.log(res);
    } catch (err) {
      console.log(err);
      if (err.response?.status === 422) {
        errors.value.register = err.response.data.errors;
      }
    } finally {
      isLoading.value = false;
    }
  };

  const test = async function () {
    const res = await apiClient.get("http://localhost/api/test");
    console.log(res.data);
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    fetchUser,
    test,
    login,
    register,
    logout,
    errors,
  };
});

export default useAuthStore;
