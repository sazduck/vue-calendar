<script setup lang="ts">
import Calnedar from '@/components/Calendar/CalendarFull.vue';
import type { CalendarData } from './data/calendar-data/types';


// все файлы календаря
const calendarModules = import.meta.glob('@/data/calendar-data/*.json', {
  eager: true,
  import: 'default'
});

const years: number[] = [];
for (let i = 2010; i <= 2026; i++) {
  years.push(i)
}

const workDays: Map<number, CalendarData> = new Map();
years.forEach(year => {
  const path = `/src/data/calendar-data/${year}.json`;
  const data = calendarModules[path];

  if (data) {
    workDays.set(year, data as CalendarData);
  } else {
    console.warn(`Calendar data for year ${year} not found`);
  }
});

const YEAR = 2026
</script>


<template>
  <div id="min-h-screen-layout" class="flex min-h-screen flex-col">
    <!-- <header startTime="8:00" todayHours={todayHours}/> -->
    <!-- <div class="mt-10 flex h-full flex-1 text-sm"> -->
    <div class="flex h-full flex-1 text-sm">
      <!-- <Nav /> -->
      <!-- <main class="lg:ml-50 flex flex-1 flex-col"> -->
        <main class="flex flex-1 flex-col">
          <Calnedar :year="YEAR" :work-days="workDays.get(YEAR)" />
        </main>

    </div>
    <!-- {/* <Footer /> */} -->
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
