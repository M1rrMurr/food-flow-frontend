<script setup>
const props = defineProps({
  type: { default: "primary", type: String },
  action: { default: () => {}, type: Function },
  isLoading: { default: () => false, type: Boolean },
});
const styles = {
  primary: " bg-lime-600 text-amber-100 hover:bg-lime-700",
  secondary:
    " text-amber-400 border-[1.5px] border-amber-400 hover:bg-amber-400 hover:text-lime-100",
};
</script>

<template>
  <button
    @click="action"
    :class="`flex text-sm items-center gap-1 justify-center px-3 py-1 rounded-md font-semibold max-w-fit cursor-pointer transition-colors duration-200 ${styles[props.type] ?? styles.primary}`"
  >
    <div
      class=""
      :class="{
        'animate-spin': isLoading,
      }"
    >
      <slot v-if="isLoading" name="loadingSvg" />
      <slot v-if="!isLoading" name="svg" />
    </div>
    <slot />
  </button>
</template>
