# 触摸支持示例

## 移动设备拖拽

默认情况下，Draggable List 已启用触摸支持，无需额外配置即可在移动设备上使用：

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
  // 默认已启用触摸支持
  enableTouch: true,
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
  padding: 16px;
}

.dl-item {
  padding: 16px;
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
```

## 长按触发设置

你可以自定义长按触发时间，以适应不同的用户体验需求：

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
  // 设置长按触发时间为300毫秒
  longPressDuration: 300,
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

## 仅启用触摸支持

在某些场景下，你可能只需要触摸支持而不需要鼠标支持：

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
  // 启用触摸支持
  enableTouch: true,
  // 禁用鼠标支持
  enableMouse: false,
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

## 触摸反馈优化

为了提供更好的触摸反馈，你可以添加一些视觉效果：

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
  draggingClass: 'touch-dragging',
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
  padding: 16px;
}

.dl-item {
  padding: 16px;
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.touch-dragging {
  background: #f8f8f8;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
  z-index: 10;
}
</style>
```