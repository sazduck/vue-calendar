<script setup lang="ts">
import { useRouter } from 'vue-router';
import { availableYears } from '@/router';

const router = useRouter();

const { year } = defineProps<{ year: number }>();

const years = availableYears;

const goToYear = (year: number) => {
  router.push(`/${year}`);
};

const maxYear = years[years.length - 1];
const minYear = years[0] || 0;
</script>

<template>
  <nav
    class="fixed right-4 bottom-8 flex justify-center lg:top-0 lg:right-0 lg:bottom-0 lg:block lg:w-full lg:py-8"
  >
    <div class="flex w-full items-center justify-center gap-4">
      <button
        :to="'/' + (year - 1)"
        @click="goToYear(year - 1)"
        :class="`min-h-10 min-w-10 rounded-full bg-neutral-50/30 text-lg font-black text-neutral-600 shadow-sm shadow-neutral-800 backdrop-blur-lg ${year - 1 <= minYear ? 'pointer-events-none' : 'cursor-pointer'}`"
      >
        <
      </button>
      <div
        class="hidden font-sans text-4xl font-medium text-neutral-800 lg:flex lg:items-center lg:justify-center"
      >
        {{ year }}
      </div>
      <button
        :to="'/' + (year + 1)"
        @click="goToYear(year + 1)"
        :class="`min-h-10 min-w-10 rounded-full bg-neutral-50/30 text-lg font-black text-neutral-600 shadow-sm shadow-neutral-800 backdrop-blur-lg ${year + 1 >= (maxYear || 0) ? 'pointer-events-none' : 'cursor-pointer'}`"
      >
        >
      </button>
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
