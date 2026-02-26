<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div id="min-h-screen-layout" class="flex min-h-screen flex-col">
    <div class="flex h-full flex-1 text-sm">
      <main class="flex flex-1 flex-col">
        <RouterView />
      </main>
    </div>
  </div>
</template>
