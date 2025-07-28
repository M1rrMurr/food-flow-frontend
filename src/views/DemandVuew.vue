<script setup>
import { onMounted } from "vue";
import useDemandStore from "@/stores/demands";
import { storeToRefs } from "pinia";

import FilterComponent from "@/components/FilterComponent.vue";
import ListingCardSkeleton from "@/components/ListingCardSkeleton.vue";
import ListingCard from "@/components/ListingCard.vue";
import { onBeforeMount } from "vue";

const demandStore = useDemandStore();

const { loading, demands, filters } = storeToRefs(demandStore);

onBeforeMount(() => console.log("before mount"));
onMounted(() => demandStore.fetchDemands());
</script>

<template>
  <div class="flex gap-3 pt-10">
    <FilterComponent />
    <!-- listings -->
    <main class="">
      <div
        class="grid place-items-center min-h-screen w-4xl"
        v-if="!demandStore.demands?.data.length && !demandStore.loading"
      >
        Nincs találat
      </div>
      <div
        class="flex gap-5 justify-center flex-wrap"
        v-if="demandStore.demands?.data"
      >
        <!-- fallback content for each card -->
        <ListingCardSkeleton v-if="loading" v-for="_ in 10" />
        <ListingCard
          v-for="demand in demands?.data"
          :listing="demand"
        ></ListingCard>
      </div>
    </main>
  </div>
</template>
