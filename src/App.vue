<script setup>
import { RouterLink, RouterView } from "vue-router";
import { IconUser } from "@tabler/icons-vue";
import { IconLogout } from "@tabler/icons-vue";
import { IconLogin } from "@tabler/icons-vue";
import { IconUserPlus } from "@tabler/icons-vue";

import DropdownContainer from "./components/DropdownContainer.vue";
import NavLink from "./components/NavLink.vue";
import TooltipContainer from "./components/TooltipContainer.vue";
import TooltipContent from "./components/TooltipContent.vue";
import useAuthStore from "./stores/auth";
import router from "./router";
import { computed, ref } from "vue";

const authStore = useAuthStore();

const fullPath = computed(() => router.currentRoute.value.fullPath);
console.log(navigator.language);
const date = ref(new Date());
</script>

<template>
  <header
    v-if="fullPath !== '/belepes' && fullPath !== '/regisztracio'"
    class=""
  >
    <div class="bg-amber-100 flex items-center justify-between">
      <RouterLink to="/">
        <img class="h-24" src="./assets/foodflow.png" alt="logo" />
      </RouterLink>
      <div class="flex gap-4">
        <NavLink class="" to="/kinalat">Kínálat</NavLink>
        <NavLink to="/kereslet">Kereslet</NavLink>
      </div>
      <div class="min-w-1/6">
        <div v-if="authStore.isAuthenticated" class="flex gap-3">
          <!--profile dorpdown-->
          <DropdownContainer>
            <template v-slot:trigger><IconUser /></template>
            <template v-slot:content
              ><div>profil</div>
              <RouterLink to="/kereslet/uj"
                >kínálat létrehozás</RouterLink
              ></template
            >
          </DropdownContainer>
          <TooltipContainer>
            <template v-slot:trigger>
              <IconLogout @click="authStore.logout" />
            </template>
            <TooltipContent>kijelentkezés </TooltipContent>
          </TooltipContainer>
        </div>
        <!-- no authenticated user -->
        <div v-else class="flex gap-2">
          <TooltipContainer>
            <template v-slot:trigger>
              <RouterLink to="/belepes"><IconLogin /></RouterLink>
            </template>
            <TooltipContent>belépés</TooltipContent> </TooltipContainer
          ><TooltipContainer>
            <template v-slot:trigger>
              <RouterLink to="/regisztracio"><IconUserPlus /></RouterLink>
            </template>
            <TooltipContent>regisztráció</TooltipContent>
          </TooltipContainer>
        </div>
      </div>
    </div>
  </header>
  <div class="min-h-screen bg-amber-50">
    <div class="mx-auto max-w-7xl min-h-screen">
      <RouterView />
    </div>
    <footer class="w-full grid place-items-center pb-10">
      {{ date.getFullYear() }}
    </footer>
  </div>
</template>
