<script setup lang="ts">
import type { WorkingMonthHours } from './types';

interface Day {
  day: number;
  hours: number;
}

interface CalendarMonthProps {
  month: WorkingMonthHours;
  year: number;
  today: Date;
  locale?: string;
}
const props = withDefaults(defineProps<CalendarMonthProps>(), {
  locale: 'ru-RU',
});

const getFirstDayOfMonth = (year: number, month: number): number => {
  const day = new Date(year, month - 1, 1).getDay();
  return (day + 6) % 7;
};

const chunkDays = (
  year: number,
  month: number,
  monthDays: Day[]
): (Day | null)[][] => {
  const firstDayOffset = getFirstDayOfMonth(year, month);

  const weeks: (Day | null)[][] = [];
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

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const getMonthColor = (month: number) => {
  if (month <= 2 || month === 12) return 'bg-blue-100';
  if (month <= 5) return 'bg-green-200';
  if (month <= 8) return 'bg-yellow-200';
  return 'bg-orange-200';
};

const getDayClass = (day: Day | null) => {
  // Маппинг цветов в зависимости от часов
  const colorMap: Record<number, [string, string]> = {
    8: ['text-gray-400 dark:text-neutral-400', 'text-gray-900 dark:text-neutral-300'], // [если прошло, если активно]
    7: ['text-green-300 dark:text-green-900', 'text-green-600 dark:text-green-300'],
  };

  const [passedColor, activeColor] = day
    ? colorMap[day.hours] ?? ['text-red-300 dark:text-red-800', 'text-red-600 dark:text-red-400',]
    : ['', ''];

  const isDayPassed = props.today > new Date(
    props.year,
    props.month.month - 1,
    day?.day
  );

  const isToday =
    props.today.getFullYear() === props.year &&
    props.today.getMonth() === props.month.month - 1 &&
    props.today.getDate() === day?.day;

  const dayColor = isDayPassed ? passedColor : activeColor;

  const baseClasses = 'border-1 px-2 py-0.5 rounded-sm';
  const colorClass = day ? dayColor : '';
  const borderClass = isToday ? 'border-red-700 dark:border-red-500' : 'border-transparent';

  return `${baseClasses} ${colorClass} ${borderClass}`;
};

const fmtMonth = (date: Date) => {
  return capitalizeFirstLetter(
    Intl.DateTimeFormat(props.locale, { month: 'long' }).format(date)
  );
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

const weekdays = getWeekdays(props.locale);
const dayChunks = chunkDays(props.year, props.month.month, props.month.days);
const month = fmtMonth(new Date(props.year, props.month.month - 1));
const monthHours = `${props.month.hours}/${Math.trunc(props.month.hours / 8)}`;
const monthColor = getMonthColor(props.month.month) ;

</script>

<template>
  <table
    class="border-separate rounded-md bg-neutral-50 dark:bg-neutral-900 text-center shadow "
    cellSpacing="0"
  >
    <thead>
      <tr>
        <th
          colspan="7"
          :class="`${monthColor} m-0 rounded-t-md px-2 py-1 text-center text-gray-700 dark:text-neutral-300  dark:bg-neutral-900`"
        >
          <div class="flex w-full flex-row justify-between items-center">
            <div class="flex flex-row justify-center items-center gap-2">
              <span>{{ month }}</span>
              <div :class="monthColor + ` w-4 h-4 rounded-full`">&nbsp;</div>
            </div>
            <span>{{ monthHours }}</span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td
          v-for="(dayOfWeek, dayIdx) in weekdays"
          :key="dayIdx"
          class="border border-transparent px-1 py-0.5 text-gray-500 dark:text-neutral-400"
        >
          {{ dayOfWeek }}
        </td>
      </tr>
      <tr v-for="(week, weekIdx) in dayChunks" :key="weekIdx">
        <td
          v-for="(day, dayIdx) in week"
          :key="dayIdx"
          :class="getDayClass(day)"
        >
          {{ day?.day || '&nbsp;' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
