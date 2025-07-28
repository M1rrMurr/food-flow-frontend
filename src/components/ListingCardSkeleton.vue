<template>
  <div class="border-2 border-lime-100 w-92 rounded-md bg-white animate-pulse">
    <div class="flex gap-4">
      <div class="rounded h-40 w-60 bg-lime-200" />
      <div class="space-y-3 mt-2">
        <div class="h-6 w-16 rounded bg-lime-600"></div>
        <div class="h-7 w-22 rounded bg-lime-800"></div>
      </div>
    </div>
    <div class="border-0 border-t-2 border-lime-100 w-full"></div>
    <div class="flex gap-2 px-3 py-1 bg-lime-50">
      <div
        v-for="_ in Math.ceil(Math.random() * 3)"
        class="bg-rose-200 rounded-md w-16 h-8"
      ></div>
    </div>
  </div>
</template>
