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

const LOCALE = 'ru-RU' as const;

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
        <!-- Контейнер для заголовка -->
        <div class="fixed top-0 left-0 z-50 flex w-full items-center justify-center py-2 lg:hidden">
          
          <!-- 1. Слой ПОДЛОЖКИ (блюр + градиентная маска) -->
          <div 
            class="absolute inset-0 -z-10 bg-neutral-100/30 dark:bg-neutral-900/30 backdrop-blur-xl mask-[linear-gradient(to_top,transparent,black)]"
          ></div>

          <!-- 2. Слой ТЕКСТА (всегда четкий) -->
          <div class="text-4xl font-semibold text-neutral-950 dark:text-neutral-100">
            {{ year }}
          </div>
          
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

