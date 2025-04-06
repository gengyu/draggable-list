# 快速开始

## 安装

使用 npm、yarn 或 pnpm 安装核心功能：

```bash
# npm
npm install @drag-list/core

# yarn
yarn add @drag-list/core

# pnpm
pnpm add @drag-list/core
```

## Vue 中使用
如果你使用 Vue 3，可以安装 Vue 组件包：

请参考 [Vue 3使用指南](/vue/guide/vue-usage)



## 基础示例

以下是使用原生JavaScript的基础示例：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>可拖动列表示例</title>
  <style>
    .dl-container {
      max-width: 600px;
      margin: 0 auto;
    }
    .dl-item {
      padding: 1rem;
      margin: 0.5rem 0;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: grab;
    }
    .dl-dragging {
      opacity: 0.8;
      background: #f5f5f5;
    }
  </style>
</head>
<body>
  <div class="dl-container">
    <div class="dl-item">项目 1</div>
    <div class="dl-item">项目 2</div>
    <div class="dl-item">项目 3</div>
    <div class="dl-item">项目 4</div>
    <div class="dl-item">项目 5</div>
  </div>

  <script type="module">
    import { useDraggableList } from 'https://cdn.jsdelivr.net/npm/@drag-list/core/dist/index.mjs';
    // 或者使用npm安装后导入
    // import { useDraggableList } from '@drag-list/core';

    const { state, init, destroy } = useDraggableList({
      container: '.dl-container',
      itemSelector: '.dl-item',
      onDragStart: (item) => {
        console.log('开始拖动:', item);
      },
      onDragMove: (item, currentIndex) => {
        console.log('拖动中:', item, '当前位置:', currentIndex);
      },
      onDragEnd: (startIndex, endIndex) => {
        console.log('拖动结束:', startIndex, '->', endIndex);
        // 在这里处理数据更新逻辑
        const container = document.querySelector('.dl-container');
        const items = Array.from(container.querySelectorAll('.dl-item'));
        const draggedItem = items[startIndex];
        
        if (startIndex < endIndex) {
          container.insertBefore(draggedItem, items[endIndex + 1]);
        } else {
          container.insertBefore(draggedItem, items[endIndex]);
        }
      }
    });

    // 初始化
    init();

    // 页面卸载时销毁
    window.addEventListener('unload', () => {
      destroy();
    });
  </script>
</body>
</html>
```

## 在现代框架中使用

在使用构建工具的项目中，你可以这样使用：

```javascript
import {useDraggableList} from '@drag-list/core';

// 初始化拖拽功能
const {state, init, destroy} = useDraggableList({
    container: '#list-container',
    itemSelector: '.list-item',
    onDragStart: (item) => {
        console.log('开始拖动:', item);
    },
    onDragMove: (item, currentIndex) => {
        console.log('拖动中:', item, '当前位置:', currentIndex);
    },
    onDragEnd: (startIndex, endIndex) => {
        console.log('拖动结束:', startIndex, '->', endIndex);
        // 处理数据更新逻辑 。。。
    }
});

// 初始化
init();

// 组件卸载时销毁
function cleanup() {
    destroy();
}
```

 
## 浏览器支持

- Chrome >= 60
- Firefox >= 55
- Safari >= 12
- Edge >= 79
- iOS Safari >= 12
- Android Chrome >= 60

## 下一步

- 查看[基础用法](/guide/basic-usage)了解更多功能
- 查看[进阶用法](/guide/advanced-usage)了解高级特性
- 查看[API参考](/api/options)了解完整选项