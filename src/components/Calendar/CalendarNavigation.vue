<script setup lang="ts">
import { availableYears } from '@/router';
import YearButton from './CalendarNaviagationButton.vue';



const { year } = defineProps<{ year: number }>();

const years = availableYears;

const maxYear = years[years.length - 1] || 0;
const minYear = years[0] || 0;
</script>

<template>
  <nav
    class="fixed right-4 bottom-8 flex justify-center lg:top-0 lg:right-0 lg:bottom-0 lg:block lg:w-full lg:py-8"
  >
    <div class="flex w-full items-center justify-center gap-4">
      <YearButton :year="year - 1" :is-year-legal="year - 1 < minYear">
        <
      </YearButton>

      <div
        class="hidden font-sans text-4xl font-medium text-neutral-800 dark:text-neutral-100 lg:flex lg:items-center lg:justify-center"
      >
        {{ year }}
      </div>

      <YearButton :year="year + 1" :is-year-legal="year + 1 > maxYear">
        >
      </YearButton>

        
      <!-- <button
        v-for="year in years"
        :to="'/' + year"
        @click="goToYear(year)"
        class="rounded-md px-3 py-1 text-sm font-medium transition-colors duration-200"
        :class="
          currentYear == year ?
            'bg-blue-500 font-bold text-white'
          : 'text-gray-700 hover:bg-gray-200'
        "
      >
        {{ year }}
      </button> -->
    </div>
  </nav>
</template>
