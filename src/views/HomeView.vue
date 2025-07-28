<script setup>
import { useRouter } from "vue-router";
import useAuthStore from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
console.log(router.currentRoute.value.fullPath);
</script>

<template>
  <main>
    <h1 class="text-red-500 font-bold font-roboto">Home Page</h1>
    <h1 class="text-red-500 font-bold font">Home Page</h1>

    <div class="flex gap-3">
      <button @click="authStore.fetchUser">fetch user</button>
      <button @click="authStore.register">register</button>
      <button @click="authStore.test">test</button>
      <button @click="authStore.login">login</button>
      <button @click="authStore.logout">logout</button>
    </div>
    <p>{{ authStore.user }}</p>
  </main>
</template>
