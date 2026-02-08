<script setup lang="ts">
import type { WorkingMonthHours } from './types';

interface CalendarMonthProps {
  month: WorkingMonthHours;
  year: number;
  today: Date;
  locale?: string;
}
const {
  year,
  month,
  locale = 'ru-RU',
  today,
} = defineProps<CalendarMonthProps>();

const getFirstDayOfMonth = (year: number, month: number): number => {
  const day = new Date(year, month - 1, 1).getDay();
  return (day + 6) % 7;
};

const getWeekdays = (locale: string) => {
  const date = new Date(1970, 0, 5); // monday
  const weekDayFmtRu = Intl.DateTimeFormat(locale, { weekday: 'short' });
  const weekdays = [];
  for (let i = 0; i < 7; i++) {
    weekdays.push(weekDayFmtRu.format(date));
    date.setDate(date.getDate() + 1);
  }
  return weekdays;
};

const chunkDays = (
  year: number,
  month: number,
  monthDays: { day: number; hours: number }[]
): (null | { day: number; hours: number })[][] => {
  const firstDayOffset = getFirstDayOfMonth(year, month);

  const weeks: (null | { day: number; hours: number })[][] = [];
  const paddedDays = [...Array(firstDayOffset).fill(null), ...monthDays];

  const fullWeeksLengh = Math.ceil(paddedDays.length / 7) * 7;
  const fullPaddedDays = [
    ...paddedDays,
    ...Array(fullWeeksLengh - paddedDays.length).fill(null),
  ];

  for (let i = 0; i < fullPaddedDays.length; i += 7) {
    weeks.push(fullPaddedDays.slice(i, i + 7));
  }
  if (weeks.length < 6) {
    weeks.push(Array(7).fill(null));
  }
  return weeks;
};

const weeks = chunkDays(year, month.month, month.days);

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const fmtMonth = (date: Date) => {
  return capitalizeFirstLetter(
    Intl.DateTimeFormat(locale, { month: 'long' }).format(date)
  );
};

const getIsDayPassed = (year: number, month: number, day: number) => {
  return today > new Date(year, month, day);
};

const getMonthColor = (month: number) => {
  if (month <= 2 || month === 12) return 'bg-blue-100';
  if (month <= 5) return 'bg-green-200';
  if (month <= 8) return 'bg-yellow-200';
  return 'bg-orange-200';
};

const getDayColor = (day: { day: number; hours: number }) => {
  const isDayPassed = getIsDayPassed(year, month.month - 1, day.day);

  // Маппинг цветов в зависимости от часов
  const colorMap: Record<number, [string, string]> = {
    8: ['text-gray-400', 'text-gray-900'], // [если прошло, если активно]
    7: ['text-green-300', 'text-green-600'],
  };

  const [passedColor, activeColor] = colorMap[day.hours] || ['text-red-300', 'text-red-600'];
  return isDayPassed ? passedColor : activeColor;
};

const getDayClass = (day: { day: number; hours: number }) => {
  const baseClasses = 'border-1 px-2 py-0.5';
  const colorClass = day ? getDayColor(day) : '';

  // Проверяем, является ли день сегодняшним
  const isToday = (
    today.getFullYear() === year &&
    today.getMonth() === month.month - 1 &&
    today.getDate() === day?.day
  );
  const borderClass = isToday ? 'border-red-700' : 'border-transparent';

  return `${baseClasses} ${colorClass} ${borderClass}`;
};
</script>

<template>
  <table
    class="border-separate rounded-md bg-gray-50 text-center shadow"
    cellSpacing="0"
  >
    <thead>
      <tr>
        <th
          colspan="7"
          :class="`${getMonthColor(month.month)} m-0 rounded-t-md px-2 py-1 text-center text-gray-700`"
        >
          <div class="flex w-full flex-row justify-between">
            <span>
              {{ fmtMonth(new Date(year, month.month - 1)) }}
            </span>
            <span>{{ month.hours }}/{{ Math.trunc(month.hours / 8) }}</span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td
          v-for="(dayOfWeek, dayIdx) in getWeekdays(locale)"
          :key="dayIdx"
          class="border border-transparent px-1 py-0.5 text-gray-500"
        >
          {{ dayOfWeek }}
        </td>
      </tr>
      <tr v-for="(week, weekIdx) in weeks" :key="weekIdx">
        <td
          v-for="(day, dayIdx) in week"
          :key="`${day}-${dayIdx}`"
          :class="getDayClass(day || { day: 0, hours: 0 })"
        >
          {{ day?.day || '\xa0' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
