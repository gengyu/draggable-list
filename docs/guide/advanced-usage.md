# 进阶用法

## 自定义拖动样式

你可以通过修改 `draggingClass` 来自定义拖动时的样式：

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  draggingClass: 'custom-dragging',
})
```

```css
.custom-dragging {
  opacity: 0.8;
  background: #f0f0f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: scale(1.02);
}
```

## 动态更新列表

当列表项动态变化时，你需要重新初始化拖动功能：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="item.id" class="dl-item">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useDraggableList } from '@drag-list/core'

const items = ref([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' },
])

const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragEnd: (startIndex, endIndex) => {
    items.value.splice(endIndex, 0,
      items.value.splice(startIndex, 1)[0]
    );
  }
})

// 监听列表变化
watch(() => items.value.length, () => {
  destroy()
  init()
})

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>
```

## 嵌套列表

你可以创建嵌套的可拖动列表：

```vue
<template>
  <div class="dl-container">
    <div v-for="(group, groupIndex) in groups" :key="group.id" class="dl-group">
      <div class="group-header">{{ group.name }}</div>
      <div class="dl-container">
        <div v-for="(item, itemIndex) in group.items" 
             :key="item.id" 
             class="dl-item">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useDraggableList } from '@drag-list/core'

const groups = ref([
  {
    id: 1,
    name: '组 1',
    items: [
      { id: 1, name: '项目 1' },
      { id: 2, name: '项目 2' },
    ]
  },
  {
    id: 2,
    name: '组 2',
    items: [
      { id: 3, name: '项目 3' },
      { id: 4, name: '项目 4' },
    ]
  }
])

// 为每个组创建独立的拖动实例
const instances = groups.value.map(() => 
  useDraggableList({
    container: '.dl-container',
    itemSelector: '.dl-item',
    onDragEnd: (startIndex, endIndex) => {
      // 处理拖动结束
    }
  })
)

onMounted(() => {
  instances.forEach(instance => instance.init())
})

onUnmounted(() => {
  instances.forEach(instance => instance.destroy())
})
</script>

<style>
.dl-group {
  margin-bottom: 20px;
}

.group-header {
  font-weight: bold;
  margin-bottom: 10px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
```

## 性能优化

对于大型列表，你可以使用虚拟滚动来优化性能：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in visibleItems" 
         :key="item.id" 
         class="dl-item"
         :style="{ height: itemHeight + 'px' }">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDraggableList } from '@drag-list/core'

const itemHeight = 50
const containerHeight = 400
const scrollTop = ref(0)

const items = ref(Array.from({ length: 1000 }, (_, i) => ({
  id: i + 1,
  name: `项目 ${i + 1}`
})))

const visibleItems = computed(() => {
  const startIndex = Math.floor(scrollTop.value / itemHeight)
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  return items.value.slice(startIndex, startIndex + visibleCount)
})

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
  height: 400px;
  overflow-y: auto;
}
</style> 