import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const useDemandStore = defineStore("demands", () => {
  const demands = ref({ data: [] });
  const loading = ref(false);
  const filters = ref([]);

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

  return {
    demands,
    addFilter,
    fetchDemands,
    loading,
    filters,
    removeFilter,
    clearFilters,
    categories,
  };
});

export default useDemandStore;
