<script setup>
import useAuthStore from "@/stores/auth";

import InputComponent from "@/components/InputComponent.vue";
import AuthErrorMessage from "@/components/auth/AuthErrorMessage.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const authStore = useAuthStore();
const { errors } = storeToRefs(authStore);

const credentials = ref({ email: "", password: "" });
</script>
<template>
  <h1>login</h1>
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
  <button @click="authStore.login(credentials)">login</button>
</template>
