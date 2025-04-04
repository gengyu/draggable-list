import type {App} from 'vue';


import DraggableList from './components/DraggableList.vue';
import type {DraggableItem} from '@drag-list/core';

export {DraggableList};
export type { DraggableItem };

export default {
  install(app: App) {
    app.component('DraggableList', DraggableList);
  }
};