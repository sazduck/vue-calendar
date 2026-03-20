<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="min-h-screen-layout" class="flex min-h-screen flex-col touch-manipulation bg-neutral-50 dark:bg-neutral-950">
      <main class="flex flex-1 flex-col text-sm">
        <RouterView />
      </main>
  </div>
</template>
