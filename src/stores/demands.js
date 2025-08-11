import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

import useAuthStore from "./auth";
import apiClient from "@/services/apiClient";

const useDemandStore = defineStore("demands", () => {
  const authStore = useAuthStore();
  const demands = ref({ data: [] });
  const loading = ref(false);
  const filters = ref([]);
  const errors = ref({});

  // all exisitng categories
  const categories = ref([]);

  const addFilter = function (filter) {
    if (!filters.value.includes(filter)) {
      filters.value.push(filter);
    }
  };

  const removeFilter = function (filter) {
    filters.value = filters.value.filter((f) => f !== filter);
  };

  const clearFilters = function () {
    filters.value = [];
  };

  const fetchDemands = async function () {
    try {
      loading.value = true;
      const res = await axios.get("http://localhost:80/api/demands", {
        params: { categories: filters.value },
      });
      console.log(res.data);
      demands.value.data = res.data.demands.data;
      categories.value = res.data.categories;
    } catch (err) {
    } finally {
      loading.value = false;
      console.log("demand fetch has ended");
    }
  };

  const storeDemand = async function (demand) {
    try {
      loading.value = true;
      apiClient.defaults.headers.common["Authorization"] =
        `Bearer ${authStore.accessToken}`;
      apiClient.defaults.headers.common["Accept-Language"] = navigator.language;
      const res = await apiClient.post("/api/demands/store", {
        ...demand,
        user_id: authStore.user.id,
      });
      console.log(res.data);
    } catch (error) {
      if (error.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    demands,
    addFilter,
    fetchDemands,
    storeDemand,
    loading,
    filters,
    removeFilter,
    clearFilters,
    categories,
    errors,
  };
});

export default useDemandStore;
