<script setup>
import useDemandStore from "@/stores/demands";

const demandStore = useDemandStore();

import CategoryTag from "./CategoryTag.vue";

const props = defineProps({ listing: Object });
</script>

<template>
  <div class="border-2 border-lime-100 w-92 rounded-md bg-white">
    <div class="flex gap-4">
      <img class="rounded h-40" :src="listing.product.image" alt="food" />
      <div>
        <div class="text-lg font-roboto font-semibold text-lime-600 capitalize">
          {{ listing.product.name }}
        </div>
        <div>
          <span class="text-2xl text-lime-800 font-bold"
            >{{ listing.quantity }} {{ listing.unit }}</span
          >
        </div>
      </div>
    </div>
    <div class="border-0 border-t-2 border-lime-100 w-full"></div>
    <div class="flex gap-2 px-3 py-1 bg-lime-50">
      <CategoryTag
        v-for="category in listing.product.categories"
        :tag="category"
        @click="demandStore.addFilter(category.name)"
      ></CategoryTag>
    </div>
  </div>
</template>
