<script setup lang="ts">
import { useRouter } from 'vue-router';

const {year, isYearLegal} = defineProps<{year: number, isYearLegal: boolean}>()

const router = useRouter();
const goToYear = (year: number) => {
  router.push(`/${year}`);
};


</script>
<template>
  <button
    :to="'/' + (year)"
    @click="goToYear(year)"
    :class="`min-h-10 min-w-10 rounded-full bg-neutral-50/30 dark:bg-neutral-800/30 text-lg font-black text-neutral-600 dark:text-neutral-400 shadow-sm shadow-neutral-800 backdrop-blur-lg border border-neutral-50 dark:border-neutral-600 ${ isYearLegal ? 'pointer-events-none' : 'cursor-pointer'}`"
  >
    <slot />
  </button>
</template>
