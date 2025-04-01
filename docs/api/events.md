# 事件

Draggable List 提供了三个主要事件回调，用于处理拖动过程中的不同阶段。

## onDragStart

当开始拖动时触发。

```typescript
onDragStart?: (item: DraggableItem) => void
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| item | `DraggableItem` | 当前正在拖动的项 |

### 示例

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragStart: (item) => {
    console.log('开始拖动:', item.index)
    // 可以在这里添加自定义逻辑
  }
})
```

## onDragMove

在拖动过程中持续触发。

```typescript
onDragMove?: (item: DraggableItem, currentIndex: number) => void
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| item | `DraggableItem` | 当前正在拖动的项 |
| currentIndex | `number` | 当前拖动到的索引位置 |

### 示例

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragMove: (item, currentIndex) => {
    console.log('拖动中:', currentIndex)
    // 可以在这里添加自定义逻辑
  }
})
```

## onDragEnd

当拖动结束时触发。

```typescript
onDragEnd?: (startIndex: number, endIndex: number) => void
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| startIndex | `number` | 拖动开始时的索引 |
| endIndex | `number` | 拖动结束时的索引 |

### 示例

```typescript
const { state, init, destroy } = useDraggableList({
  container: '.dl-container',
  itemSelector: '.dl-item',
  onDragStart: (item) => {
    console.log('开始拖动:', item.index)
  },
  onDragMove: (item, currentIndex) => {
    console.log('拖动中:', currentIndex)
  },
  onDragEnd: (startIndex, endIndex) => {
    console.log('拖动结束:', startIndex, endIndex)
    items.value.splice(endIndex, 0,
      items.value.splice(startIndex, 1)[0]
    );
  }
})
```

## 完整示例

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
  onDragStart: (item) => {
    console.log('开始拖动:', item.index)
  },
  onDragMove: (item, currentIndex) => {
    console.log('拖动中:', currentIndex)
  },
  onDragEnd: (startIndex, endIndex) => {
    console.log('拖动结束:', startIndex, endIndex)
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