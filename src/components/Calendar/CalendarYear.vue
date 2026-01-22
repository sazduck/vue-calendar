<script setup lang="ts">
defineProps<{
  year: number;
}>();
</script>

<template>
  <div class="m-4 flex items-center justify-center gap-4">
    <h1 class="text-3xl">{{ year }}</h1>
  </div>
</template>
