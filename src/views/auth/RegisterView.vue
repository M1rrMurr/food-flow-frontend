<script setup>
import useAuthStore from "@/stores/auth";
import { ref } from "vue";
import InputComponent from "@/components/InputComponent.vue";
import { storeToRefs } from "pinia";

import AuthErrorMessage from "@/components/auth/AuthErrorMessage.vue";

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
  register

  {{ errors.register }}
  <div class="flex flex-col items-center justify-center min-h-screen">
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
    <button @click="authStore.register(credentials)">register</button>
  </div>
</template>
