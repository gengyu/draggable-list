import type { App } from 'vue';
import DraggableList from './components/DraggableList.vue';

export { DraggableList };

export default {
  install(app: App) {
    app.component('DraggableList', DraggableList);
  }
};