<script setup>
import useDemandStore from "@/stores/demands";
import TheButton from "@/components/TheButton.vue";
import OptionButton from "@/components/OptionButton.vue";
import SelectMenu from "@/components/SelectMenu.vue";
import { ref } from "vue";

import apiClient from "@/services/apiClient";
import { onMounted } from "vue";

const products = ref([]);
const isLoading = ref(false);

const fetchProducts = async function () {
  try {
    isLoading.value = true;
    const res = await apiClient.get("/api/products");
    products.value = res.data.products;
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const show = ref(false);

const demandStore = useDemandStore();
const demand = ref({});
</script>

<template>
  <h1 class="">Postold mi az amit keresel</h1>
  {{ demand.product_id }}
  <button
    @click="
      () => {
        show = !show;
        setShow();
      }
    "
  >
    show
  </button>
  <SelectMenu :show="show">
    <OptionButton
      v-model="demand.product_id"
      v-for="product in products"
      :name="product.name"
      :key="product.id"
      :id="product.id"
    />
  </SelectMenu>
</template>
