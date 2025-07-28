<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";

import { IconFilter } from "@tabler/icons-vue";

import { IconSearch } from "@tabler/icons-vue";
import { IconLoader2 } from "@tabler/icons-vue";
import useDemandStore from "@/stores/demands";
import HorizontalDivider from "./HorizontalDivider.vue";
import FilterTitle from "./filter/FilterTitle.vue";

const demandStore = useDemandStore();

const searchClicked = ref(false);
const { categories, loading, demands, filters } = storeToRefs(demandStore);
const manualSearch = async function () {
  searchClicked.value = true;
  await demandStore.fetchDemands();
  searchClicked.value = false;
};
</script>

<template>
  <div class="min-w-1/5">
    <p class="flex font-semibold text-green-600">
      Szűrés <IconFilter class="text-green-700" stroke="2" />
    </p>
    <div>
      <!-- filtercontainer -->
      <div class="bg-white px-1" >
        <FilterTitle>Kategória</FilterTitle>        
        <div class="flex gap-1  items-center" v-for="category in categories">

          <input class="bg-red-50" type="checkbox" :id="category" :name="category" v-model="filters" :value="category"></input>
          <label class="font-semibold" :for="category">{{ category }}</label>
        </div>
        <HorizontalDivider/>
       <div class="flex gap-2 mt-1">
        <button
          class="cursor-pointer flex py-0.5 px-1.5 rounded bg-green-800 items-center justify-center font-semibold text-yellow-200"
          @click="manualSearch"
        >
          <IconSearch size="20" v-if="!searchClicked" />
          <IconLoader2 size="20" v-if="searchClicked" class="animate-spin" />
          Keresés
        </button>

        <button
          v-if="demandStore.filters.length"
          class="cursor-pointer flex py-0.5 px-1.5 border-2 rounded border-yellow-200 text-green-700 font-bold"
          @click="
            () => {
              demandStore.clearFilters();
              demandStore.fetchDemands();
            }
          "
        >
          Szűrők törlése
        </button>
      </div>       
      </div>

    </div>
  </div>
</template>
