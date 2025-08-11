<script setup>
import { ref } from "vue";
import { watch } from "vue";

const props = defineProps({ show: Boolean });
const container = ref(null);
const setShow = function () {
  if (container.value) {
    setTimeout(() => container.value.classList.add("overflow-y-scroll"), 300);
  }
};

watch(() => props.show, setShow);
</script>

<template>
  <div
    ref="container"
    class="w-56 h-0 overflow-hidden transition-all duration-300"
    :class="{ 'h-64': show }"
    style="scrollbar-gutter: stable"
  >
    <div
      class="-translate-y-1/4 transition-transform duration-300"
      :class="{ 'translate-y-0': show }"
    >
      <slot />
    </div>
  </div>
</template>
