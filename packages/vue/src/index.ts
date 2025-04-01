import type { App } from 'vue'; // 修改: 使用类型导入
import DraggableList from './components/DraggableList.vue';

export { DraggableList };

export default {
  install(app: App) {
    app.component('DraggableList', DraggableList);
  }
};