import { createRouter, createWebHistory } from 'vue-router';
import YearView from '@/views/YearView.vue';

// Генерируем список доступных годов
const availableYears: number[] = [];
for (let i = 2010; i <= 2026; i++) {
  availableYears.push(i);
}

// Создаем строку для регулярного выражения, которая включает только доступные годы
const yearsPattern = availableYears.join('|');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/2026' // Redirect to current year by default
    },
    {
      path: `/:year(${yearsPattern})`,
      name: 'Year',
      component: YearView,
      props: true
    },
    // Обработка 404 ошибки - перенаправление на последний доступный год
    {
      path: '/:pathMatch(.*)*',
      redirect: `/${availableYears[availableYears.length - 1]}`
    }
  ],
});


export default router;
export { availableYears };
