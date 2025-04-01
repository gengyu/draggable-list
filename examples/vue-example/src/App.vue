<template>
  <div class="container">
    <h1>Vue 可拖动列表示例</h1>
    <div class="demo-section">
      <h2>基础示例</h2>
      <DraggableList @dragEnd="handleDragEnd">
        <div v-for="item in items" :key="item.id" class="dl-item">
          {{ item.content }}
        </div>
      </DraggableList>
    </div>
    <div class="demo-section">
      <h2>自定义样式示例</h2>
      <DraggableList
        draggingClass="custom-dragging"
        @dragStart="handleDragStart"
        @dragMove="handleDragMove"
        @dragEnd="handleDragEnd"
      >
        <div v-for="item in customItems" :key="item.id" class="custom-item">
          <div class="item-content">
            <span class="item-title">{{ item.title }}</span>
            <span class="item-desc">{{ item.description }}</span>
          </div>
          <div class="item-actions">
            <button @click="handleEdit(item)">编辑</button>
            <button @click="handleDelete(item)">删除</button>
          </div>
        </div>
      </DraggableList>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DraggableItem } from '@drag-list/vue';

interface Item {
  id: number;
  content: string;
}

interface CustomItem {
  id: number;
  title: string;
  description: string;
}

const items = ref<Item[]>([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' },
  { id: 4, content: '项目 4' },
  { id: 5, content: '项目 5' }
]);

const customItems = ref<CustomItem[]>([
  { id: 1, title: '任务 1', description: '这是一个示例任务' },
  { id: 2, title: '任务 2', description: '这是另一个示例任务' },
  { id: 3, title: '任务 3', description: '这是第三个示例任务' },
  { id: 4, title: '任务 4', description: '这是第四个示例任务' }
]);

const handleDragStart = (item: DraggableItem) => {
  console.log('开始拖动:', item);
};

const handleDragMove = (item: DraggableItem, currentIndex: number) => {
  console.log('拖动中:', item, '当前位置:', currentIndex);
};

const handleDragEnd = (startIndex: number, endIndex: number) => {
  console.log('拖动结束:', startIndex, '->', endIndex);
  const item = items.value[startIndex];
  items.value.splice(startIndex, 1);
  items.value.splice(endIndex, 0, item);
};

const handleEdit = (item: CustomItem) => {
  console.log('编辑:', item);
};

const handleDelete = (item: CustomItem) => {
  console.log('删除:', item);
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.demo-section {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.dl-item {
  padding: 1rem;
  margin: 0.5rem 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.2s ease;
}

.dl-item:hover {
  background: #f5f5f5;
}

.custom-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin: 0.5rem 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: grab;
  transition: all 0.2s ease;
}

.custom-item:hover {
  background: #f5f5f5;
}

.item-content {
  flex: 1;
}

.item-title {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.item-desc {
  display: block;
  color: #666;
  font-size: 0.9rem;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.item-actions button {
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  background: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.item-actions button:hover {
  background: #45a049;
}

.item-actions button:last-child {
  background: #f44336;
}

.item-actions button:last-child:hover {
  background: #da190b;
}

.custom-dragging {
  opacity: 0.8;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.custom-dragging * {
  pointer-events: none;
}
</style> 