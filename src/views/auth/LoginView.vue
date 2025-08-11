<script setup>
import useAuthStore from "@/stores/auth";

import InputComponent from "@/components/InputComponent.vue";
import AuthErrorMessage from "@/components/auth/AuthErrorMessage.vue";
import TheButton from "@/components/TheButton.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "@/router";
import { IconLogin, IconHome, IconLoaderQuarter } from "@tabler/icons-vue";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);

const credentials = ref({ email: "zsoli2@citromail.hu", password: "password" });
</script>
<template>
  <div class="grid place-items-center min-h-screen">
    <div class="space-y-2">
      <h1 class="text-3xl font-bold text-lime-600">FoodFlow</h1>
      <h2
        class="text-2xl font-semibold text-amber-300 italic font-dyna-puff px-6 pb-6"
      >
        Bejelentkezés
      </h2>
      <InputComponent id="email" inputType="email" v-model="credentials.email"
        >email</InputComponent
      >
      <AuthErrorMessage
        v-if="errors.login.email"
        :message="errors.login.email[0]"
      />
      <InputComponent
        id="password"
        inputType="password"
        v-model="credentials.password"
        >Jelszó</InputComponent
      >

      <AuthErrorMessage
        v-if="errors.login.password"
        :message="errors.login.password[0]"
      />
      <AuthErrorMessage
        v-if="errors.login.message"
        :message="errors.login.message[0]"
      />
      <RouterLink
        class="text-sm text-blue-400 font-semibold italic hover:underline"
        to="/regisztracio"
        >nincs még fiókod? regiszrálj ingyen!</RouterLink
      >

      <AuthErrorMessage
        v-if="errors.serverError"
        :message="errors.serverError.message"
      />
      <div class="flex gap-2 mt-3">
        <TheButton
          :is-loading="authStore.isLoading"
          :action="() => authStore.login(credentials)"
          type="primary"
          ><template v-slot:svg><IconLogin size="19" /></template>
          <template v-slot:loadingSvg><IconLoaderQuarter size="19" /></template>
          belépés</TheButton
        >
        <TheButton :action="() => router.push('/')" type="secondary"
          ><template v-slot:svg><IconHome size="19" /></template>
          főoldal</TheButton
        >
      </div>
    </div>
  </div>
</template>
