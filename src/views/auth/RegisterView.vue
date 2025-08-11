<script setup>
import useAuthStore from "@/stores/auth";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { IconUserPlus, IconHome } from "@tabler/icons-vue";
import { IconLoaderQuarter } from "@tabler/icons-vue";
import InputComponent from "@/components/InputComponent.vue";
import AuthErrorMessage from "@/components/auth/AuthErrorMessage.vue";
import TheButton from "@/components/TheButton.vue";
import router from "@/router";

const credentials = ref({
  email: "",
  password: "",
  password_confirmation: "",
  name: "",
});

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);
</script>

<template>
  <div class="grid place-items-center min-h-screen">
    <div class="flex">
      <img src="@/assets/login.svg" alt="" />

      <div class="flex flex-col gap-3">
        <div class="font-dyna-puff">
          <h1 class="text-3xl text-lime-600">Regisztrálj</h1>
          <p class="text-amber-300 text-2xl">hogy belevághass a csereberébe</p>
        </div>
        <InputComponent id="email" v-model="credentials.email" inputType="email"
          >Email</InputComponent
        >
        <AuthErrorMessage
          v-if="errors.register.email"
          :message="errors.register.email[0]"
        >
        </AuthErrorMessage>
        <InputComponent id="name" v-model="credentials.name" inputType="text"
          >Név</InputComponent
        >
        <AuthErrorMessage
          v-if="errors.register.name"
          :message="errors.register.name[0]"
        />
        <InputComponent
          id="password"
          v-model="credentials.password"
          inputType="password"
          >Jelszó</InputComponent
        >
        <InputComponent
          id="password_confirmation"
          v-model="credentials.password_confirmation"
          inputType="password"
          >Jelszó megerősítés</InputComponent
        >
        <AuthErrorMessage
          v-if="errors.register.password"
          :message="errors.register.password[0]"
        />
        <RouterLink
          class="text-sm text-blue-400 font-semibold italic hover:underline"
          to="/belepes"
          >van már fiókod? lépj be itt!</RouterLink
        >
        <AuthErrorMessage
          v-if="authStore.errors.serverError"
          :message="authStore.errors.serverError.message"
        />
        <div class="flex gap-3">
          <TheButton
            :isLoading="authStore.isLoading"
            :action="() => authStore.register(credentials)"
          >
            <template v-slot:loadingSvg>
              <IconLoaderQuarter size="20" />
            </template>
            <template v-slot:svg>
              <IconUserPlus size="20" />
            </template>

            regiszrálás
          </TheButton>
          <TheButton :action="() => router.push('/')" type="secondary">
            <template v-slot:svg><IconHome size="20" /></template>
            főoldal
          </TheButton>
        </div>
      </div>
    </div>
  </div>
</template>
