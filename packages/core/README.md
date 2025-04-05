# @drag-list/core

一个轻量级的可拖动排序列表核心功能库，提供基础的拖拽功能，零依赖。

## 安装

```bash
pnpm add @drag-list/core
```

## 使用

```typescript
import { useDraggableList } from '@drag-list/core';

const { init, destroy, state } = useDraggableList({
  container: '#list-container',
  onDragStart: (item) => {
    console.log('开始拖动:', item);
  },
  onDragMove: (item, currentIndex) => {
    console.log('拖动中:', item, '当前位置:', currentIndex);
  },
  onDragEnd: (startIndex, endIndex) => {
    console.log('拖动结束:', startIndex, '->', endIndex);
  }
});

// 初始化
init();

// 销毁
destroy();
```

## API

### useDraggableList

创建一个可拖动的列表功能。

#### 参数

| 参数名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| longPressDuration | number | 100 | 长按触发时间（毫秒） |
| container | HTMLElement \| string | - | 列表容器选择器或元素 |
| itemSelector | string | '.dl-item' | 列表项选择器 |
| onDragStart | (item: DraggableItem) => void | - | 拖动开始时的回调 |
| onDragMove | (item: DraggableItem, currentIndex: number) => void | - | 拖动过程中的回调 |
| onDragEnd | (startIndex: number, endIndex: number) => void | - | 拖动结束时的回调 |
| enableTouch | boolean | true | 是否启用触摸支持 |
| enableMouse | boolean | true | 是否启用鼠标支持 |
| draggingClass | string | 'dl-dragging' | 自定义拖动时的样式类名 |

#### 返回值

| 参数名 | 类型 | 描述 |
|--------|------|------|
| state | DraggableListState | 拖动状态 |
| init | () => void | 初始化函数 |
| destroy | () => void | 销毁函数 |

### DraggableItem

拖动项的类型定义。

```typescript
interface DraggableItem {
  element: HTMLElement;  // 元素
  index: number;         // 索引
}
```

### DraggableListState

拖动状态的类型定义。

```typescript
interface DraggableListState {
  items: DraggableItem[];        // 所有项
  draggingItem: DraggableItem | null;  // 当前拖动的项
  startY: number;                // 开始位置
  currentY: number;              // 当前位置
  startIndex: number;            // 开始索引
  currentIndex: number;          // 当前索引
  isDragging: boolean;           // 是否正在拖动
}
```

## 样式

默认样式：

```css
.dl-container {
  position: relative;
  user-select: none;
}

.dl-item {
  transition: transform 0.2s ease;
  cursor: grab;
}

.dl-item.dl-dragging {
  cursor: grabbing;
  opacity: 0.8;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.dl-item.dl-dragging * {
  pointer-events: none;
}
```

你可以通过 `draggingClass` 选项自定义拖动时的样式类名。