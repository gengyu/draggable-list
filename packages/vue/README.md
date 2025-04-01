# @drag-list/vue

Vue 3 的可拖动排序列表组件。

## 安装

```bash
pnpm add @drag-list/vue
```

## 使用

```vue
<template>
  <DraggableList @dragEnd="handleDragEnd">
    <div v-for="item in items" :key="item.id" class="dl-item">
      {{ item.content }}
    </div>
  </DraggableList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DraggableList } from '@drag-list/vue';
import type { DraggableItem } from '@drag-list/core';

const items = ref([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' }
]);

const handleDragEnd = (startIndex: number, endIndex: number) => {
  const item = items.value[startIndex];
  items.value.splice(startIndex, 1);
  items.value.splice(endIndex, 0, item);
};
</script>
```

## Props

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| longPressDuration | number | 100 | 长按触发时间（毫秒） |
| enableTouch | boolean | true | 是否启用触摸支持 |
| enableMouse | boolean | true | 是否启用鼠标支持 |
| draggingClass | string | 'dl-dragging' | 自定义拖动时的样式类名 |

## 事件

| 事件名 | 参数 | 描述 |
|--------|------|------|
| dragStart | (item: DraggableItem) => void | 拖动开始时触发 |
| dragMove | (item: DraggableItem, currentIndex: number) => void | 拖动过程中触发 |
| dragEnd | (startIndex: number, endIndex: number) => void | 拖动结束时触发 |

## 样式

默认样式：

```css
.dl-container {
  position: relative;
  user-select: none;
}

.dl-item {
  transition: transform 0.2s ease;
  cursor: grab;
}

.dl-item.dl-dragging {
  cursor: grabbing;
  opacity: 0.8;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.dl-item.dl-dragging * {
  pointer-events: none;
}
```

你可以通过 `draggingClass` 属性自定义拖动时的样式类名。

## 示例

### 基础示例

```vue
<template>
  <DraggableList @dragEnd="handleDragEnd">
    <div v-for="item in items" :key="item.id" class="dl-item">
      {{ item.content }}
    </div>
  </DraggableList>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DraggableList } from '@drag-list/vue';

const items = ref([
  { id: 1, content: '项目 1' },
  { id: 2, content: '项目 2' },
  { id: 3, content: '项目 3' }
]);

const handleDragEnd = (startIndex: number, endIndex: number) => {
  const item = items.value[startIndex];
  items.value.splice(startIndex, 1);
  items.value.splice(endIndex, 0, item);
};
</script>
```

### 自定义样式示例

```vue
<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { DraggableList } from '@drag-list/vue';
import type { DraggableItem } from '@drag-list/core';

interface CustomItem {
  id: number;
  title: string;
  description: string;
}

const customItems = ref<CustomItem[]>([
  { id: 1, title: '任务 1', description: '这是一个示例任务' },
  { id: 2, title: '任务 2', description: '这是另一个示例任务' },
  { id: 3, title: '任务 3', description: '这是第三个示例任务' }
]);

const handleDragStart = (item: DraggableItem) => {
  console.log('开始拖动:', item);
};

const handleDragMove = (item: DraggableItem, currentIndex: number) => {
  console.log('拖动中:', item, '当前位置:', currentIndex);
};

const handleDragEnd = (startIndex: number, endIndex: number) => {
  console.log('拖动结束:', startIndex, '->', endIndex);
  const item = customItems.value[startIndex];
  customItems.value.splice(startIndex, 1);
  customItems.value.splice(endIndex, 0, item);
};

const handleEdit = (item: CustomItem) => {
  console.log('编辑:', item);
};

const handleDelete = (item: CustomItem) => {
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