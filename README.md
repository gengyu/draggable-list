# Draggable List

一个轻量级的可拖动排序列表组件库，支持 Vue 3。

## 特性

- 🎯 轻量级：核心功能包体积小
- 🎨 可定制：支持自定义样式
- 🎮 多设备：支持鼠标和触摸设备
- 📦 模块化：核心功能和 Vue 组件分离
- 🔒 类型安全：完整的 TypeScript 支持

## 安装

```bash
# 安装 Vue 组件
pnpm add @drag-list/vue

# 安装核心功能（可选）
pnpm add @drag-list/core
```

## 快速开始

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

<style>
.dl-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
```

## 包说明

### @drag-list/core

核心功能包，提供基础的拖拽功能。

[查看文档](./packages/core/README.md)

### @drag-list/vue

Vue 3 组件包，提供易用的 Vue 组件。

[查看文档](./packages/vue/README.md)

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 运行测试
pnpm test
```

## 许可证

MIT
