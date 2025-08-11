<script setup>
import { ref } from "vue";

const show = ref(false);

const setShow = function () {
  show.value = !show.value;
};
</script>
<template>
  <div class="relative">
    <div
      class="cursor-pointer hover:scale-110"
      @mouseleave="setShow"
      @mouseenter="setShow"
    >
      <slot ref="trigger" name="trigger" />
    </div>
    <Transition
      enter-from-class="opacity-0"
      enter-active-class="transition-all duration-300"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-active-class=""
      leave-to-class=""
    >
      <div v-if="show" class="absolute -mx-[100%] mt-3">
        <slot />
      </div>
    </Transition>
  </div>
</template>
