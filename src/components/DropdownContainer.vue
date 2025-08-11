<script setup>
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";

const content = ref(null);
const trigger = ref(null);

const show = ref(false);

const setShow = () => (show.value = !show.value);

const handleClickOutside = (e) => {
  if (
    show.value &&
    !trigger?.value.contains(e.target) &&
    !content?.value.contains(e.target)
  ) {
    setShow();
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative">
    <div ref="trigger" class="cursor-pointer hover:scale-110" @click="setShow">
      <slot name="trigger" />
    </div>
    <div
      v-if="show"
      ref="content"
      class="min-w-44 mt-1 absolute py-0.5 px-3 bg-white text-sm text-lime-600 font-dyna-puff"
    >
      <slot name="content" />
    </div>
  </div>
</template>
