# 基础示例

## 简单列表

最基本的可拖动列表实现：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="index" class="dl-item">
      {{ item }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDraggableList } from '@drag-list/core'

const items = ref(['项目 1', '项目 2', '项目 3'])

const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragEnd: (startIndex, endIndex) => {
    items.value.splice(endIndex, 0,
      items.value.splice(startIndex, 1)[0]
    );
  }
})

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>

<style>
.dl-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
```

## 带序号和拖动手柄

添加序号和拖动手柄的列表：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="index" class="dl-item">
      <div class="item-content">
        <span class="item-index">{{ index + 1 }}</span>
        <span class="item-text">{{ item }}</span>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useDraggableList } from '@drag-list/core'

const items = ref(['项目 1', '项目 2', '项目 3'])

const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragEnd: (startIndex, endIndex) => {
    items.value.splice(endIndex, 0,
      items.value.splice(startIndex, 1)[0]
    );
  }
})

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>

<style>
.dl-container {
  max-width: 600px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.dl-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
}

.dl-item:last-child {
  border-bottom: none;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.item-index {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
}

.item-text {
  font-size: 1rem;
  color: #333;
}

.drag-handle {
  color: #999;
  cursor: grab;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.drag-handle:hover {
  color: #666;
  background: #f0f0f0;
}

.dl-item.dl-dragging {
  background: #f8f9fa;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 0.5rem 1.5rem;
}

.dl-item.dl-dragging .drag-handle {
  cursor: grabbing;
}
</style> 