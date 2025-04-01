# draggable-list

一个轻量级的可拖动排序列表组件，支持触摸和鼠标操作。

## 特性

- 🎯 支持触摸和鼠标操作
- 🚀 轻量级，无依赖
- 📦 TypeScript 支持
- 🎨 可自定义样式
- 🔄 流畅的动画效果
- 📱 响应式设计
- 🌙 支持暗色模式

## 安装

```bash
npm install @drag-list/core
# 或
yarn add @drag-list/core
# 或
pnpm add @drag-list/core
```

## 快速开始

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

## 文档

访问我们的 [官方文档](https://yourusername.github.io/draggable-list) 了解更多信息。

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建
pnpm build

# 代码检查
pnpm lint

# 文档开发
pnpm docs:dev

# 构建文档
pnpm docs:build
```

## 项目结构

```
draggable-list/
├── packages/
│   └── core/           # 核心包
├── examples/           # 示例项目
├── docs/              # 文档
└── package.json
```

## 浏览器支持

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79
- iOS Safari >= 12
- Android Chrome >= 60

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT
