<script setup lang="ts">
import Calendar from '@/components/Calendar/CalendarFull.vue';
import type { Hours, WorkingHours } from '@/components/Calendar/types';
import YearNavigation from '@/components/Calendar/CalendarNavigation.vue';
import type { CalendarData } from '@/data/calendar-data/types';
import { availableYears } from '@/router';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// Загружаем все данные календаря один раз при старте приложения
const calendarModules = import.meta.glob('@/data/calendar-data/*.json', {
  eager: true,
  import: 'default',
});
// Тип для обработанных данных календаря
// Кэш для обработанных данных о календаре
const processedCalendarCache = new Map<number, WorkingHours>();

// Функция для заполнения календаря по году
const fillCalendarByYear = (
  year: number,
  workDays?: CalendarData
): Map<string, Hours> => {
  const datesMap = new Map<string, Hours>();

  // Заполняем базовыми значениями (выходные и рабочие дни)
  for (
    let date = new Date(`${year}-01-01`);
    date.getFullYear() < year + 1;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      datesMap.set(date.toISOString().slice(0, 10), 0); // выходной
    } else {
      datesMap.set(date.toISOString().slice(0, 10), 8); // рабочий день
    }
  }

  // Применяем исключения из workDays
  workDays?.extraWorkdays?.forEach((d: string) => {
    datesMap.set(d, 8); // дополнительный рабочий день
  });

  workDays?.holidays?.forEach((d: string) => {
    datesMap.set(d, 0); // праздничный день
  });

  workDays?.preholidays?.forEach((d: string) => {
    datesMap.set(d, 7); // предпраздничный день
  });

  return datesMap;
};

// Функция для получения данных календаря
const getCalendarData = (
  year: number,
  hourRows: { date: string; hours: number }[]
): WorkingHours => {
  return {
    year,
    months: [...new Set(hourRows.map(row => row.date.slice(5, 7)))].map(
      month => {
        const months = hourRows.filter(row => row.date.slice(5, 7) === month);
        return {
          month: Number(month),
          hours: months.reduce((totalHours, row) => totalHours + row.hours, 0),
          days: months.map(row => ({
            day: Number(row.date.slice(8, 10)),
            hours: row.hours,
          })),
        };
      }
    ),
  };
};

// Инициализация кэша обработанных данных при первом запуске
(() => {
  availableYears.forEach(year => {
    const path = `/src/data/calendar-data/${year}.json`;
    const workDays = calendarModules[path] as CalendarData;

    if (workDays) {
      // Обрабатываем данные для года
      const datesMap = fillCalendarByYear(year, workDays);

      // Преобразуем Map в массив
      const calendar: { date: string; hours: number }[] = [];
      for (const [k, v] of datesMap) {
        calendar.push({ date: k, hours: v });
      }
      calendar.sort((a, b) => a.date.localeCompare(b.date));

      // Сохраняем обработанные данные в кэш
      const processedData = getCalendarData(year, calendar);
      processedCalendarCache.set(year, processedData);
    } else {
      console.warn(`Calendar data for year ${year} not found`);
    }
  });
})();

const route = useRoute();
const currentYear = ref<number>(2026); // default value

// Вычисляем обработанные данные календаря для текущего года
const currentCalendarData = computed(() => {
  const data = processedCalendarCache.get(currentYear.value);
  // Если данных для года нет, возвращаем пустую структуру
  if (!data) {
    return {
      year: currentYear.value,
      months: [],
    };
  }
  return data;
});

// Следим за изменениями маршрута
watch(
  () => route.params.year,
  newYear => {
    if (newYear) {
      const yearNum = parseInt(newYear as string, 10);
      if (!isNaN(yearNum) && yearNum >= 2010 && yearNum <= 2026) {
        currentYear.value = yearNum;
      }
    }
  },
  { immediate: true }
); // Добавляем immediate: true для срабатывания при инициализации
</script>

<template>
  <YearNavigation :year="currentYear" />
  <Calendar
    :key="currentYear"
    :year="currentYear"
    :calendar-data="currentCalendarData"
  />
</template>
