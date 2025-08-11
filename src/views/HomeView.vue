<script setup>
import useAuthStore from "@/stores/auth";
import useDemandStore from "@/stores/demands";
const authStore = useAuthStore();
const demandStore = useDemandStore();
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
      <button @click="demandStore.storeDemand">store</button>
    </div>
    <p>{{ authStore.user }}</p>
  </main>
</template>
