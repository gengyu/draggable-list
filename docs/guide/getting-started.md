# 快速开始

## 安装

使用 npm 或 yarn 安装：

```bash
npm install @drag-list/core
# 或
yarn add @drag-list/core
```

## 基础用法

以下是一个简单的示例：

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
    const newItems = [...items.value]
    const [removed] = newItems.splice(startIndex, 1)
    newItems.splice(endIndex, 0, removed)
    items.value = newItems
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

## 样式引入

组件提供了默认样式，你可以直接引入：

```typescript
import '@drag-list/core/dist/style.css'
```

## 浏览器支持

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79
- iOS Safari >= 12
- Android Chrome >= 60 