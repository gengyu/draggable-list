import { createRouter, createWebHistory } from 'vue-router';
import DragList from '../DragList.vue';
import Calculator from '../Calculator.vue'; // 引入计算器组件

const routes = [
  {
    path: '/',
    component: DragList,
  },
  // 可以在这里添加更多路由
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
