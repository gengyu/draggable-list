# 自定义样式示例

## 卡片式列表

使用卡片样式展示列表项：

```vue
<template>
  <div class="dl-container">
    <div v-for="(item, index) in items" :key="index" class="dl-item">
      <div class="item-content">
        <div class="item-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
import { ref, onMounted, onUnmounted } from 'vue'
import { useDraggableList } from '@drag-list/core'

const items = ref([
  {
    title: '项目 1',
    description: '这是项目 1 的描述文本'
  },
  {
    title: '项目 2',
    description: '这是项目 2 的描述文本'
  },
  {
    title: '项目 3',
    description: '这是项目 3 的描述文本'
  }
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

onMounted(() => {
  init()
})

onUnmounted(() => {
  destroy()
})
</script>

<style>
.dl-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.dl-item {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.dl-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.item-content {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.item-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f7ff;
  border-radius: 8px;
  color: #1a73e8;
}

.item-info {
  flex: 1;
}

.item-title {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.item-desc {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.drag-handle {
  color: #999;
  cursor: grab;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
  opacity: 0;
}

.dl-item:hover .drag-handle {
  opacity: 1;
}

.drag-handle:hover {
  color: #666;
  background: #f0f0f0;
}

.dl-item.dl-dragging {
  opacity: 0.8;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  transform: scale(1.02);
}

.dl-item.dl-dragging .drag-handle {
  cursor: grabbing;
  opacity: 1;
}
</style>
```

## 暗色主题

使用暗色主题的列表：

```vue
<template>
  <div class="dl-container dark">
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
  background: #1a1a1a;
  border-radius: 12px;
  padding: 1rem;
}

.dl-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #2d2d2d;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.dl-item:last-child {
  margin-bottom: 0;
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
  background: #3d3d3d;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #999;
  font-weight: 500;
}

.item-text {
  font-size: 1rem;
  color: #fff;
}

.drag-handle {
  color: #666;
  cursor: grab;
  padding: 0.5rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.drag-handle:hover {
  color: #999;
  background: #3d3d3d;
}

.dl-item.dl-dragging {
  background: #3d3d3d;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.dl-item.dl-dragging .drag-handle {
  cursor: grabbing;
}
</style> 