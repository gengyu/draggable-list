import { createApp } from 'vue';
import App from './App.vue';
import './reset.css';
import './tailwind.css'; // 确保 Tailwind CSS 样式文件被引入
import router from './router';

createApp(App).use(router).mount('#app');