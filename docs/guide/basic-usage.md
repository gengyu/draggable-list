# 基础用法

## 基本设置

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
```

## 自定义样式

你可以通过覆盖默认的 CSS 类来自定义样式：

```css
.dl-container {
  max-width: 600px;
  margin: 0 auto;
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
}

.dl-item {
  background: white;
  border-radius: 6px;
  margin-bottom: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.dl-item.dl-dragging {
  opacity: 0.8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## 禁用触摸或鼠标支持

你可以通过配置选项来禁用触摸或鼠标支持：

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  enableTouch: false, // 禁用触摸支持
  enableMouse: true,  // 启用鼠标支持
})
```

## 自定义长按时间

你可以调整触发拖动所需的长按时间：

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  longPressDuration: 200, // 设置长按时间为 200ms
})
```

## 监听拖动状态

你可以通过 `state` 来监听拖动状态：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="index" class="dl-item">
      {{ item }}
      <span v-if="state.isDragging && state.draggedItem?.index === index">
        (拖动中)
      </span>
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
})

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>
``` 