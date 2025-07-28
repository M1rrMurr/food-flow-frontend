<script setup>
import { RouterLink, RouterView } from "vue-router";
import { IconUser } from "@tabler/icons-vue";
import { IconLogout } from "@tabler/icons-vue";
import { IconLogin } from "@tabler/icons-vue";
import { IconUserPlus } from "@tabler/icons-vue";

import NavLink from "./components/NavLink.vue";

import useAuthStore from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="">
    <div class="bg-amber-100 flex items-center justify-between">
      <RouterLink to="/">
        <img class="h-24" src="./assets/foodflow.png" alt="logo" />
      </RouterLink>
      <div class="flex gap-4">
        <NavLink class="" to="/kinalat">Kínálat</NavLink>
        <NavLink to="/kereslet">Kereslet</NavLink>
        <NavLink to="/regisztracio">Regisztráció</NavLink>
      </div>
      <div class="min-w-1/6">
        <div v-if="authStore.isAuthenticated" class="flex">
          <IconUser />
          <IconLogout @click="authStore.logout" />
        </div>
        <div v-else class="flex gap-2">
          <RouterLink to="/bejelentkezes"><IconLogin /></RouterLink>
          <RouterLink to="/regisztracio"><IconUserPlus /></RouterLink>
        </div>
      </div>
    </div>
  </header>
  <div class="min-h-screen bg-amber-50">
    <div class="mx-auto max-w-7xl">
      <RouterView />
    </div>
  </div>
</template>
