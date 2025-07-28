<script setup>
const props = defineProps({ tag: Object });
import { IconSoup } from "@tabler/icons-vue";
import { IconMeat } from "@tabler/icons-vue";
import { IconCarrot } from "@tabler/icons-vue";
import { IconApple } from "@tabler/icons-vue";
import useDemandStore from "@/stores/demands";

const store = useDemandStore();

const icons = {
  zöldség: IconCarrot,
  gyümölcs: IconApple,
  egyéb: IconSoup,
  "hús&tej": IconMeat,
};
</script>
<template>
  <div
    class="flex items-center justify-center gap-1 cursor-pointer text-rose-800 bg-rose-200 font-semibold text-xs border-2 border-rose-800 py-1 px-3 rounded-md"
    @click="() => store.addFilter(tag.name)"
  >
    <component :is="icons[tag.name]" :size="20" />
    {{ tag.name }}
  </div>
</template>
