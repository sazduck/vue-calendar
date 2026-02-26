<script setup lang="ts">
import CalendarMonth from './CalendarMonth.vue';

interface MonthData {
  month: number;
  hours: number;
  days: {
    day: number;
    hours: number;
  }[];
}

interface CalendarDataProcessed {
  year: number;
  months: MonthData[];
}

const LOCALE = 'en-US' as const;

const { year, calendarData } = defineProps<{
  year: number;
  calendarData: CalendarDataProcessed;
}>();

const today = new Date();
today.setHours(0, 0, 0, 0);
</script>

<template>
  <div class="flex flex-1 flex-col items-center pb-72 lg:pb-0">
    <div class="flex max-w-5xl flex-1 flex-wrap items-center justify-center">
      <div class="flex flex-col">
        <div
          class="fixed flex w-full items-center justify-center bg-neutral-100/30 py-2 text-4xl font-semibold text-neutral-950 backdrop-blur-lg lg:hidden"
        >
          {{ year }}
        </div>
        <div class="mx-2 mt-16 flex flex-wrap items-start justify-center gap-3">
          <CalendarMonth
            v-for="month in calendarData.months"
            :key="month.month"
            :month="month"
            :year="year"
            :today="today"
            :locale="LOCALE"
          />
        </div>
      </div>
    </div>
  </div>
</template>
