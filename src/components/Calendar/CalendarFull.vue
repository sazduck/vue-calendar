<script setup lang="ts">

import CalendarMonth from './CalendarMonth.vue';
import type { DayHours } from './types';
import Year from './CalendarYear.vue';
import workdayData from "@/data/calendar-data/2025.json"

const { year } = defineProps<{
  year: number;
}>();

const fillCalendarByYear = (year: number): Map<string, 0 | 8 | 7> => {
  const date = new Date(`${year}-01-01`);
  console.log(date.toISOString());

  const datesMap = new Map<string, 0 | 8 | 7>();

  for (let i = 0; i < 365; i++) {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      datesMap.set(date.toISOString().slice(0, 10), 0);
    } else {
      datesMap.set(date.toISOString().slice(0, 10), 8);
    }
    date.setDate(date.getDate() + 1);
  }
  return datesMap;
};

const datesMap = fillCalendarByYear(year);


workdayData.extraWorkdays.forEach((d: string) => {
  datesMap.set(d, 8);
});
workdayData.holidays.forEach((d: string) => {
  datesMap.set(d, 0);
});
workdayData.preholidays.forEach((d: string) => {
  datesMap.set(d, 7);
});

const calendar: { date: string; hours: number }[] = [];

for (const [k, v] of datesMap) {
  calendar.push({ date: k, hours: v });
}

calendar.sort((a, b) => a.date.localeCompare(b.date));

const getCalendarData = (hourRows: DayHours[]) => {
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
const calendarData = getCalendarData(calendar);

if (!calendarData) {
  throw new Error('Invalid calendar data');
}

const today = new Date();
today.setHours(0, 0, 0, 0);
</script>

<template>
  <div class="flex flex-col items-center flex-1">
    <div class="flex flex-1 flex-wrap max-w-5xl justify-center items-center">
      <div class="flex flex-col">
        <Year :year="year" />
        <div class="flex flex-wrap gap-4 justify-center items-start">
          <CalendarMonth
            v-for="month in calendarData.months"
            :key="`month${month.month}`"
            :month="month"
            :year="year"
            :today="today"
            locale="ru-RU"
          />
        </div>
      </div>
    </div>
  </div>
</template>
