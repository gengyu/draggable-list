# Vue 3 使用指南

## 基础示例

使用Vue 3组件库可以更简单地实现拖拽功能：

```vue
<template>
  <div>
    <DraggableList @dragEnd="handleDragEnd">
      <div v-for="item in items" :key="item.id" class="dl-item">
        {{ item.content }}
      </div>
    </DraggableList>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DraggableList } from '@drag-list/vue';

interface Item {
  id: number;
  content: string;
}

const items = ref<Item[]>([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' },
  { id: 4, content: '项目 4' },
  { id: 5, content: '项目 5' }
]);

const handleDragEnd = (startIndex: number, endIndex: number) => {
  console.log('拖动结束:', startIndex, '->', endIndex);
  // 更新数据顺序
  const item = items.value[startIndex];
  items.value.splice(startIndex, 1);
  items.value.splice(endIndex, 0, item);
};
</script>

<style>
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
</style>
```

## 自定义样式示例

你可以通过自定义样式和事件处理来创建更丰富的拖拽列表：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="index" class="dl-item">
      <div class="item-content">
        <div class="item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="item-info">
          <h3 class="item-title">{{ item.title }}</h3>
          <p class="item-desc">{{ item.description }}</p>
        </div>
      </div>
      <div class="drag-handle">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6H16M8 12H16M8 18H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useDraggableList } from '@drag-list/core';

const items = ref([
  {
    title: '任务 1',
    description: '这是一个示例任务'
  },
  {
    title: '任务 2',
    description: '这是另一个示例任务'
  },
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

const handleEdit = (item: Item) => {
  console.log('编辑:', item);
};

const handleDelete = (item: Item) => {
  console.log('删除:', item);
};
</script>

<style>
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
```

## 组件属性

`DraggableList` 组件提供了以下属性：

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| longPressDuration | number | 100 | 长按触发时间（毫秒） |
| enableTouch | boolean | true | 是否启用触摸支持 |
| enableMouse | boolean | true | 是否启用鼠标支持 |
| draggingClass | string | 'dl-dragging' | 自定义拖动时的样式类名 |

## 组件事件

`DraggableList` 组件提供了以下事件：

| 事件名 | 参数 | 描述 |
|--------|------|------|
| dragStart | (item: DraggableItem) | 拖动开始时触发 |
| dragMove | (item: DraggableItem, currentIndex: number) | 拖动过程中触发 |
| dragEnd | (startIndex: number, endIndex: number) | 拖动结束时触发 |