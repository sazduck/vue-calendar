<script setup lang="ts">
import type { CalendarData } from '@/data/calendar-data/types';

// загружаем все данные календаря один раз при старте приложения
const calendarModules = import.meta.glob('@/data/calendar-data/*.json', {
  eager: true,
  import: 'default',
});

// кэш для данных о рабочих днях
const workDaysCache = new Map<number, CalendarData>();

const START_YEAR = 2010 as const;
const END_YEAR = 2016 as const;

// инициализация кэша при первом запуске
(() => {
  const years: number[] = [];
  for (let i = START_YEAR; i <= END_YEAR; i++) {
    years.push(i);
  }

  years.forEach(year => {
    const path = `/src/data/calendar-data/${year}.json`;
    const data = calendarModules[path];

    if (data) {
      workDaysCache.set(year, data as CalendarData);
    } else {
      console.warn(`Calendar data for year ${year} not found`);
    }
  });
})();

// функция для получения данных календаря для указанного года
const getCalendarData = (year: number): CalendarData | undefined => {
  return workDaysCache.get(year);
};

// функция для получения всех доступных лет
const getAvailableYears = (): number[] => {
  return Array.from(workDaysCache.keys()).sort();
};

defineExpose({
  getCalendarData,
  getAvailableYears,
  workDaysCache,
});
</script>

<template>
  <slot />
</template>
