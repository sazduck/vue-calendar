<script setup lang="ts">
import Calnedar from './components/Calendar/CalendarFull.vue';
</script>

<template>
  <div id="min-h-screen-layout" class="flex min-h-screen flex-col">
    <!-- <header startTime="8:00" todayHours={todayHours}/> -->
    <div class="mt-10 flex h-full flex-1 text-sm">
      <!-- <Nav /> -->
      <main class="lg:ml-50 flex flex-1 flex-col">
        <Calnedar :year="2026" />
      </main>
    </div>
    <!-- {/* <Footer /> */} -->
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
